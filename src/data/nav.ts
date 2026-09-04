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
 * in site.ts for two days.
 *
 * DO NOT REMOVE THE `?.` BELOW. It is belt-and-braces, not a fix, and the reason it
 * looks unnecessary is written here so nobody deletes it as dead defence.
 *
 * When it was added, whether Keystatic dropped an empty ARRAY the way it drops an
 * empty string was unknown: no Keystatic-written file in this repo had ever contained
 * one, and navigation.json was the first CMS-owned file that did, since Contact and
 * Guides both carry `children: []`. Had it dropped them, `item.children.length` would
 * have been undefined.length, throwing during the build and blocking the client's own
 * next deploy.
 *
 * It does NOT drop them. Confirmed 4 Sep 2026 by two round-trip saves the client made
 * through the CMS (commits fd2c53a and b5a3107, a header reorder and its reversal):
 * both empty arrays survived intact. So this line cannot currently fire. Keep it
 * anyway. It costs nothing, it is correct under either behaviour, and the behaviour
 * is Keystatic's to change in a version bump rather than ours to rely on.
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
