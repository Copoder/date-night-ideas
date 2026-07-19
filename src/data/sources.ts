import type { CategoryId, SourceReference } from './types';

export const sources: SourceReference[] = [
  { id: 'knot-general', url: 'https://www.theknot.com/content/date-ideas', title: '121 Best Date Night Ideas', publisher: 'The Knot', accessedAt: '2026-07-19', notes: 'Broad activity discovery and category cross-checking; source wording is not reproduced.' },
  { id: 'knot-at-home', url: 'https://www.theknot.com/content/at-home-date-ideas', title: '25 Romantic and Fun At Home Date Night Ideas', publisher: 'The Knot', accessedAt: '2026-07-19', notes: 'At-home activity patterns and low-friction setup research.' },
  { id: 'knot-cheap', url: 'https://www.theknot.com/content/cheap-date-ideas', title: '50 Free, Cheap and Affordable Date Ideas', publisher: 'The Knot', accessedAt: '2026-07-19', notes: 'Free and low-budget activity discovery and budget cross-checking.' },
  { id: 'knot-outdoor', url: 'https://www.theknot.com/content/outdoor-date-ideas', title: 'Outdoor Date Ideas for Outdoorsy Couples', publisher: 'The Knot', accessedAt: '2026-07-19', notes: 'Outdoor activity discovery across accessible and adventurous plans.' },
  { id: 'knot-fall', url: 'https://www.theknot.com/content/fall-date-ideas', title: '20 Cute Fall Date Ideas', publisher: 'The Knot', accessedAt: '2026-07-19', notes: 'Fall-specific activity and seasonality research.' },
  { id: 'knot-winter', url: 'https://www.theknot.com/content/winter-date-ideas', title: 'Cute, Fun and Romantic Winter Date Ideas', publisher: 'The Knot', accessedAt: '2026-07-19', notes: 'Cold-weather activity and fallback research.' },
  { id: 'knot-summer', url: 'https://www.theknot.com/content/summer-date-ideas', title: '25 Cute and Fun Summer Date Ideas', publisher: 'The Knot', accessedAt: '2026-07-19', notes: 'Warm-weather and long-daylight activity research.' },
  { id: 'good-housekeeping-general', url: 'https://www.goodhousekeeping.com/life/relationships/a31405192/cute-romantic-date-ideas/', title: '130 Creative Date Night Ideas to Make Sparks Fly', publisher: 'Good Housekeeping', accessedAt: '2026-07-19', notes: 'Broad theme research with emphasis on at-home, food, romantic, and creative plans.' },
  { id: 'today-general', url: 'https://www.today.com/life/relationships/fun-date-ideas-rcna36719', title: '85 Fun Date Ideas for Couples on Date Night', publisher: 'TODAY', accessedAt: '2026-07-19', notes: 'Broad activity validation across relationship stages and time windows.' },
  { id: 'mindbodygreen-general', url: 'https://www.mindbodygreen.com/articles/fun-dates-ideas', title: '77 Fun Date Ideas to Spark Romance and Connection', publisher: 'mindbodygreen', accessedAt: '2026-07-19', notes: 'Low-pressure, connection-oriented and daytime theme research.' },
  { id: 'paired-games', url: 'https://www.paired.com/articles/date-night-games-for-couples', title: '60 Date Night Games for Couples to Try', publisher: 'Paired', accessedAt: '2026-07-19', notes: 'Game structure, cooperation, competition, and conversation-prompt research.' },
  { id: 'rei-hiking-basics', url: 'https://www.rei.com/learn/expert-advice/hiking-for-beginners.html', title: 'Hiking for Beginners: Getting Started', publisher: 'REI Co-op', accessedAt: '2026-07-19', notes: 'Practical outdoor preparation, route, weather, gear, and turnaround guidance.' }
];

export const sourceIdsByCategory: Record<CategoryId, string[]> = {
  'at-home': ['knot-at-home', 'good-housekeeping-general'],
  'cheap-free': ['knot-cheap', 'today-general'],
  romantic: ['good-housekeeping-general', 'mindbodygreen-general'],
  'playful-games': ['paired-games', 'knot-general'],
  outdoors: ['knot-outdoor', 'rei-hiking-basics'],
  'first-date': ['today-general', 'mindbodygreen-general'],
  'married-longterm': ['today-general', 'knot-general'],
  parents: ['knot-at-home', 'today-general'],
  'creative-diy': ['good-housekeeping-general', 'knot-general'],
  'food-drink': ['good-housekeeping-general', 'today-general'],
  'seasonal-fall': ['knot-fall', 'knot-general'],
  'seasonal-winter': ['knot-winter', 'knot-general'],
  'seasonal-spring-summer': ['knot-summer', 'knot-outdoor'],
  daytime: ['today-general', 'mindbodygreen-general'],
  unique: ['knot-general', 'good-housekeeping-general']
};

export const sourceById = new Map(sources.map((source) => [source.id, source]));
