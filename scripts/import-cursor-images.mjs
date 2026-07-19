import { copyFile, mkdir, readdir, readFile } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const sourceDir = resolve(process.env.CURSOR_IMAGE_DIR || join(process.env.HOME, '.cursor/projects/Users-tonghou-WebsiteProject-date-night-ideas/assets'));
const targetDir = resolve(root, 'assets/generated-idea-images');

const plan = JSON.parse(await readFile(resolve(root, 'assets/idea-image-generation-plan.json'), 'utf8'));
const validSlugs = new Set(plan.records.map((record) => record.ideaSlug));

await mkdir(targetDir, { recursive: true });
const files = (await readdir(sourceDir)).filter((file) => /\.(png|jpe?g|webp)$/i.test(file));

let copied = 0;
for (const file of files) {
  const slug = basename(file, extname(file));
  if (!validSlugs.has(slug)) continue;
  await copyFile(join(sourceDir, file), join(targetDir, file));
  copied += 1;
  console.log(`imported ${slug}`);
}

console.log(`Imported ${copied} images into ${targetDir}`);
