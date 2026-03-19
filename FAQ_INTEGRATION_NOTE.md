# FAQ Component Integration Guide

## Component Location
`components/FAQ.tsx`

## How to Add to Homepage

In `app/page.tsx`, import the component and add it to the component stack:

```tsx
import FAQ from "@/components/FAQ";

export default function Home() {
  const blogPostCount = getBlogPostCount();

  return (
    <main>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <WhatWeCatch />
      <Services />
      <Engagement />
      <Experience />
      <Team />
      <Founder />
      <FAQ />           {/* Add here — after Founder, before Contact */}
      <Contact blogPostCount={blogPostCount} />
    </main>
  );
}
```

## What It Includes

✅ **8 buyer objection questions** targeting long-tail SEO:
- Why DeFi protocols need dedicated QA
- Security audit vs QA testing
- Pricing expectations
- Crowdsourced testing comparison
- Engagement structure
- Smart contract testing scope
- Timeline expectations
- Chain/protocol support

✅ **Design system compliance:**
- Dark theme with accent color (#00F5A0)
- Framer Motion animations matching existing components
- Responsive Tailwind classes
- Section numbering (06)
- Accordion interaction pattern
- Same typography and spacing rhythm

✅ **SEO optimization:**
- FAQ JSON-LD structured data included
- Semantic HTML with proper ARIA labels
- H2/H3 hierarchy
- Long-tail keyword targeting

✅ **Accessibility:**
- Keyboard navigable accordion
- ARIA expanded states
- Min-height touch targets (44px)
- Proper heading structure

## Section Number
The component uses `06` as the section number. If you want it in a different position, adjust the number in the component to match the sequence.

## No Build Required
This is a component file only — no dependencies added, no build needed. Just import and add to the page when ready.
