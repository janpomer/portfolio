import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html = path => readFile('dist/' + path, 'utf8');
describe('analytics markup', () => {
  it('provides equally available consent choices, settings and base-aware privacy links', async () => {
    const page = await html('index.html');
    assert.match(page, /data-consent="accepted"/);
    assert.match(page, /data-consent="rejected"/);
    assert.match(page, /data-analytics-settings/);
    assert.ok(page.includes(`href="${(process.env.BASE_PATH ?? '/portfolio').replace(/\/$/, '')}/privacy/"`));
    assert.ok(!(await html('privacy/index.html')).includes('data-analytics="contact"'));
  });
  it('annotates linked projects and contact, social, hero and navigation actions', async () => {
    const page = await html('index.html');
    for (const action of ['contact', 'social', 'cta', 'project']) assert.ok(page.includes(`data-analytics="${action}"`), action);
    assert.match(page, /data-project="teranode-sign"/);
    assert.match(page, /data-location="nav_mobile"/);
    assert.match(page, /data-location="nav_desktop"/);
    assert.ok(!/data-analytics="project"[^>]*data-project="miradio"/.test(page));
  });
  it('distinguishes native print intent from automatic print entry', async () => {
    const page = await html('cv/index.html');
    assert.match(page, /data-analytics="print"/);
    assert.match(page, /data-analytics="contact"/);
    assert.match(page, /data-analytics="project"/);
    assert.match(page, /window\.print\(\)/);
    assert.match(page, /has\("print"\)/);
  });
});
