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

---

## First re-measure, 17 Sep 2026 — nine days after the vocabulary rewrite

The on-page rewrites landed 8 Sep. This is the first read with enough days behind it to mean
anything, and it is early: treat direction as the signal and levels as noise.

| | Baseline, 9 Aug – 5 Sep | Last 28 days, 19 Aug – 15 Sep | Last 7 days, 9 – 15 Sep |
|---|---:|---:|---:|
| Clicks | 14 | 14 | 4 |
| Impressions | 2,412 | 3,590 | 882 |
| CTR | 0.4% | 0.4% | 0.5% |
| Average position | 39.5 | 31.3 | **25.3** |

Impressions per day went 86 to 128. Average position improved 8 places on the like-for-like
28-day window and 14 places on the trailing week. **Clicks did not move, and that is the
expected reading, not a failure**: the buggy rental cluster sits at positions 22 to 30, which
is page three. Do not let anyone read flat clicks as a flat month, and do not promise clicks
before those terms cross into the top ten.

### The migration is consolidating

Old pre-launch URLs held **1,093 of 2,412 impressions (45%)** at baseline. On the last 28 days
they hold **858 of 3,590 (24%)**: `/quad-bike-rental-dubai/` 498, `/dune-buggy-rental-dubai/`
187, `/dirt-bike-rental-dubai/` 173. The reindex requests of 8 Sep are working.

The homepage is now the strongest page on the site at **1,531 impressions and 7 clicks**, which
it was not at baseline. It is absorbing the buggy rental queries rather than the pillar doing
it, which follows from its title being rewritten to lead with "Dune Buggy Rental Dubai".

### Query positions, 3 Aug – 15 Sep

| Query | Impressions | Position |
|---|---:|---:|
| buggy rental dubai | 228 | 22.4 |
| quad biking dubai | 173 | 62.1 |
| dune buggy rental dubai | 163 | 27.5 |
| buggy rentals dubai | 136 | 23.5 |
| quad bike rental dubai | 136 | 55.9 |
| buggy rental in dubai | 110 | 27.5 |
| quad bike dubai | 105 | 69.7 |
| atv rental dubai | 82 | 52.2 |
| buggy rental near me | 48 | 14.9 |
| dune buggies for rent | 51 | 26.8 |

Two things to carry forward. **The whole buggy rental cluster is 22 to 30 and quad is 52 to
70**, which is the same split the 7 Sep diagnosis predicted and is a reason to spend the next
on-page effort on quad. And `atv rental dubai` at 82 impressions confirms the ATV vocabulary
gap in `docs/KEYWORDS.md` §2 was real; the FAQ answering it shipped 17 Sep, so that line is
the cleanest before-and-after available next month.

### GA4, last 7 days to 16 Sep

93 active users, 556 events, 0 key events (key events were only marked on 17 Sep and **are
not backfilled**). Sessions by channel: Direct 61, **AI Assistant 29**, Organic Search 12,
Unassigned 4, Organic Video 1. By source: `chatgpt.com / ai-assistant` 29 against
`google / organic` 7 and `search.google.com / referral` 5.

**ChatGPT is sending more than twice what Google organic is.** That was true at baseline and
it is still true, which makes it a pattern rather than a spike, and it is the argument for the
GEO work in `docs/SEO-PLAN.md` §4.2 being funded as more than a side bet.

---

## Lead events, first real read, 19 Sep 2026

Prompted by the client reporting three or four WhatsApp enquiries. Checked in GA4 Reports,
Events, because the raw events have fired since 7 Sep even though key-event marking only
started on 17 Sep and does not backfill.

| Event | 28 days, 22 Aug – 18 Sep | 7 days, 12 – 18 Sep |
|---|---|---|
| `whatsapp_click` | 45 events, **28 users** | 19 events, **13 users** |
| `call_click` | 8 events, **1 user** | none |
| `email_click` | 7 events, **1 user** | none |
| `generate_lead` | 7 events, **1 user** | none |

**The client's three or four enquiries are confirmed and consistent.** 13 people opened
WhatsApp in the last seven days. Three or four of those turning into a real conversation is a
normal share of taps, and it is the first independent confirmation that the tracking built on
5 to 7 Sep reports something true.

**Read `whatsapp_click` as intent, never as an enquiry.** It fires when the link is tapped,
not when a message is sent. The monthly report must say so, or the client will compare 45 to
the number of people who actually messaged him and conclude the tracking is broken.

### The other three events are our own test clicks, not traffic

`call_click`, `email_click` and `generate_lead` each show seven or eight events from exactly
**one user**, all on 6 Sep, and nothing since. That is the annotated test session. Corrected
for it, **every real lead on this site in 28 days came through WhatsApp and none came through
the phone number, the email link or the contact form.**

That is worth acting on rather than noting. The contact form is the only lead path that
captures a name and a request in writing, and it has produced nothing in a month.

### Which channels produce the leads, and it is not organic yet

`Lead acquisition` by first user channel, 12 to 18 Sep. User key event rate:

| Channel | User key event rate |
|---|---|
| **AI Assistant** | **10.53%** |
| Direct | 3.08% |
| All users | 4.76% |
| Organic Search | does not appear |

**Organic Search has produced no key events yet.** Two caveats before anyone reports that:
key events were marked on 17 Sep and are not backfilled, so this is effectively two days of
data, and Organic Search is a small share of sessions to begin with. Directional, not
conclusive.

What is not ambiguous is the ratio. **AI Assistant converts at more than three times Direct**,
which is the third separate measurement pointing the same way after the two channel readings
in this file. The GEO work in `docs/SEO-PLAN.md` §4.2 is not a side bet on this site.

The honest position for the September report: **the site is producing leads, the leads are
real, and they are not yet coming from Google organic.** That is expected at positions 22 to
30 and it is exactly what the position work is for, but it has to be said plainly rather than
letting the client read WhatsApp volume as SEO results.

## Indexing, 19 Sep 2026

Search Console Overview: **85 indexed pages, 70 not indexed.** At baseline on 7 Sep it was
**47 indexed and 43 not**. The site has 83 pages, so "indexed" here includes old pre-launch
URLs that Google still holds alongside the current ones.

The direction is what matters: indexed coverage has nearly doubled in twelve days, which is
the reindex requests of 8 Sep and the new content landing. The 70 not-indexed figure is not
alarming on a domain this age and is mostly "Discovered, currently not indexed", which
resolves on its own as the site accumulates signals.

**Request Indexing was not run on the eight new articles.** Search Console's inspection
interface would not accept input from the browser session on 19 Sep; three approaches were
tried and abandoned rather than forced. The articles are in `sitemap-index.xml`, linked from
`/blogs/` and cross-linked to each other, so discovery happens without it. Request Indexing
is a nudge that saves days rather than a requirement, and the per-URL quota is about ten a
day, so it is two minutes of clicking whenever someone is in the console.
