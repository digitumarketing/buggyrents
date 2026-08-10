/* Astro content collections.
 *
 * Only the blog lives here. Everything else the CMS owns is plain JSON read through
 * import.meta.glob, because it is structured data rather than prose and never needs
 * a rich text editor.
 *
 * Blog articles are different: the client has to be able to WRITE them, which means
 * headings, bold, links and lists in an editor rather than HTML typed into a
 * textarea. That is what Markdoc gives us, and Markdoc files have to be read through
 * a collection so Astro can render the body.
 *
 * The schema below mirrors the fields in keystatic.config.ts. Keystatic validates on
 * save and this validates at build time, so a malformed article is caught twice.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    category: z.enum(['buggy', 'quad', 'safari', 'planning']),
    subject: z.enum(['buggy', 'quad', 'dirtbike', 'safari']),
    heroImage: z.string(),
    image: z.string(),
    finalImage: z.string(),
    /* The primary keyword this article targets. Never rendered; it is here so the
       person editing can see what the page is meant to rank for before rewriting
       the title out from under it. */
    keyword: z.string(),
    intro: z.string(),
    takeaways: z.array(z.string()),
    closing: z.string(),
    /* Structured rather than part of the body because these feed FAQPage schema.
       Google needs question and answer as separate values; prose in the body could
       not be split reliably. */
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    helpTitle: z.string(),
    helpText: z.string(),
    helpMessage: z.string(),
    helpHref: z.string(),
    helpLinkLabel: z.string(),
    finalH2: z.string(),
    finalLede: z.string()
  })
});

export const collections = { posts };
