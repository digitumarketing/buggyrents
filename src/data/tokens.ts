/* Tokens for CMS copy.
 *
 * THE PROBLEM THIS SOLVES
 * Moving page copy into the CMS collides with the one rule that keeps this site
 * honest: a price is written once and derived everywhere. A sentence like "Self-drive
 * dune buggy tours from AED 300" is prose the client should be able to rewrite, but
 * the 300 in it is not prose. Frozen into a CMS field it goes stale the first time a
 * price changes, and then the page contradicts the price table directly below it.
 *
 * So the client writes "from AED {buggyFrom}" and the build fills in the number. The
 * sentence stays editable, the number stays derived, and neither can drift.
 *
 * A MISSPELLED TOKEN IS A BUILD FAILURE, not a silent literal. "{buggyfrom}" printed
 * onto a live booking page would be worse than any error, so the audit in
 * scripts/audit-contrast.mjs fails on any {word} that is not on this list.
 */
import { buggies, quads, dirtbikes, fromPrice } from '@/data/vehicles';
import { safariFromPrice } from '@/data/safari';
import { policy, payment, transfers } from '@/data/extras';
import { site } from '@/data/site';
import { googleMeta } from '@/data/reviews';

export const tokens: Record<string, string> = {
  /* Entry prices. These are the numbers that appear in headlines, stats and cards,
     and the ones a visitor compares against a competitor. */
  buggyFrom:    String(fromPrice(buggies[0])),
  quadFrom:     String(fromPrice(quads[0])),
  dirtbikeFrom: String(fromPrice(dirtbikes[0])),
  safariFrom:   String(safariFromPrice),

  /* Counts, so "eleven buggies" cannot survive a twelfth being added. */
  buggyCount:    String(buggies.length),
  quadCount:     String(quads.length),
  dirtbikeCount: String(dirtbikes.length),

  /* Google numbers, shown beside the logo on every page. */
  rating:      googleMeta.averageRating.toFixed(1),
  reviewCount: String(googleMeta.totalReviews),

  /* Business details. */
  phone:   site.phone,
  email:   site.email,
  address: site.address.full,
  guests:  site.guestsServed,
  fleet:   site.fleetSize,
  guides:  site.guides,
  founded: String(site.founded),

  /* Shared policy sentences. Written once in Combos, add-ons and policies, and
     dropped into support pages, location pages, tour pages and FAQ answers. */
  cancellation: policy.cancellation,
  weather:      policy.weather,
  deposit:      policy.deposit,
  payment:      payment.summary,
  paymentFull:  payment.detail,
  pickup:       transfers.summary,
  pickupOuter:  transfers.outsideDubai
};

const TOKEN = /\{([a-zA-Z][a-zA-Z0-9]*)\}/g;

/* Throwing rather than leaving the token in place is deliberate. A build that fails
   is a five-minute fix; "from AED {buggyfrom}" on a live page is a lost booking and
   nobody notices for a week. */
export function fill(text: string): string {
  return text.replace(TOKEN, (whole, name) => {
    const value = tokens[name];
    if (value === undefined) {
      throw new Error(
        `Unknown token ${whole} in CMS copy. Known tokens: ${Object.keys(tokens).sort().join(', ')}`
      );
    }
    return value;
  });
}

/* Convenience for the common case of an object whose string values all need filling.
   Arrays and nested objects are walked; anything that is not a string is untouched. */
export function fillDeep<T>(value: T): T {
  if (typeof value === 'string') return fill(value) as unknown as T;
  if (Array.isArray(value)) return value.map(fillDeep) as unknown as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, fillDeep(v)])
    ) as T;
  }
  return value;
}
