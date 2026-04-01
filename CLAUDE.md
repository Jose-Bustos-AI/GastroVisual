# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

GastroVisual — cinematographic landing page for a restaurant social media management agency. All copy is in Spanish. Deployed on Vercel at gastrovisual.vercel.app.

## Commands

- `npm run dev` — Start dev server (Vite HMR)
- `npm run build` — Production build (outputs to `dist/`)
- `npm run lint` — ESLint
- `npm run preview` — Preview production build locally

No test suite is configured.

## Architecture

Single-page React 19 app in one main file (`src/App.jsx`). No routing, no external APIs, no state management library.

**Key components in render order:** NoiseOverlay → Navbar → Hero (video scroll scrubbing) → HowItWorks → FeatureContent → FeatureTerminal → Manifesto → Pricing (uses PricingCard) → FAQ → FooterCTA → Footer

**Shared layout constants** are defined at module level: `sectionPadding` (consistent section spacing) and `innerContainer` (max-width centering). These are applied via inline `style` props, not Tailwind classes, because Tailwind class compilation was unreliable for layout in this setup.

**Video scroll scrubbing** in Hero uses a custom `requestAnimationFrame` loop with lerp interpolation (`factor: 0.12`) driven by `ScrollTrigger.create()` `onUpdate` progress. The video (`public/hero-video-scrub.mp4`) was re-encoded with `-g 1 -bf 0` (every frame is a keyframe) to enable precise seeking.

**GSAP pattern:** Always use `gsap.context()` inside `useEffect` with cleanup via `ctx.revert()`. Never use `gsap.from` with `opacity: 0` on content that must be visible — use `gsap.fromTo` with a safe starting opacity (≥0.2), or use ScrollTrigger `onUpdate` directly. Content must be visible without JS/animations loading.

## Design System

**Colors (exact hex, do not alter):**
- `#FFFFFF` white, `#0F0F0F` near-black, `#FF6B2B` orange accent, `#F7F6F3` gray surface, `#767676` gray text, `#FFF3EE` soft orange

**Fonts (loaded from Google Fonts in index.html):**
- Titles: `Playfair Display` 800 (mapped to `font-syne` in Tailwind theme)
- Body/UI: `DM Sans`
- Data/metrics: `DM Mono`

**Tailwind config** lives in `src/index.css` via `@theme` block (Tailwind v4 CSS-based config, no tailwind.config.js).

## Key Conventions

- Inline `style` props for layout-critical spacing (section padding, grids, containers). Tailwind classes for colors, typography, and decorative styles.
- Pricing data is passed as props to `PricingCard` component, not hardcoded per card.
- `hiwSteps` array and `hiwCardStyle` are defined outside the `HowItWorks` component to avoid re-creation.
- WhatsApp CTA links use `https://wa.me/34600000000` (placeholder number).
- Responsive grid breakpoint at 768px via CSS media queries in `index.css` (`.hiw-grid`, `.pricing-cards` switch to single column).
