import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // higher-contrast code blocks — the default dark theme rendered JSON keys too dim on the
    // near-black "Night Garage" background. github-dark-high-contrast brightens the tokens.
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-high-contrast',
      },
    },
  },
});
