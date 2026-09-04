/* Header and footer menus — an adapter over src/content/navigation.json, which
 * Keystatic owns.
 *
 * The exported shape is unchanged from when the arrays lived here, so Header.astro
 * and Footer.astro were not touched. That is the point of the adapter: the CMS needs
 * a shape it can render as draggable rows, the components need the shape they already
 * use, and the conversion happens once, here.
 *
 * WHY THIS MOVED, HAVING DELIBERATELY NOT MOVED BEFORE
 * Navigation was kept in code until 4 Sep 2026 because a header or footer href
 * renders on all 75 pages, so one typo is 75 broken links rather than one, and the
 * reasoning was that nobody should be able to do that from a CMS. The reasoning was
 * sound; the safety net it assumed did not exist. Two now do: audit-links.mjs
 * resolves every internal href at build time and fails the deploy, and the URL field
 * in keystatic.config.ts refuses a malformed path before it can be saved.
 *
 * TWO CONVERSIONS, BOTH LOAD-BEARING
 *
 * 1. Empty children become undefined. Keystatic cannot express "no dropdown" as an
 *    absent array; it writes []. Header.astro tests `item.children ?`, the array
 *    itself rather than its length, and [] is truthy in JavaScript. Passed straight
 *    through, Contact and Guides would each gain a has-sub class and render an empty
 *    hover dropdown. Nothing would error and no audit would notice.
 *
 * 2. Footer columns become an object keyed by heading. Footer.astro iterates
 *    Object.entries(footerNav). The CMS needs an array because only an array can be
 *    dragged into a new order, and object keys cannot. Rebuilding the object here
 *    means the client can reorder columns and the component never learns about it.
 *
 * Do not "simplify" either one by changing the components to match the JSON. The
 * components are shared by all 75 pages; this file is the only thing that has to
 * know the CMS shape.
 */
import rawJson from '@/content/navigation.json';

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

type RawLink = { label: string; href: string };

/* Declared rather than inferred, and `children` is optional.
 *
 * A JSON import's type is inferred from what the file contains TODAY, which is the
 * wrong shape to reason about for a file the CMS rewrites. Keystatic omits a field
 * whose value is empty: it dropped four empty strings from settings.json on 3 Sep
 * 2026 in one client save, which is what left `raw.tradeLicence` failing to compile
 * in site.ts. Whether it does the same to an empty ARRAY is untested, because no
 * Keystatic-written file in this repo has ever contained one, and navigation.json is
 * the first CMS-owned file that does: Contact and Guides both carry `children: []`.
 *
 * If it does drop them, `item.children.length` becomes undefined.length, which
 * throws during the build. That fails loudly and the live site keeps serving, so it
 * is not a silent corruption, but it would block the client's own next deploy until
 * a developer looked at it. The optional marker plus `?.` below costs nothing and is
 * correct whichever way Keystatic behaves.
 *
 * The cast is the same approach vehicles.ts and safari.ts already take with their
 * globs; this file is one of the few that read a JSON import directly. */
type RawNav = {
  header: { label: string; href: string; children?: RawLink[] }[];
  footerColumns: { heading: string; links: RawLink[] }[];
};

const raw = rawJson as RawNav;

export const mainNav: NavItem[] = raw.header.map((item): NavItem => ({
  label: item.label,
  href: item.href,
  /* Absent rather than empty. See conversion 1 above. */
  ...(item.children?.length ? { children: item.children.map(c => ({ label: c.label, href: c.href })) } : {})
}));

export const footerNav: Record<string, RawLink[]> = Object.fromEntries(
  raw.footerColumns.map(col => [col.heading, col.links.map(l => ({ label: l.label, href: l.href }))])
);
