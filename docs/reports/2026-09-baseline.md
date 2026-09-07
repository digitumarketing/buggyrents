# September 2026 baseline

Pulled 6 Sep 2026 from Search Console and GA4, covering roughly the first month on the new
site. This is the number every later report is measured against, so it is written down once
and not re-derived. `docs/SEO-PLAN.md` §7 defines what the monthly report contains.

## Search, 9 Aug to 5 Sep 2026

| | |
|---|---|
| Clicks | 14 |
| Impressions | 2,412 across 321 queries |
| Average CTR | 0.4% |
| Average position | 39.5 |
| Indexed | 47 pages indexed, 43 not indexed |
| Countries | UAE 2,529 impressions, US 115, India 114 |

Search traffic is overwhelmingly UAE, which is the right market. The junk traffic problem
described below exists only in GA4, not in Search.

## The finding that matters most: the migration has not consolidated

Three old WordPress URLs still hold most of the site's impressions, and they rank badly:

| URL | Impressions | Position | Status |
|---|---|---|---|
| `/quad-bike-rental-dubai/` | 671 | 66.0 | 301 to `/quad-bike-dubai/` |
| `/dune-buggy-rental-dubai/` | 257 | 73.6 | 301 to `/dune-buggy-dubai/` |
| `/dirt-bike-rental-dubai/` | 165 | 55.9 | 301 to `/ktm-dirt-bike-dubai/` |

That is **1,093 of 2,412 impressions, 45% of everything the site earns, sitting on URLs that
redirect**. The redirects themselves are correct, verified by hand on 6 Sep. Google simply
has not swapped them for the new URLs a month after launch, and the old ones are being shown
at positions 56 to 74 while the real pages sit almost unseen: `/quad-bike-dubai/` has 81
impressions at position 47.

Nothing in the repo can fix this. It needs URL Inspection and a reindex request on each new
URL, then watching the old ones drop out. Until it resolves, every ranking figure on this
site understates what the pages would do.

## Where the site actually ranks

Position distribution across 321 queries: 39 in the top 10, 19 at 11 to 20, 122 at 21 to 50,
141 beyond 50. The top-10 group is almost entirely one-impression noise.

**Striking distance, 11 to 20 with at least 5 impressions.** Six queries, and this is the
whole list:

| Query | Impressions | Position |
|---|---|---|
| buggy rental near me | 32 | 13.3 |
| dune buggy rental near me | 10 | 17.7 |
| dune buggy rentals dubai | 8 | 12.9 |
| motorbike rental dubai | 8 | 15.9 |
| can am for rent | 5 | 10.6 |
| buggy rent dubai | 5 | 13.6 |

**The bigger prize is the band just behind it.** A tight cluster of near-identical commercial
queries sits at 23 to 30 with real impression volume: buggy rental dubai (142), buggy rentals
dubai (85), buggy rental in dubai (79), dune buggy dubai rental (36), dubai buggy rental
(33), dune buggies for rent (31), rent buggy dubai (31 at 21.3). All of them point at the
same page. Moving that one page from the twenties to page one is worth more than any article
written this quarter.

**Quad is the underperformer.** `CLAUDE.md` §5 records quad as the best
volume-to-difficulty ratio on the site and says it should rank fastest. It does not: quad
biking dubai sits at 60.9 on 115 impressions, quad bike rental dubai at 58.3 on 82, quad bike
dubai at 69.3 on 70. Buggy queries rank two to three times better on comparable terms. The
reason is not known yet and is worth an hour before any new quad content is written.

## GA4, last 28 days

454 sessions, and the channel split is the story:

| Channel | Sessions | Engagement rate | Avg engagement |
|---|---|---|---|
| Direct | 344 (76%) | 12.5% | 9s |
| **AI Assistant** | **55 (12%)** | **70.9%** | **59s** |
| Organic Search | 47 (10%) | 42.6% | 29s |
| Organic Social | 4 | 50% | 2s |

**Direct at nine seconds and 12.5% engagement is not human.** It is bot traffic, and GA4
cannot filter it by country or channel at collection time. The honest denominator for real
visitors this month is roughly 100 sessions, not 454. Report on engaged sessions or exclude
Direct, and say so in the report rather than quietly using the bigger number.

**AI assistants already send more engaged traffic than Google does.** 55 sessions against
organic search's 47, at twice the engagement time. That is a month-one signal on a site with
no llms.txt and no GEO work done yet, and it is the reason the GEO items in
`docs/SEO-PLAN.md` §4.2 are worth pulling forward from October.

Key events read 0 across every channel because lead tracking only went live on 6 Sep. That is
expected, not a fault, and September will be the first month with a lead figure at all.

## What was set up on the day of this baseline

An internal traffic rule for the agency IP `182.186.96.129`, with the Internal Traffic data
filter switched from Testing to **Active**, so agency testing no longer pollutes the client's
reports. That IP is a PTCL connection and may be dynamic: if agency visits start appearing in
reports again, re-check it before assuming the filter is working.
