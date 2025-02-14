import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkYouTube } from './src/plugins/remark-youtube';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import { remarkFigure } from './src/plugins/remark-figure';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

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

  integrations: [mdx(), react()]
});