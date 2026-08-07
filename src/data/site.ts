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

  /* No social accounts yet - omitted from header, footer and schema. */
  social: [] as { name: string; url: string }[],

  awards: [
    { name: "TripAdvisor Travellers' Choice", year: 2024 }
  ]
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
