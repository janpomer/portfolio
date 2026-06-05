# Jan Pomer — Portfolio

The personal portfolio of **Jan Pomer**, Software & Solutions Architect and
Technical Lead specialising in blockchain and distributed systems.

It's a modern, fully static site built with **Astro** and **Tailwind CSS v4** —
everything is pre-rendered at build time, so `pnpm build` emits a plain static
site into `dist/` that can be hosted anywhere (GitHub Pages, Netlify, Vercel, S3, …).

## Features

- **Single-page portfolio** with a sticky nav and smooth-scrolling sections:
  Hero, Work experience, Education, Projects, Tech stack, About, and a Contact CTA.
- **Animated hero background** — a lightweight `<canvas>` P2P / blockchain node
  mesh that pauses off-screen and respects `prefers-reduced-motion`.
- **Light & dark themes** — follows the browser/OS preference by default, with a
  toggle that remembers a manual choice.
- **Work-in-progress blog** behind a feature flag (off by default): when enabled it
  generates a post listing and individual post pages from Markdown; when disabled
  the pages aren't built and the nav link is hidden.
- **Zero client JS by default** (aside from small progressive-enhancement scripts),
  fast and accessible.
- **Deploys to GitHub Pages** via GitHub Actions.

## Tech stack

Astro · Tailwind CSS v4 · TypeScript · pnpm · sharp (image processing) ·
deployed with GitHub Actions → GitHub Pages.

## Getting started

Requires **Node 20+** and **pnpm** (`corepack enable` will provide it, or install
pnpm directly).

```bash
pnpm install      # install dependencies
pnpm dev          # local dev server with hot reload (http://localhost:4321)
pnpm build        # build the static site into dist/
pnpm preview      # preview the built dist/ locally
```

## Editing the content

All copy lives in plain data files under [`src/data/`](src/data/) — you rarely need
to touch the components:

- **[site.ts](src/data/site.ts)** — name, role, tagline, email, LinkedIn/GitHub URLs,
  nav links, footer credit.
- **[experience.ts](src/data/experience.ts)** — work-experience entries (icon, company,
  position, dates, bullets, optional company link).
- **[education.ts](src/data/education.ts)** — degrees, schools, years, and links.
- **[projects.ts](src/data/projects.ts)** — projects (title, description, image,
  optional landing-page link, tags). Use `link: null` for projects with no page.
- **[stack.ts](src/data/stack.ts)** — the primary and secondary technology lists.
- **[about.ts](src/data/about.ts)** — about paragraphs, stats, and the portrait toggle.
- **[config.ts](src/config.ts)** — feature flags (e.g. `blog`). Flip `blog` to `true`
  to publish the blog; posts are Markdown files in
  [`src/content/blog/`](src/content/blog/).

### Images

Project images and the favicon/logo live in [`public/`](public/). Replace them with
your own (keep the same paths, or update the paths in the data files). Wide 16:9
images work best for project cards.

### Colors

The brand palette and light/dark theme tokens are defined once in
[`src/styles/global.css`](src/styles/global.css) under `@theme` (`--color-primary`,
`--color-secondary`, `--color-accent`, …) and are available everywhere as Tailwind
utilities like `bg-primary` / `text-accent`.

## Deployment (GitHub Pages)

A workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds
and deploys on every push to `main`.

1. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
2. Push to `main`.

The site uses root-relative paths, so it expects to be served from the domain root:

- ✅ **User page** — name the repo `<username>.github.io`.
- ✅ **Custom domain** — add a `CNAME` and set the `site` value accordingly.
- ⚠️ **Project subpath** (`<username>.github.io/<repo>/`) needs a `base` path and the
  asset/link paths rewritten with `import.meta.env.BASE_URL`.

Set your canonical URL via the `SITE` env var (the workflow sets it automatically) or
in [`astro.config.mjs`](astro.config.mjs).

## License & reuse

You're welcome to **fork this and use it as a template for your own portfolio.**

- The **source code** is released under the [MIT License](LICENSE) — use, modify, and
  redistribute it freely.
- The **personal content is not** — please replace Jan Pomer's name, biography,
  photos, project descriptions, logos, and any third-party images/brand assets with
  your own before publishing. Some images (e.g. company/product banners) belong to
  their respective owners and are included only as examples.

Attribution is appreciated but not required.
