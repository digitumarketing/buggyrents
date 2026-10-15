/* KEYSTATIC LIST PATCH, added 15 Oct 2026. Runs on every `npm install` (postinstall).

   SEO > Redirections stores each entry's type as a Keystatic conditional
   ({ discriminant: '301', value: '/to/' }) so the Destination box can hide for 410.
   Keystatic's list view prints a column with `value + ''`, which turns that object
   into "[object Object]". This one-line change prints the discriminant instead, so
   the Type column reads 301, 302, 410 and so on.

   It only affects how a conditional is shown in a list column; every other column
   is untouched. If a Keystatic upgrade changes the line, the patch is skipped with a
   warning and nothing breaks: the Type column just goes back to "[object Object]". */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const FILE = 'node_modules/@keystatic/core/dist/keystatic-core-ui.js';
const FROM = "val = val + '';";
const TO = "val = typeof val === 'object' && 'discriminant' in val ? String(val.discriminant) : val + '';";

if (!existsSync(FILE)) process.exit(0);
const src = readFileSync(FILE, 'utf8');
if (src.includes(TO)) process.exit(0);
const n = src.split(FROM).length - 1;
if (n !== 1) {
  console.warn(`patch-keystatic: expected 1 match in ${FILE}, found ${n}. Skipped; the Redirections Type column will read [object Object].`);
  process.exit(0);
}
writeFileSync(FILE, src.replace(FROM, TO));
console.log('patch-keystatic: Redirections list now shows the redirect type.');
