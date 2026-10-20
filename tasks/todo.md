# Style Guidelines — Implementation Checklist

## Task 1: Add the unlisted shell and fonts page

**Description:** Deliver `/style-guide/` as a usable typography reference with a dedicated guideline layout, shared theme control, guide-only navigation, and indexing metadata. Introduce a focused generated-HTML check using Node's built-in runner.

**Acceptance criteria:**
- [x] Direct access renders Inter specimens for weights 400–800, the fallback stack, and the existing responsive heading/body/label/link/code treatments with usage notes.
- [x] Guideline navigation is confined to this area; links use `withBase()`, and the guide has `noindex, nofollow` while existing public pages retain their metadata behavior.
- [x] Shared theme switching persists through reload and guide navigation; the page has one h1, a labeled navigation landmark, keyboard-visible focus, and readable mobile layout.

**Verification:**
- [x] RED then GREEN: create route/robots/public-link assertions first; run `pnpm build && node --test tests/style-guide.test.mjs` before and after implementation.
- [x] Build succeeds: `pnpm build`.
- [x] Manual check: visit `/portfolio/style-guide/`, inspect font loading/fallbacks, toggle and reload both themes, and navigate by keyboard at mobile and desktop widths.

**Dependencies:** None.

**Files likely touched:**
- `src/layouts/Layout.astro`
- `src/layouts/StyleGuideLayout.astro`
- `src/pages/style-guide/index.astro`
- `tests/style-guide.test.mjs`

**Estimated scope:** Medium: 4 files.

**Verification record (2026-10-20):** The route assertion failed before implementation because `dist/style-guide/index.html` was absent; the public isolation check passed. After implementation, both checks pass using `node node_modules/astro/astro.js build && node --test --test-isolation=none tests/style-guide.test.mjs`. `pnpm build` cannot open its database in this environment; the installed Astro CLI is the documented fallback. Node test process isolation is also unavailable in the sandbox, so tests run in-process. Browser preview: `http://127.0.0.1:4322/portfolio/style-guide/`. Inter loaded; system fallback stack and code monospace verified through computed styles. Light/dark theme persisted after reload; keyboard activation and visible focus verified. No page overflow at 320, 375, 768, 1024, or 1440px. No browser errors/warnings. `git diff --check` passes. No lint/type-check scripts are configured. The structure checker reports only the pre-existing `src/utils` folder; no unrelated restructuring performed. Colors/components are non-link “Coming next” labels until their slices land.

**Proposed commit message:** `Add unlisted typography style guidelines`

## Task 2: Add the light/dark palette page

**Description:** Deliver `/style-guide/colors/` with named brand swatches and paired theme samples that reflect existing CSS tokens.

**Acceptance criteria:**
- [ ] Show all brand, semantic, image-fade, and glow tokens with variable names, resolved values including alpha, and practical usage notes.
- [ ] Light and dark theme samples remain visible together and match `global.css`; toggling the page theme does not change the identity of either sample.
- [ ] Each swatch has a readable text label and value; transparent tokens use a representative surface and narrow screens have no horizontal page overflow.

**Verification:**
- [ ] RED then GREEN: extend route/content assertions before implementation; run `pnpm build && node --test tests/style-guide.test.mjs`.
- [ ] Build succeeds: `pnpm build`.
- [ ] Manual check: compare displayed values with browser computed styles, inspect both themes with and without JavaScript, and measure contrast for documented text/background combinations.

**Dependencies:** Task 1.

**Files likely touched:**
- `src/pages/style-guide/colors.astro`
- `src/components/style-guide/ColorSwatch.astro`
- `tests/style-guide.test.mjs`

**Estimated scope:** Medium: 3 files.

## Checkpoint: After Tasks 1–2

- [ ] `pnpm build && node --test tests/style-guide.test.mjs` passes.
- [ ] Both routes load directly with working guide-only navigation.
- [ ] Fonts and colors remain readable in both themes at 375px and 1440px widths.
- [ ] Generated public pages have no links into `/style-guide/`.

## Task 3: Add the component gallery

**Description:** Deliver `/style-guide/components/` with compact specimens of the UI patterns already used by the portfolio, alongside purpose, source, and state guidance.

**Acceptance criteria:**
- [ ] Include primary/secondary actions, text links, theme toggle, availability badge, project tags/card, tech tile, section heading, and prose styling; source references identify the existing implementation.
- [ ] Show applicable default, hover, and keyboard-focus states with concise usage guidance; specimens work locally without mail, downloads, or unrelated external navigation.
- [ ] Samples match the portfolio in both themes and adapt to mobile; reduced-motion settings preserve readability and usable controls.

**Verification:**
- [ ] RED then GREEN: add gallery route/section assertions first; run `pnpm build && node --test tests/style-guide.test.mjs`.
- [ ] Build succeeds: `pnpm build`.
- [ ] Manual check: exercise specimen interactions, hover/focus states, keyboard navigation, theme persistence, reduced motion, and no-JavaScript rendering.

**Dependencies:** Tasks 1–2.

**Files likely touched:**
- `src/pages/style-guide/components.astro`
- `src/components/style-guide/ComponentSpecimen.astro`
- `src/components/style-guide/ComponentGallery.astro`
- `tests/style-guide.test.mjs`

**Estimated scope:** Medium: 4 files.

## Task 4: Verify access and public-page regressions

**Description:** Complete meaningful route/link regression checks, verify both deployment base paths, inspect the UI in a real browser, and record the guide URLs and maintenance notes in the planning documents.

**Acceptance criteria:**
- [ ] All three routes load directly and link to each other under default `/portfolio/` and root `/` deployments, with valid assets and no missing routes.
- [ ] Generated public HTML has no inbound guide links; all guide pages have indexing directives, public pages retain existing metadata, and no sitemap advertises the guide.
- [ ] Home, CV, and enabled blog routes retain their existing behavior; the guide passes mobile/desktop, light/dark, keyboard, reduced-motion, and no-JavaScript checks with no new console errors.

**Verification:**
- [ ] RED then GREEN: extend the generated-HTML test to cover base-aware links and public-page isolation before correcting any gaps; run it against each build below. Derive the expected base from `BASE_PATH` (default `/portfolio`).
- [ ] Default deployment: `pnpm build && node --test tests/style-guide.test.mjs`.
- [ ] Root deployment: `BASE_PATH=/ pnpm build && BASE_PATH=/ node --test tests/style-guide.test.mjs`.
- [ ] Restore default local output after verification: `pnpm build`.
- [ ] Manual check: preview each build before replacing it; inspect direct routes and representative public pages at 375px and 1440px, with dark/light and browser accessibility settings. Record results and any limitations.

**Dependencies:** Tasks 1–3.

**Files likely touched:**
- `tests/style-guide.test.mjs`
- `tasks/plan.md`
- `tasks/todo.md`

**Estimated scope:** Medium: 3 files. Any discovered implementation fixes return to their owning task for focused re-verification.

## Checkpoint: Complete

- [ ] All acceptance criteria satisfied and verification results recorded.
- [ ] No existing unrelated staged changes modified or unstaged.
- [ ] Known URLs and maintenance sources recorded in `tasks/plan.md`.
- [ ] Ready for human review; no deployment or publication performed.
