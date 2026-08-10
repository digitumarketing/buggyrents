export const site = {
  name: 'Buggy Rents',
  legalName: 'Buggy Rents',
  domain: 'https://buggyrents.com',
  tagline: 'Dune buggy, quad bike and dirt bike tours in the Dubai desert',

  phone: '+971 56 209 5713',
  phoneRaw: '+971562095713',
  whatsapp: '971562095713',
  email: 'Buggyrents@gmail.com',

  address: {
    street: 'Dubai-Hatta Rd',
    district: 'Al Awir Second',
    city: 'Dubai',
    country: 'AE',
    full: 'Dubai-Hatta Rd, Al Awir Second, Dubai, UAE'
  },

  maps: {
    placeId: 'ChIJo88Daad39T4RnM7myjfeJdQ',
    link: 'https://local.google.com/place?id=15286868841387708060&use=srp',
    embed: 'https://maps.google.com/maps?q=place_id:ChIJo88Daad39T4RnM7myjfeJdQ&output=embed'
  },

  hours: { opens: '00:00', closes: '23:59', label: 'Open 24/7' },

  geo: { lat: 25.153303, lng: 55.635006 },
  guides: '50+',
  fleetSize: '70+',
  founded: 2020,
  guestsServed: '17K+',
  /* Trade licence number intentionally omitted, see note in CLAUDE.md.
     Add a trade licence number here only if you hold one; it will appear in the footer and About page. */
  tradeLicence: null as string | null,

  /* These were recorded as "none yet", which was wrong. All five are live and
     linked from the current buggyrents.com footer, verified 10 Aug 2026. They
     matter beyond the footer: schema sameAs is how Google ties the website, the
     Google Business Profile and the social accounts into one entity, which is a
     real local ranking signal that was being thrown away. */
  social: [
    { name: 'Facebook',  url: 'https://www.facebook.com/buggyrents' },
    { name: 'Instagram', url: 'https://www.instagram.com/buggyrents/' },
    { name: 'TikTok',    url: 'https://www.tiktok.com/@buggyrents' },
    { name: 'YouTube',   url: 'https://www.youtube.com/channel/UCxg840PdCcCJ0GCnG018EBg' },
    { name: 'Pinterest', url: 'https://www.pinterest.com/buggyrents/' }
  ] as { name: string; url: string }[],

  awards: [
    { name: "TripAdvisor Travellers' Choice", year: 2024 }
  ],

  /* Agency credit in the footer. rel="noopener" but NOT nofollow: this is a real
     editorial credit on a site the agency built, which is exactly the kind of link
     that is allowed to pass value. */
  agency: { name: 'Digitum', url: 'https://digitum.marketing/' }
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function bookMessage(vehicle?: string, duration?: string, price?: number): string {
  if (!vehicle) return "Hi Buggy Rents! I'd like to book a desert ride.";
  const base = `Hi Buggy Rents! I'd like to book the ${vehicle}`;
  if (duration && price) return `${base} for ${duration} at AED ${price}. Is it available?`;
  return `${base}. Could you share availability?`;
}
