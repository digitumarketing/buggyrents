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
import raw from '@/content/settings.json';

type Social = { name: string; url: string };
type Award = { name: string; year: number };

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
  agency: { name: raw.agencyName, url: raw.agencyUrl }
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
