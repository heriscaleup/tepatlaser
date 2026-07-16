# Tepat Laser — White-first Awwwards / All-pages Patch

Overlay this ZIP at the repository root.

This patch updates the shared visual layer used by every generated route, plus the main content templates:

- White-first design system with dark photographic heroes, green accent, editorial typography, subtle grid, reveal motion, and reduced-motion support.
- Correct Tepat Laser logo/brand in desktop and mobile navigation.
- Responsive mobile menu with nested Jasa and Material navigation.
- Floating WhatsApp logo and tracking hooks on every shared layout.
- Reworked home, services, about, portfolio, FAQ, contact, process, blog index, and blog article templates.
- Existing service/material/location pages inherit the same white-first colors, spacing, typography, buttons, tables, and mobile overflow protections through the shared CSS/layout layer.
- Existing blog Markdown content is not changed.

Verification: `HOME=/tmp/tepatlaser-home ASTRO_TELEMETRY_DISABLED=1 npm run build` passed; 67 static routes generated.
