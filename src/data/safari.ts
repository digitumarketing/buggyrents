/* Desert safari packages — prices confirmed by client 7 Aug 2026.
   `was` values are the client-supplied former prices. Only display them if they are
   genuine historic prices — permanent strike-through anchors are a UAE advertising risk. */

export type SafariPackage = {
  slug: string;
  name: string;
  group: 'shared' | 'private';
  vehicle: string;
  capacity: string;
  duration: string;
  priceLabel: string;      // "Per person" | "2 person" | "Private 4x4" etc.
  price: number;
  was?: number;
  image: string;
  blurb: string;
  includes: string[];
  featured?: boolean;
};

export const sharedSafaris: SafariPackage[] = [
  {
    slug: 'evening-desert-safari',
    name: 'Evening Desert Safari Dubai',
    group: 'shared', vehicle: 'Shared 4x4', capacity: '6 to 7 persons', duration: '7 to 8 hours',
    priceLabel: 'Per person', price: 99, was: 160,
    image: '2024/11/dune-bashing-.webp',
    blurb: 'The classic evening desert safari Dubai: red dune bashing in a shared Land Cruiser, a sunset stop, then a Bedouin camp with halal BBQ dinner and live entertainment.',
    includes: ['Hotel pickup and drop-off', 'Dune bashing in a 4x4', 'Sunset photo stop', 'Camel ride', 'Sandboarding', 'Halal BBQ dinner', 'Belly dance, tanoura and fire show'],
    featured: true
  },
  {
    slug: 'vip-evening-desert-safari',
    name: 'VIP Evening Desert Safari',
    group: 'shared', vehicle: 'Shared 4x4', capacity: '6 to 7 persons', duration: '7 to 8 hours',
    priceLabel: 'Per person', price: 150, was: 250,
    image: '2024/11/banner-07.jpg',
    blurb: 'The evening safari upgraded — VIP seating at the camp, a better dinner spread and a quieter section away from the main crowd.',
    includes: ['Hotel pickup and drop-off', 'Dune bashing in a 4x4', 'VIP camp seating', 'Camel ride', 'Sandboarding', 'Premium halal BBQ dinner', 'Full entertainment programme'],
    featured: true
  },
  {
    slug: 'evening-desert-safari-with-atv',
    name: 'Evening Desert Safari + ATVs',
    group: 'shared', vehicle: 'Shared 4x4', capacity: '6 to 7 persons', duration: '7 to 8 hours',
    priceLabel: 'Per person', price: 199, was: 300,
    image: '2024/11/Desert-Safari-with-Quad-Bike.jpg',
    blurb: 'Evening desert safari with a quad bike session added before the camp stop. The pick when half the group wants to drive rather than be driven.',
    includes: ['Hotel pickup and drop-off', 'Dune bashing in a 4x4', 'Quad bike ride', 'Camel ride', 'Sandboarding', 'Halal BBQ dinner', 'Camp entertainment'],
    featured: true
  },
  {
    slug: 'vip-evening-desert-safari-with-atv',
    name: 'VIP Evening Desert Safari + ATVs',
    group: 'shared', vehicle: 'Shared 4x4', capacity: '6 to 7 persons', duration: '7 to 8 hours',
    priceLabel: 'Per person', price: 250, was: 350,
    image: '2024/11/Desert-Safari-With-Dune-Buggy.jpg',
    blurb: 'VIP camp treatment plus a quad bike session — the fullest shared evening safari we run.',
    includes: ['Hotel pickup and drop-off', 'Dune bashing in a 4x4', 'Quad bike ride', 'VIP camp seating', 'Camel ride', 'Sandboarding', 'Premium halal BBQ dinner', 'Full entertainment programme']
  },
  {
    slug: 'evening-desert-safari-with-dune-buggy',
    name: 'Evening Desert Safari + Dune Buggy',
    group: 'shared', vehicle: 'Shared 4x4', capacity: '6 to 7 persons', duration: '7 to 8 hours',
    priceLabel: '2 persons', price: 750, was: 1200,
    image: '2024/11/Dune-Buggy-Dubai.webp',
    blurb: 'Evening desert safari paired with a self-drive dune buggy session. Priced for two people, not per head.',
    includes: ['Hotel pickup and drop-off', 'Dune bashing in a 4x4', 'Self-drive dune buggy session', 'Camel ride', 'Sandboarding', 'Halal BBQ dinner', 'Camp entertainment'],
    featured: true
  },
  {
    slug: 'overnight-desert-safari',
    name: 'Overnight Desert Safari Dubai',
    group: 'shared', vehicle: 'Shared 4x4', capacity: '6 to 7 persons', duration: '16 hours',
    priceLabel: 'Per person', price: 250, was: 350,
    image: '2024/11/Fire-Show-Desert.webp',
    blurb: 'Stay the night. Evening safari, BBQ dinner, then sleep at camp under the stars and wake for sunrise over the red dunes.',
    includes: ['Hotel pickup and drop-off', 'Dune bashing in a 4x4', 'Halal BBQ dinner', 'Overnight camp stay', 'Breakfast', 'Sunrise over the dunes', 'Camp entertainment']
  }
];

export const privateSafaris: SafariPackage[] = [
  {
    slug: 'private-safari-with-4-seater-buggy',
    name: 'Private Safari With 4-Seater Buggy',
    group: 'private', vehicle: 'Private 4x4', capacity: '4 persons', duration: '7 hours',
    priceLabel: 'Private 4x4', price: 1300, was: 1900,
    image: '2024/11/4-seater-dune-buggy-polaris-1000c.webp',
    blurb: 'Your own vehicle and guide, plus a 4-seater dune buggy session so the whole group drives together.',
    includes: ['Private hotel pickup and drop-off', 'Private 4x4 and guide', '4-seater dune buggy session', 'Camel ride', 'Sandboarding', 'Halal BBQ dinner', 'Camp entertainment'],
    featured: true
  },
  {
    slug: 'private-morning-desert-safari',
    name: 'Private Morning Desert Safari',
    group: 'private', vehicle: 'Private 4x4', capacity: '6 to 7 persons', duration: '4 to 5 hours',
    priceLabel: 'Private Land Cruiser', price: 650, was: 950,
    image: '2024/11/banner-06.jpg',
    blurb: 'A morning desert safari Dubai in your own Land Cruiser — cooler sand, quieter dunes, and back in time for the rest of the day.',
    includes: ['Private hotel pickup and drop-off', 'Private Land Cruiser and guide', 'Morning dune bashing', 'Camel ride', 'Sandboarding', 'Refreshments']
  },
  {
    slug: 'couple-vip-evening-desert-safari',
    name: 'Couple VIP Evening Desert Safari',
    group: 'private', vehicle: 'Private 4x4', capacity: '6 to 7 persons', duration: '7 hours',
    priceLabel: 'Private Land Cruiser', price: 600, was: 800,
    image: '2024/11/Camel-Riding.webp',
    blurb: 'A private evening safari timed and paced for two — sunset stop, unhurried photos, and VIP seating at camp.',
    includes: ['Private hotel pickup and drop-off', 'Private Land Cruiser and guide', 'Sunset dune drive', 'VIP camp seating', 'Camel ride', 'Halal BBQ dinner', 'Camp entertainment'],
    featured: true
  },
  {
    slug: 'private-evening-desert-safari',
    name: 'Private Evening Desert Safari',
    group: 'private', vehicle: 'Private 4x4', capacity: '6 to 7 persons', duration: '7 hours',
    priceLabel: 'Private vehicle', price: 650, was: 950,
    image: '2024/11/desert-safari1.webp',
    blurb: 'The standard evening safari on your own schedule rather than a shared one. Suits families and small groups.',
    includes: ['Private hotel pickup and drop-off', 'Private vehicle and guide', 'Dune bashing', 'Camel ride', 'Sandboarding', 'Halal BBQ dinner', 'Camp entertainment']
  },
  {
    slug: 'desert-safari-private-land-cruiser',
    name: 'Desert Safari Private Land Cruiser',
    group: 'private', vehicle: 'Private 4x4', capacity: '6 to 7 persons', duration: '7 hours',
    priceLabel: 'Private Land Cruiser', price: 750, was: 1100,
    image: '2024/11/Dubai-Desert-Safari-6-.jpeg',
    blurb: 'A dedicated Land Cruiser for your group, with a driver who tailors the dune route to how much bashing you actually want.',
    includes: ['Private hotel pickup and drop-off', 'Dedicated Land Cruiser and driver', 'Adjustable dune route', 'Camel ride', 'Sandboarding', 'Halal BBQ dinner', 'Camp entertainment']
  },
  {
    slug: 'evening-safari-by-private-mini-bus',
    name: 'Evening Safari By Private Mini Bus',
    group: 'private', vehicle: 'Private bus', capacity: '10 to 12 persons', duration: '7 hours',
    priceLabel: 'Private mini bus', price: 800, was: 1150,
    image: '2024/11/BUffet.jpeg',
    blurb: 'For larger groups travelling together — one mini bus for 10 to 12 people rather than splitting across several 4x4s.',
    includes: ['Private hotel pickup and drop-off', 'Private mini bus for 10–12', 'Desert camp transfer', 'Camel ride', 'Sandboarding', 'Halal BBQ dinner', 'Camp entertainment']
  }
];

export const allSafaris = [...sharedSafaris, ...privateSafaris];
export const safariFromPrice = Math.min(...allSafaris.map(s => s.price));
