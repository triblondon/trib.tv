import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import { remarkFigure } from './src/plugins/remark-figure';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkReadingTime,
      remarkFigure
    ],
  },

  experimental: {
    svg: true,
  },

  integrations: [mdx()]
});