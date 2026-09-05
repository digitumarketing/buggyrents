/* The four service clusters, in one place.
 *
 * Until now the four pillar roots existed only as prose: in CLAUDE.md §6b, in the
 * article prompt's internal-link list, and in the navigation JSON the client edits.
 * Nothing in code could enumerate them, so the sitewide schema had no way to state
 * what this business actually sells without becoming a fifth copy of the same list.
 *
 * This file is that single owner. The schema's hasOfferCatalog reads it, and the
 * llms.txt planned in docs/SEO-PLAN.md §4.2 reads the same list rather than
 * restating it. Adding a cluster means adding it here and nowhere else.
 *
 * `path` is a path and not an absolute URL, so it survives a domain change and it is
 * the same string the link audit resolves against dist.
 *
 * Descriptions carry no prices. Price basis differs by cluster and is stated instead,
 * because getting that wrong is the one content error CLAUDE.md treats as unforgivable.
 */
export type Cluster = {
  key: 'buggy' | 'quad' | 'dirtbike' | 'safari';
  name: string;
  path: string;
  description: string;
};

export const clusters: Cluster[] = [
  {
    key: 'buggy',
    name: 'Dune buggy hire in Dubai',
    path: '/dune-buggy-dubai/',
    description: 'Self-drive dune buggies in the Lahbab red dunes, priced per vehicle.'
  },
  {
    key: 'quad',
    name: 'Quad biking in Dubai',
    path: '/quad-bike-dubai/',
    description: 'Quad and ATV rides on boundary tracks and in the open desert, priced per vehicle.'
  },
  {
    key: 'dirtbike',
    name: 'KTM dirt bike hire in Dubai',
    path: '/ktm-dirt-bike-dubai/',
    description: 'KTM dirt bikes for screened riders, priced per vehicle.'
  },
  {
    key: 'safari',
    name: 'Desert safari in Dubai',
    path: '/desert-safari-dubai/',
    description: 'Desert safari packages. Shared packages are priced per person, private ones per vehicle.'
  }
];
