# Tepat Laser — Awwwards-oriented redesign

## Direction

- White-first editorial layout with deep workshop green, laser-lime signal color, local display typography, generous spacing, and technical micro-labels.
- One shared header, mobile navigation, footer, CTA language, cards, buttons, metadata layer, and reveal behavior across the Astro site.
- Desktop and mobile layouts use the same hierarchy instead of separate page-specific compositions.

## Main fixes

- Replaced remote Google Fonts with bundled local Clash Display and Gudlak fonts.
- Removed Google Tag Manager from the Astro layout so the first render has no third-party blocking request.
- Fixed the capability breadcrumb data bug that passed JSON-LD objects into a UI component expecting URL crumbs.
- Added consistent LocalBusiness structured data, canonical metadata, manifest link, and local asset-only rendering.
- Fixed the desktop/mobile navigation breakpoint gap and added accessible mobile menu controls plus Escape handling.
- Aligned the two public long-form landing pages (`pagar-laser-cutting` and `railing-laser-cutting`) with the shared color tokens and removed their third-party ad script.
- Added `.npmrc` with `legacy-peer-deps=true` because `@astrojs/tailwind@6` still declares an older Astro peer range while the existing project uses Astro 6.

## Verification completed

- `npm ci` passes from a clean dependency install.
- `npm run build` passes and generates 67 Astro static routes.
- `astro check` passes with 0 errors; remaining output is only existing Astro content-schema deprecation hints and inline JSON-LD hints.
- Static crawl found 73 HTML documents including redirects and public landing pages.
- All 73 generated documents returned HTTP 200 through Astro preview.
- Internal absolute `href` and `src` references were checked against `dist`; no missing local assets or routes were found.
- Content audit found one title, description, and H1 on every content document; redirect documents are intentionally metadata-only.
- No external font or external JavaScript source remains in generated HTML. WhatsApp and structured-data URLs remain intentionally external links.

## Note

The runtime image did not contain the browser helper/Chromium binary, and the browser download endpoint returned a truncated archive. Runtime validation therefore used Astro preview HTTP checks, static DOM/metadata/link audits, clean build, and type-checking. No source file is shipped with `node_modules` or `dist` in the patch archive.
