# SEO + Product QA Review, 2026-07-19

Mode: selective expansion. Status: DONE_WITH_CONCERNS.

The UI and normal Picker path passed browser QA, but the project is not yet strong enough to claim head-term SEO readiness. The three decisions that matter before launch are:

1. Fix or explicitly explain zero-result states when hard limits conflict; malformed result URLs currently produce a blank page under a false three-result heading.
2. Back the 300-item “researched” claim with per-idea provenance and real editorial review evidence. Current evidence is three source pages, two source combinations for 270 ideas, 15 shared category-level rationale/setup/fallback strings, and repeated hook templates across most of the catalog.
3. Consolidate or materially differentiate the 10 SEO spokes from their category pages. Their rendered text is 82.9%–91.6% similar, creating cannibalization and scaled-page risk.

Technical cleanup also remains: sitemap/canonical trailing-slash mismatch, `/results/` in sitemap despite noindex/robots disallow, five orphaned spokes, initial focus theft, five-vs-six copy mismatch, misleading image reuse for no-alcohol results, and eager below-fold imagery.

The site should be described as a polished static preview with a 300-seed catalog, not yet as a proven people-first editorial authority for `date night ideas`.
