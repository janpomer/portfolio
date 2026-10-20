# Implementation Plan: Style Guidelines

## Overview

Add three directly accessible guideline pages documenting the portfolio's existing typography, light/dark palette, and UI components. Keep all links to these routes within the guideline area; do not add links from the portfolio, CV, blog, navigation, or footer. This plan covers implementation preparation only; implementation awaits human review.

## Architecture Decisions

- Use Astro static routes: `/style-guide/` for fonts, `/style-guide/colors/` for colors, and `/style-guide/components/` for components. Prefix every internal link and public asset with the existing `withBase()` helper. On the default deployment these paths start with `/portfolio/`; root deployments use `/style-guide/` directly.
- Introduce a dedicated `StyleGuideLayout.astro` wrapping the existing `Layout.astro`, with guideline-only navigation, an active-page indicator, and the existing `data-theme-toggle` interaction. Do not import public navigation into this area.
- Add an optional `noindex` prop to `Layout.astro`, defaulting to false. The guideline layout opts into `noindex, nofollow` robots metadata. There is currently no sitemap integration; if one is introduced, exclude the guideline routes. Unlisted URLs and indexing directives are not authentication; no access-control system is requested.
- Treat `src/styles/global.css` and existing component markup as the source of truth. Keep the current visual design and theme behavior. Use scoped guide styles rather than modifying global tokens to suit the documentation.
- Document Inter's existing 400/500/600/700/800 weights and system fallback stack. Show actual heading, body, label, link, and code treatments, including responsive sizes and line heights from the source. Clarify the CV's intentionally light document styling as an exception.
- Display fixed brand colors (`primary`, `secondary`, `accent`) and all semantic theme tokens (`ink`, `surface`, `haze`, `mist`, `line`, `veil`), including alpha values for transparent colors. Include image-fade and glow tokens as supporting effects. Derive displayed values from the live CSS where practical instead of maintaining a second palette. Render light and dark swatches together using scoped theme containers; the page theme toggle remains independent.
- Show existing primary/secondary actions, text links, theme toggle, availability badge, project tags/card, tech tile, section heading, and prose treatments. Reuse small components such as `SectionHeading`, `Icon`, and `TechIcon` where suitable. Where a pattern is embedded in a large section, reproduce a small labeled specimen with a source reference rather than refactoring public sections solely for the guide. Specimen actions remain local and do not send mail or open unrelated external pages.
- Keep pages usable without JavaScript; use the existing script for theme persistence and progressive enhancement. Require responsive layouts, keyboard access, visible focus, descriptive labels, and reduced-motion compatibility.

## Repository Findings

- Astro 5 with Tailwind CSS 4; static output in `dist/`.
- Existing theme initialization, persistence, and toggle handling live in `src/layouts/Layout.astro`.
- Existing scripts: `pnpm dev`, `pnpm build`, and `pnpm preview`. No test runner or test directory is configured.
- Use Node's built-in test runner for a small generated-HTML regression check; no new test framework is needed. Document the newly introduced command rather than implying a test script already exists.
- Existing staged Firebase and README changes belong to other work and must be preserved. Planning does not create a branch, commit, push, or deploy.

## Task List

### Phase 1: Direct access and typography

- [x] Task 1: Add the unlisted guideline shell and fonts page.

### Phase 2: Palette and components

- [x] Task 2: Add the light/dark palette page (script-free rendering verified with CSP).
- [x] Checkpoint: Verify routes, themes, and absence of public links after Tasks 1–2; awaiting human review.
- [x] Task 3: Add the component gallery.

### Phase 3: Verification and handoff

- [ ] Task 4: Verify access, responsiveness, and public-page regressions.
- [ ] Checkpoint: All acceptance criteria met and ready for review.

Detailed acceptance criteria and verification commands are in `tasks/todo.md`.

## Dependencies

Task 1 → Task 2 → checkpoint → Task 3 → Task 4 → final checkpoint. Palette and component work both depend on the guideline shell; sequential work avoids shared-file conflicts. No agent delegation is necessary.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Guide becomes discoverable through public links | High | Inspect generated public HTML for links into the guide; leave public navigation untouched. |
| Default `/portfolio/` base breaks direct URLs or assets | High | Build and inspect both default-base and root-base outputs; use `withBase()`. |
| Duplicated swatches or specimens drift | Medium | Prefer runtime CSS values, reuse small components, and identify source files for embedded patterns. |
| Nested theme samples affect the whole page | Medium | Scope sample theme attributes and confirm page-theme persistence independently. |
| Existing colors have unsuitable contrast in some combinations | Medium | Show supported combinations and document measured limitations; do not silently redesign brand colors. |
| Shared layout change affects public metadata | Medium | Default `noindex` off and verify existing public pages do not receive guide robots metadata. |

## Assumptions and Open Questions

- These pages document the current portfolio design rather than establish a new visual identity.
- `/style-guide/` is the proposed known URL; three pages share internal navigation.
- Public accessibility with no inbound site links meets the request; no password or login is planned.
- No implementation decisions require additional input before plan review.

## Review Gate

- [x] Repository patterns and existing tokens inspected.
- [x] No existing plan files were overwritten.
- [x] Tasks have acceptance criteria, verification steps, ordered dependencies, and scopes of five files or fewer.
- [x] User invoked incremental implementation to proceed with the saved plan.

## Task 1 Handoff

Implemented the fonts route and shared guideline shell. See `todo.md` for the verification record. Committed as `261f3be` after the user requested commit and continue and confirmed committing directly to main. Versioning guide followed; user identity preserved; no push.

## Task 2 Handoff

Palette page implemented at `/style-guide/colors/` (default preview `/portfolio/style-guide/colors/`). Added guide-only navigation and a reusable swatch component; public navigation and tokens are unchanged. Review checkpoint reached after Tasks 1–2. Components are next after checkpoint review. See the checklist for verification and the remaining JavaScript-disabled browser audit.
