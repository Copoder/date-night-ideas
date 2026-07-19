import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
if (!args.includes('--reviewed')) {
  throw new Error('Refusing to publish unreviewed images. Re-run with --reviewed after checking every image against its Idea brief.');
}

const inputDir = resolve(args.find((arg) => !arg.startsWith('--')) ?? 'assets/generated-idea-images');
const plan = JSON.parse(await readFile(resolve('assets/idea-image-generation-plan.json'), 'utf8')) as {
  records: Array<{ ideaSlug: string; use: { outputPath: string } }>;
};
const validSlugs = new Set(plan.records.map((record) => record.ideaSlug));
const files = (await readdir(inputDir)).filter((file) => /\.(png|jpe?g|webp)$/i.test(file));
if (!files.length) throw new Error(`No generated images found in ${inputDir}`);

const approvedPath = resolve('src/data/approvedIdeaImages.json');
const approved = new Set(JSON.parse(await readFile(approvedPath, 'utf8')) as string[]);
await mkdir(resolve('public/images/ideas'), { recursive: true });

for (const file of files) {
  const slug = basename(file, extname(file));
  if (!validSlugs.has(slug)) throw new Error(`Unknown image slug: ${slug}`);
  await sharp(join(inputDir, file))
    .rotate()
    .resize(1500, 1000, { fit: 'cover', position: 'attention' })
    .webp({ quality: 84 })
    .toFile(resolve(`public/images/ideas/${slug}.webp`));
  approved.add(slug);
}

await writeFile(approvedPath, `${JSON.stringify([...approved].sort(), null, 2)}\n`);
console.log(`Installed ${files.length} reviewed images; ${approved.size} Idea images are now approved.`);
