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
      if (!/brand\//.test(src) && !decorative) {
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
