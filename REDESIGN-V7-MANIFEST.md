# Tepat Laser — V7 Awwwards-Level Upgrade Manifest

## Vision
Elevate Tepat Laser dari website industri yang solid menjadi pengalaman digital yang layak dinominasikan Awwwards — bukan hanya soal estetika, tapi juga performa teknis, aksesibilitas, copywriting konversi, dan micro-interaction yang mengesankan.

## Design Pillars

### 1. Industrial Premium Aesthetic
- Noise/grain texture overlay untuk nuansa workshop autentik
- Typography scale yang lebih dramatis dan confident
- Color usage yang lebih bold namun terkontrol
- Spacing yang lebih generous (breathing room)

### 2. Motion System V7
- Scroll-driven animations dengan IntersectionObserver (zero-dep)
- Text reveal animations (word-by-word, line-by-line)
- Image mask reveals dengan parallax depth
- Magnetic hover effects pada interactive elements
- Smooth page transitions dengan page-wipe enhancement
- Custom cursor dengan blend-mode untuk industrial feel
- Respect `prefers-reduced-motion` secara total

### 3. Copywriting Conversion-First
- Headlines yang memukul: spesifik, emosional, benefit-driven
- Proof points yang konkret (bukan klaim umum)
- CTAs yang jelas dengan value proposition
- Social proof yang terintegrasi
- Objection handling yang natural

### 4. Technical Excellence
- Lighthouse 95+ di semua kategori
- Core Web Vitals: LCP < 2.0s, INP < 150ms, CLS < 0.05
- Zero layout shift pada load
- Font loading optimized (preload critical, swap rest)
- Image loading strategy: eager above-fold, lazy below
- Critical CSS inlined via Astro build

### 5. Accessibility Supreme
- Full keyboard navigation
- Screen reader optimized (ARIA landmarks, live regions)
- Focus management pada semua interactive
- Color contrast WCAG AAA where possible
- Skip link, reduced motion, high contrast support

## Files Changed

### Core System
- `src/styles/global.css` — Enhanced tokens, motion system, noise texture
- `src/components/BaseLayout.astro` — Enhanced meta, smooth scroll, grain overlay
- `src/components/Header.astro` — Scroll-hide/show, magnetic hover, enhanced glass
- `src/components/Footer.astro` — Redesigned layout, newsletter, social proof
- `src/components/Hero.astro` — Full-viewport, split-text animation, depth layers
- `src/components/CTA.astro` — Urgency, social proof, stronger copy

### Pages
- `src/pages/index.astro` — Rewritten copy, new sections, enhanced animations
- `src/pages/services.astro` — Better hierarchy, proof points
- `src/pages/about.astro` — Story-driven layout, team/engineer focus
- `src/pages/portfolio.astro` — Case study format, before/after

### Assets
- `public/release.json` — Updated to v7-2026-07-24
- `src/utils/constants.js` — Enhanced copy, new data structures

## Release Checklist
- [ ] Build passes (npm run build)
- [ ] Astro check passes (0 errors)
- [ ] Static crawl passes (0 broken links)
- [ ] Lighthouse: Performance 95+, A11y 100, BP 100, SEO 100
- [ ] Manual test: desktop 1440×900, mobile 390×844
- [ ] Reduced motion test passes
- [ ] Keyboard navigation test passes
- [ ] Release marker: v7-2026-07-24
