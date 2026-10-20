import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createAnalytics } from '../src/features/analytics/controller.mjs';
function setup(overrides = {}) {
  const calls = [], effects = [];
  const analytics = createAnalytics({ enabled: true, id: 'G-JG3H8KL8LE', page: { page_location: 'https://example.com/', page_title: 'Portfolio' },
    tag: (...args) => calls.push(args), load: () => effects.push('load'), persist: value => effects.push(value),
    disable: () => effects.push('disable'), clear: () => effects.push('clear'), reload: () => effects.push('reload'), ...overrides });
  return { analytics, calls, effects };
}
describe('createAnalytics', () => {
  it('does nothing before consent; acceptance loads once and sends one sanitized view', () => {
    const { analytics, calls, effects } = setup();
    analytics.action({ analytics: 'contact', location: 'cv' });
    analytics.section('projects');
    assert.deepEqual(calls, []);
    assert.deepEqual(effects, []);
    analytics.choose('accepted'); analytics.choose('accepted');
    assert.equal(effects.filter(x => x === 'load').length, 1);
    assert.equal(calls.filter(x => x[0] === 'event' && x[1] === 'page_view').length, 1);
    const config = calls.find(x => x[0] === 'config')[2];
    assert.equal(config.send_page_view, false);
    assert.equal(config.allow_google_signals, false);
    assert.equal(config.allow_ad_personalization_signals, false);
    assert.equal(calls[0][0], 'consent');
    assert.equal(calls[0][2].ad_storage, 'denied');
  });
  it('keeps rejected, disabled or invalid choices inactive', () => {
    for (const choice of ['rejected', 'invalid']) {
      const { analytics, calls } = setup(); analytics.choose(choice); assert.deepEqual(calls, []);
    }
    const { analytics, calls, effects } = setup({ enabled: false });
    analytics.choose('accepted'); analytics.action({ analytics: 'contact', location: 'cv' });
    assert.deepEqual(calls, []); assert.equal(effects.includes('load'), false);
  });
  it('dispatches only allowlisted actions and sections, deduplicating sections', () => {
    const { analytics, calls } = setup(); analytics.choose('accepted');
    analytics.action({ analytics: 'contact', location: 'cv' }); analytics.action({ analytics: 'bad' });
    analytics.section('projects'); analytics.section('projects'); analytics.section('secret');
    assert.deepEqual(calls.filter(x => x[0] === 'event').map(x => x[1]), ['page_view', 'contact_click', 'section_view']);
  });
  it('revocation disables collection before cleanup/reload and drops later events', () => {
    const { analytics, calls, effects } = setup(); analytics.choose('accepted'); analytics.choose('rejected');
    const count = calls.length; analytics.action({ analytics: 'contact', location: 'cv' }); analytics.section('about');
    assert.equal(calls.length, count); assert.equal(analytics.active(), false);
    assert.deepEqual(effects.slice(-3), ['disable', 'clear', 'reload']);
  });
  it('revokes a remembered acceptance even on an excluded page', () => {
    const { analytics, effects } = setup({ enabled: false });
    analytics.choose('accepted'); analytics.choose('rejected');
    assert.deepEqual(effects.slice(-3), ['disable', 'clear', 'reload']);
  });
  it('survives failed persistence and tag loading without breaking visitor actions', () => {
    const { analytics, effects } = setup({ persist: () => { throw Error('storage blocked'); }, load: () => { throw Error('blocked tag'); } });
    assert.doesNotThrow(() => analytics.choose('accepted'));
    assert.equal(analytics.active(), false);
    assert.equal(effects.includes('reload'), false);
  });
});
