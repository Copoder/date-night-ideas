import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const creditsPath = join(root, 'src/data/imageCredits.json');
let credits = JSON.parse(await readFile(creditsPath, 'utf8'));
const mappings = [
  { id: 'group-active', group: 'active', sourceId: 'seasonal-winter' },
  { id: 'group-picnic', group: 'picnic', sourceId: 'seasonal-fall' },
  { id: 'group-walking', group: 'walking', sourceId: 'cheap-free' },
  { id: 'group-garden', group: 'garden', sourceId: 'seasonal-fall' },
  { id: 'group-market', group: 'market', sourceId: 'daytime' },
  { id: 'group-driving', group: 'driving', sourceId: 'outdoors' },
  { id: 'group-photos', group: 'photos', sourceId: 'home-hero' },
  { id: 'group-conversation', group: 'conversation', sourceId: 'romantic' },
  { id: 'group-home-cozy', group: 'home-cozy', sourceId: 'parents' }
];
for (const mapping of mappings) {
  const source = credits.find((entry) => entry.id === mapping.sourceId);
  if (!source) throw new Error(`Missing source credit: ${mapping.sourceId}`);
  const targetPath = `/images/idea-groups/${mapping.group}.webp`;
  await copyFile(join(root, 'public', source.path), join(root, 'public', targetPath));
  credits = [...credits.filter((entry) => entry.id !== mapping.id), { ...source, id: mapping.id, path: targetPath, reusedFrom: mapping.sourceId }];
  console.log(`${mapping.id}: reused approved ${mapping.sourceId} asset`);
}
await writeFile(creditsPath, `${JSON.stringify(credits, null, 2)}\n`);
