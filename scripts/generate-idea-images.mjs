import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outputDir = resolve(root, 'assets/generated-idea-images');
const progressPath = resolve(root, 'assets/image-generation-progress.json');
const promptsPath = resolve(root, 'assets/idea-image-generation-prompts.jsonl');

const provider = process.env.IMAGE_PROVIDER || 'pollinations';
const limit = Number(process.env.LIMIT || Infinity);
const startAfter = process.env.START_AFTER || '';
const dryRun = process.argv.includes('--dry-run');
const delayMs = Number(process.env.DELAY_MS || 2500);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadProgress() {
  try {
    return JSON.parse(await readFile(progressPath, 'utf8'));
  } catch {
    return { completed: [], failed: {} };
  }
}

async function saveProgress(progress) {
  await writeFile(progressPath, `${JSON.stringify(progress, null, 2)}\n`);
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function* readPrompts() {
  const rl = createInterface({ input: createReadStream(promptsPath), crlfDelay: Infinity });
  for await (const line of rl) {
    if (!line.trim()) continue;
    yield JSON.parse(line);
  }
}

function compactPrompt(prompt) {
  return prompt.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 3900);
}

async function generateWithPollinations(prompt) {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(compactPrompt(prompt))}?width=1500&height=1000&nologo=true&seed=${Date.now()}`;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, { headers: { 'User-Agent': 'DateNightIdeas/1.0 (editorial image generation)' } });
    if (response.ok) return Buffer.from(await response.arrayBuffer());
    if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 3) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    await sleep(2000 * (attempt + 1));
  }
  throw new Error('Pollinations request failed');
}

async function generateWithOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is required for openai provider');
  const model = process.env.IMAGE_MODEL || 'gpt-image-1';
  const size = process.env.IMAGE_SIZE || '1536x1024';
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt: compactPrompt(prompt),
      n: 1,
      size,
      quality: model === 'dall-e-3' ? 'standard' : 'medium',
    }),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
  const data = await response.json();
  const item = data.data?.[0];
  if (!item) throw new Error('No image data returned');
  if (item.b64_json) return Buffer.from(item.b64_json, 'base64');
  if (item.url) {
    const imageResponse = await fetch(item.url);
    if (!imageResponse.ok) throw new Error(`Failed to download image: ${imageResponse.status}`);
    return Buffer.from(await imageResponse.arrayBuffer());
  }
  throw new Error('Unsupported image response format');
}

const generateImage = provider === 'openai' ? generateWithOpenAI : generateWithPollinations;

await mkdir(outputDir, { recursive: true });
const progress = await loadProgress();
const completed = new Set(progress.completed);

let started = !startAfter;
let processed = 0;
let generated = 0;
let skipped = 0;

for await (const record of readPrompts()) {
  const { customId: slug, prompt } = record;
  if (!started) {
    if (slug === startAfter) started = true;
    else continue;
  }
  if (processed >= limit) break;
  processed += 1;

  const outputPath = join(outputDir, `${slug}.png`);
  if (completed.has(slug) || (await fileExists(outputPath))) {
    skipped += 1;
    if (!completed.has(slug)) completed.add(slug);
    console.log(`skip ${slug} (already exists)`);
    continue;
  }

  if (dryRun) {
    console.log(`dry-run ${slug}`);
    continue;
  }

  try {
    console.log(`generate ${slug} via ${provider}...`);
    const image = await generateImage(prompt);
    await writeFile(outputPath, image);
    completed.add(slug);
    delete progress.failed[slug];
    generated += 1;
    await saveProgress({ ...progress, completed: [...completed].sort() });
    console.log(`saved ${slug}`);
    await sleep(delayMs);
  } catch (error) {
    progress.failed[slug] = String(error);
    await saveProgress({ ...progress, completed: [...completed].sort() });
    console.error(`failed ${slug}: ${error.message}`);
    await sleep(4000);
  }
}

console.log(`Done. generated=${generated} skipped=${skipped} failed=${Object.keys(progress.failed).length}`);
