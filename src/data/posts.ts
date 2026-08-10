/* Blog articles — an adapter over the CMS, not the articles themselves.
 *
 * The six guides used to live in this file as 500 lines of TypeScript with their
 * bodies as HTML strings. They are now Markdoc files in src/content/posts/, which
 * is what Keystatic reads and writes, so the client can add and edit guides in an
 * editor rather than asking a developer to touch code.
 *
 * WHY THE BODY IS MARKDOC AND THE REST IS FIELDS
 * The body is prose and needs a rich text editor. The FAQ pairs are not prose: they
 * are rendered into FAQPage schema, where Google needs the question and the answer
 * as separate values. Splitting them back out of free text would be guesswork, so
 * they stay as fields. Same reasoning for the takeaways and the CTA copy, each of
 * which lands in its own part of the layout.
 *
 * Rules that still apply to anything written here:
 * - Prices come from the data files. Never type a number that is not in them.
 * - Per vehicle, never per person, for buggies, quads and dirt bikes.
 * - No insurance claim, and no mention of its absence. Guest-owned advice only.
 * - No DTCM, no licence number, no em dashes. The build fails on the last two.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const categories = [
  { slug: 'buggy', label: 'Dune buggy' },
  { slug: 'quad', label: 'Quad bike' },
  { slug: 'safari', label: 'Desert safari' },
  { slug: 'planning', label: 'Planning' }
] as const;

export const categoryLabel = (slug: string) =>
  categories.find(c => c.slug === slug)?.label;

/* Newest first, everywhere. Sorting in one place stops the index, the sitemap and
   the related list from each choosing their own order. */
export async function allPosts(): Promise<Post[]> {
  const list = await getCollection('posts');
  return list.sort((a, b) => b.data.date.localeCompare(a.data.date));
}
