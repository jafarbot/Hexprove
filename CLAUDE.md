# Hexprove Development Guidelines

## Z-Index Hierarchy

Maintain consistent z-index layers to prevent stacking issues:

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base content | 0-9 | Regular page content, sections |
| Navbar | 40 | Fixed navigation bar |
| Modals/Overlays | 9999 | Mobile menu (via Portal), dialogs |

**Important:** Mobile menu uses React Portal to escape navbar's stacking context, ensuring it always appears on top.

## Navigation Links

- ALWAYS use `/#section` format for anchor links (not `#section`)
- This ensures links work from ANY page, not just homepage
- Example: `href="/#contact"` not `href="#contact"`

## Mobile Menu Implementation

- Mobile menu uses React Portal to render at `document.body` level
- This ensures menu appears above ALL page content (z-index isolation)
- Navbar uses `z-40`, mobile menu uses `z-[9999]` (rendered outside navbar context)
- Portal pattern prevents z-index stacking context issues
- Mobile menu code structure:
  ```tsx
  import { createPortal } from "react-dom";
  
  // Check if mounted (SSR safety)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  // Render menu via Portal
  {mounted && mobileMenuOpen && createPortal(
    <motion.div className="fixed inset-0 z-[9999]">
      {/* menu content */}
    </motion.div>,
    document.body
  )}
  ```
- Never hardcode pixel values for responsive positioning without testing
- Test hamburger menu on actual mobile devices before deploy
- Touch targets must be minimum 44x44px (`min-h-[44px] min-w-[44px]`)
- Hamburger icon must animate smoothly to X icon when menu opens

## MDX Content

- Always configure `remark-gfm` for table support
- Add styled components for: table, thead, tbody, tr, th, td
- Test MDX rendering (tables, code blocks) before deploy

## Blog Content - Legal

- Never attribute specific bugs to former employers
- Use generic phrasing: "In my years testing DeFi products..."
- Credentials (company names) OK in About/bio sections only

## Form Validation

- Always add client-side validation before API calls
- Show field-specific errors, not generic messages
- Clear errors when user starts typing
- **Validate on blur** for immediate feedback when user leaves field
- Required fields: name, email, message (company is optional)
- **API Performance:** Send multiple emails in parallel using `Promise.all()` for faster response times

### Email Validation Rules
- Strict regex: `/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
- Detects common domain typos (gmial.com → gmail.com, yahooo.com → yahoo.com, etc.)
- Validates on blur (when user leaves field) AND on submit
- Shows helpful suggestions for typos: "Did you mean user@gmail.com?"

### Error Message Display
- Parse API responses for specific error messages (e.g., "Invalid email address")
- Show network errors separately from validation errors
- Use animated error messages with Framer Motion for smooth appearance
- Field-specific errors appear below each input with red border highlight
- General errors appear at top of form with icon and background
- Error styling: `text-theme-red`, `border-theme-red`, `bg-theme-red` classes

### Loading States
- Show "Sending..." with rotating spinner during form submission
- Disable submit button while processing (`disabled:opacity-50`)
- Use Framer Motion for spinner rotation animation
- Clear loading state in `finally` block to ensure it always resets

### Example Pattern
```tsx
// Field error display
{fieldErrors.email && (
  <motion.span
    className="text-theme-red text-sm mt-2 block font-medium"
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {fieldErrors.email}
  </motion.span>
)}

// Loading button
<button disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} />
      <span>Sending...</span>
    </>
  ) : 'Send Message'}
</button>
```

## Content Strategy Guidelines

### Hero Section Stats
- Keep stats to essential, non-redundant metrics
- Current stats (3 items): Years Experience, Products Tested, Learning Curve
- Removed "Top-Tier Companies" stat (redundant with company names below)
- Stats grid: `grid-cols-2 md:grid-cols-3` for balanced layout

### Company Experience Section
- Show actual company names rather than just counts (better for SEO and credibility)
- Use brand colors on hover for visual interest (e.g., Uniswap pink #FF007A)
- Located at bottom of Hero section with "Experience from" label
- Companies: Uniswap, OpenSea, Bloomberg, Tradeweb

### Site Architecture Decision
- **Single-page layout** for optimal conversion and mobile UX
- Better for: landing page conversion, mobile scrolling, animation flow
- Blog exists at `/blog` for SEO content
- Future consideration: Add `/services` sub-pages when ready to create detailed content
- Rationale: Matches crypto-native brand, simpler navigation, better mobile experience

## QA Checklist Before Deploy

- [ ] Test on mobile device (not just browser resize)
- [ ] Test navigation from non-homepage pages
- [ ] Test MDX content rendering (tables, code blocks)
- [ ] Verify form validation with empty/invalid inputs
- [ ] Check all CTAs link to correct destinations
- [ ] Verify hamburger menu opens and covers full screen (no content bleed-through)
- [ ] Verify hamburger icon animates to X icon smoothly
- [ ] Menu links navigate to correct sections
- [ ] Menu closes after clicking a link
- [ ] Body scroll is locked when mobile menu is open
- [ ] No horizontal scrolling on any viewport
- [ ] Text is readable without zooming
- [ ] Stats section shows 3 items and looks balanced
- [ ] Company names have proper hover effects

## Project Structure

```
/app              # Next.js app router pages
/components       # React components
/lib              # Utility functions and shared code
/content/blog     # MDX blog posts
/public           # Static assets
```

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Portal (mobile menu isolation)
- MDX (blog content)
- Umami Analytics (privacy-focused analytics)
- Vercel (hosting)

## Analytics Setup

- **Tool:** Umami Analytics (free self-hosted or $9/mo cloud)
- **Integration:** Complete - comprehensive event tracking
- **Setup guide:** See `UMAMI_SETUP.md`
- **Tracking library:** `lib/analytics.ts`
- **Events tracked:**
  - **Page views** - Automatic on all pages with UTM parameters
  - **CTA clicks** - Hero, Navbar, Footer buttons
  - **Contact form submissions** - With source page and company field tracking
  - **Scroll depth** - Blog posts (25%, 50%, 75%, 100% milestones)
  - **Section views** - Homepage sections (Hero, Why Choose Us, Services, Contact, etc.)
  - **Outbound link clicks** - Social links, company logos, external resources
  - **Device types** - Mobile, tablet, desktop tracking
  - **Time on site** - Session duration and time to conversion
- **Dual setup:** Can run Umami + BigQuery simultaneously for basic + advanced analytics

### Analytics Hooks

- `useScrollDepth(pagePath)` - Track scroll depth milestones on blog posts
- `useSectionTracking(sectionName, threshold)` - Track when sections enter viewport
- `trackOutboundLink(linkText, destination, location)` - Track external link clicks

## Environment Variables

Required for production:
- `RESEND_API_KEY` - Email sending for contact form

Analytics (Choose one or both):
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` - Umami analytics website ID (recommended)
- `NEXT_PUBLIC_UMAMI_URL` - Umami script URL (default: https://cloud.umami.is/script.js)
- `BIGQUERY_PROJECT_ID` - BigQuery project ID (optional, for advanced analytics)
- `BIGQUERY_DATASET` - BigQuery dataset name (optional)
- `BIGQUERY_CREDENTIALS` - BigQuery service account JSON (optional)

Optional:
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Enable analytics in development (default: disabled)

## Commands

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```
