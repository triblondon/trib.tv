import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkYouTube } from './src/plugins/remark-youtube';
import { remarkReadingTime } from './src/plugins/remark-reading-time';
import { remarkFigureFromContainerDirective, remarkFigureFromParagraph } from './src/plugins/remark-figure';
import { remarkRelativeImagePaths } from './src/plugins/remark-relative-image-paths';
import { remarkAside } from './src/plugins/remark-aside';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://trib.tv',
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkYouTube,
      remarkReadingTime,
      remarkAside,
      remarkFigureFromContainerDirective,
      remarkFigureFromParagraph,
      remarkRelativeImagePaths,
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