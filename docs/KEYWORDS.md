# BuggyRents — keyword research and the content work list

**Owner of:** the working keyword pool, what each group is worth, which page owns it,
and what is still unbuilt. `CLAUDE.md` §5 keeps the cluster-level summary and the client
direction; this file keeps the detail and the work list. If the two ever disagree about a
number, this file is newer.

Superseded on 9 Sep 2026: the "30 quick wins at KD ≤ 25" list in `CLAUDE.md` §5 and the
"24 quick-win articles" list in `HANDOVER.md` §5.2. **All eight remaining keywords on that
list are dead** — see §6 below for what happened to each. Do not resurrect them.

---

## 1. Where these numbers came from

DataForSEO Labs, `google/keyword_suggestions/live`, pulled 9 Sep 2026.

| Setting | Value |
|---|---|
| `location_code` | 2784 (United Arab Emirates) |
| `language_code` | en |
| Filter | `keyword_info.search_volume >= 20` |
| Seeds | dune buggy · buggy rental · buggy ride · quad bike · quad biking · atv · dirt bike · desert safari |
| Returned | 1,073 unique keywords, 465 after UAE and product filtering |
| Cost | $0.363 total across nine calls |

**`keyword_ideas` was tried first and thrown away.** It returns keywords from the same
Google Ads *category*, so seeding it with the four service terms produced `dubai mall`
(1.2M) and `sharjah safari` — 10 usable keywords out of 1,000. `keyword_suggestions` does
a full-text match on the seed phrase and is the right endpoint for this site. Do not repeat
that mistake when refreshing.

**Credentials are not in this repo and must never be.** This repo pushes to GitHub. The
DataForSEO login lives outside it; ask the account owner. Refreshing costs about $0.36.

### How to read the table in §2 — this matters

DataForSEO returns every phrasing Google clusters onto one SERP as a separate row carrying
**the same volume**. `desert safari dubai`, `dubai desert safari dubai`, `safari desert
dubai` and fourteen others all report 49,500. **They are one keyword.** So:

- The volume column is the **group's** volume, not a sum of its variants. Summing produces
  the 1.45M figure the raw pool adds up to, which is fiction.
- The variant count is a rough measure of how many ways people phrase it, which is useful
  for on-page copy and useless as demand.
- Two rows in the raw data carry a head volume that clearly belongs to the head term:
  `desert safari location dubai` and `emirates desert safari dubai` both report 49,500.
  The honest figures are 720 and 49,500 respectively. Distrust any long-tail keyword
  reporting exactly the head term's volume.

---

## 2. The pool, grouped by intent

Volume is monthly, UAE. KD is the median across the group's variants.

### Dune buggy

| Intent | Vol | KD | Variants | Owner today | State |
|---|---:|---:|---:|---|---|
| dune buggy dubai (head) | 5,400 | 22 | 16 | `/dune-buggy-dubai/` | owned |
| **buggy rental dubai** | **1,300** | **17** | 15 | `/dune-buggy-dubai/` | **on-page gap** |
| dune buggy tour dubai | 1,300 | 39 | 7 | `/dune-buggy-dubai/` | on-page gap |
| dune buggy ride dubai | 880 | 36 | 11 | `/dune-buggy-dubai/` | on-page gap |
| dune buggy rental dubai | 590 | 35 | — | `/dune-buggy-dubai/` | owned since 8 Sep |
| dune buggy dubai price | 260 | 32 | 3 | `/dune-buggy-dubai/price/` + article | owned |
| self-drive dune buggy dubai | 110 | — | 5 | homepage h1 | owned since 8 Sep |
| best dune buggy dubai | 110 | — | 1 | — | thin, skip |
| abu dhabi / sharjah dune buggy | 90 | 29 | 3 | `/locations/dune-buggy-from-*` | owned |
| 4 seater dune buggy dubai | 70 | — | 1 | buggy model pages | owned |
| dune buggy dubai age limit | 40 | — | 2 | `/dune-buggy-dubai/faq/` | owned |

**`buggy rental dubai` is the single most important line in this file.** It carries more
than twice the volume of `dune buggy rental dubai` (1,300 vs 590) at half the difficulty
(KD 17 vs 35), the domain is literally buggyrents.com, and Search Console already shows
this cluster at positions 23–30 on one page. Nothing else on the site combines that
volume, that difficulty and that much existing signal.

### Quad bike and ATV

| Intent | Vol | KD | Variants | Owner today | State |
|---|---:|---:|---:|---|---|
| quad bike / quad biking dubai (head) | 4,400 | 13 | 33 | `/quad-bike-dubai/` | owned since 8 Sep |
| quad bike rental / hire dubai | 590 | 21 | 21 | `/quad-bike-dubai/` | owned since 8 Sep |
| **quad biking by emirate** | **750** | **0** | 26 | `/locations/dune-buggy-from-*` | **title gap, not a page gap** |
| quad bike tours dubai | 260 | 13 | 15 | `/quad-bike-dubai/` | owned |
| quad bike ride / riding dubai | 260 | 21 | 7 | `/quad-bike-dubai/` | owned |
| quad biking dubai price | 260 | 18 | 12 | `/quad-bike-dubai/price/` + article | owned |
| ATV rental / tours / rides dubai | 260 | 15 | — | `/quad-bike-dubai/` | owned, 8 ATV mentions |
| 1 hour quad biking dubai | 90 | — | 3 | `/quad-bike-dubai/` | partial |
| evening quad biking dubai | 70 | 6 | 1 | — | thin |
| quad biking dubai age / location | 50 | — | 2 | `/quad-bike-dubai/` FAQ | owned |

The by-emirate row is the sum of **separate** SERPs, not variants of one: Abu Dhabi 260,
Sharjah 210, Ajman 110, Ras Al Khaimah 90, Hatta 30, Umm Al Quwain 30, Al Ain 20. **Median
KD 0.**

**Do not build quad versions of the location pages.** The four outer-emirate pages already
serve both services: the h1 reads "Dune Buggy and Quad Pickup from Sharjah", the meta
description names quad, and `src/content/locations/*.json` already lists `quad biking Sharjah`
in its own `keywords` array. A parallel `quad-bike-from-sharjah` page would be a doorway page
against a page we already own — the exact failure `safariPages.ts` was written to avoid.
The one thing missing is the `<title>`, which is built from the CMS `name` field and reads
"Dune Buggy from Sharjah". That is four CMS fields, not four pages.

### KTM and dirt bike

| Intent | Vol | KD | Owner today | State |
|---|---:|---:|---|---|
| dirt bike dubai (head) | 320 | 4 | `/ktm-dirt-bike-dubai/` | owned since 8 Sep |
| dirt bike price in uae | 170 | 0 | `/ktm-dirt-bike-dubai/price/` | owned |
| dirt bike rental dubai | 110 | 19 | `/ktm-dirt-bike-dubai/` | owned since 8 Sep |
| dirt bike uae / abu dhabi | 120 | — | — | not worth a page |

Fresher data, same conclusion as `CLAUDE.md` §5: **the whole cluster is under 600 searches**
and it is already covered. Treat KTM as a conversion asset, not a traffic one. Nothing here
justifies a new page, and this is the second time a plan has been built on this silo looking
empty — see `HANDOVER.md` §5.2.

### Desert safari — long tail only

The client's standing direction is that safari is a Phase 2 expansion and buggy/quad lead.
**That decision is not being re-argued here.** Head terms are listed so the number is on
record, and marked out of scope.

| Intent | Vol | KD | Owner today | State |
|---|---:|---:|---|---|
| desert safari dubai (head) | 49,500 | 26 | `/desert-safari-dubai/` | **out of scope — Phase 2** |
| desert safari in other emirates | 14,800 | 17 | — | **out of scope — we run one camp** |
| desert safari dubai price | 1,600 | 26 | `/desert-safari-dubai/price/` | owned |
| **best desert safari dubai** | **1,300** | **21** | — | **gap — the only real one** |
| vip desert safari dubai | 1,300 | 14 | `/desert-safari-dubai/private-desert-safari/` | owned |
| desert safari deals dubai | 1,000 | 18 | — | gap, but client-dependent |
| desert safari packages dubai | 880 | 18 | `/desert-safari-dubai/` | owned |
| desert safari dubai tickets / booking | 880 | 20 | — | skip, OTA SERP |
| desert safari dubai outfit | 880 | 0 | `what-to-wear-desert-safari-dubai` article | owned |
| morning desert safari dubai | 720 | 4 | `/desert-safari-dubai/morning-desert-safari/` | owned |
| desert safari dubai location | 720 | 0 | `red-dune-desert-safari` | owned, headings gap |
| red dune desert safari dubai | 720 | 14 | `red-dune-desert-safari` | owned |
| desert safari + quad bike dubai | 590 | 10 | `/desert-safari-dubai/quad-bike-desert-safari/` | owned |
| overnight desert safari dubai | 480 | 1 | `/desert-safari-dubai/overnight-desert-safari/` | owned |
| desert safari + dune buggy dubai | 390 | 19 | `/desert-safari-dubai/dune-buggy-desert-safari/` | owned |
| private desert safari dubai | 390 | 22 | `/desert-safari-dubai/private-desert-safari/` | owned |

**The safari long tail is finished.** Fifteen of the sixteen rows above are already built and
live. The 12 Aug build did the job and `src/data/safariPages.ts` explains the rule it used —
one page per *product*, never one per keyword, with four keyword sets deliberately merged into
existing pages to avoid doorway pages. Only `best desert safari dubai` has no owner, and it is
a comparison question rather than a product.

---

## 3. The work list, in order

Ranked by expected leads per hour of work. **Almost all of it is on-page work on pages that
already exist**, which is not what anyone expected going in — the 12 Aug safari build and the
8 Sep pillar rewrites between them already own most of this pool. Four items below were
written as "build a page", then deleted after checking the live site. See §6.

### A. On-page — do these first

1. ~~**`buggy rental dubai` on `/dune-buggy-dubai/`.**~~ **Done 9 Sep 2026.** 1,300 at KD 17,
   against 590 at KD 35 for the longer `dune buggy rental dubai` the 8 Sep rewrite aimed at.
   The domain is literally buggyrents.com and Search Console already had this cluster at
   positions 23–30, so this was a move, not a launch. h1, eyebrow, lede, FAQ lede and the
   long-form intro now carry the short phrase.
2. ~~**`dune buggy tour` and `dune buggy ride` vocabulary on the same page.**~~ **Done 9 Sep
   2026.** 1,300 + 880 at KD 36. The 8 Sep rewrite swung the page hard to "rental" and both
   dropped out, which is the same vocabulary mistake in the opposite direction. Added as a
   long-form block heading and a new FAQ — *"Is this a dune buggy tour or a buggy rental?"* —
   which answers the split honestly instead of stuffing both words in the title.
3. **Four outer-emirate location titles.** 670 searches at median KD 0, for four CMS fields.
   `src/content/locations/dune-buggy-from-{abu-dhabi,sharjah,ajman,ras-al-khaimah}.json`, the
   `name` field, which is what builds the `<title>`. It says "Dune Buggy from Sharjah"; the
   page underneath is already about both services. **Check the crumb and nav rendering before
   changing it** — `name` may feed more than the title.
4. **An H2 carrying the location wording on `red-dune-desert-safari`.** 720 at KD 0–1.
   Already logged as pending; the body answers the question and the headings never use the
   words.
5. **`ATV rental Dubai` and `ATV tours Dubai` as phrases on `/quad-bike-dubai/`.** 260. The
   page mentions ATV eight times and never in those two forms.

### B. The one page worth building

6. **"How to choose a desert safari in Dubai."** `best desert safari dubai`, 1,300 at KD 19–29,
   and the only row in §2 with no owner. Informational and comparison-shaped, which is exactly
   what an assistant fields rather than what an OTA ranks for. The September baseline found AI
   Assistant sessions engaging at **70.9%** against organic's 42.6%, so this is where §4.1 and
   §4.2 of the SEO plan are aimed. Answer it honestly — including when a shared safari beats
   ours — or it reads like every operator's "best" page and gets cited by nothing.

### C. Parked

7. `desert safari deals dubai` (1,000, KD 10) needs a real offers page, and offers are the
   client's to set. Do not build a page that will sit empty.
8. `evening quad biking dubai` (70) and `1 hour quad biking dubai` (90) fold into the quad
   pillar FAQ. Not worth a page each.

### What this list does not contain, and why that matters

No article programme. The plan assumed 8 to 12 pages a month; the research says the pool does
not support it. Between the four clusters there is **one** unowned intent above 500 searches.
Writing to fill a quota from here means writing pages that compete with pages we already rank
with. If September's on-page work moves the buggy and quad clusters, the next real content
decision is the safari head terms — which is a client conversation, not a keyword one.

---

## 4. What is deliberately excluded

- **Desert safari head terms** (49,500) and **other-emirate safari** (14,800 Abu Dhabi,
  2,900 RAK, 2,400 Sharjah). Client direction, and we run one camp in Lahbab.
- **Hummer desert safari** (two keywords on the old list). No Hummer in the fleet. Fails
  the product check in `ARTICLE-PROMPT.md` STEP 0.
- **Electric dirt bike UAE** (110), dirt bike for sale, parts, dealers, registration.
  Not the business.
- **Desert safari tickets** (880). The SERP is OTAs selling tickets; we take bookings by
  WhatsApp and do not sell a ticket product.
- **`best dune buggy dubai`** (110) and **`best quad biking dubai`** (30). Listicle SERPs
  owned by aggregators; a single operator ranking for "best <own product>" is a poor bet.

---

## 5. Refreshing this

Re-pull in January 2027, or sooner if the client adds a service. Same eight seeds, same
endpoint, same filters. Update §2 in place, add a dated line to §1, and update
`CLAUDE.md` §5 only if a cluster total moves enough to change the client direction
conversation. **Do not create a second keyword file** — that is exactly what
`docs/buggyrents-session-handover.md` was deleted for.

---

## 6. What happened to the old list

`CLAUDE.md` §5 named 30 quick wins at KD ≤ 25 and `HANDOVER.md` §5.2 tracked the eight
that were still unwritten. Checked on 9 Sep 2026 against the live site:

| Keyword | Verdict |
|---|---|
| dubai desert safari location (720) | **owned** by `/desert-safari-dubai/red-dune-desert-safari/` — its meta description already answers the intent |
| red dune desert safari dubai (720) | **owned** by the same page, built 12 Aug, after the list was written |
| overnight desert safari dubai (480) | **owned** by `overnight-desert-safari` |
| quad bike desert safari dubai (590) | **owned** by `evening-desert-safari-with-atv` — needs wording, not a page |
| sunrise desert safari dubai | **owned** by `private-morning-desert-safari` |
| dubai desert safari outfit (880) | **duplicate** of the published `what-to-wear-desert-safari-dubai` article |
| vip hummer desert safari dubai | **dead** — no Hummer in the fleet |
| hummer desert safari dubai | **dead** — same |

Every one of them. The list was written before the 12 Aug safari build and nobody
re-checked it against the pages that build produced.

**And then it nearly happened again, in this file, on the day it was written.** The first
draft of §3 called for four new pages: a morning desert safari page, a quad bike desert
safari page, and four quad location pages. Checking the live site before committing:

| First draft said | Actually |
|---|---|
| build a morning desert safari page (720) | `/desert-safari-dubai/morning-desert-safari/` — live, title *Morning Desert Safari Dubai \| Sunrise Dune Bashing* |
| the quad safari terms need wording fixes (590) | `/desert-safari-dubai/quad-bike-desert-safari/` — live, a whole page targeting them |
| build four quad location pages (670) | the four buggy location pages already carry quad in the h1, the description and their own `keywords` array |
| the buggy safari terms are owned by a package (390) | `/desert-safari-dubai/dune-buggy-desert-safari/` — live |

Four out of seven proposed pages, all of them already built. Keyword tools describe the
market; they say nothing about what this site has. **Check the live site before writing from
any list in this repo, including this one.** `ARTICLE-PROMPT.md` STEP 0 exists for exactly
this and it is not optional.
