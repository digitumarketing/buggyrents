/* Support pages — an adapter over src/content/support/*.json, which Keystatic owns.
 *
 * Seven pages on the dbr-support template: privacy, refunds, terms, safety
 * standards, our fleet, dirt bike for beginners and dirt bike for advanced riders.
 * Every hand-written word on all seven now lives in the CMS.
 *
 * TOKENS DO THE WORK THAT SHARED CONSTANTS USED TO DO
 * This file was 647 lines, and a large share of it was the same four sentences
 * interpolated over and over: the cancellation policy, the weather policy, the
 * deposit line and how payment works. Those are still written once, in Combos,
 * add-ons and policies, and referenced from the page copy as {cancellation},
 * {weather}, {deposit} and {payment}. Change the cancellation window once and it
 * changes on all seven pages, exactly as it did when this was code.
 *
 * RULES THE BUILD ENFORCES ON WHATEVER IS TYPED HERE
 * - No insurance claim, and no mention of its absence. Guest-owned advice only.
 *   One line of that stays on Terms and Conditions: it is what protects the client
 *   if an injured guest later says they believed they were covered. Do not remove it.
 * - No trade licence number, and no placeholder that looks like one.
 * - No DTCM. No em dashes.
 * - Hotel pickup inside Dubai is free. Never write "quoted" for a Dubai pickup.
 */
import type { SupportData } from '@/components/templates/Support.astro';
import { fillDeep } from '@/data/tokens';

type Raw = Omit<SupportData, 'slug'> & { export: string; path: string };

const files = import.meta.glob('/src/content/support/**/*.json', {
  eager: true, import: 'default'
}) as Record<string, Raw>;

/* Keyed by the export name rather than the filename. The two FAQ pages both end in
   "faq", and a page's URL is not always its filename, so the file carries both. */
const pages = new Map<string, SupportData>();
for (const raw of Object.values(files)) {
  const { export: name, path, ...copy } = fillDeep(raw);
  pages.set(name, { ...(copy as Omit<SupportData, 'slug'>), slug: path });
}

function get(name: string): SupportData {
  const p = pages.get(name);
  if (!p) throw new Error(`No support page "${name}" in src/content/support. That page and every link to it would 404.`);
  return p;
}

export const privacyPolicy = get('privacyPolicy');
export const refundPolicy = get('refundPolicy');
export const termsConditions = get('termsConditions');
export const safetyStandards = get('safetyStandards');
export const ourFleet = get('ourFleet');
export const dirtBikeBeginners = get('dirtBikeBeginners');
export const dirtBikeAdvanced = get('dirtBikeAdvanced');
