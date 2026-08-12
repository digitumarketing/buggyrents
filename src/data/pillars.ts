/* Pillar pages — an adapter over src/content/pillars/*.json, which Keystatic owns.
 *
 * Three pages: dune buggy, quad bike and KTM dirt bike. Each file holds every
 * hand-written word on the page: hero copy, the four selling points, the five flow
 * steps, ten FAQ answers, the long-form guide and the cross-sell cards.
 *
 * WHAT IS NOT IN THE FILE, AND WHY
 * `vehicles` and `vehicleBase` wire the template to the fleet. They are rebuilt here
 * from the category rather than stored, because they are not content: a client
 * editing a list of vehicle objects in a text field would be editing the fleet
 * twice, and the two copies would disagree within a week.
 *
 * `heroImage` is likewise fixed per category while the library holds one usable
 * hero per subject. See the image note in CLAUDE.md.
 *
 * Prices inside the copy are written as {buggyFrom}, {quadFrom} and {dirtbikeFrom}
 * and filled at build time by tokens.ts, so a headline reading "from AED 300" is
 * editable prose with a derived number in it. A misspelled token fails the build.
 */
import type { PillarData } from '@/components/templates/Pillar.astro';
import { byCategory, type Vehicle } from '@/data/vehicles';
import { fillDeep } from '@/data/tokens';

type Cat = Vehicle['category'];

const BASE: Record<Cat, string> = {
  buggy: '/dune-buggy-dubai/',
  quad: '/quad-bike-dubai/',
  dirtbike: '/ktm-dirt-bike-dubai/'
};
const HERO: Record<Cat, string> = {
  buggy: 'dune-buggy-dubai-hero-red-dunes',
  quad: 'quad-biking-dubai-hero-red-dunes',
  dirtbike: 'ktm-dirt-bike-dubai-hero-sunrise-dunes'
};

type Raw = Omit<PillarData, 'slug' | 'vehicles' | 'vehicleBase' | 'heroImage'> & { category: Cat };

const files = import.meta.glob('/src/content/pillars/**/*.json', {
  eager: true, import: 'default'
}) as Record<string, Raw>;

const built = new Map<Cat, PillarData>();
for (const [path, raw] of Object.entries(files)) {
  const slug = path.replace(/\/index\.json$/, '').replace(/\.json$/, '').split('/').pop()!;
  const { category, ...copy } = fillDeep(raw);
  built.set(category, {
    ...(copy as Omit<PillarData, 'slug' | 'vehicles' | 'vehicleBase' | 'heroImage'>),
    slug,
    heroImage: HERO[category],
    vehicles: byCategory[category],
    vehicleBase: BASE[category]
  });
}

function get(cat: Cat): PillarData {
  const p = built.get(cat);
  if (!p) throw new Error(`No pillar page found for "${cat}" in src/content/pillars. That page and every link to it would 404.`);
  return p;
}

export const buggyPillar = get('buggy');
export const quadPillar = get('quad');
export const ktmPillar = get('dirtbike');
