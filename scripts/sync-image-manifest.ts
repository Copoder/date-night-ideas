import { writeFile } from 'node:fs/promises';
import { categories } from '../src/data/categories';
import { spokes } from '../src/data/spokes';
import credits from '../src/data/imageCredits.json' with { type: 'json' };

const creditById = new Map(credits.map((credit) => [credit.id, credit]));
const commonNegative = 'text, watermark, logo, solo person, object-only still life, empty landscape, unrelated activity, uncanny faces, extra fingers, duplicated objects, generic stock-photo pose, sexualized styling, illustration, 3D render, heavy blur, dark underexposure';
const categoryScenes: Record<string, string> = {
  'at-home': 'two adults building a cozy floor picnic and puzzle setup in a lived-in apartment',
  'cheap-free': 'two adults on a relaxed sunset neighborhood walk with homemade drinks',
  romantic: 'two adults sharing dessert and attentive conversation at a small candlelit table without romantic cliches',
  'playful-games': 'two adults laughing over a recognizable board game in progress',
  outdoors: 'two adults walking a safe scenic trail together with the route clearly visible',
  'first-date': 'two adults meeting at a welcoming public cafe table, natural conversation and easy body language',
  'married-longterm': 'a long-term adult couple cooking or dancing together at home, playful and familiar rather than posed',
  parents: 'two adult partners sharing a quiet dessert after bedtime in a lived-in home, no chores in progress',
  'creative-diy': 'two adults making pottery or painting side by side with both faces and hands visible',
  'food-drink': 'two adults actively cooking and tasting one attainable dish together in a real kitchen',
  'seasonal-fall': 'two adults sharing a simple thermos picnic among autumn color',
  'seasonal-winter': 'two adults ice skating together at an accessible public rink and enjoying the moment',
  'seasonal-spring-summer': 'two adults sharing an early-evening picnic in fresh spring or summer light',
  daytime: 'two adults choosing breakfast items together at a daytime public market',
  unique: 'two adults opening a mystery destination envelope together at the start of an unusual local date'
};
const groupBriefs = [
  ['coffee', 'Coffee, tea, or drinks shared by two people.'], ['dessert', 'A clearly recognizable dessert or tasting setup.'],
  ['cooking', 'Hands actively preparing an attainable meal together.'], ['books', 'Books, reading, or a bookstore table with lived-in detail.'],
  ['music', 'Listening, records, live music, or instruments in use.'], ['walking', 'Two people walking through a safe, interesting place.'],
  ['picnic', 'A simple picnic with visible food, blanket, and outdoor context.'], ['movie', 'A cinema, projector, screen, or movie-night setup.'],
  ['games', 'A recognizable tabletop, arcade, or two-person game in progress.'], ['craft', 'Hands making, painting, drawing, or shaping something.'],
  ['water', 'A real paddling, beach, boat, or waterside activity.'], ['active', 'An approachable shared sport or movement activity.'],
  ['garden', 'Flowers, plants, an orchard, or a garden path with seasonal detail.'], ['market', 'A public market with specific produce, food, or stalls.'],
  ['driving', 'A safe road-trip moment or destination-oriented drive.'], ['photos', 'A camera, portrait, or active photo-making moment.'],
  ['conversation', 'A warm, attentive two-person conversation without a staged pose.'], ['home-cozy', 'An intentional, low-prep date setup at home.']
] as const;
const requirements = [
  {
    id: 'site-home-hero', status: 'approved', visualStatus: 'replacement_required', purpose: 'Make the product and a real date-night setting recognizable in the first viewport.',
    placements: [{ route: '/', slot: 'home hero background', aspectRatio: '12:7', responsiveNotes: 'Keep the couple visible on mobile; preserve dark contrast space for the headline.' }],
    visualBrief: 'An authentic, attainable date with a couple sharing a specific place or activity, photographed candidly rather than posed.',
    generationPrompt: 'Use case: photorealistic-natural. Website home hero: exactly two adults on an attainable date, actively sharing a lakeside picnic and conversation with the picnic clearly visible. Candid interaction, genuine body language, natural skin and fabric texture, documentary lifestyle photography, warm natural evening light without orange grading. Wide 12:7 framing; keep the couple in the center mobile-safe area and preserve clean darker contrast space for headline copy. No text, logos, watermark, stock-photo pose, solo person, empty landscape, illustration, or 3D render.',
    negativePrompt: commonNegative,
    altText: 'A couple sharing a relaxed date beside a lake.',
    provenance: { type: 'free_photo', ...creditById.get('home-hero') }, outputPath: 'public/images/site/home-hero.webp',
    acceptanceCriteria: ['Couple and setting remain recognizable on desktop and mobile crops.', 'Headline has sufficient contrast.', 'Scene feels candid and attainable.']
  },
  ...categories.map((category) => {
    const spoke = spokes.find((entry) => entry.category === category.id);
    const credit = creditById.get(category.id);
    return {
      id: `category-${category.id}`, status: 'approved', visualStatus: 'replacement_required', purpose: `Primary visual language for ${category.name} and its related Idea cards.`,
      placements: [
        { route: `/categories/${category.id}`, slot: 'category hero and card thumbnail', aspectRatio: '3:2', responsiveNotes: 'Keep the activity legible in 3:2 and 4:3 crops.' },
        ...(spoke ? [{ route: `/${spoke.slug}`, slot: 'Spoke hero', aspectRatio: '4:3', responsiveNotes: 'Use the same approved category asset for visual continuity.' }] : []),
        { route: `/ideas/* (${category.id})`, slot: 'Idea hero, recommendation card, related card', aspectRatio: '3:2', responsiveNotes: 'Shared category asset until an Idea-specific approved image is available.' }
      ],
      visualBrief: `${category.description} The image must show a real activity, place, object, or human interaction relevant to the category.`,
      generationPrompt: `Use case: photorealistic-natural. Editorial website category image for ${category.name}: ${categoryScenes[category.id]}. Show exactly two adults who read as a couple through shared attention and natural proximity. The specific activity must be recognizable without the caption. Natural skin texture, ordinary attainable clothing, real materials, candid body language, soft natural or practical light. Landscape 3:2 with both people and the defining action readable at thumbnail size. No text, logos, watermark, stock-photo pose, solo person, object-only still life, empty landscape, illustration, or 3D render.`,
      negativePrompt: commonNegative,
      altText: `${category.name} inspiration.`, provenance: { type: 'free_photo', ...credit }, outputPath: `public/images/categories/${category.id}.webp`,
      acceptanceCriteria: ['The activity or setting is recognizable without the caption.', 'The crop works on cards and page heroes.', 'License and creator metadata are present.']
    };
  }),
  ...groupBriefs.map(([id, brief]) => {
    const credit = creditById.get(`group-${id}`);
    return {
      id: `idea-group-${id}`, status: 'approved', visualStatus: 'replacement_required', purpose: `Reusable Idea-card visual for the ${id} activity group.`,
      placements: [{ route: '/ideas/* and Picker results', slot: `${id} Idea hero and cards`, aspectRatio: '3:2', responsiveNotes: 'Keep the activity readable at compact card sizes.' }],
      visualBrief: brief,
      generationPrompt: `Use case: photorealistic-natural. Editorial date-night activity photograph: ${brief} Show exactly two adults actively sharing the activity; both people and the defining action must be visible. Natural skin texture, attainable clothing and setting, candid interaction, soft natural or practical light. Landscape 3:2. No text, logos, watermark, solo person, object-only still life, empty landscape, unrelated activity, illustration, or 3D render.`,
      negativePrompt: commonNegative, altText: `${id.replace('-', ' ')} date-night activity.`, provenance: { type: 'free_photo', ...credit }, outputPath: `public/images/idea-groups/${id}.webp`,
      acceptanceCriteria: ['The activity is recognizable without reading the title.', 'The crop works at card and hero sizes.', 'License and creator metadata are present.']
    };
  }),
  {
    id: 'site-social-default', status: 'approved', visualStatus: 'replacement_required', purpose: 'Default social sharing image for pages without a dedicated asset.',
    placements: [{ route: 'site-wide fallback', slot: 'Open Graph image', aspectRatio: '1.91:1', responsiveNotes: 'Essential subjects stay inside the central safe area at 1200x630.' }],
    visualBrief: 'A recognizable, attainable date-night scene with room for platform overlays.',
    generationPrompt: 'Editorial lifestyle photograph of a real couple on an attainable date, candid body language, natural light, specific setting, wide social-preview composition, no embedded text, 1.91:1.',
    negativePrompt: commonNegative, altText: 'Date Night Ideas social preview.', provenance: { type: 'free_photo', ...creditById.get('social-default') }, outputPath: 'public/images/social/default.webp',
    acceptanceCriteria: ['Recognizable at small social-preview sizes.', 'No third-party marks.', 'License and creator metadata are present.']
  }
];

await writeFile(new URL('../assets/image-requirements.json', import.meta.url), `${JSON.stringify({ version: '2.1', updatedAt: '2026-07-19', instructions: 'Current files remain provenance-approved fallbacks, but visualStatus marks them for replacement. Every replacement requires prompt, placement, output path, and human visual review.', statuses: ['brief_needed', 'ready_for_generation', 'ready_for_sourcing', 'generated', 'sourced', 'approved'], visualStatuses: ['replacement_required', 'visually_reviewed', 'approved'], requirements }, null, 2)}\n`);
const sitePrompts = requirements.filter((requirement) => requirement.id === 'site-home-hero' || requirement.id === 'site-social-default' || requirement.id.startsWith('category-'));
await writeFile(new URL('../assets/site-image-generation-prompts.jsonl', import.meta.url), `${sitePrompts.map((requirement) => JSON.stringify({ customId: requirement.id, prompt: requirement.generationPrompt, outputPath: requirement.outputPath, placements: requirement.placements })).join('\n')}\n`);
console.log(`Synced ${requirements.length} image requirements.`);
