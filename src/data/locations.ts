/* Location pages — an adapter over src/content/locations/*.json, which Keystatic owns.
 *
 * Ten long-tail pickup-route pages. Each file holds only what is genuinely specific
 * to that place: the name, the drive time, the emirate and an opening paragraph.
 * Everything else on the page is built by locationPages.ts from those four values
 * plus the shared wording in Location page template.
 *
 * WHY IT IS SPLIT THAT WAY
 * The ten pages are the same page with a different place name in it. If the shared
 * sentences lived in each file, correcting one of them would mean ten edits and
 * nine chances to miss one, and the pages would drift apart over a year until they
 * read like ten different companies. Specific copy per page, shared copy once.
 */
export type Location = {
  slug: string; name: string; short: string; emirate: string;
  drive: string; intro: string; keywords: string[];
};

type Raw = Omit<Location, 'slug'> & { order?: number };

/* JSON has no inherent order and the drive-time sort on the hub page and the
   "nearby pickups" list both depend on a stable one. */
const files = import.meta.glob('/src/content/locations/**/*.json', {
  eager: true, import: 'default'
}) as Record<string, Raw>;

export const locations: Location[] = Object.entries(files)
  .map(([path, data]) => ({
    ...data,
    slug: path.replace(/\/index\.json$/, '').replace(/\.json$/, '').split('/').pop()!
  }))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  .map(({ order, ...l }) => l as Location);

if (locations.length === 0) {
  throw new Error('No location pages found in src/content/locations. Ten pages and every internal link to them would 404.');
}
