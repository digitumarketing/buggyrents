import type { PillarData } from '@/components/templates/Pillar.astro';
import type { LfBlock } from '@/components/LongFormReader.astro';
import { buggies, quads, dirtbikes, fromPrice, categoryFromPrice, type Vehicle } from '@/data/vehicles';
import { sharedSafaris, privateSafaris, safariFromPrice } from '@/data/safari';
import { transfers, policy, payment, bbqCombos } from '@/data/extras';
import { pageTitle } from '@/data/seo';

type Cat = 'buggy' | 'quad' | 'dirtbike';
const NOUN = { buggy: 'dune buggy', quad: 'quad bike', dirtbike: 'dirt bike' } as const;
const BASE = { buggy: '/dune-buggy-dubai/', quad: '/quad-bike-dubai/', dirtbike: '/ktm-dirt-bike-dubai/' } as const;
const HERO = { buggy: 'dune-buggy-dubai-hero-red-dunes', quad: 'quad-biking-dubai-hero-red-dunes',
               dirtbike: 'ktm-dirt-bike-dubai-hero-sunrise-dunes' } as const;

const flowFor = (n: string) => [
  { label: 'Pickup', h: 'Free Dubai pickup', p: 'Hotel pickup within Dubai is included, or self-drive directions to the Al Awir base.' },
  { label: 'Briefing', h: 'Gear and controls', p: `Helmet fitting, controls walkthrough and the guide signals for your ${n} group.` },
  { label: 'Warm-up', h: 'Flat-ground practice', p: 'The guide checks your control on flat sand before anyone moves onto bigger dune faces.' },
  { label: 'Ride', h: 'Guided desert route', p: 'A lead guide sets the pace and a sweep stays at the back so the group never splits.' },
  { label: 'Return', h: 'Photos and drop-off', p: 'Photo stop at the best light, back to base, then transfer or self-drive return.' }
];

export function buildPillar(cat: Cat, o: {
  crumb: string; eyebrow: string; h1: string; subhead: string; lede: string;
  title: string; description: string;
  fleetKicker: string; fleetH2: string; fleetLede: string;
  uspH2: string; uspLede: string; usps: { h: string; p: string }[];
  flowH2: string; flowLede: string;
  faqH2: string; faqLede: string; faqs: { q: string; a: string }[];
  lfHeading: string; lfIntro: string; lfBlocks: LfBlock[];
  relH2: string; relLede: string;
  related: { tag: string; title: string; desc: string; href: string; img: string; alt?: string }[];
}): PillarData {
  const list = cat === 'buggy' ? buggies : cat === 'quad' ? quads : dirtbikes;
  const n = NOUN[cat];
  return {
    slug: BASE[cat].replace(/^\/|\/$/g, ''),
    crumb: o.crumb, title: o.title, description: o.description,
    eyebrow: o.eyebrow, h1: o.h1, subhead: o.subhead, lede: o.lede,
    heroImage: HERO[cat],
    stats: [],
    vehicles: list, vehicleBase: BASE[cat],
    fleetKicker: o.fleetKicker, fleetH2: o.fleetH2, fleetLede: o.fleetLede,
    uspKicker: '02 / Why book this tour', uspH2: o.uspH2, uspLede: o.uspLede, usps: o.usps,
    flowKicker: '03 / Tour flow', flowH2: o.flowH2, flowLede: o.flowLede, steps: flowFor(n),
    faqKicker: '04 / FAQ', faqH2: o.faqH2, faqLede: o.faqLede, faqs: o.faqs,
    lfKicker: '05 / Guide', lfHeading: o.lfHeading, lfIntro: o.lfIntro, lfBlocks: o.lfBlocks,
    relKicker: '06 / Next choices', relH2: o.relH2, relLede: o.relLede, related: o.related
  };
}

/* ─────────── DUNE BUGGY PILLAR ─────────── */
export const buggyPillar = buildPillar('buggy', {
  crumb: 'Dune Buggy Dubai',
  title: pageTitle(`Dune Buggy Dubai | Self-Drive Tours from AED ${fromPrice(buggies[0])}`),
  description: `Self-drive dune buggy tours in the Lahbab red dunes. Eleven buggies from AED ${fromPrice(buggies[0])} per buggy, not per person. Free Dubai pickup, helmet and guide included.`,
  eyebrow: 'Self-drive buggy tour in Dubai',
  h1: 'Dune Buggy Dubai',
  subhead: 'Self-drive dune buggy tours in the Lahbab red dunes, with Polaris and Can-Am machines for every level.',
  lede: `Choose a 30-minute, 1-hour, 2-hour or 4-hour guided buggy route with helmet, briefing, fuel and a lead guide included. Prices are per buggy rather than per person, so a 2-seater at AED ${fromPrice(buggies[0])} covers both of you.`,
  fleetKicker: '01 / Buggy fleet', fleetH2: 'Choose your dune buggy.',
  fleetLede: 'Eleven self-drive buggies sorted by seats and power. Polaris if it is your first time, Can-Am if it is not, Maverick R if you already know exactly what you are asking for.',
  uspH2: 'Pick the right buggy before you book.',
  uspLede: 'Seats and power decide the price. Service, gear and guide support are identical on every slot.',
  usps: [
    { h: `Entry ride from AED ${fromPrice(buggies[0])}`, p: `The lowest public starting point is a 30-minute Polaris RZR 1000 2-seater. Because pricing is per buggy, that is AED ${Math.round(fromPrice(buggies[0])/2)} each for two riders.` },
    { h: 'Polaris or Can-Am', p: 'Polaris RZR is the stable, forgiving first-time choice. Can-Am Maverick X3 and Turbo RR add serious power and suspension travel for experienced drivers.' },
    { h: '2 or 4 seats', p: 'A 4-seater carries four people for one price, which makes it the cheapest way to get a family or group into the dunes.' },
    { h: 'Everything included', p: 'Helmet, safety briefing, harness check, fuel, water and a lead guide. Free hotel pickup within Dubai. No fuel surcharge or gear fee.' }
  ],
  flowH2: 'From hotel pickup to red dune riding.',
  flowLede: 'A simple flow from pickup through safety briefing, guided driving in the Lahbab red dunes, and return.',
  faqH2: 'Answers before you book.',
  faqLede: 'Clear answers on dune buggy Dubai price, who can drive, what is included and how pickup works.',
  faqs: [
    { q: 'How much is a dune buggy in Dubai?', a: `Dune buggy Dubai starts at AED ${fromPrice(buggies[0])} for 30 minutes in a Polaris RZR 1000 2-seater. The Can-Am Maverick X3 starts at AED 600 and the Maverick R at AED 900. Every price is per buggy, not per person.` },
    { q: 'Do I need off-road experience?', a: 'No. The Polaris RZR is forgiving and the briefing plus warm-up on flat sand covers everything. Tell us when you book if it is your first time and the guide holds the pace back.' },
    { q: 'Do I need a driving licence?', a: 'No licence is required on guided routes. Drivers must be 14 or over. Bring photo ID for the booking record.' },
    { q: 'Can children ride?', a: 'Children can sit as passengers in a 4-seater buggy driven by an adult. For children who want to drive, the fenced kids quad area takes riders from age 6.' },
    { q: 'What is the difference between a 2-seater and a 4-seater?', a: 'Seats and price. A 4-seater carries four people for one price, so it is usually cheaper per head. The chassis and route are the same.' },
    { q: 'Is hotel pickup free?', a: transfers.summary + ' ' + transfers.outsideDubai },
    { q: 'How and when do I pay?', a: payment.detail },
    { q: 'Can I cancel or reschedule?', a: policy.cancellation }
  ],
  lfHeading: 'Dune Buggy Dubai: self-drive routes, prices and vehicle choice in the Lahbab red dunes',
  lfIntro: 'Everything you need before booking <strong>dune buggy Dubai</strong>: the eleven-machine fleet, what separates a Polaris from a Can-Am, current <strong>dune buggy rental Dubai</strong> prices, and how the guided red-dune route actually runs.',
  lfBlocks: [
    { h: 'What a dune buggy ride involves', html: `<p class="lf-lead">A dune buggy here is a side-by-side you drive yourself, not a passenger ride.</p><p>You get the wheel, the pedals and a briefing, and a guide rides with the group to set the route and read the sand ahead. Every vehicle has a full roll cage, four-point harnesses and helmets included.</p><p>All sessions run from our Al Awir base at the edge of the <span class="pill">Lahbab red dunes</span>, roughly 45 minutes from Downtown Dubai.</p>` },
    { h: 'Polaris, Can-Am or Maverick R', html: `<p class="lf-lead">Three tiers, and the difference is power rather than service.</p><p>The <a href="/dune-buggy-dubai/polaris-rzr-1000-2-seater/">Polaris RZR 1000</a> from AED 300 is the balanced starting point. The <a href="/dune-buggy-dubai/can-am-maverick-x3-2-seater/">Can-Am Maverick X3</a> from AED 600 is a serious step up. The <a href="/dune-buggy-dubai/can-am-maverick-r-turbo/">Maverick R</a> from AED 900 is the fastest thing we run, and it is not a beginner machine.</p><p>Turbo and Turbo RR variants sit between them for drivers who want more without going to the top of the range.</p>` },
    { h: 'Per buggy, never per person', html: `<p class="lf-lead">This changes the maths more than most people expect.</p><p>A 2-seater at AED 300 for 30 minutes is AED 300 total, so AED 150 each. A <a href="/dune-buggy-dubai/polaris-rzr-1000-4-seater/">4-seater at AED 350</a> works out under AED 90 per person for four. Compare that with per-head safari pricing and the buggy is consistently cheaper for groups.</p><p>See the <a href="/dune-buggy-dubai/price/">full price guide</a> for every buggy and duration side by side.</p>` },
    { h: 'Which duration to book', html: `<p class="lf-lead">Thirty minutes is a taster. An hour is where most first-timers should land.</p><p>The briefing and warm-up eat into a short slot, so on a 30-minute booking you are properly riding for about 20 minutes. Two hours and four hours suit experienced drivers, or groups pairing the ride with a camp stop.</p>` },
    { h: 'Safety and what is included', html: `<p class="lf-lead">Helmets are mandatory and included. The briefing is not optional.</p><p>Harnesses are checked before every departure, guides carry recovery gear and stay with the group, and we do not run when wind or heat make the route unsafe. ${policy.weather}</p><p>Included in every price: the buggy, helmet, briefing, fuel, water and a lead guide, plus free hotel pickup within Dubai.</p>` },
    { h: 'Booking, payment and cancellation', html: `<p class="lf-lead">Message us on WhatsApp with your date, group size and which buggy you want.</p><p>${payment.detail}</p><p>${policy.cancellation} ${policy.deposit}</p>` }
  ],
  relH2: 'Add a quad, KTM dirt bike or desert safari to your buggy day.',
  relLede: 'Same base, same guides. What changes is how much control you want and how hard you want to work for it.',
  related: [
    { tag: `Quad from AED ${categoryFromPrice('quad')}`, title: 'Quad Biking Dubai', desc: 'Handlebars instead of a wheel. More physical, more direct.', href: '/quad-bike-dubai/', img: 'quad-biking-dubai-open-desert-three-riders' },
    { tag: `Enduro from AED ${fromPrice(dirtbikes[0])}`, title: 'KTM Dirt Bike Dubai', desc: 'A 450cc desert enduro for riders who can work a clutch.', href: '/ktm-dirt-bike-dubai/', img: 'ktm-dirt-bike-fleet-lined-up-dubai-desert' },
    { tag: `Safari from AED ${safariFromPrice}`, title: 'Desert Safari Dubai', desc: 'Someone else drives. Dune bashing, camp dinner and a show.', href: '/desert-safari-dubai-deals/', img: 'desert-safari-dubai-dune-bashing-land-cruiser' },
    { tag: 'Prices', title: 'Dune Buggy Dubai Price', desc: 'All eleven buggies and every duration on one page.', href: '/dune-buggy-dubai/price/', img: 'dune-buggy-convoy-crossing-dubai-red-dunes' }
  ]
});

/* ─────────── KTM DIRT BIKE PILLAR ─────────── */
export const ktmPillar = buildPillar('dirtbike', {
  crumb: 'KTM Dirt Bike Dubai',
  title: `KTM Dirt Bike Dubai | 450cc Enduro from AED ${fromPrice(dirtbikes[0])}`,
  description: `KTM dirt bike Dubai: a 450cc desert enduro in the Lahbab red dunes from AED ${fromPrice(dirtbikes[0])}. Rider screening applies. Helmet, briefing and guide included.`,
  eyebrow: 'Guided desert enduro in Dubai',
  h1: 'KTM Dirt Bike Dubai',
  subhead: 'A 450cc desert enduro in the Lahbab red dunes, for riders who can already work a clutch, gears and throttle.',
  lede: `The hardest thing we run and the most rewarding once it clicks. Sessions from 30 minutes to four hours with helmet, briefing, fuel and a lead guide included. Rider screening applies before we hand a bike over.`,
  fleetKicker: '01 / The bike', fleetH2: 'The KTM 450 desert enduro.',
  fleetLede: 'One machine, five durations. A 450 in soft sand is unforgiving, which is why we screen riders rather than take the booking blind.',
  uspH2: 'Is the KTM 450 right for you?',
  uspLede: 'This is the one activity where the honest answer is sometimes no. Read this before booking.',
  usps: [
    { h: 'You need real experience', p: 'Clutch, gears and throttle control on loose surfaces. If you have only ridden on tarmac, sand will surprise you within the first minute.' },
    { h: 'Age 14 and over', p: 'The dirt bike is released from 14, and the guide still screens every rider before handing one over. Anyone not ready for a clutch and gears is moved to a quad or a buggy for the same slot.' },
    { h: 'Start on a quad if unsure', p: 'A quad teaches you how sand behaves with far less consequence. Plenty of riders do a quad session first and come back for the KTM.' },
    { h: 'Everything else included', p: 'Helmet, safety briefing, fuel, water and a lead guide who stays with you. Free hotel pickup within Dubai.' }
  ],
  flowH2: 'From pickup to the red dune trails.',
  flowLede: 'Pickup, screening, briefing, then a guided route matched to how you actually ride.',
  faqH2: 'Answers before you book.',
  faqLede: 'Experience requirements, price, safety and what happens if the guide says no.',
  faqs: [
    { q: 'How much is a KTM dirt bike in Dubai?', a: `KTM 450 dirt bike sessions run AED ${dirtbikes[0].durations.map(d => `${d.price.toLocaleString('en-US')} for ${d.label}`).join(', AED ')}.` },
    { q: 'Do I need dirt bike experience?', a: 'Yes. You need to be comfortable with clutch, gears and throttle before we hand over a 450. If you are not, the quad fleet is the better starting point and nobody will think less of you for it.' },
    { q: 'What is the minimum age?', a: 'Fourteen. Age is the starting point rather than the whole test: the guide watches how you handle the clutch and place the bike on flat sand before the route opens up, and a rider who is not ready moves to a quad or a buggy for the same slot.' },
    { q: 'What if the guide says I am not ready?', a: 'It happens, and it is not a problem. We move you to a quad or a buggy for the same slot and adjust the price. Better a good ride on the right machine than a bad one on the wrong machine.' },
    { q: 'Is a licence required?', a: 'No licence is required on guided desert routes. Bring photo ID for the booking record.' },
    { q: 'What should I wear?', a: 'Closed boots or trainers that cover the ankle, long trousers, and clothes you do not mind getting sandy. We provide the helmet. Bring gloves if you have them.' },
    { q: 'Is hotel pickup free?', a: transfers.summary + ' ' + transfers.outsideDubai },
    { q: 'How and when do I pay?', a: payment.detail }
  ],
  lfHeading: 'KTM Dirt Bike Dubai: desert enduro routes, rider requirements and prices',
  lfIntro: 'Everything worth knowing before booking a <strong>KTM dirt bike in Dubai</strong>: what riding a 450 in soft sand actually demands, the screening we do, current prices, and when a quad is the better choice.',
  lfBlocks: [
    { h: 'Why sand is different', html: `<p class="lf-lead">A 450 that feels planted on a trail behaves nothing like it on a dune face.</p><p>Soft sand swallows the front wheel, momentum becomes the thing keeping you upright, and the throttle does most of the steering. Riders with road experience often find the first ten minutes genuinely humbling.</p><p>That is why we screen before handing a bike over, and why the warm-up happens on flat ground where mistakes cost nothing.</p>` },
    { h: 'The screening, and why we do it', html: `<p class="lf-lead">A short conversation and a warm-up lap, not a test.</p><p>The guide watches how you handle the clutch and how you place the bike on flat sand. If it looks fine, the route opens up. If it does not, we move you to a <a href="/quad-bike-dubai/">quad</a> or a <a href="/dune-buggy-dubai/">buggy</a> for the same slot and adjust the price.</p><p>Nobody is sent into the dunes on a machine they cannot control.</p>` },
    { h: 'Prices and durations', html: `<p class="lf-lead">Five durations, priced per bike.</p><p>${dirtbikes[0].durations.map(d => `<span class="pill">${d.label} AED ${d.price.toLocaleString('en-US')}</span>`).join(' ')}</p><p>An hour is the sweet spot for most riders. Beyond two hours a 450 in sand is genuinely tiring, and that suits riders who already know what that feels like.</p>` },
    { h: 'When a quad is the better booking', html: `<p class="lf-lead">If you have never ridden off-road, start on a quad.</p><p>Four wheels remove the balance problem entirely, so you learn how sand behaves without also managing a bike that wants to fall over. The <a href="/quad-bike-dubai/yamaha-raptor-700cc/">Yamaha Raptor 700</a> is fast enough to be interesting for experienced riders.</p><p>Plenty of guests do a quad session on one trip and the KTM on the next.</p>` },
    { h: 'Safety, gear and conditions', html: `<p class="lf-lead">Helmet included and mandatory. Long trousers and ankle-covering shoes strongly recommended.</p><p>Guides carry recovery gear and stay with you throughout. ${policy.weather}</p><p>Free hotel pickup within Dubai. ${transfers.outsideDubai}</p>` },
    { h: 'Booking and payment', html: `<p class="lf-lead">Message us with your date, riding experience and the duration you want.</p><p>Being honest about experience helps: it decides whether we prep a KTM or suggest something else, and it saves everyone time on the day.</p><p>${payment.detail} ${policy.cancellation}</p>` }
  ],
  relH2: 'Compare the other ways to ride the same dunes.',
  relLede: 'Same base, same guides, very different levels of difficulty.',
  related: [
    { tag: `Quad from AED ${categoryFromPrice('quad')}`, title: 'Quad Biking Dubai', desc: 'Four wheels, no balance problem. The right first step.', href: '/quad-bike-dubai/', img: 'quad-bike-group-tour-dubai-open-desert' },
    { tag: `Buggy from AED ${categoryFromPrice('buggy')}`, title: 'Dune Buggy Dubai', desc: 'Roll cage, harness and a passenger seat. The easiest of the three.', href: '/dune-buggy-dubai/', img: 'dune-buggy-sunset-ride-lahbab-red-dunes-dubai' },
    { tag: `Safari from AED ${safariFromPrice}`, title: 'Desert Safari Dubai', desc: 'Someone else drives. Dune bashing and a Bedouin camp dinner.', href: '/desert-safari-dubai-deals/', img: 'private-desert-safari-4x4-dubai-red-dunes' },
    { tag: 'Prices', title: 'Quad Biking Dubai Price', desc: 'Six quads and every duration on one page.', href: '/quad-bike-dubai/price/', img: 'quad-biking-dubai-ladies-group-desert-tour' }
  ]
});
