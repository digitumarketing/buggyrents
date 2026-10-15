/* CMS REDIRECTS -> dist/_redirects. Added 15 Oct 2026.
 *
 * Runs after `astro build` and before the audits. Reads the Redirections the
 * client edits in Keystatic (SEO > Redirections, one file per entry in
 * src/content/redirects/) and appends every active one to dist/_redirects with its
 * chosen status code. That is the file Cloudflare actually serves.
 *
 * WHY A SCRIPT AND NOT astro.config.mjs `redirects`
 * Astro strips the trailing slash from every key it writes, and old WordPress URLs
 * are indexed WITH the slash (see CLAUDE.md §1). Writing the file ourselves lets
 * each entry go out in both forms, which is the whole point.
 *
 * WHY A BAD ROW IS SKIPPED, NOT FAILED
 * This list is edited by the client. A failing build here would block every other
 * CMS save from deploying until someone fixed one typo, the same reason typecheck is
 * kept out of the build. So a row that cannot be applied safely is left out with a
 * warning and everything else ships. Shape is already checked in the editor by the
 * field patterns in keystatic.config.ts; this checks what the editor cannot know.
 *
 * A row is skipped when:
 *   - "From" is a page that exists. A redirect there would hide a live page.
 *   - "From" is already answered by a hand-written rule in public/_redirects or
 *     astro.config.mjs. Those are load-bearing and win; the duplicate is dropped.
 *   - "To" is a path on this site that does not resolve to a page. Sending a 404
 *     visitor to another 404 helps nobody.
 *   - "From" and "To" are the same page, or the entry is a repeat of an earlier one.
 *
 * Chains are flattened rather than skipped: if "To" is itself redirected, the rule
 * is written straight to the final page, so the visitor and Googlebot take one hop.
 */
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SRC = 'src/content/redirects';
const OUT = join(DIST, '_redirects');

if (!existsSync(SRC)) { console.log('CMS redirects: none yet, nothing to add.'); process.exit(0); }
if (!existsSync(OUT)) { console.error('CMS redirects: dist/_redirects missing, run astro build first.'); process.exit(1); }

/* Sorted by file name so the output is stable between builds. Inactive entries
   are kept in the CMS but never written. */
const CODES = new Set(['301', '302', '303', '307', '308']);
let inactive = 0;
const rows = readdirSync(SRC).filter(f => f.endsWith('.json')).sort().flatMap(f => {
  try {
    const r = JSON.parse(readFileSync(join(SRC, f), 'utf8'));
    if (r.active === false) { inactive++; return []; }
    return [r];
  } catch { console.warn(`  SKIPPED ${f}: not valid JSON`); return []; }
});

const noSlash = p => p.replace(/\/+$/, '') || '/';
const withSlash = p => (p.endsWith('/') ? p : p + '/');
const key = p => noSlash(p).toLowerCase();

/* A path pasted with the domain still means the path. */
const toPath = s => String(s ?? '').trim()
  .replace(/^https?:\/\/(www\.)?buggyrents\.com/i, '')
  .replace(/[?#].*$/, '');

const isFile = p => { try { return statSync(p).isFile(); } catch { return false; } };
const pageExists = path => {
  const rel = path.replace(/^\/+/, '');
  const c = rel === '' ? ['index.html'] : [join(rel, 'index.html'), rel, rel + '.html'];
  return c.some(x => isFile(join(DIST, x)));
};

/* Everything already in the file: hand-written rules plus Astro's generated ones. */
const existing = new Map();
const base = readFileSync(OUT, 'utf8');
for (const line of base.split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const [from, to] = t.split(/\s+/);
  if (from?.startsWith('/') && to) existing.set(key(from), to);
}

/* Follow redirects already known (built-in + accepted CMS rows) to the final page. */
const accepted = new Map();
const finalOf = to => {
  let cur = to;
  for (let i = 0; i < 6; i++) {
    if (!cur.startsWith('/')) return cur;
    const next = existing.get(key(cur)) ?? accepted.get(key(cur));
    if (!next) return cur;
    cur = next.replace(/^https?:\/\/(www\.)?buggyrents\.com/i, '');
  }
  return null; // loop
};

const out = [];
const warn = [];
const gone = [];
const goneKeys = new Set();
for (const r of rows) {
  const from = toPath(r?.from);
  let to = String(r?.to ?? '').trim().replace(/^https?:\/\/(www\.)?buggyrents\.com/i, '');
  const label = `${r?.from ?? ''} -> ${r?.to ?? ''}`;

  if (!from.startsWith('/') || from === '/' || /\s/.test(from)) { warn.push(`${label}: "From" must be a path like /old-page/`); continue; }
  if (from.startsWith('/keystatic') || from.startsWith('/api/') || from.startsWith('/_')) { warn.push(`${label}: that path belongs to the site itself`); continue; }
  if (pageExists(from) || pageExists(withSlash(from))) { warn.push(`${label}: ${from} is a live page, a redirect would hide it`); continue; }
  if (existing.has(key(from))) { warn.push(`${label}: already redirected in code to ${existing.get(key(from))}, that rule wins`); continue; }
  if (accepted.has(key(from)) || goneKeys.has(key(from))) { warn.push(`${label}: listed twice, the first entry is used`); continue; }

  /* 410 is not a redirect: nothing goes into _redirects. The path is handed to the
     Worker instead (see the run_worker_first step below and src/worker.ts). */
  if (String(r?.type) === '410') { goneKeys.add(key(from)); gone.push(from); continue; }

  if (!to) { warn.push(`${label}: "To" is empty`); continue; }
  if (!to.startsWith('/') && !/^https:\/\//.test(to)) { warn.push(`${label}: "To" must be /a-page/ or a full https:// address`); continue; }

  if (to.startsWith('/')) {
    to = to.replace(/[?#].*$/, '');
    if (!/\.[a-z0-9]+$/i.test(to)) to = withSlash(to);
    const final = finalOf(to);
    if (final === null) { warn.push(`${label}: redirect loop`); continue; }
    if (final.startsWith('/') && !pageExists(final)) { warn.push(`${label}: ${final} is not a page on the site`); continue; }
    to = final;
    if (key(to) === key(from)) { warn.push(`${label}: points at itself`); continue; }
  }

  const code = CODES.has(String(r?.type)) ? String(r.type) : '301';
  accepted.set(key(from), to);
  out.push(`${withSlash(from).padEnd(60)} ${to.padEnd(50)} ${code}`);
  if (noSlash(from) !== withSlash(from)) out.push(`${noSlash(from).padEnd(60)} ${to.padEnd(50)} ${code}`);
}

if (out.length) {
  writeFileSync(OUT, base.replace(/\n*$/, '\n') +
    '\n# ---- From the CMS (Keystatic > SEO > Redirections), added by scripts/build-redirects.mjs ----\n' +
    out.join('\n') + '\n');
}
/* 410 ROUTING. A deleted page has no file in dist, so Cloudflare's asset router
   would answer it with the 404 page before the Worker ever runs. Adding the path to
   run_worker_first in wrangler.toml sends it to the Worker, which answers 410.

   Only on Cloudflare's build (WORKERS_CI is set there), where the checkout is
   thrown away after deploy. A local `npm run build` never touches wrangler.toml,
   so the committed file stays clean. If this step ever does not run, the 410
   paths fall back to an ordinary 404, which is harmless. */
if (gone.length) {
  const paths = [...new Set(gone.flatMap(p => [noSlash(p), withSlash(p)]))];
  writeFileSync(join(DIST, '_gone.txt'), paths.join('\n') + '\n');
  if (process.env.WORKERS_CI) {
    const toml = readFileSync('wrangler.toml', 'utf8');
    const re = /^run_worker_first\s*=\s*\[([^\]]*)\]/m;
    const m = toml.match(re);
    if (!m) { console.error('CMS redirects: run_worker_first not found in wrangler.toml, 410s will answer 404.'); }
    else {
      const base = m[1].split(',').map(x => x.trim()).filter(Boolean);
      const all = [...base, ...paths.map(p => JSON.stringify(p))];
      writeFileSync('wrangler.toml', toml.replace(re, `run_worker_first = [${all.join(', ')}]`));
      console.log(`CMS redirects: ${gone.length} path(s) routed to the Worker for 410.`);
    }
  }
}
for (const w of warn) console.warn(`  SKIPPED ${w}`);
console.log(`CMS redirects: ${accepted.size} applied${gone.length ? `, ${gone.length} marked 410 Gone` : ''}${inactive ? `, ${inactive} switched off` : ''}${warn.length ? `, ${warn.length} skipped (see above)` : ''}.`);
