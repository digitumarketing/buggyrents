# Vendored skills — inhouseseo/superseo-skills

Source: https://github.com/inhouseseo/superseo-skills
Revision: see `REVISION` in this folder. Licence: Apache 2.0, `LICENSE` alongside it.

**These folders are upstream property. Do not edit them.** A local edit makes the next
`git pull` from upstream a merge conflict on a file nobody remembers changing, and it
breaks the one thing vendoring buys: that the folder is exactly what upstream published.
If one of them is wrong for this site, say so in `docs/SEO-PLAN.md` or in the
`buggyrents-article` skill, both of which are ours, and leave the vendored copy alone.

To update: re-clone upstream, copy the seven folders over, and bump `REVISION`.

## What was taken, and why

| Skill | Why it is here |
|---|---|
| `page-audit` | The on-page pass for a page already ranking 11 to 20. Needs no exports. |
| `semantic-gap-analysis` | The highest-value one for this project: what a page at 11 to 20 is missing against the pages above it. |
| `featured-snippet-optimizer` | AEO. Answer blocks that can win a snippet or an AI Overview citation. |
| `eeat-audit` | This site's EEAT gaps are known and open, see `docs/HANDOVER.md` §6. |
| `linkbuilding` | There is no link strategy at all, and citations and OTA listings are an open blocker. |
| `expert-interview` | The client owns the vehicles, employs the guides and runs the sessions. First-party detail is the one thing competitors cannot copy, and it has never been extracted. |
| `write-content` | Taken for its `references/` only, chiefly `anti-slop-ruleset.md` and `geo-optimization.md`. See precedence below. |

## What was deliberately left behind

| Skill | Why not |
|---|---|
| `content-brief`, `improve-content` | Both are article masters. This repo already has one, `buggyrents-article`, and it carries the cannibalisation check, the hard rules that fail the build and the Markdoc delivery format. A second master is the exact failure this project keeps hitting. |
| `keyword-deep-dive` | Would re-derive volume and difficulty figures that `CLAUDE.md` §5 already owns from six Semrush exports. A number in two places is wrong in one of them. |
| `topic-cluster-planning` | The cluster architecture is built and its reasoning is recorded in `CLAUDE.md` §6b, including which keywords were deliberately merged rather than given a page. Re-planning it would re-open a settled decision. |

## Precedence, when two skills disagree

For anything published to buggyrents.com, **`buggyrents-article` wins.** It is the only
skill that knows the hard rules, and a breach of those fails the build rather than the
review. `write-content` is a prose-quality reference underneath it, not an alternative
to it: use its anti-slop ruleset and its GEO notes, ignore its delivery format.
