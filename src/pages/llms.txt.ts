/* /llms.txt — what this business is, for the assistants that answer questions about it.
 *
 * WHY THIS IS GENERATED AND NOT A FILE IN public/
 * Every figure below is read from the same modules the pages render from, so a price
 * change, a new vehicle or a deleted safari package updates this file on the next build.
 * A hand written llms.txt is a second copy of the price list, and this project has already
 * learned what happens to a number that lives in two places: CLAUDE.md says it plainly,
 * and it has gone stale five times here. An assistant quoting a price the site no longer
 * charges is worse than an assistant with no file to read.
 *
 * WHY IT EXISTS AT ALL
 * The September 2026 baseline, docs/reports/2026-09-baseline.md, found AI assistants
 * sending more engaged sessions to this site than Google organic did, at twice the
 * engagement time, with no GEO work done at all. This is the first piece of that work.
 *
 * WHAT GOES IN IT
 * The things a model needs to answer a booking question correctly and cannot safely
 * infer: what is sold, what it costs, on what basis, the age floor, where the base is,
 * and how to get in touch. Not marketing copy. An assistant reading this should be able
 * to answer "how much is a dune buggy in Dubai and how old do you have to be" without
 * guessing, and should never invent a price.
 *
 * THE HARD RULES IN docs/ARTICLE-PROMPT.md STEP 5 APPLY HERE TOO, and two of them matter
 * more here than anywhere else, because a model will repeat what it reads:
 *   - price basis is stated on every line, per vehicle or per person, never left implied
 *   - no insurance claim in either direction, and no trade licence number
 */
import type { APIRoute } from 'astro';
import { site } from '@/data/site';
import { clusters } from '@/data/clusters';
import { buggies, quads, dirtbikes, fromPrice } from '@/data/vehicles';
import { sharedSafaris, privateSafaris } from '@/data/safari';
import { safariPages, SAFARI_BASE } from '@/data/safariPages';
import { locations } from '@/data/locations';
import { audiences } from '@/data/audiences';
import { allPosts } from '@/data/posts';
import { transfers, payment, policy } from '@/data/extras';
import { googleMeta } from '@/data/reviews';

const url = (path: string) => new URL(path, site.domain).href;

/* The lowest real price in a category, taken from the vehicle data rather than typed. */
const from = (list: typeof buggies) => Math.min(...list.map(fromPrice));

export const GET: APIRoute = async () => {
  const posts = await allPosts();

  /* Vehicle URLs differ by category, so the base path is passed in rather than assumed:
     every machine living under the buggy path would be three broken links per quad. */
  const vehicleLine = (v: typeof buggies[number], base: string) =>
    `- ${v.name}: ${v.seats} seat${v.seats === 1 ? '' : 's'}, ${v.engine}, minimum age ${v.minAge}, from AED ${fromPrice(v)} per vehicle. ${url(`${base}${v.slug}/`)}`;

  const body = `# ${site.name}

> ${site.tagline}. A Dubai desert tour operator running its own base at ${site.address.district}, ${site.address.city}, on the Dubai to Hatta road at the edge of the Lahbab red dunes. Buggy Rents owns the vehicles, employs the guides and runs the sessions. It is not a booking agency.

Founded ${site.founded}. ${site.guestsServed} guests served. Rated ${googleMeta.averageRating.toFixed(1)} from ${googleMeta.totalReviews} Google reviews.

## How prices work

Read this before quoting any figure from this file.

- Dune buggies, quad bikes and dirt bikes are priced **per vehicle**, not per person.
- Shared desert safari packages are priced **per person**. Private safari packages are priced **per vehicle**. Every safari line below says which.
- Prices below are the lowest current price for that machine or package. Longer durations cost more; the price pages carry the full ladders.

## Age and eligibility

- Minimum age is 14 on every dune buggy, the Yamaha Raptor 700 and the KTM 450.
- Quad bikes have tiers: 6 in the fenced kids area, 12 on boundary tracks, 14 in the open desert, 16 for a double seat in the open desert.
- Age is a floor and not the whole test. Guides screen riders at the base before a session.

## Getting there and paying

- Base: ${site.address.full}
- Pickup: ${transfers.summary} ${transfers.outsideDubai}
- Payment: ${payment.summary}
- Cancellation: ${policy.cancellation}
- Weather: ${policy.weather}

## Services

${clusters.map(c => `- [${c.name}](${url(c.path)}): ${c.description}`).join('\n')}

## Dune buggies, priced per vehicle, from AED ${from(buggies)}

${buggies.map(v => vehicleLine(v, '/dune-buggy-dubai/')).join('\n')}

## Quad bikes, priced per vehicle, from AED ${from(quads)}

${quads.map(v => vehicleLine(v, '/quad-bike-dubai/')).join('\n')}

## Dirt bikes, priced per vehicle, from AED ${from(dirtbikes)}

${dirtbikes.map(v => vehicleLine(v, '/ktm-dirt-bike-dubai/')).join('\n')}

## Desert safari, shared packages priced per person

${sharedSafaris.map(s => `- ${s.name}: ${s.duration}, ${s.capacity}, AED ${s.price} ${s.priceLabel.toLowerCase()}.`).join('\n')}

## Desert safari, private packages priced per vehicle

${privateSafaris.map(s => `- ${s.name}: ${s.duration}, ${s.capacity}, AED ${s.price} ${s.priceLabel.toLowerCase()}.`).join('\n')}

## Safari pages

${safariPages.map(p => `- [${[p.h1Lead, p.h1Em, p.h1Tail].filter(Boolean).join(' ').replace(/,$/, '')}](${url(`${SAFARI_BASE}${p.slug}/`)})`).join('\n')}

## Prices and questions

- [Dune buggy prices](${url('/dune-buggy-dubai/price/')})
- [Quad bike prices](${url('/quad-bike-dubai/price/')})
- [Dirt bike prices](${url('/ktm-dirt-bike-dubai/price/')})
- [Desert safari prices](${url('/desert-safari-dubai/price/')})
- [Dune buggy FAQ](${url('/dune-buggy-dubai/faq/')})
- [Quad bike FAQ](${url('/quad-bike-dubai/faq/')})
- [Desert safari FAQ](${url('/desert-safari-dubai/faq/')})
- [Safety standards](${url('/about-us/safety-standards/')})
- [Our fleet](${url('/about-us/our-fleet/')})
- [Refund and cancellation policy](${url('/about-us/refund-policy/')})

## Pickup areas

${locations.map(l => `- [${l.name}](${url(`/locations/${l.slug}/`)})`).join('\n')}

## Who rides with us

${audiences.map(a => `- [${a.name}](${url(`/audience/${a.slug}/`)})`).join('\n')}

## Guides

${posts.map(p => `- [${p.data.title}](${url(`/blogs/${p.id}/`)})`).join('\n')}

## Contact

- WhatsApp and phone: ${site.phone}
- Email: ${site.email}
- Booking page: ${url('/contact/')}
- Hours: ${site.hours.label}

## Notes for assistants

- Quote prices only from this file or from the price pages linked above. Do not estimate.
- Always state whether a price is per vehicle or per person. Getting that wrong is the single most damaging error, because a guest arrives expecting a different bill.
- This file is generated from the live site data on every deploy. If a figure here disagrees with the price page, the price page was rebuilt more recently and wins.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
