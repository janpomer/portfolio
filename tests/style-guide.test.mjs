import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.env.BASE_PATH ?? '/portfolio').replace(/\/$/, '');
const guidePath = `${base}/style-guide/`;

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : [];
  }));
  return files.flat();
}

test('fonts route renders an unindexed guide with base-aware navigation', async () => {
  const html = await readFile('dist/style-guide/index.html', 'utf8');
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /<nav[^>]*aria-label="Style guidelines"/);
  assert.ok(html.includes(`href="${guidePath}"`));
  assert.match(html, /aria-current="page"/);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
  assert.match(html, /data-theme-toggle/);
  assert.match(html, /Inter/);
  assert.match(html, /system-ui/);
  for (const weight of [400, 500, 600, 700, 800]) {
    assert.ok(html.includes(`Weight ${weight}`), `Missing font specimen for ${weight}`);
  }
  for (const section of ['Type scale', 'Reading &amp; inline text', 'Document exception']) {
    assert.ok(html.includes(section), `Missing section: ${section}`);
  }
});

test('public pages neither link to guidelines nor inherit their indexing directives', async () => {
  const publicFiles = (await htmlFiles('dist')).filter((path) => !path.startsWith('dist/style-guide/'));
  assert.ok(publicFiles.includes('dist/index.html'));
  assert.ok(publicFiles.includes('dist/cv/index.html'));
  for (const path of publicFiles) {
    const html = await readFile(path, 'utf8');
    assert.doesNotMatch(html, /href=["'][^"']*\/style-guide(?:\/|["'#?])/i, path);
    assert.doesNotMatch(html, /<meta name="robots" content="noindex, nofollow"/, path);
  }
});
