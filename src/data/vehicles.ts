/* Vehicles — now an adapter over the CMS rather than a hardcoded list.
 *
 * The fleet lives in src/content/{buggies,quads,dirtbikes}/*.json, which is what
 * Keystatic reads and writes. This file turns those files back into the exact
 * shapes the templates already expect, so nothing downstream changed when the
 * content moved: same exports, same types, same order.
 *
 * WHY IT IS BUILT THIS WAY
 * Every price on the site is derived, never typed twice. Change a price in the
 * CMS and the pillar page, the price table, the schema Offer, the blog articles
 * and the contact form dropdown all follow from this one file.
 *
 * ORDER MATTERS AND JSON HAS NONE, so each file carries an explicit `order`.
 * Without it the fleet would re-sort itself alphabetically on every build and
 * the cheapest buggy would stop being the first thing a visitor sees.
 */

/* badge and blurb are the tour-page card copy. They are optional so an older
   content file still parses, and tours.ts falls back to its label table when they
   are blank; anything the client types wins over that table. */
export type Duration = {
  label: string; minutes: number; price: number; was?: number;
  badge?: string; blurb?: string;
};

import { traitsOf } from '@/data/images';

export type Vehicle = {
  slug: string;
  category: 'buggy' | 'quad' | 'dirtbike';
  name: string;
  shortName: string;
  engine: string;
  seats: number;
  minAge: number;
  area: string;
  /* Both photos are uploaded on the tour itself rather than picked from a list.
     `image` is the card photo's path, kept under that name because every card,
     cross-sell and schema image on the site reaches it through img(), which takes a
     path as readily as a library key. */
  cardPhoto: string;
  cardPhotoAlt: string;
  image: string;       // = cardPhoto, for the img() call sites
  /* The tour's own hero, uploaded in the CMS rather than picked from a list, so the
     client sees the photo they are replacing and can drop a new file straight in.
     `file` is null when nothing has been uploaded, and the page falls back to the
     shared hero for the category. See tours.ts, which resolves the two. */
  heroPhoto?: string | null;
  heroPhotoAlt?: string;
  heroFocal?: 'left' | 'center' | 'right';
  blurb: string;
  durations: Duration[];
  featured?: boolean;
};

type Raw = Omit<Vehicle, 'slug' | 'category' | 'image'> & { order?: number };

/* The duration label is free text in the CMS, and it is printed straight onto the
   card, the price table, the schema Offer and the WhatsApp booking message. A
   client typing "2Hour" therefore put "2Hour" in five places at once. Inserting the
   missing space between a digit and a letter fixes the common slip without
   rewriting anything the client meant: "2 hours" and "30 minutes" pass through
   untouched. Trimming matters for the same reason. */
const tidyDuration = (d: Vehicle['durations'][number]) => ({
  ...d,
  label: String(d.label ?? '').trim().replace(/(\d)([A-Za-z])/g, '$1 $2')
});

/* Keystatic writes either <slug>.json or <slug>/index.json depending on whether a
   collection carries assets. Match both so a future schema change cannot silently
   empty the fleet. */
const load = (
  files: Record<string, Raw>,
  category: Vehicle['category']
): Vehicle[] =>
  Object.entries(files)
    .map(([path, data]) => {
      const slug = path
        .replace(/\/index\.json$/, '')
        .replace(/\.json$/, '')
        .split('/')
        .pop()!;
      if (!data.cardPhoto) {
        throw new Error(
          `${category}/${slug} has no card photo. Upload one on the tour in the CMS — it is the photo ` +
          `every listing, cross-sell card and search result for this machine uses.`
        );
      }
      return {
        ...data, slug, category,
        image: data.cardPhoto,
        durations: (data.durations ?? []).map(tidyDuration)
      };
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map(({ order, ...v }) => v as Vehicle);

export const buggies: Vehicle[] = load(
  import.meta.glob('/src/content/buggies/**/*.json', { eager: true, import: 'default' }) as Record<string, Raw>,
  'buggy'
);

export const quads: Vehicle[] = load(
  import.meta.glob('/src/content/quads/**/*.json', { eager: true, import: 'default' }) as Record<string, Raw>,
  'quad'
);

export const dirtbikes: Vehicle[] = load(
  import.meta.glob('/src/content/dirtbikes/**/*.json', { eager: true, import: 'default' }) as Record<string, Raw>,
  'dirtbike'
);

/* An empty fleet would build a site with no prices and no vehicle pages, and every
   audit would still pass because the output is technically valid. Fail loudly. */
for (const [label, list] of [['buggies', buggies], ['quads', quads], ['dirtbikes', dirtbikes]] as const) {
  if (list.length === 0) {
    throw new Error(
      `No ${label} found in src/content/${label}/. Either the CMS files are missing ` +
      `or the collection path in keystatic.config.ts no longer matches this glob.`
    );
  }
}

/* A vehicle's own card photo must not contradict its seat count.

   Added 23 Sep 2026. `img()` already refuses a quad photo on a buggy, and
   `galleryFor()` now filters the gallery by seat count, but the CARD image is
   chosen by hand in the CMS and had nothing checking it: the Polaris RZR Turbo
   2-Seater card was showing a four-seat XP4, on every page that card appears.

   Only a tagged photo can fail. An untagged one — a convoy, a group at a photo
   stop — is allowed anywhere, so the client is never blocked from picking a
   general shot for a machine we have no portrait of. */
for (const v of [...buggies, ...quads, ...dirtbikes]) {
  const shown = traitsOf(v.image)?.seats;
  if (shown && v.seats && shown !== v.seats) {
    throw new Error(
      `Card image mismatch on ${v.slug}: "${v.image}" shows a ${shown}-seater but the ` +
      `vehicle has ${v.seats} seats. Pick a different photo in the CMS, or correct the ` +
      `seat tag in src/data/images.ts if the photo is tagged wrongly.`
    );
  }
}

export const allVehicles: Vehicle[] = [...buggies, ...quads, ...dirtbikes];

export const byCategory = { buggy: buggies, quad: quads, dirtbike: dirtbikes } as const;

export function getVehicle(slug: string): Vehicle | undefined {
  return allVehicles.find(v => v.slug === slug);
}

export function fromPrice(v: Vehicle): number {
  return Math.min(...v.durations.map(d => d.price));
}

export function categoryFromPrice(cat: Vehicle['category']): number {
  return Math.min(...byCategory[cat].map(fromPrice));
}
