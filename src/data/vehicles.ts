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
  image: string;
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
    image: '2024/11/2-seater-dube-buggy-polaris-1000cc.webp',
    blurb: 'The balanced starting point. Enough power for the big dunes, forgiving enough for a first self-drive.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 300 },
      { label: '1 hour', minutes: 60, price: 550 }
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
    image: '2024/11/4-seater-dune-buggy-polaris-1000c.webp',
    blurb: 'One buggy for the whole family. Same chassis as the 2-seater with a second row behind.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 350 },
      { label: '1 hour', minutes: 60, price: 600 }
    ],
    featured: true
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
    image: '2024/11/Canam-Maverick-x3.jpg',
    blurb: 'A serious step up in power and suspension travel. For riders who have driven a buggy before.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 400 },
      { label: '1 hour', minutes: 60, price: 750 }
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
    image: '2024/11/Canam-Maverick-x3-Turbo.webp',
    blurb: 'Turbo performance with four seats. The pick for groups that do not want to split up.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 450 },
      { label: '1 hour', minutes: 60, price: 800 }
    ]
  },
  {
    slug: 'can-am-maverick-r-turbo',
    category: 'buggy',
    name: 'Can-Am Maverick R - Yellow Turbo',
    shortName: 'Can-Am Maverick R',
    engine: 'Turbo',
    seats: 2,
    minAge: 18,
    area: 'Lahbab red dunes',
    image: '2024/12/Canam-Maverick-R-Powerfull-Buggy1.webp',
    blurb: 'The fastest machine in the fleet. Experienced drivers only.',
    durations: [
      { label: '30 minutes', minutes: 30, price: 500 },
      { label: '1 hour', minutes: 60, price: 950 }
    ],
    featured: true
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
    image: '2024/11/1-Seater-Quad-Bike.jpg',
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
    image: '2022/06/Mojo-Quad-Biking.jpg',
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
    image: '2024/11/2-seater-quad-biking-dubai.jpg',
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
    image: '2024/11/Quad-Biking-Dubai.webp',
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
    image: '2023/12/2-Seater-quad-Bike-Ride.jpg',
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
    image: '2022/06/YAMAHA-Raptor-700cc.jpg',
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
    image: '2022/10/KTM-Desert-Ride-Biking.jpg',
    blurb: 'Desert enduro on a proper 450. Riders must be comfortable with clutch, gears and throttle.',
    durations: [
      { label: '1 hour', minutes: 60, price: 700 },
      { label: '2 hours', minutes: 120, price: 1200 },
      { label: '3 hours', minutes: 180, price: 1500 }
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
