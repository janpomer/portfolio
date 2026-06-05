// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// All output is statically pre-rendered at build time (Astro's default).
// `astro build` emits a fully static site into ./dist that can be hosted anywhere.
//
// `site` and `base` can be overridden by the CI build (see
// .github/workflows/deploy.yml). Defaults assume a root deployment, e.g. a
// GitHub user page (janpomer.github.io) or a custom domain.
//
// Deployed to a GitHub project page at https://janpomer.github.io/portfolio/,
// so the site lives under the "/portfolio/" base path. Internal asset/link
// paths are prefixed with this base via the withBase() helper (src/utils/url.ts);
// Astro prefixes its own bundled CSS/JS automatically.
// Override with the SITE / BASE_PATH env vars (the deploy workflow sets them).
const site = process.env.SITE ?? 'https://janpomer.github.io';
const base = process.env.BASE_PATH ?? '/portfolio';

export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});
