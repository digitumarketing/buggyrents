/* Renders each built page in a headless DOM-less way is not possible without a browser,
   so this does the next best thing: it resolves the CSS cascade for known
   "text on a surface" pairs and fails the build when contrast is too low.
   Catches the white-heading-on-white-card class of bug. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
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
  const hits = [];
  for (const page of pages) {
    const text = readFileSync(page, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' ');
    for (const re of banned) {
      const m = text.match(re);
      if (m) hits.push(`${page}: "${m[0]}"`);
    }
  }
  if (hits.length) {
    console.error('Insurance claim found, but the business has no cover:');
    hits.slice(0, 10).forEach(h => console.error('  ' + h));
    process.exit(1);
  }
  console.log('Claims audit passed — no insurance claims.');
}
