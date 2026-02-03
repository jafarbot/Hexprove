# CLAUDE.md - Hexprove Codebase Guide

## Project Overview

Hexprove is a **crypto-native QA consultancy marketing website** built with Next.js 14. It showcases QA testing services for Web3, DeFi, and NFT companies. The site features heavy use of Framer Motion animations, a dark/light theme system, and comprehensive SEO.

**Current status:** The site is in **coming-soon mode** — `app/page.tsx` renders the `ComingSoon` component directly. The full multi-section site is commented out in that file and can be restored by uncommenting.

**Live URL:** https://hexprove.com

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.x | Framework (App Router) |
| React | 18.x | UI library |
| TypeScript | 5.9.x | Type safety (strict mode) |
| Tailwind CSS | 3.4.x | Utility-first styling |
| Framer Motion | 12.x | Animations |
| Lucide React | 0.563.x | Icon library |
| ESLint | 9.x | Linting (next/core-web-vitals) |

## Quick Start

```bash
npm install
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm start          # Run production server
npm run lint       # Run ESLint
```

## Project Structure

```
app/
├── layout.tsx              # Root layout: fonts, metadata, SEO, JSON-LD, ThemeProvider
├── page.tsx                # Entry page (currently renders ComingSoon; full site commented out)
├── coming-soon/page.tsx    # Coming soon landing page
└── globals.css             # CSS variables, theme system, utility classes, Tailwind overrides

components/
├── Navbar.tsx              # Top nav with theme toggle
├── Hero.tsx                # Hero section with animated text
├── WhyChooseUs.tsx         # Comparison: Hexprove vs crowdsourced QA
├── WhatWeCatch.tsx         # Service showcase (bugs found)
├── Services.tsx            # 4 service cards with tech tags
├── Experience.tsx          # Company logos and experience metrics
├── Team.tsx                # Team values section
├── Founder.tsx             # Founder profile card
├── Contact.tsx             # Contact form and footer
├── PageLoader.tsx          # Entry animation (shows once per session via sessionStorage)
├── Logo.tsx                # SVG hexagon logo (animated + static variants)
├── ThemeContext.tsx         # React Context definition for theme
├── ThemeProvider.tsx        # Theme provider (dark/light, persisted in localStorage)
└── animations/
    ├── index.ts            # Barrel export for all animation components
    ├── TextScramble.tsx    # TextScramble, CharReveal, WordReveal
    ├── AnimatedCounter.tsx # AnimatedCounter, SlotCounter
    ├── MagneticButton.tsx  # MagneticButton, HoverText
    ├── HexagonLoader.tsx   # Hexagon loading animation
    └── MatrixRain.tsx      # Matrix-style rain effect

public/
├── favicon.svg             # Hexagon logo favicon
├── logo.svg                # Main brand logo
├── founder.jpg             # Founder photo
├── logos/                  # Partner/experience company logos
└── email-assets/           # Email marketing assets
```

## Architecture & Conventions

### App Router (Next.js 14)

- Uses the `app/` directory (App Router), not `pages/`.
- The root layout (`app/layout.tsx`) wraps all pages with `ThemeProvider` and `PageLoader`.
- Path alias: `@/*` maps to the project root (e.g., `import Logo from "@/components/Logo"`).

### Client Components

All components use `"use client"` — this is an interactive, animation-heavy site with no server components beyond the layout metadata exports.

### Component Patterns

- **One component per file**, functional components with hooks.
- **Section components** (Hero, Services, Experience, etc.) are full-page sections composed in `app/page.tsx`.
- **Animation components** live in `components/animations/` and are re-exported via the barrel file `components/animations/index.ts`.
- Import animation components from the barrel: `import { TextScramble, MagneticButton } from "@/components/animations"`.

### Theme System

The site supports dark and light modes via CSS custom properties:

- **Toggle mechanism:** Class-based (`dark`/`light` on `<html>`), controlled by `ThemeProvider`.
- **Persistence:** Theme stored in `localStorage` under key `"hexprove-theme"`.
- **Default:** Dark mode.
- **CSS variables** defined in `app/globals.css` under `:root, .dark` and `.light` selectors.
- **Access in components:** Use the `useTheme()` hook from `@/components/ThemeProvider`.

Key CSS variables: `--background`, `--foreground`, `--accent`, `--surface`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border-color`, `--card-bg`, `--glass-bg`, etc.

### Styling Approach

- **Tailwind CSS** for utility classes in JSX.
- **CSS custom properties** (in `globals.css`) for theme-aware values.
- **Custom utility classes** in `globals.css`: `.gradient-text`, `.glass`, `.glow`, `.mono`, `.btn-primary`, `.btn-secondary`, `.card`, `.tag`, `.input-field`, `.display-xl/lg/md`.
- **Legacy overrides** at the bottom of `globals.css` remap Tailwind color classes (e.g., `bg-black`, `text-white`) to theme variables using `!important`. Keep these in sync when adding new themed elements.
- **Fluid typography** using `clamp()` for responsive sizing.

### Animation Patterns (Framer Motion)

Common patterns used throughout:

```tsx
// Scroll-triggered with useInView (fires once)
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

// Scroll progress transforms
const { scrollYProgress } = useScroll({ target: containerRef });
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

// Standard reveal pattern
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: index * 0.1 }}
/>

// Spring physics for interactive elements
transition={{ type: "spring", stiffness: 150, damping: 15 }}
```

### Accessibility

- Semantic HTML: `<header>`, `<section>`, `<article>`, `<address>`.
- ARIA attributes: `aria-label`, `role="list"`, `aria-required`, `aria-hidden` for decorative elements.
- Touch target minimum: 44px.
- `prefers-reduced-motion` media query in `globals.css` disables animations.

### SEO

- Comprehensive `metadata` export in `app/layout.tsx` (title, description, keywords, Open Graph, Twitter cards).
- JSON-LD structured data (`Organization` schema) in `layout.tsx`.
- Canonical URL, robots config, and social media tags all configured.

## Environment Variables

| Variable | Type | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_COMING_SOON` | `string` | `"true"` | Currently unused (coming-soon is hardcoded in `page.tsx`). Originally toggled between coming-soon and full site. |

Copy `.env.example` to `.env.local` and adjust as needed. The `NEXT_PUBLIC_` prefix makes the variable accessible in browser code.

## Page Composition (Full Site)

When the full site is enabled (by uncommenting in `app/page.tsx`), the home page renders these sections in order:

1. `Navbar` — Sticky navigation with theme toggle
2. `Hero` — Animated hero with CTA buttons
3. `WhyChooseUs` — Hexprove vs crowdsourced comparison
4. `WhatWeCatch` — Types of bugs caught
5. `Services` — 4 service cards (Manual QA, E2E Automation, dApp Testing, Cross-chain)
6. `Experience` — Company logos marquee + animated counters
7. `Team` — Team values
8. `Founder` — Founder profile
9. `Contact` — Contact form + footer

## Key Design Tokens

- **Accent color:** `#00d4aa` (teal green) — used for highlights, CTAs, gradient endpoints
- **Font:** Inter (loaded via `next/font/google`, CSS variable `--font-inter`)
- **Dark background:** `#000000`
- **Light background:** `#fafafa`
- **Glass morphism:** `backdrop-filter: blur(20px)` with semi-transparent backgrounds
- **Border radius:** Generally rounded corners via Tailwind (`rounded-xl`, `rounded-2xl`)

## Development Guidelines

### Adding a New Section Component

1. Create `components/NewSection.tsx` with `"use client"` directive.
2. Use `useInView` from `framer-motion` for scroll-triggered animations.
3. Use CSS variables (e.g., `var(--text-primary)`) or theme-aware Tailwind classes for colors.
4. Add the component to the page composition in `app/page.tsx`.

### Adding a New Animation Component

1. Create the component in `components/animations/`.
2. Export it from `components/animations/index.ts`.
3. Import via the barrel: `import { NewAnimation } from "@/components/animations"`.

### Modifying the Theme

- Add new CSS variables to both `:root, .dark` and `.light` blocks in `globals.css`.
- Add corresponding Tailwind extensions in `tailwind.config.ts` under `theme.extend.colors`.
- If using Tailwind color classes that need theme awareness, add override rules in the "Legacy Overrides" section of `globals.css`.

### Coming Soon / Full Site Toggle

The site is currently hardcoded to show the coming-soon page. To restore the full site:
1. Open `app/page.tsx`.
2. Comment out the `ComingSoon` import and its return statement.
3. Uncomment the full site imports and the full `Home` component.

## Deployment

- **Platform:** Vercel (optimized for Next.js).
- **Build command:** `next build`.
- **Output:** `.next/` directory (gitignored).
- Set environment variables in the Vercel dashboard.

## Testing

No test framework is currently configured. If adding tests:
- Unit/component tests: Jest + React Testing Library or Vitest.
- E2E tests: Playwright or Cypress.
- Add test scripts to `package.json` and a test config at the project root.

## Linting

```bash
npm run lint       # Runs next lint with next/core-web-vitals preset
```

ESLint config is in `.eslintrc.json`. TypeScript strict mode is enabled in `tsconfig.json`.

## Common Gotchas

- **All components are client components** — don't expect server-side data fetching in existing components.
- **Theme CSS overrides use `!important`** — the legacy overrides in `globals.css` remap standard Tailwind classes to theme variables. Be aware of this when debugging unexpected colors.
- **PageLoader uses `sessionStorage`** — the loader animation shows once per browser session, not on every page load.
- **Image optimization is minimal** — `next.config.js` has an empty `images.domains` array. Add external domains there if loading remote images.
- **The `@types/*` packages are in `dependencies`**, not `devDependencies`. This is intentional for Vercel builds.
