# CEO Review Summary: Date Night Ideas

| Field | Value |
|---|---|
| Date | 2026-07-19 |
| Mode | Selective expansion |
| Status | DONE_WITH_CONCERNS |

## Strongest Challenges

1. The original volume requirement was internally inconsistent and rewarded output over quality. It is now 300 high-quality published Ideas, with category minimums totaling exactly 300.
2. Web research creates copyright, provenance, duplication, and source-removal risks. The accepted product policy is broad discovery plus allowlisted, controlled collection; collected material is internal research input, not publishable copy.
3. The original success metrics were directional rather than measurable. Product scope is confirmed, but baselines, target values, observation windows, and stop/go thresholds still need to be set before launch analytics are finalized.

## Recommended Path

Build an independent Date Night Ideas product around the Picker and a 300-Idea editorial catalog. Research online sources broadly, transform findings through human editorial work, and publish only content that is specific, executable, traceable, and clearly more useful than its sources. Keep every missing visual actionable through the image requirements manifest.

## Accepted Scope

- Five primary Picker questions plus an optional hard-limits step
- Exactly three explainable results, refresh, restart, and share
- 300 high-quality Ideas across 15 primary categories
- Broad source discovery plus allowlisted, controlled collection
- Human editorial synthesis, provenance, originality checks, and safety review
- AI-assisted structuring, quality checks, limited drafting, and selected image generation
- Image requirements manifest with prompt, placement, dimensions, alt text, provenance, status, and acceptance criteria
- Editorial guidelines focused on specific, engaging, natural copy without generic AI phrasing
- Independent codebase, content, and visual design
- Hub, category, Spoke, Idea, legal, SEO, analytics, and advertising-ready surfaces

## Deferred

- Exact crawler, queue, storage, and editorial-workflow implementation
- CMS selection and operational staffing model
- Numeric acquisition, engagement, and monetization targets
- Advertising activation, affiliate placement, email capture, and printable products until traffic justifies them
- Final visual identity and the remaining per-Idea image prompts

## Not In Scope

- Reuse of `dinner-ideas` code, content, or design assets
- Bulk low-value AI content
- Copying, stitching, or close paraphrasing source pages
- Bypassing authentication, paywalls, robots directives, or technical access controls
- Live POI booking, deep maps integration, accounts, or native apps
- Runtime free-form LLM recommendations as the primary recommendation path

## Review Coverage

1. **Architecture:** Product flow is coherent. Source research and publishable Ideas require separate conceptual ownership; exact implementation is deferred.
2. **Error and rescue:** Unreachable, blocked, malformed, duplicate, or removed sources must not silently become publishable content.
3. **Security and threats:** Allowlisting, access-rule checks, rate limits, provenance, and deletion handling are product requirements.
4. **Data and interaction edges:** Empty recommendation buckets retain hard limits and relax only soft preferences; missing images remain visible in the manifest.
5. **Code quality:** No implementation exists to review. Independent implementation is an accepted constraint.
6. **Tests:** AC-01 through AC-12 define the principal product paths; implementation must add automated recommendation, content, SEO, and image-manifest checks.
7. **Observability:** Funnel analytics are in scope, but numeric thresholds remain unresolved.
8. **Database and state:** A 300-item catalog is operationally manageable; storage and workflow state design are deferred.
9. **API contracts:** No public API is required. Share URLs must preserve filter semantics without exposing internal source records.
10. **Performance and scale:** A mostly static 300-item catalog should be straightforward; image weight and page generation are the likely hotspots.
11. **Design and UX:** The short Picker and three-result limit are coherent. Image briefs and editorial voice now have explicit handoff and acceptance rules.
