import { eligible, metadata, readChoice, consentKey, sectionIds } from './policy.mjs';
import { createAnalytics } from './controller.mjs';
import { observeSections } from './sections.mjs';

export function startAnalytics() {
  const root = document.querySelector('[data-analytics-config]');
  if (!root || root.dataset.initialized) return;
  root.dataset.initialized = 'true';
  const { id, hosts, base, production } = root.dataset;
  const enabled = eligible({ id, hosts, base, production: production === 'true' }, location.href);
  const panel = root.querySelector('[data-consent-panel]');
  const settings = root.querySelector('[data-analytics-settings]');
  const close = root.querySelector('[data-consent-close]');
  let choice = null, stopSections = () => {};
  try { choice = readChoice(localStorage.getItem(consentKey)); } catch { /* Start without consent. */ }
  const tag = function () { window.dataLayer.push(arguments); };
  const analytics = createAnalytics({
    enabled, id, page: { ...metadata(location.href, document.referrer), page_title: document.title },
    tag,
    persist: value => localStorage.setItem(consentKey, value),
    load: () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = tag;
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      script.referrerPolicy = 'no-referrer';
      document.head.append(script);
    },
    disable: () => {
      window['ga-disable-' + id] = true;
      stopSections();
      if (window.dataLayer) window.dataLayer.length = 0;
    },
    clear: () => {
      // Cookies created here are host-only and use the root path.
      for (const name of document.cookie.split(';').map(cookie => cookie.trim().split('=')[0])) {
        if (name === '_ga' || name.startsWith('_ga_')) document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax; Secure';
      }
    },
    reload: () => location.reload(),
  });
  function startSections() {
    stopSections();
    if (!analytics.active() || !('IntersectionObserver' in window)) return;
    const headings = sectionIds.map(id => document.querySelector('section#' + id + ' h2')).filter(Boolean);
    stopSections = observeSections({
      headings, emit: id => analytics.section(id), visible: () => document.visibilityState === 'visible',
      observe: callback => new IntersectionObserver(callback, { threshold: [0, 0.5] }),
      schedule: (callback, delay) => window.setTimeout(callback, delay), cancel: timer => window.clearTimeout(timer),
      onVisibility: callback => {
        document.addEventListener('visibilitychange', callback);
        return () => document.removeEventListener('visibilitychange', callback);
      },
    });
  }
  function apply(next) {
    choice = next;
    stopSections();
    analytics.choose(next);
    panel.hidden = true;
    settings.focus({ preventScroll: true });
    startSections();
  }
  settings.hidden = !enabled && !choice;
  panel.hidden = !enabled || choice !== null;
  close.hidden = choice === null;
  settings.addEventListener('click', () => {
    panel.hidden = false;
    close.hidden = choice === null;
    panel.querySelector('[data-consent]').focus({ preventScroll: true });
  });
  close.addEventListener('click', () => {
    panel.hidden = true;
    settings.focus({ preventScroll: true });
  });
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape' && choice) close.click();
  });
  root.querySelectorAll('[data-consent]').forEach(button => {
    button.addEventListener('click', () => apply(button.dataset.consent));
  });
  // Capture before the CV button opens the blocking native print dialog.
  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest('[data-analytics]') : null;
    if (target) analytics.action(target.dataset);
  }, true);
  window.addEventListener('storage', event => {
    if (event.key === consentKey || event.key === null) apply(readChoice(event.newValue) ?? 'rejected');
  });
  window.addEventListener('pagehide', () => stopSections());
  window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
  if (choice) { analytics.choose(choice); startSections(); }
}
