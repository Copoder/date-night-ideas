import { spokeByCategory } from '@/data/spokes';
import type { CategoryId } from '@/data/types';

export const categoryPath = (category: CategoryId) => {
  const spoke = spokeByCategory.get(category);
  return spoke ? `/${spoke.slug}/` : `/categories/${category}/`;
};

export const ideaPath = (slug: string) => `/ideas/${slug}/`;
