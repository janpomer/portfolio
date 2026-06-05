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
// NOTE: this site uses root-relative asset/link paths (e.g. "/favicon.png",
// "/blog"). Those only work when served from the domain root. If you deploy to
// a *project* subpath (https://<user>.github.io/<repo>/), set BASE_PATH and
// rewrite those paths to be prefixed with import.meta.env.BASE_URL.
const site = process.env.SITE ?? 'https://janpomer.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});
