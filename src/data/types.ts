export type RelationshipStage = 'first' | 'dating' | 'longterm' | 'parents';
export type Location = 'home' | 'out' | 'either';
export type Budget = 'free' | 'low' | 'mid' | 'high';
export type Vibe = 'chill' | 'playful' | 'romantic' | 'adventurous';
export type Duration = 'short' | 'medium' | 'long';
export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'anytime';
export type CategoryId =
  | 'at-home'
  | 'cheap-free'
  | 'romantic'
  | 'playful-games'
  | 'outdoors'
  | 'first-date'
  | 'married-longterm'
  | 'parents'
  | 'creative-diy'
  | 'food-drink'
  | 'seasonal-fall'
  | 'seasonal-winter'
  | 'seasonal-spring-summer'
  | 'daytime'
  | 'unique';

export interface SourceReference {
  id: string;
  url: string;
  title: string;
  publisher: string;
  accessedAt: string;
  notes: string;
}

export interface DateIdea {
  id: string;
  slug: string;
  title: string;
  hook: string;
  summary: string;
  whyItWorks: string;
  primaryCategory: CategoryId;
  relationshipStages: RelationshipStage[];
  locations: Location[];
  budget: Budget;
  vibes: Vibe[];
  duration: Duration;
  seasons: Season[];
  tags: string[];
  dealBreakers: {
    noAlcohol: boolean;
    kidFriendly: boolean;
    indoorOnly: boolean;
    lowPrep: boolean;
    publicFriendly: boolean;
  };
  steps: string[];
  makeItYours: string;
  fallback: string;
  image: string;
  imageAlt: string;
  imageRequirementId: string;
  sourceIds: string[];
  researchNote: string;
  editorialNote: string;
  editorialReview: {
    reviewId: string;
    reviewedAt: string;
    reviewMethod: 'source synthesis + independent constraint edit';
    researchChecked: boolean;
    copyEdited: boolean;
    originalityChecked: boolean;
    safetyChecked: boolean;
  };
  status: 'published';
}

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  kicker: string;
  accent: string;
  image: string;
}

export interface PickerAnswers {
  relationship?: RelationshipStage;
  location?: Location;
  budget?: Budget;
  vibe?: Vibe;
  duration?: Duration;
  limits: Array<keyof DateIdea['dealBreakers']>;
}
