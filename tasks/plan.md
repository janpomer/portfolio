# Implementation Plan: Navbar Readability

## Overview

Make the fixed navbar substantially less transparent so underlying page content does not compete with navigation. Use a nearly solid, blurred background at initial load and while scrolling, in both themes. Implemented and verified; ready for visual review.

## Repository Findings

- `src/components/Nav.astro` toggles `nav-scrolled` beyond 24px of scroll.
- `src/styles/global.css` currently leaves the base header transparent; the scrolled state gets an 80% ink background and 12px blur.
- The mobile dropdown already has a 95% background and blur.
- Theme-aware `--color-ink` supplies the appropriate color in light and dark themes.
- Build: `pnpm build`. Existing regression checks: `node --test tests/style-guide.test.mjs`.
- The previous default plan and checklist were complete. This plan replaces them; the implementation changes only navbar CSS.

## Architecture Decisions

- Give the base `[data-nav]` rule a 95% ink background and 12px backdrop blur, ensuring readability from initial load without depending on scrolling or JavaScript.
- Default to an opaque ink background; enable translucency only when backdrop filtering is supported. Include prefixed filtering support.
- Remove the scrolled state's weaker background override; retain its border and shadow treatment.
- Preserve layout, theme tokens, links, scroll threshold, and mobile interactions.
- Verify this small visual adjustment directly in the browser; do not add tests that merely assert CSS declaration strings.

## Task List

- [x] Task 1: Improve the navbar background at every scroll position.
- [x] Checkpoint: Verify themes, responsive rendering, navigation interactions, and build.

Detailed criteria and commands are in `tasks/todo.md`.

## Dependencies

One small task followed by verification. No delegation is needed.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scrolled rule weakens the new base background | Medium | Remove its background override and inspect both states. |
| Blur is unavailable | Low | Use an opaque theme-aware fallback. |
| Poor separation in a theme or mobile state | Medium | Inspect both themes and open/closed mobile menus over content. |

## Assumptions and Open Questions

- Proposed appearance: 95% opacity plus 12px blur, matching existing mobile opacity and scrolled blur strength.
- No blocking implementation questions; final appearance requires browser review.

## Review Gate

- [x] Relevant markup, styles, themes, and verification commands inspected.
- [x] Previous default plan checked: no incomplete tasks.
- [x] Task has acceptance criteria, verification, dependencies, and a small scope.
- [x] Human has reviewed and approved this plan before implementation.

## Handoff

Implemented the base background and supported blur in `src/styles/global.css`. Scrolling retains the same opacity and blur while adding the existing border/shadow. Build and all six existing regression checks pass. Browser verification and limitations are recorded in `tasks/todo.md`. User approved execution and a local commit directly on main; versioning skill rules apply.
