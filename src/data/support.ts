/* Content for the dbr-support template.
   Rules that apply to every page in this file:
   - No trade licence number, and no placeholder that looks like one.
   - Never claim insurance cover, and never state its absence either. The approved
     framing is guest-owned advice: "check that your travel insurance includes desert
     sports". Keep one line of that on Terms; it protects the client. See CLAUDE.md.
   - No DTCM.
   - Hotel pickup inside Dubai is free. Outer emirates are quoted.
   - Payment is on the spot at the base: cash, card or bank transfer.
   - No em dashes anywhere in copy. */

import type { SupportData } from '@/components/templates/Support.astro';
import { policy, payment, transfers } from '@/data/extras';
import { site } from '@/data/site';

const ABOUT = { name: 'About us', href: '/about-us/' };
const KTM = { name: 'KTM Dirt Bike Dubai', href: '/ktm-dirt-bike-dubai/' };

/* Shared trailer used by every policy page. Keeps the related grid honest
   and gives each page three real internal links. */
const policyLinks = [
  { tag: 'Safety', title: 'Safety Standards', desc: 'Helmets, briefing, guide ratios and how we call off a ride.', href: '/about-us/safety-standards/' },
  { tag: 'Refunds', title: 'Refund Policy', desc: 'Cancellations, weather calls and how money comes back.', href: '/about-us/refund-policy/' },
  { tag: 'Terms', title: 'Terms and Conditions', desc: 'The rules you agree to when you ride with us.', href: '/about-us/terms-conditions/' }
];

const commonSteps = [
  { h: 'Tell us the date and group', p: 'Send your date, how many are riding, and the ages. Age decides which machines are even an option.' },
  { h: 'Pick the machine and duration', p: 'We quote per vehicle, not per person, so a two seater split between two people halves the cost.' },
  { h: 'Confirm pickup', p: `${transfers.summary} Outside Dubai we quote the transfer before you commit.` },
  { h: 'Pay at the base', p: 'Nothing is due when you book. Settle at Al Awir before you ride, by cash, card or bank transfer.' }
];

/* ------------------------------------------------------------------ privacy */
export const privacyPolicy: SupportData = {
  slug: 'about-us/privacy-policy',
  crumb: [ABOUT],
  short: 'Privacy Policy',
  title: 'Privacy Policy | Buggy Rents Dubai',
  description: 'What Buggy Rents does with the details you send when you book a dune buggy, quad bike or dirt bike in Dubai, and how to ask us to delete them.',
  heroImage: 'dune-buggy-dubai-hero-red-dunes',
  finalImage: 'polaris-rzr-1000-2-seater-dune-buggy-dubai', heroSubject: 'buggy',
  kicker: 'Privacy policy',
  h1Lead: 'What we do with', h1Em: 'the details you send us',
  lede: 'Most of our bookings arrive on WhatsApp. This page explains what that means for your information, in plain language rather than legal boilerplate.',
  chips: ['Booking data only', 'No selling of data', 'Deletion on request', 'Updated August 2026'],
  ctaPrimary: { label: 'Ask a privacy question', message: 'Hi Buggy Rents! I have a question about how you handle my details.' },
  ctaSecondary: { label: 'Read the terms', href: '/about-us/terms-conditions/' },
  panel: {
    kicker: 'The short version',
    title: 'We keep what a booking needs',
    sub: 'Name, number, date, group size and pickup point. That is the whole list for a standard booking.',
    points: [
      'We do not sell or rent your details to anyone',
      'We do not run ad tracking pixels on this site',
      `Ask us to delete your details and we will, at ${site.email}`
    ]
  },
  trust: [
    { tag: 'Held', value: 'Booking only', note: 'Name, phone, date, group size, pickup point.' },
    { tag: 'Sold', value: 'Never', note: 'Your details are not passed to third parties.' },
    { tag: 'Channel', value: 'WhatsApp', note: 'Most bookings run through WhatsApp on your phone.' },
    { tag: 'Delete', value: 'On ask', note: 'Email us and we remove what we hold.' },
    { tag: 'Payment', value: 'At base', note: 'We take no card details when you book.' }
  ],
  introKicker: '01 / The basics',
  introH2: 'What we collect, and why each thing is needed',
  introLede: 'Every item below exists because a booking cannot run without it. There is nothing collected for marketing.',
  introBody: [
    'When you message us we end up holding your name, your phone number, the date you want, how many people are riding and where we are collecting you from. Ages come up too, because age decides which machines a guest can legally ride. A ten year old cannot ride a 450cc dirt bike, so we have to ask.',
    'Because most people book on WhatsApp, that conversation sits in WhatsApp on your phone and on ours. WhatsApp is owned by Meta and its own privacy terms apply to the message itself. We treat what is inside the message as booking information and nothing more.',
    `We do not take card numbers when you book. ${payment.detail} That means there is no stored payment data on our side at all.`,
    `If you want the details we hold removed, email <a href="mailto:${site.email}">${site.email}</a> and say so. We will confirm once it is done.`
  ],
  cardsKicker: '02 / What we hold',
  cardsH2: 'Three categories, and nothing beyond them.',
  cardsLede: 'If a piece of information does not fall into one of these, we have no reason to be holding it.',
  cards: [
    { tag: 'Contact', h: 'How to reach you', p: 'Your name and phone number, so a guide can call you on the day if the pickup point is hard to find.' },
    { tag: 'Booking', h: 'What you booked', p: 'Date, time slot, machine, duration, group size and ages. This is what the base works from.' },
    { tag: 'Pickup', h: 'Where to collect you', p: 'Hotel, tower, villa or landmark. Needed to plan the driver route and the timing.' }
  ],
  checksKicker: '03 / Worth knowing',
  checksH2: 'The parts people usually ask about.',
  checksLede: 'These are the honest answers, including where our control ends.',
  checks: [
    { tag: 'WhatsApp', h: 'The message is on Meta', p: 'Your booking chat lives in WhatsApp. Meta terms cover the message itself. We only control what we do with the content.' },
    { tag: 'Photos', h: 'We ask before posting', p: 'Guides take photos on tour. If we want to use one publicly we ask you first. Say no and that is the end of it.' },
    { tag: 'Analytics', h: 'Visitor counts only', p: 'We may count page visits to see which pages help. That is aggregate traffic data, not a profile of you.' },
    { tag: 'Retention', h: 'We are not archivists', p: 'Old booking messages get cleared out over time. Nothing is kept because it might be useful one day.' }
  ],
  stepsKicker: '04 / Booking path',
  stepsH2: 'How a booking actually runs',
  stepsLede: 'Four steps, and you can see exactly what information each one needs.',
  steps: commonSteps,
  faqKicker: '05 / Questions',
  faqH2: 'Privacy questions we actually get',
  faqLede: 'If yours is not here, message us and ask. We will answer it straight.',
  faqs: [
    { q: 'Do you sell my phone number to anyone?', a: 'No. Your number is used to run your booking and to reach you on the day. It is not passed to other operators, marketing lists or data brokers.' },
    { q: 'Can you delete my details after my ride?', a: `Yes. Email ${site.email} and ask, and we will remove what we hold and confirm once it is done. You do not have to give a reason.` },
    { q: 'Do you store my card details?', a: 'No. There is nothing to pay when you book. You pay at the Al Awir base before riding, by cash, card or bank transfer, so no card data is stored on our side.' },
    { q: 'Will you put my photo on the website?', a: 'Not without asking. Guides take photos during tours, and if we want to use one publicly we ask you first. Declining changes nothing about your booking.' },
    { q: 'Who can see my booking information?', a: 'The people running your booking: the person answering WhatsApp, the driver collecting you, and the guide taking you out. Nobody outside the operation.' },
    { q: 'Does this site track me across other websites?', a: 'No. There are no advertising or retargeting pixels on this site. We may count page visits in aggregate to see which pages are useful.' }
  ],
  linksKicker: '06 / Related',
  linksH2: 'Other pages worth reading before you book',
  links: policyLinks,
  finalKicker: 'Ask us anything',
  finalH2: 'Still have a question about your details?',
  finalLede: 'Message the team and ask. You do not need to book anything to get an answer.'
};

/* ------------------------------------------------------------------- refund */
export const refundPolicy: SupportData = {
  slug: 'about-us/refund-policy',
  crumb: [ABOUT],
  short: 'Refund Policy',
  title: 'Refund and Cancellation Policy | Buggy Rents Dubai',
  description: 'Free cancellation up to 24 hours before your slot, no deposit on standard bookings, and a full refund if we call off a ride for weather. The Buggy Rents refund policy in plain language.',
  heroImage: 'quad-biking-dubai-hero-red-dunes',
  finalImage: 'yamaha-raptor-700cc-quad-bike-lahbab-red-dunes', heroSubject: 'quad',
  kicker: 'Refund policy',
  h1Lead: 'Free cancellation up to', h1Em: '24 hours before',
  lede: 'No deposit on a standard slot, so there is usually nothing to refund in the first place. Here is exactly how cancellations, weather calls and no shows work.',
  chips: ['24 hour free cancellation', 'No deposit taken', 'Weather refunded in full', 'Pay at the base'],
  ctaPrimary: { label: 'Change my booking', message: 'Hi Buggy Rents! I need to change or cancel a booking.' },
  ctaSecondary: { label: 'See the terms', href: '/about-us/terms-conditions/' },
  panel: {
    kicker: 'The short version',
    title: 'Nothing is due upfront',
    sub: 'You pay at the base before you ride. Cancel more than 24 hours out and there is nothing to reclaim.',
    points: [
      'Full refund if we call the ride off for weather',
      'Inside 24 hours we try to move you before we charge',
      'Multi vehicle and corporate bookings are confirmed separately'
    ]
  },
  trust: [
    { tag: 'Free', value: '24 hrs', note: 'Cancel more than a day ahead at no cost.' },
    { tag: 'Deposit', value: 'None', note: 'Standard slots are held without payment.' },
    { tag: 'Weather', value: 'Full', note: 'We call it off, you get everything back.' },
    { tag: 'Pay', value: 'At base', note: 'Cash, card or bank transfer before riding.' },
    { tag: 'Move', value: 'Free', note: 'Rescheduling costs nothing when we can do it.' }
  ],
  introKicker: '01 / How it works',
  introH2: 'Why most cancellations cost nothing at all',
  introLede: 'The policy is simple because the payment model is simple. No money moves until you are standing at the base.',
  introBody: [
    `${policy.deposit} Because of that, cancelling a standard booking usually involves no money at all. You tell us, we release the slot, and that is the end of it.`,
    policy.cancellation,
    policy.weather,
    'The one case where we do ask for something is a no show with no message. If a driver has left for your hotel and a guide is holding machines that nobody else could book, that slot is genuinely gone. Even then, message us. If there is a real reason we would rather move you than charge you.'
  ],
  cardsKicker: '02 / Three situations',
  cardsH2: 'What happens in each case.',
  cardsLede: 'Almost every cancellation falls into one of these three.',
  cards: [
    { tag: 'More than 24 hrs', h: 'Cancel free', p: 'Message us any time up to 24 hours before your slot. Nothing is charged and nothing needs refunding, because nothing was paid.' },
    { tag: 'Inside 24 hrs', h: 'We try to move you', p: 'Late changes happen. Our first move is to find you another date rather than charge you. Tell us as early as you can.' },
    { tag: 'Weather call', h: 'Full refund', p: 'If wind, heat or visibility make the route unsafe, we contact you before you travel. Reschedule at no cost, or take everything back.' }
  ],
  checksKicker: '03 / Before you book',
  checksH2: 'Details that affect what you pay.',
  checksLede: 'Worth checking now rather than discovering at the base.',
  checks: [
    { tag: 'Per vehicle', h: 'Prices are per machine', p: 'A two seater at AED 300 is AED 300 for the buggy, not per person. Two people riding together halves it each.' },
    { tag: 'Pickup', h: 'Dubai transfers are free', p: `${transfers.summary} Outside Dubai we quote the transfer before you commit, so there is no surprise.` },
    { tag: 'Groups', h: 'Larger bookings differ', p: 'Multi vehicle and corporate bookings are confirmed separately and may carry their own terms. We tell you upfront.' },
    { tag: 'Payment', h: 'Three ways to pay', p: `${payment.summary} Nothing is taken at booking time.` }
  ],
  stepsKicker: '04 / Changing a booking',
  stepsH2: 'How to cancel or move a slot',
  stepsLede: 'One message does it. There is no form and no account to log into.',
  steps: [
    { h: 'Message the same WhatsApp thread', p: 'Reply on the chat you booked in so we can find the slot straight away.' },
    { h: 'Say cancel or move', p: 'If you want a different date, give us two options and we will check what is open.' },
    { h: 'We confirm in writing', p: 'You get a message back confirming the slot is released or moved. Keep it.' },
    { h: 'Nothing to reclaim', p: 'Because no deposit was taken, a standard cancellation involves no refund process at all.' }
  ],
  faqKicker: '05 / Questions',
  faqH2: 'Refund questions we actually get',
  faqLede: 'Straight answers, including the cases where you would not get money back.',
  faqs: [
    { q: 'How late can I cancel for free?', a: 'Up to 24 hours before your slot. Because no deposit is taken on a standard booking, there is normally nothing to refund anyway. Just message us so we can release the machine.' },
    { q: 'What if the weather is bad on the day?', a: 'We make that call, not you. If wind, heat or visibility make the route unsafe we contact you before you travel and reschedule at no cost. If no other date works, you get a full refund.' },
    { q: 'Do I lose anything if I cancel two hours before?', a: 'Message us and find out rather than assuming. Our first move is to offer you another date. We only treat it as a lost slot if nobody tells us anything and a driver has already left.' },
    { q: 'Is a deposit needed to hold a slot?', a: 'No, not on standard bookings. Multi vehicle and corporate bookings are confirmed separately and we explain any conditions upfront.' },
    { q: 'Can I get a refund if I change my mind at the base?', a: 'If you have not paid and not ridden, you simply do not pay. If you decide the machine is not for you after the briefing, talk to the guide. We would rather move you to something easier than take money for a ride you did not enjoy.' },
    { q: 'What if only part of my group turns up?', a: 'Tell us as soon as you know. We charge for the machines that go out, so dropping a vehicle before the day costs nothing.' }
  ],
  linksKicker: '06 / Related',
  linksH2: 'Other pages worth reading before you book',
  links: [
    { tag: 'Terms', title: 'Terms and Conditions', desc: 'The rules you agree to when you ride with us.', href: '/about-us/terms-conditions/' },
    { tag: 'Safety', title: 'Safety Standards', desc: 'Helmets, briefing, guide ratios and how we call off a ride.', href: '/about-us/safety-standards/' },
    { tag: 'Privacy', title: 'Privacy Policy', desc: 'What we do with the details you send when booking.', href: '/about-us/privacy-policy/' }
  ],
  finalKicker: 'Need to change something?',
  finalH2: 'Message us and we will sort the slot',
  finalLede: 'Earlier is always better. Even inside 24 hours, tell us and we will try to move you.'
};

/* -------------------------------------------------------------------- terms */
export const termsConditions: SupportData = {
  slug: 'about-us/terms-conditions',
  crumb: [ABOUT],
  short: 'Terms and Conditions',
  title: 'Terms and Conditions | Buggy Rents Dubai',
  description: 'The terms you agree to when you ride a dune buggy, quad bike or dirt bike with Buggy Rents in Dubai. Age limits, rider responsibility, damage, payment and cancellation.',
  heroImage: 'dune-buggy-dubai-hero-red-dunes',
  finalImage: 'can-am-maverick-x3-rs-2-seater-dune-buggy-dubai', heroSubject: 'buggy',
  kicker: 'Terms and conditions',
  h1Lead: 'What you agree to when', h1Em: 'you ride with us',
  lede: 'Short, readable, and written so you can actually check it before you book rather than after something goes wrong.',
  chips: ['Age limits are firm', 'Rider responsibility', 'Damage explained', 'Updated August 2026'],
  ctaPrimary: { label: 'Ask about the terms', message: 'Hi Buggy Rents! I have a question about your terms and conditions.' },
  ctaSecondary: { label: 'See the refund policy', href: '/about-us/refund-policy/' },
  panel: {
    kicker: 'The good news first',
    title: 'No deposit, free cancellation',
    sub: 'Book the slot, pay at the base, and cancel free up to 24 hours before. Nothing is locked in when you message us.',
    points: [
      'Free hotel pickup anywhere inside Dubai',
      'Every price is per vehicle, so groups split the cost',
      'Kids ride from age 6 on their own machines'
    ]
  },
  trust: [
    { tag: 'Ages', value: '6 to 18', note: 'Something for every age in the group.' },
    { tag: 'Deposit', value: 'None', note: 'Nothing to pay until you reach the base.' },
    { tag: 'Damage', value: 'At cost', note: 'Charged only where guide instructions were ignored.' },
    { tag: 'Pay', value: 'At base', note: 'Cash, card or bank transfer before riding.' },
    { tag: 'Cancel', value: '24 hrs', note: 'Free cancellation more than a day ahead.' }
  ],
  introKicker: '01 / The agreement',
  introH2: 'What booking a ride actually commits you to',
  introLede: 'Booking means you accept the points on this page. There is nothing hidden further down.',
  introBody: [
    'Booking a slot with Buggy Rents means you accept these terms for everyone in your group. If you are booking for other people, it is on you to pass on the age limits and the medical points before they arrive at the base.',
    '<strong>Age limits are firm.</strong> Every machine has a minimum age set by engine size and how the route runs. Kids quads start at six. The Yamaha Raptor 700cc is eighteen and over. Guides check at the base, and a rider under the limit does not ride. Bring ID if anyone is close to the line, because we would rather check than guess.',
    '<strong>Riding is at your own risk.</strong> Desert riding is an adventure sport and it carries real risk of injury, which you accept when you get on a machine. Before you travel, check that your travel insurance includes desert sports and off road activities. Many standard policies exclude them, and it takes two minutes to confirm.',
    '<strong>Follow the guide.</strong> Every ride goes out with a guide and a briefing. The route, the speed and the boundary are set by the guide on the day and can change with conditions. Ignoring instructions is the one thing that turns a normal ride into an incident, and it is also the situation where damage gets charged.'
  ],
  cardsKicker: '02 / Your responsibilities',
  cardsH2: 'Three things that are on the rider.',
  cardsLede: 'Everything else is on us. These three are not.',
  cards: [
    { tag: 'Honesty', h: 'Declare medical limits', p: 'Pregnancy, back, neck or heart conditions and recent surgery all change what you should ride. Tell us before you book, not at the base.' },
    { tag: 'Conduct', h: 'Ride within the briefing', p: 'Stay inside the route and boundary the guide sets. Alcohol and riding do not mix, and a guide can end a ride on the spot.' },
    { tag: 'Care', h: 'Look after the machine', p: 'Normal wear is ours. Damage from ignoring the guide, riding out of bounds or deliberate misuse is charged at repair cost.' }
  ],
  checksKicker: '03 / Money and timing',
  checksH2: 'The commercial terms in full.',
  checksLede: 'All of it is on this page. Nothing appears for the first time at the base.',
  checks: [
    { tag: 'Pricing', h: 'Per vehicle, always', p: 'Every price on this site is for the machine, not per person. A four seater split between four people is the cheapest way to ride.' },
    { tag: 'Payment', h: 'On the spot', p: `${payment.summary} Nothing is due at booking time.` },
    { tag: 'Transfers', h: 'Free inside Dubai', p: `${transfers.summary} Outer emirates are quoted before you commit.` },
    { tag: 'Timing', h: 'Slots can move', p: 'Heat, wind and visibility can shift a slot. We contact you before you travel rather than leaving you waiting.' }
  ],
  stepsKicker: '04 / On the day',
  stepsH2: 'What happens between arriving and riding',
  stepsLede: 'The order is the same for every guest, on every machine.',
  steps: [
    { h: 'Arrive and check in', p: 'Ages are confirmed and any medical points you told us about are checked with the guide.' },
    { h: 'Briefing and gear', p: 'Helmet fitted, controls explained, route and boundary set. Ask questions here rather than out on the sand.' },
    { h: 'Pay before you ride', p: 'Settle at the base by cash, card or bank transfer. You see the machine before any money moves.' },
    { h: 'Ride with the guide', p: 'The guide sets the pace and can change the route or end the ride if conditions or behaviour require it.' }
  ],
  faqKicker: '05 / Questions',
  faqH2: 'Terms questions we actually get',
  faqLede: 'Including the ones people are reluctant to ask.',
  faqs: [
    { q: 'Do I need my own travel insurance?', a: 'We recommend it. Desert riding is an adventure sport and riding is at your own risk, so check that your travel insurance includes desert sports and off road activities before you travel. Many standard policies exclude them.' },
    { q: 'What happens if I damage a buggy?', a: 'Normal wear and tear is ours to deal with. Damage that comes from ignoring the guide, riding outside the boundary or deliberate misuse is charged at repair cost, and we show you the cost.' },
    { q: 'Can you make an exception on the age limit?', a: 'No. Age limits are set by engine size and route, and guides enforce them at the base. If a rider is under the limit for one machine we will move them to one that fits rather than turn them away.' },
    { q: 'Can I ride if I have a bad back?', a: 'Tell us before you book. Desert terrain is genuinely rough, and back, neck and heart conditions, pregnancy and recent surgery all change the recommendation. Often we can suggest a gentler option, but we need to know first.' },
    { q: 'Is a licence needed to ride?', a: 'Not for buggies and quads on our routes, since riding is on private desert terrain with a guide rather than on public roads. The KTM 450 needs real off road ability, and the guide assesses that at the base.' },
    { q: 'What if the guide stops my ride?', a: 'A guide can end a ride for unsafe behaviour, alcohol, or conditions turning. It is rare. If it happens because conditions turned, we sort out a reschedule or a refund.' }
  ],
  linksKicker: '06 / Related',
  linksH2: 'Other pages worth reading before you book',
  links: [
    { tag: 'Safety', title: 'Safety Standards', desc: 'Helmets, briefing, guide ratios and how we call off a ride.', href: '/about-us/safety-standards/' },
    { tag: 'Refunds', title: 'Refund Policy', desc: 'Cancellations, weather calls and how money comes back.', href: '/about-us/refund-policy/' },
    { tag: 'Privacy', title: 'Privacy Policy', desc: 'What we do with the details you send when booking.', href: '/about-us/privacy-policy/' }
  ],
  finalKicker: 'Unclear on anything?',
  finalH2: 'Ask before you book, not after',
  finalLede: 'If a term here affects whether a ride works for you, message us and we will give you a straight answer.'
};

/* ----------------------------------------------------------------- safety */
export const safetyStandards: SupportData = {
  slug: 'about-us/safety-standards',
  crumb: [ABOUT],
  short: 'Safety Standards',
  title: 'Safety Standards | Buggy Rents Dubai',
  description: 'Helmets on every ride, a briefing before you move, guides on every route and honest limits on who rides what. How Buggy Rents runs safety in the Dubai desert.',
  heroImage: 'quad-biking-dubai-hero-red-dunes',
  finalImage: 'quad-biking-dubai-open-desert-three-riders', heroSubject: 'quad',
  kicker: 'Safety standards',
  h1Lead: 'Guides, helmets and', h1Em: 'honest limits',
  lede: `${site.guestsServed} guests since ${site.founded}, a 4.9 rating from real Google reviews and a TripAdvisor Travellers' Choice award. Here is the way we run a ride that gets those results.`,
  chips: ['Helmet on every ride', 'Guide on every route', 'Briefing before you move', 'Ages 6 and up'],
  ctaPrimary: { label: 'Ask a safety question', message: 'Hi Buggy Rents! I have a safety question before booking.' },
  ctaSecondary: { label: 'See the fleet', href: '/about-us/our-fleet/' },
  panel: {
    kicker: 'Why guests trust us',
    title: `${site.guestsServed} riders since ${site.founded}`,
    sub: `Rated 4.9 on Google and a TripAdvisor Travellers' Choice winner. Beginners are the majority of our guests, not the exception.`,
    points: [
      'Helmets fitted and checked before every single ride',
      `${site.guides} guides, and nobody rides out alone`,
      'Kids ride from age 6 in their own fenced area'
    ]
  },
  trust: [
    { tag: 'Guests', value: site.guestsServed, note: `Riders taken out since ${site.founded}.` },
    { tag: 'Rating', value: '4.9', note: 'From real Google reviews, not stock quotes.' },
    { tag: 'Award', value: 'TripAdvisor', note: "Travellers' Choice winner." },
    { tag: 'Guides', value: site.guides, note: 'Nobody rides out on their own.' },
    { tag: 'Helmet', value: 'Always', note: 'Fitted and checked before you move.' }
  ],
  introKicker: '01 / The approach',
  introH2: 'What actually keeps a desert ride safe',
  introLede: 'Equipment matters. Judgement matters more, and that is the part that sits with the guide.',
  introBody: [
    'A helmet is the easy part. Every guest gets one, fitted and checked before the machine moves, on every ride including the 30 minute slots. That is not optional and it is not a paid extra.',
    'The part that actually prevents incidents is the briefing and the guide. Before anyone rides, the controls get explained, the route gets set and the boundary gets marked. On the sand, the guide sets the pace for the slowest rider in the group, not the fastest. That is deliberate, and occasionally it annoys the confident one in the group.',
    'Guides can also change the plan. Heat, wind and visibility shift through the day in the desert, and a route that worked at eight in the morning may not work at two in the afternoon. If conditions turn, the guide shortens the route, changes the area, or calls it off. That call is theirs and it is not up for negotiation.',
    `<strong>Before you travel,</strong> check that your travel insurance includes desert sports and off road activities. Many standard travel policies quietly exclude them, and it takes two minutes to confirm. It is the single most useful thing you can do before any adventure booking in Dubai, with us or anyone else.`
  ],
  cardsKicker: '02 / On every ride',
  cardsH2: 'Three things that never vary.',
  cardsLede: 'Duration, machine and group size make no difference to any of these.',
  cards: [
    { tag: 'Gear', h: 'Helmet fitted and checked', p: 'Every rider, every ride, including 30 minute slots. A guide checks the fit rather than handing it over and hoping.' },
    { tag: 'Briefing', h: 'Controls before you move', p: 'Throttle, brake, steering and the boundary, explained on the machine you are about to ride. Ask questions here.' },
    { tag: 'Guide', h: 'Nobody rides alone', p: 'A guide leads every route and rides at the pace of the slowest person in the group. That is the point of them.' }
  ],
  checksKicker: '03 / Tell us first',
  checksH2: 'Conditions that change our recommendation.',
  checksLede: 'None of these mean you cannot ride. They mean we point you at the right machine.',
  checks: [
    { tag: 'Back', h: 'Back and neck', p: 'Desert terrain is genuinely rough. Existing back or neck problems usually point towards a buggy over a quad, or a shorter duration.' },
    { tag: 'Heart', h: 'Heart conditions', p: 'Heat plus adrenaline is a real combination. Tell us and we will suggest a cooler slot and a calmer route.' },
    { tag: 'Pregnancy', h: 'Pregnancy', p: 'We do not recommend buggies, quads or dirt bikes during pregnancy. A desert safari with a driver is the better option.' },
    { tag: 'Surgery', h: 'Recent surgery', p: 'If you are still recovering, wait. The impacts on open desert routes are heavier than people expect.' }
  ],
  stepsKicker: '04 / At the base',
  stepsH2: 'The safety sequence before every ride',
  stepsLede: 'Same order for every guest, every time.',
  steps: [
    { h: 'Age and fit check', p: 'Guides confirm ages against the machine and check anything medical you told us about.' },
    { h: 'Helmet fitted', p: 'Sized and checked by a guide. A loose helmet is worse than no briefing.' },
    { h: 'Controls and boundary', p: 'Explained on the actual machine, with the route and the limits made clear before you move.' },
    { h: 'Guide leads out', p: 'Pace set for the slowest rider. Conditions can change the route at any point and the guide makes that call.' }
  ],
  faqKicker: '05 / Questions',
  faqH2: 'Safety questions we actually get',
  faqLede: 'Including the ones with answers people do not want to hear.',
  faqs: [
    { q: 'Should I check my travel insurance?', a: 'Yes, we recommend it for any adventure activity in Dubai. Check that your policy includes desert sports and off road activities before you travel, because many standard travel policies exclude them.' },
    { q: 'Is a helmet included or an extra?', a: 'Included, always, on every ride and every duration. A guide fits and checks it before you move.' },
    { q: 'Can beginners ride safely?', a: 'Yes, and most of our guests are beginners. The briefing assumes no experience, and the guide sets the pace for the slowest rider. Start with a boundary quad or a two seater buggy rather than a Raptor or the KTM.' },
    { q: 'What happens if the weather turns?', a: 'We make the call, not you. If wind, heat or visibility make a route unsafe we contact you before you travel and reschedule at no cost, or refund you in full.' },
    { q: 'Can children ride?', a: 'From age six on kids quads, in a fenced area with a guide. Older children move up by engine size and age. Guides enforce the limits at the base rather than at booking, so bring ID if a rider is close to the line.' },
    { q: 'Can a guide stop my ride?', a: 'Yes. For unsafe riding, alcohol, or conditions turning. It is rare, but the guide has the final say and that is what makes the system work.' }
  ],
  linksKicker: '06 / Related',
  linksH2: 'Other pages worth reading before you book',
  links: [
    { tag: 'Terms', title: 'Terms and Conditions', desc: 'Age limits, rider responsibility and damage.', href: '/about-us/terms-conditions/' },
    { tag: 'Fleet', title: 'Our Fleet', desc: 'Every machine we run, and who each one suits.', href: '/about-us/our-fleet/' },
    { tag: 'Refunds', title: 'Refund Policy', desc: 'Weather calls, cancellations and how money comes back.', href: '/about-us/refund-policy/' }
  ],
  finalKicker: 'Not sure what suits you?',
  finalH2: 'Tell us the concern and we will point you right',
  finalLede: 'A medical detail or a nervous rider changes the recommendation. Better said now than at the base.'
};

/* ------------------------------------------------------------------- fleet */
export const ourFleet: SupportData = {
  slug: 'about-us/our-fleet',
  crumb: [ABOUT],
  short: 'Our Fleet',
  title: 'Our Fleet | Dune Buggies, Quads and Dirt Bikes in Dubai | Buggy Rents',
  description: 'Eleven dune buggies from Polaris RZR to Can-Am Maverick R, six quad bikes from kids 70cc to the Yamaha Raptor 700, and the KTM 450 enduro. What each machine suits, and who should avoid it.',
  heroImage: 'desert-adventure-dubai-hero-canam-maverick',
  finalImage: 'polaris-rzr-4-seater-dune-buggy-parked-dubai-base', heroSubject: 'buggy',
  kicker: 'Our fleet',
  h1Lead: 'Every machine we run, and', h1Em: 'who each one suits',
  lede: `${site.fleetSize} vehicles across buggies, quads and dirt bikes. The useful question is not which is fastest, it is which one fits the person riding it.`,
  chips: ['11 dune buggies', '6 quad bikes', 'KTM 450 enduro', 'Ages 6 and up'],
  ctaPrimary: { label: 'Which machine suits me?', message: 'Hi Buggy Rents! Can you help me pick the right machine?' },
  ctaSecondary: { label: 'See buggy prices', href: '/dune-buggy-dubai/price/' },
  panel: {
    kicker: 'Start here',
    title: 'Price is per vehicle',
    sub: 'Not per person. A four seater split between four people is the cheapest way for a group to ride.',
    points: [
      'Two seat buggies from AED 300 for 30 minutes',
      'Quads from AED 75, kids from age 6',
      'The KTM 450 needs real off road experience'
    ]
  },
  trust: [
    { tag: 'Fleet', value: site.fleetSize, note: 'Vehicles across all three categories.' },
    { tag: 'Buggies', value: '11', note: 'Polaris RZR through to Can-Am Maverick R.' },
    { tag: 'Quads', value: '6', note: 'Kids 70cc up to the Yamaha Raptor 700.' },
    { tag: 'Enduro', value: 'KTM 450', note: 'One machine, for experienced riders only.' },
    { tag: 'Guides', value: site.guides, note: 'Guides across the operation.' }
  ],
  introKicker: '01 / How to choose',
  introH2: 'Three categories, and the honest difference between them',
  introLede: 'Most people arrive asking which is fastest. The better question is how much you want to be doing yourself.',
  introBody: [
    '<strong>Buggies</strong> have a wheel, a seat and a roll cage, which makes them the easiest thing to be competent in quickly. If you can drive a car you can drive a buggy. They are also the only option where a group rides together in one machine, so a nervous passenger can come along without having to control anything.',
    '<strong>Quads</strong> have handlebars, and you steer by shifting your weight as much as by turning. That makes them more physical and more direct. People who ride quads tend to prefer them for exactly that reason. They start at age six on the kids machines in a fenced area, which is why families end up here.',
    '<strong>The KTM 450</strong> is a different proposition entirely. It is a desert enduro, it needs clutch control and real off road ability, and it is not something to learn on. We screen riders at the base, and if you are not ready we move you to a quad or a buggy for the same slot and adjust the price. That is not a sales tactic, it is what keeps people out of hospital.',
    'Within each category the differences are engine size, seat count and where you are allowed to ride. Boundary routes are fenced and controlled. Open desert routes go out into the red dunes with a guide, and carry a higher minimum age for that reason.'
  ],
  cardsKicker: '02 / The three categories',
  cardsH2: 'What each one actually feels like.',
  cardsLede: 'Pick by how much work you want to do, not by top speed.',
  cards: [
    { tag: 'Buggy', h: 'Easiest to be good at', p: 'Wheel, pedals, roll cage and a seatbelt. Two and four seat options mean a group can ride together, and a nervous passenger does not have to drive.' },
    { tag: 'Quad', h: 'More physical, more direct', p: 'Handlebars and body weight. Harder work across a full hour, and the reason quad riders stay quad riders. Kids machines start at age six.' },
    { tag: 'Dirt bike', h: 'For riders who already ride', p: 'The KTM 450 is a real desert enduro. Clutch control and off road experience are required, and guides assess that at the base.' }
  ],
  checksKicker: '03 / Choosing well',
  checksH2: 'Details that decide which machine fits.',
  checksLede: 'These four settle it faster than any spec sheet.',
  checks: [
    { tag: 'Age', h: 'Age sets the options', p: 'Kids quads from 6, boundary singles from 12, open desert from 14 or 16, and the Raptor 700 from 18. Guides check at the base.' },
    { tag: 'Group', h: 'Group size changes the maths', p: 'Prices are per vehicle. Four people in a four seater pay a quarter each, which usually beats four separate quads.' },
    { tag: 'Route', h: 'Boundary or open desert', p: 'Boundary areas are fenced and controlled, better for first timers. Open desert goes out into the red dunes with a guide.' },
    { tag: 'Comfort', h: 'Back, neck and heart', p: 'Desert terrain is rough. Existing back or neck problems usually point towards a buggy and a shorter duration.' }
  ],
  stepsKicker: '04 / Booking path',
  stepsH2: 'How to get to the right machine',
  stepsLede: 'Tell us the group and we will narrow it down before you pay anything.',
  steps: commonSteps,
  faqKicker: '05 / Questions',
  faqH2: 'Fleet questions we actually get',
  faqLede: 'The practical ones, answered without the sales pitch.',
  faqs: [
    { q: 'Which buggy should a first timer take?', a: 'A Polaris RZR 1000 two seater. It is the most forgiving machine we run and the cheapest way into a buggy at AED 300 for 30 minutes. Move up to a Turbo or a Maverick once you know what the sand feels like.' },
    { q: 'Is a buggy or a quad better?', a: 'Neither is better, they are different. A buggy is easier to be competent in quickly and lets a group ride together. A quad is more physical and more direct. If you are unsure, a buggy is the safer first choice.' },
    { q: 'Can my child ride?', a: 'From age six on the kids quads, 70cc to 90cc, in a fenced riding area with a guide. Older children move up by age and engine size. Children can also ride as passengers in a two or four seat buggy.' },
    { q: 'What if I book the KTM and cannot handle it?', a: 'It happens and it is not a problem. The guide moves you to a quad or a buggy for the same slot and we adjust the price. Nobody is sent out on a 450 they cannot control.' },
    { q: 'Is a four seater slower than a two seater?', a: 'Loaded with four people, yes, noticeably. If outright pace matters, take two seaters. If riding together matters more, take the four seater.' },
    { q: 'How many vehicles do you have?', a: `${site.fleetSize} across the operation, so group bookings are usually possible at short notice. Tell us the group size and date and we will confirm what is available.` }
  ],
  linksKicker: '06 / Related',
  linksH2: 'Where to go next',
  links: [
    { tag: 'Buggies', title: 'Dune Buggy Dubai', desc: 'All eleven buggies with prices and durations.', href: '/dune-buggy-dubai/' },
    { tag: 'Quads', title: 'Quad Biking Dubai', desc: 'Six quads from kids 70cc to the Raptor 700.', href: '/quad-bike-dubai/' },
    { tag: 'Safety', title: 'Safety Standards', desc: 'Helmets, briefing, guides and honest limits.', href: '/about-us/safety-standards/' }
  ],
  finalKicker: 'Not sure which one?',
  finalH2: 'Tell us who is riding and we will pick for you',
  finalLede: 'Ages, group size and whether anyone has ridden before. That is enough for a straight recommendation.'
};

/* ------------------------------------------------- KTM: beginners, advanced */
export const dirtBikeBeginners: SupportData = {
  slug: 'ktm-dirt-bike-dubai/dirt-bike-for-beginners',
  crumb: [KTM],
  short: 'Dirt Bike for Beginners',
  title: 'Dirt Bike for Beginners in Dubai | Read This First | Buggy Rents',
  description: 'Honest guidance on whether a beginner should ride a dirt bike in Dubai. The KTM 450 is not a learner machine. What to ride instead, and how to build up to it.',
  heroImage: 'ktm-dirt-bike-dubai-hero-sunrise-dunes',
  finalImage: 'ktm-dirt-bike-riders-red-dune-crest-dubai', heroSubject: 'dirtbike',
  kicker: 'Dirt bike for beginners',
  h1Lead: 'Read this before you book', h1Em: 'a dirt bike in Dubai',
  lede: 'We would rather talk you out of the wrong machine than take your money and watch it go badly. Here is the honest position on beginners and the KTM 450.',
  chips: ['KTM 450 only', 'Clutch control needed', 'Quad first if unsure', 'Free switch at the base'],
  ctaPrimary: { label: 'Am I ready for it?', message: 'Hi Buggy Rents! I have never ridden a dirt bike. What do you recommend?' },
  ctaSecondary: { label: 'Start on a quad instead', href: '/quad-bike-dubai/' },
  panel: {
    kicker: 'The honest answer',
    title: 'The 450 is not a learner bike',
    sub: 'It is a desert enduro with a clutch and real power. If you have never ridden off road, start elsewhere.',
    points: [
      'No experience at all means a quad is the right call',
      'Guides assess riders at the base, not at booking',
      'Not ready is not a problem. We switch you and adjust the price'
    ]
  },
  trust: [
    { tag: 'Bike', value: 'KTM 450', note: 'One machine. No beginner tier exists.' },
    { tag: 'Skill', value: 'Clutch', note: 'You need to work a clutch on loose sand.' },
    { tag: 'Age', value: '18+', note: 'Minimum age for the enduro.' },
    { tag: 'Switch', value: 'Free', note: 'Move to a quad or buggy at the base.' },
    { tag: 'Start', value: 'AED 500', note: '30 minutes on the KTM 450.' }
  ],
  introKicker: '01 / Straight answer',
  introH2: 'Should a complete beginner book a dirt bike in Dubai?',
  introLede: 'Usually no, and we will say so before you pay rather than after.',
  introBody: [
    'We run one dirt bike, the KTM 450, and there is no beginner version of it. It is a desert enduro built for people who already ride. It has a clutch, real power and a seat height that catches people out the moment a foot goes down in soft sand.',
    'If you have never ridden a motorcycle off road, this is not where to start. Soft sand punishes hesitation in a way that tarmac does not, and the failure mode is not a gentle stop. Most people who insist on starting here spend the session picking the bike up rather than riding it.',
    '<strong>What to do instead:</strong> take a quad. Same desert, same guides, same red dunes, and you spend the hour riding rather than recovering. The single seat open desert quad at AED 200 for 30 minutes gets you into the same terrain the dirt bike rides. If you enjoy it and want the next step, come back for the KTM.',
    'If you have ridden off road before and just have not ridden in sand, that is a different conversation. Sand is its own skill but it builds fast on existing ability. Tell the guide what you have ridden and they will judge it at the base.'
  ],
  cardsKicker: '02 / Where you actually stand',
  cardsH2: 'Three honest categories.',
  cardsLede: 'Find yourself here before you book anything.',
  cards: [
    { tag: 'Never ridden', h: 'Take a quad', p: 'No motorcycle experience at all means the 450 will not go well. A quad gives you the same desert and the same guide, and you will actually enjoy it.' },
    { tag: 'Road rider', h: 'Talk to the guide', p: 'Road experience helps with the clutch but sand behaves differently. Come with realistic expectations and let the guide assess you at the base.' },
    { tag: 'Off road rider', h: 'You are fine', p: 'If you have ridden trails or motocross, the 450 in sand is a step you can take. Sand is a new skill but it builds on what you already have.' }
  ],
  checksKicker: '03 / What catches people out',
  checksH2: 'The parts nobody warns beginners about.',
  checksLede: 'None of this is meant to put you off. It is meant to make the choice informed.',
  checks: [
    { tag: 'Sand', h: 'It moves under you', p: 'Sand does not grip like dirt or tarmac. Momentum keeps you upright, and hesitating is what puts people down.' },
    { tag: 'Weight', h: 'Picking it up is the work', p: 'A dropped 450 in soft sand is genuinely heavy. Beginners spend more energy lifting the bike than riding it.' },
    { tag: 'Heat', h: 'Effort plus temperature', p: 'Riding a dirt bike badly is exhausting, and Dubai heat compounds it. A 30 minute session is plenty for a first attempt.' },
    { tag: 'Clutch', h: 'No automatic option', p: 'The 450 needs clutch control. If you have never used a clutch, this is not the place to learn one.' }
  ],
  stepsKicker: '04 / How to build up',
  stepsH2: 'The route from never ridden to the KTM',
  stepsLede: 'Most people who end up loving the dirt bike started somewhere else.',
  steps: [
    { h: 'Start on a boundary quad', p: 'Fenced, controlled, and you learn what loose sand does to steering without any consequence.' },
    { h: 'Move to open desert', p: 'The single seat open desert quad rides the same red dunes the dirt bike does, with a guide setting the pace.' },
    { h: 'Talk to a guide', p: 'Tell them you want to try the KTM. They will tell you honestly whether you are close, based on what they saw.' },
    { h: 'Book 30 minutes first', p: 'AED 500 for a short session is the sensible first attempt. Extend it later once you know how it feels.' }
  ],
  faqKicker: '05 / Questions',
  faqH2: 'Beginner questions we actually get',
  faqLede: 'Answered the way we would answer a friend.',
  faqs: [
    { q: 'Can I ride a dirt bike with zero experience?', a: 'We would advise against it, and the guide may decline at the base. The KTM 450 is a desert enduro with a clutch, not a learner machine. A quad gets you into the same desert and you will enjoy it far more.' },
    { q: 'Do you offer dirt bike lessons?', a: 'We do not run a formal beginner course. Guides give a full briefing and set the pace, but that is not the same as teaching someone to ride a motorcycle from scratch.' },
    { q: 'What happens if I book it and cannot handle it?', a: 'The guide moves you to a quad or a buggy for the same slot and we adjust the price. There is no penalty and no argument. It is a normal outcome and we plan for it.' },
    { q: 'Is a quad really that different?', a: 'Yes. A quad has four wheels and stays upright on its own, so a mistake means slowing down rather than falling. It is the reason we send beginners there first.' },
    { q: 'How old do I need to be?', a: 'Eighteen for the KTM 450. Quads start much younger, from age six on the kids machines and twelve on the boundary singles.' },
    { q: 'Is a motorcycle licence needed?', a: 'Not for our routes, since riding is on private desert terrain with a guide rather than on public roads. What matters is actual ability, and the guide assesses that at the base.' }
  ],
  linksKicker: '06 / Related',
  linksH2: 'Where to go next',
  links: [
    { tag: 'Quads', title: 'Quad Biking Dubai', desc: 'The right starting point for most first timers.', href: '/quad-bike-dubai/' },
    { tag: 'Advanced', title: 'Dirt Bike for Advanced Riders', desc: 'If you already ride, start here instead.', href: '/ktm-dirt-bike-dubai/dirt-bike-for-advanced/' },
    { tag: 'KTM', title: 'KTM Dirt Bike Dubai', desc: 'The bike, the routes and the prices.', href: '/ktm-dirt-bike-dubai/' }
  ],
  finalKicker: 'Not sure where you sit?',
  finalH2: 'Tell us what you have ridden before',
  finalLede: 'Two lines about your experience is enough for us to point you at the right machine.'
};

export const dirtBikeAdvanced: SupportData = {
  slug: 'ktm-dirt-bike-dubai/dirt-bike-for-advanced',
  crumb: [KTM],
  short: 'Dirt Bike for Advanced Riders',
  title: 'Dirt Bike for Advanced Riders in Dubai | KTM 450 Enduro | Buggy Rents',
  description: 'KTM 450 desert enduro sessions in Dubai for riders who already ride. Open red dune terrain, up to four hours, from AED 500. What the terrain demands and how the sessions run.',
  heroImage: 'ktm-dirt-bike-dubai-hero-sunrise-dunes',
  finalImage: 'ktm-450-enduro-rider-sand-spray-dubai', heroSubject: 'dirtbike',
  kicker: 'Dirt bike for advanced riders',
  h1Lead: 'KTM 450 enduro on', h1Em: 'open red dune terrain',
  lede: 'If you already ride off road, this is the page that matters. Real dune terrain, sessions up to four hours, and guides who will let you actually ride.',
  chips: ['KTM 450 enduro', 'Open red dunes', 'Up to 4 hours', 'From AED 500'],
  ctaPrimary: { label: 'Book a session', message: 'Hi Buggy Rents! I ride off road and want to book the KTM 450. What durations are open?' },
  ctaSecondary: { label: 'See KTM prices', href: '/ktm-dirt-bike-dubai/' },
  panel: {
    kicker: 'For riders who ride',
    title: 'Real dune terrain, not a track',
    sub: 'Lahbab and the Al Awir red dunes. Soft sand, real gradients and enough space to open it up.',
    points: [
      '30 minutes AED 500, up to 4 hours AED 2000',
      'Guides set the pace to the group, so ride with peers',
      'Sunrise and late afternoon are the sessions worth booking'
    ]
  },
  trust: [
    { tag: 'Bike', value: 'KTM 450', note: 'Desert enduro, maintained in house.' },
    { tag: 'Terrain', value: 'Red dunes', note: 'Open desert, not a fenced circuit.' },
    { tag: 'Max', value: '4 hours', note: 'Longest session we run on the enduro.' },
    { tag: 'From', value: 'AED 500', note: '30 minutes, per bike.' },
    { tag: 'Age', value: '18+', note: 'Minimum age for the KTM 450.' }
  ],
  introKicker: '01 / The terrain',
  introH2: 'What Dubai dune riding actually demands',
  introLede: 'If your off road experience is trails and hardpack, sand will still surprise you. Here is how.',
  introBody: [
    'The Al Awir and Lahbab dunes are soft sand with real gradient. That combination rewards momentum and punishes anything tentative. Riders coming from trails or hardpack motocross usually have the bike control already and spend the first twenty minutes recalibrating throttle and body position for a surface that moves.',
    'Gradient is the part people underestimate. A dune face that looks moderate from the bottom is steeper than it appears, and the crest is often sharper than expected. Guides know which faces hold and which collapse, and that local knowledge is most of what you are paying for out here.',
    'Session length matters more than on a quad. Thirty minutes on a 450 in soft sand is a real workout. Two hours is a serious session, and four hours is for riders who genuinely ride regularly. Start shorter than your ego suggests, especially in summer.',
    '<strong>Timing:</strong> sunrise and late afternoon are the sessions worth booking. The sand is firmer, the light is better and the heat is manageable. Midday in summer is survivable but it is not the ride you came for.'
  ],
  cardsKicker: '02 / Session lengths',
  cardsH2: 'Pick by fitness, not by ambition.',
  cardsLede: 'Sand riding is far more physical than the equivalent time on a trail.',
  cards: [
    { tag: '30 to 60 min', h: 'Recalibration', p: 'Enough to adjust to sand if you already ride. AED 500 for 30 minutes, AED 700 for the hour. A sensible first booking.' },
    { tag: '2 hours', h: 'A real session', p: 'AED 1200. Long enough to cover proper ground and ride varied dune faces rather than one area.' },
    { tag: '3 to 4 hours', h: 'For regular riders', p: 'AED 1500 and AED 2000. Only worth booking if you ride often. Sand fatigue is real and it arrives faster than expected.' }
  ],
  checksKicker: '03 / Worth knowing',
  checksH2: 'Practical points before you book.',
  checksLede: 'The things experienced riders actually ask us.',
  checks: [
    { tag: 'Gear', h: 'Bring your own if you have it', p: 'Helmets are provided and fitted. If you have your own boots, gloves and goggles, bring them. Sand finds every gap.' },
    { tag: 'Pace', h: 'Guides ride to the group', p: 'Book with riders of similar ability, or tell us you are riding solo. A mixed group means somebody is bored and somebody is out of their depth.' },
    { tag: 'Timing', h: 'Sunrise is the best sand', p: 'Firmer surface, better light, manageable heat. Late afternoon is second best. Midday in summer is the worst of it.' },
    { tag: 'Bikes', h: 'Maintained in house', p: 'The 450s are serviced at our own base rather than sent out, so a bike that comes back wrong does not go out again the next morning.' }
  ],
  stepsKicker: '04 / Booking path',
  stepsH2: 'How to set up a session',
  stepsLede: 'Tell us your experience honestly and the session gets built around it.',
  steps: [
    { h: 'Tell us what you ride', p: 'Trails, motocross, enduro, and how often. It decides the route and the pace the guide sets.' },
    { h: 'Pick the duration', p: 'Start at 30 or 60 minutes if you have not ridden sand before. Extend on a later booking once you know.' },
    { h: 'Book sunrise or late afternoon', p: 'Firmer sand and better light. Say which you want and we will check the slot.' },
    { h: 'Pay at the base', p: 'Nothing due at booking. Cash, card or bank transfer at Al Awir before you ride.' }
  ],
  faqKicker: '05 / Questions',
  faqH2: 'Questions from riders who already ride',
  faqLede: 'The practical detail, not the beginner explanation.',
  faqs: [
    { q: 'How does dune riding compare to motocross?', a: 'The bike control transfers but the surface does not. Sand moves under you and rewards momentum. Most motocross riders adjust within twenty minutes, mostly on throttle discipline and body position on climbs.' },
    { q: 'Can I ride at my own pace?', a: 'Within reason. The guide sets a route and a boundary, but on open dune terrain there is real space. Book with riders of similar ability, or tell us you are riding solo and we will plan for it.' },
    { q: 'What is the longest session?', a: 'Four hours at AED 2000. Genuinely demanding in soft sand. Unless you ride regularly, two hours at AED 1200 is a better session.' },
    { q: 'Can I bring my own gear?', a: 'Yes, and we recommend it if you have it. Helmets are provided and fitted. Your own boots, gloves and goggles will be more comfortable than anything loaned.' },
    { q: 'Do you have anything other than the KTM 450?', a: 'No. One bike, chosen because it suits this terrain. No Husqvarna and no smaller capacity option.' },
    { q: 'Should I check my travel insurance?', a: 'Yes. Riding is at your own risk, and most standard travel policies exclude off road motorcycling specifically. Worth confirming yours covers it before you travel.' }
  ],
  linksKicker: '06 / Related',
  linksH2: 'Where to go next',
  links: [
    { tag: 'KTM', title: 'KTM Dirt Bike Dubai', desc: 'The bike, the routes and every duration.', href: '/ktm-dirt-bike-dubai/' },
    { tag: 'Beginners', title: 'Dirt Bike for Beginners', desc: 'Send anyone in your group who has not ridden here.', href: '/ktm-dirt-bike-dubai/dirt-bike-for-beginners/' },
    { tag: 'Safety', title: 'Safety Standards', desc: 'How we run briefings, guides and weather calls.', href: '/about-us/safety-standards/' }
  ],
  finalKicker: 'Ready to ride',
  finalH2: 'Tell us what you ride and we will set the session',
  finalLede: 'Experience level, preferred duration and sunrise or afternoon. That is all we need.'
};
