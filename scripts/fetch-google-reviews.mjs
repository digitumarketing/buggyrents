/* Fetches Google reviews into src/data/reviews.generated.json
   Usage:  GOOGLE_MAPS_API_KEY=xxx node scripts/fetch-google-reviews.mjs
   Note: the Places API returns a maximum of 5 reviews. That is Google's limit, not ours. */
import { writeFileSync, mkdirSync } from 'node:fs';

const KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE_ID = 'ChIJo88Daad39T4RnM7myjfeJdQ';

if (!KEY) {
  console.error('GOOGLE_MAPS_API_KEY not set — skipping review fetch.');
  process.exit(0);
}

const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
  headers: {
    'X-Goog-Api-Key': KEY,
    'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews'
  }
});

if (!res.ok) {
  console.error('Places API error', res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const reviews = (data.reviews ?? [])
  .filter(r => r.rating === 5 && r.originalText?.text?.trim())
  .map(r => ({
    author: r.authorAttribution?.displayName ?? 'Google guest',
    rating: r.rating,
    text: r.originalText.text.trim(),
    relative: r.relativePublishTimeDescription ?? '',
    avatar: r.authorAttribution?.photoUri ?? null,
    url: r.authorAttribution?.uri ?? null
  }));

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/reviews.generated.json', JSON.stringify({
  totalReviews: data.userRatingCount ?? 0,
  averageRating: data.rating ?? 0,
  reviews
}, null, 2));

console.log(`Wrote ${reviews.length} five-star reviews (of ${data.userRatingCount} total, avg ${data.rating}).`);
