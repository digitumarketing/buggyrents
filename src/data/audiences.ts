/* Audience pages — an adapter over src/content/audiences/*.json, which Keystatic owns.
 *
 * Eight "who the ride is for" pages: families, couples, kids, corporate, bachelor
 * parties, honeymooners, solo female riders and beginners. Each file holds the
 * pitch, the recommended vehicles and an opening paragraph; the rest of the page is
 * built from those in the audience template, for the same reason the location pages
 * work that way. See locations.ts.
 */
export type Audience = {
  slug: string; name: string; short: string; pitch: string;
  vehicles: string; intro: string; keywords: string[];
};

type Raw = Omit<Audience, 'slug'> & { order?: number };

const files = import.meta.glob('/src/content/audiences/**/*.json', {
  eager: true, import: 'default'
}) as Record<string, Raw>;

export const audiences: Audience[] = Object.entries(files)
  .map(([path, data]) => ({
    ...data,
    slug: path.replace(/\/index\.json$/, '').replace(/\.json$/, '').split('/').pop()!
  }))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  .map(({ order, ...a }) => a as Audience);

if (audiences.length === 0) {
  throw new Error('No audience pages found in src/content/audiences. Eight pages and every internal link to them would 404.');
}
