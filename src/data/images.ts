/* Image library — every photo on the site.
   Each entry carries its SUBJECT so a quad page can never show a buggy photo.
   `img()` validates the subject at build time and returns the path + alt. */

export type Subject = 'buggy' | 'quad' | 'dirtbike' | 'safari';

export const library: Record<string, { subject: Subject; alt: string }> = {
  'can-am-maverick-dune-buggy-dust-action-dubai': { subject: 'buggy', alt: 'Can-Am dune buggy throwing up dust during a Dubai desert ride' },
  'can-am-maverick-x3-4-seater-couple-buggy-dubai': { subject: 'buggy', alt: 'Couple in a Can-Am Maverick X3 4-seater dune buggy in the Dubai desert' },
  'can-am-maverick-x3-4-seater-desert-tour-dubai': { subject: 'buggy', alt: 'Can-Am Maverick X3 4-seater dune buggy on a guided Dubai desert tour' },
  'can-am-maverick-x3-4-seater-family-buggy-ride-dubai': { subject: 'buggy', alt: 'Family riding a Can-Am Maverick X3 4-seater dune buggy in Dubai' },
  'can-am-maverick-x3-black-2-seater-red-dune-dubai': { subject: 'buggy', alt: 'Black Can-Am Maverick X3 2-seater dune buggy on a Dubai red dune' },
  'can-am-maverick-x3-rs-2-seater-dune-buggy-dubai': { subject: 'buggy', alt: 'Blue Can-Am Maverick X3 RS 2-seater dune buggy in the Dubai desert' },
  'can-am-maverick-x3-turbo-dune-buggy-dubai': { subject: 'buggy', alt: 'Can-Am Maverick X3 Turbo dune buggy ready for a Dubai desert route' },
  'can-am-maverick-x3-yellow-turbo-dune-buggy-dubai': { subject: 'buggy', alt: 'Yellow Can-Am Maverick X3 turbo dune buggy driving across Dubai sand' },
  'couple-dune-buggy-ride-dubai-desert-tour': { subject: 'buggy', alt: 'Couple sitting on a dune buggy during a Dubai desert tour' },
  'dune-buggy-climbing-red-dune-convoy-dubai': { subject: 'buggy', alt: 'Dune buggy climbing a red dune in convoy during a Dubai desert tour' },
  'dune-buggy-convoy-crossing-dubai-red-dunes': { subject: 'buggy', alt: 'Convoy of dune buggies crossing the red dunes on a Dubai desert tour' },
  'dune-buggy-sunrise-desert-tour-dubai': { subject: 'buggy', alt: 'Dune buggy on the sand at sunrise before a guided Dubai desert tour' },
  'dune-buggy-sunset-ride-lahbab-red-dunes-dubai': { subject: 'buggy', alt: 'Dune buggy on a red dune at sunset during a Lahbab desert ride in Dubai' },
  'group-dune-buggy-tour-dubai-photo-stop': { subject: 'buggy', alt: 'Group of guests with a Polaris dune buggy on a Dubai desert photo stop' },
  'polaris-rzr-1000-2-seater-dune-buggy-dubai': { subject: 'buggy', alt: 'Polaris RZR 1000 2-seater dune buggy with riders in the Dubai desert' },
  'polaris-rzr-4-seater-dune-buggy-parked-dubai-base': { subject: 'buggy', alt: 'Polaris RZR 4-seater dune buggy parked at the Buggy Rents Dubai base' },
  'polaris-rzr-pro-white-dune-buggy-dubai': { subject: 'buggy', alt: 'White Polaris RZR Pro dune buggy on Dubai desert sand' },
  'dirt-bike-desert-motocross-action-dubai': { subject: 'dirtbike', alt: 'Motocross rider powering a dirt bike through soft sand in the Dubai desert' },
  'dirt-bike-group-tour-dubai-desert': { subject: 'dirtbike', alt: 'Group of dirt bike riders lined up before a guided Dubai desert tour' },
  'dirt-bike-sunset-ride-dubai-desert': { subject: 'dirtbike', alt: 'Dirt bike rider silhouetted against the sunset in the Dubai desert' },
  'ktm-450-dirt-bike-rider-dubai-desert': { subject: 'dirtbike', alt: 'Rider standing with a KTM 450 dirt bike on a Dubai desert dune' },
  'ktm-450-enduro-rider-sand-spray-dubai': { subject: 'dirtbike', alt: 'KTM 450 enduro rider throwing up sand on a Dubai desert route' },
  'ktm-dirt-bike-fleet-lined-up-dubai-desert': { subject: 'dirtbike', alt: 'Row of orange KTM dirt bikes prepared for a guided desert ride in Dubai' },
  'ktm-dirt-bike-group-ride-dubai-sunset': { subject: 'dirtbike', alt: 'Three KTM dirt bike riders on a dune at sunset in the Dubai desert' },
  'ktm-dirt-bike-riders-desert-rest-stop-dubai': { subject: 'dirtbike', alt: 'KTM dirt bike riders resting on the sand during a Dubai desert ride' },
  'ktm-dirt-bike-riders-red-dune-crest-dubai': { subject: 'dirtbike', alt: 'Two KTM dirt bike riders on a red dune crest in the Dubai desert' },
  'ktm-dirt-bike-riding-red-dunes-dubai': { subject: 'dirtbike', alt: 'KTM dirt bike rider climbing a red dune during a Dubai enduro session' },
  'double-seat-quad-bike-dubai-friends-photo-stop': { subject: 'quad', alt: 'Two friends beside a double seat quad bike on a Dubai desert photo stop' },
  'double-seat-quad-biking-dubai-red-dunes': { subject: 'quad', alt: 'Double seat quad bike ready for a red dune ride in Dubai' },
  'kids-quad-bike-dubai-fenced-riding-area': { subject: 'quad', alt: 'Child riding a small kids quad bike in the fenced area at the Dubai base' },
  'quad-bike-group-tour-dubai-open-desert': { subject: 'quad', alt: 'Three riders on quad bikes during an open desert tour in Dubai' },
  'quad-biking-dubai-open-desert-three-riders': { subject: 'quad', alt: 'Three riders on single seat quad bikes climbing a red dune in the Dubai open desert' },
  'quad-bike-rental-dubai-rider-red-quad': { subject: 'quad', alt: 'Rider on a red quad bike during a Dubai desert quad biking session' },
  'quad-bike-rental-fleet-parked-al-awir-dubai': { subject: 'quad', alt: 'Quad bike rental fleet parked under shade at the Buggy Rents Al Awir base' },
  'quad-bike-sunset-desert-safari-dubai': { subject: 'quad', alt: 'Quad bikes and guests silhouetted at sunset on a Dubai desert safari' },
  'quad-biking-dubai-ladies-group-desert-tour': { subject: 'quad', alt: 'Group of women on quad bikes during a Dubai desert quad biking tour' },
  'single-seat-quad-bike-rider-dubai-desert': { subject: 'quad', alt: 'Rider on a single seat quad bike crossing Dubai desert sand' },
  'two-seater-quad-bike-dubai-desert-ride': { subject: 'quad', alt: 'Two seater quad bikes lined up for a desert ride in Dubai' },
  'yamaha-raptor-700cc-quad-bike-lahbab-red-dunes': { subject: 'quad', alt: 'Rider on a Yamaha Raptor 700cc sport quad in the Lahbab red dunes, Dubai' },
  'yamaha-raptor-quad-bike-rider-dubai-dunes': { subject: 'quad', alt: 'Rider on a Yamaha Raptor quad bike on a Dubai desert dune' },
  'bedouin-camp-majlis-seating-desert-safari-dubai': { subject: 'safari', alt: 'Bedouin camp majlis seating set for a desert safari dinner in Dubai' },
  'belly-dance-show-desert-safari-camp-dubai': { subject: 'safari', alt: 'Belly dance performance at a Bedouin desert safari camp in Dubai' },
  'camel-ride-desert-safari-dubai': { subject: 'safari', alt: 'Guests on a camel ride during a Dubai desert safari' },
  'desert-safari-dubai-dune-bashing-land-cruiser': { subject: 'safari', alt: 'Land Cruiser dune bashing through soft sand on a Dubai desert safari' },
  'fire-show-desert-safari-camp-dubai': { subject: 'safari', alt: 'Fire show performer entertaining guests at a Dubai desert safari camp' },
  'private-desert-safari-4x4-dubai-red-dunes': { subject: 'safari', alt: 'Private 4x4 crossing the red dunes on a Dubai desert safari' },
  'sandboarding-desert-safari-dubai': { subject: 'safari', alt: 'Guest sandboarding down a dune on a Dubai desert safari' },
  'ktm-dirt-bike-rider-desert-camel-dubai': { subject: 'dirtbike', alt: 'KTM dirt bike rider pausing beside a camel in the Dubai desert' },
  'dirt-bike-group-dusk-ride-dubai-desert': { subject: 'dirtbike', alt: 'Three dirt bike riders on a dune at dusk during a Dubai desert ride' },
  'ktm-dirt-bike-riders-dune-crest-dubai': { subject: 'dirtbike', alt: 'Two KTM dirt bike riders on a dune crest in the Dubai desert' },
  'dirt-bike-riders-desert-break-dubai': { subject: 'dirtbike', alt: 'Dirt bike riders taking a break on the sand during a Dubai desert tour' },
  'husqvarna-dirt-bike-rider-dubai-desert': { subject: 'dirtbike', alt: 'Rider in full gear beside a Husqvarna dirt bike in the Dubai desert' },
  'ktm-dirt-bike-rider-red-dune-dubai': { subject: 'dirtbike', alt: 'KTM dirt bike rider standing on a red dune in the Dubai desert' },
  'canam-maverick-r-blue-two-seater-dubai-dunes': { subject: 'buggy', alt: 'Blue Can-Am Maverick R two seater dune buggy on a Dubai red dune' },
  'canam-maverick-r-yellow-base-yard-sunrise': { subject: 'buggy', alt: 'Yellow Can-Am Maverick R dune buggy at the Al Awir base yard at sunrise' },
  'canam-maverick-r-yellow-parked-al-awir-base': { subject: 'buggy', alt: 'Yellow Can-Am Maverick R dune buggy parked at the Buggy Rents base in Al Awir' },
  'canam-maverick-r-yellow-under-canopy-al-awir': { subject: 'buggy', alt: 'Yellow Can-Am Maverick R dune buggy under the shade canopy at the Al Awir base' },
  'canam-maverick-x3-black-red-dubai-red-dunes': { subject: 'buggy', alt: 'Black and red Can-Am Maverick X3 dune buggy on the Dubai red dunes' },
  'canam-x3-blue-rider-dubai-desert-dune': { subject: 'buggy', alt: 'Driver in a blue Can-Am Maverick X3 dune buggy beside a Dubai desert dune' },
  'children-beside-dune-buggy-dubai-desert': { subject: 'buggy', alt: 'Two children sitting on the front of a dune buggy in the Dubai desert' },
  'couple-beside-polaris-rzr-dubai-desert': { subject: 'buggy', alt: 'Couple standing beside a Polaris RZR dune buggy in the Dubai desert' },
  'couple-on-canam-buggy-dubai-desert-photo-stop': { subject: 'buggy', alt: 'Couple sitting on a Can-Am dune buggy at a photo stop in the Dubai desert' },
  'polaris-rzr-1000-couple-riding-dubai-desert': { subject: 'buggy', alt: 'Couple driving a blue Polaris RZR 1000 dune buggy through the Dubai desert' },
  'polaris-rzr-1000-solo-driver-dubai-red-dunes': { subject: 'buggy', alt: 'Solo driver in a Polaris RZR 1000 dune buggy on the Dubai red dunes' },
  'polaris-rzr-1000-two-guests-dubai-desert-ride': { subject: 'buggy', alt: 'Two guests in a Polaris RZR 1000 dune buggy during a Dubai desert ride' },
  'polaris-rzr-4-seater-side-profile-dubai-desert': { subject: 'buggy', alt: 'Side profile of a Polaris RZR four seater dune buggy in the Dubai desert' },
  'polaris-rzr-rs-black-two-seater-dubai-dunes': { subject: 'buggy', alt: 'Black Polaris RZR RS two seater dune buggy on the Dubai red dunes' },
  'polaris-rzr-xp-guests-waving-dubai-red-dunes': { subject: 'buggy', alt: 'Guests waving from a Polaris RZR XP 1000 dune buggy on the Dubai red dunes' },
  'yamaha-raptor-quads-parked-al-awir-base': { subject: 'quad', alt: 'Two Yamaha Raptor quad bikes parked at the Buggy Rents base in Al Awir, Dubai' },
};

/* Hero backgrounds. Kept at native resolution (up to 2560px) so they stay sharp
   across a wide viewport. `focal` positions the subject clear of the left-aligned heading. */
export const heroes: Record<string, { subject: Subject; focal: 'left'|'center'|'right'; w: number; h: number; alt: string }> = {
  'dune-buggy-dubai-hero-red-dunes': { subject: 'buggy', focal: 'right', w: 2560, h: 1707, alt: 'Polaris dune buggy driving across the Lahbab red dunes in Dubai' },
  'desert-adventure-dubai-hero-canam-maverick': { subject: 'buggy', focal: 'right', w: 2560, h: 1656, alt: 'Can-Am Maverick R turbo dune buggy powering across the Dubai desert' },
  'ktm-dirt-bike-dubai-hero-sunrise-dunes': { subject: 'dirtbike', focal: 'right', w: 1920, h: 1440, alt: 'KTM dirt bike riders climbing a dune at sunrise in the Dubai desert' },
  'quad-biking-dubai-hero-red-dunes': { subject: 'quad', focal: 'right', w: 1920, h: 1280, alt: 'Rider on a single seat quad bike in the Lahbab red dunes, Dubai' },
  'desert-safari-dubai-hero-dune-bashing': { subject: 'safari', focal: 'left', w: 2560, h: 1707, alt: 'Land Cruiser dune bashing through the red dunes on a Dubai desert safari' },
  'canam-maverick-r-4-seater-hero-blue-dubai-desert': { subject: 'buggy', focal: 'right', w: 1600, h: 1066, alt: 'Blue Can-Am Maverick R dune buggy parked on Dubai desert sand' },
  'canam-maverick-r-yellow-turbo-hero-dubai-dunes': { subject: 'buggy', focal: 'right', w: 1600, h: 1066, alt: 'Yellow Can-Am Maverick R turbo dune buggy on the red dunes at Lahbab, Dubai' },
  'canam-maverick-x3-2-seater-hero-lahbab-dunes': { subject: 'buggy', focal: 'right', w: 1600, h: 1200, alt: 'Two guests in a Can-Am Maverick X3 two seater below a Lahbab red dune in Dubai' },
  'canam-maverick-x3-4-seater-hero-dubai-dunes': { subject: 'buggy', focal: 'right', w: 1600, h: 1200, alt: 'Guests riding a Can-Am Maverick X3 four seater dune buggy in the Dubai desert' },
  'canam-x3-turbo-rr-2-seater-hero-dubai-desert': { subject: 'buggy', focal: 'right', w: 1600, h: 1066, alt: 'Red and white Can-Am Maverick X3 X RS turbo two seater on Dubai desert sand' },
  'canam-x3-turbo-rr-4-seater-hero-red-dunes': { subject: 'buggy', focal: 'right', w: 1600, h: 1066, alt: 'Red Can-Am Maverick X3 X RS turbo four seater dune buggy on the Dubai red dunes' },
  'double-seat-quad-bike-hero-dubai-sunset': { subject: 'quad', focal: 'right', w: 1600, h: 1200, alt: 'Two guests on a double seat quad bike at sunset in the Dubai desert' },
  'polaris-rzr-1000-2-seater-hero-dubai-red-dunes': { subject: 'buggy', focal: 'right', w: 1600, h: 1199, alt: 'Two riders in a blue Polaris RZR 1000 two seater on the Lahbab red dunes in Dubai' },
  'polaris-rzr-4-seater-hero-dubai-dune-ridge': { subject: 'buggy', focal: 'right', w: 1600, h: 1200, alt: 'Polaris RZR four seater dune buggy parked on a red dune ridge in Dubai' },
  'polaris-rzr-pro-hero-blue-dubai-red-dune': { subject: 'buggy', focal: 'right', w: 1600, h: 1066, alt: 'Blue Polaris RZR Pro dune buggy on a red dune at the Lahbab desert in Dubai' },
  'polaris-rzr-turbo-2-seater-hero-dubai-desert': { subject: 'buggy', focal: 'right', w: 1600, h: 1200, alt: 'Guests driving a Polaris RZR XP 1000 turbo two seater through the Dubai desert' },
  'polaris-rzr-turbo-4-seater-hero-red-dunes-dubai': { subject: 'buggy', focal: 'right', w: 1600, h: 1066, alt: 'Black Polaris RZR turbo four seater dune buggy on the Dubai red dunes' },
  'quad-bike-open-desert-hero-dubai-red-dunes': { subject: 'quad', focal: 'right', w: 1600, h: 1366, alt: 'Rider on a red quad bike in the open desert at Lahbab, Dubai' },
  'single-seat-quad-bike-hero-dubai-red-dunes': { subject: 'quad', focal: 'right', w: 1600, h: 1066, alt: 'White single seat quad bike ready to ride on the Lahbab red dunes in Dubai' },
  'yamaha-raptor-700-hero-dubai-desert-rider': { subject: 'quad', focal: 'right', w: 1600, h: 1350, alt: 'Rider on a Yamaha Raptor 700 sport quad in the Dubai desert' },
};

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

export function hero(name: string, expect?: Subject) {
  const h = heroes[name];
  if (!h) throw new Error(`Unknown hero image: ${name}`);
  if (expect && h.subject !== expect) {
    throw new Error(`Wrong hero subject for ${name}: it is ${h.subject}, expected ${expect}.`);
  }
  assertNameMatchesSubject(name, h.subject);
  if (h.w < HERO_MIN_WIDTH) {
    console.warn(`[hero] ${name} is only ${h.w}px wide; may soften on large screens. Needs a wider source photo.`);
  }
  return { src: `/assets/images/hero/${name}.webp`, alt: h.alt, focal: h.focal, w: h.w, h: h.h };
}

const used = new Set<string>();

/** Resolve an image, asserting its subject matches and that it has not been used already. */
export function img(name: string, expect?: Subject) {
  const entry = library[name];
  if (!entry) throw new Error(`Unknown image: ${name}`);
  if (expect && entry.subject !== expect) {
    throw new Error(`Wrong subject for ${name}: it is a ${entry.subject} photo but a ${expect} photo was required.`);
  }
  return { src: `/assets/images/lib/${name}.webp`, alt: entry.alt, subject: entry.subject };
}

/** Names available for a subject, in catalogue order. */
export function bySubject(s: Subject): string[] {
  return Object.entries(library).filter(([, v]) => v.subject === s).map(([k]) => k);
}

export function markUsed(name: string) {
  if (used.has(name)) throw new Error(`Image used twice: ${name}`);
  used.add(name);
}
