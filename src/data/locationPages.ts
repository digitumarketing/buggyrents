import type { LocationData } from '@/components/templates/Location.astro';
import { locations, type Location } from '@/data/locations';
import { buggies, quads, dirtbikes, fromPrice } from '@/data/vehicles';
import { safariFromPrice } from '@/data/safari';
import { transfers, policy, payment } from '@/data/extras';
import { site } from '@/data/site';
import { pageTitle, tidy } from '@/data/seo';

const inDubai = (l: Location) => l.emirate === 'Dubai';

export function locationData(l: Location): LocationData {
  const free = inDubai(l);
  const transferLine = free
    ? 'Free hotel pickup and drop-off, included in every booking.'
    : `Transfer from ${l.short} is quoted with the booking, before you pay anything.`;

  return {
    slug: l.slug, name: l.name, short: l.short, emirate: l.emirate, drive: l.drive,
    title: pageTitle(`${l.name} | ${l.drive} to Lahbab`),
    description: tidy(`${l.drive} from ${l.short} to the Lahbab red dunes. Buggy, quad and desert safari with ${free ? 'free' : 'quoted'} pickup. Per vehicle from AED ${fromPrice(quads[0])}.`),
    heroImage: 'desert-adventure-dubai-hero-canam-maverick',
    finalImage: 'dune-buggy-dubai-hero-red-dunes',
    kicker: free ? 'Dubai pickup planning' : 'Outer emirate pickup planning',
    h1Lead: 'Dune Buggy and Quad Pickup from', h1Em: l.short,
    lede: `${l.intro} Prices are per vehicle rather than per person, and ${free ? 'pickup within Dubai costs nothing' : 'the transfer is quoted before you pay'}.`,
    chips: [l.drive, free ? 'Free pickup' : 'Transfer quoted', 'Lahbab red dunes', 'Open 24/7'],
    panel: {
      kicker: 'Pickup route',
      title: `${l.short} to Lahbab`,
      sub: free
        ? 'Pickup and return are included, and confirmed on WhatsApp before the day.'
        : 'Transfer and return timing are quoted before payment.',
      points: [
        `Share the exact hotel, tower, villa or lobby in ${l.short} before the day.`,
        `Allow ${l.drive} each way to the Al Awir base on the Dubai-Hatta road.`,
        'Pickup point, route and driver contact are confirmed through WhatsApp.'
      ]
    },
    /* Matches the reference stats strip: area, desert, transfer, WhatsApp. */
    stats: [
      { label: 'Area', value: l.short, sub: free ? 'Dubai' : `${l.emirate}, outer emirate` },
      { label: 'Main desert', value: 'Lahbab', sub: 'Red-dune activity zone southeast of Dubai' },
      { label: 'Transfer', value: free ? 'Free' : 'Quote', sub: free ? 'Included in every booking' : 'Quoted before payment' },
      { label: 'WhatsApp', value: 'Current', sub: site.phone }
    ],
    fitH2: `${l.short} works best when the pickup point is confirmed first.`,
    fitIntro: `${l.short} bookings run smoothly when the exact pickup address is agreed before the day. Hotel lobbies, residence towers and villa gates all look similar to a driver arriving at 3pm, so a pinned location saves the most time.`,
    fitPoints: [
      `Send a map pin or the full address, not just the area name. ${l.short} covers a lot of ground.`,
      `Allow ${l.drive} each way. Fridays and public holidays run longer.`,
      transferLine,
      free
        ? 'Self-drive is also fine. There is parking at the Al Awir base and we send directions after confirmation.'
        : 'Self-drive is often the better option from here. We send directions to the Al Awir base after confirmation.'
    ],
    activities: [
      { tag: `Quad, from AED ${fromPrice(quads[0])}`, title: 'Quad Bike Dubai',
        desc: 'Six quads split by riding area, from a fenced kids zone to open-desert Raptor runs.',
        href: '/quad-bike-dubai/', img: quads[3].image },
      { tag: `Buggy, from AED ${fromPrice(buggies[0])}`, title: 'Dune Buggy Dubai',
        desc: 'Eleven self-drive buggies from Polaris RZR through to the Can-Am Maverick R.',
        href: '/dune-buggy-dubai/', img: buggies[0].image },
      { tag: `Safari, from AED ${safariFromPrice}`, title: 'Desert Safari Dubai',
        desc: 'Someone else drives. Dune bashing, sunset stop and a Bedouin BBQ camp dinner.',
        href: '/desert-safari-dubai-deals/', img: 'desert-safari-dubai-dune-bashing-land-cruiser' },
      { tag: `Dirt bike, from AED ${fromPrice(dirtbikes[0])}`, title: 'KTM Dirt Bike Dubai',
        desc: 'A 450cc desert enduro for riders who can already work a clutch and gears.',
        href: '/ktm-dirt-bike-dubai/', img: dirtbikes[0].image }
    ],
    flow: [
      { label: 'Before booking', h: `Send your ${l.short} location`, p: 'A map pin, hotel name or full address so the driver knows exactly where to stop.' },
      { label: 'Booking check', h: 'Choose activity and time', p: 'We confirm availability for the vehicle and duration you want, and the total in AED.' },
      { label: 'Confirmation', h: 'Slot held, nothing paid', p: policy.deposit },
      { label: 'On the day', h: `Pickup from ${l.short}`, p: `Allow ${l.drive} to the Al Awir base at the edge of the Lahbab red dunes.` },
      { label: 'At the base', h: 'Briefing, then ride', p: 'Helmet fitting, safety briefing and a warm-up on flat sand before the dune route starts.' }
    ],
    checksH2: `Confirm these before leaving ${l.short}.`,
    checksLede: 'A two-minute WhatsApp check keeps the pickup point, rider ages, timing and total price agreed before anyone travels.',
    checks: [
      { tag: 'Pickup', h: 'Exact pickup point', p: `${l.short} has multiple towers, gates and lobbies. A map pin removes the guesswork.` },
      { tag: 'Timing', h: 'Departure window', p: `Allow ${l.drive} each way. Late-afternoon slots give the best light in the dunes.` },
      { tag: 'Riders', h: 'Ages in the group', p: 'Minimum age varies by vehicle: 6 for the kids quad area, 18 for a buggy or the Raptor 700.' },
      { tag: 'Total', h: 'Price agreed upfront', p: `${transferLine} ${payment.summary}` }
    ],
    faqChips: [free ? 'Free pickup' : 'Transfer quote', l.drive, 'Per vehicle pricing'],
    faqs: [
      { q: `Is pickup available from ${l.short}?`, a: free
          ? `Yes, and it is free. Hotel pickup and drop-off within Dubai is included in every booking. Send your ${l.short} address or a map pin when you book.`
          : `Yes. ${l.short} is outside Dubai, so the transfer is quoted with the booking rather than included. You will always see the total before paying anything.` },
      { q: `How long is the drive from ${l.short}?`, a: `Around ${l.drive} each way to our Al Awir base on the Dubai-Hatta road. Allow longer on Friday afternoons and public holidays.` },
      { q: `Which activity suits a trip from ${l.short}?`, a: l.drive.includes('9') || l.drive.includes('8') || l.emirate !== 'Dubai'
          ? `Given the drive, book at least an hour. A 30-minute session rarely justifies the travel time from ${l.short}. Many guests pair a buggy or quad session with an evening safari to make one trip out of it.`
          : `Anything works from ${l.short} given the short drive. First-timers do well on a Polaris RZR buggy or a boundary-area quad; experienced riders take the Can-Am or the Raptor 700.` },
      { q: 'Can I drive myself instead?', a: `Yes. There is parking at the Al Awir base and we send directions after confirmation. From ${l.short} that is roughly ${l.drive}.` },
      { q: 'Is the price per person or per vehicle?', a: 'Per vehicle. A 2-seater buggy at AED 300 covers two people, and a 4-seater at AED 350 covers four. Only shared desert safaris are priced per person.' },
      { q: 'How and when do I pay?', a: payment.detail },
      { q: 'What if I need to cancel?', a: policy.cancellation },
      { q: 'What happens if the weather turns?', a: policy.weather }
    ],
    nearby: [],
    guideKicker: `${l.short} guide`,
    guideH2: `Booking a desert ride from ${l.short}: drive times, transfers and what to confirm`,
    guideIntro: `Everything worth knowing before booking a <strong>dune buggy or quad bike from ${l.short}</strong>: how long the drive really takes, whether pickup is free, which activity suits the journey, and what to agree before you travel.`,
    guideBlocks: [
      { h: `Getting from ${l.short} to the red dunes`,
        html: `<p class="lf-lead">${l.intro}</p><p>Our base sits on the Dubai-Hatta road at Al Awir, at the edge of the <span class="pill">Lahbab red dunes</span>. From ${l.short} that is roughly <span class="pill">${l.drive}</span> each way in normal traffic.</p><p>${free ? 'Hotel pickup and drop-off within Dubai is free on every booking, whatever you spend. Send a map pin rather than just the area name so the driver stops in the right place first time.' : `${l.short} is outside Dubai, so the transfer is quoted with your booking. You see the total before paying anything, and there are no surprises at the base.`}</p>` },
      { h: 'Which activity is worth the journey',
        html: `<p class="lf-lead">The drive should shape the booking, not just the budget.</p><p>If you are travelling ${l.drive}, book at least an hour. A 30-minute taster works when the base is nearby, but from ${l.short} the travel time outweighs the ride.</p><p>The <a href="/quad-bike-dubai/">quad fleet</a> starts at AED ${fromPrice(quads[0])} and splits by riding area rather than model. The <a href="/dune-buggy-dubai/">buggies</a> start at AED ${fromPrice(buggies[0])} and carry two or four people for one price, which is usually the cheapest way to move a group.</p>` },
      { h: 'What to agree before you travel',
        html: `<p class="lf-lead">Four things, and all of them take one WhatsApp message.</p><ul><li>The exact pickup address or map pin, not just "${l.short}".</li><li>Rider ages, because minimum age varies from 6 to 18 depending on the machine.</li><li>The vehicle and duration, so we can hold the right slot.</li><li>The total in AED, ${free ? 'which includes free Dubai pickup' : 'including the transfer from ' + l.short}.</li></ul>` },
      { h: 'Timing, weather and the best slot',
        html: `<p class="lf-lead">Late afternoon is the pick from ${l.short}.</p><p>You leave after the worst of the heat, ride as the light turns, and the red dunes photograph at their best in the last hour before sunset. October to April is the most comfortable season; May to September works with early-morning slots.</p><p>${policy.weather}</p>` },
      { h: 'Payment and cancellation',
        html: `<p class="lf-lead">Nothing is due when you book.</p><p>${payment.detail}</p><p>${policy.cancellation} ${policy.deposit}</p>` }
    ],
    finalH2: `Ready to confirm pickup from ${l.short}?`,
    finalLede: `Send your ${l.short} address, date, group size and which vehicle you want. We reply with availability and the total in AED, usually within a few minutes.`
  };
}

/* Nearby links: three closest by drive time, plus the pickup hub. */
export function withNearby(l: Location): LocationData {
  const d = locationData(l);
  const mins = (s: string) => parseInt(s) || 60;
  const others = locations.filter(x => x.slug !== l.slug)
    .sort((a, b) => Math.abs(mins(a.drive) - mins(l.drive)) - Math.abs(mins(b.drive) - mins(l.drive)))
    .slice(0, 3);
  d.nearby = [
    ...others.map(o => ({ tag: 'Nearby pickup', title: o.name,
      desc: `${o.drive} to the same Lahbab base, with the same fleet and terms.`,
      href: `/locations/${o.slug}/` })),
    { tag: 'Prices', title: 'Dune Buggy Dubai Price', desc: 'Every buggy and duration on one page, per vehicle.', href: '/dune-buggy-dubai/price/' }
  ];
  return d;
}
