import { writeFile } from 'node:fs/promises';
import { ideas } from '../src/data/ideas';

type Scene = { setting: string; action: string; framing: string };

const sceneFor = (tags: string[], title: string): Scene => {
  const has = (...values: string[]) => values.some((value) => tags.includes(value));
  const named = (...patterns: RegExp[]) => patterns.some((pattern) => pattern.test(title.toLowerCase()));
  if (named(/after-bedtime|parent appreciation|porch date|naptime|kitchen counter date/)) return {
    setting: 'a quiet lived-in home after the house has settled, with one intentional date setup and warm practical light',
    action: `two adult partners giving each other full attention during the short at-home date in “${title}”`,
    framing: 'intimate medium-wide documentary frame with both people, the simple date setup, and no household task in progress'
  };
  if (named(/picnic|blanket reset|concert blanket/)) return {
    setting: 'an attainable public park, backyard, beach, or riverside picnic spot with a simple blanket and shared food',
    action: `two adults actively sharing the specific picnic experience in “${title}”, seated close enough to interact naturally`,
    framing: 'wide three-quarter view showing both people, the blanket, food, and recognizable outdoor context'
  };
  if (named(/volunteer|cleanup/)) return {
    setting: 'a safe public community or environmental volunteer setting followed by a nearby casual snack stop',
    action: `two adults cooperating on the short service activity in “${title}” and visibly reconnecting afterward`,
    framing: 'candid environmental frame with both people, safe equipment, and the shared task clearly visible'
  };
  if (named(/secret snack and song/)) return {
    setting: 'a casual public bench or cafe table where two small snacks and a shared phone playlist are visible',
    action: `two adults revealing the snack and song choices they made for each other in “${title}”`,
    framing: 'medium-wide eye-level frame with both reactions, the snacks, and the listening moment readable'
  };
  if (named(/corner mood makeover/)) return {
    setting: 'one ordinary apartment corner being turned into a cozy temporary date nook using items already at home',
    action: `two adults arranging the corner together, then sharing a drink or dessert in the finished space`,
    framing: 'medium-wide room view showing both people, the before-to-after activity, and the date nook clearly'
  };
  if (named(/kayak|canoe|paddle|beach|river|water|fishing|tide pool|rowboat/)) return {
    setting: 'a safe, accessible waterside location in clear daylight with believable clothing and equipment',
    action: `two adults doing the exact waterside activity from “${title}”, visibly cooperating`,
    framing: 'wide environmental photograph with both people, the water activity, and enough context to identify it'
  };
  if (named(/bike|skating|bouldering|climbing|pickleball|yoga|workout|field day|bowling|mini golf|darts|pool hall/)) return {
    setting: 'an approachable public park, rink, court, or activity venue with realistic safety conditions',
    action: `two adults participating in the specific movement activity described by “${title}”`,
    framing: 'wide candid action frame with both bodies and the relevant equipment clearly readable'
  };
  if (named(/drive|road|transit|micro-trip|destination/)) return {
    setting: 'a parked car at a scenic but ordinary destination or a local transit stop, never a dangerous moving-car shot',
    action: `two adults carrying out the destination or route idea from “${title}”`,
    framing: 'candid documentary frame showing both people and the recognizable route or destination context'
  };
  if (named(/walk|trail|hike|neighborhood|stargazing|sunrise|sunset|architecture|landmark|scavenger hunt|geocache/)) return {
    setting: 'a real, walkable neighborhood, public path, park, or viewpoint in gentle natural light',
    action: `two adults actively doing the route, observation, or outdoor date described by “${title}”`,
    framing: 'wide environmental photograph with both people walking or pausing together and the place identifiable'
  };
  if (named(/market|thrift|shopping|food truck|flea|orchard|berry|flower|plant|garden|pumpkin|farm/)) return {
    setting: 'a recognizable local market, garden, nursery, orchard, or small neighborhood shopping street in season',
    action: `two adults browsing and doing the specific discovery activity in “${title}” together`,
    framing: 'candid eye-level photograph with both people and the relevant stall, plant, produce, or found object visible'
  };
  if (named(/photo|portrait|camera|video|film festival|stop-motion|audio diary/)) return {
    setting: 'a real neighborhood street, park, or apartment with a camera or phone used as part of the date',
    action: `two adults actively making the photo, video, or audio project described by “${title}”`,
    framing: 'documentary over-the-shoulder composition showing the person making the image and the shared subject'
  };
  if (named(/book|library|read|writing|postcard|letter|zine|story/)) return {
    setting: 'a quiet independent bookstore, library corner, or home reading nook with warm practical light',
    action: `two adults actively sharing the reading or writing activity in “${title}”, not merely posing with books`,
    framing: 'candid side angle with both people, the open book or writing materials, and the setting visible'
  };
  if (named(/paint|drawing|pottery|clay|collage|origami|craft|sew|stamp|frame|cardboard|make a|build a/)) return {
    setting: 'a bright, slightly messy creative table with real materials and an attainable home setup',
    action: `two adults making the exact craft described by “${title}”, with the work visibly underway`,
    framing: 'medium-wide close table view; keep both faces or profiles and the making process readable'
  };
  if (named(/taste|food|dinner|breakfast|brunch|lunch|cook|recipe|pizza|pasta|taco|sushi|dumpling|dessert|ice cream|chocolate|bakery|cafe|coffee|tea|mocktail|cocktail|soup|fondue|hot chocolate|cider|restaurant|snack|grocery/)) return {
    setting: 'a lived-in home kitchen with a small counter, ingredients, and natural window light',
    action: `two adults actively preparing, tasting, or comparing the specific food activity in “${title}” together`,
    framing: 'medium-wide eye-level or three-quarter table frame with both people, their hands, and the defining food visible'
  };
  if (has('dessert', 'ice-cream', 'chocolate', 'bakery', 'cocoa')) return {
    setting: 'a cozy cafe table or home dessert setup with believable everyday details',
    action: `two adults sharing and comparing the dessert activity described by “${title}”`,
    framing: 'three-quarter table view with the food legible and the couple naturally interacting'
  };
  if (has('game', 'games', 'trivia', 'board-game', 'cards', 'quiz', 'puzzle', 'bingo', 'challenge')) return {
    setting: 'a warm table in a real apartment or casual game venue, with the game in progress',
    action: `two adults visibly playing the specific game or challenge from “${title}”, mid-turn and smiling`,
    framing: 'over-the-shoulder three-quarter view showing both players, hands, and the relevant game pieces'
  };
  if (has('craft', 'diy', 'drawing', 'painting', 'pottery', 'clay', 'collage', 'paper', 'design')) return {
    setting: 'a bright, slightly messy creative table with real materials and an attainable home setup',
    action: `two adults making the exact craft described by “${title}”, with the work visibly underway`,
    framing: 'medium-wide close table view; keep both faces or profiles and the making process readable'
  };
  if (has('books', 'reading', 'library', 'writing', 'bookbinding')) return {
    setting: 'a quiet independent bookstore, library corner, or home reading nook with warm practical light',
    action: `two adults actively sharing the reading or writing activity in “${title}”, not merely posing with books`,
    framing: 'candid side angle with both people, the open book or writing materials, and the setting visible'
  };
  if (has('music', 'karaoke', 'dance', 'concert')) return {
    setting: 'an intimate living room listening setup or small local music venue',
    action: `two adults participating in the exact music or dance activity from “${title}”`,
    framing: 'candid medium-wide frame with movement, the relevant instrument or listening object, and both people visible'
  };
  if (has('photos', 'video', 'animation', 'audio')) return {
    setting: 'a real neighborhood street, park, or apartment with a camera or phone used as part of the date',
    action: `two adults actively making the photo, video, or audio project described by “${title}”`,
    framing: 'documentary over-the-shoulder composition showing the person making the image and the shared subject'
  };
  if (has('market', 'thrift', 'shopping', 'food-truck')) return {
    setting: 'a recognizable local market or small neighborhood shopping street with real stalls and texture',
    action: `two adults browsing and doing the specific market challenge in “${title}” together`,
    framing: 'candid eye-level street photograph with both people and the relevant stall or object visible'
  };
  if (has('water', 'kayak', 'canoe', 'paddle', 'beach', 'coast', 'fishing')) return {
    setting: 'a safe, accessible waterside location in clear daylight with believable clothing and equipment',
    action: `two adults doing the exact waterside activity from “${title}”, visibly cooperating`,
    framing: 'wide environmental photograph with both people, the water activity, and enough context to identify it'
  };
  if (has('sport', 'active', 'bike', 'skating', 'fitness', 'climbing', 'yoga')) return {
    setting: 'an approachable public park, rink, court, or trail with realistic safety conditions',
    action: `two adults participating in the specific movement activity described by “${title}”`,
    framing: 'wide candid action frame with both bodies and the relevant equipment clearly readable'
  };
  if (has('garden', 'flowers', 'plants', 'orchard', 'berries', 'nature')) return {
    setting: 'a real botanical garden, plant nursery, orchard, or public garden in season',
    action: `two adults exploring or making the specific garden activity in “${title}” together`,
    framing: 'natural eye-level frame with both people interacting with the plants or seasonal detail'
  };
  if (has('drive', 'car', 'trip', 'transit')) return {
    setting: 'a parked car at a scenic but ordinary destination or a local transit stop, never a dangerous moving-car shot',
    action: `two adults carrying out the destination or route idea from “${title}”`,
    framing: 'candid documentary frame showing both people and the recognizable route or destination context'
  };
  if (has('walk', 'neighborhood', 'history', 'trail', 'sunset', 'sunrise')) return {
    setting: 'a real, walkable neighborhood, public path, or viewpoint in gentle natural light',
    action: `two adults actively taking the walk or observation date described by “${title}”`,
    framing: 'wide environmental photograph with both people walking or pausing together and the place identifiable'
  };
  return {
    setting: 'a believable lived-in home or neighborhood date setting chosen to match the activity',
    action: `two adults visibly doing the specific activity described by “${title}” together`,
    framing: 'candid medium-wide editorial frame with both people and the defining activity clearly visible'
  };
};

const baseNegative = 'text, watermark, logo, brand marks, stock-photo pose, solo person, unrelated activity, generic meal or generic landscape, empty scene, sexualized styling, uncanny faces, extra fingers, duplicated objects, heavy blur, extreme retouching, illustration, 3D render';

const records = ideas.map((idea) => {
  const scene = sceneFor(idea.tags, idea.title);
  const relationshipNote = idea.primaryCategory === 'parents'
    ? 'Show two adults on their date; children may be absent or only implied by the lived-in setting.'
    : 'Show exactly two adults who read as a couple through natural proximity and shared attention; no extra people in focus.';
  return {
    id: `idea-image-${idea.slug}`,
    ideaSlug: idea.slug,
    title: idea.title,
    category: idea.primaryCategory,
    status: 'ready_for_generation',
    use: {
      routes: [`/ideas/${idea.slug}/`, '/results/'],
      slots: ['Idea hero', 'recommendation card', 'related Idea card'],
      outputPath: `public/images/ideas/${idea.slug}.webp`,
      aspectRatio: '3:2'
    },
    prompt: [
      'Use case: photorealistic-natural',
      'Asset type: editorial website Idea image',
      `Primary request: A candid, believable date-night photograph for the Idea “${idea.title}”. The image must visibly match this activity: ${idea.summary}`,
      `Scene/backdrop: ${scene.setting}.`,
      `Subject: ${scene.action}. ${relationshipNote}`,
      'Style/medium: photorealistic editorial lifestyle photography, natural skin texture, ordinary attainable clothing, real materials and small imperfections.',
      `Composition/framing: ${scene.framing}; landscape 3:2 crop with the defining action readable at thumbnail size.`,
      'Lighting/mood: soft natural or practical light, warm but not orange, intimate and energetic without being staged.',
      'Constraints: no text in image, no logos, no watermark, no alcohol unless the Idea explicitly requires it, no invented props that change the activity.',
      `Avoid: ${baseNegative}`
    ].join('\n'),
    negativePrompt: baseNegative,
    acceptanceCriteria: [
      'At a glance, a viewer can name the activity from the image without reading the title.',
      'The image contains a couple or clearly shared two-person interaction, not an object-only still life.',
      'The crop remains readable at 3:2 on mobile and desktop.',
      'The generated file is reviewed against the Idea copy before status changes to approved.'
    ]
  };
});

await writeFile('assets/idea-image-generation-plan.json', `${JSON.stringify({ version: '1.0', generatedAt: '2026-07-19', policy: 'One photorealistic, activity-matched image per published Idea. Replace temporary group images only after visual review.', records }, null, 2)}\n`);
await writeFile('assets/idea-image-generation-prompts.jsonl', `${records.map((record) => JSON.stringify({ customId: record.ideaSlug, prompt: record.prompt, outputPath: record.use.outputPath })).join('\n')}\n`);
console.log(`Generated ${records.length} slug-specific image briefs.`);
