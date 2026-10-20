import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { eligible, metadata, actionEvent, readChoice } from '../src/features/analytics/policy.mjs';
const config = { production: true, id: 'G-JG3H8KL8LE', hosts: 'portfolio-2bf3e.web.app', base: '/portfolio/' };
const url = 'https://portfolio-2bf3e.web.app/portfolio/';
describe('eligible', () => {
  it('allows configured production homepage and CV', () => {
    assert.equal(eligible(config, url), true);
    assert.equal(eligible(config, url + 'cv/'), true);
  });
  it('rejects dev, missing config, unexpected hosts, insecure URLs and excluded routes', () => {
    for (const settings of [{ ...config, production: false }, { ...config, id: '' }, { ...config, hosts: '' }]) assert.equal(eligible(settings, url), false);
    for (const href of ['http://portfolio-2bf3e.web.app/portfolio/', 'https://localhost/portfolio/', url + 'style-guide', url + 'style-guide/colors/', url + 'privacy/', 'https://portfolio-2bf3e.web.app/']) assert.equal(eligible(config, href), false);
    assert.equal(eligible({ ...config, base: '/' }, 'https://portfolio-2bf3e.web.app/cv'), true);
  });
});
describe('metadata', () => {
  it('removes private queries, fragments and referrer paths; retains curated campaigns', () => {
    const result = metadata(url + '?email=secret@example.com&utm_source=linkedin&utm_medium=social&utm_campaign=portfolio#secret', 'https://example.com/private?email=secret');
    assert.deepEqual(result, { page_location: url, page_referrer: 'https://example.com/', campaign_source: 'linkedin', campaign_medium: 'social', campaign_name: 'portfolio' });
  });
  it('drops arbitrary campaign values and invalid referrers', () => {
    const result = metadata(url + '?utm_source=someone@example.com&utm_campaign=some-person', 'mailto:private@example.com');
    assert.deepEqual(result, { page_location: url, page_referrer: '' });
  });
});
describe('actionEvent', () => {
  it('maps allowed action labels and discards extra DOM data', () => {
    assert.deepEqual(actionEvent({ analytics: 'contact', location: 'cv', email: 'secret' }), ['contact_click', { method: 'email', location: 'cv' }]);
    assert.deepEqual(actionEvent({ analytics: 'social', location: 'footer', platform: 'github' }), ['social_click', { platform: 'github', location: 'footer' }]);
    assert.deepEqual(actionEvent({ analytics: 'print', location: 'cv' }), ['cv_print_click', { location: 'cv' }]);
    assert.deepEqual(actionEvent({ analytics: 'cta', location: 'hero', cta: 'projects' }), ['cta_click', { cta_name: 'projects', location: 'hero' }]);
    assert.deepEqual(actionEvent({ analytics: 'project', location: 'projects', project: 'teranode-sign' }), ['project_click', { project_id: 'teranode-sign', location: 'projects' }]);
  });
  it('rejects unknown events, projects, platforms and invalid location combinations', () => {
    for (const data of [{ analytics: 'unknown' }, { analytics: 'contact', location: 'secret' }, { analytics: 'social', location: 'hero', platform: 'github' }, { analytics: 'social', location: 'cv', platform: 'secret' }, { analytics: 'project', location: 'projects', project: 'unknown' }, { analytics: 'print', location: 'hero' }]) assert.equal(actionEvent(data), null);
  });
});
describe('readChoice', () => {
  it('accepts only current versioned choices', () => {
    assert.equal(readChoice('v1:accepted'), 'accepted');
    assert.equal(readChoice('v1:rejected'), 'rejected');
    for (const value of [null, 'accepted', 'v0:accepted', '{}']) assert.equal(readChoice(value), null);
  });
});
