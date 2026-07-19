import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const targets = [
  { id: 'home-hero', query: 'couple picnic -NARA', preferredTitle: 'File:A European couple having a picnic in a park (P050783-732214).jpg', path: 'public/images/site/home-hero.webp', width: 2000, height: 1167 },
  { id: 'at-home', query: 'board game table', path: 'public/images/categories/at-home.webp' },
  { id: 'cheap-free', query: 'public park picnic', path: 'public/images/categories/cheap-free.webp' },
  { id: 'romantic', query: 'candlelight restaurant dinner table', path: 'public/images/categories/romantic.webp' },
  { id: 'playful-games', query: 'chess board game pieces', path: 'public/images/categories/playful-games.webp' },
  { id: 'outdoors', query: 'hiking trail landscape', path: 'public/images/categories/outdoors.webp' },
  { id: 'first-date', query: 'coffee cafe table', path: 'public/images/categories/first-date.webp' },
  { id: 'married-longterm', query: 'older couple walking -NARA', path: 'public/images/categories/married-longterm.webp' },
  { id: 'parents', query: 'two coffee mugs home table', path: 'public/images/categories/parents.webp' },
  { id: 'creative-diy', query: 'pottery workshop hands clay', path: 'public/images/categories/creative-diy.webp' },
  { id: 'food-drink', query: 'fresh pasta making', path: 'public/images/categories/food-drink.webp' },
  { id: 'seasonal-fall', query: 'autumn picnic', path: 'public/images/categories/seasonal-fall.webp' },
  { id: 'seasonal-winter', query: 'outdoor ice skating rink', path: 'public/images/categories/seasonal-winter.webp' },
  { id: 'seasonal-spring-summer', query: 'summer picnic park', path: 'public/images/categories/seasonal-spring-summer.webp' },
  { id: 'daytime', query: 'farmers market people daytime', path: 'public/images/categories/daytime.webp' },
  { id: 'unique', query: 'tandem kayak', path: 'public/images/categories/unique.webp' },
  { id: 'social-default', query: 'couple picnic -NARA', preferredTitle: 'File:A European couple having a picnic in a park (P050783-732214).jpg', path: 'public/images/social/default.webp', width: 1200, height: 630 }
];

const allowedLicense = (license = '') => /public domain|cc0|cc by|cc-by/i.test(license);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchRetry = async (url, options) => {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(url, options);
    if (response.ok) return response;
    if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 4) return response;
    await sleep(2500 * (attempt + 1));
  }
  throw new Error('unreachable');
};
const api = async (query) => {
  const params = new URLSearchParams({
    action: 'query', generator: 'search', gsrsearch: `filetype:bitmap ${query}`, gsrnamespace: '6', gsrlimit: '25',
    prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '2000', format: 'json', origin: '*'
  });
  const response = await fetchRetry(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { 'User-Agent': 'DateNightIdeas/1.0 (prelaunch content project)' } });
  if (!response.ok) throw new Error(`Commons API failed: ${response.status}`);
  return response.json();
};

const clean = (value = '') => value.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
const credits = [];
for (const target of targets) {
  await sleep(1800);
  const data = await api(target.query);
  const candidates = Object.values(data.query?.pages ?? {}).map((page) => ({ page, info: page.imageinfo?.[0] })).filter(({ page, info }) => {
    const license = info?.extmetadata?.LicenseShortName?.value ?? '';
    return info && !/NARA|\.pdf$|\.svg$/i.test(page.title) && /^image\/(jpeg|png|webp)$/.test(info.mime) && info.width >= 1000 && info.height >= 600 && allowedLicense(license);
  });
  const chosen = candidates.find(({ page }) => page.title === target.preferredTitle) ?? candidates[0];
  if (!chosen) throw new Error(`No suitable Commons image for ${target.id}: ${target.query}`);
  await sleep(1800);
  const response = await fetchRetry(chosen.info.thumburl ?? chosen.info.url, { headers: { 'User-Agent': 'DateNightIdeas/1.0 (prelaunch content project)' } });
  if (!response.ok) throw new Error(`Image download failed for ${target.id}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const output = join(root, target.path);
  await mkdir(join(output, '..'), { recursive: true });
  await sharp(buffer)
    .rotate()
    .resize(target.width ?? 1600, target.height ?? 1067, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 5 })
    .toFile(output);
  const meta = chosen.info.extmetadata ?? {};
  credits.push({
    id: target.id,
    path: `/${target.path.replace(/^public\//, '')}`,
    sourcePage: chosen.info.descriptionurl,
    originalFile: chosen.info.url,
    title: clean(meta.ObjectName?.value || chosen.page.title.replace(/^File:/, '')),
    creator: clean(meta.Artist?.value || 'Unknown'),
    license: clean(meta.LicenseShortName?.value),
    licenseUrl: meta.LicenseUrl?.value || '',
    attribution: clean(meta.Credit?.value || meta.Attribution?.value || ''),
    query: target.query
  });
  console.log(`${target.id}: ${chosen.page.title} (${credits.at(-1).license})`);
}
await mkdir(join(root, 'src/data'), { recursive: true });
await writeFile(join(root, 'src/data/imageCredits.json'), `${JSON.stringify(credits, null, 2)}\n`);
console.log(`Saved ${credits.length} licensed images and credit records.`);
