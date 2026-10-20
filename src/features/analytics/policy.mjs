export const sectionIds = ['experience', 'education', 'projects', 'stack', 'about', 'contact'];
export const projectIds = ['teranode-sign', 'teranode', 'elivestock', 'autistica', 'miradio', 'number-portability', 'e-archive'];
export const consentKey = 'portfolio-analytics-consent';

export function eligible(config, href) {
  try {
    const url = new URL(href);
    const base = '/' + (config.base ?? '/').split('/').filter(Boolean).join('/');
    const prefix = base === '/' ? '' : base;
    if (url.pathname !== prefix && !url.pathname.startsWith(prefix + '/')) return false;
    const path = url.pathname.slice(prefix.length).replace(/\/+$/, '') || '/';
    return config.production === true && /^G-[A-Z0-9]+$/.test(config.id ?? '') &&
      url.protocol === 'https:' && (config.hosts ?? '').split(',').map(host => host.trim()).includes(url.hostname) &&
      !['localhost', '127.0.0.1', '::1', '[::1]'].includes(url.hostname) &&
      path !== '/privacy' && path !== '/style-guide' && !path.startsWith('/style-guide/');
  } catch { return false; }
}

export function metadata(href, referrer) {
  const url = new URL(href);
  const result = { page_location: url.origin + url.pathname, page_referrer: '' };
  try {
    const ref = new URL(referrer);
    if (['https:', 'http:'].includes(ref.protocol)) result.page_referrer = ref.origin + '/';
  } catch { /* Missing and non-web referrers are omitted. */ }
  const campaigns = {
    source: ['linkedin', 'github', 'newsletter', 'email'],
    medium: ['social', 'referral', 'email'],
    campaign: ['portfolio', 'outreach'],
  };
  for (const [key, allowed] of Object.entries(campaigns)) {
    const value = url.searchParams.get('utm_' + key);
    if (allowed.includes(value)) result['campaign_' + (key === 'campaign' ? 'name' : key)] = value;
  }
  return result;
}

export function actionEvent(data) {
  const { analytics, location, platform, cta, project } = data;
  if (analytics === 'contact' && ['contact', 'cv'].includes(location)) return ['contact_click', { method: 'email', location }];
  if (analytics === 'social' && ['footer', 'cv'].includes(location) && ['linkedin', 'github'].includes(platform)) return ['social_click', { platform, location }];
  if (analytics === 'print' && location === 'cv') return ['cv_print_click', { location }];
  if (analytics === 'cta' && ['hero', 'nav_desktop', 'nav_mobile'].includes(location) && ['contact', 'projects', 'cv'].includes(cta)) return ['cta_click', { cta_name: cta, location }];
  if (analytics === 'project' && ['projects', 'cv'].includes(location) && projectIds.includes(project)) return ['project_click', { project_id: project, location }];
  return null;
}

export function readChoice(value) {
  return value === 'v1:accepted' ? 'accepted' : value === 'v1:rejected' ? 'rejected' : null;
}
