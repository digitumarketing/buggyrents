/* Internal links resolve, and every page is reachable.
 *
 * WHY THIS EXISTS
 * Until 4 Sep 2026 nothing in the build looked at a single <a href>. The comment
 * above the root-resolves audit in audit-contrast.mjs referred to "the link audit"
 * and "the orphan audit" as though both existed; neither did. The asset audit is
 * the near miss and explains why the gap survived: its six patterns cover
 * <link href>, <script src>, <img src>, <source srcset> and og:image, which are
 * all static FILES. An <a href> to a page that was never built matches none of
 * them, so it ships silently.
 *
 * The cost of that is highest in exactly the place it is least visible. Header and
 * footer links live in nav.ts and render on all 75 pages, so one mistyped href is
 * not one broken link, it is 75 of them, sitewide, in the primary navigation. The
 * nav commit of 3 Sep 2026 added two links to /ktm-dirt-bike-dubai/price/ and was
 * checked by hand; "prices" instead of "price" would have passed every audit and
 * deployed.
 *
 * WHAT COUNTS AS RESOLVED
 * A path resolves if it maps to a real file in dist: /x/ and /x both find
 * dist/x/index.html, and a direct file such as /sitemap-index.xml or /robots.txt
 * finds itself. Failing that, the path resolves if _redirects answers it, because
 * a 301 is a working link. Those are only WARNED about, not failed: pointing an
 * internal link through a redirect still costs the visitor a round trip and asks a
 * crawler to follow a hop it did not need to, so it is worth seeing and fixing,
 * but it is not a 404.
 *
 * Reads dist/_redirects rather than astro.config.mjs on purpose. That file is the
 * merge of the generated unslashed rules and the hand-written slashed ones in
 * public/_redirects, so it is what Cloudflare will actually serve. Checking the
 * config would miss the slashed forms entirely, which are the ones Google indexed.
 *
 * ORPHANS
 * A page nothing links to cannot be found by a visitor and is discovered by a
 * crawler only through the sitemap, which is the weakest signal available. The
 * homepage and 404 are excluded: one is the entry point, the other is reached by
 * error and deliberately kept out of the sitemap.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';

const DIST = 'dist';

/* Build output and static assets are containers, not pages. */
const SKIP_DIRS = new Set(['_astro', 'assets', '_worker.js']);

/* Reached by error rather than by link, and kept out of the sitemap for the same
   reason, so neither can be an orphan. */
const ORPHAN_EXEMPT = new Set([join(DIST, 'index.html'), join(DIST, '404.html')]);

const pages = [];
const walk = d => {
  for (const f of readdirSync(d)) {
    if (SKIP_DIRS.has(f)) continue;
    const p = join(d, f);
    let s;
    try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) walk(p);
    else if (p.endsWith('.html')) pages.push(p);
  }
};
walk(DIST);

/* dist/x/index.html -> /x/ , dist/index.html -> / , dist/404.html -> /404.html */
const urlOf = file => {
  const rest = file.slice(DIST.length).replace(/\\/g, '/');
  return rest.endsWith('/index.html') ? rest.slice(0, -'index.html'.length) : rest;
};

/* ---------------------------------------------------------------- redirects */
const redirectFroms = new Set();
{
  const f = join(DIST, '_redirects');
  if (existsSync(f)) {
    for (const line of readFileSync(f, 'utf8').split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const from = t.split(/\s+/)[0];
      if (!from || !from.startsWith('/')) continue;
      /* Record both slash forms. Cloudflare matches the exact path, and the two
         forms are written as separate rules for that reason, but for the purpose
         of "is this link answered" either form answering is enough. */
      redirectFroms.add(from.replace(/\/+$/, '') || '/');
      redirectFroms.add(from.endsWith('/') ? from : from + '/');
    }
  }
}

/* ---------------------------------------------------------------- resolution */
/* Returns the dist file a path lands on, or null. Both /x and /x/ find
   dist/x/index.html, so recording the resolved FILE rather than the href string
   means the two forms count as the same inbound link when finding orphans. */
const isFile = p => { try { return statSync(p).isFile(); } catch { return false; } };

const resolveToFile = path => {
  const rel = path.replace(/^\/+/, '');
  const candidates = rel === ''
    ? ['index.html']
    : [join(rel, 'index.html'), rel, rel + '.html'];
  for (const c of candidates) {
    const file = join(DIST, c);
    if (isFile(file)) return file;
  }
  return null;
};

const answeredByRedirect = path =>
  redirectFroms.has(path) ||
  redirectFroms.has(path.replace(/\/+$/, '') || '/') ||
  redirectFroms.has(path.endsWith('/') ? path : path + '/');

/* ---------------------------------------------------------------- collection */
const broken = new Map();     // href -> Set of pages that write it
const viaRedirect = new Map();
const inbound = new Set();    // resolved dist files that something links to
let internalLinks = 0;

const note = (map, key, page) => {
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(urlOf(page));
};

for (const page of pages) {
  const html = readFileSync(page, 'utf8');

  /* Both quote styles. Astro emits double, but several CMS fields accept raw
     HTML (the guide blocks, the article closing line) and a hand-pasted anchor
     is exactly where a single-quoted or relative href would come from. */
  for (const m of html.matchAll(/<a\s[^>]*?href\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    const raw = (m[1] ?? m[2] ?? '').trim();

    /* href="" reloads the current page. It is always a mistake, and it is
       invisible in a browser until someone clicks it. */
    if (raw === '') { note(broken, '(empty href)', page); continue; }

    if (raw.startsWith('#')) continue;              // same-page anchor
    if (raw.startsWith('//')) continue;             // protocol-relative, external
    if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) continue; // http(s), mailto, tel, javascript

    /* Absolute paths as written; anything else is relative to the page. */
    let path = raw.startsWith('/')
      ? raw
      : '/' + normalize(join(dirname(urlOf(page)), raw)).replace(/\\/g, '/').replace(/^\/+/, '');

    path = path.split('#')[0].split('?')[0];
    if (path === '') continue;                      // was a bare #fragment or ?query

    try { path = decodeURIComponent(path); } catch { /* keep it as written */ }

    internalLinks++;

    const file = resolveToFile(path);
    if (file) { inbound.add(file); continue; }
    if (answeredByRedirect(path)) { note(viaRedirect, raw, page); continue; }
    note(broken, raw, page);
  }
}

/* ---------------------------------------------------------------- reporting */
const orphans = pages.filter(p => !inbound.has(p) && !ORPHAN_EXEMPT.has(p));

/* Most-referenced first: a bad nav href appears on every page and is the one
   worth fixing before the rest. */
const bySpread = m => [...m.entries()].sort((a, b) => b[1].size - a[1].size);

if (broken.size) {
  console.error('Internal link goes nowhere:');
  for (const [href, pgs] of bySpread(broken).slice(0, 15)) {
    console.error(`  ${href}  (on ${pgs.size} page${pgs.size > 1 ? 's' : ''}, e.g. ${[...pgs][0]})`);
  }
  if (broken.size > 15) console.error(`  ...and ${broken.size - 15} more.`);
  console.error('  Fix the href, build the page, or add a redirect for it.');
  console.error('  A link written in nav.ts is on every page, so check there first.');
  process.exit(1);
}

if (orphans.length) {
  console.error('Page exists but nothing links to it:');
  orphans.slice(0, 15).forEach(o => console.error('  ' + urlOf(o)));
  if (orphans.length > 15) console.error(`  ...and ${orphans.length - 15} more.`);
  console.error('  Link it from its pillar, hub or footer, or it can only be found via the sitemap.');
  process.exit(1);
}

if (viaRedirect.size) {
  console.log(`  ${viaRedirect.size} internal link(s) point through a 301 instead of at the target:`);
  for (const [href, pgs] of bySpread(viaRedirect).slice(0, 10)) {
    console.log(`    ${href}  (on ${pgs.size} page${pgs.size > 1 ? 's' : ''}, e.g. ${[...pgs][0]})`);
  }
}

console.log(
  `Link audit passed — ${internalLinks} internal links across ${pages.length} pages, ` +
  `all resolve, no orphans${viaRedirect.size ? `, ${viaRedirect.size} via redirect (warned)` : ''}.`
);
