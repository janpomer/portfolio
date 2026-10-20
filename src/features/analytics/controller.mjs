import { actionEvent, sectionIds } from './policy.mjs';

export function createAnalytics(options) {
  let accepted = false;
  let started = false;
  const seen = new Set();
  const active = () => accepted && started && options.enabled;
  function start() {
    if (started || !accepted || !options.enabled) return;
    try {
      options.load();
      options.tag('consent', 'default', {
        analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
      });
      options.tag('js', new Date());
      options.tag('config', options.id, {
        ...options.page, send_page_view: false, cookie_path: '/', cookie_domain: 'none',
        cookie_expires: 60 * 60 * 24 * 60, cookie_update: false,
        allow_google_signals: false, allow_ad_personalization_signals: false,
      });
      options.tag('event', 'page_view', options.page);
      started = true;
    } catch { accepted = false; }
  }
  function choose(choice) {
    if (!['accepted', 'rejected'].includes(choice)) return;
    const withdrawing = accepted && choice === 'rejected';
    accepted = choice === 'accepted';
    try { options.persist('v1:' + choice); } catch { /* Choice still works for this document. */ }
    if (withdrawing) {
      options.disable();
      options.clear();
      options.reload();
      return;
    }
    start();
  }
  function action(data) {
    if (!active()) return;
    const event = actionEvent(data);
    if (event) options.tag('event', ...event);
  }
  function section(id) {
    if (!active() || !sectionIds.includes(id) || seen.has(id)) return;
    seen.add(id);
    options.tag('event', 'section_view', { section_id: id });
  }
  return { choose, action, section, active };
}
