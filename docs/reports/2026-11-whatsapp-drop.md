# The early-November WhatsApp drop, investigated 18 Nov 2026

The client reported real guest messages until 3 to 4 Nov and few after. GA4 key events
(`whatsapp_click`, `call_click`), 21 Oct to 3 Nov against 4 Nov to 17 Nov:

| Segment | Leads before | Leads after | Sessions before | Sessions after |
|---|---:|---:|---:|---:|
| UAE, AI Assistant | 17 | 15 | 36 | 25 |
| UAE, Organic Search | 11 | 9 | 29 | 30 |
| UAE, Referral | 8 | 6 | 15 | 12 |
| **UAE, Direct** | **14** | **2** | 25 | 11 |
| Outside UAE, all channels | 18 | 16 | 119 | 168 |
| Outside UAE, Direct | 3 | 2 | 54 | 100 |

## What it means

**Nothing on the site broke.** Every commit between 28 Oct and 8 Nov was read: none touches
the WhatsApp links, the phone links, the GTM container or anything country-specific, and the
links were checked live on 10 Nov. Organic, AI Assistant and Referral leads held level.

**The whole drop is UAE Direct**, 14 leads to 2. Direct means no referrer: a typed URL, a link
shared on WhatsApp or opened in an app's built-in browser. Nothing in this repo can move that
channel, and GA4 cannot say where those visitors came from. Several of the October clicks were
repeat clicks in one session from the homepage (23 Oct, 2 sessions, 4 clicks), which is what a
person comparing options on their phone looks like, and also what the client's own staff
checking the site looks like. Ask the client whether anyone at the business shared the site
link or ran promotions in late October.

**Outside-UAE Direct doubled with almost no engagement**, 54 sessions to 100 at about 10%
engaged. That is bot or junk traffic. It inflates sessions and drags the reported lead rate
down without adding leads, so the monthly report should state the lead rate on engaged
sessions as well as on all sessions.

The earlier reading (foreign clicks fell after 4 Nov) came from WhatsApp clicks alone over a
shorter window. Over two full fortnights, foreign leads are flat.
