# HexProve Brand Guidelines — Detailed Reference

## Full Color Specifications

### Primary Palette

```css
/* Mint Green - Primary Accent */
--color-mint: #00F5A0;
--color-mint-hover: #00D68A;  /* Slightly darker for hover states */
--color-mint-light: #00F5A020; /* 12% opacity for subtle backgrounds */

/* Blacks */
--color-black-primary: #0A0A0A;  /* Main background */
--color-black-pure: #000000;     /* True black (use sparingly) */

/* White */
--color-white: #FFFFFF;
```

### Gray Scale

```css
/* Grays - from lightest to darkest */
--color-gray-100: #F3F4F6;  /* Light mode backgrounds */
--color-gray-200: #E5E7EB;  /* Light mode borders */
--color-gray-300: #D1D5DB;  /* Light mode secondary text */
--color-gray-400: #9CA3AF;  /* Body text on dark */
--color-gray-500: #6B7280;  /* Muted text */
--color-gray-600: #4B5563;  /* Borders on dark, subtle elements */
--color-gray-700: #374151;  /* Elevated surface borders */
--color-gray-800: #1F2937;  /* Card backgrounds, tags */
--color-gray-900: #111827;  /* Alternative dark background */
```

### Partner Colors (Restricted Use)

```css
/* Only for partner brand references in Experience section */
--color-uniswap: #FF007A;
--color-opensea: #2081E2;
/* Bloomberg and Tradeweb use white wordmarks */
```

## Typography Specifications

### Font Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
```

### Type Scale (Desktop)

```css
/* Hero - Landing page main headline */
.hero-headline {
  font-size: 80px;      /* 72-96px range */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Section Headlines */
.section-headline {
  font-size: 56px;      /* 48-64px range */
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

/* Subheadline */
.subheadline {
  font-size: 24px;      /* 24-32px range */
  font-weight: 400;
  line-height: 1.4;
}

/* Body */
.body {
  font-size: 17px;      /* 16-18px range */
  font-weight: 400;
  line-height: 1.6;
}

/* Small / Caption */
.caption {
  font-size: 13px;      /* 12-14px range */
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.02em;
  text-transform: uppercase;  /* For labels */
}

/* Navigation */
.nav-item {
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
}
```

### Type Scale (Mobile)

```css
/* Scale down ~20-30% for mobile */
.hero-headline { font-size: 48px; }
.section-headline { font-size: 36px; }
.subheadline { font-size: 20px; }
.body { font-size: 16px; }
```

## Component Specifications

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #FFFFFF;
  color: #0A0A0A;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  border: none;
  transition: opacity 0.2s ease;
}
.btn-primary:hover {
  opacity: 0.9;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #FFFFFF;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  border: 1px solid #4B5563;
  transition: border-color 0.2s ease;
}
.btn-secondary:hover {
  border-color: #9CA3AF;
}

/* Contact Button (Nav) */
.btn-contact {
  background: transparent;
  color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #4B5563;
}
```

### Tags / Pills

```css
/* Standard Tag */
.tag {
  background: #1F2937;
  color: #FFFFFF;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
}

/* Accent Tag (WEB3, etc.) */
.tag-accent {
  background: #00F5A0;
  color: #0A0A0A;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

/* Outline Tag (ENTERPRISE, etc.) */
.tag-outline {
  background: transparent;
  color: #00F5A0;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #00F5A0;
}
```

### Section Headers

```css
/* Section Label */
.section-label {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.section-number {
  color: #00F5A0;
  font-size: 14px;
  font-weight: 500;
  font-family: monospace;  /* For consistent number width */
}

.section-divider {
  width: 40px;
  height: 1px;
  background: #4B5563;
}

.section-name {
  color: #9CA3AF;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

### Service List Item

```css
.service-item {
  display: flex;
  padding: 32px 0;
  border-bottom: 1px solid #1F2937;
}

.service-accent-bar {
  width: 3px;
  background: #00F5A0;
  margin-right: 24px;
}

.service-number {
  color: #00F5A0;
  font-size: 14px;
  font-family: monospace;
  margin-right: 32px;
}

.service-title {
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 600;
}

.service-description {
  color: #9CA3AF;
  font-size: 16px;
  line-height: 1.6;
}
```

## Spacing System

```css
/* Base unit: 4px */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;

/* Section spacing */
--section-padding-y: 120px;  /* Vertical padding between sections */
--container-max-width: 1200px;
--container-padding-x: 24px;
```

## Animation Specifications

```css
/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
--transition-slower: 400ms ease-out;

/* Hover transitions */
.interactive {
  transition: all var(--transition-base);
}

/* Scroll reveal animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  animation: fadeUp 0.6s ease-out forwards;
}
```

## Do's and Don'ts

### DO ✓
- Use mint green sparingly for emphasis
- Maintain generous whitespace
- Keep layouts clean and minimal
- Use the accent word pattern in headlines
- Maintain dark-first design
- Use geometric, tech-inspired graphics

### DON'T ✗
- Use gradients anywhere
- Add drop shadows
- Use more than 2 font weights per component
- Make body text pure white (use gray)
- Add decorative elements without purpose
- Use photography (prefer abstract graphics)
- Use rounded corners larger than 12px
- Use colors outside the palette
- Use bouncy or attention-grabbing animations

## File Formats

**Web assets:** SVG preferred, PNG fallback (2x for retina)
**Social media:** PNG at platform-specific dimensions
**Print:** PDF/EPS with CMYK colors (convert from RGB)
**Favicon:** SVG + ICO fallback
