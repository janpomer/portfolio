// ────────────────────────────────────────────────────────────────
// Feature flags.
// Toggle work-in-progress features here. When a flag is off, the
// feature is fully hidden — its nav link is removed AND its pages are
// not generated at build time (so they aren't reachable by URL either).
// ────────────────────────────────────────────────────────────────
export const features = {
  // Blog is a work in progress. Flip to `true` to publish it.
  blog: false,
};
