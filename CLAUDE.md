# Hexprove Development Guidelines

## Navigation Links

- ALWAYS use `/#section` format for anchor links (not `#section`)
- This ensures links work from ANY page, not just homepage
- Example: `href="/#contact"` not `href="#contact"`

## Mobile Menu Implementation

- Mobile menu z-index must be HIGHER than navbar
- Navbar uses `z-40`, mobile menu uses `z-50`
- Never hardcode pixel values for responsive positioning without testing
- Test hamburger menu on actual mobile devices before deploy
- Touch targets must be minimum 44x44px (`min-h-[44px] min-w-[44px]`)

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
- Required fields: name, email, message (company is optional)

## QA Checklist Before Deploy

- [ ] Test on mobile device (not just browser resize)
- [ ] Test navigation from non-homepage pages
- [ ] Test MDX content rendering (tables, code blocks)
- [ ] Verify form validation with empty/invalid inputs
- [ ] Check all CTAs link to correct destinations
- [ ] Verify hamburger menu opens and covers full screen
- [ ] Menu links navigate to correct sections
- [ ] Menu closes after clicking a link
- [ ] No horizontal scrolling on any viewport
- [ ] Text is readable without zooming

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
- MDX (blog content)
- Vercel (hosting)

## Environment Variables

Required for production:
- `RESEND_API_KEY` - Email sending for contact form
- `BIGQUERY_PROJECT_ID` - Analytics project ID
- `BIGQUERY_DATASET` - Analytics dataset name
- `BIGQUERY_CREDENTIALS` - Service account JSON

## Commands

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```
