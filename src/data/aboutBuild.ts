/* Content for the dbr-about template: the two FAQ pages and About us.
   Rules: no trade licence number, no DTCM, no insurance claim and no mention of
   its absence (guest-owned advice only, see CLAUDE.md), no em dashes.
   Prices are per vehicle, never per person. */

import type { AboutData } from '@/components/templates/About.astro';
import { buggies, quads, dirtbikes } from '@/data/vehicles';
import { transfers, payment, policy } from '@/data/extras';
import { site } from '@/data/site';

const fromPrice = (v: typeof buggies[number]) => Math.min(...v.durations.map(d => d.price));
const catFrom = (list: typeof buggies) => Math.min(...list.map(fromPrice));

const buggyFrom = catFrom(buggies);
const quadFrom = catFrom(quads);
const ktmFrom = fromPrice(dirtbikes[0]);

/* Shared: the three contact routes. No booking portal exists, so these are the real ones. */
const askCards = [
  { tag: 'WhatsApp', value: site.phone, note: 'Fastest route. Send the date, group size and ages.', href: `https://wa.me/${site.whatsapp}` },
  { tag: 'Phone', value: 'Call the base', note: 'Open 24/7. Useful when you are already on the road.', href: `tel:${site.phoneRaw}` },
  { tag: 'Email', value: site.email, note: 'Better for corporate bookings and longer questions.', href: `mailto:${site.email}` }
];

/* --------------------------------------------------------------- buggy FAQ */
export const buggyFaq: AboutData = {
  slug: 'dune-buggy-dubai/faq',
  crumb: [{ name: 'Dune Buggy Dubai', href: '/dune-buggy-dubai/' }],
  short: 'FAQ',
  title: 'Dune Buggy Dubai FAQ | Prices, Ages, Pickup and Timings | Buggy Rents',
  description: `Answers to the questions people actually ask before booking a dune buggy in Dubai. Prices from AED ${buggyFrom} per buggy, age limits, free Dubai pickup, timings and what to wear.`,
  heroImage: 'dune-buggy-dubai-hero-red-dunes',
  finalImage: 'dune-buggy-convoy-crossing-dubai-red-dunes', heroSubject: 'buggy',
  kicker: 'Dune buggy FAQ',
  h1Lead: 'Dune buggy Dubai questions,', h1Em: 'answered properly',
  lede: `Everything people ask us on WhatsApp before booking, collected in one place. Prices are per buggy, and they start at AED ${buggyFrom} for 30 minutes.`,
  chips: [`From AED ${buggyFrom} per buggy`, 'Free Dubai pickup', 'No deposit', '11 buggies'],
  ctaPrimary: { label: 'Ask your question', message: 'Hi Buggy Rents! I have a question about dune buggy hire.' },
  ctaSecondary: { label: 'See all prices', href: '/dune-buggy-dubai/price/' },
  panel: {
    kicker: 'Quick answer',
    title: `From AED ${buggyFrom} per buggy`,
    sub: 'That is for the machine, not per person. Two people in a two seater pay half each.',
    points: [
      `${transfers.summary}`,
      'No deposit, and free cancellation up to 24 hours before',
      'Pay at the base by cash, card or bank transfer'
    ]
  },
  trust: [
    { tag: 'From', value: `AED ${buggyFrom}`, note: '30 minutes, per buggy.' },
    { tag: 'Buggies', value: '11', note: 'Polaris RZR to Can-Am Maverick R.' },
    { tag: 'Pickup', value: 'Free', note: 'Anywhere inside Dubai.' },
    { tag: 'Deposit', value: 'None', note: 'Pay at the base before you ride.' },
    { tag: 'Rating', value: '4.9', note: `From real Google reviews.` }
  ],
  introKicker: '01 / Start here',
  introH2: 'The three things that decide your price',
  introLede: 'Almost every question we get comes back to one of these. Settle them and the rest is easy.',
  introBody: [
    '<strong>Prices are per buggy, not per person.</strong> This is the single biggest source of confusion, and it works in your favour. A two seater at AED 300 for 30 minutes is AED 300 for the buggy. Two people riding together pay AED 150 each. A four seater at AED 350 split four ways is under AED 90 a head, which is why groups almost always take the bigger machine.',
    `<strong>Duration matters more than the model.</strong> We run 30 minutes, 1 hour, 2 hours and 4 hours. Thirty minutes is a genuine taste of the dunes and it suits people fitting it around other plans. An hour is the sweet spot for most first timers. Two hours and above is for people who already know they like this.`,
    `<strong>Pickup is free inside Dubai.</strong> ${transfers.summary} That is a real saving compared with quoting it separately, and it means the price you see is close to the price you pay. Outside Dubai we quote the transfer before you commit.`,
    `Everything else, model choice, seat count, time of day, is preference rather than cost. Ask us on WhatsApp and we will narrow it down in a couple of messages.`
  ],
  minis: [
    { n: '01', h: 'Per vehicle', p: 'Every price on the site is for the buggy. Split it by the number of seats to get the real cost per person.' },
    { n: '02', h: 'Four durations', p: '30 minutes, 1 hour, 2 hours and 4 hours. An hour suits most first timers.' },
    { n: '03', h: 'Free Dubai pickup', p: 'Hotel, tower or villa anywhere inside Dubai, at no extra cost.' }
  ],
  confirmKicker: '02 / Before you book',
  confirmH2: 'Four things worth confirming first.',
  confirmLede: 'These change the recommendation more than the model of buggy does.',
  confirm: [
    { tag: 'Ages', h: 'Who is riding', p: 'Drivers need to be old enough for the machine. Children can ride as passengers in a two or four seater, so a family can go out together.' },
    { tag: 'Group', h: 'How many of you', p: 'Group size decides whether two seaters or a four seater is cheaper. Tell us the number and we will do the maths.' },
    { tag: 'Timing', h: 'When you want to ride', p: 'Sunrise and late afternoon are cooler and the light is better. Midday in summer is survivable but not the ride you came for.' },
    { tag: 'Comfort', h: 'Any back or neck issues', p: 'Desert terrain is rough. Tell us before booking and we will point you at a gentler route and duration.' }
  ],
  bentoKicker: '03 / Pick your question',
  bentoH2: 'Jump straight to what you need.',
  bentoLede: 'The four topics that cover most of what people message us about.',
  bento: [
    { tag: 'Most asked', h: 'How much does a dune buggy cost in Dubai?', p: `From AED ${buggyFrom} for 30 minutes in a Polaris RZR 1000 two seater, up to AED 2299 for four hours in a four seat Turbo. All eleven buggies and every duration are on the price page.`, feature: true },
    { tag: 'Ages', h: 'Can children come along?', p: 'Yes, as passengers in a two or four seat buggy. For children who want to drive themselves, the kids quads start at age six.' },
    { tag: 'Pickup', h: 'Do you collect from my hotel?', p: 'Free anywhere inside Dubai. Outer emirates are quoted before you book so there is no surprise.' },
    { tag: 'Booking', h: 'How far ahead should I book?', p: 'A day or two is usually enough. Weekends and holidays fill faster, and sunrise slots go first.' }
  ],
  handledKicker: '04 / What is included',
  handledH2: 'What comes with the ride, and what to sort yourself',
  handledLede: 'No hidden extras. If something costs more, it is on this page.',
  handledList: [
    { h: 'Included in the price', items: [
      'Helmet, fitted and checked before you move',
      'Full briefing on the controls and the route',
      'A guide leading every ride, at every duration',
      'Fuel, water and free pickup anywhere inside Dubai',
      'Sandboarding at no extra cost if you want to try it'
    ]},
    { h: 'Worth sorting yourself', items: [
      'Closed shoes and clothes you do not mind getting dusty',
      'Sunglasses or goggles if you wear contact lenses',
      'Check that your travel insurance includes desert sports',
      'Cash, card or bank transfer for payment at the base',
      'A bag for phones and valuables while you ride'
    ]}
  ],
  reviewsKicker: 'What guests say',
  reviewsH2: 'Rated 4.9 by guests who actually rode.',
  reviewsLede: `Real Google reviews from riders, alongside our TripAdvisor Travellers' Choice award.`,
  askKicker: '05 / Still stuck',
  askH2: 'Ask the team directly',
  askLede: 'If your question is not below, message us. We answer questions from people who have not booked anything, and we do not push.',
  askCards,
  faqKicker: '06 / Full FAQ',
  faqH2: 'Dune buggy questions in full',
  faqLede: 'Everything else people ask before booking a buggy in Dubai.',
  faqs: [
    { q: 'How much is a dune buggy in Dubai?', a: `From AED ${buggyFrom} for 30 minutes in a Polaris RZR 1000 two seater. Prices are per buggy, so two people riding together pay AED 150 each. The full range runs to AED 2299 for four hours in a four seat Polaris Turbo.` },
    { q: 'Is the price per person or per buggy?', a: 'Per buggy, always. A four seater at AED 350 for 30 minutes split between four people is under AED 90 each, which is why groups usually take the larger machine.' },
    { q: 'Do I need a driving licence?', a: 'Not for our routes. Riding is on private desert terrain with a guide rather than on public roads, so a licence is not required. What matters is following the briefing.' },
    { q: 'What age can drive a buggy?', a: 'Drivers need to be old enough for the specific machine, and guides confirm ages at the base. Children of any age can ride as passengers in a two or four seat buggy, so families go out together.' },
    { q: 'How long should I book?', a: 'An hour suits most first timers. Thirty minutes is a genuine taste if you are short on time. Two and four hour sessions are for people who already know they enjoy this.' },
    { q: 'Do you pick up from hotels?', a: `Yes, and it is free anywhere inside Dubai. ${transfers.summary} Outside Dubai we quote the transfer before you commit.` },
    { q: 'When is the best time to go?', a: 'Sunrise and late afternoon. Cooler, better light for photos, and the sand is firmer. Midday in summer is possible but it is not the ride you came for.' },
    { q: 'What should I wear?', a: 'Closed shoes, and clothes you do not mind getting dusty. Sand gets everywhere. Bring sunglasses, or goggles if you wear contact lenses.' },
    { q: 'Do I pay a deposit?', a: `No deposit on standard slots. ${payment.summary} Nothing is due when you book.` },
    { q: 'Can I cancel?', a: 'Free cancellation up to 24 hours before your slot. Inside 24 hours we will always try to move you to another date rather than charge you.' },
    { q: 'Which buggy is best for beginners?', a: 'The Polaris RZR 1000 two seater. It is the most forgiving machine we run and the cheapest way in. Move up to a Turbo or a Maverick once you know what the sand feels like.' },
    { q: 'Is a four seater slower than a two seater?', a: 'Loaded with four people, noticeably yes. If outright pace matters take two seaters. If riding together matters more, take the four seater.' }
  ],
  linksKicker: '07 / Keep reading',
  linksH2: 'Where to go next',
  links: [
    { tag: 'Prices', title: 'Dune Buggy Dubai Price', desc: 'All eleven buggies and every duration on one page.', href: '/dune-buggy-dubai/price/' },
    { tag: 'Fleet', title: 'Dune Buggy Dubai', desc: 'The full buggy range with routes and seat counts.', href: '/dune-buggy-dubai/' },
    { tag: 'Quads', title: 'Quad Biking Dubai', desc: 'Handlebars instead of a wheel, from AED ' + quadFrom + '.', href: '/quad-bike-dubai/' }
  ],
  finalKicker: 'Question not answered?',
  finalH2: 'Message us and we will answer it',
  finalLede: 'You do not need to book anything to ask. Send the date and group size and we will tell you what fits.'
};

/* ---------------------------------------------------------------- quad FAQ */
export const quadFaq: AboutData = {
  slug: 'quad-bike-dubai/faq',
  crumb: [{ name: 'Quad Biking Dubai', href: '/quad-bike-dubai/' }],
  short: 'FAQ',
  title: 'Quad Biking Dubai FAQ | Prices, Age Limits and Pickup | Buggy Rents',
  description: `Answers to the questions people ask before booking quad biking in Dubai. Prices from AED ${quadFrom} per quad, kids from age 6, free Dubai pickup, timings and what to wear.`,
  heroImage: 'quad-biking-dubai-hero-red-dunes',
  finalImage: 'quad-bike-rental-dubai-rider-red-quad', heroSubject: 'quad',
  kicker: 'Quad biking FAQ',
  h1Lead: 'Quad biking Dubai questions,', h1Em: 'answered properly',
  lede: `The questions people actually ask before booking a quad. Prices are per quad and start at AED ${quadFrom}, with kids riding their own machines from age six.`,
  chips: [`From AED ${quadFrom} per quad`, 'Kids from age 6', 'Free Dubai pickup', 'Six quads'],
  ctaPrimary: { label: 'Ask your question', message: 'Hi Buggy Rents! I have a question about quad biking.' },
  ctaSecondary: { label: 'See all prices', href: '/quad-bike-dubai/price/' },
  panel: {
    kicker: 'Quick answer',
    title: `From AED ${quadFrom} per quad`,
    sub: 'Kids quads from age six in a fenced area. Adults from age twelve on the boundary routes.',
    points: [
      `${transfers.summary}`,
      'No deposit, and free cancellation up to 24 hours before',
      'Open desert routes go out into the red dunes with a guide'
    ]
  },
  trust: [
    { tag: 'From', value: `AED ${quadFrom}`, note: '30 minutes on a kids quad.' },
    { tag: 'Ages', value: '6+', note: 'Youngest riders on their own machine.' },
    { tag: 'Quads', value: '6', note: 'Kids 70cc up to the Raptor 700.' },
    { tag: 'Pickup', value: 'Free', note: 'Anywhere inside Dubai.' },
    { tag: 'Rating', value: '4.9', note: 'From real Google reviews.' }
  ],
  introKicker: '01 / Start here',
  introH2: 'Age and route decide almost everything',
  introLede: 'Unlike buggies, quads are sorted primarily by who is riding rather than by budget.',
  introBody: [
    `<strong>Age sets the machine.</strong> Kids quads at 70cc to 90cc start at age six, in a fenced riding area with a guide. Single seat boundary quads at 150cc to 250cc start at twelve. Open desert quads start at fourteen or sixteen depending on the engine, and the Yamaha Raptor 700cc is eighteen and over. Guides confirm ages at the base, so bring ID if a rider is close to a limit.`,
    `<strong>Boundary or open desert.</strong> Boundary routes are fenced and controlled, which is the right place for a first ride or a nervous rider. Open desert routes go out into the red dunes with a guide leading. That is the real thing, and it is why the minimum age is higher.`,
    `<strong>Prices are per quad.</strong> A double seat quad carries two people, so AED 150 for 30 minutes on a boundary double is AED 75 each. That is often the cheapest way for a couple or a parent and child to ride together.`,
    `Quads are more physical than buggies. You steer with your body as much as the handlebars, and an hour is real work. That is exactly why people who ride quads keep riding quads.`
  ],
  minis: [
    { n: '01', h: 'Age first', p: 'From six on kids machines, twelve on boundary singles, eighteen on the Raptor 700.' },
    { n: '02', h: 'Boundary or open', p: 'Fenced and controlled for first rides, red dunes with a guide for the real thing.' },
    { n: '03', h: 'Per quad', p: 'A double seat quad splits between two riders, which is usually the cheapest option.' }
  ],
  confirmKicker: '02 / Before you book',
  confirmH2: 'Four things worth confirming first.',
  confirmLede: 'Get these right and the machine picks itself.',
  confirm: [
    { tag: 'Ages', h: 'Everyone riding', p: 'Each quad has a minimum age set by engine size and route. Guides enforce it at the base, so send us the ages when you book.' },
    { tag: 'Route', h: 'Boundary or open desert', p: 'First time or nervous, take the boundary. Ridden before and want the dunes, take the open desert route.' },
    { tag: 'Experience', h: 'Ridden one before', p: 'It changes what we recommend. Complete beginners do better starting on a boundary route for 30 minutes.' },
    { tag: 'Fitness', h: 'Quads are hard work', p: 'More physical than a buggy. If anyone in the group is unsure, a shorter duration is the better call.' }
  ],
  bentoKicker: '03 / Pick your question',
  bentoH2: 'Jump straight to what you need.',
  bentoLede: 'The topics people message us about most.',
  bento: [
    { tag: 'Most asked', h: 'How much is quad biking in Dubai?', p: `From AED ${quadFrom} for 30 minutes on a kids quad, AED 89 on a single seat boundary quad, and up to AED 2200 for four hours on a Yamaha Raptor 700cc. Prices are per quad.`, feature: true },
    { tag: 'Kids', h: 'How young can children ride?', p: 'Six years old on the 70cc to 90cc kids quads, in a fenced riding area with a guide watching.' },
    { tag: 'Beginners', h: 'Never ridden one before?', p: 'Take a boundary route for 30 minutes. Fenced, controlled, and you learn what loose sand does with no consequence.' },
    { tag: 'Two up', h: 'Can two people share?', p: 'Yes, on the double seat quads. It is often the cheapest way for a couple or a parent and child.' }
  ],
  handledKicker: '04 / What is included',
  handledH2: 'What comes with the ride, and what to sort yourself',
  handledLede: 'The same list for every quad and every duration.',
  handledList: [
    { h: 'Included in the price', items: [
      'Helmet, fitted and checked before you move',
      'Briefing on the controls, the route and the boundary',
      'A guide on every ride, including the 30 minute slots',
      'Fuel, water and free pickup anywhere inside Dubai',
      'Sandboarding at no extra cost if you want to try it'
    ]},
    { h: 'Worth sorting yourself', items: [
      'Closed shoes and long trousers, quads throw more sand than buggies',
      'Sunglasses or goggles if you wear contact lenses',
      'Check that your travel insurance includes desert sports',
      'Cash, card or bank transfer for payment at the base',
      'ID for any rider close to an age limit'
    ]}
  ],
  reviewsKicker: 'What guests say',
  reviewsH2: 'Rated 4.9 by guests who actually rode.',
  reviewsLede: `Real Google reviews from riders, alongside our TripAdvisor Travellers' Choice award.`,
  askKicker: '05 / Still stuck',
  askH2: 'Ask the team directly',
  askLede: 'Send the ages and the group size and we will tell you exactly which quads work. No pressure to book.',
  askCards,
  faqKicker: '06 / Full FAQ',
  faqH2: 'Quad biking questions in full',
  faqLede: 'Everything else people ask before booking a quad in Dubai.',
  faqs: [
    { q: 'How much is quad biking in Dubai?', a: `From AED ${quadFrom} for 30 minutes on a kids quad and AED 89 on a single seat boundary quad. Open desert singles start at AED 200 and the Yamaha Raptor 700cc at AED 500. Prices are per quad.` },
    { q: 'What is the minimum age for quad biking?', a: 'Six on the 70cc to 90cc kids quads in a fenced area. Twelve on single seat boundary quads, fourteen on double seat boundary and single seat open desert, sixteen on double seat open desert, and eighteen on the Raptor 700cc.' },
    { q: 'Can children ride their own quad?', a: 'Yes, from age six on the kids machines, in a fenced riding area with a guide supervising. It is the reason a lot of families book with us.' },
    { q: 'What is the difference between boundary and open desert?', a: 'Boundary routes are fenced and controlled, which suits first timers. Open desert routes go out into the red dunes with a guide leading, which is why the minimum age is higher.' },
    { q: 'Is a quad harder than a buggy?', a: 'More physical, yes. You steer with body weight as much as the handlebars, and an hour is real work. A buggy is easier to be competent in quickly.' },
    { q: 'Can two people share a quad?', a: 'On the double seat machines, yes. A boundary double at AED 150 for 30 minutes works out at AED 75 each, which is usually the cheapest way to ride together.' },
    { q: 'Do you pick up from hotels?', a: `Yes, free anywhere inside Dubai. ${transfers.summary} Outside Dubai we quote the transfer before you commit.` },
    { q: 'What should I wear for quad biking?', a: 'Closed shoes and long trousers. Quads throw up more sand than buggies do, so cover your legs. Bring sunglasses, or goggles if you wear contact lenses.' },
    { q: 'Do I need a licence?', a: 'No. Riding is on private desert terrain with a guide rather than on public roads. Age and following the briefing are what matter.' },
    { q: 'Do I pay a deposit?', a: `No deposit on standard slots. ${payment.summary} Nothing is due when you book.` },
    { q: 'Can I cancel?', a: 'Free cancellation up to 24 hours before your slot. Inside 24 hours we will try to move you to another date rather than charge you.' },
    { q: 'Which quad suits a first timer?', a: 'A single seat boundary quad at AED 89 for 30 minutes. Fenced, controlled, and enough to know whether you want the open desert next time.' }
  ],
  linksKicker: '07 / Keep reading',
  linksH2: 'Where to go next',
  links: [
    { tag: 'Prices', title: 'Quad Bike Dubai Price', desc: 'Every quad and every duration on one page.', href: '/quad-bike-dubai/price/' },
    { tag: 'Fleet', title: 'Quad Biking Dubai', desc: 'Six quads with routes, ages and engine sizes.', href: '/quad-bike-dubai/' },
    { tag: 'Buggies', title: 'Dune Buggy Dubai', desc: `A wheel instead of handlebars, from AED ${buggyFrom}.`, href: '/dune-buggy-dubai/' }
  ],
  finalKicker: 'Question not answered?',
  finalH2: 'Message us and we will answer it',
  finalLede: 'Send the ages and the group size. That is enough for us to tell you exactly what works.'
};

/* ----------------------------------------------------------------- about us */
export const aboutUs: AboutData = {
  slug: 'about-us',
  crumb: [],
  short: 'About us',
  title: 'About Buggy Rents | Desert Tours in Dubai Since 2020',
  description: `Buggy Rents has taken ${site.guestsServed} guests into the Dubai desert since ${site.founded}. ${site.fleetSize} vehicles, ${site.guides} guides, rated 4.9 on Google and a TripAdvisor Travellers' Choice winner.`,
  heroImage: 'desert-adventure-dubai-hero-canam-maverick',
  finalImage: 'group-dune-buggy-tour-dubai-photo-stop', heroSubject: 'buggy',
  kicker: 'About us',
  h1Lead: `${site.guestsServed} guests into the desert`, h1Em: `since ${site.founded}`,
  lede: `We run dune buggies, quad bikes and dirt bikes out of Al Awir on the Dubai to Hatta road. ${site.fleetSize} vehicles, ${site.guides} guides, and a 4.9 rating from guests who actually rode.`,
  chips: [`${site.guestsServed} guests`, '4.9 on Google', "TripAdvisor Travellers' Choice", `Since ${site.founded}`],
  ctaPrimary: { label: 'Plan a ride with us', message: 'Hi Buggy Rents! I would like to plan a desert ride.' },
  ctaSecondary: { label: 'See the fleet', href: '/about-us/our-fleet/' },
  panel: {
    kicker: 'Why guests pick us',
    title: 'Per vehicle, not per person',
    sub: 'A four seat buggy split between four people is under AED 90 each. Most operators quote per head.',
    points: [
      `${site.guestsServed} riders since ${site.founded}, rated 4.9 on Google`,
      'Free hotel pickup anywhere inside Dubai',
      'No deposit, and free cancellation up to 24 hours before'
    ]
  },
  trust: [
    { tag: 'Guests', value: site.guestsServed, note: `Riders taken out since ${site.founded}.` },
    { tag: 'Rating', value: '4.9', note: 'From real Google reviews.' },
    { tag: 'Award', value: 'TripAdvisor', note: "Travellers' Choice winner." },
    { tag: 'Fleet', value: site.fleetSize, note: 'Buggies, quads and dirt bikes.' },
    { tag: 'Guides', value: site.guides, note: 'Nobody rides out alone.' }
  ],
  introKicker: '01 / Who we are',
  introH2: 'A desert operator, not a booking agency',
  introLede: 'We own the machines, employ the guides and run the base. That is unusual in Dubai and it changes what we can do for you.',
  introBody: [
    `Buggy Rents started in ${site.founded} and has taken ${site.guestsServed} guests into the desert since. We operate from Al Awir on the Dubai to Hatta road, with ${site.fleetSize} vehicles and ${site.guides} guides. The red dunes at Lahbab and the terrain around Al Awir are our routes, and our guides ride them daily.`,
    `<strong>We are the operator.</strong> A lot of desert tour websites in Dubai are booking agencies that pass you to whoever has a machine free. We own the buggies, quads and dirt bikes, we employ the guides, and you pay us at our base. If something goes wrong there is nobody else to point at.`,
    `<strong>We price per vehicle.</strong> This matters more than it sounds. A four seat buggy at AED 350 for 30 minutes is AED 350 for the buggy, so four people pay under AED 90 each. Operators quoting per person look cheaper until you multiply by the group.`,
    `<strong>We are open 24/7</strong> and hotel pickup anywhere inside Dubai is free. Sunrise and late afternoon are the sessions worth booking, and being open around the clock is what makes an early start possible.`
  ],
  minis: [
    { n: '01', h: 'We own the fleet', p: `${site.fleetSize} vehicles, maintained at our own base rather than hired in when someone books.` },
    { n: '02', h: 'Real guides', p: `${site.guides} guides who ride these dunes daily and set the pace for the slowest rider.` },
    { n: '03', h: 'Honest pricing', p: 'Per vehicle, no deposit, free Dubai pickup, and you pay at the base before you ride.' }
  ],
  confirmKicker: '02 / What we do',
  confirmH2: 'Four activities, one base.',
  confirmLede: 'Everything runs from Al Awir, so a group can split across machines and still ride together.',
  confirm: [
    { tag: 'Buggy', h: 'Dune buggies', p: `Eleven machines from the Polaris RZR 1000 to the Can-Am Maverick R, two and four seats, from AED ${buggyFrom}.` },
    { tag: 'Quad', h: 'Quad bikes', p: `Six quads from 70cc kids machines to the Yamaha Raptor 700cc, from AED ${quadFrom}, with riders from age six.` },
    { tag: 'KTM', h: 'Dirt bikes', p: `The KTM 450 desert enduro from AED ${ktmFrom}, for riders who already ride off road.` },
    { tag: 'Safari', h: 'Desert safari', p: 'Someone else drives. Dune bashing, camp dinner and a show, for guests who want the desert without controlling a machine.' }
  ],
  bentoKicker: '03 / What guests notice',
  bentoH2: 'The things that come up in reviews.',
  bentoLede: 'Not what we would put on a poster, but what people actually mention afterwards.',
  bento: [
    { tag: 'Most mentioned', h: 'The guides make the trip', p: 'The single most common theme in our reviews is the guide. They set the pace for the slowest rider, know which dune faces hold, and will spend the session teaching someone nervous rather than showing off.', feature: true },
    { tag: 'Pricing', h: 'No surprises at the base', p: 'The price you were quoted is the price you pay. Free Dubai pickup is genuinely free and there is no deposit to chase.' },
    { tag: 'Families', h: 'Everyone gets to ride', p: 'Kids quads from six, passengers of any age in a four seat buggy. Families rarely have to leave someone sitting out.' },
    { tag: 'Flexibility', h: 'We move things when we can', p: 'Weather, late flights, a change of plan. Message us and the first thing we try is a different slot, not a charge.' }
  ],
  handledKicker: '04 / How we operate',
  handledH2: 'What we handle, and what we ask of you',
  handledLede: 'Clear on both sides before anyone gets on a machine.',
  handledList: [
    { h: 'What we handle', items: [
      'Helmets fitted and checked before every ride',
      'A full briefing on controls, route and boundary',
      'A guide leading every ride at every duration',
      'Free hotel pickup anywhere inside Dubai',
      'Weather calls, made before you travel rather than at the base'
    ]},
    { h: 'What we ask of you', items: [
      'Tell us the ages when you book, so we pick the right machines',
      'Mention back, neck or heart issues, pregnancy or recent surgery',
      'Follow the guide once you are on the sand',
      'Check that your travel insurance includes desert sports',
      'Message us early if plans change, so we can move the slot'
    ]}
  ],
  reviewsKicker: 'What guests say',
  reviewsH2: 'Rated 4.9 by guests who actually rode.',
  reviewsLede: `Real Google reviews, alongside our TripAdvisor Travellers' Choice award.`,
  askKicker: '05 / Get in touch',
  askH2: 'Talk to the people running it',
  askLede: 'WhatsApp reaches the team that operates the base, not a call centre. Ask anything, including whether we are the right fit.',
  askCards,
  faqKicker: '06 / About us FAQ',
  faqH2: 'Questions about the operation',
  faqLede: 'The things people ask before trusting an operator with their group.',
  faqs: [
    { q: 'How long have you been running?', a: `Since ${site.founded}. We have taken ${site.guestsServed} guests into the desert in that time, and we hold a TripAdvisor Travellers' Choice award and a 4.9 rating on Google.` },
    { q: 'Are you the actual operator?', a: 'Yes. We own the vehicles, employ the guides and run the base at Al Awir. Many desert tour sites in Dubai are booking agencies that pass you on to whoever has a machine free.' },
    { q: 'Where are you based?', a: `${site.address}. It is on the Dubai to Hatta road, close to the Lahbab red dunes, which is why our routes start where they do.` },
    { q: 'What are your opening hours?', a: 'Open 24/7. In practice sunrise and late afternoon are the sessions worth booking, and being open around the clock is what makes a pre dawn start possible.' },
    { q: 'How many vehicles do you have?', a: `${site.fleetSize} across buggies, quads and dirt bikes, with ${site.guides} guides. Group bookings are usually possible at short notice.` },
    { q: 'Why are your prices per vehicle?', a: 'Because that is what you are hiring. A four seat buggy costs the same to run whether one person or four are in it. Quoting per person looks cheaper on a search results page and costs more when you multiply by the group.' },
    { q: 'Do you take a deposit?', a: `No deposit on standard slots. ${payment.summary} Nothing is due when you book, and cancellation is free up to 24 hours before.` },
    { q: 'Can you handle corporate or large groups?', a: 'Yes. Group bookings are quoted separately so we can plan vehicles and guides properly. Send the headcount and date and we will come back with options.' }
  ],
  linksKicker: '07 / Read more',
  linksH2: 'The pages people read next',
  links: [
    { tag: 'Fleet', title: 'Our Fleet', desc: 'Every machine we run and who each one suits.', href: '/about-us/our-fleet/' },
    { tag: 'Safety', title: 'Safety Standards', desc: 'Helmets, briefings, guides and weather calls.', href: '/about-us/safety-standards/' },
    { tag: 'Terms', title: 'Terms and Conditions', desc: 'Age limits, responsibility and how payment works.', href: '/about-us/terms-conditions/' }
  ],
  finalKicker: 'Come and ride',
  finalH2: 'Tell us who is coming and when',
  finalLede: 'Ages, group size and a date. That is all we need to put together the right set of machines.'
};
