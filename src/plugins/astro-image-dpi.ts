import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";

export default function fixupImageDpi(): AstroIntegration {
  return {
    name: "astro-fixup-image-dpi",

    hooks: {
      "astro:build:done": async ({ pages, dir, assets }) => {
        console.log(pages)
      },
    },
  };
}