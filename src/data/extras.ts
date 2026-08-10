/* Combos, add-ons and booking policies — an adapter over src/content/policies.json,
 * which Keystatic owns. Confirmed by the client 7 Aug 2026, moved into the CMS in
 * Phase 2 of the migration.
 *
 * These strings carry more weight than their length suggests. `transfers.summary`,
 * `payment.summary` and the three policy lines are interpolated into the support
 * pages, the location pages, the tour pages and the FAQ answers, so each one is
 * written once here and appears in a dozen places. That is the point: a client
 * changing the cancellation window changes it everywhere, not on the one page they
 * happened to remember.
 *
 * Two rules the client cannot see in the CMS but the build enforces:
 * - Hotel pickup inside Dubai is FREE. Never write "quoted" for a Dubai pickup.
 * - No insurance claim, and no mention of its absence either. See CLAUDE.md.
 */
import raw from '@/content/policies.json';

export type Combo = {
  slug: string; name: string; type: 'buggy' | 'quad';
  includes: string; capacity: string; price: number; note?: string;
};

/* Buggy + Bedouin BBQ dinner. The buggy session is 30 minutes on every combo,
   which is a client decision, not an oversight. */
export const bbqCombos = raw.bbqCombos as Combo[];

/* Quad + desert safari. Two tiers, split by quad session length. */
export const quadSafariCombos = raw.quadSafariCombos as Combo[];

/* Three states, and the difference matters:
     price 0    genuinely free. Sandboarding. The label prints, not "AED 0".
     price 100  a real number, shown in the price table.
     price null LEFT BLANK on purpose, because there is no number to show. Group
                and corporate bookings are quoted individually. prices.ts filters
                these out of the comparison table rather than printing a nonsense
                figure, so blank has to survive the round trip through the CMS
                instead of being read as zero. */
export const addOns = raw.addOns as {
  name: string; price: number | null; label: string; note: string;
}[];

export const transfers = {
  dubaiFree: true,
  summary: raw.transfersSummary,
  outsideDubai: raw.transfersOutsideDubai
};

export const payment = {
  methods: raw.paymentMethods as string[],
  onTheSpot: true,
  summary: raw.paymentSummary,
  detail: raw.paymentDetail
};

export const policy = {
  cancellationHours: raw.cancellationHours,
  cancellation: raw.cancellation,
  weather: raw.weather,
  deposit: raw.deposit
};
