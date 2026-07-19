import type { Category } from './types';

export const categories: Category[] = [
  { id: 'at-home', name: 'At-Home Date Ideas', shortName: 'At home', description: 'Dates that turn an ordinary room into somewhere you actually want to be together.', kicker: 'No commute required', accent: '#f5b942', image: '/images/categories/at-home.webp' },
  { id: 'cheap-free', name: 'Cheap & Free Date Ideas', shortName: 'Cheap & free', description: 'Good nights that spend attention instead of money.', kicker: 'Keep the change', accent: '#53a66f', image: '/images/categories/cheap-free.webp' },
  { id: 'romantic', name: 'Romantic Date Ideas', shortName: 'Romantic', description: 'Closer, warmer plans without the rose-petal cliches.', kicker: 'Make room for two', accent: '#ef6b68', image: '/images/categories/romantic.webp' },
  { id: 'playful-games', name: 'Playful Date Ideas & Games', shortName: 'Playful & games', description: 'Dates with a score, a dare, or at least one reason to laugh.', kicker: 'A little competition', accent: '#448bd4', image: '/images/categories/playful-games.webp' },
  { id: 'outdoors', name: 'Outdoor & Adventure Date Ideas', shortName: 'Outdoors', description: 'Fresh-air plans for couples who would rather move than make small talk.', kicker: 'Take it outside', accent: '#357b59', image: '/images/categories/outdoors.webp' },
  { id: 'first-date', name: 'First Date Ideas', shortName: 'First date', description: 'Public, low-pressure plans that give the conversation somewhere to go.', kicker: 'Easy to say yes to', accent: '#c65f8e', image: '/images/categories/first-date.webp' },
  { id: 'married-longterm', name: 'Date Ideas for Married Couples', shortName: 'Long-term', description: 'Plans for getting out of autopilot when you already know each other well.', kicker: 'Break the routine', accent: '#8e6ac8', image: '/images/categories/married-longterm.webp' },
  { id: 'parents', name: 'Date Ideas for Parents', shortName: 'Parents', description: 'Realistic reconnection for short windows, low energy, and kids nearby.', kicker: 'After bedtime counts', accent: '#df7d3f', image: '/images/categories/parents.webp' },
  { id: 'creative-diy', name: 'Creative & DIY Date Ideas', shortName: 'Creative & DIY', description: 'Make something, ruin something, and keep the evidence.', kicker: 'Hands busy, phones down', accent: '#dd5f4a', image: '/images/categories/creative-diy.webp' },
  { id: 'food-drink', name: 'Food & Drink Date Ideas', shortName: 'Food & drink', description: 'Cook, taste, compare, and turn dinner into the activity.', kicker: 'Come hungry', accent: '#bd5c32', image: '/images/categories/food-drink.webp' },
  { id: 'seasonal-fall', name: 'Fall Date Ideas', shortName: 'Fall', description: 'Crisp-air plans with color, warmth, and something worth bringing home.', kicker: 'Sweater weather plans', accent: '#bc6534', image: '/images/categories/seasonal-fall.webp' },
  { id: 'seasonal-winter', name: 'Winter Date Ideas', shortName: 'Winter', description: 'Cold-weather dates that give you a reason to leave the blanket fort.', kicker: 'Warm up together', accent: '#4f7f9d', image: '/images/categories/seasonal-winter.webp' },
  { id: 'seasonal-spring-summer', name: 'Spring & Summer Date Ideas', shortName: 'Spring & summer', description: 'Long-light evenings, open windows, and plans made for better weather.', kicker: 'Use the daylight', accent: '#50a7a0', image: '/images/categories/seasonal-spring-summer.webp' },
  { id: 'daytime', name: 'Daytime Date Ideas', shortName: 'Daytime', description: 'Coffee-to-sunset ideas for couples who do not need midnight to make it a date.', kicker: 'Dates before dark', accent: '#d19b35', image: '/images/categories/daytime.webp' },
  { id: 'unique', name: 'Unique Date Ideas', shortName: 'Unique', description: 'The plans you will still be talking about when someone asks what you did this weekend.', kicker: 'Skip the usual', accent: '#3d8792', image: '/images/categories/unique.webp' }
];

export const categoryById = new Map(categories.map((category) => [category.id, category]));
