# Tepat Laser — Full Awwwards Rebuild

Apply this archive over the repository root.

## What changed

- The brand is now Tepat Laser throughout the shared navigation and footer; no Jasa Cutting Laser brand lockup remains.
- Rebuilt white-first design system with a dark technical accent, laser green signal color, editorial typography, responsive navigation, and motion that respects reduced-motion preferences.
- Removed the invalid nested-main shell structure.
- Added one shared `CapabilityPage` template and migrated all service, material, metal-price, stainless, ACP, GRC, mihrab, and location routes to it.
- Reworked home, services, about, portfolio, FAQ, contact, process, blog listing, and article presentation to the same system.
- Floating WhatsApp and consistent Tepat Laser footer/header are shared across all Astro routes.
- Blog Markdown content is unchanged.

## Verification

- `npm run build` passes and generates 67 Astro static routes.
- `astro check` reports 0 errors. Existing content-schema deprecation hints remain and are unrelated to this redesign.
