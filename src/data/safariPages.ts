/* Safari cluster pages — the six child pages under /desert-safari-dubai/.
 *
 * WHY THIS FILE EXISTS
 * Added 12 Aug 2026 after the keyword review. Desert safari holds 96,120 of the
 * 117,560 monthly volume in the research, and the site had two pages against it.
 * The head terms are not the opportunity: four of them carry 63,400 volume at
 * KD 51 to 61 and belong to the OTAs. The opportunity is the long tail at KD 30
 * and under, which is 9,560 a month spread across 36 terms.
 *
 * THE RULE THAT SHAPED THIS FILE
 * One page per PRODUCT, not one page per keyword. Six of the target keywords are
 * synonyms of a package that already exists, and three describe no package at all.
 * A page per keyword would have produced doorway pages, which is the single
 * largest penalty risk on this build. So:
 *
 *   sunrise desert safari  -> merged into the morning page, same product
 *   night desert safari    -> merged into the evening page, same product
 *   atv desert safari      -> merged with quad bike safari, same two packages
 *   deluxe desert safari   -> merged into the private page, same four packages
 *
 * Every page below names at least one real package from src/content/safari.
 * If a package is ever removed in the CMS, `packagesFor` throws at build time
 * rather than rendering a page with an empty price grid.
 *
 * PRICES ARE NEVER WRITTEN AS LITERALS HERE. They are read from the package data,
 * so the price audit can never report a stale figure and the client changing a
 * price in Keystatic updates the copy, the cards, the schema Offer and the
 * WhatsApp message together.
 *
 * IMAGES. The library holds seven safari photos, and no image may repeat within a
 * page. Each page below therefore takes three, chosen so that no two pages carry
 * the same set. That is checked by the image-variety audit, which now covers the
 * safari directory as well as the three vehicle directories. When the client
 * supplies the landscape shots listed in CLAUDE.md section 5b, widen these sets
 * rather than adding pages.
 */

import { allSafaris, type SafariPackage } from '@/data/safari';
import { transfers, payment, policy } from '@/data/extras';
import { buggies, quads, fromPrice } from '@/data/vehicles';
import type { LfBlock } from '@/components/LongFormReader.astro';

export const SAFARI_BASE = '/desert-safari-dubai/';

const buggyFrom = Math.min(...buggies.map(fromPrice));
const quadFrom = Math.min(...quads.map(fromPrice));

/* Look packages up by slug and fail loudly if one has gone. A page whose price
   grid silently empties is worse than a build error: it still ranks, it still
   takes the click, and it shows a booking page with nothing to book. */
function packagesFor(pageSlug: string, slugs: string[]): SafariPackage[] {
  const found = slugs.map(s => {
    const p = allSafaris.find(x => x.slug === s);
    if (!p) {
      throw new Error(
        `Safari page "${pageSlug}" references package "${s}", which no longer exists ` +
        `in src/content/safari/. Either restore it or remove it from safariPages.ts.`
      );
    }
    return p;
  });
  return found;
}

const money = (n: number) => n.toLocaleString('en-US');

export type SafariPageDef = {
  slug: string;
  shortName: string;
  eyebrow: string;
  h1Lead: string; h1Em: string; h1Tail: string;
  title: string; description: string;
  lede: string;
  packageSlugs: string[];
  chips: string[];
  specs: { label: string; value: string }[];
  packagesKicker: string; packagesH2: string; packagesLede: string;
  included: string[]; checkBefore: string[];
  flowH2: string; flowLede: string;
  flow: { h: string; p: string }[];
  whyH2: string; whyLede: string;
  gallery: { image: string; kicker: string; title: string; body?: string }[];
  safety: { label: string; h: string; p: string }[];
  faqs: { q: string; a: string }[];
  related: { tag: string; title: string; desc: string; from: string; href: string; img: string }[];
  guideKicker: string; guideH2: string; guideIntro: string; guideBlocks: LfBlock[];
};

/* Shared sentences. These sit here rather than in each page for the same reason the
   ten location pages share theirs: a correction should be one edit, not six, and six
   copies drift into reading like six different companies inside a year. */
const pickupLine = `${transfers.summary} Outer emirates are quoted before you book.`;
const payLine = `${payment.summary} Nothing is due when you book.`;
const cancelLine = policy.cancellation;

const commonCheck = [
  'Tell us the ages in your group. Children join every package and the camp seats them with you.',
  'Say if anyone is pregnant, has back trouble or gets motion sick, and the driver takes a calmer route.',
  'Flag allergies and dietary needs at booking so the camp knows before the buffet is set.',
  `Confirm your pickup point. ${transfers.summary}`,
  'Ask us to price shared and private side by side if your group is four or more.'
];

export const safariPages: SafariPageDef[] = [
  /* ------------------------------------------------------------------ evening */
  {
    slug: 'evening-desert-safari',
    shortName: 'Evening Safari',
    eyebrow: 'Evening and night safari',
    h1Lead: 'Evening desert safari in Dubai,', h1Em: 'dunes, dinner', h1Tail: 'and the shows',
    title: 'Evening Desert Safari Dubai | Dune Bashing, BBQ and Shows',
    description:
      'Evening and night desert safari in Dubai. Afternoon pickup, dune bashing at Lahbab, camel ride, ' +
      'halal BBQ dinner and live shows. Free Dubai pickup, no deposit.',
    lede:
      'The safari almost everyone means when they say desert safari. Afternoon pickup, dune bashing while ' +
      'the light is still good, then a Bedouin camp for dinner and the shows after dark.',
    packageSlugs: ['evening-desert-safari', 'vip-evening-desert-safari', 'vip-evening-desert-safari-with-atv'],
    chips: ['7 to 8 hours', 'Shared 4x4', 'Free Dubai pickup', 'Dinner and shows included'],
    specs: [
      { label: 'Pickup window', value: 'Around 3pm' },
      { label: 'Back at hotel', value: '9pm to 10pm' },
      { label: 'Dune drive', value: '40 minutes' },
      { label: 'Price basis', value: 'Per person' }
    ],
    packagesKicker: '01 / Choose your evening',
    packagesH2: 'Three evening safaris, and the difference is the camp.',
    packagesLede:
      'The dune drive and the route are the same on all three. What changes is where you sit at the camp, ' +
      'what is on the buffet, and whether a quad ride is bundled in.',
    included: [
      'Hotel pickup and drop-off, free anywhere inside Dubai',
      'Dune bashing in a 4x4 with a trained desert driver',
      'Sunset photo stop on the Lahbab red dunes',
      'Camel ride and sandboarding at the camp',
      'Halal BBQ dinner with vegetarian options always available',
      'Belly dance, tanoura and fire show after dinner',
      'Arabic coffee, dates, shisha and henna at the camp'
    ],
    checkBefore: commonCheck,
    flowH2: 'Afternoon pickup to the drive home.',
    flowLede: 'The evening safari runs 7 to 8 hours door to door. This is how it is sequenced.',
    flow: [
      { h: 'Pickup around 3pm', p: 'A Land Cruiser collects you from your hotel or address. The window shifts through the year because it is timed to sunset, not to the clock.' },
      { h: 'Dune bashing at Lahbab', p: 'Roughly forty minutes across the red dunes with the tyres let down. You are a passenger, which is the entire point of a safari.' },
      { h: 'Sunset photo stop', p: 'The driver parks on a crest while the light is good. This is the photograph people actually keep.' },
      { h: 'Camel ride and sandboarding', p: 'At the camp, both included. Sandboarding is free and the camel ride is short, more a photograph than a journey.' },
      { h: 'Halal BBQ dinner', p: 'Buffet with grills, salads and vegetarian dishes. Seating is on carpets and cushions in the majlis.' },
      { h: 'Shows, then home', p: 'Belly dance, tanoura and fire show under the lights, then the drive back. Most groups are at the hotel between 9 and 10pm.' }
    ],
    whyH2: 'Why the evening one is the safari people mean.',
    whyLede:
      'It carries the whole programme. The morning safari is quieter and shorter, the overnight one adds a ' +
      'night in the camp, but the evening safari is the one with the dune drive, the sunset, the dinner and the shows in a single trip.',
    gallery: [
      { image: 'desert-safari-dubai-dune-bashing-land-cruiser', kicker: 'The drive', title: 'Dune bashing at Lahbab', body: 'Tyres down, a trained driver, and roughly forty minutes of red dunes before the camp.' },
      { image: 'fire-show-desert-safari-camp-dubai', kicker: 'After dinner', title: 'Fire show at the camp' },
      { image: 'belly-dance-show-desert-safari-camp-dubai', kicker: 'The programme', title: 'Belly dance and tanoura' }
    ],
    safety: [
      { label: 'Drivers', h: 'Desert-trained drivers only', p: 'Dune bashing is done by our own drivers on a route they run daily. Guests do not drive on this package.' },
      { label: 'Comfort', h: 'Tell us if it is too much', p: 'Say the word during the drive and the driver flattens the route. Nobody is talked into carrying on.' },
      { label: 'Children', h: 'Children are welcome', p: 'Children join every evening safari and usually enjoy the drive most. Tell us their ages so the camp seats you together.' },
      { label: 'Your own cover', h: 'Check your travel policy', p: 'Check that your travel insurance includes desert sports and off road activities before you travel. Many standard policies exclude them.' }
    ],
    faqs: [
      { q: 'What is the difference between an evening and a night desert safari?', a: 'They are the same trip. The pickup is in the afternoon, the dune drive happens in daylight, and the camp part runs after dark, so it gets described both ways. If you have seen a night desert safari advertised in Dubai, this is the package it means.' },
      { q: 'What time does the evening safari finish?', a: 'Most groups are back at their hotel between 9pm and 10pm. The pickup is timed to sunset rather than to a fixed hour, so both ends of the day shift through the year. We confirm your exact window when you book.' },
      { q: 'Is the price per person or per vehicle?', a: 'The three evening packages on this page are per person, because you share a Land Cruiser with other guests. If you would rather have the vehicle to yourselves, the private safaris are priced per vehicle instead and often work out cheaper for four people or more.' },
      { q: 'Can I do the evening safari without dune bashing?', a: 'Yes. Tell us when you book and the driver takes a calmer route to the camp. Guests who are pregnant, have back problems or simply do not enjoy it take this option regularly, and everything at the camp is unchanged.' },
      { q: 'Is the BBQ dinner halal?', a: 'Yes. Vegetarian dishes are always on the buffet. Tell us about allergies or dietary needs when you book so the camp knows in advance rather than being asked on the night.' },
      { q: 'Do you pick up from the hotel?', a: `${pickupLine} We confirm the pickup point and the window the day before.` },
      { q: 'Do I pay a deposit?', a: `${payLine} ${cancelLine}` }
    ],
    related: [
      { tag: 'Quieter and shorter', title: 'Morning Desert Safari', desc: 'Dawn pickup, dune bashing in the cool, back before lunch.', from: 'See the morning safari', href: `${SAFARI_BASE}morning-desert-safari/`, img: 'camel-ride-desert-safari-dubai' },
      { tag: 'Your own vehicle', title: 'Private Desert Safari', desc: 'Priced per vehicle. Usually cheaper than four shared seats.', from: 'See private options', href: `${SAFARI_BASE}private-desert-safari/`, img: 'private-desert-safari-4x4-dubai-red-dunes' },
      { tag: 'Drive it yourself', title: 'Dune Buggy Dubai', desc: 'Eleven buggies, two and four seats, priced per vehicle.', from: `From AED ${money(buggyFrom)}`, href: '/dune-buggy-dubai/', img: 'dune-buggy-convoy-crossing-dubai-red-dunes' }
    ],
    guideKicker: 'Choosing an evening safari',
    guideH2: 'Which evening package is actually worth the difference',
    guideIntro:
      'The three evening safaris run the same route with the same driver. The money buys camp treatment and, on one of them, a quad ride.',
    guideBlocks: [
      { h: 'The standard evening safari', html: `<p>This is the one most people book and it is the one most people should book. Hotel pickup, the dune drive at Lahbab, the sunset stop, camel ride, sandboarding, the halal BBQ buffet and the full show programme. Nothing on the itinerary is missing compared with the more expensive versions.</p><p>What you get for the lower price is standard camp seating, which means carpets and cushions in the shared majlis with everyone else. For most groups that is the correct answer, and the upgrade money is better spent on a private vehicle if you want one.</p>` },
      { h: 'What the VIP upgrade actually changes', html: `<p>The VIP evening safari buys separate seating away from the main majlis, a longer buffet and the full entertainment programme rather than the short version. The route, the driver and the drive are identical.</p><p>It is worth it if your group wants to eat without sharing a table, or if you are marking something. It is not worth it if what you actually want is a quieter desert, because the camp is the same camp. For quiet, book the morning safari instead.</p>` },
      { h: 'Adding a quad to the evening', html: `<p>The VIP evening safari with quads bundles a quad ride into the camp stop. If riding something yourself is the part you are looking forward to, that bundle is the cheapest way to get both in one evening, and it is covered properly on the <a href="${SAFARI_BASE}quad-bike-desert-safari/">quad bike desert safari page</a>.</p><p>If the driving is the main event rather than an add-on, a <a href="/quad-bike-dubai/">quad from AED ${money(quadFrom)}</a> or a <a href="/dune-buggy-dubai/">buggy from AED ${money(buggyFrom)}</a> on its own gives you far more time on the machine, and both are priced per vehicle.</p>` },
      { h: 'When to book the private version instead', html: `<p>Shared safaris are per person, so a group of six pays six times. Private safaris are per vehicle, so the same six pay once. The maths flips somewhere around four people, and it flips harder the larger the group gets.</p><p>The other reason to go private is control. A private driver works to your pace, waits while you take photographs, and skips the dune drive entirely if someone in the car has had enough. On a shared vehicle you are travelling with five or six strangers and the route is the route. Ask us to price both and pick from the numbers rather than the label.</p>` }
    ]
  },

  /* ------------------------------------------------------------------ morning */
  {
    slug: 'morning-desert-safari',
    shortName: 'Morning Safari',
    eyebrow: 'Morning and sunrise safari',
    h1Lead: 'Morning desert safari in Dubai,', h1Em: 'cooler sand', h1Tail: 'and an empty desert',
    title: 'Morning Desert Safari Dubai | Sunrise Dune Bashing',
    description:
      'Morning and sunrise desert safari in Dubai. Dawn pickup, dune bashing in the cool, camel ride ' +
      'and sandboarding, back before lunch. Private Land Cruiser.',
    lede:
      'Pickup before dawn, dune bashing as the light comes up, and back at the hotel with the rest of the ' +
      'day still ahead of you. In summer it is the only comfortable way to do this.',
    packageSlugs: ['private-morning-desert-safari'],
    chips: ['4 to 5 hours', 'Private Land Cruiser', 'Free Dubai pickup', 'Back before lunch'],
    specs: [
      { label: 'Pickup window', value: 'Before dawn' },
      { label: 'Back at hotel', value: 'Late morning' },
      { label: 'Duration', value: '4 to 5 hours' },
      { label: 'Price basis', value: 'Per vehicle' }
    ],
    packagesKicker: '01 / The morning package',
    packagesH2: 'Morning safaris run private, and here is why.',
    packagesLede:
      'A shared morning safari needs a full vehicle of guests willing to be collected before dawn, which ' +
      'rarely fills. We run the morning as a private Land Cruiser instead, priced per vehicle rather than per head.',
    included: [
      'Private hotel pickup and drop-off, free anywhere inside Dubai',
      'Private Land Cruiser with a desert-trained driver',
      'Morning dune bashing on the Lahbab red dunes',
      'Sunrise photo stop on the dunes',
      'Camel ride and sandboarding',
      'Refreshments during the stop',
      'A route the driver adjusts to your group'
    ],
    checkBefore: [
      'Pickup is genuinely early. Confirm the window the night before and set an alarm.',
      'Bring a layer. Desert mornings are cold in winter even when the afternoon is not.',
      ...commonCheck.slice(1, 4)
    ],
    flowH2: 'Dark pickup to a late breakfast.',
    flowLede: 'Four to five hours door to door, which is roughly half the evening safari.',
    flow: [
      { h: 'Pickup before dawn', p: 'The Land Cruiser collects you in the dark. The exact time moves with sunrise through the year, so we confirm it the day before rather than quoting a fixed hour.' },
      { h: 'Out to Lahbab', p: 'Roughly an hour on the road, and the roads are empty at that time, which is part of why the morning trip is shorter overall.' },
      { h: 'Sunrise on the dunes', p: 'The driver stops on a crest for the light. This is the reason to book the morning rather than the evening, and photographs taken here do not look like anyone else photograph.' },
      { h: 'Morning dune bashing', p: 'The sand is firmer and cooler at this hour, which changes how the vehicle behaves. Drivers generally prefer the morning drive.' },
      { h: 'Camel ride and sandboarding', p: 'Both included, both at a quieter camp than the evening one because far fewer vehicles run this slot.' },
      { h: 'Back by late morning', p: 'Drop-off at your hotel with the day still in front of you. Guests with an evening flight book this one for that reason.' }
    ],
    whyH2: 'Morning or sunrise, and why they are the same booking.',
    whyLede:
      'Sunrise desert safari and morning desert safari describe one trip. The pickup is timed so that you ' +
      'are on the dunes as the sun comes up, so whichever phrase you searched for, this is the package.',
    gallery: [
      { image: 'private-desert-safari-4x4-dubai-red-dunes', kicker: 'The vehicle', title: 'Private Land Cruiser', body: 'The morning safari runs private, so the vehicle and the pace are yours.' },
      { image: 'sandboarding-desert-safari-dubai', kicker: 'At the stop', title: 'Sandboarding on cool sand' },
      { image: 'camel-ride-desert-safari-dubai', kicker: 'Included', title: 'Camel ride at the camp' }
    ],
    safety: [
      { label: 'Temperature', h: 'The summer answer', p: 'Between June and September the afternoon desert is genuinely punishing. The morning safari is the version of this trip that is comfortable in those months.' },
      { label: 'Warmth', h: 'Winter mornings are cold', p: 'December to February the desert before sunrise sits far below what Dubai feels like at midday. Bring a jacket. Guests underestimate this every year.' },
      { label: 'Comfort', h: 'Your pace, your route', p: 'It is a private vehicle, so the driver adjusts. Ask for less dune bashing or more photo stops and that is simply what happens.' },
      { label: 'Your own cover', h: 'Check your travel policy', p: 'Check that your travel insurance includes desert sports and off road activities before you travel. Many standard policies exclude them.' }
    ],
    faqs: [
      { q: 'Is a sunrise desert safari the same as a morning desert safari?', a: 'Yes. Both names describe this trip. Pickup is before dawn so you reach the dunes as the light comes up, which is the point of booking the morning rather than the evening. If you searched for either phrase, this is the package.' },
      { q: 'What time is pickup for the morning safari?', a: 'Before dawn, and the exact time moves through the year because it is set by sunrise rather than the clock. In winter that is later than people expect and in summer it is earlier. We confirm your window the day before.' },
      { q: 'Is the morning safari better than the evening one?', a: 'It is different rather than better. The morning is cooler, quieter and about half the length, and you keep the rest of your day. The evening has the camp programme, the BBQ dinner and the shows. If you want the full Bedouin camp experience, book the evening. If you want the desert itself, book this.' },
      { q: 'Is there a BBQ dinner on the morning safari?', a: 'No. The morning safari includes refreshments at the stop rather than a meal, which is part of why it is shorter and why it ends before lunch. The dinner, the shows and the full camp programme belong to the evening and overnight safaris.' },
      { q: 'Why is the morning safari private rather than shared?', a: 'A shared vehicle needs a full load of guests happy to be collected in the dark, and that rarely fills. Running it private means the trip always goes ahead. It is priced per vehicle rather than per person, so for a group it often costs less than shared seats would have done.' },
      { q: 'Is the morning safari good in summer?', a: 'It is the only version we would recommend in summer. Between June and September the afternoon desert is uncomfortable in a way that spoils the trip, while the same dunes before 9am are genuinely pleasant.' },
      { q: 'Do you pick up from the hotel?', a: `${pickupLine} For the morning safari we confirm the exact window the evening before.` }
    ],
    related: [
      { tag: 'The full programme', title: 'Evening Desert Safari', desc: 'Dune bashing, BBQ dinner and the show programme after dark.', from: 'See evening safaris', href: `${SAFARI_BASE}evening-desert-safari/`, img: 'fire-show-desert-safari-camp-dubai' },
      { tag: 'Sunrise from the camp', title: 'Overnight Desert Safari', desc: 'Sleep in the camp and watch the sun come up from where you are.', from: 'See the overnight', href: `${SAFARI_BASE}overnight-desert-safari/`, img: 'bedouin-camp-majlis-seating-desert-safari-dubai' },
      { tag: 'Drive at dawn', title: 'Dune Buggy Dubai', desc: 'Early buggy slots run in the same cool window, and you drive.', from: `From AED ${money(buggyFrom)}`, href: '/dune-buggy-dubai/', img: 'dune-buggy-sunrise-desert-tour-dubai' }
    ],
    guideKicker: 'Morning versus evening',
    guideH2: 'When the morning safari is the right booking',
    guideIntro:
      'Four things decide it: the month you are visiting, what you want from the desert, how much of your day you can give it, and how many of you there are.',
    guideBlocks: [
      { h: 'The month decides more than anything else', html: `<p>From June to September the afternoon desert is hot in a way that changes the trip. People stop taking photographs, children stop enjoying the camp, and the dune drive becomes something to get through. The same dunes at 6am in July are pleasant.</p><p>From November to March the afternoon is comfortable and the evening safari is the better booking, because the camp programme is worth having and the cold only arrives after sunset. In those months the morning safari is a choice about quiet, not about temperature.</p>` },
      { h: 'What you actually see is different', html: `<p>The evening safari is a camp trip with a dune drive attached. The morning safari is a desert trip with almost nobody else in it. Far fewer vehicles run this slot, so the dunes are unmarked when you arrive and the photographs have no other 4x4 in them.</p><p>If the Bedouin camp, the buffet and the shows are what you pictured, book the evening. If what you pictured was empty sand and light, book this one, and be honest with yourself about which it was.</p>` },
      { h: 'It gives you your day back', html: `<p>The evening safari takes 7 to 8 hours and finishes at 10pm, which realistically ends that day. The morning safari takes 4 to 5 and drops you back before lunch.</p><p>Guests on short trips book the morning for exactly this reason, and so does anyone with a flight that evening. It is also the easier booking to combine with something else: plenty of groups do the morning safari and then take a <a href="/quad-bike-dubai/">quad</a> or a <a href="/dune-buggy-dubai/">buggy</a> later in the week rather than trying to fit both into one day.</p>` },
      { h: 'Per vehicle changes the maths for groups', html: `<p>The morning safari is priced per vehicle rather than per person. For two people that reads as expensive next to a shared evening seat. For six it does not, because six shared seats cost six times and one Land Cruiser costs once.</p><p>So the comparison to make is not the headline number, it is the total for your actual group. Send us the number of people and the date and we will put the morning private total next to the shared evening total so you can see both, rather than guessing from the price that appears first.</p>` }
    ]
  },

  /* ---------------------------------------------------------------- overnight */
  {
    slug: 'overnight-desert-safari',
    shortName: 'Overnight Safari',
    eyebrow: 'Overnight safari',
    h1Lead: 'Overnight desert safari in Dubai,', h1Em: 'a night', h1Tail: 'in the camp',
    title: 'Overnight Desert Safari Dubai | Camp Stay and Sunrise',
    description:
      'Overnight desert safari in Dubai. Dune bashing, halal BBQ dinner, a night in the Bedouin camp, ' +
      'breakfast and sunrise over the dunes. Free Dubai pickup.',
    lede:
      'Everything the evening safari does, and then you stay. Dinner, the shows, a night in the camp and ' +
      'the sun coming up over the dunes before breakfast.',
    packageSlugs: ['overnight-desert-safari'],
    chips: ['16 hours', 'Camp stay included', 'Breakfast included', 'Free Dubai pickup'],
    specs: [
      { label: 'Duration', value: '16 hours' },
      { label: 'Pickup window', value: 'Around 3pm' },
      { label: 'Back at hotel', value: 'Mid morning' },
      { label: 'Price basis', value: 'Per person' }
    ],
    packagesKicker: '01 / The overnight package',
    packagesH2: 'One package, and it runs sixteen hours.',
    packagesLede:
      'The evening programme, a night in the camp and the morning after. Priced per person, and it is the ' +
      'only safari we run where the sunrise is included rather than being a separate booking.',
    included: [
      'Hotel pickup and drop-off, free anywhere inside Dubai',
      'Dune bashing in a 4x4 on the way out',
      'Halal BBQ dinner and the full evening show programme',
      'Overnight stay in the Bedouin camp',
      'Breakfast in the morning',
      'Sunrise over the dunes from the camp',
      'Camp entertainment through the evening'
    ],
    checkBefore: [
      'Do not book this the night before an early flight. It is sixteen hours and it ends mid morning.',
      'Bring warm layers. The camp gets genuinely cold between midnight and dawn, in every season.',
      ...commonCheck.slice(0, 3)
    ],
    flowH2: 'Afternoon pickup to breakfast the next day.',
    flowLede: 'Sixteen hours door to door. The evening half matches the standard evening safari.',
    flow: [
      { h: 'Pickup around 3pm', p: 'Same collection as the evening safari, from your hotel or address anywhere inside Dubai.' },
      { h: 'Dune bashing and sunset', p: 'The drive across the Lahbab red dunes with the sunset photo stop on the way to the camp.' },
      { h: 'Dinner and the shows', p: 'Halal BBQ buffet, then belly dance, tanoura and the fire show under the lights.' },
      { h: 'The camp goes quiet', p: 'Once the day visitors leave, the camp empties and the noise stops. This is the part you actually booked, and it is not on any other package.' },
      { h: 'Sunrise from where you slept', p: 'Light comes up over the dunes with the camp still around you. No pre dawn drive, because you are already there.' },
      { h: 'Breakfast, then home', p: 'Breakfast at the camp and the drive back to your hotel. Most groups are dropped mid morning.' }
    ],
    whyH2: 'What the night actually adds.',
    whyLede:
      'Every other safari leaves the desert when the shows finish. The reason to book this one is the two ' +
      'or three hours after that, when the vehicles have gone and the camp is quiet, and the sunrise you do not have to drive to.',
    gallery: [
      { image: 'bedouin-camp-majlis-seating-desert-safari-dubai', kicker: 'Where you stay', title: 'The Bedouin camp majlis', body: 'Carpets, cushions and low seating. Once the day groups leave it is a different place.' },
      { image: 'belly-dance-show-desert-safari-camp-dubai', kicker: 'The evening', title: 'Shows before the camp empties' },
      { image: 'fire-show-desert-safari-camp-dubai', kicker: 'After dinner', title: 'Fire show under the lights' }
    ],
    safety: [
      { label: 'Cold', h: 'It gets cold, every season', p: 'Desert nights drop hard once the sand stops holding heat. Guests who bring only what they wore in Dubai regret it by 2am. Bring a jacket and something for your feet.' },
      { label: 'Comfort', h: 'Camp sleeping, not a hotel', p: 'You are sleeping in a desert camp on mattresses and cushions in shared tents. It is comfortable and it is not a room. Book it knowing that.' },
      { label: 'Timing', h: 'It ends mid morning', p: 'Sixteen hours means you lose the evening and most of the next morning. It is a poor fit either side of a flight.' },
      { label: 'Your own cover', h: 'Check your travel policy', p: 'Check that your travel insurance includes desert sports and off road activities before you travel. Many standard policies exclude them.' }
    ],
    faqs: [
      { q: 'How long is the overnight desert safari?', a: 'Sixteen hours door to door. Pickup is in the afternoon, around the same time as the evening safari, and drop-off is mid morning the next day after breakfast at the camp.' },
      { q: 'Where do you sleep on an overnight safari?', a: 'In the Bedouin camp, on mattresses and cushions in shared tents. It is comfortable desert camping rather than a hotel room, and it is worth booking with that expectation rather than being surprised by it on the night.' },
      { q: 'Is breakfast included?', a: 'Yes. Breakfast at the camp is included, along with the halal BBQ dinner the evening before and the full show programme. Nothing at the camp costs extra.' },
      { q: 'Does the overnight safari include sunrise?', a: 'Yes, and it is the only package where you do not have to drive to it. You wake up in the camp with the dunes already around you, which is a different thing from the morning safari where the sunrise is reached by a pre dawn drive.' },
      { q: 'Is the overnight safari cold?', a: 'Yes, between midnight and dawn, in every season. The sand releases its heat quickly and the temperature drops much further than anything you will have felt in the city. Bring a jacket and warm socks, and this is the single most common thing guests underestimate.' },
      { q: 'Can I book the overnight safari before a flight?', a: 'We would not recommend it. It runs sixteen hours and ends mid morning, so it takes an evening and most of the following day. If your schedule is tight the morning safari is the better fit at four to five hours.' },
      { q: 'Do I pay a deposit?', a: `${payLine} ${cancelLine}` }
    ],
    related: [
      { tag: 'Same evening, no stay', title: 'Evening Desert Safari', desc: 'Dune bashing, dinner and shows, home by 10pm.', from: 'See evening safaris', href: `${SAFARI_BASE}evening-desert-safari/`, img: 'desert-safari-dubai-dune-bashing-land-cruiser' },
      { tag: 'Sunrise, shorter', title: 'Morning Desert Safari', desc: 'Dawn pickup, four to five hours, back before lunch.', from: 'See the morning safari', href: `${SAFARI_BASE}morning-desert-safari/`, img: 'sandboarding-desert-safari-dubai' },
      { tag: 'Your own vehicle', title: 'Private Desert Safari', desc: 'Per vehicle pricing and a driver who works to your pace.', from: 'See private options', href: `${SAFARI_BASE}private-desert-safari/`, img: 'private-desert-safari-4x4-dubai-red-dunes' }
    ],
    guideKicker: 'Is the overnight worth it',
    guideH2: 'Who should book the overnight safari, and who should not',
    guideIntro:
      'It is the most rewarding safari we run and the easiest one to book for the wrong reasons. Three things decide it.',
    guideBlocks: [
      { h: 'What you are actually paying for', html: `<p>The evening half of this trip is the same evening safari everyone else is on. The dune drive, the sunset, the dinner and the shows are shared with the day groups, and if that were all of it, there would be no reason to pay more.</p><p>What you are buying is what happens after. Around ten o clock the vehicles leave, the camp empties, the music stops, and you are left in the desert with almost nobody in it. That two or three hours is the package. Guests who book it for the sunrise alone usually say afterwards that the quiet was the better half.</p>` },
      { h: 'Be honest about the sleeping', html: `<p>You are sleeping in a desert camp. Mattresses, cushions, shared tents, a shared washroom block. It is clean and comfortable and it is not a hotel, and every complaint we have ever had about this trip came from someone who booked it expecting otherwise.</p><p>It is also cold. Not cool, cold, between midnight and dawn, in every season including summer, because sand loses heat as fast as it takes it. Bring a jacket and warm socks. This is the one piece of advice on this page worth acting on.</p>` },
      { h: 'The sixteen hours are real', html: `<p>Afternoon pickup to mid morning drop-off takes out an evening and most of the next day. On a three or four day Dubai trip that is a significant share of your time, and it is worth deciding deliberately rather than discovering it.</p><p>If the schedule is tight, the <a href="${SAFARI_BASE}morning-desert-safari/">morning safari</a> gives you the desert in four to five hours and hands your day back. If you want the camp programme without the commitment, the <a href="${SAFARI_BASE}evening-desert-safari/">evening safari</a> has all of it and finishes by 10pm.</p>` },
      { h: 'Who it suits best', html: `<p>Couples, photographers and anyone who has done a standard safari before and found it crowded. It is also a good booking for groups who want the desert to be the trip rather than an evening slotted into one.</p><p>It suits families less well, mostly because of the cold and the shared sleeping rather than anything about the desert. Families who want the sunrise are usually better served by the morning safari, and children generally enjoy the evening camp programme more than they enjoy a night in it. Tell us who is coming and we will say honestly which one fits.</p>` }
    ]
  },

  /* --------------------------------------------------------------- quad / atv */
  {
    slug: 'quad-bike-desert-safari',
    shortName: 'Quad Safari',
    eyebrow: 'Quad bike and ATV safari',
    h1Lead: 'Quad bike desert safari in Dubai,', h1Em: 'ride it', h1Tail: 'and be driven',
    title: 'Quad Bike Desert Safari Dubai | ATV Safari with BBQ',
    description:
      'Quad bike and ATV desert safari in Dubai. Dune bashing in a 4x4, your own quad ride at the camp, ' +
      'camel ride, sandboarding and halal BBQ dinner.',
    lede:
      'The safari with a quad built into it. Someone else drives the 4x4 across the dunes, then you get on ' +
      'a quad yourself at the camp before dinner.',
    packageSlugs: ['evening-desert-safari-with-atv', 'vip-evening-desert-safari-with-atv'],
    chips: ['7 to 8 hours', 'Quad ride included', 'Shared 4x4', 'Free Dubai pickup'],
    specs: [
      { label: 'Quad ride', value: 'Included' },
      { label: 'Duration', value: '7 to 8 hours' },
      { label: 'Minimum age', value: 'Quads from 6' },
      { label: 'Price basis', value: 'Per person' }
    ],
    packagesKicker: '01 / Two quad safaris',
    packagesH2: 'Both include a quad. The difference is the camp.',
    packagesLede:
      'ATV and quad bike mean the same machine, and both packages below bundle a ride into the safari. ' +
      'The more expensive one upgrades the seating and the buffet, not the quad.',
    included: [
      'Hotel pickup and drop-off, free anywhere inside Dubai',
      'Dune bashing in a 4x4 with a trained driver',
      'Quad bike ride at the camp with a helmet and a briefing',
      'Camel ride and sandboarding',
      'Halal BBQ dinner with vegetarian options',
      'Camp entertainment through the evening',
      'Arabic coffee, dates and shisha at the camp'
    ],
    checkBefore: [
      'The quad ride is a camp session, not a full tour. If riding is the main event, book a quad tour instead.',
      'Tell us the ages. Quads start at six on the kids machines and the camp matches the bike to the rider.',
      ...commonCheck.slice(1, 4)
    ],
    flowH2: 'Pickup, dune drive, then your turn.',
    flowLede: 'The safari runs as normal and the quad session sits inside it, at the camp.',
    flow: [
      { h: 'Pickup around 3pm', p: 'Collection from your hotel or address, free anywhere inside Dubai.' },
      { h: 'Dune bashing at Lahbab', p: 'Forty minutes across the red dunes with the driver working. You are a passenger for this part.' },
      { h: 'Briefing at the camp', p: 'Helmet on, controls explained, and a short flat run before anyone opens the throttle. Nobody rides untrained.' },
      { h: 'Your quad session', p: 'Your ride on the marked area beside the camp. A guide rides with the group rather than watching from the side.' },
      { h: 'Camel ride and sandboarding', p: 'Both included, both after the quads while dinner is being set.' },
      { h: 'Dinner and the shows', p: 'Halal BBQ buffet then the show programme, and back to the hotel between 9 and 10pm.' }
    ],
    whyH2: 'Quad bike safari or ATV safari, one booking.',
    whyLede:
      'ATV stands for all terrain vehicle, which is the same four wheeled machine people call a quad. ' +
      'Both phrases return this page and both describe the two packages above.',
    gallery: [
      { image: 'quad-bike-sunset-desert-safari-dubai', kicker: 'Your session', title: 'Quads at the camp', body: 'Helmet, briefing and a guide riding with the group rather than watching it.' },
      { image: 'desert-safari-dubai-dune-bashing-land-cruiser', kicker: 'The drive out', title: 'Dune bashing in the 4x4' },
      { image: 'sandboarding-desert-safari-dubai', kicker: 'Also included', title: 'Sandboarding at the camp' }
    ],
    safety: [
      { label: 'Briefing', h: 'Nobody rides untrained', p: 'Every rider gets a helmet, a controls briefing and a flat run before the marked area opens. That applies whether you have ridden before or not.' },
      { label: 'Children', h: 'Quads start at six', p: 'The kids machines run from age six on the fenced area. Older children move up as the guide judges the rider rather than the birthday.' },
      { label: 'Expectations', h: 'It is a session, not a tour', p: 'The quad part is a ride at the camp, not an open desert route. If time on the machine is what you want, book a quad tour and add a safari to it instead.' },
      { label: 'Your own cover', h: 'Check your travel policy', p: 'Check that your travel insurance includes desert sports and off road activities before you travel. Many standard policies exclude them.' }
    ],
    faqs: [
      { q: 'Is an ATV safari the same as a quad bike safari?', a: 'Yes. ATV stands for all terrain vehicle and it is the same four wheeled machine that everyone in Dubai calls a quad. The two packages on this page are what both phrases mean, and you do not need to choose between the terms when you book.' },
      { q: 'How long do I actually get on the quad?', a: 'It is a session at the camp rather than a tour, so think of it as a ride rather than an hour of riding. If time on the machine is the point of your trip, book a quad tour on its own, where the routes run from 30 minutes to 4 hours and you are in open desert rather than beside the camp.' },
      { q: 'Do I need experience to ride the quad?', a: 'No. Every rider gets a helmet, a controls briefing and a short flat run before the riding area opens, and a guide rides with the group. Most guests on this package have never been on a quad before.' },
      { q: 'Can children ride the quad?', a: 'Yes. The kids machines start at age six and the camp matches the bike to the rider rather than going by the birthday alone. Tell us the ages when you book so the right machines are ready.' },
      { q: 'Which of the two quad safaris should I book?', a: 'The quad ride is the same on both. The more expensive package upgrades the camp seating and the buffet, so pay the difference if you want to eat away from the main majlis, and do not pay it expecting more time on the quad.' },
      { q: 'Can I book a quad tour and a safari separately instead?', a: 'Yes, and for anyone who mainly wants to ride, that is the better answer. A quad and safari combination starts at AED 200 for a 30 minute ride and AED 300 for an hour, which buys far more saddle time than the camp session does.' },
      { q: 'Do you pick up from the hotel?', a: `${pickupLine} We confirm the pickup point and window the day before.` }
    ],
    related: [
      { tag: 'Ride properly', title: 'Quad Biking Dubai', desc: 'Six quads, kids from six, routes from 30 minutes to 4 hours.', from: `From AED ${money(quadFrom)}`, href: '/quad-bike-dubai/', img: 'quad-biking-dubai-open-desert-three-riders' },
      { tag: 'Drive a buggy instead', title: 'Buggy Desert Safari', desc: 'Same idea with a dune buggy rather than a quad.', from: 'See buggy safaris', href: `${SAFARI_BASE}dune-buggy-desert-safari/`, img: 'camel-ride-desert-safari-dubai' },
      { tag: 'No riding', title: 'Evening Desert Safari', desc: 'The standard evening safari without a machine attached.', from: 'See evening safaris', href: `${SAFARI_BASE}evening-desert-safari/`, img: 'belly-dance-show-desert-safari-camp-dubai' }
    ],
    guideKicker: 'Quad plus safari',
    guideH2: 'Whether to bundle the quad or book it properly',
    guideIntro:
      'This is the single most common mistake on this part of the site, and it is worth two minutes before you book.',
    guideBlocks: [
      { h: 'What the bundled quad ride actually is', html: `<p>The quad on these packages is a session at the camp. You get a helmet, a briefing and a ride on the marked area beside the Bedouin camp, with a guide riding along. It is real riding and beginners enjoy it, and it is not an open desert route.</p><p>Booked with the right expectation it is excellent value, because you are getting a safari, a dinner, the shows and a first go on a quad in one evening for one price. Booked expecting an hour in open sand it disappoints, every time.</p>` },
      { h: 'When to book the quad separately instead', html: `<p>If the riding is the reason you are going to the desert, book a <a href="/quad-bike-dubai/">quad tour</a> and treat the safari as the add-on rather than the other way round. Routes run from 30 minutes to 4 hours, the open desert tiers leave the fenced area entirely, and the machines go up to a Yamaha Raptor 700cc.</p><p>The combination pricing makes this easy: a quad with a safari starts at AED 200 for a 30 minute ride and AED 300 for an hour. That is a small step up from the bundled packages and it buys a completely different amount of time on the machine.</p>` },
      { h: 'Mixed groups are the real use case', html: `<p>Where these packages genuinely earn their place is a group that does not agree. One person wants to ride, three want to be driven, and nobody wants to split the evening in two.</p><p>These bundles solve that. Everyone shares the 4x4, everyone eats together, and the person who wanted to ride gets to ride, without anyone booking two trips or waiting around. Tell us the split in your group and we will price it both ways.</p>` },
      { h: 'Or take the buggy version', html: `<p>The same idea exists with a dune buggy instead of a quad, and it is covered on the <a href="${SAFARI_BASE}dune-buggy-desert-safari/">buggy desert safari page</a>. A buggy seats two or four with a roll cage and a steering wheel, so it suits couples and families who want to be in the same machine rather than on separate quads.</p><p>The quad is more physical and more exposed, which some people want and some people find out the hard way. If you are unsure which suits your group, send us the ages and who wants to drive, and we will tell you which of the two we would put you in.</p>` }
    ]
  },

  /* ------------------------------------------------------------------ private */
  {
    slug: 'private-desert-safari',
    shortName: 'Private Safari',
    eyebrow: 'Private and VIP safari',
    h1Lead: 'Private desert safari in Dubai,', h1Em: 'your vehicle', h1Tail: 'and your pace',
    title: 'Private Desert Safari Dubai | VIP Land Cruiser Packages',
    description:
      'Private and VIP desert safari in Dubai, priced per vehicle rather than per person. Your own Land ' +
      'Cruiser or mini bus, an adjustable route and halal BBQ dinner.',
    lede:
      'The vehicle is yours. Priced per vehicle rather than per head, which flips the maths the moment your ' +
      'group reaches four, and buys a driver who works to your pace rather than a fixed route.',
    packageSlugs: [
      'couple-vip-evening-desert-safari',
      'private-evening-desert-safari',
      'private-morning-desert-safari',
      'desert-safari-private-land-cruiser',
      'evening-safari-by-private-mini-bus',
      'private-safari-with-4-seater-buggy'
    ],
    chips: ['Per vehicle pricing', 'Up to 12 guests', 'Route adjusts to you', 'Free Dubai pickup'],
    specs: [
      { label: 'Price basis', value: 'Per vehicle' },
      { label: 'Vehicle', value: 'Land Cruiser or bus' },
      { label: 'Group size', value: 'Up to 12' },
      { label: 'Route', value: 'Adjustable' }
    ],
    packagesKicker: '01 / Private packages',
    packagesH2: 'Six private safaris, every one priced per vehicle.',
    packagesLede:
      'Read these totals against your whole group rather than against a per person price. One vehicle costs ' +
      'once no matter how many of you are in it, which is the entire reason to book private.',
    included: [
      'Private hotel pickup and drop-off, free anywhere inside Dubai',
      'Your own vehicle and driver for the whole trip',
      'A dune route the driver adjusts to your group',
      'Camel ride and sandboarding',
      'Halal BBQ dinner on the evening packages',
      'Camp entertainment on the evening packages',
      'No sharing with other guests at any point of the drive'
    ],
    checkBefore: [
      'Give us the exact head count. It changes which vehicle we send and whether the bus is cheaper.',
      'Say whether you want less dune bashing or more photo stops. On a private vehicle that is simply arranged.',
      ...commonCheck.slice(1, 4)
    ],
    flowH2: 'The same desert, on your terms.',
    flowLede: 'The route matches the evening or morning safari. What changes is who else is in the car.',
    flow: [
      { h: 'Private pickup', p: 'Your vehicle collects only your group, from your hotel or address. No collecting four other parties on the way out.' },
      { h: 'A route that adjusts', p: 'Tell the driver you want more dune bashing, less of it, or a longer stop for photographs, and that is what happens.' },
      { h: 'Photo stops on your schedule', p: 'The single biggest difference guests notice. On a shared vehicle the stop lasts as long as it lasts.' },
      { h: 'Camel ride and sandboarding', p: 'Included as standard on the private packages, at the camp.' },
      { h: 'Dinner, on the evening packages', p: 'Halal BBQ buffet and the camp programme. The morning package has refreshments instead and ends before lunch.' },
      { h: 'Straight home', p: 'Back to your hotel directly rather than after four other drop-offs, which on a shared safari is often the longest part of the night.' }
    ],
    whyH2: 'Private, VIP and deluxe, and what the words mean here.',
    whyLede:
      'VIP and deluxe usually describe camp treatment on a shared vehicle. Private describes the vehicle ' +
      'itself. They are different purchases and they are frequently confused, so every card above says which one it is.',
    gallery: [
      { image: 'private-desert-safari-4x4-dubai-red-dunes', kicker: 'The vehicle', title: 'Your own Land Cruiser', body: 'Priced per vehicle. For six people that is one price rather than six.' },
      { image: 'bedouin-camp-majlis-seating-desert-safari-dubai', kicker: 'At the camp', title: 'Seating away from the main majlis' },
      { image: 'desert-safari-dubai-dune-bashing-land-cruiser', kicker: 'The drive', title: 'A route the driver adjusts' }
    ],
    safety: [
      { label: 'Control', h: 'You can stop the drive', p: 'On a private vehicle, if someone in your group has had enough of the dunes, the drive changes immediately. On a shared one it does not.' },
      { label: 'Groups', h: 'Twelve is the ceiling', p: 'The mini bus takes 10 to 12. Above that we run more than one vehicle, and the pricing is worth asking about rather than assuming.' },
      { label: 'Children', h: 'Better for young children', p: 'A private vehicle means your own pace, your own stops and no waiting on strangers. Families with small children consistently find this the easier booking.' },
      { label: 'Your own cover', h: 'Check your travel policy', p: 'Check that your travel insurance includes desert sports and off road activities before you travel. Many standard policies exclude them.' }
    ],
    faqs: [
      { q: 'Is a private desert safari worth the extra cost?', a: 'It depends entirely on your group size, because private is priced per vehicle and shared is priced per person. For two people shared is cheaper. Somewhere around four the totals cross, and above that private is usually both cheaper and better. Send us your head count and we will put the two totals side by side.' },
      { q: 'What is the difference between VIP and private?', a: 'VIP normally describes camp treatment, better seating and a longer buffet, while you still share the vehicle with other guests. Private describes the vehicle itself. They are different purchases, and this is the most common confusion on safari bookings in Dubai. Every card on this page states which one it is.' },
      { q: 'How many people fit in a private safari?', a: 'A Land Cruiser takes six to seven, and the private mini bus takes ten to twelve. The buggy package is built around four. Above twelve we run more than one vehicle, so tell us the number and we will price the right combination rather than you guessing.' },
      { q: 'Can I change the route on a private safari?', a: 'Yes, and it is the main reason to book one. Ask for less dune bashing, more photo stops, a slower drive or a longer time at the camp, and the driver simply does it. On a shared vehicle the route is fixed because five other guests booked the same one.' },
      { q: 'Is there a private morning safari?', a: 'Yes, and the morning safari only runs private. It is four to five hours with a dawn pickup, sunrise on the dunes, camel ride and sandboarding, and refreshments rather than a BBQ dinner. It is covered in full on the morning safari page.' },
      { q: 'Can we add a buggy to a private safari?', a: 'Yes. One of the packages above includes a four seater dune buggy session alongside the private 4x4, which suits a family who want both the driven experience and a turn at driving. The buggy safari page explains how that works.' },
      { q: 'Do I pay a deposit?', a: `${payLine} ${cancelLine}` }
    ],
    related: [
      { tag: 'Shared and cheaper', title: 'Evening Desert Safari', desc: 'Per person pricing. The better answer for one or two people.', from: 'See evening safaris', href: `${SAFARI_BASE}evening-desert-safari/`, img: 'fire-show-desert-safari-camp-dubai' },
      { tag: 'Private and shorter', title: 'Morning Desert Safari', desc: 'Dawn pickup, four to five hours, private Land Cruiser.', from: 'See the morning safari', href: `${SAFARI_BASE}morning-desert-safari/`, img: 'camel-ride-desert-safari-dubai' },
      { tag: 'Corporate and groups', title: 'Talk to the team', desc: 'Above twelve guests we price the vehicle combination for you.', from: 'Group bookings', href: '/contact/', img: 'sandboarding-desert-safari-dubai' }
    ],
    guideKicker: 'Private or shared',
    guideH2: 'Working out whether private is actually cheaper for you',
    guideIntro:
      'This page has the only piece of arithmetic on the site that reliably changes what people book. It is worth doing before you choose.',
    guideBlocks: [
      { h: 'The two prices are not comparable as printed', html: `<p>A shared safari price is what one person pays. A private safari price is what the whole vehicle costs. Put next to each other on a screen, the shared number always looks better and frequently is not.</p><p>The only comparison that means anything is the total for your actual group. Multiply the shared price by the number of people travelling, then read the private price as it stands. For two people shared wins comfortably. By four the gap has closed. By six or seven the private vehicle is usually the cheaper booking outright, and it is also the better one.</p>` },
      { h: 'What you get beyond the arithmetic', html: `<p>Even where the totals are close, the private vehicle buys things the shared one cannot. The pickup collects only you rather than working through four hotels. The photo stop lasts as long as you want it to. If a child has had enough of the dune drive, the drive changes.</p><p>The drop-off matters more than people expect. On a shared safari you are returned in whatever order suits the route, and being the last stop can add a long time to an evening that already ran to 10pm. A private vehicle takes you straight back.</p>` },
      { h: 'VIP is a different purchase entirely', html: `<p>This is where bookings go wrong. VIP and deluxe packages in Dubai almost always mean better camp seating and a longer buffet while you are still sharing the 4x4 with other guests. Private means the vehicle is yours and says nothing about the camp.</p><p>If what is bothering you is sharing a table, buy VIP. If what is bothering you is sharing a car, buy private. Buying VIP hoping to solve the second problem is the most common mistake we see, and every card on this page names which of the two it is so that it does not happen here.</p>` },
      { h: 'Groups above seven, and adding a buggy', html: `<p>A Land Cruiser tops out at six or seven. Beyond that the private mini bus takes ten to twelve, and above twelve we run more than one vehicle. Large groups should always ask rather than assume, because the combination that costs least is rarely the one that looks obvious from a price list.</p><p>One private package includes a four seater <a href="/dune-buggy-dubai/">dune buggy</a> session alongside the 4x4, which is the answer for a family where some want to drive and some want to be driven. The <a href="${SAFARI_BASE}dune-buggy-desert-safari/">buggy safari page</a> covers that in full, and you can also add a <a href="/quad-bike-dubai/">quad</a> to any private booking.</p>` }
    ]
  },

  /* -------------------------------------------------------------- buggy combo */
  {
    slug: 'dune-buggy-desert-safari',
    shortName: 'Buggy Safari',
    eyebrow: 'Dune buggy and safari',
    h1Lead: 'Dune buggy desert safari in Dubai,', h1Em: 'drive it', h1Tail: 'then be driven',
    title: 'Dune Buggy Desert Safari Dubai | Buggy and BBQ Combo',
    description:
      'Dune buggy and desert safari combined in Dubai. Self-drive buggy session, dune bashing in a 4x4, ' +
      'camel ride, sandboarding and halal BBQ dinner.',
    lede:
      'A buggy session and a full safari in one evening. You drive the buggy yourself, then hand the desert ' +
      'back to a driver for the dune bashing, dinner and the shows.',
    packageSlugs: ['evening-desert-safari-with-dune-buggy', 'private-safari-with-4-seater-buggy'],
    chips: ['Self-drive buggy', '7 to 8 hours', 'Dinner included', 'Free Dubai pickup'],
    specs: [
      { label: 'Buggy session', value: 'Included' },
      { label: 'Duration', value: '7 to 8 hours' },
      { label: 'Minimum age', value: 'Drivers from 14' },
      { label: 'Price basis', value: 'Per vehicle' }
    ],
    packagesKicker: '01 / Two buggy safaris',
    packagesH2: 'One shared, one private, both with a buggy in them.',
    packagesLede:
      'Both packages are priced for the vehicle rather than per head, which is unusual on the shared side and ' +
      'is worth noticing when you compare them with a per person safari.',
    included: [
      'Hotel pickup and drop-off, free anywhere inside Dubai',
      'Self-drive dune buggy session with helmet and briefing',
      'Dune bashing in a 4x4 with a trained driver',
      'Camel ride and sandboarding',
      'Halal BBQ dinner with vegetarian options',
      'Camp entertainment through the evening',
      'A lead guide with the buggy for the whole session'
    ],
    checkBefore: [
      'Drivers are 14 and over. Younger children ride as passengers in the four seater.',
      'Say how many want to drive. It decides whether the two seater or the four seater is right.',
      ...commonCheck.slice(1, 4)
    ],
    flowH2: 'Drive first, then dinner.',
    flowLede: 'The buggy session sits at the front of the evening while the light is still good.',
    flow: [
      { h: 'Pickup around 3pm', p: 'Collection from your hotel or address, free anywhere inside Dubai.' },
      { h: 'Briefing and helmets', p: 'Controls, harnesses and the route explained at the base. A flat run first, then the dunes open up.' },
      { h: 'Your buggy session', p: 'You drive, with a lead guide ahead and the group behind. This is the part you are paying the premium for.' },
      { h: 'Hand it back', p: 'The buggy goes back and you get into the 4x4 for the dune bashing, which is a different sensation entirely because now somebody else is working.' },
      { h: 'Camel ride and sandboarding', p: 'At the camp, both included, while dinner is being set.' },
      { h: 'Dinner and the shows', p: 'Halal BBQ buffet, the show programme, then the drive back between 9 and 10pm.' }
    ],
    whyH2: 'Why doing both in one evening works.',
    whyLede:
      'Driving and being driven are genuinely different experiences of the same desert, and most groups who ' +
      'book one end up wanting the other. Doing both in one evening costs less than two separate trips and takes one evening rather than two.',
    gallery: [
      { image: 'sandboarding-desert-safari-dubai', kicker: 'At the camp', title: 'Sandboarding before dinner', body: 'Included on both packages, along with the camel ride.' },
      { image: 'camel-ride-desert-safari-dubai', kicker: 'Included', title: 'Camel ride at the camp' },
      { image: 'private-desert-safari-4x4-dubai-red-dunes', kicker: 'The second half', title: 'Dune bashing, driven' }
    ],
    safety: [
      { label: 'Age', h: 'Drivers from 14', p: 'Fourteen and over may drive. Younger children ride as passengers, and the four seater is the package that makes that work for a family.' },
      { label: 'Briefing', h: 'Nothing moves until it is done', p: 'Harnesses checked, controls explained and a flat run before the route opens. A guide leads the whole session rather than following it.' },
      { label: 'Screening', h: 'We watch the first few minutes', p: 'The guide watches control on flat sand before the route opens. Anyone not ready is moved into the 4x4 for the rest, and the camp programme is unchanged.' },
      { label: 'Your own cover', h: 'Check your travel policy', p: 'Check that your travel insurance includes desert sports and off road activities before you travel. Many standard policies exclude them.' }
    ],
    faqs: [
      { q: 'Do I drive the buggy myself on this package?', a: 'Yes. The buggy session is self-drive with a helmet, a full briefing and a lead guide riding ahead of the group. The dune bashing later in the evening is the part where a trained driver takes over and you are a passenger.' },
      { q: 'What is the minimum age to drive the buggy?', a: 'Fourteen. Younger children ride as passengers, which is why the four seater package exists and why it is usually the right one for a family. Tell us the ages when you book so the correct machine is ready.' },
      { q: 'How long is the buggy session?', a: 'It is a session at the front of the evening rather than a full tour, so if driving is the main event you will get considerably more time by booking a buggy tour on its own, where routes run from 30 minutes up to 4 hours.' },
      { q: 'Is this cheaper than booking a buggy and a safari separately?', a: 'Usually, and it also takes one evening rather than two. What it does not do is give you as much time in the buggy as a dedicated tour would, so the right choice depends on whether the driving or the whole evening is what you came for.' },
      { q: 'What is the difference between the two buggy safaris?', a: 'One is a shared 4x4 with a buggy session included, and one is a fully private 4x4 with a four seater buggy. The private one suits families and groups who want their own vehicle for the safari half as well, and it is priced per vehicle throughout.' },
      { q: 'Can we do this with a quad instead of a buggy?', a: 'Yes, and the quad versions are on the quad bike desert safari page. A quad is more physical and more exposed, while a buggy seats two or four with a roll cage and a steering wheel, which is why families usually prefer the buggy.' },
      { q: 'Do you pick up from the hotel?', a: `${pickupLine} We confirm the pickup point and window the day before.` }
    ],
    related: [
      { tag: 'Drive properly', title: 'Dune Buggy Dubai', desc: 'Eleven buggies, two and four seats, 30 minutes to 4 hours.', from: `From AED ${money(buggyFrom)}`, href: '/dune-buggy-dubai/', img: 'can-am-maverick-x3-4-seater-desert-tour-dubai' },
      { tag: 'Quad instead', title: 'Quad Bike Desert Safari', desc: 'Same idea with a quad. More physical, more exposed.', from: 'See quad safaris', href: `${SAFARI_BASE}quad-bike-desert-safari/`, img: 'quad-bike-sunset-desert-safari-dubai' },
      { tag: 'Your own vehicle', title: 'Private Desert Safari', desc: 'Per vehicle pricing across six private packages.', from: 'See private options', href: `${SAFARI_BASE}private-desert-safari/`, img: 'bedouin-camp-majlis-seating-desert-safari-dubai' }
    ],
    guideKicker: 'Buggy plus safari',
    guideH2: 'Whether to combine them or book the buggy properly',
    guideIntro:
      'The combination is excellent value and it is not the right booking for everyone. The deciding question is which half of the evening you actually came for.',
    guideBlocks: [
      { h: 'What the buggy session gives you', html: `<p>A real self-drive session with a helmet, a proper briefing and a guide leading the group, at the front of the evening while the light is good. For most guests it is their first time in a buggy and it is plenty.</p><p>It is a session rather than a tour. A dedicated <a href="/dune-buggy-dubai/">buggy tour</a> runs from 30 minutes to 4 hours with the whole route to yourself, and the difference in time on the machine is significant. If the driving is why you are going to the desert, book the tour and treat dinner as the add-on.</p>` },
      { h: 'Two seater or four seater', html: `<p>The shared package puts you in a buggy, and the private package is built around a four seater. That difference matters more than the price gap suggests.</p><p>Drivers must be 14, so a family with younger children needs the four seater for everyone to be in the same machine. Two adults who both want to drive are better served by two seats and taking turns. Tell us the ages and who wants the wheel and we will tell you which package to take.</p>` },
      { h: 'Driving and being driven are not the same thing', html: `<p>People assume the dune bashing will feel like a slower version of the buggy. It does not. In the buggy you are managing the machine and the sand and you notice very little else. In the 4x4 you have nothing to do but watch, and the dunes look considerably steeper from the passenger seat.</p><p>That contrast is the actual argument for this package. Groups who book only one of the two almost always say afterwards that they wish they had done both, and doing them in one evening costs less than doing them on two days.</p>` },
      { h: 'When to book them separately anyway', html: `<p>Book separately if you want serious time in the buggy, if your group is large enough that a private 4x4 changes the safari maths, or if you would rather spread two good evenings across a week than compress them into one long one.</p><p>Separately also gives you more control over the machine. The dedicated tours cover eleven buggies from a two seater Polaris up to a Can-Am Maverick R, while the combination packages use what suits the evening. If a specific machine matters to you, book the <a href="/dune-buggy-dubai/">buggy tour</a> and add a <a href="${SAFARI_BASE}evening-desert-safari/">safari</a> to it.</p>` }
    ]
  }
];

/* Resolve the packages once, at module load, so a broken slug fails the build
   rather than one page. */
export const safariPackagesByPage: Record<string, SafariPackage[]> = Object.fromEntries(
  safariPages.map(p => [p.slug, packagesFor(p.slug, p.packageSlugs)])
);

export function safariPageFromPrice(slug: string): number {
  return Math.min(...safariPackagesByPage[slug].map(p => p.price));
}
