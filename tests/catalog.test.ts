import test from 'node:test';
import assert from 'node:assert/strict';
import { ideas } from '../src/data/ideas';
import { filterHardLimits, isLimitAvailable, sanitizeAnswers, selectIdeas } from '../src/lib/recommend';

test('catalog has the required launch inventory', () => {
  assert.equal(ideas.length, 300);
  assert.equal(new Set(ideas.map((idea) => idea.slug)).size, 300);
});

test('hard limits are never relaxed', () => {
  const results = filterHardLimits(ideas, { limits: ['indoorOnly', 'noAlcohol'] });
  assert.ok(results.length > 0);
  assert.ok(results.every((idea) => idea.dealBreakers.indoorOnly && idea.dealBreakers.noAlcohol));
});

test('picker selects three distinct ideas and refreshes the set', () => {
  const answers = { relationship: 'dating' as const, location: 'home' as const, budget: 'low' as const, vibe: 'playful' as const, duration: 'medium' as const, limits: [] };
  const first = selectIdeas(ideas, answers, 0);
  const second = selectIdeas(ideas, answers, 1);
  assert.equal(first.length, 3);
  assert.equal(new Set(first.map((idea) => idea.id)).size, 3);
  assert.notDeepEqual(first.map((idea) => idea.id), second.map((idea) => idea.id));
});

test('every primary answer combination has three executable results', () => {
  const relationships = ['first', 'dating', 'longterm', 'parents'] as const;
  const locations = ['home', 'out', 'either'] as const;
  const budgets = ['free', 'low', 'mid', 'high'] as const;
  const vibes = ['chill', 'playful', 'romantic', 'adventurous'] as const;
  const durations = ['short', 'medium', 'long'] as const;
  for (const relationship of relationships) for (const location of locations) for (const budget of budgets) for (const vibe of vibes) for (const duration of durations) {
    const result = selectIdeas(ideas, { relationship, location, budget, vibe, duration, limits: [] });
    assert.equal(result.length, 3, `thin bucket: ${relationship}/${location}/${budget}/${vibe}/${duration}`);
    if (location !== 'either') assert.ok(result.every((idea) => idea.locations.includes(location) || idea.locations.includes('either')));
  }
});

test('every hard limit offered by the Picker preserves three honest matches', () => {
  const relationships = ['first', 'dating', 'longterm', 'parents'] as const;
  const locations = ['home', 'out', 'either'] as const;
  const budgets = ['free', 'low', 'mid', 'high'] as const;
  const vibes = ['chill', 'playful', 'romantic', 'adventurous'] as const;
  const durations = ['short', 'medium', 'long'] as const;
  const limits = ['noAlcohol', 'kidFriendly', 'indoorOnly', 'lowPrep', 'publicFriendly'] as const;
  for (const relationship of relationships) for (const location of locations) for (const budget of budgets) for (const vibe of vibes) for (const duration of durations) {
    const answers = { relationship, location, budget, vibe, duration, limits: [] };
    for (const limit of limits) {
      if (!isLimitAvailable(ideas, answers, limit)) continue;
      const result = selectIdeas(ideas, { ...answers, limits: [limit] });
      assert.equal(result.length, 3, `offered thin limit: ${relationship}/${location}/${budget}/${vibe}/${duration}/${limit}`);
      assert.ok(result.every((idea) => idea.dealBreakers[limit]));
    }
  }
});

test('malformed shared URLs are reduced to known answer values', () => {
  assert.deepEqual(sanitizeAnswers({ location: 'moon', budget: 'free', limits: ['noAlcohol', 'bogus', 'noAlcohol'] } as never), {
    relationship: undefined,
    location: undefined,
    budget: 'free',
    vibe: undefined,
    duration: undefined,
    limits: ['noAlcohol']
  });
});
