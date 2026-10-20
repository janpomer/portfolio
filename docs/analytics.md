# Portfolio analytics

GA4 stream: `G-JG3H8KL8LE` (public measurement ID supplied by the owner).
Deploy target: Firebase project `portfolio-2bf3e`, primary URL
https://portfolio-2bf3e.web.app. Runtime collection is limited to
`portfolio-2bf3e.web.app,portfolio-2bf3e.firebaseapp.com`.

Tracking requires a production build, configured measurement ID, allowed HTTPS
hostname, eligible route and accepted analytics consent. Style-guide and privacy
pages never load the tag. Development and local production previews do not collect.
No interactions before acceptance are replayed. Preference version: 1.

## Events

| Event | Trigger | Parameters |
| --- | --- | --- |
| page_view | Once per eligible document after acceptance | Sanitized page URL/title/referrer |
| contact_click | Email activation | method=email; location=contact or cv |
| social_click | LinkedIn/GitHub activation | platform; location=footer or cv |
| cta_click | Contact/projects/CV CTA | cta_name; location=hero/nav_desktop/nav_mobile |
| cv_print_click | CV print button | location=cv |
| project_click | Linked project card or CV link | project_id; location=projects or cv |
| section_view | Section heading 50% visible for 2 continuous seconds | section_id |

Email and print events represent intent, not sent emails or saved files. Auto-print
via `?print` does not count as a button click. Section reach is counted once per
section per document, only while the tab is visible and consent is accepted.

Only enumerated labels are sent. No email/link text or destination URL is sent.
Page URLs omit query/fragment data; referrers contain origin only. Campaign source,
medium and name accept only curated tokens documented in the policy module. This
also protects automatic engagement events through sanitized global configuration.

## Console configuration

Owner reports setup complete; remote configuration has not been independently
verified. Disable enhanced outbound, scroll, forms, search, video and file events,
and page views based on browser history. Mark contact_click and cv_print_click as
key events with no monetary value. Create event-scoped dimensions for location,
platform, cta_name, project_id and section_id. Leave Google signals, advertising
personalization and user-provided data collection disabled. Proposed event retention:
2 months; confirm the actual setting in Admin > Data retention.

## Reports

- Acquisition: Session source/medium against sessions and session key-event rate.
- CV interest: /cv page views and users; cv_print_click users / CV visitors.
- Project interest: project_id and location against event count and total users.
- Section reach: section_id against total users / measured homepage users.
- Contact intent: users with contact_click / measured visitors by source/medium.

Consent refusals and blockers mean these denominators describe measurable traffic,
not all visitors. Sections skipped with anchor navigation are not an ordered funnel.
Example supported campaign: `?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio`.

## Release and rollback

Build with PUBLIC_GA_MEASUREMENT_ID and PUBLIC_ANALYTICS_HOSTS plus SITE and
BASE_PATH as documented in README. The .env.example defaults are disabled.
To disable: rebuild with both analytics variables empty and redeploy. Firebase
Hosting also supports rollback to the previous release in its console. No Git push
is needed. Never deploy a /portfolio/ build to the Firebase domain root.

## Verification record

Implemented and deployed on 2026-10-20 to https://portfolio-2bf3e.web.app.

- Tests were written against inert policy/controller/observer stubs and observed
  failing, then made green. A separate withdrawal-on-excluded-page regression was
  reproduced first and fixed. Existing tests remain enabled.
- Default subpath build and configured Firebase root build pass using
  `node node_modules/astro/astro.js build`. All 24 tests pass with
  `node --test --test-isolation=none tests/*.test.mjs` (set BASE_PATH=/ for root).
  Process-isolated execution is unavailable in this sandbox. Astro emits an
  existing Node module.register deprecation warning; no lint/type-check script is
  configured. No dependencies or lockfiles changed.
- Local browser checks used a temporary copy in /tmp with localhost eligibility
  and a mock tag. The deploy artifact was not modified. Verified rejection across
  reloads, reopening preferences/focus, acceptance with one page view, CTA anchor
  navigation, delayed section events, CV print intent before its native dialog,
  exclusion of privacy, and withdrawal from privacy. Inspected mobile (375px)
  consent presentation and desktop behavior; no console errors observed.
- Live Firebase browser verification: correct measurement ID, no Google tag before
  consent, tag loaded only after acceptance, and an observed Google Analytics
  /g/collect request for page_view with tid=G-JG3H8KL8LE and a query/fragment-free
  page URL. This verifies client delivery, not visibility in the account reports.
- Firebase CLI confirmed the existing Hosting site and reported release complete
  after uploading 24 static files. Firebase console release history provides the
  previous version for rollback. No Git commit or push performed.
- Feature structure checker reports only the pre-existing src/utils folder. New
  analytics modules stay in src/features/analytics, with a thin index export;
  the existing print script was extracted to src/features/cv/print.ts to keep the
  CV page below 300 lines. Proposed commit: Add consent-controlled portfolio analytics.
- Live homepage, CV, privacy and style-guide routes return HTTP 200 and their
  content hashes match the tested local build. Withdrawal reloads with no Google
  tag; the live privacy route also contains no loaded Google tag. Live browser
  console remains clear.
- GA console dimensions, retention and key-event/report settings remain
  owner-reported, not independently verified. Check Realtime after accepting
  consent; standard reports can take time to populate.

### Existing dependency advisories

`pnpm audit --prod --json` reports 1 critical, 20 high, 11 moderate and 4 low
advisories in the existing Astro/toolchain dependency tree. These are not fixed by
this analytics change. The release is static HTML/CSS/browser JS only: no Astro
server, image-optimization endpoint, Node dependency tree, YAML/TOML parser,
source-map processor or shared response cache is deployed. Build inputs are
checked-in trusted content; this change adds no image processing or untrusted
build inputs. The critical AVIF issue requires processing an attacker-controlled
image, which this release does not do. Do not use this assessment to justify
serving untrusted assets or enabling SSR; schedule a separate toolchain upgrade.

Advisory references:
- https://github.com/advisories/GHSA-26w7-cxv4-gfx2
- https://github.com/advisories/GHSA-2pvr-wf23-7pc7
- https://github.com/advisories/GHSA-8hv8-536x-4wqp

References: https://developers.google.com/analytics/devguides/collection/ga4/views
and https://developers.google.com/tag-platform/security/guides/consent.
