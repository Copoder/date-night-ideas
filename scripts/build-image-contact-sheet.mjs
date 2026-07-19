import { readdir, mkdir } from 'node:fs/promises';
import { join, basename } from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const categoryDir = join(root, process.env.CONTACT_DIR || 'public/images/categories');
const files = (await readdir(categoryDir)).filter((file) => file.endsWith('.webp')).sort();
const tileWidth = 360;
const tileHeight = 270;
const labelHeight = 42;
const columns = 3;
const rows = Math.ceil(files.length / columns);
const composites = [];
for (let index = 0; index < files.length; index += 1) {
  const image = await sharp(join(categoryDir, files[index])).resize(tileWidth, tileHeight, { fit: 'cover' }).png().toBuffer();
  const label = await sharp({
    text: { text: basename(files[index], '.webp'), font: 'Arial', width: tileWidth, height: labelHeight, align: 'center', rgba: true }
  }).png().toBuffer();
  const left = (index % columns) * tileWidth;
  const top = Math.floor(index / columns) * (tileHeight + labelHeight);
  composites.push({ input: image, left, top });
  composites.push({ input: label, left, top: top + tileHeight });
}
await mkdir(join(root, 'artifacts'), { recursive: true });
await sharp({ create: { width: tileWidth * columns, height: (tileHeight + labelHeight) * rows, channels: 3, background: '#fff9ed' } })
  .composite(composites)
  .jpeg({ quality: 88 })
  .toFile(join(root, `artifacts/${process.env.CONTACT_NAME || 'image-contact-sheet'}.jpg`));
console.log(`Contact sheet built with ${files.length} images.`);
