/* Title and meta description helpers.
 *
 * WHY THIS EXISTS
 * 40 of the 64 titles and 29 of the descriptions were being cut off in search
 * results on 10 Aug 2026. A truncated title is not a ranking penalty, but it is a
 * click-through one: the part Google drops is usually the part that would have made
 * someone choose us over the result above.
 *
 * The brand suffix was most of the problem. " | Buggy Rents" costs 14 characters,
 * and on a page called "Can-Am X3 Turbo RR - 4 Seater Dubai | From AED 1,299" those
 * 14 characters were the difference between the price showing and not showing.
 * Google appends the site name to the tab and often to the result anyway, so
 * spending a quarter of the budget stating it twice is a bad trade.
 *
 * pageTitle() therefore treats the brand as OPTIONAL: it is added when it fits and
 * dropped when it does not, so the words that sell the page are never the ones that
 * get cut. There is no truncation anywhere in here. A title that is too long on its
 * own is a copy problem, and the audit in scripts/audit-contrast.mjs reports it
 * rather than this file quietly chopping a sentence in half.
 */

const BRAND = 'Buggy Rents';

/* Google renders roughly 580px of title, which lands near 60 characters for most
   English strings, and about 160 characters of description on desktop. Both are
   guidelines rather than hard limits, which is exactly why they belong in one named
   constant instead of being retyped as magic numbers in ten builders. */
export const TITLE_MAX = 60;
export const DESC_MAX = 160;

export function pageTitle(core: string): string {
  const trimmed = core.trim().replace(/\s*\|\s*$/, '');
  const withBrand = `${trimmed} | ${BRAND}`;
  return withBrand.length <= TITLE_MAX ? withBrand : trimmed;
}

/* Collapses the whitespace and stray punctuation that creeps in when a description
   is assembled from several fields, any of which may be empty. This is what put
   "Dune Buggy for Families ,  One 4-seater keeps everyone together" on eight
   audience pages: a separator written as " , " with a value missing around it. */
export function tidy(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/([,.;:]){2,}/g, '$1')
    .trim();
}
