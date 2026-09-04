/* Site settings — an adapter over src/content/settings.json, which Keystatic owns.
 *
 * Everything here was hardcoded until Phase 2 of the CMS migration. The exported
 * shape is deliberately unchanged, so every template, every schema block and every
 * WhatsApp link kept working without being touched.
 *
 * The JSON is FLAT and this file rebuilds the nested shape. That is on purpose:
 * Keystatic renders a flat object as a clean list of labelled inputs, whereas
 * nested objects turn into collapsible panels that hide the field the client is
 * looking for. Flat in the CMS, nested in code, converted once here.
 */
import rawJson from '@/content/settings.json';

type Social = { name: string; url: string };
type Award = { name: string; year: number };

/* KEYSTATIC OMITS EMPTY FIELDS, so anything the client can clear is optional here.
 *
 * On 3 Sep 2026 one client save (commit f23d19c) removed four keys from
 * settings.json in a single write, because all four held an empty string:
 * tradeLicence, gtmId, headCode and bodyCode. Three came straight back with values.
 * tradeLicence is meant to stay empty until the client has a real number, so it
 * simply vanished, and `raw.tradeLicence` stopped compiling. Nothing noticed for two
 * days: the runtime fallback made it null, which is the correct value, and no audit
 * reads TypeScript.
 *
 * The type of a JSON import is inferred from the file as it stands, so it describes
 * the CMS's last write rather than what the CMS is allowed to write next. That makes
 * the error arrive AFTER the damage instead of preventing it. Declaring the shape,
 * with every client-emptiable field marked optional, is what makes the fallbacks
 * below deliberate rather than lucky.
 *
 * headCode and bodyCode are empty again as of 4 Sep 2026, cleared to stop GTM
 * loading twice, so the next Site settings save will drop both. They are marked
 * optional here in advance of that.
 *
 * KNOWN BOUNDARY: strictly, every text field in this file is emptiable and could
 * therefore be dropped. Only the four the code already handles are marked optional,
 * because marking all thirty-five would push `string | undefined` through every
 * template that prints them and buy nothing: a required field the client blanks is a
 * content mistake, and it surfaces as the word "undefined" in the built HTML, which
 * the placeholder audit already fails the build on. If a field becomes genuinely
 * optional in the CMS, add it here at the same time. */
export type RawSettings = Omit<typeof rawJson, 'tradeLicence' | 'gtmId' | 'headCode' | 'bodyCode'> & {
  tradeLicence?: string;
  gtmId?: string;
  headCode?: string;
  bodyCode?: string;
};

const raw = rawJson as RawSettings;

export const site = {
  name: raw.name,
  legalName: raw.legalName,
  domain: raw.domain,
  tagline: raw.tagline,

  phone: raw.phone,
  phoneRaw: raw.phoneRaw,
  whatsapp: raw.whatsapp,
  email: raw.email,

  address: {
    street: raw.addressStreet,
    district: raw.addressDistrict,
    city: raw.addressCity,
    country: raw.addressCountry,
    full: raw.addressFull
  },

  maps: {
    placeId: raw.mapsPlaceId,
    link: raw.mapsLink,
    embed: raw.mapsEmbed
  },

  hours: { opens: raw.hoursOpens, closes: raw.hoursCloses, label: raw.hoursLabel },

  geo: { lat: raw.lat, lng: raw.lng },
  guides: raw.guides,
  fleetSize: raw.fleetSize,
  founded: raw.founded,
  guestsServed: raw.guestsServed,

  /* Empty string in the CMS means "no licence number yet", which is the situation
     the client confirmed on 8 Aug 2026. It must stay empty rather than become a
     placeholder that looks like a real number. See CLAUDE.md. */
  tradeLicence: (raw.tradeLicence || null) as string | null,

  /* schema sameAs is built from this list. It is how Google ties the website, the
     Google Business Profile and the five social accounts into one entity, so an
     account added here is a real local ranking signal, not just a footer icon. */
  social: raw.social as Social[],

  awards: raw.awards as Award[],

  /* Agency credit in the footer. noopener but deliberately not nofollow: a real
     editorial credit on a site the agency built is allowed to pass value. */
  agency: { name: raw.agencyName, url: raw.agencyUrl },

  /* Analytics & verification codes the client pastes in the CMS. Base.astro
     injects these on the production build only. Empty strings mean "nothing to
     inject", which is the default and leaves the built HTML unchanged. */
  tracking: {
    gtmId: (raw.gtmId || '').trim(),
    headCode: raw.headCode || '',
    bodyCode: raw.bodyCode || '',

    /* True when a pasted snippet already loads GTM, which means the ID field must
       not load it a second time.

       On 3 Sep 2026 the client filled in the ID *and* pasted the container snippet
       Google hands out, which is the obvious reading of two fields both labelled
       for analytics code. Every live page then loaded GTM-PP58RGD2 twice, so every
       pageview and every tag inside the container fired twice and the client's
       reports silently doubled. No audit could see it: both snippets were valid
       HTML referencing files that exist.

       The ID field loses rather than the pasted code, because the paste is the
       more specific instruction — it may carry consent settings or a custom
       dataLayer the generated snippet does not. Matching on the hostname catches
       the container script, the ns.html iframe and a gtag.js paste alike. */
    pastedGtm: /googletagmanager\.com/i.test(`${raw.headCode || ''}${raw.bodyCode || ''}`)
  }
};

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function bookMessage(vehicle?: string, duration?: string, price?: number): string {
  if (!vehicle) return "Hi Buggy Rents! I'd like to book a desert ride.";
  const base = `Hi Buggy Rents! I'd like to book the ${vehicle}`;
  if (duration && price) return `${base} for ${duration} at AED ${price}. Is it available?`;
  return `${base}. Could you share availability?`;
}
