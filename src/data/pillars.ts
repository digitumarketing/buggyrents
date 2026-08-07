import type { PillarData } from '@/components/templates/Pillar.astro';
import { quads, buggies, categoryFromPrice } from '@/data/vehicles';

/* ---------------- QUAD BIKE — primary keyword: quad biking dubai (4,400 / KD 26) ---------------- */
export const quadPillar: PillarData = {
  slug: 'quad-bike-dubai',
  crumb: 'Quad Bike Dubai',
  title: 'Quad Biking Dubai | ATV Desert Tours from AED 75 | Buggy Rents',
  description: 'Quad biking Dubai in the Lahbab red dunes. Six ATV options from a fenced kids area to the Yamaha Raptor 700cc. Prices per quad from AED 75. WhatsApp +971 56 209 5713.',
  eyebrow: 'Guided ATV tour in Dubai',
  h1: 'Quad Biking Dubai',
  subhead: 'Guided quad bike rental in the Lahbab red dunes, from a fenced kids area to open-desert Raptor runs.',
  lede: 'Six quad bike Dubai options split by riding area rather than model, so nobody ends up on the wrong terrain. Helmets, safety briefing, fuel and a lead guide are included on every ATV session, and prices are per quad rather than per person.',
  heroImage: '2024/11/Quad-Biking-Dubai.webp',
  stats: [
    { v: `AED ${categoryFromPrice('quad')}`, l: 'From, 30 minutes' },
    { v: '6', l: 'Quad options' },
    { v: 'Age 6+', l: 'Kids area' },
    { v: '4.9 / 5', l: '41 Google reviews' }
  ],
  vehicles: quads, vehicleBase: '/quad-bike-dubai/',

  fleetKicker: '01 / Quad fleet',
  fleetH2: 'Choose your quad bike.',
  fleetLede: 'Quad bike rental Dubai sorted by riding area and seat count — kids area, marked 2 km boundary, or open red dunes — with five durations on every machine.',

  uspKicker: '02 / Why book this quad tour',
  uspH2: 'Pick the right quad before you book.',
  uspLede: 'The engine matters less than the riding area. Get that choice right and everything else follows.',
  usps: [
    { h: 'Entry ride from AED 75', p: 'The lowest public starting point is a 30-minute session on the 70–90cc kids quad in a fenced area. Adult quad biking Dubai starts at AED 89 in the boundary area.' },
    { h: 'Area before engine', p: 'A fenced kids zone from age 6, a marked 2 km boundary for first-timers from 12, and open red dunes from 14. Choose the area first, then the machine.' },
    { h: 'Single or double seat', p: 'Double-seat quads carry a passenger at no extra cost, so two people ride for one price. Single seats suit riders who want their own throttle.' },
    { h: 'Per quad, not per person', p: 'Every quad biking Dubai price on this page covers the vehicle. No fuel surcharge, no gear rental fee, no per-head add-on at the base.' }
  ],

  flowKicker: '03 / Tour flow',
  flowH2: 'From hotel pickup to red dune riding.',
  flowLede: 'A simple flow from pickup through safety briefing, guided ATV riding in the Lahbab red dunes, and return.',
  steps: [
    { label: 'Pickup', h: 'Dubai hotel pickup', p: 'Central Dubai pickup on request, or self-drive directions to the Al Awir base after confirmation.' },
    { label: 'Briefing', h: 'Gear and controls', p: 'Helmet fitting, throttle and brake walkthrough, kill switch, and the riding line for your group.' },
    { label: 'Warm-up', h: 'Flat-ground practice', p: 'The guide checks your control on flat sand before anyone moves onto bigger dune faces.' },
    { label: 'Ride', h: 'Guided desert route', p: 'A lead guide sets the pace and a sweep stays at the back so the group never splits up.' },
    { label: 'Return', h: 'Photos and drop-off', p: 'Photo stop at the best light, back to base, then transfer or self-drive return.' }
  ],

  faqKicker: '04 / Quad bike FAQ',
  faqH2: 'Answers before you book.',
  faqLede: 'Clear answers on quad biking Dubai price, age limits, safety, riding areas and booking support.',
  faqs: [
    { q: 'How much is quad biking in Dubai?', a: 'Quad biking Dubai starts at AED 75 for 30 minutes on the kids quad and AED 89 for adults in the boundary area. Open-desert single seats start at AED 200, and the Yamaha Raptor 700cc starts at AED 500. Every price is per quad.' },
    { q: 'Do I need experience to ride a quad bike?', a: 'No. The boundary area exists exactly for first-timers — a marked 2 km square on a smaller engine with a guide present. Open desert and the Raptor 700cc do expect prior riding experience.' },
    { q: 'What is the minimum age for quad biking Dubai?', a: 'Six for the fenced kids area on a 70–90cc quad, 12 for the boundary area, 14 for open desert, and 18 for the Yamaha Raptor 700cc.' },
    { q: 'Do I need a driving licence?', a: 'No licence is required on guided quad bike Dubai routes. Bring photo ID for the booking record.' },
    { q: 'Can two people share one quad?', a: 'Yes. The double-seat quads in both the boundary area and open desert carry a passenger at no extra charge — one price covers both riders.' },
    { q: 'What should I wear for quad biking?', a: 'Closed shoes, clothes you do not mind getting sandy, and sunglasses. We provide the helmet. Avoid loose scarves and anything that can catch.' },
    { q: 'Where does quad biking in Dubai take place?', a: 'At our Al Awir base on the Dubai-Hatta road, at the edge of the Lahbab red dunes — roughly 45 minutes from Downtown Dubai.' },
    { q: 'Is hotel pickup available?', a: 'Yes, on request across Dubai. Send your hotel or area and we quote the transfer with your booking rather than adding it at the base.' }
  ],

  lfKicker: '05 / Quad bike guide',
  lfHeading: 'Quad Biking Dubai: ATV routes, prices and rider levels in the Lahbab red dunes',
  lfIntro: 'Everything you need before booking <strong>quad biking Dubai</strong> — the six ATV options, what each riding area actually means, current <strong>quad bike rental Dubai</strong> prices, age limits, and how to pick the machine that matches your experience.',
  lfBlocks: [
    { h: 'What quad biking in Dubai actually involves',
      html: `<p class="lf-lead">A quad — or ATV — is a four-wheel machine you steer with your body as much as the bars. It is more physical than a <a href="/dune-buggy-dubai/">dune buggy</a> and far more direct, which is why most riders describe it as the fastest way to learn how sand behaves.</p>
<p>All <strong>quad biking Dubai</strong> sessions run from our Al Awir base at the edge of the <span class="pill">Lahbab red dunes</span>, about 45 minutes from Downtown. Every session includes a helmet, a safety briefing, fuel, water and a lead guide. <span class="trust">Guided on every route</span></p>` },
    { h: 'The three riding areas, and why they matter more than engine size',
      html: `<p class="lf-lead">We sort the fleet by area rather than model, because putting a first-timer on an open-desert Raptor is how people get hurt.</p>
<h4>Fenced kids area — from age 6</h4><p>Flat, enclosed, away from the main dunes. 70–90cc machines. From <span class="pill">AED 75</span> for 30 minutes.</p>
<h4>Boundary area — from age 12</h4><p>A marked 2 km square with gentle sand. 150–350cc single and double seats. From AED 89.</p>
<h4>Open desert — from age 14</h4><p>The real red dunes with a guide. 250–450cc, plus the Raptor 700cc for experienced riders only. From AED 200.</p>` },
    { h: 'Quad biking Dubai price: the full ladder',
      html: `<p class="lf-lead">Every <a href="/quad-bike-dubai/price/">quad biking Dubai price</a> is per quad, and double-seat machines carry a passenger free.</p>
<ul><li>Kids 70–90cc — AED 75 / 140 / 250 / 350 / 450</li><li>Single seat boundary 150–250cc — AED 89 / 150 / 300 / 400 / 500</li><li>Double seat boundary 250–350cc — AED 150 / 250 / 400 / 500 / 600</li><li>Single seat open desert 250–350cc — AED 200 / 350 / 500 / 700 / 900</li><li>Double seat open desert 350–450cc — AED 300 / 450 / 600 / 900 / 1,100</li><li>Yamaha Raptor 700cc — AED 500 / 800 / 1,200 / 1,700 / 2,200</li></ul>
<p>Durations run 30 minutes, 1, 2, 3 and 4 hours in that order.</p>` },
    { h: 'How long should you book?',
      html: `<p class="lf-lead">Thirty minutes is a taster. An hour is the sweet spot for most first-time riders.</p>
<p>Two hours and beyond suits riders who already know what they are doing, or groups pairing the ride with a camp stop. If you are travelling in from <a href="/locations/dune-buggy-from-sharjah/">Sharjah</a> or <a href="/locations/dune-buggy-from-abu-dhabi/">Abu Dhabi</a>, book at least an hour — a 30-minute session rarely justifies the drive.</p>` },
    { h: 'Quad bike or dune buggy?',
      html: `<p class="lf-lead">A quad is lighter, more physical and more direct. A <a href="/dune-buggy-dubai/">dune buggy</a> is a seated side-by-side with a roll cage, harness and steering wheel.</p>
<p>Take the quad if you want your own machine and the most contact with the terrain. Take the buggy if it is your first time off-road, if you are carrying passengers, or if you want to talk to the person beside you while driving.</p>` },
    { h: 'Best time of year for quad biking Dubai',
      html: `<p class="lf-lead">October to April is the most comfortable window, with daytime highs of 24–30°C.</p>
<p>May to September still works well, but sessions move to early morning shortly after sunrise or late afternoon once the sand has cooled. Wind matters more than heat — on a high-wind day we move your slot rather than run it.</p>` },
    { h: 'Safety, gear and what is included',
      html: `<p class="lf-lead">Helmets are mandatory and included. Briefings are not optional.</p>
<p>Guides carry recovery gear and stay with the group throughout. We do not send unaccompanied quads into the dunes, and we do not run when visibility or heat make it unsafe. See <a href="/about-us/safety-standards/">safety standards</a> for the full procedure.</p>` },
    { h: 'How to book quad biking in Dubai',
      html: `<p class="lf-lead">Message us on WhatsApp with your date, group size, ages and the riding area you want.</p>
<p>We reply with availability, the total in AED and a pickup plan — usually within a few minutes. No deposit is needed to hold a standard slot.</p>` }
  ],

  relKicker: '06 / Next choices',
  relH2: 'Add a dune buggy, KTM dirt bike or desert safari after your quad ride.',
  relLede: 'Compare the other three routes: a seated self-drive buggy, a 450cc desert enduro, or a 4x4 safari with a camp dinner.',
  related: [
    { tag: `Buggy — from AED ${categoryFromPrice('buggy')}`, title: 'Dune Buggy Dubai', desc: 'Seated side-by-side with a roll cage. The easier first step off-road.', href: '/dune-buggy-dubai/' },
    { tag: 'Enduro — from AED 500', title: 'KTM Dirt Bike Dubai', desc: 'A 450cc desert enduro for riders who can already work a clutch.', href: '/ktm-dirt-bike-dubai/' },
    { tag: 'Safari', title: 'Desert Safari Dubai', desc: 'Dune bashing in a 4x4, sunset stop and a Bedouin BBQ camp.', href: '/desert-safari-dubai-deals/' },
    { tag: 'Prices', title: 'Quad Biking Dubai Price', desc: 'Every quad, every duration, on one page with nothing hidden.', href: '/quad-bike-dubai/price/' }
  ]
};
