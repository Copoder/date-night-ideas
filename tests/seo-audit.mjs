import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';

const root = new URL('../dist/', import.meta.url).pathname;
assert.ok(existsSync(root), 'dist is missing; run npm run build first');
const htmlFiles = [];
const walk = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name === 'index.html' || entry.name.endsWith('.html')) htmlFiles.push(path);
  }
};
walk(root);

const pages = htmlFiles.map((file) => {
  const $ = cheerio.load(readFileSync(file, 'utf8'));
  const canonical = $('link[rel="canonical"]').attr('href');
  assert.ok(canonical, `missing canonical: ${file}`);
  return {
    file,
    $,
    canonical,
    title: $('title').text().trim(),
    description: $('meta[name="description"]').attr('content') ?? '',
    noindex: ($('meta[name="robots"]').attr('content') ?? '').includes('noindex')
  };
});
const indexable = pages.filter((page) => !page.noindex && !page.file.endsWith('404.html'));
assert.equal(new Set(indexable.map((page) => page.canonical)).size, indexable.length, 'duplicate indexable canonical');
for (const page of indexable) {
  assert.equal(page.$('h1').length, 1, `indexable page needs one H1: ${page.file}`);
  assert.ok(page.title.length >= 20 && page.title.length <= 60, `title length ${page.title.length}: ${page.file}`);
  assert.ok(page.description.length >= 70 && page.description.length <= 160, `description length ${page.description.length}: ${page.file}`);
  assert.ok(page.$('script[type="application/ld+json"]').length > 0 || ['/about/', '/editorial-policy/', '/image-credits/', '/privacy/', '/terms/', '/categories/'].includes(new URL(page.canonical).pathname), `schema missing: ${page.file}`);
}

const sitemapIndex = join(root, 'sitemap-index.xml');
const sitemapPath = join(root, 'sitemap-0.xml');
assert.ok(existsSync(sitemapIndex), 'sitemap index missing');
const sitemap = readFileSync(sitemapPath, 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(new Set(sitemapUrls), new Set(indexable.map((page) => page.canonical)), 'sitemap must contain exactly the indexable canonicals');
assert.ok(!sitemapUrls.some((url) => url.includes('/results/')), 'results must not be in sitemap');
assert.ok(sitemapUrls.every((url) => new URL(url).pathname === '/' || new URL(url).pathname.endsWith('/')), 'sitemap must follow trailing-slash policy');

const incoming = new Map(indexable.map((page) => [new URL(page.canonical).pathname, new Set()]));
const builtPaths = new Set(pages.map((page) => new URL(page.canonical).pathname));
for (const page of pages) {
  for (const element of page.$('a[href]').toArray()) {
    const raw = page.$(element).attr('href');
    if (!raw) continue;
    const url = new URL(raw, page.canonical);
    if (url.origin !== 'https://date-night-ideas.com') continue;
    const pathname = url.pathname === '/' || url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
    if (!url.pathname.match(/\.[a-z0-9]+$/i)) assert.ok(url.pathname === '/' || url.pathname.endsWith('/'), `internal link violates trailing-slash policy: ${raw} in ${page.file}`);
    assert.ok(builtPaths.has(pathname), `internal link target is not built: ${raw} in ${page.file}`);
    incoming.get(pathname)?.add(page.canonical);
  }
}
assert.deepEqual([...incoming].filter(([pathname, links]) => pathname !== '/' && links.size === 0), [], 'indexable orphan pages');

const home = pages.find((page) => page.canonical === 'https://date-night-ideas.com/');
assert.ok(home, 'homepage missing');
assert.match(home.$('h1').text(), /date night ideas/i, 'homepage H1 must lead with the main keyword');
assert.ok(home.$('main').text().replace(/\s+/g, ' ').trim().split(/\s+/).length >= 1400, 'homepage authority content is too thin');
assert.equal(new Set(home.$('a[href^="/ideas/"]').toArray().map((element) => home.$(element).attr('href'))).size, 300, 'homepage must link all 300 ideas');

const removedDuplicateRoutes = ['at-home', 'cheap-free', 'romantic', 'playful-games', 'outdoors', 'first-date', 'married-longterm', 'parents', 'daytime', 'unique'];
for (const route of removedDuplicateRoutes) assert.ok(!existsSync(join(root, 'categories', route, 'index.html')), `duplicate category route still built: ${route}`);
assert.ok(existsSync(join(root, 'robots.txt')), 'robots missing');
console.log(`SEO audit passed: ${indexable.length} indexable pages, exact sitemap parity, no orphans, and 300 homepage Idea links.`);
