/* Real contrast audit.
 *
 * The old check compared five hardcoded selector pairs, which is why the same
 * white-on-white class of bug shipped three separate times: white card titles in
 * a navy section, then invisible FAQ questions on the safari page, then a lede
 * that inherited dark grey onto navy. Each time the failing selector simply was
 * not in the list.
 *
 * This walks the built DOM instead. For every text node it resolves the effective
 * colour and the nearest painted background by walking up the ancestor chain,
 * then applies the WCAG AA ratio. Nothing needs to be registered in advance, so a
 * new template is covered the moment it is built.
 *
 * Limitations worth knowing: no gradients (an element painted only by a gradient
 * is skipped), no opacity stacking, no media queries beyond the base cascade.
 * Those are acceptable because the recurring bug has always been a flat colour
 * pair, and skipping is safer than a false failure that trains people to ignore
 * the audit.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';

const DIST = 'dist';
const AA_NORMAL = 4.5;
const AA_LARGE = 3.0;

/* Two tiers, because one threshold cannot serve both jobs.
 *
 * FAIL is reserved for text that is effectively unreadable: the white-on-white
 * and grey-on-navy class of bug that has now shipped three times. Below 2.5:1 a
 * reader cannot use the text at all, so it is always a mistake, never a choice.
 *
 * WARN covers 2.5 to 4.5, which is where deliberate brand decisions live: the
 * orange kicker on sand, the soft grey micro-labels. Those are the client's call,
 * not the build's. Failing on them would make the audit noise and it would get
 * switched off, which costs more than the warnings are worth. */
const FAIL_BELOW = 2.5;

/* White on the official WhatsApp green is 1.98:1 and fails AA, but it is the
   recognised brand pairing and changing it would hurt the button more than help.
   Anything added here needs a reason like that one. */
const ALLOW = [
  { cls: 'btn--wa', why: 'official WhatsApp brand green, recognisability beats ratio' },
  { cls: 'rv__stars', why: 'gold stars on white is the universal review convention, and the rating is also given as text' }
];

/* ------------------------------------------------------------------ colour */
const NAMED = { white: '#ffffff', black: '#000000', transparent: null, inherit: null };

function toRgb(v) {
  if (!v) return null;
  v = v.trim().toLowerCase();
  if (v in NAMED) return NAMED[v] ? toRgb(NAMED[v]) : null;
  /* Four and eight digit hex carry alpha. The minifier rewrites every rgba() into
     that form, so without these two branches every translucent colour parsed as
     null, the element looked like it had no colour, and the audit inherited a dark
     body colour onto navy sections. That alone was ~2,000 false failures. */
  let m = v.match(/^#([0-9a-f]{3,4})$/);
  if (m) {
    const p = m[1].split('').map(c => parseInt(c + c, 16));
    return [p[0], p[1], p[2], p.length > 3 ? p[3] / 255 : 1];
  }
  m = v.match(/^#([0-9a-f]{6}|[0-9a-f]{8})$/);
  if (m) {
    const p = [];
    for (let i = 0; i < m[1].length; i += 2) p.push(parseInt(m[1].slice(i, i + 2), 16));
    return [p[0], p[1], p[2], p.length > 3 ? p[3] / 255 : 1];
  }
  m = v.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (p.length >= 3 && p.slice(0, 3).every(n => !Number.isNaN(n))) {
      return [p[0], p[1], p[2], p.length > 3 && !Number.isNaN(p[3]) ? p[3] : 1];
    }
  }
  return null;
}

/* Flatten a translucent colour onto whatever is behind it. */
const over = (fg, bg) => fg[3] >= 1 ? fg
  : [0, 1, 2].map(i => Math.round(fg[i] * fg[3] + bg[i] * (1 - fg[3]))).concat(1);

const lum = c => {
  const a = [0, 1, 2].map(i => {
    const x = c[i] / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/* -------------------------------------------------------------------- CSS */
function collectVars(css) {
  const vars = {};
  for (const m of css.matchAll(/--([a-z0-9-]+)\s*:\s*([^;}]+)/gi)) {
    if (!(m[1] in vars)) vars[m[1]] = m[2].trim();
  }
  return vars;
}

function resolveVar(value, vars, depth = 0) {
  if (!value || depth > 6) return value;
  return value.replace(/var\(\s*--([a-z0-9-]+)\s*(?:,\s*([^)]+))?\)/gi,
    (_, name, fallback) => resolveVar(vars[name] ?? fallback ?? '', vars, depth + 1));
}

/* Strip at-rules so only the base cascade is considered. Media-query overrides
   are mostly responsive sizing here, and guessing a viewport would add noise. */
function stripAtRules(css) {
  let out = '', depth = 0, i = 0;
  while (i < css.length) {
    if (css.startsWith('@media', i) || css.startsWith('@supports', i) || css.startsWith('@keyframes', i)) {
      let brace = 0, started = false;
      while (i < css.length) {
        if (css[i] === '{') { brace++; started = true; }
        else if (css[i] === '}') { brace--; if (started && brace === 0) { i++; break; } }
        i++;
      }
      continue;
    }
    out += css[i++];
  }
  return out;
}

function parseRules(css, vars) {
  const rules = [];
  const body = stripAtRules(css);
  for (const m of body.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const decls = m[2];
    const colorM = [...decls.matchAll(/(?:^|;)\s*color\s*:\s*([^;!]+)/gi)].pop();
    const bgM = [...decls.matchAll(/(?:^|;)\s*background(?:-color)?\s*:\s*([^;!]+)/gi)].pop();
    if (!colorM && !bgM) continue;
    const color = colorM ? toRgb(resolveVar(colorM[1], vars)) : undefined;
    let bg;
    if (bgM) {
      const raw = resolveVar(bgM[1], vars).trim();
      /* A gradient or image paints something we cannot reduce to one colour.
         Mark it opaque-unknown so descendants stop inheriting a stale background. */
      bg = /gradient|url\(/i.test(raw) ? 'unknown' : toRgb(raw);
    }
    for (const sel of m[1].split(',')) {
      const s = sel.trim();
      /* Pseudo-elements paint their own box, not the element's. Minified CSS
         writes them single-colon, so ".ct__status-item:before{background:orange}"
         was being read as the list item's own background and every bullet made
         its text look like white on orange. */
      if (!s || /::|:(before|after|marker|placeholder|selection|backdrop)\b/i.test(s) || s.startsWith('@')) continue;
      rules.push({ sel: s, color, bg, spec: specificity(s), order: rules.length });
    }
  }
  return rules;
}

function specificity(sel) {
  const ids = (sel.match(/#[\w-]+/g) || []).length;
  const cls = (sel.match(/\.[\w-]+|\[[^\]]+\]|:[a-z-]+(?!\()/gi) || []).length;
  const els = (sel.replace(/[.#:\[][^\s>+~]*/g, ' ').match(/\b[a-z][\w-]*/gi) || []).length;
  return ids * 10000 + cls * 100 + els;
}

/* Match a compound selector like ".a.b" against one element. */
function matchesCompound(part, el) {
  if (!part || part === '*') return true;

  /* Pull :not(...) out before reading classes. Left in place, its argument was
     being treated as a REQUIRED class, so "p:not(.eyebrow)" only matched elements
     that had .eyebrow — the exact opposite. That turned correct white-on-navy CTA
     text into a reported failure. */
  const nots = [];
  part = part.replace(/:not\(([^)]*)\)/gi, (_m, inner) => { nots.push(inner.trim()); return ''; });
  for (const n of nots) {
    if (n && matchesCompound(n, el)) return false;
  }

  const tag = (part.match(/^[a-z][\w-]*/i) || [])[0];
  if (tag && el.rawTagName?.toLowerCase() !== tag.toLowerCase()) return false;
  for (const c of part.match(/\.[\w-]+/g) || []) {
    if (!el.classList.contains(c.slice(1))) return false;
  }
  for (const id of part.match(/#[\w-]+/g) || []) {
    if (el.getAttribute('id') !== id.slice(1)) return false;
  }
  /* Ignore states we cannot evaluate statically, but reject the ones that would
     make a rule apply only in a state the reader is not in. */
  if (/:(hover|focus|active|focus-visible|checked|target)\b/.test(part)) return false;
  return true;
}

/* Descendant and child combinators, matched right to left. */
function matches(sel, el) {
  if (/[+~]/.test(sel)) return false;
  /* Minified CSS writes child combinators without spaces, as ".a>span". Splitting
     on whitespace alone left that as one token, the ">span" was ignored, and the
     rule matched any .a element. That single miss produced most of the audit's
     false positives, including a hero eyebrow reported as sitting on orange. */
  const parts = sel.replace(/\s*>\s*/g, ' > ').trim().split(/\s+/).reverse();
  let cur = el, i = 0;
  while (i < parts.length) {
    const part = parts[i];
    if (part === '>') {
      i++;
      cur = cur?.parentNode;
      if (!cur || cur.nodeType !== 1 || !matchesCompound(parts[i], cur)) return false;
      i++;
      continue;
    }
    if (i === 0) {
      if (!matchesCompound(part, cur)) return false;
      i++;
      continue;
    }
    let p = cur.parentNode, found = false;
    while (p && p.nodeType === 1) {
      if (matchesCompound(part, p)) { cur = p; found = true; break; }
      p = p.parentNode;
    }
    if (!found) return false;
    i++;
  }
  return true;
}

function declFor(rules, el, prop) {
  let best = null;
  for (const r of rules) {
    const v = r[prop];
    if (v === undefined) continue;
    if (!matches(r.sel, el)) continue;
    if (!best || r.spec > best.spec || (r.spec === best.spec && r.order > best.order)) {
      best = { ...r, value: v };
    }
  }
  return best ? best.value : undefined;
}

function inlineStyle(el, prop) {
  const s = el.getAttribute('style');
  if (!s) return undefined;
  const m = s.match(new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`, 'i'));
  return m ? toRgb(m[1]) : undefined;
}

/* ------------------------------------------------------------------ audit */
const TEXT_TAGS = new Set(['h1','h2','h3','h4','h5','h6','p','li','span','strong','em','a','dt','dd','small','summary','figcaption','td','th','label','button','pre','blockquote']);

function ownText(el) {
  return el.childNodes
    .filter(n => n.nodeType === 3)
    .map(n => n.rawText.replace(/&[a-z]+;/gi, ' ').trim())
    .join(' ')
    .trim();
}

function effectiveColor(el, rules) {
  let cur = el;
  while (cur && cur.nodeType === 1) {
    const v = inlineStyle(cur, 'color') ?? declFor(rules, cur, 'color');
    if (v) return v;
    cur = cur.parentNode;
  }
  return [26, 26, 26, 1];
}

function effectiveBg(el, rules) {
  let cur = el;
  const stack = [];
  while (cur && cur.nodeType === 1) {
    const v = inlineStyle(cur, 'background-color') ?? declFor(rules, cur, 'bg');
    if (v === 'unknown') return null;
    if (v && v[3] > 0) {
      stack.push(v);
      if (v[3] >= 1) break;
    }
    cur = cur.parentNode;
  }
  if (!stack.length) return [255, 255, 255, 1];
  let out = stack[stack.length - 1];
  if (out[3] < 1) out = over(out, [255, 255, 255, 1]);
  for (let i = stack.length - 2; i >= 0; i--) out = over(stack[i], out);
  return out;
}

function isLarge(el, rules) {
  const tag = el.rawTagName?.toLowerCase();
  return tag === 'h1' || tag === 'h2' || tag === 'h3';
}

const pages = [];
const walk = d => readdirSync(d).forEach(f => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) walk(p);
  else if (p.endsWith('.html')) pages.push(p);
});
walk(DIST);

const failures = [];
const warnings = [];
let checked = 0;

for (const page of pages) {
  const html = readFileSync(page, 'utf8');

  /* Astro inlines only the small critical sheets; the template CSS lives in
     /_astro/*.css. Reading just <style> once made every dark section look white
     and produced a page of false failures, so pull the linked sheets in too.
     Link order first, then inline, which is how the browser cascades them. */
  const linked = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="(\/[^"]+\.css)"/g)]
    .map(m => join(DIST, m[1]))
    .filter(p => existsSync(p))
    .map(p => readFileSync(p, 'utf8'));
  const inline = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]);
  const css = [...linked, ...inline].join('\n');
  if (!css) continue;
  const vars = collectVars(css);
  const rules = parseRules(css, vars);
  const root = parse(html, { blockTextElements: { script: false, style: false } });

  for (const el of root.querySelectorAll('*')) {
    const tag = el.rawTagName?.toLowerCase();
    if (!TEXT_TAGS.has(tag)) continue;
    const text = ownText(el);
    if (text.length < 3) continue;
    if (el.closest('script') || el.closest('style')) continue;
    /* Hidden from the accessibility tree and decorative by definition. */
    if (el.getAttribute('aria-hidden') === 'true') continue;

    const fgRaw = effectiveColor(el, rules);
    const bg = effectiveBg(el, rules);
    if (!fgRaw || !bg) continue;
    const fg = over(fgRaw, bg);
    checked++;

    const r = ratio(fg, bg);
    const need = isLarge(el, rules) ? AA_LARGE : AA_NORMAL;
    if (r >= need) continue;
    if (ALLOW.some(a => el.classList.contains(a.cls))) continue;

    (r < FAIL_BELOW ? failures : warnings).push({
      page, tag,
      cls: el.classNames || '(no class)',
      text: text.slice(0, 52),
      fg: `rgb(${fg.slice(0, 3).join(',')})`,
      bg: `rgb(${bg.slice(0, 3).join(',')})`,
      r: r.toFixed(2), need
    });
  }
}

/* One line per distinct selector+colour pair, not per occurrence, or a single
   bad rule in the header would print 57 times. */
function group(list) {
  const seen = new Map();
  for (const f of list) {
    const key = `${f.cls}|${f.fg}|${f.bg}`;
    if (!seen.has(key)) seen.set(key, { ...f, count: 0, pages: new Set() });
    const e = seen.get(key);
    e.count++;
    e.pages.add(f.page);
  }
  return [...seen.values()].sort((a, b) => b.count - a.count);
}

if (warnings.length) {
  const g = group(warnings);
  console.warn(`  Below WCAG AA but readable, ${g.length} distinct pair(s). Client design call:`);
  for (const w of g.slice(0, 8)) {
    console.warn(`    ${w.fg} on ${w.bg} = ${w.r}:1 (needs ${w.need})  <${w.tag} class="${w.cls}">  x${w.count}`);
  }
  if (g.length > 8) console.warn(`    ...and ${g.length - 8} more pair(s).`);
}

if (failures.length) {
  const g = group(failures);
  console.error(`\nText is effectively unreadable on ${new Set(failures.map(f => f.page)).size} page(s):\n`);
  for (const f of g.slice(0, 15)) {
    console.error(`  <${f.tag} class="${f.cls}">`);
    console.error(`     "${f.text}"`);
    console.error(`     ${f.fg} on ${f.bg} = ${f.r}:1, unreadable below ${FAIL_BELOW}:1`);
    console.error(`     ${f.count} occurrence(s) across ${f.pages.size} page(s), e.g. ${[...f.pages][0]}\n`);
  }
  console.error(`${checked} text elements checked, ${failures.length} unreadable.`);
  process.exit(1);
}

console.log(`DOM contrast audit passed — ${checked} text elements across ${pages.length} pages, none unreadable${warnings.length ? `, ${warnings.length} below AA (warned)` : ''}.`);
