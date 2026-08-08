/* Blog posts.
   Six guides chosen from the quick-win keyword list, all KD 25 or under, all
   answering a question the pillar pages cannot target without diluting them.

   Rules that apply to every post here:
   - Prices come from the data files. Never type a number that is not in them.
   - Per vehicle, never per person, for buggies, quads and dirt bikes.
   - No insurance claim, and no mention of its absence. Guest-owned advice only.
   - No DTCM, no licence number, no em dashes.
   - Every post links to the pillar or price page it references, so a reader can
     check the number rather than take our word for it. */

export type Post = {
  slug: string; title: string; excerpt: string; date: string;
  category: 'buggy' | 'quad' | 'safari' | 'planning';
  subject: 'buggy' | 'quad' | 'dirtbike' | 'safari';
  heroImage: string; image: string; finalImage: string;
  keyword: string;                       // the primary target, for our own tracking
  takeaways: string[];
  sections: { id: string; h: string; html: string }[];
  table?: { h: string; head: string[]; rows: string[][] };
  faqs: { q: string; a: string }[];
  helpTitle: string; helpText: string; helpMessage: string;
  helpHref: string; helpLinkLabel: string;
  finalH2: string; finalLede: string;
};

export const categories = [
  { slug: 'buggy', label: 'Dune buggy' },
  { slug: 'quad', label: 'Quad bike' },
  { slug: 'safari', label: 'Desert safari' },
  { slug: 'planning', label: 'Planning' }
] as const;

export const posts: Post[] = [
  /* ---------------------------------------------------- KD 9, quad price */
  {
    slug: 'quad-biking-dubai-price',
    title: 'Quad Biking Dubai Price: What It Actually Costs in 2026',
    excerpt: 'Every quad we run, what each one costs by duration, and the age limits that decide which ones your group can even book. Prices are per quad, not per person.',
    date: '2026-08-08',
    category: 'quad', subject: 'quad',
    heroImage: 'quad-biking-dubai-hero-red-dunes',
    image: 'quad-bike-rental-fleet-parked-al-awir-dubai',
    finalImage: 'quad-biking-dubai-open-desert-three-riders',
    keyword: 'quad biking dubai price',
    takeaways: [
      'Quad prices start at AED 75 for 30 minutes on a kids machine and AED 89 on an adult boundary quad',
      'Every price is per quad. A double seat quad carries two people, so it halves per head',
      'Age decides the machine before budget does, from 6 on kids quads to 18 on the Raptor 700',
      'Hotel pickup anywhere inside Dubai is free, and no deposit is taken to hold a slot'
    ],
    sections: [
      { id: 'what-it-costs', h: 'What quad biking in Dubai actually costs', html: `
<p>Quad biking in Dubai starts at <strong>AED 75</strong> for a 30 minute session on a kids machine, and <strong>AED 89</strong> for an adult on a single seat boundary quad. At the top end, four hours on a Yamaha Raptor 700cc is AED 2200.</p>
<p>That spread looks wide until you see what drives it. Two things set the price: <strong>engine size</strong> and <strong>where you are allowed to ride</strong>. A 150cc quad inside a fenced boundary area costs a fraction of a 700cc machine out in the open red dunes, because the machine, the guide ratio and the risk are all different.</p>
<p>The one thing that does not change is the basis. Every price on our <a href="/quad-bike-dubai/price/">quad price page</a> is <strong>per quad</strong>. That matters most on the double seat machines: a double seat boundary quad at AED 150 for 30 minutes carries two people, so it is AED 75 each. Operators quoting per person look cheaper on a search results page and cost more once you multiply by the group.</p>` },
      { id: 'by-machine', h: 'Price by machine and duration', html: `
<p>Six quads, five durations. The table below is the full list, and it is the same list our guides work from at the base.</p>
<p>If you are booking for a mixed group, the useful move is to pick the machine by the youngest and least confident rider, then let the confident ones take something bigger. Guides ride to the slowest person in the group, so a group all on the same machine usually has a better time than a group split across three tiers.</p>` },
      { id: 'age-limits', h: 'Age limits decide the machine before budget does', html: `
<p>This is where most enquiries actually get resolved. Every quad has a minimum age set by engine size and route, and guides check at the base rather than at booking. Bring ID if a rider is close to a limit, because we would rather check than guess.</p>
<ul>
<li><strong>Age 6:</strong> kids quads, 70cc to 90cc, in a fenced riding area with a guide watching. AED 75 for 30 minutes.</li>
<li><strong>Age 12:</strong> single seat boundary quads, 150cc to 250cc. AED 89 for 30 minutes.</li>
<li><strong>Age 14:</strong> double seat boundary quads, and single seat open desert quads at 250cc to 350cc.</li>
<li><strong>Age 16:</strong> double seat open desert quads, 350cc to 450cc.</li>
<li><strong>Age 18:</strong> Yamaha Raptor 700cc, our fastest machine.</li>
</ul>
<p>A child under the age limit for their own machine can still ride as a passenger on a double seat quad, or in a two or four seat <a href="/dune-buggy-dubai/">dune buggy</a>. Families rarely have to leave anyone sitting out.</p>` },
      { id: 'whats-included', h: 'What the price includes, and what it does not', html: `
<p>Included in every quad booking, at every duration:</p>
<ul>
<li>Helmet, fitted and checked by a guide before you move</li>
<li>A full briefing on the controls, the route and the boundary</li>
<li>A guide leading the ride, including the 30 minute slots</li>
<li>Fuel and water</li>
<li>Free hotel pickup and drop-off anywhere inside Dubai</li>
<li>Sandboarding, if you want to try it</li>
</ul>
<p>What is not included: transfers from outside Dubai, which we quote before you book, and anything you add on such as a camel ride at AED 100. There is no deposit and nothing to pay when you book. You settle at the base before riding, by cash, card or bank transfer.</p>` },
      { id: 'which-to-pick', h: 'Which one to actually book', html: `
<p><strong>Never ridden before:</strong> a single seat boundary quad at AED 89 for 30 minutes. Fenced, controlled, and enough to know whether you want the open desert next time. Most people who start here come back for the open desert route.</p>
<p><strong>Riding as a couple:</strong> a double seat boundary quad at AED 150, which is AED 75 each and lets the less confident person ride along rather than steer.</p>
<p><strong>Ridden before and want the dunes:</strong> single seat open desert at AED 200 for 30 minutes, or AED 350 for the hour. This is the route the red dune photos come from.</p>
<p><strong>You actually ride:</strong> the Raptor 700cc at AED 500 for 30 minutes. It is a genuinely fast machine and the guides will let you use it.</p>
<p>An hour is the sweet spot for most first timers. Quads are more physical than <a href="/dune-buggy-dubai/">buggies</a>, and a full hour in the heat is real work.</p>` }
    ],
    table: {
      h: 'Every quad, every duration',
      head: ['Quad', 'Age', '30 min', '1 hr', '2 hr', '3 hr', '4 hr'],
      rows: [
        ['Kids quad, 70 to 90cc', '6+', 'AED 75', 'AED 140', 'AED 250', 'AED 350', 'AED 450'],
        ['Single seat, boundary', '12+', 'AED 89', 'AED 150', 'AED 300', 'AED 400', 'AED 500'],
        ['Double seat, boundary', '14+', 'AED 150', 'AED 250', 'AED 400', 'AED 500', 'AED 600'],
        ['Single seat, open desert', '14+', 'AED 200', 'AED 350', 'AED 500', 'AED 700', 'AED 900'],
        ['Double seat, open desert', '16+', 'AED 300', 'AED 450', 'AED 600', 'AED 900', 'AED 1100'],
        ['Yamaha Raptor 700cc', '18+', 'AED 500', 'AED 700', 'AED 1200', 'AED 1700', 'AED 2200']
      ]
    },
    faqs: [
      { q: 'How much is quad biking in Dubai per person?', a: 'Our prices are per quad, not per person. A single seat boundary quad at AED 89 carries one rider, so that is the per person cost. A double seat quad at AED 150 carries two, which works out at AED 75 each.' },
      { q: 'What is the cheapest quad biking in Dubai?', a: 'AED 75 for 30 minutes on a kids quad, and AED 89 for an adult on a single seat boundary quad. Both include the helmet, the briefing, a guide and free hotel pickup inside Dubai.' },
      { q: 'Do I need to pay a deposit?', a: 'No deposit on standard bookings. Nothing is due when you book. You pay at the Al Awir base before you ride, by cash, card or bank transfer.' },
      { q: 'Is hotel pickup included in the price?', a: 'Yes, free anywhere inside Dubai. Outside Dubai we quote the transfer before you commit, so the number you agree is the number you pay.' },
      { q: 'How long should I book for a first ride?', a: 'Thirty minutes if you are fitting it around other plans, an hour if you want a proper session. Quads are more physical than buggies and an hour in the heat is genuine work.' },
      { q: 'Can children ride their own quad?', a: 'From age six, on the 70cc to 90cc kids machines in a fenced riding area with a guide supervising. Under six, children can ride as passengers in a two or four seat buggy instead.' }
    ],
    helpTitle: 'Get a price for your group',
    helpText: 'Send the ages and how many are riding. We will tell you which quads work and what the total comes to.',
    helpMessage: 'Hi Buggy Rents! I would like quad biking prices. Here are the ages and group size:',
    helpHref: '/quad-bike-dubai/price/', helpLinkLabel: 'See the price page',
    finalH2: 'Tell us the ages and we will price it',
    finalLede: 'Age decides the machine, and the machine decides the price. Two lines from you is enough.'
  },

  /* ------------------------------------------------- KD 20, buggy price */
  {
    slug: 'dune-buggy-dubai-price',
    title: 'Dune Buggy Dubai Price: All Eleven Buggies Compared',
    excerpt: 'What a dune buggy costs in Dubai, from AED 300 for 30 minutes to AED 2299 for four hours. Per buggy, not per person, which changes the maths for groups.',
    date: '2026-08-07',
    category: 'buggy', subject: 'buggy',
    heroImage: 'dune-buggy-dubai-hero-red-dunes',
    image: 'polaris-rzr-4-seater-dune-buggy-parked-dubai-base',
    finalImage: 'dune-buggy-climbing-red-dune-convoy-dubai',
    keyword: 'dune buggy dubai price',
    takeaways: [
      'Dune buggies start at AED 300 for 30 minutes in a Polaris RZR 1000 two seater',
      'Prices are per buggy. A four seater split four ways is under AED 90 each',
      'Model matters less than seat count and duration for what you pay',
      'Free hotel pickup inside Dubai, no deposit, free cancellation up to 24 hours before'
    ],
    sections: [
      { id: 'the-number', h: 'The number most people are looking for', html: `
<p>A dune buggy in Dubai starts at <strong>AED 300</strong> for 30 minutes. That is a Polaris RZR 1000 two seater, which is the most forgiving machine we run and the one we put most first timers in.</p>
<p>The full range runs from AED 300 up to AED 2299 for four hours in a four seat Polaris Turbo. Eleven buggies, four durations, and the complete list is on the <a href="/dune-buggy-dubai/price/">dune buggy price page</a>.</p>
<p>Before anything else, the basis: <strong>every price is for the buggy, not per person</strong>. This is the single biggest source of confusion when people compare operators, and it works in your favour.</p>` },
      { id: 'per-vehicle', h: 'Why per vehicle changes the maths', html: `
<p>Take the AED 300 two seater. Two people ride in it, so that is AED 150 each. Now take a four seat Polaris RZR at AED 350 for the same 30 minutes. Four people ride in it, so that is <strong>under AED 90 each</strong>, and it is a bigger machine.</p>
<p>That is why groups almost always take the four seater. It is not the fastest option loaded with four people, but it is comfortably the cheapest per head and everyone rides together rather than following each other.</p>
<p>The comparison worth doing before you book: divide the buggy price by the number of seats you will actually fill, then compare that against any per person quote you have been given elsewhere. The gap is usually larger than people expect.</p>` },
      { id: 'what-drives-price', h: 'What actually drives the price', html: `
<h3>Duration, more than anything</h3>
<p>Thirty minutes to four hours. The jump from 30 minutes to an hour is modest. The jump from an hour to two, and from two to four, is where the price climbs, because those sessions use more fuel, more guide time and cover more ground.</p>
<h3>Seat count</h3>
<p>Four seaters cost a little more than the two seat version of the same machine, but they carry twice the people. On a per head basis they are always cheaper.</p>
<h3>Engine and model</h3>
<p>A Polaris RZR 1000 is the entry point. Turbo models and the Can-Am X3 range cost more and are noticeably quicker. The Can-Am Maverick R sits at the top. Honestly, for a first ride the difference in enjoyment between the entry machine and the top one is smaller than the price gap suggests. The sand is what makes it fun.</p>
<h3>One thing that does not drive the price</h3>
<p>Pickup. Hotel pickup anywhere inside Dubai is free, on every buggy and every duration. Outer emirates are quoted before you book.</p>` },
      { id: 'which-buggy', h: 'Which buggy to book', html: `
<p><strong>First time, two people:</strong> Polaris RZR 1000 two seater, AED 300 for 30 minutes or AED 550 for the hour. Most forgiving machine we run.</p>
<p><strong>Family or group of four:</strong> Polaris RZR 1000 four seater, AED 350 for 30 minutes. Under AED 90 a head and everyone stays together.</p>
<p><strong>You have driven one before:</strong> Can-Am X3 two seater from AED 600, or a Polaris Turbo from AED 800. Genuinely quicker and you will feel the difference.</p>
<p><strong>You want the best machine we have:</strong> Can-Am Maverick R, from AED 900 for a two seater.</p>
<p>One quirk worth knowing, because it looks like a mistake and is not: our Polaris Turbo four seater is priced slightly below the two seater at some durations. That is deliberate and confirmed. If the four seater suits your group, take it.</p>` },
      { id: 'no-surprises', h: 'What you pay on the day', html: `
<p>No deposit is taken to hold a standard slot, so there is nothing to pay when you book. You settle at the Al Awir base before you ride, by cash, card or bank transfer.</p>
<p>Cancellation is free up to 24 hours before your slot. Inside 24 hours, message us anyway. Our first move is to find you another date rather than charge you.</p>
<p>If wind, heat or visibility make the route unsafe, we make that call before you travel and either reschedule at no cost or refund you in full.</p>` }
    ],
    table: {
      h: 'Entry price by buggy',
      head: ['Buggy', 'Seats', '30 min', '1 hr', '2 hr'],
      rows: [
        ['Polaris RZR 1000', '2', 'AED 300', 'AED 550', 'AED 999'],
        ['Polaris RZR 1000', '4', 'AED 350', 'AED 550', 'AED 1099'],
        ['Polaris Turbo', '2', 'AED 800', 'AED 1099', 'AED 1999'],
        ['Polaris Turbo', '4', 'AED 750', 'AED 999', 'AED 2299'],
        ['Can-Am Maverick X3', '2', 'AED 600', 'AED 999', 'AED 1299'],
        ['Can-Am Maverick X3', '4', 'AED 700', 'AED 999', 'AED 1499'],
        ['Can-Am Maverick R', '2', 'AED 900', 'AED 1299', 'AED 1999']
      ]
    },
    faqs: [
      { q: 'How much does a dune buggy cost in Dubai?', a: 'From AED 300 for 30 minutes in a Polaris RZR 1000 two seater. Prices are per buggy, so two people riding together pay AED 150 each. The range goes up to AED 2299 for four hours in a four seat Turbo.' },
      { q: 'Is the price per person or per buggy?', a: 'Per buggy, always. Divide by the number of seats you fill to get the cost per person. A four seater at AED 350 split between four people is under AED 90 each.' },
      { q: 'Do I need a driving licence?', a: 'Not for our routes. Riding is on private desert terrain with a guide rather than on public roads. What matters is following the briefing.' },
      { q: 'Which buggy is best for a first ride?', a: 'The Polaris RZR 1000 two seater. It is the most forgiving machine we run and the cheapest way in at AED 300 for 30 minutes.' },
      { q: 'Is hotel pickup extra?', a: 'No, it is free anywhere inside Dubai on every booking. Outside Dubai we quote the transfer before you commit.' },
      { q: 'Can children ride in a buggy?', a: 'Yes, as passengers in a two or four seat buggy, which is how most families do it. Children who want to drive themselves can start on a kids quad from age six.' }
    ],
    helpTitle: 'Price it for your group',
    helpText: 'Tell us how many are riding and we will work out whether two seaters or a four seater is cheaper for you.',
    helpMessage: 'Hi Buggy Rents! I would like dune buggy prices. Here is my group size and date:',
    helpHref: '/dune-buggy-dubai/price/', helpLinkLabel: 'See all eleven buggies',
    finalH2: 'Tell us the group size and we will do the maths',
    finalLede: 'Two seaters or a four seater is almost always the real question. We will tell you which is cheaper.'
  },

  /* --------------------------------------- KD 2, safari without bashing */
  {
    slug: 'dubai-desert-safari-without-dune-bashing',
    title: 'Dubai Desert Safari Without Dune Bashing: How to Book It',
    excerpt: 'You can do a Dubai desert safari with no dune bashing at all. Here is who should ask for it, what you still get, and exactly what to say when you book.',
    date: '2026-08-06',
    category: 'safari', subject: 'safari',
    heroImage: 'desert-safari-dubai-hero-dune-bashing',
    image: 'camel-ride-desert-safari-dubai',
    finalImage: 'bedouin-camp-majlis-seating-desert-safari-dubai',
    keyword: 'dubai desert safari without dune bashing',
    takeaways: [
      'Yes, you can book a desert safari with no dune bashing. Just say so when you book',
      'You keep the camp, the dinner, the camel ride, sandboarding and the shows',
      'The usual reasons are motion sickness, pregnancy, back and neck problems, or young children',
      'It costs the same. There is no surcharge and no discount for skipping it'
    ],
    sections: [
      { id: 'yes-you-can', h: 'Yes, and it is a normal request', html: `
<p>Dune bashing is the part of a Dubai desert safari where a driver takes a 4x4 up and down the red dunes at speed. Plenty of people love it. A meaningful number do not, and asking to skip it is a completely normal request that we get every week.</p>
<p>Tell us when you book and the driver takes a calmer route to the camp instead. Nothing else about the trip changes, and the price is exactly the same. There is no surcharge for the request and no discount for skipping it, because the cost of the safari sits in the vehicle, the driver, the camp and the dinner rather than in the forty minutes on the dunes.</p>
<p>The one thing that matters is telling us <strong>before</strong> the day. Asking the driver at the moment the tyres are being deflated is too late to change the plan properly.</p>` },
      { id: 'who-should-ask', h: 'Who should ask for the calmer route', html: `
<p><strong>Anyone who gets motion sick.</strong> Dune bashing is the single most common trigger on any Dubai tour. If car journeys on winding roads are a problem for you, this will be worse.</p>
<p><strong>Pregnancy.</strong> We do not recommend dune bashing during pregnancy. A calm route to the camp is the right version of this trip.</p>
<p><strong>Back, neck or heart conditions, or recent surgery.</strong> The impacts are heavier than they look from outside the vehicle.</p>
<p><strong>Very young children and older guests.</strong> Not a firm rule, and plenty of both love it. But if you are unsure about someone in your group, the calm route removes the question.</p>
<p><strong>People who just do not want it.</strong> This is a completely sufficient reason and you do not have to justify it.</p>` },
      { id: 'what-you-keep', h: 'What you still get', html: `
<p>Everything except the dunes at speed. A shared evening safari without dune bashing still includes:</p>
<ul>
<li>Free hotel pickup and drop-off inside Dubai</li>
<li>The drive out to the desert, at a normal pace</li>
<li>A sunset stop for photos</li>
<li>Camel ride</li>
<li>Sandboarding</li>
<li>Henna and Arabic coffee at the Bedouin camp</li>
<li>Halal BBQ dinner, with vegetarian options</li>
<li>Belly dance, tanoura and fire show</li>
</ul>
<p>In practice the camp is what most people remember afterwards anyway. Dinner under lights in the desert with the shows running is the part that ends up in the photos.</p>` },
      { id: 'how-to-book', h: 'Exactly what to say when you book', html: `
<p>Send us a message with these four things and we will set it up:</p>
<ol>
<li>Your date</li>
<li>How many guests, and their ages</li>
<li>Your hotel or pickup area</li>
<li>The line: <strong>please no dune bashing, a calm route to the camp</strong></li>
</ol>
<p>That is enough. We flag it on the booking, the driver knows before he collects you, and nobody has to have an awkward conversation in the vehicle.</p>
<p>If only part of your group wants to skip it, tell us that too. On a private safari the driver simply adjusts. On a shared safari we may put you in a different vehicle from the rest of your group for the dune section and reunite you at the camp, which usually works fine.</p>` },
      { id: 'private-option', h: 'Consider a private safari instead', html: `
<p>If avoiding the dunes matters a lot to you, a private safari is worth pricing. On a shared safari you are in a Land Cruiser with other guests, and their preferences are in the mix too. On a private safari the vehicle is yours and the driver works entirely to your pace.</p>
<p>Private safaris are priced <strong>per vehicle</strong> rather than per person, which flips the maths for a family or a group. Four or more people often pay less in total than the same number of shared seats. Our full list is on the <a href="/desert-safari-dubai-deals/">desert safari page</a>, and every card says which basis it uses.</p>
<p>If nobody in your group wants to drive at all, the safari is the right choice. If some do, a <a href="/dune-buggy-dubai/">dune buggy</a> or <a href="/quad-bike-dubai/">quad</a> for them plus a safari for everyone else is a combination we run constantly, and the whole group meets at the camp for dinner.</p>` }
    ],
    faqs: [
      { q: 'Can I really do a desert safari without dune bashing?', a: 'Yes. Say so when you book and the driver takes a calm route to the camp. You keep the camel ride, sandboarding, dinner and the shows. It is a normal request and there is no surcharge.' },
      { q: 'Does it cost less if I skip the dune bashing?', a: 'No, the price is the same. The cost sits in the vehicle, the driver, the camp and the dinner rather than in the time on the dunes.' },
      { q: 'What if only some of my group want to skip it?', a: 'Tell us and we will plan for it. On a private safari the driver just adjusts. On a shared safari we may split you across vehicles for that section and reunite you at the camp.' },
      { q: 'Is dune bashing safe during pregnancy?', a: 'We do not recommend it. Ask for the calm route to the camp, which gives you the whole experience without the impacts.' },
      { q: 'Can I decide on the day instead?', a: 'It is much better to tell us when you book. By the time the vehicle is at the dunes the plan is already set, and changing it there is harder for everyone.' },
      { q: 'Will I miss the best part?', a: 'Most people say the camp is what they remember: dinner under lights, the fire show and the quiet once the music stops. Dune bashing is a thrilling forty minutes, not the whole trip.' }
    ],
    helpTitle: 'Book the calm route',
    helpText: 'Send your date and group and add the line about no dune bashing. We will flag it on the booking.',
    helpMessage: 'Hi Buggy Rents! I would like a desert safari with no dune bashing, a calm route to the camp. Here is my date and group:',
    helpHref: '/desert-safari-dubai-deals/', helpLinkLabel: 'See safari packages',
    finalH2: 'Ask for the calm route and we will set it up',
    finalLede: 'Same camp, same dinner, same shows. Just a gentler drive to get there.'
  },

  /* ------------------------------------------------ KD 7, what to wear */
  {
    slug: 'what-to-wear-desert-safari-dubai',
    title: 'What to Wear to a Desert Safari in Dubai, by Season',
    excerpt: 'What actually works in the desert, what people regret wearing, and how much the answer changes between a June evening and a January one.',
    date: '2026-08-05',
    category: 'planning', subject: 'safari',
    heroImage: 'desert-safari-dubai-hero-dune-bashing',
    image: 'sandboarding-desert-safari-dubai',
    finalImage: 'private-desert-safari-4x4-dubai-red-dunes',
    keyword: 'what to wear to desert safari dubai',
    takeaways: [
      'Closed shoes, always. Sandals are the single most common regret',
      'Winter evenings get genuinely cold once the sun drops. Bring a layer',
      'Loose, light and covering beats tight and minimal, in both seasons',
      'If you are driving a buggy or quad rather than riding along, cover your legs'
    ],
    sections: [
      { id: 'the-short-answer', h: 'The short answer', html: `
<p>Loose, light clothing that covers you, and <strong>closed shoes</strong>. That is most of it.</p>
<p>The desert is not a beach. Sand at the camp is cool and soft in the evening but it gets into everything, and the ground around the camp and the dune faces is not something you want to walk on in sandals. Closed shoes are the one thing people most often wish they had brought.</p>
<p>Everything else depends on the season, and the difference between a June evening and a January one is much bigger than visitors expect.</p>` },
      { id: 'summer', h: 'Summer, roughly May to September', html: `
<p>Evenings are still warm when a safari starts. Aim for loose cotton or linen: a long sleeved shirt and light trousers will keep you cooler than a t-shirt and shorts, because they keep the sun off and let air move.</p>
<ul>
<li>Loose long sleeves rather than bare arms</li>
<li>Light trousers or a long skirt</li>
<li>Closed shoes, trainers are fine</li>
<li>Sunglasses, and a hat for the sunset stop</li>
<li>Water, though it is provided too</li>
</ul>
<p>If you are booking a <a href="/quad-bike-dubai/">quad</a> or <a href="/dune-buggy-dubai/">buggy</a> in summer, the morning session is a far better idea than the afternoon. It is the same desert with a third of the heat.</p>` },
      { id: 'winter', h: 'Winter, roughly November to March', html: `
<p>This is where people get caught out. Daytime is beautiful. Once the sun drops, the desert cools fast, and by the time the camp dinner is being served in December or January it is genuinely cold, particularly with any wind.</p>
<ul>
<li>Everything from the summer list, plus a jacket or fleece</li>
<li>A scarf is more useful than it sounds, for the wind rather than the temperature</li>
<li>Socks, not bare feet in trainers</li>
</ul>
<p>Nearly every guest who is uncomfortable at a winter camp is uncomfortable because they dressed for a Dubai afternoon rather than a desert evening. Bring the layer even if you cannot imagine needing it when you leave the hotel.</p>` },
      { id: 'driving-vs-riding', h: 'If you are driving rather than riding along', html: `
<p>A safari is a passenger experience, so normal clothes are fine. Driving a quad or a buggy is different, and quads are the most demanding of the three.</p>
<p><strong>On a quad</strong>, sand is thrown up constantly and your legs take most of it. Long trousers are close to essential rather than merely advisable. Closed shoes are required.</p>
<p><strong>In a buggy</strong>, you sit inside a cage with a harness so there is less spray, but the dust still finds you. Sunglasses or goggles are worth having, particularly if you wear contact lenses.</p>
<p>Helmets are provided, fitted and checked on every ride, so you do not need to bring one. If you own your own goggles and gloves, bring them, since they will fit better than anything loaned.</p>` },
      { id: 'what-to-leave', h: 'What to leave at the hotel', html: `
<ul>
<li><strong>Sandals and flip flops.</strong> The most common regret by a distance.</li>
<li><strong>Anything you would be upset to get dusty.</strong> Desert dust is fine and gets into fabric.</li>
<li><strong>Loose jewellery and hats without a strap.</strong> Both disappear on the dunes.</li>
<li><strong>White trousers.</strong> They will not stay white.</li>
</ul>
<p>Bring a bag for your phone and camera. Dune bashing and quad riding both throw sand around, and phones do not enjoy it. Most guests take photos at the stops rather than while moving anyway, because the moving parts are too rough to hold anything steady.</p>` },
      { id: 'cultural', h: 'On modesty and comfort', html: `
<p>The camps are relaxed and there is no dress code as such. That said, covering shoulders and knees is both the respectful default in the UAE and, in practice, the more comfortable choice in the desert. Long and loose beats short and tight in the sun and in the evening chill alike.</p>
<p>If you plan to try sandboarding, wear something you can sit down in the sand in, because you will.</p>` }
    ],
    faqs: [
      { q: 'What should I wear to a desert safari in Dubai?', a: 'Loose, light clothing that covers you, and closed shoes. In winter add a jacket, because the desert gets genuinely cold after sunset. Sunglasses for the sunset stop.' },
      { q: 'Can I wear sandals?', a: 'We would advise against it. Sand gets into everything and the ground around the camp is not comfortable in open shoes. Closed shoes are the single most common thing guests wish they had brought.' },
      { q: 'Is it cold in the desert at night?', a: 'In winter, yes, noticeably. From November to March bring a jacket or fleece. Guests who dress for a Dubai afternoon are usually the ones who are cold at the camp.' },
      { q: 'What should I wear for quad biking rather than a safari?', a: 'Long trousers and closed shoes. Quads throw up far more sand than a safari vehicle does, and your legs take most of it. Helmets are provided.' },
      { q: 'Is there a dress code at the camp?', a: 'No formal dress code. Covering shoulders and knees is the respectful default in the UAE and it is also more comfortable in the sun and the evening chill.' },
      { q: 'Should I bring a camera?', a: 'Yes, and something to keep it in. Sand gets everywhere. Most photos happen at the sunset stop and at the camp rather than while the vehicle is moving.' }
    ],
    helpTitle: 'Not sure what to pack?',
    helpText: 'Tell us your date and we will tell you what the evenings are doing that week.',
    helpMessage: 'Hi Buggy Rents! I am booking a desert safari. What should we wear for our date?',
    helpHref: '/desert-safari-dubai-deals/', helpLinkLabel: 'See safari packages',
    finalH2: 'Closed shoes and a layer. The rest is easy',
    finalLede: 'Send us your date and group and we will sort the booking while you sort the packing.'
  },

  /* --------------------------------------------- KD 19, safari timings */
  {
    slug: 'desert-safari-dubai-timings',
    title: 'Desert Safari Dubai Timings: Morning, Evening or Overnight',
    excerpt: 'When each safari starts, how long it runs door to door, and which one to pick for your trip. Includes why summer changes the answer completely.',
    date: '2026-08-04',
    category: 'safari', subject: 'safari',
    heroImage: 'desert-safari-dubai-hero-dune-bashing',
    image: 'belly-dance-show-desert-safari-camp-dubai',
    finalImage: 'fire-show-desert-safari-camp-dubai',
    keyword: 'desert safari dubai timings',
    takeaways: [
      'The evening safari runs 7 to 8 hours door to door and is what most people book',
      'Morning safaris are shorter, 4 to 5 hours, and are the sensible summer option',
      'Overnight safaris add a night at the camp, but not if you have an early flight',
      'All timings include free hotel pickup and drop-off inside Dubai'
    ],
    sections: [
      { id: 'evening', h: 'Evening safari: the standard one', html: `
<p>When people say desert safari in Dubai, this is almost always what they mean. Afternoon pickup from your hotel, out to the desert while the light is good, dune bashing, a sunset stop, then the Bedouin camp for dinner and shows.</p>
<p><strong>Door to door it runs 7 to 8 hours.</strong> Pickup is mid to late afternoon depending on the season and where you are staying, and you are usually back at your hotel between 9 and 10pm.</p>
<p>It is the longest of the standard options and the one that packs in the most: dune bashing, camel ride, sandboarding, henna, dinner, belly dance, tanoura and the fire show. From AED 99 per person on the shared package.</p>
<p>Book this one unless you have a specific reason not to.</p>` },
      { id: 'morning', h: 'Morning safari: shorter and quieter', html: `
<p>Pickup before dawn, dune bashing as the sun comes up, and back at the hotel by late morning. <strong>Four to five hours door to door.</strong></p>
<p>Two reasons to pick it over the evening. First, it leaves the rest of your day free, which matters on a short trip. Second, and more importantly, <strong>in summer it is the only genuinely comfortable option</strong>. A June evening in the desert is still hot. A June sunrise is not.</p>
<p>What you give up is the camp experience. Morning safaris are about the desert and the dunes rather than dinner and shows. If the camp is the part you are looking forward to, take the evening.</p>
<p>Sunrise is also when the sand is firmest, which is why it is the session our guides prefer for <a href="/quad-bike-dubai/">quads</a> and <a href="/dune-buggy-dubai/">buggies</a> too.</p>` },
      { id: 'overnight', h: 'Overnight safari: for the stars', html: `
<p>An overnight safari runs the full evening programme, then everyone stays at the camp rather than driving back. You sleep under the stars, wake in the desert, and return the following morning.</p>
<p>It is a genuinely different experience and the desert at night with the camp quiet is worth the extra time if you have it. The stars away from Dubai light pollution are the point.</p>
<p><strong>Do not book this if you have an early flight the next day.</strong> The return is a morning drive, not a pre dawn dash, and we have seen people cut it too fine.</p>` },
      { id: 'season', h: 'Season changes the answer', html: `
<h3>Summer, roughly May to September</h3>
<p>Take the morning safari. The evening one is perfectly survivable and thousands of people do it, but you will spend a portion of it managing the heat rather than enjoying the desert. Sunrise is cooler, the light is better and the sand is firmer.</p>
<h3>Winter, roughly November to March</h3>
<p>Take the evening safari. This is the season it was designed for. Comfortable afternoon, spectacular sunset, and a camp dinner in cool air. Bring a jacket, because after dark it gets genuinely cold.</p>
<h3>Shoulder months</h3>
<p>April and October work for either. Pick by whether you want the camp or want your day free.</p>` },
      { id: 'pickup-timing', h: 'How pickup timing actually works', html: `
<p>Pickup is not a single fixed time for everyone. A shared safari collects several groups, so your slot depends on where you are staying relative to the rest of the route. We give you a window and confirm it the day before.</p>
<p>If you are staying centrally, pickup tends to be later in the window. Further out, earlier. Either way, hotel pickup <strong>anywhere inside Dubai is free</strong>, and outer emirates are quoted before you book.</p>
<p>On a private safari the timing is yours. You choose the pickup time and the driver works to it, which is one of the reasons families with young children often prefer private even before the per vehicle pricing makes it cheaper.</p>` }
    ],
    table: {
      h: 'Timings side by side',
      head: ['Safari', 'Pickup', 'Duration', 'Best for'],
      rows: [
        ['Evening', 'Mid to late afternoon', '7 to 8 hours', 'First timers, winter, the camp experience'],
        ['Morning', 'Before dawn', '4 to 5 hours', 'Summer, short trips, keeping your day free'],
        ['Overnight', 'Mid to late afternoon', 'Until next morning', 'Stars, and having the time to spare']
      ]
    },
    faqs: [
      { q: 'What time does the evening desert safari start?', a: 'Pickup is mid to late afternoon depending on the season and where you are staying. It runs 7 to 8 hours door to door and you are usually back between 9 and 10pm.' },
      { q: 'How long is a desert safari in Dubai?', a: 'The evening safari is 7 to 8 hours door to door including pickup and drop-off. Morning safaris are shorter at 4 to 5 hours. Overnight safaris run until the following morning.' },
      { q: 'Which is better, morning or evening?', a: 'Evening in winter, morning in summer. Evening gives you the camp, the dinner and the shows. Morning gives you cooler air, firmer sand and the rest of your day free.' },
      { q: 'What time is pickup?', a: 'We give you a window and confirm it the day before. On a shared safari your slot depends on where you are staying relative to the rest of the route. On a private safari you choose the time.' },
      { q: 'Can I book a safari on the day?', a: 'Often yes, but weekends and holidays fill first and sunrise slots go quickest. A day or two ahead is safer.' },
      { q: 'Is an overnight safari worth it?', a: 'If you have the time, yes. The desert at night once the camp is quiet is the reason to do it. Do not book it if you have an early flight the next morning.' }
    ],
    helpTitle: 'Check a specific date',
    helpText: 'Send your date and we will tell you the pickup window and which timing suits that season.',
    helpMessage: 'Hi Buggy Rents! Could you confirm safari timings and pickup for my date?',
    helpHref: '/desert-safari-dubai-deals/', helpLinkLabel: 'See safari packages',
    finalH2: 'Send your date and we will confirm the timing',
    finalLede: 'Season decides morning or evening more than preference does. We will tell you straight.'
  },

  /* -------------------------------------------------- buggy vs quad */
  {
    slug: 'dune-buggy-vs-quad-bike-dubai',
    title: 'Dune Buggy or Quad Bike in Dubai: Which One Should You Book?',
    excerpt: 'Two machines, same desert, completely different days out. An honest comparison of cost, difficulty, who each suits and what people regret picking.',
    date: '2026-08-03',
    category: 'planning', subject: 'buggy',
    heroImage: 'dune-buggy-dubai-hero-red-dunes',
    image: 'couple-dune-buggy-ride-dubai-desert-tour',
    finalImage: 'can-am-maverick-x3-4-seater-desert-tour-dubai',
    keyword: 'dune buggy vs quad bike dubai',
    takeaways: [
      'A buggy is easier to be competent in quickly. A quad is more physical and more direct',
      'Buggies let a group ride together in one machine. Quads mean everyone rides their own',
      'Quads are cheaper to start at AED 75. Buggies are cheaper per head for a group of four',
      'Nervous or mixed group: buggy. Children who want to drive: quad, from age six'
    ],
    sections: [
      { id: 'the-real-difference', h: 'The real difference', html: `
<p>A <strong>dune buggy</strong> has a steering wheel, pedals, a roll cage and a harness. If you can drive a car, you can drive a buggy within about a minute of the briefing ending. It is the fastest route from never having done this to genuinely enjoying it.</p>
<p>A <strong>quad</strong> has handlebars and you steer with your body weight as much as your hands. It takes longer to feel natural and it is significantly more physical. An hour on a quad in the heat is real work in a way an hour in a buggy is not.</p>
<p>Neither is better. They produce different days. The people who ride quads tend to stay quad riders precisely because of the effort involved, and the people who love buggies love that they can concentrate on the terrain rather than on staying on the machine.</p>` },
      { id: 'cost', h: 'Which is actually cheaper', html: `
<p>This depends entirely on how many of you there are, and the answer flips.</p>
<p><strong>One or two people:</strong> quads are cheaper. A single seat boundary quad is AED 89 for 30 minutes against AED 300 for the cheapest two seat buggy. Even sharing the buggy at AED 150 each, the quad wins.</p>
<p><strong>Four people:</strong> the buggy wins, clearly. A four seat Polaris RZR at AED 350 for 30 minutes is under AED 90 each. Four separate boundary quads at AED 89 each comes to AED 356, and now everyone is riding alone rather than together.</p>
<p>The reason is that <a href="/dune-buggy-dubai/price/">buggy prices</a> and <a href="/quad-bike-dubai/price/">quad prices</a> are both per vehicle, but a buggy carries up to four people and a quad carries one or two. The larger the group, the more the buggy makes sense.</p>` },
      { id: 'who-each-suits', h: 'Who each one suits', html: `
<h3>Take a buggy if</h3>
<ul>
<li>Your group wants to ride together in one machine</li>
<li>Someone in the group is nervous and would rather be a passenger than steer</li>
<li>You have four people and want the lowest cost per head</li>
<li>Anyone has back or neck concerns, since a buggy seat and harness are kinder than a quad</li>
<li>You want to be good at it quickly rather than learning a new skill</li>
</ul>
<h3>Take a quad if</h3>
<ul>
<li>You want the more physical, more involving ride</li>
<li>You are one or two people and cost matters</li>
<li>Children want to drive something themselves, which they can from age six</li>
<li>You have ridden motorbikes or ATVs before and want that feeling</li>
</ul>` },
      { id: 'children', h: 'If children are riding', html: `
<p>This is often what decides it, and the two machines answer it differently.</p>
<p><strong>In a buggy</strong>, children ride as passengers at any age. A family of four goes out in one four seat machine with a parent driving. Nobody is left at the base.</p>
<p><strong>On a quad</strong>, children can drive their own machine from <strong>age six</strong> on the 70cc to 90cc kids quads, in a fenced riding area with a guide watching. For a child who wants to actually drive rather than be driven, there is no buggy equivalent.</p>
<p>Plenty of families do both: the kids on their own quads in the fenced area, the adults in a buggy, back to back. Tell us the ages and we will plan the order.</p>` },
      { id: 'what-people-regret', h: 'What people actually regret', html: `
<p>The two most common regrets we see, in order:</p>
<p><strong>Booking a quad for a nervous rider.</strong> A quad demands your attention constantly. Someone who was already unsure spends the session managing the machine rather than looking at the desert. That person would have loved the same hour in a buggy.</p>
<p><strong>Booking four separate quads for a group of four.</strong> It costs more than the four seat buggy and everyone rides alone. Groups usually want to be together, and the photos are better too.</p>
<p>The regret we almost never hear is someone wishing they had booked a shorter session. An hour is plenty for a first time on either machine.</p>` }
    ],
    table: {
      h: 'Buggy against quad',
      head: ['', 'Dune buggy', 'Quad bike'],
      rows: [
        ['Starts at', 'AED 300 for 30 min', 'AED 75 for 30 min'],
        ['Carries', '2 or 4 people', '1 or 2 people'],
        ['Cost for four people', 'Under AED 90 each', 'About AED 89 each'],
        ['Physical effort', 'Low', 'High'],
        ['Learning curve', 'Minutes', 'Longer'],
        ['Youngest driver', 'Adult drives, kids ride along', 'Age 6 on kids quads'],
        ['Best for', 'Groups, nervous riders, families', 'Solo, couples, kids who want to drive']
      ]
    },
    faqs: [
      { q: 'Is a dune buggy or quad bike better in Dubai?', a: 'Neither is better, they suit different people. A buggy is easier to be competent in quickly and lets a group ride together. A quad is more physical and more direct. If you are unsure, take the buggy.' },
      { q: 'Which is cheaper?', a: 'For one or two people, a quad, starting at AED 75 against AED 300 for the cheapest buggy. For four people the four seat buggy is cheaper per head at under AED 90 each.' },
      { q: 'Which is safer?', a: 'Both go out with a helmet, a briefing and a guide. A buggy has a roll cage and a harness, which is why we point nervous riders and anyone with back or neck concerns towards it.' },
      { q: 'Can children drive either one?', a: 'Children can drive a kids quad from age six in a fenced area. They cannot drive a buggy, but they can ride as passengers at any age in a two or four seat buggy.' },
      { q: 'Which is harder work?', a: 'The quad, by a distance. You steer with body weight as well as the handlebars. An hour on a quad in Dubai heat is genuine exercise.' },
      { q: 'Can we do both?', a: 'Yes, and plenty of groups do, usually back to back in the same session. Tell us the group and the ages and we will plan the order and price it.' }
    ],
    helpTitle: 'Still cannot decide?',
    helpText: 'Tell us who is riding, the ages and whether anyone is nervous. We will give you a straight recommendation.',
    helpMessage: 'Hi Buggy Rents! Should we book a buggy or quads? Here is our group and ages:',
    helpHref: '/dune-buggy-dubai/', helpLinkLabel: 'See the buggy fleet',
    finalH2: 'Tell us the group and we will pick for you',
    finalLede: 'Ages, numbers and whether anyone has ridden before. That settles it in one message.'
  }
];
