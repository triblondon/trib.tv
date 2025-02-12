import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkYouTube } from './src/plugins/remark-youtube';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import { remarkFigure } from './src/plugins/remark-figure';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkYouTube,
      remarkReadingTime,
      remarkFigure
    ],
    shikiConfig: {
      theme: 'laserwave',
    },
  },

  experimental: {
    svg: true,
  },

  integrations: [mdx()]
});