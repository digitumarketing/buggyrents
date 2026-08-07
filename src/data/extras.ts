/* Combos, add-ons and policies — confirmed by client 7 Aug 2026. */

export type Combo = {
  slug: string; name: string; type: 'buggy' | 'quad';
  includes: string; capacity: string; price: number; note?: string;
};

/* Buggy + Bedouin BBQ dinner. Buggy session is 30 minutes on every combo. */
export const bbqCombos: Combo[] = [
  { slug: '2-seater-polaris-bbq', name: '2-Seater Polaris + Bedouin BBQ Dinner', type: 'buggy',
    includes: '30-minute Polaris RZR session, then a Bedouin camp BBQ dinner with entertainment', capacity: '2 pax', price: 450 },
  { slug: '4-seater-polaris-bbq', name: '4-Seater Polaris + Bedouin BBQ Dinner', type: 'buggy',
    includes: '30-minute Polaris RZR 4-seater session, then a Bedouin camp BBQ dinner', capacity: '4 pax', price: 600 },
  { slug: '2-seater-can-am-bbq', name: '2-Seater Can-Am X3 + Bedouin BBQ Dinner', type: 'buggy',
    includes: '30-minute Can-Am Maverick X3 session, then a Bedouin camp BBQ dinner', capacity: '2 pax', price: 650 },
  { slug: '4-seater-can-am-bbq', name: '4-Seater Can-Am X3 + Bedouin BBQ Dinner', type: 'buggy',
    includes: '30-minute Can-Am Maverick X3 4-seater session, then a Bedouin camp BBQ dinner', capacity: '4 pax', price: 800 },
  { slug: 'maverick-r-bbq', name: 'Can-Am Maverick R + Bedouin BBQ Dinner', type: 'buggy',
    includes: '30-minute Can-Am Maverick R session, then a Bedouin camp BBQ dinner', capacity: '2 pax', price: 1000 }
];

/* Quad + desert safari. Two tiers, split by quad session length. */
export const quadSafariCombos: Combo[] = [
  { slug: 'safari-quad-30min', name: 'Desert Safari + 30-Minute Quad Bike', type: 'quad',
    includes: 'Evening desert safari with dune bashing, camp dinner and a 30-minute quad session', capacity: 'Per person', price: 200 },
  { slug: 'safari-quad-1hour', name: 'Desert Safari + 1-Hour Quad Bike', type: 'quad',
    includes: 'Evening desert safari with dune bashing, camp dinner and a full hour on the quad', capacity: 'Per person', price: 300 }
];

export const addOns = [
  { name: 'Sandboarding', price: 0, label: 'Free', note: 'Included on desert safari packages' },
  { name: 'Camel ride', price: 100, label: 'AED 100', note: 'Per person' },
  { name: 'Group and corporate bookings', price: null, label: 'Custom quote', note: 'Message on WhatsApp with group size and date' }
];

export const transfers = {
  dubaiFree: true,
  summary: 'Hotel pickup and drop-off within Dubai is free on every booking.',
  outsideDubai: 'Transfers from Sharjah, Ajman, Abu Dhabi and Ras Al Khaimah are quoted with the booking.'
};

/* Policy — client confirmed 7 Aug 2026. Original wording, not copied from any competitor. */
export const policy = {
  cancellationHours: 24,
  cancellation: 'Cancel more than 24 hours before your slot and you get a full refund. Inside 24 hours we will always try to move you to another date rather than charge you.',
  weather: 'If wind, heat or visibility make the route unsafe we contact you before you travel and reschedule at no cost. If no alternative date works, you get a full refund.',
  deposit: 'No deposit is taken to hold a standard slot. Multi-vehicle and corporate bookings are confirmed separately.'
};
