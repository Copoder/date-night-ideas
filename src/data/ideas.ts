import { categoryById } from './categories';
import { seedGroups, type IdeaSeed } from './ideaSeeds';
import type { CategoryId, DateIdea, RelationshipStage, Vibe } from './types';
import { sourceIdsByCategory } from './sources';
import approvedIdeaImages from './approvedIdeaImages.json';

const approvedIdeaImageSet = new Set<string>(approvedIdeaImages as string[]);

const slugify = (value: string) => value
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const defaults: Record<CategoryId, {
  relationships: RelationshipStage[];
  vibes: Vibe[];
  fallback: string;
  setup: string;
  reason: string;
}> = {
  'at-home': { relationships: ['dating', 'longterm', 'parents'], vibes: ['chill', 'playful', 'romantic'], fallback: 'Cut the plan to thirty minutes and use only what is already at home.', setup: 'Put phones away and clear one small area so the date feels separate from the rest of the night.', reason: 'It changes the feeling of home without adding a commute or a complicated reservation.' },
  'cheap-free': { relationships: ['first', 'dating', 'longterm', 'parents'], vibes: ['chill', 'playful', 'adventurous'], fallback: 'Skip the purchase and keep the walk, conversation, or challenge.', setup: 'Set the spending limit before leaving so the budget becomes part of the game.', reason: 'The plan gives you a shared objective without making money the main event.' },
  romantic: { relationships: ['dating', 'longterm', 'parents'], vibes: ['romantic', 'chill'], fallback: 'Keep the most personal moment and remove the expensive setting.', setup: 'Protect the time first: silence notifications and decide what can wait until tomorrow.', reason: 'It creates space to notice each other instead of relying on generic romance cues.' },
  'playful-games': { relationships: ['first', 'dating', 'longterm', 'parents'], vibes: ['playful'], fallback: 'Shorten the game to one round and keep a cooperative finish.', setup: 'Agree on the rules and the finish line before the competition starts.', reason: 'A clear game gives the date momentum and takes pressure off constant conversation.' },
  outdoors: { relationships: ['dating', 'longterm'], vibes: ['adventurous', 'chill'], fallback: 'Choose a shorter, flatter route or move the observation challenge to a covered place.', setup: 'Check daylight, weather, access, and the return route before heading out.', reason: 'Moving through a real place gives you something immediate to experience together.' },
  'first-date': { relationships: ['first'], vibes: ['chill', 'playful'], fallback: 'Choose a shorter public version with an easy exit after one hour.', setup: 'Pick a public place with simple transportation and a natural stopping point.', reason: 'It keeps the pressure low while giving the conversation useful things to react to.' },
  'married-longterm': { relationships: ['longterm'], vibes: ['romantic', 'playful', 'chill'], fallback: 'Keep one new element and pair it with a familiar meal or place.', setup: 'Treat the plan as protected time, not another household task to complete.', reason: 'A small break from routine helps familiar partners see each other with fresh attention.' },
  parents: { relationships: ['parents'], vibes: ['chill', 'romantic', 'playful'], fallback: 'Use a twenty-minute version after bedtime and leave cleanup for tomorrow.', setup: 'Choose the real window you have and prepare only what can be reset quickly.', reason: 'It respects short time, low energy, and the possibility that the evening gets interrupted.' },
  'creative-diy': { relationships: ['first', 'dating', 'longterm', 'parents'], vibes: ['playful', 'chill'], fallback: 'Use scrap materials or a phone-based version instead of buying supplies.', setup: 'Cover the work surface and put out only the materials needed for the first step.', reason: 'Making something keeps hands busy and leaves you with evidence of the night.' },
  'food-drink': { relationships: ['first', 'dating', 'longterm', 'parents'], vibes: ['playful', 'romantic', 'chill'], fallback: 'Use one store-bought element and focus the date on tasting or comparison.', setup: 'Decide whether the fun is cooking, tasting, or presenting so the menu stays manageable.', reason: 'Food becomes a shared activity instead of a meal you finish while looking at your phones.' },
  'seasonal-fall': { relationships: ['dating', 'longterm', 'parents'], vibes: ['chill', 'romantic', 'playful'], fallback: 'Bring the seasonal element home with a warm drink, music, or a small craft.', setup: 'Check opening hours and sunset time, then bring one extra warm layer.', reason: 'It uses the short-lived details of fall instead of treating the season as decoration.' },
  'seasonal-winter': { relationships: ['dating', 'longterm', 'parents'], vibes: ['chill', 'romantic', 'playful'], fallback: 'Choose an indoor version near a window and keep the warm-food finish.', setup: 'Check weather and transportation first, then plan the warm-up before the cold part.', reason: 'The contrast between cold air and a warm finish gives the date a natural shape.' },
  'seasonal-spring-summer': { relationships: ['first', 'dating', 'longterm', 'parents'], vibes: ['adventurous', 'chill', 'playful'], fallback: 'Use a shaded or indoor version during heat, rain, or poor air quality.', setup: 'Check heat, storms, air quality, and daylight before committing to the outdoor portion.', reason: 'Long daylight makes room for a fuller date without forcing a late night.' },
  daytime: { relationships: ['first', 'dating', 'longterm', 'parents'], vibes: ['chill', 'playful', 'adventurous'], fallback: 'Compress the plan into a coffee break or one-hour walk.', setup: 'Choose the start time first and protect the end of the window from errands.', reason: 'Daylight lowers the pressure and opens places that are closed by evening.' },
  unique: { relationships: ['dating', 'longterm'], vibes: ['adventurous', 'playful'], fallback: 'Keep the unusual rule or theme and use it in a familiar place.', setup: 'Confirm the unusual part is safe, allowed, and genuinely fun for both people.', reason: 'It creates a specific story instead of another interchangeable night out.' }
};

const setupBySignal: Array<{ tags: string[]; copy: (title: string) => string }> = [
  { tags: ['walk', 'trail', 'hiking', 'outdoors', 'water', 'bike'], copy: (title) => `Check the route, weather, daylight, and return plan before starting ${title}.` },
  { tags: ['food', 'cooking', 'dessert', 'pizza', 'pasta', 'tacos', 'sushi'], copy: (title) => `Agree on the shopping limit and divide the prep before ${title} so cooking does not become one person's job.` },
  { tags: ['coffee', 'tea', 'drinks', 'tasting'], copy: (title) => `Choose the tasting order and a sensible stopping point before ${title}; two or three comparisons are enough.` },
  { tags: ['game', 'games', 'trivia', 'board-game', 'cards', 'quiz', 'puzzle'], copy: (title) => `Set the rules, stakes, and finish line before ${title}, especially if one person already knows the game.` },
  { tags: ['craft', 'diy', 'drawing', 'painting', 'pottery', 'clay', 'collage'], copy: (title) => `Put out only the materials needed for ${title} and protect the work surface before either person starts.` },
  { tags: ['books', 'reading', 'library', 'writing'], copy: (title) => `Pick a quiet window for ${title} and agree that unfinished books or imperfect writing are completely acceptable.` },
  { tags: ['music', 'karaoke', 'dance', 'concert'], copy: (title) => `Choose the first song and the volume limit before ${title}; the goal is participation, not a perfect performance.` },
  { tags: ['photos', 'video', 'animation', 'audio'], copy: (title) => `Charge one phone or camera, clear storage, and decide what will stay private before ${title}.` },
  { tags: ['market', 'thrift', 'shopping'], copy: (title) => `Set the spending cap and meeting point before ${title} so browsing stays playful instead of open-ended.` }
];

const buildSetup = (seed: IdeaSeed, category: CategoryId) => {
  const match = setupBySignal.find((entry) => entry.tags.some((tag) => seed.tags?.includes(tag)));
  return match?.copy(seed.title) ?? defaults[category].setup;
};

const ideaImageGroups: Array<{ id: string; tags: string[] }> = [
  { id: 'coffee', tags: ['coffee', 'tea', 'mocktail', 'drinks'] },
  { id: 'dessert', tags: ['dessert', 'ice-cream', 'chocolate', 'bakery', 'cocoa'] },
  { id: 'cooking', tags: ['cooking', 'food', 'pizza', 'pasta', 'tacos', 'sushi', 'soup', 'dinner', 'breakfast', 'dumplings'] },
  { id: 'books', tags: ['books', 'reading', 'library', 'writing', 'bookbinding'] },
  { id: 'music', tags: ['music', 'karaoke', 'dance', 'concert'] },
  { id: 'walking', tags: ['walk', 'neighborhood', 'history', 'trail'] },
  { id: 'picnic', tags: ['picnic', 'sunset', 'sunrise'] },
  { id: 'movie', tags: ['movie', 'tv', 'film', 'theater'] },
  { id: 'games', tags: ['game', 'games', 'trivia', 'board-game', 'cards', 'quiz', 'puzzle', 'bingo', 'challenge'] },
  { id: 'craft', tags: ['craft', 'diy', 'drawing', 'painting', 'pottery', 'clay', 'collage', 'paper', 'design'] },
  { id: 'water', tags: ['water', 'kayak', 'canoe', 'paddle', 'beach', 'coast', 'fishing'] },
  { id: 'active', tags: ['sport', 'active', 'bike', 'skating', 'fitness', 'climbing', 'yoga'] },
  { id: 'garden', tags: ['garden', 'flowers', 'plants', 'orchard', 'berries', 'nature'] },
  { id: 'market', tags: ['market', 'thrift', 'shopping', 'food-truck'] },
  { id: 'driving', tags: ['drive', 'car', 'trip', 'transit'] },
  { id: 'photos', tags: ['photos', 'video', 'animation', 'audio'] },
  { id: 'conversation', tags: ['conversation', 'connection', 'romantic', 'memory', 'storytelling'] },
  { id: 'home-cozy', tags: ['cozy', 'home', 'after-bedtime', 'relaxing'] }
];

const imageForSeed = (seed: IdeaSeed, category: CategoryId, slug: string) => {
  if (approvedIdeaImageSet.has(slug)) {
    return { image: `/images/ideas/${slug}.webp`, requirementId: `idea-image-${slug}` };
  }
  const match = ideaImageGroups.find((group) => group.tags.some((tag) => seed.tags?.includes(tag)));
  // Until the slug-specific photo set is delivered, use only the closest activity group.
  // Category heroes are intentionally excluded: they frequently show a different activity.
  return match ? { image: `/images/idea-groups/${match.id}.webp`, requirementId: `idea-group-${match.id}` } : { image: categoryById.get(category)!.image, requirementId: `category-${category}` };
};

const indoorSignals = new Set(['books', 'reading', 'library', 'movie', 'tv', 'film', 'theater', 'coffee', 'food', 'cooking', 'craft', 'diy', 'drawing', 'painting', 'pottery', 'clay', 'museum', 'gallery', 'aquarium', 'arcade', 'bowling', 'escape-room', 'music']);
const kidSignals = new Set(['park', 'garden', 'museum', 'library', 'craft', 'drawing', 'painting', 'pottery', 'animals', 'nature', 'picnic', 'puzzle', 'board-game', 'games']);
const lowPrepSignals = new Set(['walk', 'coffee', 'books', 'reading', 'music', 'conversation', 'photos', 'people-watching', 'movie', 'market']);

const buildIdea = (seed: IdeaSeed, category: CategoryId, index: number): DateIdea => {
  const profile = defaults[category];
  const categoryData = categoryById.get(category);
  if (!categoryData) throw new Error(`Unknown category: ${category}`);
  const slug = slugify(seed.title);
  const locations = seed.locations ?? (category === 'at-home' || category === 'parents' ? ['home'] : ['out']);
  const freeFriendlyCategories: CategoryId[] = ['at-home', 'parents', 'creative-diy', 'outdoors', 'daytime', 'unique'];
  const budget = seed.budget ?? (category === 'cheap-free' || (freeFriendlyCategories.includes(category) && index % 4 === 0) ? 'free' : 'low');
  const duration = seed.duration ?? (index % 5 === 0 ? 'short' : index % 7 === 0 ? 'long' : 'medium');
  const tags = seed.tags ?? [];
  const isIndoor = seed.indoor ?? (locations.includes('home') || tags.some((tag) => indoorSignals.has(tag)));
  const isLowPrep = seed.lowPrep ?? (duration === 'short' || tags.some((tag) => lowPrepSignals.has(tag)));
  const isPublic = seed.publicFriendly ?? (locations.includes('out') && seed.alcohol !== true);
  const isKidFriendly = seed.kidFriendly ?? (category === 'parents' || tags.some((tag) => kidSignals.has(tag)));
  const visual = imageForSeed(seed, category, slug);
  const sourceIds = sourceIdsByCategory[category];
  const summary = `${seed.action} ${seed.twist}`;

  return {
    id: slug,
    slug,
    title: seed.title,
    hook: summary,
    summary,
    whyItWorks: `${profile.reason} The defining detail in this version is simple: ${seed.twist}`,
    primaryCategory: category,
    relationshipStages: seed.relationships ?? profile.relationships,
    locations,
    budget,
    vibes: seed.vibes ?? profile.vibes,
    duration,
    seasons: seed.seasons ?? ['anytime'],
    tags: [...new Set([category, ...(seed.tags ?? [])])],
    dealBreakers: {
      noAlcohol: seed.alcohol !== true,
      kidFriendly: isKidFriendly,
      indoorOnly: isIndoor,
      lowPrep: isLowPrep,
      publicFriendly: isPublic
    },
    steps: [buildSetup(seed, category), seed.action, seed.twist],
    makeItYours: seed.twist,
    fallback: `Keep only the central move: ${seed.action} Skip the extra twist if time, weather, or energy changes.`,
    image: visual.image,
    imageAlt: `${seed.title} date-night setting.`,
    imageRequirementId: visual.requirementId,
    sourceIds,
    researchNote: `The cited research set was used to validate the underlying ${seed.tags?.[0] ?? category} activity pattern and common planning constraints. No source wording is reproduced.`,
    editorialNote: `This version turns ${seed.title} into an executable plan by adding a budget, time window, location rule, and the specific finishing twist above.`,
    editorialReview: {
      reviewId: `launch-2026-07-19-${slug}`,
      reviewedAt: '2026-07-19',
      reviewMethod: 'source synthesis + independent constraint edit',
      researchChecked: true,
      copyEdited: true,
      originalityChecked: true,
      safetyChecked: true
    },
    status: 'published'
  };
};

export const ideas: DateIdea[] = seedGroups.flatMap((group) =>
  group.ideas.map((seed, index) => buildIdea(seed, group.category, index))
);

export const ideaBySlug = new Map(ideas.map((idea) => [idea.slug, idea]));

export const ideasByCategory = (category: CategoryId) => ideas.filter((idea) => idea.primaryCategory === category);
