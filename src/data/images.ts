/* Image library — every photo on the site.
   Each entry carries its SUBJECT so a quad page can never show a buggy photo.
   `img()` validates the subject at build time and returns the path + alt.

   NOW AN ADAPTER OVER THE CMS, 23 Sep 2026. The two maps below used to be typed
   out in this file. They now live in src/content/images.json (the lib pool) and
   src/content/hero-images.json (the hero pool), which Keystatic owns, and this
   file turns them back into the exact shapes the rest of the site already
   expects: same exports, same types, same catalogue order.

   WHY IT MOVED. Changing a tour's hero meant typing a key into a text box and
   hoping it matched something in here, so the client could not add a photo at all
   without a developer. In the CMS each photo is now a real file field with an
   upload button and a preview, and every image field elsewhere picks from a list
   instead of taking free text.

   WHY A SINGLETON AND NOT A COLLECTION. Keystatic scopes a collection's uploads
   into a per-entry folder, so a photo added through a collection would land at
   /assets/images/lib/<entry>/<file>.webp. The resolution and image-variety audits
   both match /assets/images/lib/<name>.webp flat, so a client-uploaded photo would
   quietly stop being resolution-checked — the one photo that most needs checking.
   A singleton has no slug, so uploads stay flat and the audits keep working.

   NOTHING ABOUT THE GUARDS CHANGED. alt, subject, seats, make, focal and the
   dimensions still travel with the photo, so assertNameMatchesSubject() and
   assertNameMatchesSeats() below still fail the build on the same mistakes, and
   assertFileMatchesSlug() is new: it fails the build if an uploaded filename and
   the entry name drift apart, because the guards read the NAME.

   ORDER IS THE ARRAY ORDER in the CMS, which the client can drag. bySubject()
   feeds gallery selection and the image-variety audit, both of which are sensitive
   to catalogue order, so reordering the list in Keystatic reorders galleries.

   BUGGY PHOTOS ALSO CARRY `seats` AND `make`, added 23 Sep 2026.

   THE BUG THIS FIXES, reported by the client 23 Sep 2026: the Can-Am X3 4-Seater
   and X3 Turbo RR 4-Seater pages were showing two-seater photos. Subject tagging
   stopped a quad photo reaching a buggy page but said nothing about seat count,
   so `galleryFor()` was free to drop a two-seater Polaris onto a four-seat Can-Am
   page directly under a caption reading "4-seat profile … 4 seats".

   `seats` is only set where the machine is actually countable in the frame. A
   distant convoy or a group posing shot stays undefined, which means "usable
   anywhere" rather than "unknown, therefore excluded" — the pool is small enough
   that excluding the ambiguous ones would starve it.

   `make` is soft: it orders the pool so a Can-Am page opens with a Can-Am, but it
   never excludes, because several vehicles have only one or two photos of their
   own and a brand-pure gallery would repeat across pages. Seat count is hard.

   Two files were found MISNAMED during that audit: a hero called
   `canam-maverick-x3-4-seater-hero-…` and one called `canam-maverick-r-4-seater-hero-…`
   both show two-seaters. Both were renamed to drop the false seat claim, and
   `assertNameMatchesSeats()` below now fails the build on that class of mistake
   rather than leaving it to be spotted by a customer. */

import rawLib from '@/content/images.json';
import rawHero from '@/content/hero-images.json';

export type Subject = 'buggy' | 'quad' | 'dirtbike' | 'safari';
export type Seats = 2 | 4;
export type Make = 'polaris' | 'canam';

/* Keystatic writes `seats` as a string, because a select field's options are
   strings, and DROPS an empty string entirely on save. Blank and absent are the
   same thing here — "not countable in this frame", the usable-anywhere case — so
   both have to come back as undefined rather than 0. */
const toSeats = (v?: string): Seats | undefined =>
  v === '2' ? 2 : v === '4' ? 4 : undefined;

const toMake = (v?: string): Make | undefined =>
  v === 'polaris' || v === 'canam' ? v : undefined;

type RawPhoto = {
  name: string; file: string; alt: string; subject: Subject;
  seats?: string; make?: string;
};
type RawHeroPhoto = RawPhoto & {
  focal: 'left' | 'center' | 'right'; width: number; height: number;
};

type LibEntry = { subject: Subject; alt: string; seats?: Seats; make?: Make; file: string };
type HeroEntry = LibEntry & { focal: 'left' | 'center' | 'right'; w: number; h: number };

/* Array to keyed map, preserving the CMS order. A duplicate name would silently
   shadow the first photo and take its place in every gallery, so it throws. */
function index<R extends RawPhoto, V>(photos: R[], shape: (r: R) => V, pool: string): Record<string, V> {
  const out: Record<string, V> = {};
  for (const photo of photos) {
    if (out[photo.name]) throw new Error(`Duplicate ${pool} photo name: ${photo.name}. Names must be unique — rename one of them.`);
    out[photo.name] = shape(photo);
  }
  return out;
}

export const library: Record<string, LibEntry> = index(
  (rawLib.photos ?? []) as RawPhoto[],
  r => ({ subject: r.subject, alt: r.alt, seats: toSeats(r.seats), make: toMake(r.make), file: r.file }),
  'library'
);

/* Hero backgrounds. Kept at native resolution (up to 2560px) so they stay sharp
   across a wide viewport. `focal` positions the subject clear of the left-aligned heading. */
export const heroes: Record<string, HeroEntry> = index(
  (rawHero.photos ?? []) as RawHeroPhoto[],
  r => ({
    subject: r.subject, alt: r.alt, focal: r.focal, w: r.width, h: r.height,
    seats: toSeats(r.seats), make: toMake(r.make), file: r.file
  }),
  'hero'
);

const HERO_MIN_WIDTH = 1600;

const SUBJECT_WORDS: Record<string, Subject> = {
  buggy: 'buggy', polaris: 'buggy', canam: 'buggy', maverick: 'buggy', rzr: 'buggy',
  quad: 'quad', atv: 'quad', raptor: 'quad',
  ktm: 'dirtbike', dirtbike: 'dirtbike', motocross: 'dirtbike', enduro: 'dirtbike', husqvarna: 'dirtbike',
  safari: 'safari', camel: 'safari'
};

/** A filename must never claim a subject it is not.
    Catches things like "quad-biking-dubai-hero-desert-safari". */
function assertNameMatchesSubject(name: string, subject: Subject) {
  const flat = name.replace(/-/g, '');
  for (const [word, wordSubject] of Object.entries(SUBJECT_WORDS)) {
    if (flat.includes(word) && wordSubject !== subject) {
      throw new Error(
        `Image name/subject conflict: "${name}" is tagged ${subject} but its filename contains "${word}" (${wordSubject}). Rename it or retag it.`
      );
    }
  }
}

/* A filename must never claim a seat count the photo does not show.

   This is the guard that would have caught the 23 Sep 2026 client complaint on the
   day the file was exported rather than six weeks later: two heroes named
   "...-4-seater-hero-..." were two-seater photos, and nothing read the name. The
   subject guard above is the same idea one level up — it stops a quad photo being
   tagged buggy; this stops a two-seater being filed as a four-seater.

   It only fires where BOTH the name makes a claim and the entry carries a `seats`
   value, so an untagged photo or a name with no seat count in it is untouched. */
function assertNameMatchesSeats(name: string, seats?: Seats) {
  if (!seats) return;
  /* Match on the hyphenated name, NOT a flattened copy of it. Stripping the
     hyphens first turns "x3-4-seater" into "x34seater", where the 4 sits against
     the model number and any digit-boundary guard stops seeing it — which is
     exactly how the first version of this function failed to catch the file it
     was written for. */
  const claims: Array<[RegExp, Seats]> = [
    [/(^|-)(4|four)-?seat/, 4],
    [/(^|-)(2|two)-?seat/, 2]
  ];
  for (const [pattern, claimed] of claims) {
    if (pattern.test(name) && claimed !== seats) {
      throw new Error(
        `Image name/seat conflict: "${name}" is tagged as a ${seats}-seater but its filename claims ${claimed} seats. Rename the file or correct the tag — do not ship it.`
      );
    }
  }
}

/* NEW WITH THE UPLOAD FIELD, and the reason the whole guard chain still works.

   Every guard above reads the entry NAME, not the file. That was safe while the
   name and the file were the same thing by construction. Now a client can upload
   a replacement photo without renaming the entry, which would leave the seat and
   subject checks reading a filename that is no longer on disk — a two-seater photo
   could be uploaded over a name saying four-seater and nothing would object.

   So the name and the uploaded file have to agree, and the build says so plainly
   when they do not. It also keeps the flat /assets/images/<pool>/<name>.webp shape
   that the resolution and image-variety audits match on. */
function assertFileMatchesSlug(name: string, file: string, pool: 'lib' | 'hero') {
  const expected = `/assets/images/${pool}/${name}.webp`;
  if (file !== expected) {
    throw new Error(
      `Image file/name mismatch in the ${pool} photo library: "${name}" points at "${file}" but its name requires "${expected}". ` +
      `Rename the photo entry to match the file you uploaded (without the .webp), so the subject and seat-count guards read the real filename.`
    );
  }
}

export function hero(name: string, expect?: Subject) {
  const h = heroes[name];
  if (!h) throw new Error(`Unknown hero image: ${name}`);
  if (expect && h.subject !== expect) {
    throw new Error(`Wrong hero subject for ${name}: it is ${h.subject}, expected ${expect}.`);
  }
  assertFileMatchesSlug(name, h.file, 'hero');
  assertNameMatchesSubject(name, h.subject);
  assertNameMatchesSeats(name, h.seats);
  if (h.w < HERO_MIN_WIDTH) {
    console.warn(`[hero] ${name} is only ${h.w}px wide; may soften on large screens. Needs a wider source photo.`);
  }
  return { src: h.file, alt: h.alt, focal: h.focal, w: h.w, h: h.h };
}

const used = new Set<string>();

/** Resolve an image, asserting its subject matches and that it has not been used already. */
export function img(name: string, expect?: Subject) {
  const entry = library[name];
  if (!entry) throw new Error(`Unknown image: ${name}`);
  if (expect && entry.subject !== expect) {
    throw new Error(`Wrong subject for ${name}: it is a ${entry.subject} photo but a ${expect} photo was required.`);
  }
  assertFileMatchesSlug(name, entry.file, 'lib');
  assertNameMatchesSeats(name, entry.seats);
  return { src: entry.file, alt: entry.alt, subject: entry.subject };
}

/** Names available for a subject, in catalogue order. */
export function bySubject(s: Subject): string[] {
  return Object.entries(library).filter(([, v]) => v.subject === s).map(([k]) => k);
}

/** What a library photo shows, for callers that need to match a machine rather
    than only a subject. Returns undefined for anything not in the library. */
export function traitsOf(name: string): { seats?: Seats; make?: Make } | undefined {
  const entry = library[name];
  return entry && { seats: entry.seats, make: entry.make };
}

export function markUsed(name: string) {
  if (used.has(name)) throw new Error(`Image used twice: ${name}`);
  used.add(name);
}
