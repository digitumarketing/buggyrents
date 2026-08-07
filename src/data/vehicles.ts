export type Duration = { label: string; minutes: number; price: number; was?: number };

export type Vehicle = {
  slug: string;
  category: 'buggy' | 'quad' | 'dirtbike';
  name: string;
  shortName: string;
  engine: string;
  seats: number;
  minAge: number;
  area: string;
  image: string;   // key into src/data/images.ts
  blurb: string;
  durations: Duration[];
  featured?: boolean;
};

/* ============================================================
   DUNE BUGGIES - prices confirmed by client 6 Aug 2026
   ============================================================ */
export const buggies: Vehicle[] = [
  {
    slug: 'polaris-rzr-1000-2-seater',
    category: 'buggy',
    name: 'Polaris RZR 1000cc - 2 Seater',
    shortName: 'Polaris RZR 2-Seater',
    engine: '1000cc',
    seats: 2,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'polaris-rzr-1000-2-seater-dune-buggy-dubai',
    blurb: 'The balanced starting point. Enough power for the big dunes, forgiving enough for a first self-drive.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 300 },
      { label: '1 hour', minutes: 60, price: 550 },
      { label: '2 hours', minutes: 120, price: 999 },
      { label: '4 hours', minutes: 240, price: 2199 }
    ],
    featured: true
  },
  {
    slug: 'polaris-rzr-1000-4-seater',
    category: 'buggy',
    name: 'Polaris RZR 1000cc - 4 Seater',
    shortName: 'Polaris RZR 4-Seater',
    engine: '1000cc',
    seats: 4,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'polaris-rzr-4-seater-dune-buggy-parked-dubai-base',
    blurb: 'One buggy for the whole family. Same chassis as the 2-seater with a second row behind.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 350 },
      { label: '1 hour', minutes: 60, price: 550 },
      { label: '2 hours', minutes: 120, price: 1099 },
      { label: '4 hours', minutes: 240, price: 2299 }
    ],
    featured: true
  },
  {
    slug: 'polaris-rzr-turbo-2-seater',
    category: 'buggy',
    name: 'Polaris RZR Turbo - 2 Seater',
    shortName: 'Polaris RZR Turbo 2-Seater',
    engine: 'Turbo',
    seats: 2,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'dune-buggy-sunrise-desert-tour-dubai',
    blurb: 'Turbocharged Polaris for drivers who want more acceleration out of the bowls.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 800 },
      { label: '1 hour', minutes: 60, price: 1099 },
      { label: '2 hours', minutes: 120, price: 1999 }
    ]
  },
  {
    slug: 'polaris-rzr-turbo-4-seater',
    category: 'buggy',
    name: 'Polaris RZR Turbo - 4 Seater',
    shortName: 'Polaris RZR Turbo 4-Seater',
    engine: 'Turbo',
    seats: 4,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'group-dune-buggy-tour-dubai-photo-stop',
    blurb: 'Turbo power with four seats, for groups that want the quicker machine without splitting up.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 750 },
      { label: '1 hour', minutes: 60, price: 999 },
      { label: '2 hours', minutes: 120, price: 2299 }
    ]
  },
  {
    slug: 'polaris-rzr-pro',
    category: 'buggy',
    name: 'Polaris RZR Pro',
    shortName: 'Polaris RZR Pro',
    engine: '1000cc',
    seats: 2,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'polaris-rzr-pro-white-dune-buggy-dubai',
    blurb: 'The Pro chassis with longer travel suspension, aimed at drivers who already know the route.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 700 },
      { label: '1 hour', minutes: 60, price: 1100 },
      { label: '2 hours', minutes: 120, price: 1300 }
    ]
  },
  {
    slug: 'can-am-maverick-x3-2-seater',
    category: 'buggy',
    name: 'Can-Am Maverick X3 - 2 Seater',
    shortName: 'Can-Am X3 2-Seater',
    engine: 'Turbo',
    seats: 2,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'can-am-maverick-x3-black-2-seater-red-dune-dubai',
    blurb: 'A serious step up in power and suspension travel. For riders who have driven a buggy before.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 600 },
      { label: '1 hour', minutes: 60, price: 999 },
      { label: '2 hours', minutes: 120, price: 1299 }
    ],
    featured: true
  },
  {
    slug: 'can-am-maverick-x3-4-seater',
    category: 'buggy',
    name: 'Can-Am Maverick X3 - 4 Seater',
    shortName: 'Can-Am X3 4-Seater',
    engine: 'Turbo',
    seats: 4,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'can-am-maverick-x3-4-seater-family-buggy-ride-dubai',
    blurb: 'Turbo performance with four seats. The pick for groups that do not want to split up.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 700 },
      { label: '1 hour', minutes: 60, price: 999 },
      { label: '2 hours', minutes: 120, price: 1499 }
    ],
    featured: true
  },
  {
    slug: 'can-am-x3-turbo-rr-2-seater',
    category: 'buggy',
    name: 'Can-Am X3 Turbo RR - 2 Seater',
    shortName: 'Can-Am X3 Turbo RR 2-Seater',
    engine: 'Turbo RR',
    seats: 2,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'can-am-maverick-x3-rs-2-seater-dune-buggy-dubai',
    blurb: 'The RR badge means more boost and stiffer damping. Experienced drivers only.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 1000 },
      { label: '1 hour', minutes: 60, price: 1299 }
    ]
  },
  {
    slug: 'can-am-x3-turbo-rr-4-seater',
    category: 'buggy',
    name: 'Can-Am X3 Turbo RR - 4 Seater',
    shortName: 'Can-Am X3 Turbo RR 4-Seater',
    engine: 'Turbo RR',
    seats: 4,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'can-am-maverick-x3-4-seater-desert-tour-dubai',
    blurb: 'Four seats behind the most powerful X3 setup we run.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 1299 },
      { label: '1 hour', minutes: 60, price: 1799 }
    ]
  },
  {
    slug: 'can-am-maverick-r-turbo',
    category: 'buggy',
    name: 'Can-Am Maverick R - Yellow Turbo',
    shortName: 'Can-Am Maverick R 2-Seater',
    engine: 'Turbo',
    seats: 2,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'can-am-maverick-x3-yellow-turbo-dune-buggy-dubai',
    blurb: 'The fastest two-seat machine in the fleet. Experienced drivers only.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 900 },
      { label: '1 hour', minutes: 60, price: 1299 },
      { label: '2 hours', minutes: 120, price: 1999 }
    ],
    featured: true
  },
  {
    slug: 'can-am-maverick-r-4-seater',
    category: 'buggy',
    name: 'Can-Am Maverick R - 4 Seater',
    shortName: 'Can-Am Maverick R 4-Seater',
    engine: 'Turbo',
    seats: 4,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: 'can-am-maverick-x3-turbo-dune-buggy-dubai',
    blurb: 'Maverick R power carrying four. The top of the fleet for group bookings.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 999 },
      { label: '1 hour', minutes: 60, price: 1299 }
    ]
  }
];

/* ============================================================
   QUAD BIKES - confirmed 6 Aug 2026.
   Organised by riding area and seat count, not by model.
   NOTE: card values used where the source table disagreed.
   ============================================================ */
export const quads: Vehicle[] = [
  {
    slug: 'kids-quad-biking',
    category: 'quad',
    name: 'Kids Quad Biking',
    shortName: 'Kids Quad',
    engine: '70-90cc',
    seats: 1,
    minAge: 6,
    area: 'Kids special area',
    image: 'kids-quad-bike-dubai-fenced-riding-area',
    blurb: 'A fenced, flat area away from the main dunes so younger riders get their own space.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 75 },
      { label: '1 hour', minutes: 60, price: 140 },
      { label: '2 hours', minutes: 120, price: 250 },
      { label: '3 hours', minutes: 180, price: 350 },
      { label: '4 hours', minutes: 240, price: 450 }
    ],
    featured: true
  },
  {
    slug: 'single-seat-boundary',
    category: 'quad',
    name: 'Single Seat Quad - Boundary Area',
    shortName: 'Single Seat Boundary',
    engine: '150-250cc',
    seats: 1,
    minAge: 12,
    area: '2 km boundary area',
    image: 'single-seat-quad-bike-rider-dubai-desert',
    blurb: 'Ride inside a marked 2 km square. The easiest way to try a quad without committing to open desert.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 89 },
      { label: '1 hour', minutes: 60, price: 150 },
      { label: '2 hours', minutes: 120, price: 300 },
      { label: '3 hours', minutes: 180, price: 400 },
      { label: '4 hours', minutes: 240, price: 500 }
    ],
    featured: true
  },
  {
    slug: 'double-seat-boundary',
    category: 'quad',
    name: 'Double Seat Quad - Boundary Area',
    shortName: 'Double Seat Boundary',
    engine: '250-350cc',
    seats: 2,
    minAge: 14,
    area: '2 km boundary area',
    image: 'double-seat-quad-biking-dubai-red-dunes',
    blurb: 'Take a passenger. Same marked boundary area, a larger engine to carry two.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 150 },
      { label: '1 hour', minutes: 60, price: 250 },
      { label: '2 hours', minutes: 120, price: 400 },
      { label: '3 hours', minutes: 180, price: 500 },
      { label: '4 hours', minutes: 240, price: 600 }
    ]
  },
  {
    slug: 'single-seat-open-desert',
    category: 'quad',
    name: 'Single Seat Quad - Open Desert',
    shortName: 'Single Seat Open Desert',
    engine: '250-350cc',
    seats: 1,
    minAge: 14,
    area: 'Open desert, red dunes',
    image: 'quad-bike-open-desert-group-ride-dubai',
    blurb: 'Out of the boundary and into the red dunes with a guide. The real thing.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 200 },
      { label: '1 hour', minutes: 60, price: 350 },
      { label: '2 hours', minutes: 120, price: 500 },
      { label: '3 hours', minutes: 180, price: 700 },
      { label: '4 hours', minutes: 240, price: 900 }
    ],
    featured: true
  },
  {
    slug: 'double-seat-open-desert',
    category: 'quad',
    name: 'Double Seat Quad - Open Desert',
    shortName: 'Double Seat Open Desert',
    engine: '350-450cc',
    seats: 2,
    minAge: 16,
    area: 'Open desert, red dunes',
    image: 'double-seat-quad-bike-dubai-friends-photo-stop',
    blurb: 'Two up across the open red dunes. The biggest engine we put a passenger on.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 300 },
      { label: '1 hour', minutes: 60, price: 450 },
      { label: '2 hours', minutes: 120, price: 600 },
      { label: '3 hours', minutes: 180, price: 900 },
      { label: '4 hours', minutes: 240, price: 1100 }
    ]
  },
  {
    slug: 'yamaha-raptor-700cc',
    category: 'quad',
    name: 'Yamaha Raptor 700cc',
    shortName: 'Yamaha Raptor 700',
    engine: '700cc',
    seats: 1,
    minAge: 18,
    area: 'Open desert, red dunes',
    image: 'yamaha-raptor-700cc-quad-bike-lahbab-red-dunes',
    blurb: 'The sport quad. Fast, light and demanding - for riders who already know what they are doing.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 500 },
      { label: '1 hour', minutes: 60, price: 700 },
      { label: '2 hours', minutes: 120, price: 1200 },
      { label: '3 hours', minutes: 180, price: 1700 },
      { label: '4 hours', minutes: 240, price: 2200 }
    ],
    featured: true
  }
];

/* ============================================================
   DIRT BIKES - prices confirmed by client 7 Aug 2026.
   Three durations only: no 30-minute or 4-hour option.
   ============================================================ */
export const dirtbikes: Vehicle[] = [
  {
    slug: 'ktm-450-dirt-bike',
    category: 'dirtbike',
    name: 'KTM 450 Dirt Bike',
    shortName: 'KTM 450',
    engine: '450cc',
    seats: 1,
    minAge: 18,
    area: 'Open desert, red dunes',
    image: 'ktm-450-dirt-bike-rider-dubai-desert',
    blurb: 'Desert enduro on a proper 450. Riders must be comfortable with clutch, gears and throttle.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 500 },
      { label: '1 hour', minutes: 60, price: 700 },
      { label: '2 hours', minutes: 120, price: 1200 },
      { label: '3 hours', minutes: 180, price: 1500 },
      { label: '4 hours', minutes: 240, price: 2000 }
    ],
    featured: true
  }
];

export const allVehicles: Vehicle[] = [...buggies, ...quads, ...dirtbikes];

export const byCategory = { buggy: buggies, quad: quads, dirtbike: dirtbikes } as const;

export function getVehicle(slug: string): Vehicle | undefined {
  return allVehicles.find(v => v.slug === slug);
}

export function fromPrice(v: Vehicle): number {
  return Math.min(...v.durations.map(d => d.price));
}

export function categoryFromPrice(cat: Vehicle['category']): number {
  return Math.min(...byCategory[cat].map(fromPrice));
}
