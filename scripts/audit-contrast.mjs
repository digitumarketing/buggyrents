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
