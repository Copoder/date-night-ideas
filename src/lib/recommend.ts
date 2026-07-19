import type { DateIdea, PickerAnswers } from '@/data/types';

const allowed = {
  relationship: new Set(['first', 'dating', 'longterm', 'parents']),
  location: new Set(['home', 'out', 'either']),
  budget: new Set(['free', 'low', 'mid', 'high']),
  vibe: new Set(['chill', 'playful', 'romantic', 'adventurous']),
  duration: new Set(['short', 'medium', 'long']),
  limits: new Set(['noAlcohol', 'kidFriendly', 'indoorOnly', 'lowPrep', 'publicFriendly'])
} as const;

export const sanitizeAnswers = (input: Partial<PickerAnswers>): PickerAnswers => ({
  relationship: input.relationship && allowed.relationship.has(input.relationship) ? input.relationship : undefined,
  location: input.location && allowed.location.has(input.location) ? input.location : undefined,
  budget: input.budget && allowed.budget.has(input.budget) ? input.budget : undefined,
  vibe: input.vibe && allowed.vibe.has(input.vibe) ? input.vibe : undefined,
  duration: input.duration && allowed.duration.has(input.duration) ? input.duration : undefined,
  limits: [...new Set((input.limits ?? []).filter((limit) => allowed.limits.has(limit)))]
});

const softScore = (idea: DateIdea, answers: PickerAnswers) => {
  let score = 0;
  if (answers.relationship && idea.relationshipStages.includes(answers.relationship)) score += 4;
  if (answers.location && (idea.locations.includes(answers.location) || idea.locations.includes('either'))) score += 4;
  if (answers.budget && idea.budget === answers.budget) score += 3;
  if (answers.budget === 'high' && idea.budget === 'mid') score += 1;
  if (answers.budget === 'mid' && idea.budget === 'low') score += 1;
  if (answers.vibe && idea.vibes.includes(answers.vibe)) score += 4;
  if (answers.duration && idea.duration === answers.duration) score += 3;
  return score;
};

const budgetOrder = { free: 0, low: 1, mid: 2, high: 3 } as const;
const durationOrder = { short: 0, medium: 1, long: 2 } as const;

export const filterHardLimits = (ideas: DateIdea[], answers: PickerAnswers) => ideas.filter((idea) => {
  if (!answers.limits.every((limit) => idea.dealBreakers[limit])) return false;
  if (answers.location && answers.location !== 'either' && !idea.locations.includes(answers.location) && !idea.locations.includes('either')) return false;
  if (answers.budget && budgetOrder[idea.budget] > budgetOrder[answers.budget]) return false;
  if (answers.duration && durationOrder[idea.duration] > durationOrder[answers.duration]) return false;
  return true;
});

export const isLimitAvailable = (allIdeas: DateIdea[], answers: PickerAnswers, limit: PickerAnswers['limits'][number]) => {
  if (answers.limits.includes(limit)) return true;
  return filterHardLimits(allIdeas, { ...answers, limits: [...answers.limits, limit] }).length >= 3;
};

export const rankIdeas = (allIdeas: DateIdea[], answers: PickerAnswers) =>
  filterHardLimits(allIdeas, answers)
    .map((idea) => ({ idea, score: softScore(idea, answers) }))
    .sort((a, b) => b.score - a.score || a.idea.title.localeCompare(b.idea.title));

const hash = (value: string) => {
  let result = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    result ^= value.charCodeAt(i);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
};

export const selectIdeas = (allIdeas: DateIdea[], answers: PickerAnswers, offset = 0, count = 3) => {
  const ranked = rankIdeas(allIdeas, answers);
  if (ranked.length <= count) return ranked.map(({ idea }) => idea);
  const answerKey = JSON.stringify(answers);
  const topPool = ranked.slice(0, Math.min(30, ranked.length));
  const start = (hash(answerKey) + offset * count) % topPool.length;
  const selected: DateIdea[] = [];
  const usedCategories = new Set<string>();

  for (let step = 0; step < topPool.length && selected.length < count; step += 1) {
    const candidate = topPool[(start + step) % topPool.length].idea;
    if (usedCategories.has(candidate.primaryCategory) && topPool.length > count * 2) continue;
    selected.push(candidate);
    usedCategories.add(candidate.primaryCategory);
  }

  for (const { idea } of topPool) {
    if (selected.length >= count) break;
    if (!selected.some((entry) => entry.id === idea.id)) selected.push(idea);
  }

  return selected;
};

export const whyItFits = (idea: DateIdea, answers: PickerAnswers) => {
  const parts: string[] = [];
  if (answers.location) parts.push(answers.location === 'home' ? 'at home' : answers.location === 'out' ? 'out of the house' : 'flexible on place');
  if (answers.budget) parts.push(answers.budget === 'free' ? 'free' : answers.budget === 'low' ? 'under about $30' : answers.budget === 'mid' ? '$30–$80' : 'worth a splurge');
  if (answers.vibe) parts.push(answers.vibe);
  if (answers.duration) parts.push(answers.duration === 'short' ? 'under an hour' : answers.duration === 'medium' ? 'one to three hours' : 'a half day or longer');
  return parts.length ? `You asked for something ${parts.join(', ')}. ${idea.whyItWorks}` : idea.whyItWorks;
};
