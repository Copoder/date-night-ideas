---
title: Date Idea Content Schema
version: 1.4
date_created: 2026-07-19
last_updated: 2026-07-19
owner: date-night-ideas
tags: [data, schema, content]
---

# Introduction

Structured record for each date-night idea. Online recommendations MUST use published inventory only. Content is based primarily on documented web research and independent constraint editing. AI may assist with structuring, quality checks, copy drafts, and images; runtime free-form generation and bulk low-value AI content are not primary paths.

Image policy: use AI-generated images or **free, low/no copyright-risk** photos (not paid commercial stock) according to content fit. Provenance is required for both paths.

## 1. Purpose & Scope

- Complete-project inventory: **≥ 300 high-quality published** ideas, organized by **primaryCategory** quotas (see PRD §4.3).
- Audience: content pipeline, app, SEO.

## 2. Definitions

| Term | Definition |
|------|------------|
| Idea | One recommendable activity |
| primaryCategory | Main taxonomy bucket for navigation and quotas |
| Hard filter | Must never be violated |
| Soft score | Ranking preference |

## 3. Requirements

- **REQ-001**: Published Idea MUST include title, summary, image, filter enums, primaryCategory, sourceReferences, editorialReview, status.
- **REQ-002**: Recommend exactly 3 Ideas when possible; soft relax OK; hard filters never relax.
- **REQ-003**: Image MUST record provenance. `imageSource.type` is `ai` or `free_photo`. For `free_photo`, MUST include license label + source URL. Paid commercial stock purchase is out of policy.
- **REQ-004**: primaryCategory MUST be one of the PRD category IDs.
- **REQ-005**: Published Idea MUST cite at least two research sources and record a unique editorial review ID, research note, and independent-edit note. Source material is research input, not publishable copy.
- **REQ-006**: Automated collection MUST respect source access rules, robots directives, rate limits, and terms; it MUST NOT bypass authentication, paywalls, or technical restrictions.
- **REQ-007**: Every Idea that needs an image MUST reference an entry in `assets/image-requirements.json` until an approved asset is attached.
- **REQ-008**: Published copy MUST pass the editorial checklist in `docs/editorial-guidelines.md`, including repeated-template rejection.
- **CON-001**: No published Idea without image.
- **CON-002**: No copied, stitched, or close-paraphrased source text may be published.
- **GUD-001**: One Idea may have many tags; only one primaryCategory.

### 3.1 Enums

| Field | Values |
|-------|--------|
| relationshipStages | `first`, `dating`, `longterm`, `parents` |
| locations | `home`, `out`, `either` |
| budget | `free`, `low`, `mid`, `high` |
| vibes | `chill`, `playful`, `romantic`, `adventurous` |
| duration | `short`, `medium`, `long` |
| season | `spring`, `summer`, `fall`, `winter`, `anytime` |
| status | `draft`, `published` |
| primaryCategory | `at-home`, `cheap-free`, `romantic`, `playful-games`, `outdoors`, `first-date`, `married-longterm`, `parents`, `creative-diy`, `food-drink`, `seasonal-fall`, `seasonal-winter`, `seasonal-spring-summer`, `daytime`, `unique` |

### 3.2 Deal-breaker flags

`noAlcohol`, `kidFriendly`, `indoorOnly`, `lowPrep`, `publicFriendly`

## 4. Data contract (example)

```json
{
  "id": "diy-pizza-night",
  "slug": "diy-pizza-night",
  "title": "DIY Pizza Night",
  "summary": "Build personal pizzas together, then rate each other’s creations.",
  "image": "/images/ideas/diy-pizza-night.webp",
  "imageRequirementId": "idea-diy-pizza-night",
  "imageSource": {
    "type": "ai",
    "model": "tbd",
    "promptId": "style-v1"
  },
  "_imageSourceFreePhotoExample": {
    "type": "free_photo",
    "license": "e.g. CC0 / site free license — verify per asset",
    "sourceUrl": "https://example.com/photo/123",
    "attribution": "optional if required by license"
  },
  "primaryCategory": "at-home",
  "relationshipStages": ["dating", "longterm", "parents"],
  "locations": ["home"],
  "budget": "low",
  "vibes": ["playful", "romantic"],
  "duration": "medium",
  "tags": ["food", "diy", "indoor"],
  "sourceIds": ["knot-at-home", "good-housekeeping-general"],
  "researchNote": "Sources validate the underlying activity pattern and common planning constraints; source wording is not reproduced.",
  "editorialNote": "This version adds a budget, time window, location rule, and a specific finishing twist.",
  "editorialReview": {
    "reviewId": "launch-2026-07-19-diy-pizza-night",
    "reviewedAt": "2026-07-19",
    "reviewMethod": "source synthesis + independent constraint edit",
    "researchChecked": true,
    "copyEdited": true,
    "originalityChecked": true,
    "safetyChecked": true
  },
  "dealBreakers": {
    "noAlcohol": true,
    "kidFriendly": true,
    "indoorOnly": true,
    "lowPrep": false,
    "publicFriendly": true
  },
  "steps": [
    "Set out dough, sauce, cheese, and toppings",
    "Each person builds a pizza",
    "Bake and taste-test"
  ],
  "season": ["anytime"],
  "seoKeywords": ["at home date night ideas", "cheap date night ideas"],
  "status": "published",
  "updatedAt": "2026-07-19T00:00:00Z"
}
```

## 5. Acceptance Criteria

- **AC-001**: Missing image → cannot publish.
- **AC-002**: `indoorOnly` user flag → no outdoor-only Ideas.
- **AC-003**: Category quota report runnable against inventory.
- **AC-004**: Shareable answer payload round-trips filters.
- **AC-005**: Refresh with same answers returns 3 ideas and prefers non-identical set vs previous draw.
- **AC-006**: Skipping hard-limit step applies no deal-breaker filters.
- **AC-007**: Every published Idea has two traceable source IDs backed by successful research receipts and a completed unique editorialReview.
- **AC-008**: Similarity checks reject copied, stitched, or close-paraphrased source content.

## 6. Out of Scope

Geo POI, live weather, couple accounts, LLM rerank as sole ranker, paid commercial stock imagery as default source, unauthorized or access-control-bypassing collection.
