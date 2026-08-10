/* Desert safari packages — adapter over the CMS, same pattern as vehicles.ts.
 *
 * Packages live in src/content/safari/*.json and are split into shared and private
 * by their own `group` field rather than by which array they sit in, so the client
 * can add a package in the CMS without anyone touching code.
 *
 * THE ONE THING THAT MUST NOT BREAK
 * Safari pricing is mixed: shared packages are PER PERSON and private ones are PER
 * VEHICLE. `priceLabel` carries that basis and every card prints it. Losing it would
 * quietly show a family of six a per person price as if it were the total.
 *
 * `was` values are client-supplied former prices. Only display one if it is a
 * genuine historic price; a permanent strike-through anchor is a UAE advertising risk.
 */

export type SafariPackage = {
  slug: string;
  name: string;
  group: 'shared' | 'private';
  vehicle: string;
  capacity: string;
  duration: string;
  priceLabel: string;      // "Per person" | "2 persons" | "Private 4x4" etc.
  price: number;
  was?: number;
  image: string;
  blurb: string;
  includes: string[];
  featured?: boolean;
};

type Raw = Omit<SafariPackage, 'slug'> & { order?: number };

const files = import.meta.glob('/src/content/safari/**/*.json', {
  eager: true,
  import: 'default'
}) as Record<string, Raw>;

/* JSON carries no order, so each file has an explicit one. Without it the packages
   would re-sort alphabetically and the AED 99 evening safari, which is the one most
   people are looking for, would stop being first. */
const all: SafariPackage[] = Object.entries(files)
  .map(([path, data]) => ({
    ...data,
    slug: path.replace(/\/index\.json$/, '').replace(/\.json$/, '').split('/').pop()!
  }))
  .sort((a, b) => ((a as Raw).order ?? 999) - ((b as Raw).order ?? 999))
  .map(({ order, ...s }: any) => s as SafariPackage);

if (all.length === 0) {
  throw new Error(
    'No safari packages found in src/content/safari/. Either the CMS files are ' +
    'missing or the collection path in keystatic.config.ts no longer matches this glob.'
  );
}

export const sharedSafaris: SafariPackage[] = all.filter(s => s.group === 'shared');
export const privateSafaris: SafariPackage[] = all.filter(s => s.group === 'private');

/* NOTE: several packages share an image because the library has only 8 safari
   photos for 13 packages. The image-reuse audit fails if a page renders all of
   them with media, so the safari pillar deliberately uses price cards without
   images. Ask the client for more safari photography before changing that. */
export const allSafaris = all;
export const safariFromPrice = Math.min(...allSafaris.map(s => s.price));
