import { ideas } from '../src/data/ideas';
import { categories } from '../src/data/categories';
import imageCredits from '../src/data/imageCredits.json';
import { sources } from '../src/data/sources';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const expected: Record<string, number> = {
  'at-home': 40, 'cheap-free': 30, romantic: 25, 'playful-games': 25, outdoors: 20,
  'first-date': 20, 'married-longterm': 20, parents: 15, 'creative-diy': 20, 'food-drink': 20,
  'seasonal-fall': 12, 'seasonal-winter': 12, 'seasonal-spring-summer': 13, daytime: 13, unique: 15
};

const fail = (message: string): never => { throw new Error(`Content audit failed: ${message}`); };
if (ideas.length !== 300) fail(`expected 300 published ideas, found ${ideas.length}`);
const slugs = new Set(ideas.map((idea) => idea.slug));
const titles = new Set(ideas.map((idea) => idea.title));
if (slugs.size !== ideas.length) fail('duplicate slug');
if (titles.size !== ideas.length) fail('duplicate title');
const imageManifest = JSON.parse(readFileSync(resolve('assets/image-requirements.json'), 'utf8'));
const ideaImagePlan = JSON.parse(readFileSync(resolve('assets/idea-image-generation-plan.json'), 'utf8'));
const researchReceipt = JSON.parse(readFileSync(resolve('assets/content-research-sources.json'), 'utf8'));
const imageRequirementIds = new Set(imageManifest.requirements.map((requirement: { id: string }) => requirement.id));
const ideaImageRequirementIds = new Set(ideaImagePlan.records.map((requirement: { id: string }) => requirement.id));
const ideaImageBriefs = new Map(ideaImagePlan.records.map((record: { ideaSlug: string }) => [record.ideaSlug, record]));
const sourceIds = new Set(sources.map((source) => source.id));
const researchRecords = new Map(researchReceipt.records.map((record: { id: string }) => [record.id, record]));
const ideaEvidence = new Map(researchReceipt.ideaEvidence.map((record: { ideaId: string }) => [record.ideaId, record]));
if (researchRecords.size !== sources.length) fail(`research receipt has ${researchRecords.size} records for ${sources.length} sources`);
for (const source of sources) {
  const record = researchRecords.get(source.id) as { httpStatus?: number; contentSha256?: string; visibleWordCount?: number } | undefined;
  if (!record || record.httpStatus !== 200 || !record.contentSha256 || !record.visibleWordCount) fail(`${source.id} does not have a valid research receipt`);
}
if (imageManifest.requirements.length !== 35) fail(`expected 35 image requirements, found ${imageManifest.requirements.length}`);
if (ideaImagePlan.records.length !== ideas.length) fail(`expected ${ideas.length} Idea image briefs, found ${ideaImagePlan.records.length}`);
if (new Set(ideaImagePlan.records.map((record: { ideaSlug: string }) => record.ideaSlug)).size !== ideas.length) fail('duplicate or missing Idea image brief slugs');
const offTheme = /fold laundry|spring cleaning|work-break|separate errands|create a date for strangers|home project with a finish line/i;
for (const requirement of imageManifest.requirements as Array<{
  id: string;
  status: string;
  outputPath: string;
  provenance?: { type?: string; sourcePage?: string; licenseUrl?: string };
}>) {
  if (requirement.status !== 'approved') fail(`${requirement.id} is not approved`);
  if (!existsSync(resolve(requirement.outputPath))) fail(`${requirement.id} output is missing: ${requirement.outputPath}`);
  if (requirement.provenance?.type === 'free_photo' && (!requirement.provenance.sourcePage || !requirement.provenance.licenseUrl)) {
    fail(`${requirement.id} is missing photo provenance`);
  }
}
for (const credit of imageCredits) {
  if (!credit.path || !credit.sourcePage || !credit.license || !credit.licenseUrl) fail(`${credit.id} has an incomplete image credit`);
  if (!existsSync(resolve('public', credit.path.replace(/^\//, '')))) fail(`${credit.id} credit references a missing image`);
}
const picnicCredit = imageCredits.find((credit) => credit.id === 'group-picnic') as (typeof imageCredits)[number] & { reusedFrom?: string };
if (picnicCredit?.reusedFrom !== 'seasonal-fall') fail('picnic results must use the approved alcohol-free fallback asset');
for (const category of categories) {
  const count = ideas.filter((idea) => idea.primaryCategory === category.id).length;
  if (count < expected[category.id]) fail(`${category.id} has ${count}; expected ${expected[category.id]}`);
}
for (const idea of ideas) {
  if (!idea.hook || !idea.summary || idea.steps.length < 3 || !idea.sourceIds.length || !idea.imageRequirementId) fail(`${idea.slug} is missing required editorial fields`);
  if (!imageRequirementIds.has(idea.imageRequirementId) && !ideaImageRequirementIds.has(idea.imageRequirementId)) fail(`${idea.slug} references missing image requirement ${idea.imageRequirementId}`);
  if (!existsSync(resolve('public', idea.image.replace(/^\//, '')))) fail(`${idea.slug} references missing image ${idea.image}`);
  if (!idea.editorialReview.originalityChecked || !idea.editorialReview.safetyChecked) fail(`${idea.slug} is not reviewed`);
  if (!idea.editorialReview.researchChecked || !idea.editorialReview.copyEdited || !idea.editorialReview.reviewId) fail(`${idea.slug} has an incomplete editorial record`);
  if (idea.sourceIds.length < 2 || idea.sourceIds.some((id) => !sourceIds.has(id))) fail(`${idea.slug} has an invalid source map`);
  if (!idea.researchNote || !idea.editorialNote) fail(`${idea.slug} is missing research or editorial notes`);
  const evidence = ideaEvidence.get(idea.id) as { sources?: Array<{ sourceId: string; matchedTerms: string[] }> } | undefined;
  if (!evidence || evidence.sources?.length !== idea.sourceIds.length || evidence.sources.every((source) => source.matchedTerms.length === 0)) fail(`${idea.slug} has no per-Idea research theme evidence`);
  if (/Give the night a clear mission|conversational heavy lifting|Skip the vague plan|Make one ordinary window/.test(idea.hook)) fail(`${idea.slug} still uses a banned template hook`);
  if (idea.status !== 'published') fail(`${idea.slug} is not published`);
  if (offTheme.test(`${idea.title} ${idea.summary}`)) fail(`${idea.slug} is not a date-night activity; remove the household, work, errand, or meta framing`);
  const brief = ideaImageBriefs.get(idea.slug) as { status?: string; prompt?: string; use?: { outputPath?: string } } | undefined;
  if (!brief || brief.status !== 'ready_for_generation' || !brief.prompt?.includes(idea.title) || !brief.prompt.includes('photorealistic') || !brief.prompt.includes('two adults') || brief.use?.outputPath !== `public/images/ideas/${idea.slug}.webp`) {
    fail(`${idea.slug} has an incomplete date-matched image brief`);
  }
}
if (new Set(ideas.map((idea) => idea.editorialReview.reviewId)).size !== ideas.length) fail('duplicate editorial review IDs');
if (new Set(ideas.map((idea) => idea.whyItWorks)).size !== ideas.length) fail('why-it-works copy is not idea-specific');
console.log(`Content audit passed: ${ideas.length} unique Ideas across ${categories.length} categories.`);
for (const category of categories) console.log(`${category.id}: ${ideas.filter((idea) => idea.primaryCategory === category.id).length}`);
