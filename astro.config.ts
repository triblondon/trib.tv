import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkYouTube } from './src/plugins/remark-youtube';
import { remarkReadingTime } from './src/plugins/remark-reading-time';
import { remarkFigureFromContainerDirective, remarkFigureFromParagraph } from './src/plugins/remark-figure';
import { remarkRelativeImagePaths } from './src/plugins/remark-relative-image-paths';
import { remarkAside } from './src/plugins/remark-aside';
//import fixupImageDpi from './src/plugins/astro-image-dpi';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { remarkTickList } from './src/plugins/remark-ticklist';


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
      remarkTickList
    ],
    shikiConfig: {
      theme: 'rose-pine-dawn',
    },
  },

  experimental: {
    svg: true,
    responsiveImages: true,
  },

  image: {
    // Used for all Markdown images; not configurable per-image
    // Used for all `<Image />` and `<Picture />` components unless overridden with a prop
    experimentalLayout: 'responsive',
  },

  integrations: [
    mdx(),
    react(),
    //fixupImageDpi()
  ],
});