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

export type Vehicle = {
  slug: string;
  category: 'buggy' | 'quad' | 'dirtbike';
  name: string;
  shortName: string;
  engine: string;
  seats: number;
  minAge: number;
  area: string;
  image: string;       // key into src/data/images.ts
  heroImage?: string;  // optional per-vehicle hero, falls back to the category hero
  blurb: string;
  durations: Duration[];
  featured?: boolean;
};

type Raw = Omit<Vehicle, 'slug' | 'category'> & { order?: number };

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
      return { ...data, slug, category, durations: (data.durations ?? []).map(tidyDuration) };
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
