/* Renders each built page in a headless DOM-less way is not possible without a browser,
   so this does the next best thing: it resolves the CSS cascade for known
   "text on a surface" pairs and fails the build when contrast is too low.
   Catches the white-heading-on-white-card class of bug. */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const TOKENS = {
  '--c-navy': '#323D4E', '--c-navy-dark': '#232C3A', '--c-orange': '#FF6600',
  '--c-orange-dark': '#C24E00', '--c-ink': '#1A1A1A', '--c-ink-muted': '#5A6472',
  '--c-ink-soft': '#8A93A0', '--c-sand-soft': '#FDF6E9', '--c-gold': '#FFC757'
};
const hex = v => {
  v = (v || '').trim();
  if (v.startsWith('var(')) { const k = v.slice(4, -1).split(',')[0].trim(); return TOKENS[k] || null; }
  if (/^#[0-9a-f]{6}$/i.test(v)) return v;
  if (/^#[0-9a-f]{3}$/i.test(v)) return '#' + v.slice(1).split('').map(c => c + c).join('');
  if (v === '#fff' || v === 'white') return '#ffffff';
  return null;
};
const lum = h => {
  const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
    .map(x => x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const walk = d => readdirSync(d).flatMap(f => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});

/* selector -> [text colour rule, background it sits on] */
const PAIRS = [
  ['.pl__package-title', 'var(--c-navy)', '#ffffff'],
  ['.pl__info-card h3',  'var(--c-navy)', '#ffffff'],
  ['.pl__timeline h3',   'var(--c-navy)', '#ffffff'],
  ['.rv__head strong',   'var(--c-navy)', '#ffffff'],
  ['.pl__package-desc',  'var(--c-ink-muted)', '#ffffff']
];

let fails = 0;
for (const file of walk(DIST)) {
  const html = readFileSync(file, 'utf8');
  const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('');
  for (const [sel, want, bg] of PAIRS) {
    if (!html.includes(sel.slice(1))) continue;
    const esc = sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rules = [...css.matchAll(new RegExp(esc + '[^{]*\\{([^}]*)\\}', 'g'))];
    const colours = rules.flatMap(r => [...r[1].matchAll(/(?:^|;)\s*color:\s*([^;]+)/g)].map(m => m[1]));
    const eff = hex(colours.at(-1) || want);
    if (!eff) continue;
    const r = ratio(eff, bg);
    if (r < 4.5) {
      console.error(`FAIL  ${file}  ${sel}  ${eff} on ${bg}  contrast ${r.toFixed(2)}:1`);
      fails++;
    }
  }
}
if (fails) { console.error(`\n${fails} contrast failure(s).`); process.exit(1); }
console.log('Contrast audit passed — no low-contrast text on card surfaces.');

/* Guard against malformed colour functions, e.g. rgba(50,61,78.05) missing the alpha comma. */
{
  const files = [];
  const walkSrc = d => readdirSync(d).forEach(f => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walkSrc(p);
    else if (/\.(astro|css)$/.test(p)) files.push(p);
  });
  try { walkSrc('src'); } catch {}
  const bad = [];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/\brgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\.\d+\s*\)/g)) bad.push(`${f}: ${m[0]}`);
    /* clamp() with a missing comma, e.g. clamp(1rem.9rem + .45vw, 1.22rem).
       CSS silently drops the whole declaration, so the element quietly renders at
       its inherited size and nothing looks broken enough to notice. Two of these
       had been shipping on the homepage hero and the long-form reader since the
       first build. Same class of bug as the rgba one above: valid-looking, invalid. */
    for (const m of src.matchAll(/clamp\(\s*[\d.]+(?:rem|px|em|vw)[\d.]/g)) bad.push(`${f}: ${m[0]}...  clamp() is missing a comma`);
    /* The separator left behind when em dashes were stripped sitewide. */
    for (const m of src.matchAll(/\s,\s\s/g)) bad.push(`${f}: stray " ,  " separator`);
  }
  if (bad.length) {
    console.error('Malformed colour values (missing alpha comma):');
    bad.forEach(b => console.error('  ' + b));
    process.exit(1);
  }
  console.log('Colour-syntax audit passed.');
}

/* No image may be used more than once across the built site, and every img needs alt text. */
{
  const pages = [];
  const walkD = d => readdirSync(d).forEach(f => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walkD(p);
    else if (p.endsWith('.html')) pages.push(p);
  });
  walkD(DIST);
  const seen = new Map(), noAlt = [];
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
      const tag = m[0];
      const src = (tag.match(/src="([^"]+)"/) || [])[1];
      const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
      if (!src || src.startsWith('data:')) continue;
      const decorative = /aria-hidden="true"/.test(tag);
      if (!decorative && (alt === undefined || alt.trim() === '')) {
        if (!/brand\/google-g|logo/.test(src)) noAlt.push(`${page}: ${src}`);
      }
      /* Decorative images were exempt from the duplicate check, which let the same
         hero photo appear at the top and bottom of a page unnoticed. aria-hidden
         only removes it from the accessibility tree; the reader still sees it. */
      if (!/brand\//.test(src)) {
        const key = `${page}|${src}`;
        seen.set(key, (seen.get(key) || 0) + 1);
      }
    }
  }
  const dupes = [...seen.entries()].filter(([, n]) => n > 1);
  if (dupes.length) {
    console.error('Image reused on the same page:');
    dupes.forEach(([k, n]) => console.error(`  ${k} x${n}`));
    process.exit(1);
  }
  if (noAlt.length) {
    console.error('Images missing alt text:');
    noAlt.slice(0, 10).forEach(x => console.error('  ' + x));
    process.exit(1);
  }
  console.log('Image audit passed — no reuse within a page, all alt text present.');
}


/* The business carries no rider insurance. Any claim of cover would be a false statement
   on a booking page, so fail the build if one appears. */
{
  const banned = [/\binsured\b/i, /\binsurance\b/i, /fully covered/i, /\bcover(?:age)? included\b/i];
  const pages = [];
  const walkI = d => readdirSync(d).forEach(f => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walkI(p);
    else if (p.endsWith('.html')) pages.push(p);
  });
  walkI(DIST);

  /* The terms and safety pages have to state plainly that we carry NO cover, so a
     blanket word ban would forbid the honest disclosure as well as the false claim.
     Judge each sentence: a negated mention is a denial and is allowed, a bare one
     reads as a claim of cover and fails. Erring towards false positives is correct
     here — a wrongly flagged sentence costs a rewrite, a missed one is a lie on a
     booking page. */
  const DENIAL = /\b(no|not|never|without|nor|lack|lacks|excludes?|exclusion|carries no|do not|does not|don't|doesn't|is not|are not|isn't|aren't|cannot|can't)\b/i;

  /* Telling a guest to check their OWN travel policy is advice, not a claim about us,
     and it can never be misread as cover we provide. Allow that framing explicitly so
     the copy can be helpful instead of either boastful or bleak. The possessive is what
     makes it safe: "your insurance" is theirs, "insurance included" is a claim. */
  const GUEST_OWNED = /\b(your|my)\s+(own\s+)?(travel\s+|medical\s+)?(insurance|policy|policies|cover)\b/i;
  const hits = [];
  for (const page of pages) {
    const text = readFileSync(page, 'utf8')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ');
    const sentences = text.split(/(?<=[.!?])\s+/);
    sentences.forEach((sentence, i) => {
      /* A question is not a claim, but only if its answer denies cover. Read the
         FAQ heading together with the reply that follows it. */
      const scope = sentence.trim().endsWith('?')
        ? `${sentence} ${sentences[i + 1] ?? ''}`
        : sentence;
      if (GUEST_OWNED.test(scope)) return;
      for (const re of banned) {
        if (re.test(sentence) && !DENIAL.test(scope)) {
          hits.push(`${page}\n      "${sentence.trim().slice(0, 150)}"`);
          break;
        }
      }
    });
  }
  if (hits.length) {
    console.error('Sentence implies insurance cover, but the business carries none:');
    hits.slice(0, 10).forEach(h => console.error('  ' + h));
    console.error('  Rewrite it, or state the absence of cover explicitly.');
    process.exit(1);
  }
  console.log('Claims audit passed — no sentence implies cover.');
}


/* Resolution audit. A card image renders about 400px wide on desktop and 800px on a 2x
   screen, so anything under ~500px source is visibly soft and anything tiny is a bug —
   we shipped a 260x194 thumbnail once because it was the only copy of that photo.
   Hard-fail the broken class, warn on the merely small so it stays visible. */
{
  const { imageSize } = await import('image-size').catch(() => ({ imageSize: null }));
  const LIB = join(DIST, 'assets/images/lib');
  const HARD_MIN = 500;
  const SOFT_MIN = 900;

  if (!imageSize) {
    console.log('Resolution audit skipped — image-size not installed.');
  } else {
    const used = new Set();
    const walkR = d => readdirSync(d).forEach(f => {
      const p = join(d, f);
      if (statSync(p).isDirectory()) walkR(p);
      else if (p.endsWith('.html')) {
        for (const m of readFileSync(p, 'utf8').matchAll(/\/assets\/images\/lib\/([a-z0-9-]+)\.webp/g)) used.add(m[1]);
      }
    });
    walkR(DIST);

    const tooSmall = [], soft = [];
    for (const name of used) {
      const file = join(LIB, `${name}.webp`);
      if (!existsSync(file)) continue;
      const { width, height } = imageSize(readFileSync(file));
      if (width < HARD_MIN) tooSmall.push(`${name} — ${width}x${height}`);
      else if (width < SOFT_MIN) soft.push(`${name} — ${width}x${height}`);
    }

    if (tooSmall.length) {
      console.error(`Image too low resolution to ship (under ${HARD_MIN}px wide):`);
      tooSmall.forEach(h => console.error('  ' + h));
      console.error('  Re-export from a larger original, or ask the client for a better photo.');
      process.exit(1);
    }
    soft.forEach(s => console.warn(`  Soft image (under ${SOFT_MIN}px wide): ${s}`));
    console.log(`Resolution audit passed — ${used.size} images, none under ${HARD_MIN}px${soft.length ? `, ${soft.length} below ${SOFT_MIN}px` : ''}.`);
  }
}


/* Client rule: no em dashes anywhere in website content. They slipped in twice via
   schema Offer names, which are content even though they never render on screen —
   Google reads them. Check visible text, meta, and JSON-LD; ignore code comments. */
{
  const pages = [];
  const walkE = d => readdirSync(d).forEach(f => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walkE(p);
    else if (p.endsWith('.html')) pages.push(p);
  });
  walkE(DIST);

  const hits = [];
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');

    const jsonLd = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
      .map(m => m[1]).join(' ');
    const meta = [...html.matchAll(/<meta[^>]*content="([^"]*)"/g)].map(m => m[1]).join(' ');
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '';
    const visible = html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]*>/g, ' ');

    for (const [where, text] of [['body', visible], ['schema', jsonLd], ['meta', meta], ['title', title]]) {
      const m = text.match(/.{0,50}—.{0,50}/);
      if (m) hits.push(`${page} (${where}): ...${m[0].replace(/\s+/g, ' ').trim()}...`);
    }
  }
  if (hits.length) {
    console.error('Em dash found. The client asked for none anywhere on the site:');
    hits.slice(0, 10).forEach(h => console.error('  ' + h));
    if (hits.length > 10) console.error(`  ...and ${hits.length - 10} more.`);
    process.exit(1);
  }
  console.log('Em dash audit passed — none in body, schema, meta or title.');
}


/* Every local asset a page references must actually exist in dist.
   The favicons and the Open Graph image were linked in the layout for weeks while
   the files were never created, so every page fired four 404s, browsers showed a
   blank tab icon, and links shared on WhatsApp had no preview image. Nothing in
   the build noticed, because a missing static file is not a build error. */
{
  const pages = [];
  const walkA = d => readdirSync(d).forEach(f => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walkA(p);
    else if (p.endsWith('.html')) pages.push(p);
  });
  walkA(DIST);

  const missing = new Map();
  const record = (url, page) => {
    if (!missing.has(url)) missing.set(url, new Set());
    missing.get(url).add(page);
  };

  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    const urls = new Set();
    for (const re of [
      /<link[^>]+href="(\/[^"]+)"/g,
      /<script[^>]+src="(\/[^"]+)"/g,
      /<img[^>]+src="(\/[^"]+)"/g,
      /<source[^>]+srcset="(\/[^"\s]+)/g,
      /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/g,
      /<meta[^>]+content="([^"]+)"[^>]+property="og:image"/g
    ]) {
      for (const m of html.matchAll(re)) urls.add(m[1]);
    }
    for (let u of urls) {
      /* og:image is absolute. Reduce it to a path we can check on disk. */
      if (/^https?:\/\//.test(u)) {
        try { u = new URL(u).pathname; } catch { continue; }
      }
      if (!u.startsWith('/') || u.startsWith('//')) continue;
      const file = join(DIST, decodeURIComponent(u.split('?')[0]));
      if (!existsSync(file)) record(u, page);
    }
  }

  if (missing.size) {
    console.error('Referenced file does not exist in the build:');
    for (const [url, pgs] of [...missing.entries()].sort((a, b) => b[1].size - a[1].size).slice(0, 15)) {
      console.error(`  ${url}  (referenced by ${pgs.size} page${pgs.size > 1 ? 's' : ''}, e.g. ${[...pgs][0]})`);
    }
    process.exit(1);
  }
  console.log(`Asset audit passed — every referenced file exists across ${pages.length} pages.`);
}


/* Placeholders and stringified objects that should never reach a visitor.
   "[object Object]" shipped on the contact page and in an About us answer because
   an object was interpolated where a string was expected. Nothing failed: it is
   valid output, just meaningless. Same class as a stray TODO or an undefined. */
{
  const pages = [];
  const walkP = d => readdirSync(d).forEach(f => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walkP(p);
    else if (p.endsWith('.html')) pages.push(p);
  });
  walkP(DIST);

  const banned = [
    /\[object [A-Z]\w+\]/,
    /\bundefined\b(?!\s*[)'"])/,
    /\bNaN\b/,
    /\bPLACEHOLDER\b/i,
    /\bLorem ipsum\b/i,
    /\bTODO\b/,
    /\{\{[^}]+\}\}/          // an unrendered template expression
  ];

  const hits = [];
  for (const page of pages) {
    /* Visible text and meta only. Scripts legitimately contain "undefined". */
    const html = readFileSync(page, 'utf8');
    const meta = [...html.matchAll(/<meta[^>]*content="([^"]*)"/g)].map(m => m[1]).join(' ');
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '';
    const ld = [...html.matchAll(/<script[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).join(' ');
    const visible = html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]*>/g, ' ');

    for (const [where, text] of [['body', visible], ['schema', ld], ['meta', meta], ['title', title]]) {
      for (const re of banned) {
        const m = text.match(re);
        if (m) {
          const i = text.indexOf(m[0]);
          hits.push(`${page} (${where}): ...${text.slice(Math.max(0, i - 40), i + 50).replace(/\s+/g, ' ').trim()}...`);
          break;
        }
      }
    }
  }
  if (hits.length) {
    console.error('Placeholder or stringified object reached the page:');
    hits.slice(0, 10).forEach(h => console.error('  ' + h));
    if (hits.length > 10) console.error(`  ...and ${hits.length - 10} more.`);
    process.exit(1);
  }
  console.log('Placeholder audit passed — no [object Object], undefined or TODO in output.');
}


/* Every AED figure on the site must trace back to a real price.
 *
 * Now that prices live in the CMS, a figure typed into prose goes stale the moment
 * the client edits it, and the page then contradicts its own price table. This
 * collects the real price set from the content files and checks every "AED n" in
 * the built HTML against it, allowing the derivations the copy legitimately makes
 * (a two seater split two ways, a four seater split four ways, and so on).
 *
 * Warns rather than fails: a genuinely new figure in an article is not a bug, and
 * a hard failure here would block a deploy over a rounding sentence. The list is
 * what matters. Anything on it is either a stale price or a number to derive.
 */
{
  const readJson = d => {
    try {
      return readdirSync(join('src/content', d))
        .filter(f => f.endsWith('.json'))
        .map(f => JSON.parse(readFileSync(join('src/content', d, f), 'utf8')));
    } catch { return []; }
  };

  const prices = new Set();
  const add = n => { if (Number.isFinite(n) && n > 0) prices.add(Math.round(n)); };

  for (const dir of ['buggies', 'quads', 'dirtbikes']) {
    for (const v of readJson(dir)) {
      const seats = Number(v.seats) || 1;
      for (const d of v.durations ?? []) {
        add(d.price);
        add(d.was);
        /* The copy routinely splits a vehicle price across its seats, which is the
           whole per-vehicle argument, so those derived figures are legitimate. */
        for (const n of [2, 3, 4]) if (seats >= n) { add(d.price / n); add(Math.floor(d.price / n)); }
        add(d.price / seats);
        add(Math.floor(d.price / seats));
      }
    }
  }
  for (const s of readJson('safari')) { add(s.price); add(s.was); }

  /* Combos, add-ons and anything else priced outside the fleet.
     These moved from src/data/extras.ts into the CMS in Phase 2 of the migration.
     The file is still scanned as a fallback so an older checkout still audits, but
     policies.json is the real source now: when it was added to the CMS without
     being added here, seven combo prices silently dropped off the known list and
     started reporting as stale copy. */
  try {
    const pol = JSON.parse(readFileSync('src/content/policies.json', 'utf8'));
    for (const c of [...(pol.bbqCombos ?? []), ...(pol.quadSafariCombos ?? []), ...(pol.addOns ?? [])])
      add(Number(c.price));
  } catch {}
  try {
    const extras = readFileSync('src/data/extras.ts', 'utf8');
    for (const m of extras.matchAll(/price:\s*(\d+)/g)) add(Number(m[1]));
    for (const m of extras.matchAll(/\bAED\s*(\d+)/g)) add(Number(m[1]));
  } catch {}

  const pages = [];
  const walkF = d => readdirSync(d).forEach(f => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walkF(p);
    else if (p.endsWith('.html')) pages.push(p);
  });
  walkF(DIST);

  const unknown = new Map();
  for (const page of pages) {
    const text = readFileSync(page, 'utf8')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]*>/g, ' ');
    /* Require a leading digit. "[\d,]+" also matched the bare comma in "the total
       in AED, usually within minutes", which stripped to "" and parsed as zero,
       reporting a phantom AED 0 on 28 pages. */
    for (const m of text.matchAll(/AED\s*(\d[\d,]*)/g)) {
      const n = Number(m[1].replace(/,/g, ''));
      if (!prices.has(n)) {
        if (!unknown.has(n)) unknown.set(n, new Set());
        unknown.get(n).add(page.replace(/^dist/, '').replace(/index\.html$/, ''));
      }
    }
  }

  if (unknown.size) {
    console.warn(`  ${unknown.size} AED figure(s) in copy do not match any current price:`);
    for (const [n, pgs] of [...unknown.entries()].sort((a, b) => b[1].size - a[1].size).slice(0, 8)) {
      console.warn(`    AED ${n}  on ${pgs.size} page(s), e.g. ${[...pgs][0]}`);
    }
    if (unknown.size > 8) console.warn(`    ...and ${unknown.size - 8} more.`);
  }
  console.log(`Price audit passed — ${prices.size} known prices, ${unknown.size} unmatched figure(s) in copy.`);
}


/* Cross-page image variety on tour pages.
 *
 * WHY THIS EXISTS
 * Reported 10 Aug 2026: all eleven dune buggy tour pages opened with the same hero
 * and carried the same three gallery photos, and the six quad pages did the same.
 * Nothing was broken in a way any existing audit could see — every image existed,
 * every alt was present, no page repeated an image within itself — so it shipped.
 * A visitor comparing two buggies saw identical photography and reasonably assumed
 * the pages were padding.
 *
 * The rule: no two tour pages in the same category may carry an identical set of
 * content images. Heroes are excluded, because a shared category hero is a
 * deliberate choice while the library has only one usable landscape shot per
 * subject. Identical SETS fail; overlap is fine and unavoidable with 17 photos
 * spread across 11 pages.
 */
{
  const groups = {
    'dune buggy': `${DIST}/dune-buggy-dubai`,
    'quad bike':  `${DIST}/quad-bike-dubai`,
    'dirt bike':  `${DIST}/ktm-dirt-bike-dubai`
  };
  const clashes = [];
  let checked = 0;

  for (const [label, dir] of Object.entries(groups)) {
    let entries = [];
    try { entries = readdirSync(dir); } catch { continue; }

    const sets = new Map();   // fingerprint -> [page, …]
    for (const name of entries) {
      const file = join(dir, name, 'index.html');
      let html;
      try { html = readFileSync(file, 'utf8'); } catch { continue; }
      if (name === 'price' || name === 'faq') continue;

      const imgs = [...html.matchAll(/\/assets\/images\/lib\/([a-z0-9-]+)\.webp/g)]
        .map(m => m[1]);
      if (!imgs.length) continue;
      checked++;

      const key = [...new Set(imgs)].sort().join('|');
      if (!sets.has(key)) sets.set(key, []);
      sets.get(key).push(`/${name}/`);
    }

    for (const [, pgs] of sets) {
      if (pgs.length > 1) clashes.push(`${label}: ${pgs.join(', ')} carry an identical image set`);
    }
  }

  if (clashes.length) {
    console.error('Tour pages share an identical set of images:');
    clashes.forEach(c => console.error('  ' + c));
    console.error('  Vary the gallery or the cross-sell cards so each page looks like its own machine.');
    process.exit(1);
  }
  console.log(`Image variety audit passed — ${checked} tour pages, no two share an image set.`);
}


/* Title and meta description length.
 *
 * WHY THIS EXISTS
 * On 10 Aug 2026, 40 of 64 titles and 29 descriptions were long enough that Google
 * cut them off in search results. Nothing was broken, so nothing caught it: the
 * markup was valid, the copy was good, and the part being thrown away was simply
 * the end of it. On a tour page that meant the price disappeared from the result.
 *
 * WARN, NOT FAIL. These are rendering guidelines, not rules, and Google's cut-off
 * moves with pixel width rather than character count. A hard failure would block a
 * deploy over a two-character overrun, and worse, it would block the client's own
 * content edits. The list is what matters: anything on it is a page whose search
 * result is being truncated, and that is a copy decision for a person to make.
 */
{
  const TITLE_MAX = 60;
  const DESC_MAX = 160;

  const pages = [];
  const walkT = d => readdirSync(d).forEach(f => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walkT(p);
    else if (p.endsWith('.html')) pages.push(p);
  });
  walkT(DIST);

  const decode = s => s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");

  const longTitles = [];
  const longDescs = [];
  const missing = [];

  for (const page of pages) {
    if (page.includes('404')) continue;
    const html = readFileSync(page, 'utf8');
    const url = '/' + page.replace(/^dist\//, '').replace(/index\.html$/, '');

    const t = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]).trim();
    const d = decode((html.match(/<meta name="description" content="([\s\S]*?)"/) || [, ''])[1]).trim();

    if (!t || !d) missing.push(`${url} (${!t ? 'no title' : 'no description'})`);
    if (t.length > TITLE_MAX) longTitles.push(`${String(t.length).padStart(3)}  ${url}`);
    if (d.length > DESC_MAX) longDescs.push(`${String(d.length).padStart(3)}  ${url}`);
  }

  /* A page with no title or description at all IS a failure. That is not a
     guideline, it is a missing tag, and Google will invent something worse. */
  if (missing.length) {
    console.error('Pages missing a title or meta description:');
    missing.forEach(m => console.error('  ' + m));
    process.exit(1);
  }

  if (longTitles.length) {
    console.warn(`  ${longTitles.length} title(s) over ${TITLE_MAX} characters, will be truncated in search results:`);
    longTitles.slice(0, 8).forEach(t => console.warn('    ' + t));
    if (longTitles.length > 8) console.warn(`    ...and ${longTitles.length - 8} more.`);
  }
  if (longDescs.length) {
    console.warn(`  ${longDescs.length} description(s) over ${DESC_MAX} characters:`);
    longDescs.slice(0, 8).forEach(t => console.warn('    ' + t));
    if (longDescs.length > 8) console.warn(`    ...and ${longDescs.length - 8} more.`);
  }
  console.log(`Metadata audit passed — ${pages.length - 1} pages, ${longTitles.length} long title(s), ${longDescs.length} long description(s).`);
}


/* Unfilled CMS tokens.
 *
 * Copy in the CMS carries placeholders like {buggyFrom} and {cancellation} so a
 * sentence stays editable while the number inside it stays derived. tokens.ts throws
 * on an unknown token, but only for strings that actually pass through fill(). A
 * field added to a schema and then forgotten in the adapter would print the raw
 * placeholder straight onto the page, and "from AED {buggyFrom}" on a live booking
 * page is worse than any build error.
 *
 * This checks the built HTML instead of the source, so it catches the gap between
 * the two. FAILS the build: there is no version of this that is acceptable to ship.
 */
{
  const pages = [];
  const walkTok = d => readdirSync(d).forEach(f => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walkTok(p);
    else if (p.endsWith('.html')) pages.push(p);
  });
  walkTok(DIST);

  const hits = [];
  for (const page of pages) {
    const text = readFileSync(page, 'utf8')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]*>/g, ' ');
    /* Deliberately narrow: {word} only. Loosening it to any braces would trip over
       legitimate JSON-LD and inline CSS that survive the strip above. */
    for (const m of text.matchAll(/\{([a-zA-Z][a-zA-Z0-9]{2,})\}/g)) {
      hits.push(`${page.replace(/^dist/, '')}: ${m[0]}`);
    }
  }

  if (hits.length) {
    console.error('Unfilled CMS token(s) rendered onto a page:');
    [...new Set(hits)].slice(0, 10).forEach(h => console.error('  ' + h));
    console.error('  The field is missing a fill() or fillDeep() call in its adapter.');
    process.exit(1);
  }
  console.log(`Token audit passed — no unfilled placeholders across ${pages.length} pages.`);
}
