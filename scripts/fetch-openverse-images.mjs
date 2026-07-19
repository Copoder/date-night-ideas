import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const targets = [
  { id: 'home-hero', query: 'couple picnic date', path: 'public/images/site/home-hero.webp', width: 2000, height: 1167 },
  { id: 'at-home', query: 'jigsaw puzzle table', preferredUrl: 'https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4NzE1ODk2LWltYWdlLWt3dnY2cmx0LmpwZw.jpg', path: 'public/images/categories/at-home.webp' },
  { id: 'cheap-free', query: 'couple walking', preferredUrl: 'https://live.staticflickr.com/7654/16267925833_4dc1aef1ec_b.jpg', path: 'public/images/categories/cheap-free.webp' },
  { id: 'romantic', query: 'candlelight dinner table', path: 'public/images/categories/romantic.webp' },
  { id: 'playful-games', query: 'board game night table', path: 'public/images/categories/playful-games.webp' },
  { id: 'outdoors', query: 'couple hiking trail', path: 'public/images/categories/outdoors.webp' },
  { id: 'first-date', query: 'coffee cafe table', path: 'public/images/categories/first-date.webp' },
  { id: 'married-longterm', query: 'senior couple walking', preferredUrl: 'https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL2ZsMjIxNDUzMjg0MzYtaW1hZ2Uta3ljanM1MHAuanBn.jpg', path: 'public/images/categories/married-longterm.webp' },
  { id: 'parents', query: 'couple breakfast home', preferredUrl: 'https://live.staticflickr.com/1437/4725163703_dde47873d4_b.jpg', path: 'public/images/categories/parents.webp' },
  { id: 'creative-diy', query: 'pottery workshop clay hands', path: 'public/images/categories/creative-diy.webp' },
  { id: 'food-drink', query: 'cooking dinner kitchen hands', preferredUrl: 'https://live.staticflickr.com/4022/4285161011_87489300fb_b.jpg', path: 'public/images/categories/food-drink.webp' },
  { id: 'seasonal-fall', query: 'autumn leaves couple', preferredUrl: 'https://live.staticflickr.com/129/319623937_d1906b1234_b.jpg', path: 'public/images/categories/seasonal-fall.webp' },
  { id: 'seasonal-winter', query: 'couple ice skating winter', path: 'public/images/categories/seasonal-winter.webp' },
  { id: 'seasonal-spring-summer', query: 'couple summer picnic', path: 'public/images/categories/seasonal-spring-summer.webp' },
  { id: 'daytime', query: 'farmers market vegetables', preferredUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Ballard_Farmers%27_Market_-_vegetables.jpg', path: 'public/images/categories/daytime.webp' },
  { id: 'unique', query: 'kayaking couple', preferredUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Kayaking_couple.jpg', path: 'public/images/categories/unique.webp' },
  { id: 'group-coffee', query: 'couple breakfast home', preferredUrl: 'https://live.staticflickr.com/1437/4725163703_dde47873d4_b.jpg', path: 'public/images/idea-groups/coffee.webp' },
  { id: 'group-dessert', query: 'ice cream sundae dessert', path: 'public/images/idea-groups/dessert.webp' },
  { id: 'group-cooking', query: 'cooking dinner kitchen hands', preferredUrl: 'https://live.staticflickr.com/4022/4285161011_87489300fb_b.jpg', path: 'public/images/idea-groups/cooking.webp' },
  { id: 'group-books', query: 'open books coffee table', path: 'public/images/idea-groups/books.webp' },
  { id: 'group-music', query: 'vinyl records listening music', path: 'public/images/idea-groups/music.webp' },
  { id: 'group-walking', query: 'couple walking path', path: 'public/images/idea-groups/walking.webp' },
  { id: 'group-picnic', query: 'picnic blanket food park', path: 'public/images/idea-groups/picnic.webp' },
  { id: 'group-movie', query: 'cinema projector movie', path: 'public/images/idea-groups/movie.webp' },
  { id: 'group-games', query: 'board game table pieces', path: 'public/images/idea-groups/games.webp' },
  { id: 'group-craft', query: 'pottery workshop clay hands', preferredUrl: 'https://live.staticflickr.com/3831/13127825023_6541574c4c_b.jpg', path: 'public/images/idea-groups/craft.webp' },
  { id: 'group-water', query: 'kayaking couple', preferredUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Kayaking_couple.jpg', path: 'public/images/idea-groups/water.webp' },
  { id: 'group-active', query: 'bicycle trail outdoors', path: 'public/images/idea-groups/active.webp' },
  { id: 'group-garden', query: 'botanical garden flowers', path: 'public/images/idea-groups/garden.webp' },
  { id: 'group-market', query: 'farmers market stall', path: 'public/images/idea-groups/market.webp' },
  { id: 'group-driving', query: 'road trip car landscape', path: 'public/images/idea-groups/driving.webp' },
  { id: 'group-photos', query: 'camera photo walk', path: 'public/images/idea-groups/photos.webp' },
  { id: 'group-conversation', query: 'two chairs coffee conversation', path: 'public/images/idea-groups/conversation.webp' },
  { id: 'group-home-cozy', query: 'cozy home candles blanket', path: 'public/images/idea-groups/home-cozy.webp' },
  { id: 'social-default', query: 'couple picnic date', path: 'public/images/social/default.webp', width: 1200, height: 630 }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchRetry = async (url) => {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, { headers: { 'User-Agent': 'DateNightIdeas/1.0 (prelaunch editorial project)' } });
    if (response.ok) return response;
    if (![403, 429, 500, 502, 503, 504].includes(response.status) || attempt === 3) throw new Error(`${response.status} for ${url}`);
    await sleep(1000 * (attempt + 1));
  }
  throw new Error('unreachable');
};

const creditsPath = join(root, 'src/data/imageCredits.json');
let credits = [];
try { credits = JSON.parse(await readFile(creditsPath, 'utf8')); } catch { /* First asset run. */ }
const startIndex = process.env.START_ID ? targets.findIndex((target) => target.id === process.env.START_ID) : 0;
if (startIndex < 0) throw new Error(`Unknown START_ID: ${process.env.START_ID}`);
const limit = Number(process.env.LIMIT || targets.length);
const activeTargets = targets.slice(startIndex, startIndex + limit);
for (const target of activeTargets) {
  await sleep(900);
  const params = new URLSearchParams({ q: target.query, license: 'cc0,by,by-sa', mature: 'false', page_size: '20' });
  const search = await fetchRetry(`https://api.openverse.org/v1/images/?${params}`);
  const data = await search.json();
  const results = data.results ?? [];
  const candidates = [
    ...results.filter((image) => image.width >= 1200 && image.height >= 650 && image.width / image.height <= 2.4),
    ...results.filter((image) => image.width >= 900 && image.height >= 500),
    ...results
  ].filter((image, index, all) => all.findIndex((entry) => entry.id === image.id) === index);
  if (target.preferredUrl) candidates.sort((a, b) => Number(b.url === target.preferredUrl) - Number(a.url === target.preferredUrl));
  let chosen;
  let response;
  for (const candidate of candidates.slice(0, 10)) {
    await sleep(350);
    try { response = await fetchRetry(candidate.url); chosen = candidate; break; }
    catch {
      try { response = await fetchRetry(candidate.thumbnail); chosen = candidate; break; }
      catch { /* Try the next licensed candidate. */ }
    }
  }
  if (!chosen || !response) throw new Error(`No downloadable Openverse result for ${target.id}: ${target.query}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const output = join(root, target.path);
  await mkdir(dirname(output), { recursive: true });
  await sharp(buffer).rotate().resize(target.width ?? 1600, target.height ?? 1067, { fit: 'cover', position: 'attention' }).webp({ quality: 82, effort: 5 }).toFile(output);
  const credit = {
    id: target.id,
    path: `/${target.path.replace(/^public\//, '')}`,
    title: chosen.title || target.query,
    creator: chosen.creator || 'Unknown',
    creatorUrl: chosen.creator_url || '',
    license: String(chosen.license || '').toUpperCase(),
    licenseVersion: chosen.license_version || '',
    licenseUrl: chosen.license_url || '',
    sourcePage: chosen.foreign_landing_url,
    originalFile: chosen.url,
    provider: chosen.provider || 'Openverse',
    query: target.query
  };
  credits = [...credits.filter((entry) => entry.id !== target.id), credit];
  await writeFile(creditsPath, `${JSON.stringify(credits, null, 2)}\n`);
  console.log(`${target.id}: ${chosen.title} by ${chosen.creator} (${String(chosen.license).toUpperCase()})`);
}
console.log(`Saved ${activeTargets.length} assets; credit registry now has ${credits.length} records.`);
