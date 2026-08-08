import type { PriceGuideData, PriceTable } from '@/components/templates/PriceGuide.astro';
import { buggies, quads, dirtbikes, fromPrice, type Vehicle } from '@/data/vehicles';
import { bbqCombos, quadSafariCombos, addOns, transfers, policy, payment } from '@/data/extras';
import { sharedSafaris, privateSafaris, safariFromPrice } from '@/data/safari';
import { bySubject } from '@/data/images';

const DUR = ['30 minutes', '1 hour', '2 hours', '3 hours', '4 hours'];
const shortDur = (l: string) => l.replace(' minutes', ' min').replace(' hours', ' hr').replace(' hour', ' hr');

function vehicleTable(list: Vehicle[], base: string, title: string, note: string): PriceTable {
  const used = DUR.filter(d => list.some(v => v.durations.some(x => x.label === d)));
  return {
    title, note,
    columns: used.map(shortDur),
    rows: list.map(v => ({
      name: v.shortName, href: `${base}${v.slug}/`,
      spec: `${v.engine} · ${v.seats} ${v.seats === 1 ? 'seat' : 'seats'} · age ${v.minAge}+`,
      cells: used.map(d => v.durations.find(x => x.label === d)?.price ?? null)
    }))
  };
}

const includedBase = [
  'The vehicle for your chosen duration, checked and fuelled before departure.',
  'Helmet, safety briefing and harness check.',
  'A lead guide on the route and a sweep rider at the back.',
  'Chilled water and a photo stop at the best light.',
  'Free hotel pickup and drop-off within Dubai.'
];
const checkBase = [
  'Minimum age varies by vehicle. Bring photo ID for the booking record.',
  'Transfers from Sharjah, Ajman, Abu Dhabi and Ras Al Khaimah are quoted separately.',
  'Pregnant guests and anyone with back, neck, heart or recent-surgery concerns should not ride.',
  `Free cancellation up to ${policy.cancellationHours} hours before your slot.`
];
const flowBase = [
  { h: 'Send your details', p: 'Date, group size, ages and which option you want, on WhatsApp.' },
  { h: 'Get the total', p: 'We reply with availability and the full price in AED. Nothing hidden, nothing added later.' },
  { h: 'Confirm the slot', p: 'No deposit on standard bookings. Your slot is held once you confirm.' },
  { h: 'Get collected', p: 'Free pickup within Dubai, or self-drive directions to the Al Awir base.' },
  { h: 'Pay at the base', p: payment.summary }
];
const safetyBase = [
  { label: 'Every price', h: 'Gear is included', p: 'Helmet, briefing and harness check are never charged separately.' },
  { label: 'Every price', h: 'A guide rides with you', p: 'We do not send unaccompanied vehicles into the dunes at any price point.' },
  { label: 'Every price', h: 'Free Dubai pickup', p: transfers.summary },
  { label: 'Every price', h: 'Nothing due upfront', p: policy.deposit }
];
const gal = (subject: 'buggy'|'quad'|'dirtbike'|'safari', taken: string[] = []) => {
  const pool = bySubject(subject).filter(n => !taken.includes(n));
  return [
    { image: pool[0], kicker: 'The fleet', title: 'Checked and fuelled before every departure.',
      body: 'Every machine is prepared before the slot rather than between bookings, which is part of what the price covers.' },
    { image: pool[1], kicker: 'On the route', title: 'Guide-led lines through the dune bowls.' },
    { image: pool[2], kicker: 'At the base', title: 'Briefing and harness check before anyone moves.' }
  ];
};

/* ─────────────── DUNE BUGGY PRICES ─────────────── */
export const buggyPrices: PriceGuideData = {
  slug: '/dune-buggy-dubai/price/',
  crumbParent: { label: 'Dune Buggy Dubai', href: '/dune-buggy-dubai/' },
  title: `Dune Buggy Dubai Price | From AED ${fromPrice(buggies[0])} per Buggy | Buggy Rents`,
  description: `Dune buggy Dubai price list: 11 buggies from AED ${fromPrice(buggies[0])} for 30 minutes. Polaris RZR, Can-Am Maverick X3 and Turbo RR, plus BBQ combos. Price per buggy, free Dubai pickup.`,
  heroImage: 'dune-buggy-dubai-hero-red-dunes',
  eyebrow: '11 buggies · 4 durations · price per vehicle',
  h1Lead: 'Dune Buggy Dubai', h1Em: 'Price', h1Tail: 'Guide',
  lede: 'The full dune buggy Dubai price list, per buggy rather than per person. Polaris RZR through to Can-Am Maverick R, plus Bedouin BBQ combos. Helmet, briefing, fuel, guide and free Dubai hotel pickup are in every price.',
  chips: [`From AED ${fromPrice(buggies[0])}`, '11 buggies', 'Free Dubai pickup', 'No deposit'],
  panel: { kicker: 'Starts from', title: `AED ${fromPrice(buggies[0])}`,
    sub: 'Polaris RZR 1000 2-seater / 30 minutes',
    points: ['Eleven buggies from Polaris RZR to Can-Am Maverick R.', 'Five BBQ combos pairing a buggy session with a camp dinner.', 'Prices are per buggy, not per person.'] },
  specs: [
    { label: 'Buggies', value: '11 options' },
    { label: 'From', value: `AED ${fromPrice(buggies[0])}` },
    { label: 'Durations', value: '30 min to 4 hr' },
    { label: 'Priced', value: 'Per buggy' },
    { label: 'Dubai pickup', value: 'Free' }
  ],
  tables: [
    vehicleTable(buggies, '/dune-buggy-dubai/', 'Dune buggy prices', 'Price is per buggy. A 2-seater at AED 300 covers two people, not one each.'),
    { title: 'Dune buggy + Bedouin BBQ combos', note: 'The buggy session is 30 minutes on every combo, followed by a camp BBQ dinner.',
      columns: ['Package price'],
      rows: bbqCombos.map(c => ({ name: c.name, spec: `${c.capacity} · ${c.includes}`, cells: [c.price] })) }
  ],
  included: includedBase, checkBefore: checkBase, flow: flowBase,
  whyH2: 'What the buggy price actually buys.',
  whyLede: 'Machine, gear, guide and pickup. The difference between the cheapest and most expensive slot is power and time, not service.',
  gallery: gal('buggy', buggies.map(v => v.image)), gallerySubject: 'buggy',
  safety: safetyBase,
  faqs: [
    { q: 'What is the cheapest dune buggy price in Dubai?', a: `The lowest entry point is AED ${fromPrice(buggies[0])} for 30 minutes in a Polaris RZR 1000 2-seater. That is the price for the buggy, so two people ride for AED ${fromPrice(buggies[0])} total.` },
    { q: 'Is the price per person or per buggy?', a: 'Per buggy, always. A 4-seater at AED 350 carries four people for AED 350. This is the single biggest difference between our pricing and per-head safari pricing.' },
    { q: 'Why do Can-Am buggies cost more than Polaris?', a: 'More power, more suspension travel and a stiffer setup. The Polaris RZR is the balanced choice for first-time drivers; the Can-Am X3 and Maverick R are for drivers who already know what they are doing.' },
    { q: 'Is hotel pickup included in the price?', a: transfers.summary + ' ' + transfers.outsideDubai },
    { q: 'How do I pay?', a: payment.detail },
    { q: 'Do I pay a deposit to book?', a: policy.deposit },
    { q: 'Can I cancel and get a refund?', a: policy.cancellation },
    { q: 'What if the weather is bad?', a: policy.weather },
    { q: 'What does the BBQ combo include?', a: 'A 30-minute buggy session followed by a Bedouin camp dinner with entertainment. Combos run from AED 450 for a 2-seater Polaris to AED 1,000 for the Can-Am Maverick R.' },
    { q: 'Are there any hidden charges?', a: 'No fuel surcharge, no gear rental fee and no per-head add-on at the base. The only extra is a transfer from outside Dubai, which is quoted before you book.' }
  ],
  related: [
    { tag: 'Quad prices', title: 'Quad Biking Dubai Price', desc: 'Six quads from a fenced kids area to the Raptor 700.', from: `From AED ${fromPrice(quads[0])}`, href: '/quad-bike-dubai/price/', img: quads[0].image },
    { tag: 'Dirt bike', title: 'KTM Dirt Bike Dubai', desc: 'A 450cc desert enduro for experienced riders.', from: `From AED ${fromPrice(dirtbikes[0])}`, href: '/ktm-dirt-bike-dubai/ktm-450-dirt-bike/', img: dirtbikes[0].image },
    { tag: 'Safari prices', title: 'Desert Safari Dubai Price', desc: '12 shared and private safari packages with camp dinner.', from: `From AED ${safariFromPrice}`, href: '/desert-safari-dubai/price/', img: 'desert-safari-dubai-dune-bashing-land-cruiser' },
    { tag: 'All buggies', title: 'Dune Buggy Dubai', desc: 'The full fleet with specs, routes and booking detail.', from: `From AED ${fromPrice(buggies[0])}`, href: '/dune-buggy-dubai/', img: 'dune-buggy-convoy-crossing-dubai-red-dunes' }
  ],
  guideKicker: 'Buggy price guide',
  guideH2: 'How to read dune buggy Dubai prices without booking the wrong package',
  guideIntro: 'The full <strong>dune buggy Dubai price</strong> list explained: why prices are per buggy, what separates a Polaris from a Can-Am, which duration is worth paying for, and what is genuinely included.',
  guideBlocks: [
    { h: 'Per buggy, not per person', html: `<p class="lf-lead">This is the detail that changes the maths most, and it is the one people miss.</p><p>Every price on this page is for the vehicle. A 2-seater Polaris at <span class="pill">AED 300</span> for 30 minutes is AED 300 total, so two riders pay AED 150 each. A 4-seater at AED 350 works out at under AED 90 per person for four.</p><p>Compare that with per-head desert safari pricing, where a group of four pays four times the headline number. For families and groups, the 4-seater buggies are consistently the cheapest way into the dunes.</p>` },
    { h: 'Polaris or Can-Am?', html: `<p class="lf-lead">The price ladder tracks power and suspension, not service quality.</p><p>The <a href="/dune-buggy-dubai/polaris-rzr-1000-2-seater/">Polaris RZR 1000</a> starts at AED 300 and is the balanced first-time choice: stable, forgiving, easy to place on a dune face. The <a href="/dune-buggy-dubai/can-am-maverick-x3-2-seater/">Can-Am Maverick X3</a> at AED 600 is a serious step up in acceleration and travel.</p><p>Above that, the Turbo RR and <a href="/dune-buggy-dubai/can-am-maverick-r-turbo/">Maverick R</a> are for drivers with real off-road experience. Paying more does not make the ride easier; it makes it faster and less forgiving.</p>` },
    { h: 'Which duration is worth paying for', html: `<p class="lf-lead">Thirty minutes is a taster. An hour is where most people should land.</p><p>The jump from 30 minutes to an hour roughly doubles the price but more than doubles the experience, because the briefing and warm-up eat into a short slot. On a 30-minute booking you are only properly riding for about 20 minutes.</p><p>Two hours and four hours suit experienced drivers and groups pairing the ride with a camp stop. If you are travelling in from outside Dubai, book at least an hour.</p>` },
    { h: 'What is genuinely free', html: `<p class="lf-lead">Three things people expect to pay for, and do not.</p><ul><li><strong>Hotel pickup within Dubai</strong> is free on every booking, whatever you spend.</li><li><strong>All safety gear</strong>: helmet, briefing, harness check, fuel and water.</li><li><strong>Sandboarding</strong> is included on safari packages at no charge.</li></ul><p>The only genuine extras are transfers from outside Dubai, and the camel ride add-on at AED 100.</p>` },
    { h: 'When you actually pay', html: `<p class="lf-lead">Nothing is taken when you book.</p><p>${payment.detail} There is no deposit on a standard slot and no online payment step, which also means no card details are stored anywhere.</p><p>${policy.cancellation}</p>` },
    { h: 'Buggy plus BBQ combos', html: `<p class="lf-lead">Five combos pair a 30-minute buggy session with a Bedouin camp dinner.</p><p>They run from AED 450 for a 2-seater Polaris to AED 1,000 for the Can-Am Maverick R. The buggy session is 30 minutes on all of them, so you are paying for the camp evening on top rather than a longer drive.</p><p>If the buggy is the main event, book a longer standalone slot instead. If the evening is the main event, the combo is better value than booking both separately.</p>` }
  ]
};

/* ─────────────── QUAD PRICES ─────────────── */
export const quadPrices: PriceGuideData = {
  slug: '/quad-bike-dubai/price/',
  crumbParent: { label: 'Quad Bike Dubai', href: '/quad-bike-dubai/' },
  title: `Quad Biking Dubai Price | From AED ${fromPrice(quads[0])} | Buggy Rents`,
  description: `Quad biking Dubai price list: six ATV options from AED ${fromPrice(quads[0])} for 30 minutes. Kids quads from age 6, boundary area, open desert and the Yamaha Raptor 700cc. Price per quad, free Dubai pickup.`,
  heroImage: 'quad-biking-dubai-hero-red-dunes',
  eyebrow: '6 quads · 5 durations · price per quad',
  h1Lead: 'Quad Biking Dubai', h1Em: 'Price', h1Tail: 'Guide',
  lede: `The full quad biking Dubai price list, from AED ${fromPrice(quads[0])} for a 30-minute kids session to four hours on a Yamaha Raptor 700cc. Sorted by riding area rather than model, because that is what actually decides which quad you can take.`,
  chips: [`From AED ${fromPrice(quads[0])}`, '6 quads', 'Age 6 and up', 'Free Dubai pickup'],
  panel: { kicker: 'Starts from', title: `AED ${fromPrice(quads[0])}`,
    sub: 'Kids quad, fenced area / 30 minutes',
    points: ['Six quads split by riding area, from age 6 to the Raptor 700.', 'Five durations on every machine, 30 minutes to 4 hours.', 'Prices are per quad. Double seats carry a passenger free.'] },
  specs: [
    { label: 'Quads', value: '6 options' },
    { label: 'From', value: `AED ${fromPrice(quads[0])}` },
    { label: 'Durations', value: '30 min to 4 hr' },
    { label: 'Youngest rider', value: 'Age 6' },
    { label: 'Dubai pickup', value: 'Free' }
  ],
  tables: [
    vehicleTable(quads, '/quad-bike-dubai/', 'Quad bike prices', 'Price is per quad. Double-seat machines carry a passenger at no extra cost.'),
    { title: 'Quad + desert safari combos', note: 'An evening safari with dune bashing and camp dinner, plus a quad session.',
      columns: ['Price per person'],
      rows: quadSafariCombos.map(c => ({ name: c.name, spec: c.includes, cells: [c.price] })) }
  ],
  included: includedBase, checkBefore: checkBase, flow: flowBase,
  whyH2: 'What the quad price actually buys.',
  whyLede: 'The riding area matters more than the engine, and it is what the price ladder really tracks.',
  gallery: gal('quad', quads.map(v => v.image)), gallerySubject: 'quad',
  safety: safetyBase,
  faqs: [
    { q: 'What is the cheapest quad biking price in Dubai?', a: `AED ${fromPrice(quads[0])} for a 30-minute session on the 70–90cc kids quad in the fenced area. For adults, the boundary-area quad starts at AED 89 for 30 minutes.` },
    { q: 'Is the price per person or per quad?', a: 'Per quad. The double-seat machines carry a rider and a passenger for one price, which makes them the cheapest option for two people.' },
    { q: 'Why does the open desert cost more than the boundary area?', a: 'Open-desert routes need a guide with recovery gear, a bigger machine and a longer route. The boundary area is a marked 2 km square on smaller engines, which is why it starts at AED 89.' },
    { q: 'What can a child ride, and from what age?', a: 'From age 6 on a 70–90cc quad in a fenced area away from the main dunes, at AED 75 for 30 minutes. From 12 in the boundary area, from 14 in open desert, and 18 for the Raptor 700cc.' },
    { q: 'Is hotel pickup included?', a: transfers.summary + ' ' + transfers.outsideDubai },
    { q: 'How do I pay?', a: payment.detail },
    { q: 'Can I cancel and get a refund?', a: policy.cancellation },
    { q: 'What does the safari combo include?', a: 'An evening desert safari with dune bashing and a camp dinner, plus a quad session. AED 200 with a 30-minute quad, AED 300 with a full hour.' },
    { q: 'Are there hidden charges?', a: 'No. Helmet, briefing, fuel and guide are in the price, sandboarding is free, and Dubai pickup costs nothing. Only outer-emirate transfers are extra.' }
  ],
  related: [
    { tag: 'Buggy prices', title: 'Dune Buggy Dubai Price', desc: '11 buggies from Polaris RZR to Can-Am Maverick R.', from: `From AED ${fromPrice(buggies[0])}`, href: '/dune-buggy-dubai/price/', img: buggies[0].image },
    { tag: 'Dirt bike', title: 'KTM Dirt Bike Dubai', desc: 'A 450cc desert enduro for experienced riders.', from: `From AED ${fromPrice(dirtbikes[0])}`, href: '/ktm-dirt-bike-dubai/ktm-450-dirt-bike/', img: dirtbikes[0].image },
    { tag: 'Safari prices', title: 'Desert Safari Dubai Price', desc: '12 shared and private safari packages.', from: `From AED ${safariFromPrice}`, href: '/desert-safari-dubai/price/', img: 'desert-safari-dubai-dune-bashing-land-cruiser' },
    { tag: 'All quads', title: 'Quad Biking Dubai', desc: 'The full quad fleet with routes and age limits.', from: `From AED ${fromPrice(quads[0])}`, href: '/quad-bike-dubai/', img: 'quad-bike-open-desert-group-ride-dubai' }
  ],
  guideKicker: 'Quad price guide',
  guideH2: 'How quad biking Dubai prices work, and which one to book',
  guideIntro: 'The full <strong>quad biking Dubai price</strong> list explained: why the riding area sets the price, what a child can ride and from what age, and which duration is worth paying for.',
  guideBlocks: [
    { h: 'The riding area sets the price', html: `<p class="lf-lead">Engine size follows the area, not the other way round.</p><p>The <span class="pill">fenced kids area</span> is flat, enclosed and away from the main dunes: 70–90cc machines, from age 6, AED 75 for 30 minutes. The <span class="pill">2 km boundary</span> is gentle marked sand on 150–350cc quads from age 12, starting at AED 89.</p><p>The <span class="pill">open desert</span> is the real red-dune route with a guide, on 250–450cc machines from age 14, starting at AED 200. That jump in price is the guide, the recovery gear and the terrain, not just a bigger engine.</p>` },
    { h: 'Single seat or double seat', html: `<p class="lf-lead">A double-seat quad carries a passenger at no extra cost, which changes the per-person maths.</p><p>A double-seat boundary quad at AED 150 for 30 minutes works out at AED 75 each for two riders, cheaper per head than the single seat at AED 89. If two of you are riding and only one wants to drive, the double seat is always the better deal.</p>` },
    { h: 'The Raptor 700 is a different thing', html: `<p class="lf-lead">At AED 500 for 30 minutes, the <a href="/quad-bike-dubai/yamaha-raptor-700cc/">Yamaha Raptor 700cc</a> is more than double any other quad.</p><p>It is a sport quad: light, fast and demanding, restricted to riders 18 and over with real experience. If you have never ridden a quad in sand, this is not where to start, whatever your budget.</p>` },
    { h: 'Which duration to pay for', html: `<p class="lf-lead">Quads run on five durations, more than the buggies.</p><p>Thirty minutes suits children and anyone testing whether they enjoy it. An hour is the sweet spot for most adults. Two hours and beyond are genuinely tiring on a quad, because you steer with your body far more than in a buggy, and they suit riders who already know that.</p>` },
    { h: 'What is included at every price', html: `<p class="lf-lead">Helmet, safety briefing, fuel, water and a lead guide, on the AED 75 kids slot and the AED 2,200 Raptor slot alike.</p><p>${transfers.summary} Sandboarding is free on safari packages, and the camel ride add-on is AED 100.</p><p>${payment.detail}</p>` },
    { h: 'Combining a quad with a safari', html: `<p class="lf-lead">Two combo tiers pair an evening desert safari with a quad session.</p><p>AED 200 per person includes a 30-minute quad, AED 300 includes a full hour. Both include dune bashing in a 4x4, a sunset stop, camp dinner and entertainment, so the difference is purely quad time.</p><p>${policy.cancellation}</p>` }
  ]
};

/* ─────────────── SAFARI PRICES ─────────────── */
export const safariPrices: PriceGuideData = {
  slug: '/desert-safari-dubai/price/',
  crumbParent: { label: 'Desert Safari Dubai', href: '/desert-safari-dubai-deals/' },
  title: `Desert Safari Dubai Price | From AED ${safariFromPrice} per Person | Buggy Rents`,
  description: `Desert safari Dubai price list: 12 shared and private packages from AED ${safariFromPrice} per person. Evening, VIP, overnight and private Land Cruiser safaris with dune bashing and a Bedouin BBQ camp.`,
  heroImage: 'desert-safari-dubai-hero-dune-bashing',
  eyebrow: '12 packages · shared and private · from AED 99',
  h1Lead: 'Desert Safari Dubai', h1Em: 'Price', h1Tail: 'Guide',
  lede: `Every desert safari Dubai package and price in one place, from AED ${safariFromPrice} per person for the classic evening safari to a private mini bus for twelve. Dune bashing, sunset stop, camel ride, sandboarding and a Bedouin BBQ camp dinner.`,
  chips: [`From AED ${safariFromPrice} per person`, '12 packages', 'Free Dubai pickup', 'Shared or private'],
  panel: { kicker: 'Starts from', title: `AED ${safariFromPrice}`,
    sub: 'Evening Desert Safari / per person',
    points: ['Six shared packages priced per person.', 'Six private packages priced per vehicle.', 'Dune bashing, camel ride, sandboarding and BBQ dinner in every one.'] },
  specs: [
    { label: 'Packages', value: '12 options' },
    { label: 'From', value: `AED ${safariFromPrice}` },
    { label: 'Shared', value: '6 packages' },
    { label: 'Private', value: '6 packages' },
    { label: 'Dubai pickup', value: 'Free' }
  ],
  tables: [
    { title: 'Shared desert safari packages', note: 'Priced per person unless the row says otherwise. Shared 4x4 with other guests.',
      columns: ['Price', 'Basis', 'Duration'],
      rows: sharedSafaris.map(s => ({ name: s.name, spec: `${s.vehicle} · ${s.capacity}`, cells: [s.price, null, null] }))
        .map((r, i) => ({ ...r, cells: [sharedSafaris[i].price] })) },
    { title: 'Private desert safari packages', note: 'Your own vehicle and guide, on your timing rather than a shared schedule.',
      columns: ['Price'],
      rows: privateSafaris.map(s => ({ name: s.name, spec: `${s.vehicle} · ${s.capacity} · ${s.duration} · ${s.priceLabel}`, cells: [s.price] })) },
    { title: 'Add-ons', note: 'Extras available on any safari package.',
      columns: ['Price'],
      rows: addOns.filter(a => a.price !== null).map(a => ({ name: a.name, spec: a.note, cells: [a.price as number] })) }
  ],
  included: [
    'Free hotel pickup and drop-off within Dubai in an air-conditioned 4x4.',
    'Dune bashing across the Lahbab red dunes with an experienced driver.',
    'Sunset photo stop at the best light of the day.',
    'Camel ride, sandboarding and Arabic coffee at the camp.',
    'Halal BBQ dinner with vegetarian options, plus live entertainment.'
  ],
  checkBefore: [
    'Shared packages are priced per person. Private packages are priced per vehicle.',
    'Transfers from Sharjah, Ajman, Abu Dhabi and Ras Al Khaimah are quoted separately.',
    'Dune bashing is not suitable for pregnant guests or anyone with back or neck concerns. Ask about the no-dune-bashing option.',
    `Free cancellation up to ${policy.cancellationHours} hours before your slot.`
  ],
  flow: flowBase,
  whyH2: 'What the safari price actually buys.',
  whyLede: 'Transfer, driver, camp entry, dinner and entertainment. The difference between packages is vehicle, timing and how private it is.',
  gallery: gal('safari'), gallerySubject: 'safari',
  safety: safetyBase,
  faqs: [
    { q: 'What is the cheapest desert safari price in Dubai?', a: `AED ${safariFromPrice} per person for the classic Evening Desert Safari, including free Dubai hotel pickup, dune bashing, camel ride, sandboarding and a BBQ camp dinner.` },
    { q: 'Is the safari price per person or per vehicle?', a: 'Shared safaris are per person. Private safaris are per vehicle, so a private Land Cruiser at AED 650 covers your whole group up to its capacity.' },
    { q: 'What is the difference between standard and VIP?', a: 'VIP gets a quieter section of the camp, better seating and an upgraded dinner spread. The drive and the route are the same.' },
    { q: 'Is hotel pickup included?', a: transfers.summary + ' ' + transfers.outsideDubai },
    { q: 'How do I pay?', a: payment.detail },
    { q: 'Can I do a safari without dune bashing?', a: 'Yes. Tell us when you book and the driver takes a flatter route to the camp. Everything else in the package stays the same.' },
    { q: 'Is the food halal, and are there vegetarian options?', a: 'Yes to both. The BBQ is halal and vegetarian dishes are available at every camp dinner.' },
    { q: 'Can I cancel and get a refund?', a: policy.cancellation },
    { q: 'How long does a desert safari take?', a: 'Evening safaris run 7 to 8 hours door to door. Morning safaris are 4 to 5 hours. The overnight package is 16 hours including a camp stay and sunrise.' }
  ],
  related: [
    { tag: 'Buggy prices', title: 'Dune Buggy Dubai Price', desc: '11 buggies from Polaris RZR to Can-Am Maverick R.', from: `From AED ${fromPrice(buggies[0])}`, href: '/dune-buggy-dubai/price/', img: buggies[0].image },
    { tag: 'Quad prices', title: 'Quad Biking Dubai Price', desc: 'Six quads from a fenced kids area to the Raptor 700.', from: `From AED ${fromPrice(quads[0])}`, href: '/quad-bike-dubai/price/', img: quads[0].image },
    { tag: 'Dirt bike', title: 'KTM Dirt Bike Dubai', desc: 'A 450cc desert enduro for experienced riders.', from: `From AED ${fromPrice(dirtbikes[0])}`, href: '/ktm-dirt-bike-dubai/ktm-450-dirt-bike/', img: dirtbikes[0].image },
    { tag: 'All safaris', title: 'Desert Safari Dubai', desc: 'Every shared and private safari package explained.', from: `From AED ${safariFromPrice}`, href: '/desert-safari-dubai-deals/', img: 'private-desert-safari-4x4-dubai-red-dunes' }
  ],
  guideKicker: 'Safari price guide',
  guideH2: 'Desert safari Dubai prices explained, shared against private',
  guideIntro: 'The full <strong>desert safari Dubai price</strong> list: what separates AED 99 from AED 1,300, when private is genuinely worth it, and what every package includes before you compare.',
  guideBlocks: [
    { h: 'Shared is per person, private is per vehicle', html: `<p class="lf-lead">This single difference explains most of the price gap, and it flips the maths for groups.</p><p>The classic Evening Desert Safari is <span class="pill">AED 99 per person</span>. For two people that is AED 198; for six it is AED 594. A Private Evening Desert Safari is AED 650 for the whole vehicle, so at six people the private option is barely more expensive and you get your own driver and schedule.</p><p>Below four people, shared is clearly cheaper. Above five, run both numbers before booking.</p>` },
    { h: 'What every package includes', html: `<p class="lf-lead">Free Dubai hotel pickup, dune bashing, a sunset stop, camel ride, sandboarding, a halal BBQ dinner and camp entertainment.</p><p>That baseline is the same on the AED 99 evening safari and the AED 1,300 private buggy safari. What changes is the vehicle, how private it is, and whether a quad or buggy session is bundled in.</p>` },
    { h: 'Standard against VIP', html: `<p class="lf-lead">VIP costs AED 150 against AED 99, and the drive is identical.</p><p>The upgrade is at the camp: a quieter seating section away from the main crowd, better seating, and an upgraded dinner spread. If the camp evening is the part you care about, it is worth the AED 51. If you are mainly there for the dune bashing, it is not.</p>` },
    { h: 'Adding a quad or a buggy', html: `<p class="lf-lead">Three packages bundle a ride into the safari.</p><p>Evening Safari + ATVs is AED 199 per person. Evening Safari + Dune Buggy is AED 750 for two people, which is the better deal for a couple since it is priced per pair rather than per head. Private Safari With 4-Seater Buggy is AED 1,300 for a group of four.</p><p>Compare these against booking a <a href="/dune-buggy-dubai/price/">standalone buggy slot</a> plus a safari separately. For short sessions the combo usually wins; for a proper hour in the dunes, book the buggy on its own.</p>` },
    { h: 'Morning, evening or overnight', html: `<p class="lf-lead">Evening is the default and the most popular. Morning and overnight suit different plans.</p><p>Private Morning Desert Safari at AED 650 runs 4 to 5 hours in cooler sand with quieter dunes, and gets you back for the rest of the day. The Overnight Desert Safari at AED 250 per person runs 16 hours: evening safari, dinner, a night at camp and sunrise over the red dunes.</p>` },
    { h: 'Booking, payment and cancellation', html: `<p class="lf-lead">Nothing is due when you book.</p><p>${payment.detail}</p><p>${policy.cancellation} ${policy.weather}</p>` }
  ]
};
