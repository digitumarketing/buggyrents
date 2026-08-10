import { defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';

/* Headings need stable ids because the article page builds its table of contents
   from them, and every "In this guide" link is an anchor to one. Markdoc does not
   add ids on its own, so the slug is derived from the heading text here, once,
   rather than in the template. Same slug rule as the old hand-written section ids,
   so existing links and anchors keep working.

   Nothing else is overridden. The client writes normal prose in the CMS editor and
   gets the same markup the hand-written HTML produced. */
const slugify = s =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const text = children =>
  (Array.isArray(children) ? children : [children])
    .map(c => (typeof c === 'string' ? c : text(c?.children ?? '')))
    .join('');

export default defineMarkdocConfig({
  nodes: {
    heading: {
      ...nodes.heading,
      transform(node, config) {
        const base = nodes.heading.transform(node, config);
        const level = node.attributes.level;
        const label = text(base.children);
        return { ...base, name: `h${level}`, attributes: { ...base.attributes, id: slugify(label) } };
      }
    }
  }
});
