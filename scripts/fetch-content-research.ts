import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import * as cheerio from 'cheerio';
import { sources } from '../src/data/sources';
import { ideas } from '../src/data/ideas';

const records = [];
const sourceTexts = new Map<string, string>();
for (const source of sources) {
  const response = await fetch(source.url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
      'accept-language': 'en-US,en;q=0.9'
    },
    signal: AbortSignal.timeout(30_000)
  });
  const html = await response.text();
  const $ = cheerio.load(html);
  const pageTitle = $('title').text().replace(/\s+/g, ' ').trim();
  $('script, style, noscript, nav, header, footer').remove();
  const primaryText = $('main, article').text().replace(/\s+/g, ' ').trim();
  const visibleText = primaryText || $('body').text().replace(/\s+/g, ' ').trim();
  sourceTexts.set(source.id, visibleText.toLowerCase());
  records.push({
    id: source.id,
    url: source.url,
    publisher: source.publisher,
    accessedAt: source.accessedAt,
    fetchedAt: new Date().toISOString(),
    httpStatus: response.status,
    pageTitle,
    responseBytes: Buffer.byteLength(html),
    visibleWordCount: visibleText ? visibleText.split(/\s+/).length : 0,
    contentSha256: createHash('sha256').update(html).digest('hex'),
    researchUse: source.notes
  });
  console.log(`${response.status} ${source.id}: ${pageTitle.slice(0, 80)}`);
  await new Promise((resolve) => setTimeout(resolve, 500));
}

const stopWords = new Set(['about', 'after', 'before', 'couples', 'date', 'from', 'ideas', 'night', 'together', 'with', 'your']);
const semanticAliases: Record<string, string[]> = {
  tv: ['show', 'movie', 'film', 'episode'],
  'low-prep': ['easy', 'simple', 'home'],
  'after-bedtime': ['parents', 'home', 'bedtime'],
  teamwork: ['together', 'couple']
};
const ideaEvidence = ideas.map((idea) => {
  const terms = [...new Set([
    ...idea.tags.map((tag) => tag.replace(/-/g, ' ')),
    ...idea.tags.flatMap((tag) => semanticAliases[tag] ?? []),
    ...idea.title.toLowerCase().split(/[^a-z0-9]+/).filter((term) => term.length >= 5 && !stopWords.has(term))
  ])];
  return {
    ideaId: idea.id,
    sources: idea.sourceIds.map((sourceId) => ({
      sourceId,
      matchedTerms: terms.filter((term) => sourceTexts.get(sourceId)?.includes(term)).slice(0, 8)
    }))
  };
});

await writeFile(new URL('../assets/content-research-sources.json', import.meta.url), `${JSON.stringify({
  version: '1.0',
  policy: 'Metadata-only research receipt. Source prose is not stored or reproduced.',
  records,
  ideaEvidence
}, null, 2)}\n`);

if (records.some((record) => record.httpStatus !== 200)) process.exitCode = 1;
if (ideaEvidence.some((evidence) => evidence.sources.every((source) => source.matchedTerms.length === 0))) process.exitCode = 1;
