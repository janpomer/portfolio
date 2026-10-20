# Navbar Readability — Implementation Checklist

## Task 1: Improve the navbar background at every scroll position

**Description:** Give the fixed navbar a nearly opaque theme-aware background and backdrop blur from initial load onward. Preserve the existing scrolled border/shadow, and provide a solid fallback without backdrop filtering.

**Acceptance criteria:**
- [x] Header uses a 95% ink background with 12px blur in supported browsers at the top and beyond the 24px scroll threshold; underlying content does not compete with navigation.
- [x] An opaque ink background remains readable without backdrop-filter support or JavaScript, in both themes.
- [x] Desktop/mobile layout, theme switching, menu toggling, links, and scrolled border/shadow remain functional.

**Verification:**
- [x] Build: `pnpm build`. If the previously documented pnpm database error recurs, use `node node_modules/astro/astro.js build` and record the limitation.
- [x] Existing regression checks: `node --test tests/style-guide.test.mjs` (use `--test-isolation=none` if process isolation is unavailable).
- [x] Browser: inspect at 375px and 1440px, in both themes, at initial load, over scrolled text/images, back at the top, and with the mobile menu open. Confirm computed background/filter styles in both scroll states.
- [x] Browser: disable backdrop filtering to check the opaque fallback; block scripts with CSP to check initial readability.
- [x] Browser: verify theme switching, mobile menu open/close, links, and visible keyboard focus.
- [x] Run `git diff --check`.

**Dependencies:** None.

**Files likely touched:**
- `src/styles/global.css`

**Estimated scope:** Small: 1 source file.

## Checkpoint: Complete

- [x] All acceptance criteria met; browser and build results recorded.
- [x] Only navbar presentation changed; unrelated work preserved.
- [x] Ready for visual review.

## Verification record — 2026-10-20

- `pnpm build` passed after a long startup delay. During the delay, `node node_modules/astro/astro.js build` also passed. Both produced all five routes. The existing Node toolchain deprecation warning remains.
- All six checks passed with `node --test --test-isolation=none tests/style-guide.test.mjs`. No new automated tests were added for this small visual CSS adjustment; runtime computed styles and screenshots verify the result.
- In-app browser: baseline header computed as transparent with no filter. Afterward it computes to 95% theme-aware ink and `blur(12px)` at the top and after scrolling. Existing scrolled border and shadow remain.
- Inspected light/dark desktop and mobile presentation at 1440px and 375px. Mobile menu opens, theme toggle works, navigation closes the menu and updates the anchor, and the brand returns to the top. No mobile page overflow observed. Keyboard Tab produces visible focus. Normal preview reports no console errors or warnings.
- Fallback verified in a temporary local static preview: only the navbar's filter-support condition was forced false, producing fully opaque `rgb(5, 17, 36)` in dark and `rgb(238, 243, 249)` in light, with no blur. Scripts were blocked by CSP; theme was supplied in the temporary HTML. This verifies the fallback branch and script-independent background, not an actual legacy browser or the browser's JavaScript-disable setting. Temporary transformations do not modify repository files or build output.
- CSS review: scope is limited to the navbar; the solid default remains when filtering or color mixing is unsupported. Theme tokens are reused; no new dependencies, JavaScript, layout changes, or external data flows. No blocking review findings.
- `git diff --check` passed. No lint or type-check script is configured.
- User authorized execution and a local commit directly on main. Versioning guide followed; Git's configured author identity retained, no attribution trailer, no push.
