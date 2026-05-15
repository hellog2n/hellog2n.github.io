import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
// NOTE: @astrojs/sitemap 3.7.x has a `reduce of undefined` crash on Astro 4.16
// with this content shape. Re-enable after upgrading or pinning a compatible version.
// import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hellog2n.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
  prefetch: {
    prefetchAll: false,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    // sitemap(),  // disabled — see import comment
    mdx(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
