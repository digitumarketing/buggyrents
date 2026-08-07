import type { ClusterData } from '@/components/templates/Cluster.astro';
import { allVehicles, byCategory, fromPrice, type Vehicle } from '@/data/vehicles';
import { bySubject } from '@/data/images';

const NOUN = { buggy: 'buggy', quad: 'quad', dirtbike: 'dirt bike' } as const;
const PARENT = {
  buggy:    { label: 'Dune Buggy Dubai', href: '/dune-buggy-dubai/' },
  quad:     { label: 'Quad Bike Dubai',  href: '/quad-bike-dubai/' },
  dirtbike: { label: 'KTM Dirt Bike Dubai', href: '/ktm-dirt-bike-dubai/' }
} as const;
const HERO = {
  buggy: 'dune-buggy-dubai-hero-red-dunes',
  quad: 'quad-biking-dubai-hero-red-dunes',
  dirtbike: 'ktm-dirt-bike-dubai-hero-sunrise-dunes'
} as const;
const base = (c: Vehicle['category']) => PARENT[c].href;

const DURATION_BADGE: Record<string, string> = {
  '30 minutes': 'Entry ride', '1 hour': 'Most balanced', '2 hours': 'Longer route',
  '3 hours': 'Half day', '4 hours': 'Full session'
};
const DURATION_BLURB = (v: Vehicle, label: string) => ({
  '30 minutes': `The lowest commitment. Enough to learn the controls and cross a few dune faces on the ${v.shortName}.`,
  '1 hour':     `The sweet spot for most riders. Time to settle into the ${v.shortName} and get a proper run at the red dunes.`,
  '2 hours':    `A longer route with more varied terrain and photo stops, for riders already comfortable on the ${v.shortName}.`,
  '3 hours':    `A half-day session. Suits confident riders and groups pairing the ride with a camp stop.`,
  '4 hours':    `The longest route we run on the ${v.shortName}. For experienced riders who want maximum time in the dunes.`
}[label] ?? '');

/* Pick gallery images from the same subject, excluding every image already
   on the page (the vehicle card and all related cards). */
function galleryFor(v: Vehicle, taken: string[]) {
  const pool = bySubject(v.category).filter(n => !taken.includes(n));
  const fallback = bySubject(v.category).filter(n => n !== v.image);
  const src = pool.length >= 3 ? pool : fallback;
  const pick = (i: number) => src[i % src.length];
  return [
    { image: pick(0), kicker: `${v.seats}-seat profile`, title: `Open cockpit, roll cage and red-dune stance.`,
      body: `The ${v.shortName} is set up for the Lahbab route: ${v.engine}, ${v.seats} ${v.seats === 1 ? 'seat' : 'seats'}, and a ride height that copes with soft sand.` },
    { image: pick(1), kicker: 'On the route', title: 'Guide-led lines through the dune bowls.' },
    { image: pick(2), kicker: 'At the base', title: 'Checked and fuelled before every departure.' }
  ];
}

const includedFor = (v: Vehicle) => [
  `${v.name} prepared for your selected duration.`,
  'Helmet, safety briefing, harness check, fuel and chilled water.',
  'Lead guide on the route, warm-up check and Lahbab red-dune line control.',
  'Central Dubai hotel pickup on request, or self-drive directions to the Al Awir base.'
];
const checkForFor = (v: Vehicle) => [
  `Minimum age for this ${NOUN[v.category]} is ${v.minAge}. Bring photo ID for the booking record.`,
  'Driver switching is only allowed if the guide approves it at a safe stop.',
  'Pregnant guests and anyone with back, neck, heart or recent-surgery concerns should not ride.',
  'Sessions may be moved if wind or heat make the route unsafe. We will contact you first.'
];
const flowFor = (v: Vehicle) => [
  { h: 'Pickup or arrival', p: 'Hotel pickup on request, or self-drive directions sent after confirmation.' },
  { h: 'Safety briefing', p: `Helmet fitting, controls, guide signals and stopping rules for the ${NOUN[v.category]}.` },
  { h: 'Warm-up check', p: 'The guide checks your control on flat sand before moving to bigger faces.' },
  { h: 'Guided route', p: 'A lead guide sets the pace and a sweep stays at the back so the group never splits.' },
  { h: 'Photos and return', p: 'Photo stop at the best light, back to base, then transfer or self-drive return.' }
];
const safetyFor = (v: Vehicle) => [
  { label: 'Guide-led', h: 'Follow the lead line', p: 'Guests stay behind the guide on the planned red-dune route.' },
  { label: 'Briefed first', h: 'No blind starts', p: 'Controls, helmet, signals and stopping rules are explained before anyone moves.' },
  { label: 'Age checked', h: `Minimum age ${v.minAge}`, p: `This ${NOUN[v.category]} is only released to riders aged ${v.minAge} and over.` },
  { label: 'Weather aware', h: 'We move, not risk it', p: 'High wind or extreme heat means a rescheduled slot rather than a run.' }
];

const faqsFor = (v: Vehicle): { q: string; a: string }[] => {
  const cheapest = v.durations[0], list = v.durations.map(d => `${d.label} AED ${d.price.toLocaleString('en-US')}`).join(', ');
  return [
    { q: `How much is the ${v.shortName} in Dubai?`, a: `${v.name} pricing is ${list}. Every price is per vehicle, not per person.` },
    { q: `Is the ${v.shortName} good for first-time riders?`, a: v.minAge <= 12
        ? `Yes. This is one of the easiest options we run, and the briefing plus warm-up covers everything before you set off.`
        : `It depends on the rider. The briefing and warm-up check come first, and the guide will hold the pace back if anyone needs it. If it is your very first time, tell us when booking and we will recommend the right starting point.` },
    { q: 'What is the minimum age?', a: `Riders must be ${v.minAge} or over for the ${v.shortName}. Bring photo ID for the booking record.` },
    { q: 'Do I need a driving licence?', a: 'No licence is required on guided routes. Photo ID is enough.' },
    { q: 'Is hotel pickup available?', a: 'Yes, on request across Dubai. Send your hotel or area and we quote the transfer with the booking rather than adding it at the base.' },
    { q: 'What should I wear?', a: 'Closed shoes, clothes you do not mind getting sandy, and sunglasses. We provide the helmet.' },
    { q: 'How do I book?', a: `Message us on WhatsApp with your date, group size and the duration you want. We reply with availability and the total in AED, usually within a few minutes.` },
    { q: 'How long should I book?', a: `${cheapest.label} is a taster. For most riders an hour is the sweet spot. Longer routes suit riders who already know what they are doing.` }
  ];
};

/* Every other vehicle in the same category first, then the closest alternative
   from another category. Same-category options are the genuinely relevant next choices. */
const relatedFor = (v: Vehicle) => {
  const sameCat = byCategory[v.category].filter(x => x.slug !== v.slug);
  const otherCat = allVehicles.filter(x => x.category !== v.category)
    .sort((a, b) => Math.abs(fromPrice(a) - fromPrice(v)) - Math.abs(fromPrice(b) - fromPrice(v)))
    .slice(0, Math.max(0, 6 - sameCat.length));
  return [...sameCat, ...otherCat].slice(0, 6).map(x => ({
    tag: x.category !== v.category
      ? `Try ${NOUN[x.category]}`
      : x.seats > v.seats ? 'More seats'
      : x.seats < v.seats ? 'Fewer seats'
      : fromPrice(x) > fromPrice(v) ? 'More power' : 'Lower price',
    title: x.shortName, desc: x.blurb, from: `From AED ${fromPrice(x).toLocaleString('en-US')}`,
    href: `${base(x.category)}${x.slug}/`, img: x.image
  }));
};

const guideBlocksFor = (v: Vehicle) => {
  const n = NOUN[v.category];
  const price = (i: number) => v.durations[i] ? `AED ${v.durations[i].price.toLocaleString('en-US')}` : '';
  const ladder = v.durations.map(d => `${d.label} at AED ${d.price.toLocaleString('en-US')}`).join(', ');
  const seatWord = v.seats === 1 ? 'a single rider' : `${v.seats} people`;
  return [
    { h: `Who the ${v.shortName} suits`,
      html: `<p class="lf-lead">The ${v.name} is a ${v.engine} ${n} carrying ${seatWord}, run on the ${v.area.toLowerCase()} from our Al Awir base.</p>
<p>${v.blurb} The minimum age is <span class="pill">${v.minAge}+</span>, and that limit is not negotiable: it reflects the weight of the machine, the speed it reaches in soft sand, and how much physical control the rider needs when a dune face steepens unexpectedly.</p>
<p>If you have never been off-road before, say so when you book. The guide holds the group pace to the least confident rider, and the warm-up on flat sand exists precisely so nobody is learning the controls halfway up a dune. Riders who already have experience usually find the first ten minutes slow, then the route opens up.</p>
<p>Group size matters as much as machine choice. A ${n} of this size sits naturally in a convoy of four to eight vehicles. Larger bookings get staged in waves so the guide can keep every rider in sight rather than stretching the line across two dune bowls.</p>` },

    { h: 'Which duration to book',
      html: `<p class="lf-lead">Pricing is per ${n}, never per person: ${ladder}.</p>
<p>The shortest slot is a taster. It is long enough to learn the throttle, complete the briefing, and cross a handful of dune faces, but not long enough to get genuinely comfortable. Guests who book it and enjoy it almost always wish they had booked longer, which is worth knowing before you choose.</p>
<p>An hour is the sweet spot for most first-time riders. You get the warm-up, a proper route through the dune bowls, a photo stop at the best light, and enough time that the controls stop feeling foreign. If you are only doing this once on your trip, book the hour.</p>
${v.durations.length > 2 ? `<p>Longer routes suit riders who already know what they are doing, or groups combining the ride with a camp stop. Beyond two hours you are into genuinely varied terrain rather than repeating the same bowls, and the guide can extend the line further into the belt.</p>` : `<p>This ${n} runs on two durations only. If you want a longer session, the open-desert options in the same fleet extend to three and four hours.</p>`}
<p>One practical note: if you are travelling in from Sharjah, Ajman or Abu Dhabi, book at least an hour. A thirty-minute session rarely justifies a ninety-minute drive each way.</p>` },

    { h: 'What actually happens at Lahbab',
      html: `<p class="lf-lead">Our base sits on the Dubai-Hatta road at Al Awir, at the edge of the <span class="pill">Lahbab red dunes</span>, roughly 45 minutes from Downtown Dubai.</p>
<p>The red colour is iron oxide in the sand, not a camera filter. It is why this belt photographs the way it does, and why the light in the last hour before sunset is worth planning around. The dunes here run from gentle flats near the base to steep faces further in, which is what makes the area workable for beginners and experienced riders on the same route.</p>
<p>On arrival the team checks your booking, fits a helmet and runs the safety briefing. Nothing moves until harnesses are checked and everyone has confirmed they understand the guide signals. The warm-up happens on flat sand where mistakes cost nothing.</p>
<p>From there the guide leads and a sweep rider stays at the back, so the group never splits. The route builds gradually: flat ground, then rolling sections, then the steeper bowls once the guide is satisfied everyone can place the vehicle where they intend to.</p>` },

    { h: 'Pickup, transfers and planning your day',
      html: `<p class="lf-lead">Hotel pickup is available across Dubai and quoted with the booking, never added at the base.</p>
<p>Most guests self-drive to Al Awir, and there is parking on site. If you would rather be collected, send your hotel name or a pinned location and we include the transfer cost in the quote, so the number you agree is the number you pay.</p>
<p>Drive times vary more than people expect. Downtown and Deira are around 35 minutes, Dubai Marina and Palm Jumeirah closer to an hour, and outer-emirate pickups longer again. See the <a href="/locations/dune-buggy-near-downtown-dubai/">Downtown</a>, <a href="/locations/dune-buggy-near-dubai-marina/">Marina</a>, <a href="/locations/dune-buggy-from-sharjah/">Sharjah</a> and <a href="/locations/dune-buggy-from-abu-dhabi/">Abu Dhabi</a> pages for what to confirm before leaving.</p>
<p>If the ride is part of a bigger day, the late-afternoon slot pairs naturally with a <a href="/desert-safari-dubai-deals/">desert safari</a> and BBQ camp stop, rather than booking the two as separate trips on separate days.</p>` },

    { h: 'Best time of year, and what to wear',
      html: `<p class="lf-lead">October to April is the most comfortable window, with daytime highs of 24 to 30 degrees and cool evenings.</p>
<p>May to September still works well, but sessions move to early morning shortly after sunrise, or late afternoon once the sand has cooled. The dunes hold their colour year-round, so summer photographs are just as good; you simply ride earlier.</p>
<p>Wind matters more than heat. On a high-wind day, visibility inside the dune bowls drops fast and blowing sand becomes genuinely unpleasant. We move the slot rather than run it, and we will contact you before you set off rather than after you arrive.</p>
<p>Wear closed shoes, clothes you do not mind getting sandy, and bring sunglasses and sunscreen. We provide the helmet. Avoid loose scarves, long unsecured hair and anything that can catch. Contact lens wearers should bring a spare pair.</p>` },

    { h: 'Safety, gear and what is included',
      html: `<p class="lf-lead">Helmets are mandatory and included in every price on this page. The briefing is not optional.</p>
<p>Guides carry recovery gear and stay with the group throughout. We do not send unaccompanied vehicles into the dunes, and we do not run sessions when heat or visibility make the route unsafe. Every machine is checked and fuelled before departure rather than between bookings.</p>
<p>No UAE or international driving licence is required on guided routes. Bring photo ID for the booking record. Pregnant guests, and anyone with back, neck, heart or recent-surgery concerns, should not ride: the terrain produces sudden vertical movement that no amount of careful driving removes.</p>
<p>Included in the price: the ${n} for your chosen duration, helmet, safety briefing, harness check, fuel, chilled water and a lead guide. There is no fuel surcharge, no gear rental fee and no per-head add-on at the base.</p>` },

    { h: 'How to book',
      html: `<p class="lf-lead">Message us on WhatsApp with your date, group size, rider ages and the duration you want.</p>
<p>We reply with availability, the total in AED and a pickup plan, usually within a few minutes. No deposit is needed to hold a standard slot. Multi-vehicle and corporate bookings are confirmed differently and we explain that in the message rather than surprising you later.</p>
<p>Weekend and public-holiday afternoons fill first, particularly between October and April. If your dates are fixed, message earlier rather than later. If your dates are flexible, tell us and we will suggest the quieter slots, which usually means a better ride as well as easier availability.</p>` }
  ];
};

export function tourData(v: Vehicle): ClusterData {
  const n = NOUN[v.category];
  const durationCopy: ClusterData['durationCopy'] = {};
  v.durations.forEach(d => { durationCopy[d.label] = { badge: DURATION_BADGE[d.label] ?? 'Option', blurb: DURATION_BLURB(v, d.label) }; });
  const from = fromPrice(v);
  const related = relatedFor(v);
  return {
    vehicle: v,
    crumbParent: PARENT[v.category],
    title: `${v.name} Dubai | From AED ${from.toLocaleString('en-US')} | Buggy Rents`,
    description: `Book the ${v.name} in Dubai from AED ${from.toLocaleString('en-US')}. ${v.engine}, ${v.seats} ${v.seats === 1 ? 'seat' : 'seats'}, age ${v.minAge}+, guided ${v.area.toLowerCase()} route. WhatsApp +971 56 209 5713.`,
    heroImage: HERO[v.category],
    eyebrow: `${v.engine} · ${v.seats} ${v.seats === 1 ? 'seat' : 'seats'} · age ${v.minAge}+`,
    h1Lead: v.shortName.split(' ')[0], h1Em: v.shortName.split(' ').slice(1).join(' '), h1Tail: 'Dubai',
    lede: `${v.blurb} Guided on the ${v.area.toLowerCase()}, with helmet, briefing, fuel and a lead guide included. Price is per ${n}, not per person.`,
    specs: [
      { label: 'Vehicle', value: v.shortName },
      { label: 'Engine', value: v.engine },
      { label: 'Seats', value: `${v.seats} ${v.seats === 1 ? 'rider' : 'riders'}` },
      { label: 'Minimum age', value: `${v.minAge}+` },
      { label: 'Route', value: v.area }
    ],
    durationCopy,
    included: includedFor(v), checkBefore: checkForFor(v),
    flow: flowFor(v),
    whyH2: `Why the ${v.shortName} is worth the slot.`,
    whyLede: `${v.engine}, ${v.seats} ${v.seats === 1 ? 'seat' : 'seats'}, and a setup built for the ${v.area.toLowerCase()}.`,
    gallery: galleryFor(v, [v.image, ...related.map(r => r.img)]),
    safety: safetyFor(v),
    faqs: faqsFor(v),
    related,
    guideKicker: `${v.shortName} guide`,
    guideH2: `How to choose the ${v.name} ride`,
    guideIntro: `Everything worth knowing before booking the <strong>${v.name}</strong> in Dubai: which duration fits, what is included, age limits, pickup, and how the Lahbab red-dune route actually runs.`,
    guideBlocks: guideBlocksFor(v)
  };
}

export const allTours = allVehicles.map(v => ({ v, data: tourData(v) }));
export { byCategory };
