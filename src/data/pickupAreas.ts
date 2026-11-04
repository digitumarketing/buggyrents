/* Adapter over src/content/pickup-areas.json (Keystatic > Content > Pickup areas).
 *
 * Read with ?? and filter(Boolean) throughout. Keystatic drops an empty string on
 * save (CLAUDE.md §8), so a zone the client half-fills arrives with keys missing,
 * and printing one directly is exactly how "Dubai Marina, undefined" reached the
 * sitewide schema in Oct 2026. A zone with no name or no areas is skipped rather
 * than rendered as an empty card. */
import raw from '@/content/pickup-areas.json';

export interface PickupZone {
  name: string; emirate: 'Dubai' | 'Sharjah'; drive: string; areas: string[]; landmarks: string[];
}

type RawZone = { name?: string; emirate?: string; drive?: string; areas?: string[]; landmarks?: string };

export const pickupZones: PickupZone[] = ((raw as { zones?: RawZone[] }).zones ?? [])
  .map(z => ({
    name: (z.name ?? '').trim(),
    emirate: (z.emirate === 'Sharjah' ? 'Sharjah' : 'Dubai') as PickupZone['emirate'],
    drive: (z.drive ?? '').trim(),
    areas: (z.areas ?? []).map(a => a.trim()).filter(Boolean),
    landmarks: (z.landmarks ?? '').split(',').map(s => s.trim()).filter(Boolean)
  }))
  .filter(z => z.name && z.areas.length);

export const pickupAreaCount = pickupZones.reduce((n, z) => n + z.areas.length, 0);
