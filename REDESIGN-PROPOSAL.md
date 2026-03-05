# Hexprove.com — Redesign Proposal

## Current State
- Dark-first site with light mode support
- Accent: `#00d4aa` (teal/green)
- Font: Inter (system)
- Sections: Hero → WhyChooseUs → WhatWeCatch → Services → Engagement → Experience → Team → Founder → Contact
- Framer Motion animations throughout
- Mobile: partially fixed, needs work

## A. Visual Direction

### Color Palette

**Current:**
| Role | Dark | Light |
|------|------|-------|
| Background | `#000000` | `#fafafa` |
| Surface | `#0a0a0a` | `#ffffff` |
| Accent | `#00d4aa` | `#00a88a` |
| Text Primary | `#ffffff` | `#0a0a0a` |
| Text Secondary | `#a0a0a0` | `#525252` |

**Proposed — shift to a more premium, confident palette:**
| Role | Dark | Light |
|------|------|-------|
| Background | `#09090b` (zinc-950) | `#fafafa` |
| Surface | `#18181b` (zinc-900) | `#ffffff` |
| Surface Elevated | `#27272a` (zinc-800) | `#f4f4f5` |
| Accent Primary | `#6366f1` (indigo-500) | `#4f46e5` (indigo-600) |
| Accent Secondary | `#8b5cf6` (violet-500) | `#7c3aed` (violet-600) |
| Success/Trust | `#10b981` (emerald-500) | `#059669` |
| Text Primary | `#fafafa` | `#09090b` |
| Text Secondary | `#a1a1aa` (zinc-400) | `#52525b` (zinc-600) |
| Text Muted | `#71717a` (zinc-500) | `#a1a1aa` |
| Border | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.06)` |

**Why indigo/violet over teal:**
- Teal reads "health/wellness" — indigo reads "tech/precision/trust"
- Matches the vibe of Linear, Vercel, Stripe
- Gradient from indigo → violet adds depth without being flashy

### Typography
- **Headlines:** Inter (keep) — weight 700, letter-spacing -0.03em
- **Body:** Inter — weight 400, 18px desktop / 16px mobile
- **Mono/Code:** JetBrains Mono or SF Mono — for stats, technical labels
- **Display sizes:** 
  - XL: `clamp(2.5rem, 7vw, 6rem)` (smaller max than current 8rem)
  - LG: `clamp(1.75rem, 5vw, 4rem)`
  - MD: `clamp(1.25rem, 3vw, 2.5rem)`

### Spacing System
- Base unit: 4px
- Section padding: 120px top/bottom desktop, 80px mobile
- Content max-width: 1200px (tighter than current 1280px)
- Card gap: 24px
- Component rhythm: 8, 16, 24, 32, 48, 64, 96, 120

### Overall Mood
- **Premium but approachable** — not cold corporate
- **Confident and technical** — this team knows crypto inside out
- **Clean whitespace** — let content breathe
- **Subtle motion** — purposeful, not decorative
- **Dark mode first** — crypto audience expects it

## B. Section-by-Section Redesign

### 1. Hero
**Current:** Large "Crypto-native QA experts" with scramble animation, stats grid, company logos at bottom

**Proposed:**
- **Headline:** "We break DeFi protocols before hackers do." (more provocative, benefit-focused)
- **Subhead:** "Crypto-native QA from the team that tested billions in on-chain volume."
- **Layout:** Left-aligned text (60%), right side: animated terminal/code visual showing a bug being caught
- **CTA:** One primary button — "Book a Call" (indigo gradient). Remove "Learn More" (adds choice paralysis)
- **Stats:** Keep 3 stats but style as pill badges inline, not a grid
- **Company logos:** Move to dedicated "Trusted By" section below
- **Animation:** Fade-up on scroll, no text scramble (feels gimmicky for B2B)
- **Mobile:** Stack vertically, full-width CTA

### 2. Social Proof / Trusted By (NEW — replaces bottom logo bar)
- Logo cloud: Uniswap, OpenSea, Bloomberg, Tradeweb
- Simple horizontal row with subtle grayscale → color on hover
- "Experience from teams at" label
- 48px tall logos, evenly spaced

### 3. WhyChooseUs → rename to "Why Hexprove"
**Current:** Comparison-style section

**Proposed:**
- 3-column grid with icon + title + description
- Columns: "Crypto-Native" / "Battle-Tested" / "Flexible"
- Each card: subtle border, hover lift effect
- Icon style: duotone with indigo accent
- Mobile: Stack to single column

### 4. WhatWeCatch → rename to "What We Find"
**Current:** Bug categories display

**Proposed:**
- Interactive cards showing bug categories
- Each card: category name, real example, severity badge
- Hover: expand to show more detail
- Think Stripe's feature cards
- Mobile: Swipeable carousel or stacked

### 5. Services
**Current:** Service listing

**Proposed:**
- 2-column layout: left sticky label, right scrolling cards
- Each service: title, 2-line description, "Learn more →" link
- Services: Smart Contract QA, DeFi Protocol Testing, Security Audit Support, Cross-chain Testing
- Mobile: Single column, no sticky

### 6. Case Study (NEW)
- Featured case study from Morpho pilot (when results available)
- Layout: metric highlights left, narrative right
- Key metrics in large mono font: "X bugs found", "Y% coverage", "Z days"
- Quote from client
- "Read Full Case Study →" link
- Placeholder until Morpho data is ready

### 7. Engagement → keep but simplify
**Current:** Flexible engagement model

**Proposed:**
- 3 tiers: "Sprint" (2-week pilot), "Retainer" (ongoing), "Embedded" (full-time)
- Card layout, most popular highlighted
- Each: what's included, ideal for, starting price range
- CTA at bottom of each card

### 8. Experience → merge into Hero stats or remove
- Currently redundant with Hero stats
- Either merge or convert to a timeline visualization
- **Recommendation:** Remove as standalone section, fold into Hero

### 9. Team → Founder spotlight only
**Current:** Team grid + founder

**Proposed:**
- Just founder section (Sino) — solo founder, don't pretend it's a team
- Photo + bio + credentials
- "Built QA for [companies]. Now building yours."
- Link to LinkedIn

### 10. Contact → simplify
**Current:** Form-heavy

**Proposed:**
- Split: "Book a Call" (Calendly embed) on left, contact form on right
- Or: Just Calendly embed — fewer barriers to conversion
- Remove any non-essential form fields
- Mobile: Stack, Calendly first

### 11. Footer (NEW/IMPROVED)
- Clean 3-column: Navigation / Contact / Social
- Newsletter signup (optional)
- "© 2026 Hexprove" + legal links

## C. New Sections to Add
1. ✅ Social Proof / Trusted By (logo cloud)
2. ✅ Case Study (Morpho, when ready)
3. 🔜 Blog Preview — latest 3 posts in card format
4. 🔜 FAQ — common questions about crypto QA

## D. Sections to Remove or Merge
- **Experience** → merge into Hero or remove
- **Team** → simplify to Founder only
- **WhyChooseUs + WhatWeCatch** → could merge into one "Why Hexprove" mega-section

## E. Technical Recommendations
1. **Remove text scramble animation** — replace with clean fade-up
2. **Reduce Framer Motion usage** — only on scroll-triggered reveals, not decorative
3. **Add JSON-LD structured data** — Organization, WebSite, Service schemas
4. **Add OG meta tags** — per page, with custom images
5. **Lazy load below-fold sections** — improve LCP
6. **Replace CSS variable overrides** — the `!important` legacy section is mostly cleaned but review again
7. **Add page transitions** — subtle fade between routes
8. **Image optimization** — use Next.js Image component everywhere, WebP format
