/* CMS REDIRECTS -> dist/_redirects. Added 15 Oct 2026.
 *
 * Runs after `astro build` and before the audits. Reads the Redirects list the
 * client edits in Keystatic (src/content/redirects.json) and appends each entry to
 * dist/_redirects as a 301, which is the file Cloudflare actually serves.
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
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SRC = 'src/content/redirects.json';
const OUT = join(DIST, '_redirects');

if (!existsSync(SRC)) { console.log('CMS redirects: no list yet, nothing to add.'); process.exit(0); }
if (!existsSync(OUT)) { console.error('CMS redirects: dist/_redirects missing, run astro build first.'); process.exit(1); }

const raw = JSON.parse(readFileSync(SRC, 'utf8'));
const rows = Array.isArray(raw.rules) ? raw.rules : [];

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
for (const r of rows) {
  const from = toPath(r?.from);
  let to = String(r?.to ?? '').trim().replace(/^https?:\/\/(www\.)?buggyrents\.com/i, '');
  const label = `${r?.from ?? ''} -> ${r?.to ?? ''}`;

  if (!from.startsWith('/') || from === '/' || /\s/.test(from)) { warn.push(`${label}: "From" must be a path like /old-page/`); continue; }
  if (from.startsWith('/keystatic') || from.startsWith('/api/') || from.startsWith('/_')) { warn.push(`${label}: that path belongs to the site itself`); continue; }
  if (!to) { warn.push(`${label}: "To" is empty`); continue; }
  if (!to.startsWith('/') && !/^https:\/\//.test(to)) { warn.push(`${label}: "To" must be /a-page/ or a full https:// address`); continue; }
  if (pageExists(from) || pageExists(withSlash(from))) { warn.push(`${label}: ${from} is a live page, a redirect would hide it`); continue; }
  if (existing.has(key(from))) { warn.push(`${label}: already redirected in code to ${existing.get(key(from))}, that rule wins`); continue; }
  if (accepted.has(key(from))) { warn.push(`${label}: listed twice, the first entry is used`); continue; }

  if (to.startsWith('/')) {
    to = to.replace(/[?#].*$/, '');
    if (!/\.[a-z0-9]+$/i.test(to)) to = withSlash(to);
    const final = finalOf(to);
    if (final === null) { warn.push(`${label}: redirect loop`); continue; }
    if (final.startsWith('/') && !pageExists(final)) { warn.push(`${label}: ${final} is not a page on the site`); continue; }
    to = final;
    if (key(to) === key(from)) { warn.push(`${label}: points at itself`); continue; }
  }

  accepted.set(key(from), to);
  out.push(`${withSlash(from).padEnd(60)} ${to.padEnd(50)} 301`);
  if (noSlash(from) !== withSlash(from)) out.push(`${noSlash(from).padEnd(60)} ${to.padEnd(50)} 301`);
}

if (out.length) {
  writeFileSync(OUT, base.replace(/\n*$/, '\n') +
    '\n# ---- From the CMS (Keystatic > Redirects), added by scripts/build-redirects.mjs ----\n' +
    out.join('\n') + '\n');
}
for (const w of warn) console.warn(`  SKIPPED ${w}`);
console.log(`CMS redirects: ${accepted.size} applied${warn.length ? `, ${warn.length} skipped (see above)` : ''}.`);
