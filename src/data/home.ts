/* Homepage content — an adapter over src/content/homepage.json, which Keystatic owns.
 *
 * The homepage is thirteen sections and most of them are hand-written prose rather
 * than anything derived from vehicle data, which is why it moves wholesale. The one
 * exception is the pricing section: it reads from vehicles.ts so a price changed in
 * the CMS updates here on its own, and it is not repeated in this file.
 *
 * Exports are unchanged from when this was a hardcoded module, so the thirteen
 * homepage components did not need editing.
 */
import rawFile from '@/content/homepage.json';
import { fillDeep } from '@/data/tokens';

/* Every homepage field goes through fillDeep, not just the ones that happen to
 * carry a token today. The homepage is CMS-owned prose: the client can type
 * {quadFrom} into any field at any time, and a field that skipped fill() would
 * print the brace on the live page. The token audit caught exactly that on
 * 18 Sep 2026 when a price token was added to the quad intro and the FAQ.
 * fillDeep on the whole object is cheap and removes the class of bug. */
const raw = fillDeep(rawFile);

export const trustStats = raw.trustStats as {
  value: string; label: string; sub: string; verified: boolean;
}[];

type Intro = {
  eyebrow: string; heading: string; sub: string;
  paragraphs: string[]; checklist: string[]; image: string;
};

export const buggyIntro = raw.buggyIntro as Intro;
export const quadIntro = raw.quadIntro as Intro;

export const tourStyles = raw.tourStyles as { title: string; tag: string; body: string }[];

/* Homepage FAQ. These feed FAQPage schema as well as the accordion, which is why
   question and answer stay separate fields rather than one block of prose. */
export const faqs = raw.faqs as { q: string; a: string }[];

/* Rebuilt into the shape the LongFormReader component expects. Flat in the CMS
   because a nested object there would bury the blocks behind a collapsed panel. */
export const longForm = {
  heading: raw.longFormHeading,
  blocks: raw.longFormBlocks as { h: string; p: string }[]
};
