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
dubai at 69.3 on 70. Buggy queries rank two to three times better on comparable terms.

## Why quad is behind, diagnosed 7 Sep 2026

Not weaker content, which is what the numbers above look like at first. Breaking the two
biggest quad queries down by page settles it:

| Query | Page Google shows | Impressions | Position |
|---|---|---|---|
| quad biking dubai | `/quad-bike-rental-dubai/` (301s away) | 99 | 65.9 |
| quad biking dubai | `/` | 16 | 29.9 |
| quad biking dubai | `/quad-bike-dubai/` | does not appear | |
| quad bike rental dubai | `/quad-bike-rental-dubai/` (301s away) | 66 | 63.5 |
| quad bike rental dubai | `/` | 9 | 28.7 |
| quad bike rental dubai | `/quad-bike-dubai/` | 9 | 55.0 |

**The quad pillar is close to invisible for its own head term.** What Google shows instead is
the old WordPress URL, which redirects, and which URL Inspection says was last crawled on
**5 Aug 2026**: five days before the site went live on this domain. Google has been serving a
month-old snapshot of a page that no longer exists.

Three things follow, in the order they matter.

**1. This is the migration, not the content.** Quad is hit hardest because the old quad URL
was the strongest page on the old site: 671 impressions against the old buggy URL's 257. Quad
had the most to lose and lost it. Reindexing was requested for all six URLs, old and new, on
7 Sep 2026.

**2. The new slug dropped the keyword.** `/quad-bike-rental-dubai/` contained the exact
phrase people search. `/quad-bike-dubai/` does not. The same happened to buggy and dirt bike.
Do not "fix" this by migrating the slugs again: a second URL change restarts the clock that
is already most of the problem. Put the words on the page instead.

**3. The page does not speak the language of the queries.** Every high-volume quad query
carries rental or hire: quad bike rental dubai, quad bike hire dubai, quad bike rental uae,
atv rental dubai. The quad pillar uses "rental" four times and "hire" not once, and its title
and h1 say "Quad Biking" and "ATV Desert Tours".

**Buggy is not healthier, it is luckier.** The domain carries both words a buggy searcher
types: buggyrents.com is a brand match for "buggy" and for "rents". Quad gets no such assist
and never will, which is why the same on-page weakness reads as position 25 on buggy terms
and position 65 on quad ones. The homepage was rewritten against this on 7 Sep 2026. The
quad pillar has not been, and that is the next on-page job.

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
