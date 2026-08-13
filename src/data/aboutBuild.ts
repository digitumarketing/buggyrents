/* About and FAQ pages — an adapter over src/content/about/*.json, Keystatic owned.
 *
 * Three pages on the dbr-about template: the dune buggy FAQ, the quad bike FAQ and
 * About us. They share a template because they do the same job, which is settling
 * everything a guest wants answered before they message.
 *
 * The FAQ pairs feed FAQPage schema as well as the accordion, so they stay as
 * separate question and answer fields rather than one block of prose. An answer has
 * to make sense on its own: Google may show it in a search result with no page
 * around it.
 *
 * Prices and policy lines are written as tokens ({buggyFrom}, {cancellation}, and so
 * on) and filled at build time, so the copy stays editable without the numbers
 * inside it going stale. See tokens.ts.
 *
 * Rules the build enforces on whatever is typed here: no trade licence number, no
 * DTCM, no insurance claim and no mention of its absence, no em dashes. Prices are
 * per vehicle, never per person.
 */
import type { AboutData } from '@/components/templates/About.astro';
import { fillDeep } from '@/data/tokens';

type Raw = Omit<AboutData, 'slug'> & { export: string; path: string };

const files = import.meta.glob('/src/content/about/**/*.json', {
  eager: true, import: 'default'
}) as Record<string, Raw>;

/* Filenames are unique and URLs are not: both FAQ pages live at .../faq/. Each file
   carries its own path so the two can never collide. */
const pages = new Map<string, AboutData>();
for (const raw of Object.values(files)) {
  const { export: name, path, ...copy } = fillDeep(raw);
  pages.set(name, { ...(copy as Omit<AboutData, 'slug'>), slug: path });
}

function get(name: string): AboutData {
  const p = pages.get(name);
  if (!p) throw new Error(`No about page "${name}" in src/content/about. That page and every link to it would 404.`);
  return p;
}

export const buggyFaq = get('buggyFaq');
export const quadFaq = get('quadFaq');
export const safariFaq = get('safariFaq');
export const aboutUs = get('aboutUs');
