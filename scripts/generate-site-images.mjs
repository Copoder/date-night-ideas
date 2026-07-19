import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { dirname, join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const promptsPath = resolve(root, 'assets/site-image-generation-prompts.jsonl');
const provider = process.env.IMAGE_PROVIDER || 'pollinations';
const delayMs = Number(process.env.DELAY_MS || 2500);
const dryRun = process.argv.includes('--dry-run');

const targetSize = {
  '12:7': { width: 2400, height: 1400 },
  '3:2': { width: 1500, height: 1000 },
  '1.91:1': { width: 1200, height: 630 },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function compactPrompt(prompt) {
  return prompt.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 3900);
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generateWithPollinations(prompt, aspectRatio) {
  const size = targetSize[aspectRatio] || targetSize['3:2'];
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(compactPrompt(prompt))}?width=${size.width}&height=${size.height}&nologo=true&seed=${Date.now()}`;
  const response = await fetch(url, { headers: { 'User-Agent': 'DateNightIdeas/1.0 (editorial image generation)' } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return Buffer.from(await response.arrayBuffer());
}

async function* readPrompts() {
  const rl = createInterface({ input: createReadStream(promptsPath), crlfDelay: Infinity });
  for await (const line of rl) {
    if (!line.trim()) continue;
    yield JSON.parse(line);
  }
}

for await (const record of readPrompts()) {
  const { customId, prompt, outputPath, placements } = record;
  const aspectRatio = placements?.[0]?.aspectRatio || '3:2';
  const absoluteOutput = resolve(root, outputPath);
  const size = targetSize[aspectRatio] || targetSize['3:2'];

  if (await fileExists(absoluteOutput)) {
    console.log(`skip ${customId} (already exists)`);
    continue;
  }

  if (dryRun) {
    console.log(`dry-run ${customId} -> ${outputPath}`);
    continue;
  }

  console.log(`generate ${customId} via ${provider}...`);
  const image = await generateWithPollinations(prompt, aspectRatio);
  await mkdir(dirname(absoluteOutput), { recursive: true });
  await sharp(image)
    .rotate()
    .resize(size.width, size.height, { fit: 'cover', position: 'attention' })
    .webp({ quality: 84 })
    .toFile(absoluteOutput);
  console.log(`saved ${outputPath}`);
  await sleep(delayMs);
}

console.log('Site images complete.');
