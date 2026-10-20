import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { access } from 'node:fs/promises';

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

test('colors route documents both themes and guide navigation', async () => {
  const html = await readFile('dist/style-guide/colors/index.html', 'utf8');
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /data-theme="light"/);
  assert.match(html, /data-theme="dark"/);
  for (const token of ['primary', 'secondary', 'accent', 'ink', 'surface', 'haze', 'mist', 'line', 'veil']) {
    assert.ok(html.includes(`--color-${token}`), `Missing color ${token}`);
  }
  for (const token of ['--img-fade', '--glow-a', '--glow-b']) {
    assert.ok(html.includes(token), `Missing effect ${token}`);
  }
  assert.match(html, /rgba\(/);
  assert.match(html, /Contrast/);
  for (const path of ['dist/style-guide/index.html', 'dist/style-guide/colors/index.html']) {
    const page = await readFile(path, 'utf8');
    assert.ok(page.includes(`href="${guidePath}"`));
    assert.ok(page.includes(`href="${guidePath}colors/"`));
  }
});

test('component gallery presents existing patterns with local specimen actions', async () => {
  const html = await readFile('dist/style-guide/components/index.html', 'utf8');
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
  for (const title of ['Actions', 'Theme toggle', 'Availability badge', 'Project card', 'Tech tile', 'Section heading', 'Prose']) {
    assert.ok(html.includes(title), `Missing specimen: ${title}`);
  }
  for (const source of ['Hero.astro', 'Nav.astro', 'Projects.astro', 'Stack.astro', 'SectionHeading.astro', 'global.css']) {
    assert.ok(html.includes(source), `Missing source: ${source}`);
  }
  assert.ok(html.includes(`src="${base}/projects/teranode-sign.png"`));
  const gallery = html.split('data-component-gallery')[1]?.split('</main>')[0];
  assert.ok(gallery);
  for (const [, href] of gallery.matchAll(/href="([^"]+)"/g)) {
    assert.ok(href.startsWith('#'), `Specimen action must stay local: ${href}`);
  }
});

test('all guideline routes have complete base-aware navigation and valid local assets', async () => {
  const routes = ['', 'colors/', 'components/'];
  for (const route of routes) {
    const html = await readFile(`dist/style-guide/${route}index.html`, 'utf8');
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
    const navigation = html.match(/<nav[^>]*aria-label="Style guidelines"[\s\S]*?<\/nav>/)?.[0];
    assert.ok(navigation);
    assert.equal((navigation.match(/aria-current="page"/g) ?? []).length, 1);
    assert.ok(navigation.includes(`href="${guidePath}${route}" aria-current="page"`));
    for (const target of routes) assert.ok(navigation.includes(`href="${guidePath}${target}"`));
    for (const [, url] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
      if (!url.startsWith('/')) continue;
      assert.ok(url.startsWith(`${base}/`), `Incorrect asset base: ${url}`);
      const path = url.slice(base.length + 1).split(/[?#]/)[0];
      await access(join('dist', path));
    }
  }
});

test('guideline styles keep specimens visible without scripts and respect reduced motion', async () => {
  const files = (await readdir('dist/_astro')).filter(name => name.endsWith('.css'));
  const html = await readFile('dist/style-guide/components/index.html', 'utf8');
  const inline = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(match => match[1]);
  const css = [...await Promise.all(files.map(name => readFile(join('dist/_astro', name), 'utf8'))), ...inline].join('\n');
  assert.ok(/\.component-gallery[^{}]*\[data-reveal\][^{]*\{[^}]*opacity:1/.test(css), 'Gallery reveal specimens must be visible without JavaScript');
  assert.ok(/@media\s*\(prefers-reduced-motion:\s*reduce\)\{\.guide[^{}]*\{[^}]*animation:none!important/.test(css), 'Guide must disable animations under reduced motion');
});
