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
import raw from '@/content/homepage.json';

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
