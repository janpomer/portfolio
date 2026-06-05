// Prefix an internal, root-relative path with the configured base path so
// links and public/ assets work whether the site is served from the domain
// root ("/") or a project subpath ("/portfolio/").
//
// Astro exposes the base as import.meta.env.BASE_URL (always trailing-slashed).
// Use this for anything in public/ (images, favicon) and internal page links.
// (Astro already prefixes its own bundled CSS/JS assets automatically.)
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ""); // e.g. "/portfolio"
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
