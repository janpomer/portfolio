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
- [x] Show all brand, semantic, image-fade, and glow tokens with variable names, resolved values including alpha, and practical usage notes.
- [x] Light and dark theme samples remain visible together and match `global.css`; toggling the page theme does not change the identity of either sample.
- [x] Each swatch has a readable text label and value; transparent tokens use a representative surface and narrow screens have no horizontal page overflow.

**Verification:**
- [x] RED then GREEN: extend route/content assertions before implementation; run `pnpm build && node --test tests/style-guide.test.mjs`.
- [x] Build succeeds: `pnpm build`.
- [x] Manual check: compare displayed values with browser computed styles, inspect both themes, and measure contrast for documented text/background combinations.
- [x] Browser check with script execution blocked by CSP on a temporary preview; all 21 swatches and both theme panels render with no theme initialization script executed. This verifies script-free rendering rather than toggling the browser’s JavaScript setting.

**Dependencies:** Task 1.

**Files likely touched:**
- `src/pages/style-guide/colors.astro`
- `src/components/style-guide/ColorSwatch.astro`
- `tests/style-guide.test.mjs`

**Estimated scope:** Medium: 3 files.

**Verification record (2026-10-20):** Colors route test failed first because its output was absent. Build and all three generated-HTML checks now pass with the installed Astro CLI and in-process Node runner. Printed labels match the source tokens, and browser computed styles confirmed light ink `rgb(238, 243, 249)` and dark ink `rgb(5, 17, 36)` before and after switching the surrounding theme. Theme selection persisted across reload and Fonts → Colors navigation. No page overflow at 375px or 1440px; browser console reported no errors/warnings. Solid-color contrast was calculated from the existing CSS using sRGB relative luminance and recorded on the page. Swatches and labels are complete in emitted HTML/CSS; JavaScript-disabled browser verification remains outstanding. Structure checker still reports only pre-existing `src/utils`; `git diff --check` passes.

**Commit message:** `Add light and dark palette guidelines`

## Checkpoint: After Tasks 1–2

- [x] `pnpm build && node --test tests/style-guide.test.mjs` passes.
- [x] Both routes load directly with working guide-only navigation.
- [x] Fonts and colors remain readable in both themes at 375px and 1440px widths.
- [x] Generated public pages have no links into `/style-guide/`.

## Task 3: Add the component gallery

**Description:** Deliver `/style-guide/components/` with compact specimens of the UI patterns already used by the portfolio, alongside purpose, source, and state guidance.

**Acceptance criteria:**
- [x] Include primary/secondary actions, text links, theme toggle, availability badge, project tags/card, tech tile, section heading, and prose styling; source references identify the existing implementation.
- [x] Show applicable default, hover, and keyboard-focus states with concise usage guidance; specimens work locally without mail, downloads, or unrelated external navigation.
- [x] Samples match the portfolio in both themes and adapt to mobile; reduced-motion settings preserve readability and usable controls.

**Verification:**
- [x] RED then GREEN: add gallery route/section assertions first; run `pnpm build && node --test tests/style-guide.test.mjs`.
- [x] Build succeeds: `pnpm build`.
- [x] Manual check: exercise specimen interactions, hover/focus states, keyboard navigation, theme persistence, reduced motion, and no-JavaScript rendering.

**Dependencies:** Tasks 1–2.

**Files likely touched:**
- `src/pages/style-guide/components.astro`
- `src/components/style-guide/ComponentSpecimen.astro`
- `src/components/style-guide/ComponentGallery.astro`
- `tests/style-guide.test.mjs`

**Estimated scope:** Medium: 4 files.

**Verification record (2026-10-20):** Gallery route assertion failed before implementation, then passed after the route and specimens were added. Build and all six current regression checks pass. Browser verified light/dark rendering, local primary-action navigation, keyboard focus outline, keyboard theme switching, project image loading, and a clean normal-preview console. A temporary preview with CSP `script-src 'none'` confirmed no app scripts execute (`data-theme` is absent), while the reused section heading is visible at opacity 1 and guide navigation works. The palette remains complete with all 21 swatches and both theme backgrounds. Reduced-motion rules are checked in generated CSS; OS-level preference emulation is not exposed by the browser tool.

**Commit message:** `Add portfolio component guideline gallery`

## Task 4: Verify access and public-page regressions

**Description:** Complete meaningful route/link regression checks, verify both deployment base paths, inspect the UI in a real browser, and record the guide URLs and maintenance notes in the planning documents.

**Acceptance criteria:**
- [x] All three routes load directly and link to each other under default `/portfolio/` and root `/` deployments, with valid assets and no missing routes.
- [x] Generated public HTML has no inbound guide links; all guide pages have indexing directives, public pages retain existing metadata, and no sitemap advertises the guide.
- [x] Home, CV, and enabled blog routes retain their existing behavior; the guide passes mobile/desktop, light/dark, keyboard, reduced-motion, and no-JavaScript checks with no new console errors.

**Verification:**
- [x] Extend generated-HTML assertions for all route links, active-page indicators, assets, public-page isolation, script-free specimen visibility, and reduced-motion CSS. No behavior fixes were needed in Task 4; these assertions passed against the completed gallery. The gallery route itself was verified RED → GREEN in Task 3. Expected base comes from `BASE_PATH` (default `/portfolio`).
- [x] Default deployment: `pnpm build && node --test tests/style-guide.test.mjs`.
- [x] Root deployment: `BASE_PATH=/ pnpm build && BASE_PATH=/ node --test tests/style-guide.test.mjs`.
- [x] Restore default local output after verification: `pnpm build`.
- [x] Manual check: preview each build before replacing it; inspect direct routes and representative public pages at 375px and 1440px, with dark/light and browser accessibility settings. Record results and any limitations.

**Dependencies:** Tasks 1–3.

**Files likely touched:**
- `tests/style-guide.test.mjs`
- `tasks/plan.md`
- `tasks/todo.md`

**Estimated scope:** Medium: 3 files. Any discovered implementation fixes return to their owning task for focused re-verification.

## Checkpoint: Complete

- [x] All acceptance criteria satisfied and verification results recorded.
- [x] No existing unrelated staged changes modified or unstaged.
- [x] Known URLs and maintenance sources recorded in `tasks/plan.md`.
- [x] Ready for human review; no deployment or publication performed.

## Final verification record (2026-10-20)

- All six tests pass on root and default builds with `node --test --test-isolation=none tests/style-guide.test.mjs`; builds use `node node_modules/astro/astro.js build`, the README’s fallback for the local pnpm database error. Root builds use `BASE_PATH=/` for both commands. Default output restored last.
- Browser checked direct guide routes and navigation, current-page indicator, loaded image assets, light/dark rendering, theme persistence, local specimen links, and keyboard activation/focus. Gallery verified at 375px and 1440px with no horizontal overflow.
- Root and default home/CV routes load, the CV print control remains present, and no home-page links enter the guide. Blog remains disabled by the existing feature flag, so there are no enabled blog routes to exercise. No sitemap is emitted.
- Normal browser previews report no errors/warnings. Node emits an existing toolchain `module.register()` deprecation warning; compilation succeeds.
- Script-free rendering was verified with CSP `script-src 'none'` on a temporary local-only preview: theme initialization did not execute, section-heading opacity is 1, navigation works, and all 21 palette swatches render correctly. This tests blocked script execution, not the browser’s JavaScript setting or noscript-element activation. Temporary verification servers stopped.
- Reduced-motion animation/transition disabling is verified in generated CSS. The browser tool does not expose OS reduced-motion emulation, so that preference was not toggled at runtime.
- `git diff --check` passes. No lint/type-check scripts exist. The structure checker reports the pre-existing `src/utils` folder only; no new size violations or unrelated restructuring.
- Gallery commit: `61dc1ca Add portfolio component guideline gallery`. Final verification is recorded in a separate documentation commit. No deployment or push.
