# Graph Report - D:\code\tepatlaser  (2026-08-10)

## Corpus Check
- Large corpus: 272 files · ~760,077 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 263 nodes · 416 edges · 20 communities (18 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15

## God Nodes (most connected - your core abstractions)
1. `MATERIALS` - 15 edges
2. `SITE_CONFIG` - 11 edges
3. `SERVICES` - 11 edges
4. `generateBreadcrumbSchema()` - 11 edges
5. `scripts` - 9 edges
6. `generateFAQSchema()` - 7 edges
7. `buildPayload()` - 5 edges
8. `handleClick()` - 5 edges
9. `categories` - 4 edges
10. `PORTFOLIO_PROJECTS_V10` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (20 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (29): siteUrl, schema, dropdowns, menu, menuButton, aboutDepth, blogSchema, posts (+21 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (27): item, base, item, item, item, item, base, item (+19 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (12): crumbs, faqSchema, jsonLd, relatedPosts, calculateAverageRating(), generateBlogFaqSchema(), generateBlogPostSchema(), generateProductSchema() (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (21): astro, @astrojs/check, @astrojs/sitemap, @astrojs/tailwind, dependencies, astro, @astrojs/check, @astrojs/sitemap (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (17): lighthouse, devDependencies, lighthouse, puppeteer-core, name, scripts, astro, audit:browser (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (16): benefits, faqs, fit, gallery, notFit, priceFactors, qualityChecks, steps (+8 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (15): background_color, categories, description, display, icons, lang, name, orientation (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (10): failures, htmlFiles, pages, profiles, report, reportDir, results, root (+2 more)

### Community 8 - "Community 8"
Cohesion: 0.40
Nodes (9): buildPayload(), captureAndStore(), getStored(), getUrlParams(), handleClick(), hookButtons(), injectCodeIntoWaUrl(), preRegisterCode() (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.28
Nodes (6): getPortfolioProject(), PORTFOLIO_PROJECTS_V10, breadcrumbs, faq, related, schema

### Community 10 - "Community 10"
Cohesion: 0.25
Nodes (7): **/*, astro/tsconfigs/strict, .astro/types.d.ts, dist, exclude, extends, include

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (5): failures, htmlFiles, manifestFile, releaseFile, root

### Community 12 - "Community 12"
Cohesion: 0.60
Nodes (4): CAPABILITY_CONTENT, decision(), getCapabilityContent(), image()

### Community 13 - "Community 13"
Cohesion: 0.60
Nodes (4): initializeEnhancedConversionTracking(), IMPORTANT:, sha256(), trackEnhancedConversion()

## Knowledge Gaps
- **135 isolated node(s):** `name`, `type`, `version`, `dev`, `build` (+130 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `name`, `type`, `version` to the rest of the system?**
  _135 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08144796380090498 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06612244897959184 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.11255411255411256 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.10457516339869281 - nodes in this community are weakly interconnected._