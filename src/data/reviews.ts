/* Google reviews — an adapter over src/content/reviews/*.json, which Keystatic owns.
 *
 * 17 verified 5-star reviews with text: 5 pulled live from the Places API on
 * 7 Aug 2026 and 12 supplied by the client from the Google Business Profile
 * dashboard. A French-language review was removed at the client's request.
 * Dates are deliberately not stored or shown.
 *
 * WHY THEY ARE A COLLECTION AND NOT ONE FILE
 * Reviews arrive one at a time. A collection gives the client an "add review"
 * button rather than a wall of text to edit around, and each entry can be removed
 * on its own if a guest asks for it to come down.
 *
 * The rating and total live in Site settings, not here, because they describe the
 * Google Business Profile as a whole rather than any single review. They are shown
 * on every page next to the Google logo, so they must match what the profile
 * actually says. Never invent either number.
 *
 * The Places API caps at 5 reviews per request. Refresh that subset with:
 *   GOOGLE_MAPS_API_KEY=xxx node scripts/fetch-google-reviews.mjs
 */
import settingsJson from '@/content/settings.json';
import type { RawSettings } from '@/data/site';

/* Same declared shape site.ts uses, rather than the type inferred from the current
   contents of settings.json. Keystatic drops a field the client empties, so the
   inferred type describes the CMS's last write and not what it may write next.
   A type-only import, so it is erased at build and adds no dependency at runtime. */
const settings = settingsJson as RawSettings;

export type Review = {
  author: string;
  rating: number;
  text: string;
  avatar?: string;
  url?: string;
};

type Raw = Review & { order?: number };

export const googleMeta = {
  placeId: settings.mapsPlaceId,
  totalReviews: settings.totalReviews,
  averageRating: settings.averageRating
};

/* JSON has no inherent order, so each file carries one. Without it the carousel
   would re-sort itself alphabetically by filename on every build. */
const files = import.meta.glob('/src/content/reviews/**/*.json', {
  eager: true, import: 'default'
}) as Record<string, Raw>;

export const reviews: Review[] = Object.values(files)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  .map(({ order, ...r }) => r);

/* The carousel only renders reviews that are 5 stars AND have text. A 5-star
   review with an empty body is a blank card, which looks broken rather than
   positive. */
export const fiveStarWithText = (list: Review[] = reviews) =>
  list.filter(r => r.rating === 5 && r.text && r.text.trim().length > 0);
