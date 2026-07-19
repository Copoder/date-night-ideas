import { readFile, writeFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outputDir = resolve(root, 'assets/generated-idea-images');
const progressPath = resolve(root, 'assets/image-generation-progress.json');
const promptsPath = resolve(root, 'assets/idea-image-generation-prompts.jsonl');
const delayMs = Number(process.env.DELAY_MS || 8000);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function shortPrompt(record) {
  const title = (record.prompt.match(/Idea “([^”]+)”/) || [])[1] || record.customId;
  const activity = (record.prompt.match(/activity: ([^\n]+)/) || [])[1] || '';
  return `Photorealistic editorial lifestyle photo for date night idea ${title}. ${activity} Exactly two adults as a couple, candid natural light, landscape composition, no text, no logos, no watermark.`;
}

async function exists(path) {
  try {
    await import('node:fs/promises').then((m) => m.access(path));
    return true;
  } catch {
    return false;
  }
}

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

const progress = await loadProgress();
const completed = new Set(progress.completed);

for await (const line of createInterface({ input: createReadStream(promptsPath), crlfDelay: Infinity })) {
  if (!line.trim()) continue;
  const record = JSON.parse(line);
  const slug = record.customId;
  const outputPath = join(outputDir, `${slug}.png`);
  if (completed.has(slug) || (await exists(outputPath))) {
    if (!completed.has(slug)) completed.add(slug);
    continue;
  }

  const prompt = shortPrompt(record);
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1500&height=1000&nologo=true&seed=${Math.floor(Math.random() * 1e9)}`;

  try {
    console.log(`generate ${slug}...`);
    const response = await fetch(url, { headers: { 'User-Agent': 'DateNightIdeas/1.0' } });
    if (!response.ok) throw new Error(`${response.status}`);
    const buf = Buffer.from(await response.arrayBuffer());
    if (buf.length < 1000 || buf.toString('utf8', 0, 1) === '{') throw new Error('invalid image payload');
    await writeFile(outputPath, buf);
    completed.add(slug);
    delete progress.failed[slug];
    await saveProgress({ ...progress, completed: [...completed].sort() });
    console.log(`saved ${slug}`);
  } catch (error) {
    progress.failed[slug] = String(error);
    await saveProgress({ ...progress, completed: [...completed].sort() });
    console.error(`failed ${slug}: ${error.message}`);
  }

  await sleep(delayMs);
}

console.log(`Pollinations complete. total=${completed.size}`);
