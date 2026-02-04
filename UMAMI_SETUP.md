# Umami Analytics Setup Guide

**Status:** Code integration complete ✅
**Next step:** Create Umami account and add website ID

---

## What's Already Done

✅ Installed `next-umami` package
✅ Added Umami script to layout
✅ Created Analytics component for page view tracking
✅ Updated analytics.ts to support both Umami and BigQuery
✅ Existing event tracking (CTAs, forms) will work automatically

---

## Setup Options

### Option A: Umami Cloud (EASIEST - Recommended)

**Cost:** $9/month
**Setup time:** 5 minutes
**Pros:** Zero maintenance, just works

### Option B: Self-Hosted on Vercel (FREE)

**Cost:** $0
**Setup time:** 20 minutes
**Pros:** Free forever, you own the data

I'll provide instructions for both below.

---

## Option A: Umami Cloud Setup (5 minutes)

### Step 1: Sign Up

1. Go to https://cloud.umami.is
2. Click "Get Started"
3. Choose plan: **Hobby ($9/mo)** - Unlimited websites, 100K events/month
4. Create account

### Step 2: Add Your Website

1. In Umami dashboard, click "Add Website"
2. **Name:** Hexprove
3. **Domain:** hexprove.com
4. Click "Save"

### Step 3: Get Website ID

1. Go to Settings → Websites
2. Find "Hexprove"
3. Click "Edit" or "Tracking Code"
4. Copy the **Website ID** (looks like: `f47ac10b-58cc-4372-a567-0e02b2c3d479`)

### Step 4: Add to .env.local

Open `.env.local` and add:

```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID=f47ac10b-58cc-4372-a567-0e02b2c3d479
NEXT_PUBLIC_UMAMI_URL=https://cloud.umami.is/script.js
```

Replace `f47ac10b-...` with YOUR actual website ID from Umami.

### Step 5: Deploy

```bash
# Commit changes
git add .
git commit -m "Add Umami analytics"
git push

# Or just push to Vercel (auto-deploys)
```

### Step 6: Add Environment Variables to Vercel

1. Go to vercel.com → Your project → Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_UMAMI_WEBSITE_ID` = your-website-id
   - `NEXT_PUBLIC_UMAMI_URL` = `https://cloud.umami.is/script.js`
3. Redeploy

### Step 7: Test

1. Visit hexprove.com
2. Go to Umami dashboard → Realtime
3. You should see yourself as a visitor!
4. Click around, check if events show up

**DONE!** 🎉

---

## Option B: Self-Hosted Setup (FREE but more complex)

### Step 1: Deploy Umami to Vercel

#### Quick Method (Recommended):

1. Go to https://vercel.com/new/clone?repository-url=https://github.com/umami-software/umami
2. Click "Deploy"
3. Vercel will ask for a PostgreSQL database

#### Set Up Database:

**Option B1 - Vercel Postgres (Easiest):**
1. In Vercel dashboard → Storage → Create Database
2. Choose "Postgres"
3. Choose "Hobby" (Free tier)
4. Connect to your Umami deployment

**Option B2 - Supabase (Also Free):**
1. Go to supabase.com
2. Create project
3. Go to Settings → Database
4. Copy connection string
5. Add to Vercel environment variables as `DATABASE_URL`

### Step 2: Configure Umami

1. Visit your Umami instance (e.g., `umami-hexprove.vercel.app`)
2. Default login: `admin` / `umami`
3. **CHANGE PASSWORD immediately**
4. Add website: "Hexprove" with domain "hexprove.com"
5. Get Website ID from tracking code

### Step 3: Add to .env.local

```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
NEXT_PUBLIC_UMAMI_URL=https://umami-hexprove.vercel.app/script.js
```

### Step 4: Deploy

Same as Option A - push to Vercel and add env vars.

---

## What Gets Tracked Automatically

Once you add the Website ID, you'll immediately see:

### ✅ Automatic Tracking (No Code Changes)
- Page views on all pages
- Referrers (where visitors come from)
- Device types (mobile, tablet, desktop)
- Browser and OS
- Countries
- Real-time visitors

### ✅ Custom Events (Already Coded)
- CTA clicks (Hero, Navbar)
- Form submissions (Contact form)
- All your existing `trackEvent()` calls

### 📊 Dashboard Shows
- Pageviews over time
- Unique visitors
- Top pages
- Traffic sources
- Devices and browsers
- Custom events with properties

---

## Cost Comparison

| Option | Setup | Monthly | Total Year 1 |
|--------|-------|---------|--------------|
| **Cloud** | 5 min | $9 | $108 |
| **Self-hosted** | 20 min | $0 | $0 |

Both give you the exact same features. Self-hosted just requires initial setup.

---

## What to Do Right Now

### Immediate Action:

1. **Choose:** Cloud ($9/mo) or Self-hosted (free)?

2. **Sign up** at https://cloud.umami.is (if Cloud)
   OR
   **Deploy** via https://vercel.com/new/clone?repository-url=https://github.com/umami-software/umami (if Self-hosted)

3. **Add website** in Umami dashboard

4. **Copy Website ID** 

5. **Add to `.env.local`:**
   ```bash
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=paste-your-id-here
   NEXT_PUBLIC_UMAMI_URL=https://cloud.umami.is/script.js
   ```

6. **Restart dev server:**
   ```bash
   # Kill current server (Ctrl+C in terminal)
   npm run dev
   ```

7. **Test locally:**
   - Visit http://localhost:3003
   - Check Umami dashboard → Realtime
   - Click CTAs, verify events tracked

8. **Deploy to production:**
   - Add env vars to Vercel
   - Push code
   - Done!

---

## Already Integrated Features

Your site already tracks:

### CTA Clicks
- ✅ Hero "Book a Call" → `trackCtaClick('hero', 'Book a Call', '/#contact')`
- ✅ Hero "Learn More" → `trackCtaClick('hero', 'Learn More', '/#about')`
- ✅ Navbar "Contact" → `trackCtaClick('navbar', 'Contact', '/#contact')`

### Form Submissions
- ✅ Contact form → `trackFormSubmit('contact_form', { has_company: boolean })`

### Page Views
- ✅ All pages automatically via new Analytics component

All these will appear in Umami as soon as you add the Website ID!

---

## Troubleshooting

### "I don't see any data in Umami"
1. Check if Website ID is correct in `.env.local`
2. Restart dev server after adding env vars
3. Check browser console for errors
4. Verify script loaded (check Network tab)

### "Events not showing up"
1. Check Umami dashboard → Events (not just Pageviews)
2. Events may take 1-2 seconds to appear
3. Check browser console for `[Analytics]` logs

### "Can I test in development?"
Yes! Add to `.env.local`:
```bash
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

Then analytics will work on localhost.

---

## Next Steps After Setup

### Week 1: Monitor Basics
- Check daily visitors
- See which pages get traffic
- Monitor conversion rate (contact form submits / visitors)

### Week 2: Optimize
- See which CTAs get most clicks
- Check mobile vs desktop split
- Identify top traffic sources

### Week 3: UTM Tracking
- Add UTM parameters to Twitter/LinkedIn posts
- Track which campaigns drive traffic
- Example: `hexprove.com/?utm_source=twitter&utm_campaign=launch`

### Month 2: Advanced
- Set up goals in Umami
- Track scroll depth
- Add blog engagement tracking
- Build conversion funnels

---

## Support

- **Umami Docs:** https://umami.is/docs
- **Umami Cloud:** https://cloud.umami.is
- **GitHub:** https://github.com/umami-software/umami

---

## Quick Reference

**To track custom events in your code:**
```tsx
import { trackEvent } from '@/lib/analytics';

// Simple event
trackEvent('button_click');

// Event with data
trackEvent('cta_click', { 
  location: 'footer', 
  text: 'Get Started',
  destination: '/#contact' 
});
```

**Already tracking:**
- ✅ All page views
- ✅ All CTA clicks  
- ✅ Contact form submits
- ✅ UTM parameters
- ✅ Device types
- ✅ Time on site

---

## Cost Breakdown

### Cloud Option:
- $9/month = $108/year
- Zero maintenance
- Automatic updates
- Support included

### Self-Hosted Option:
- Vercel: Free tier (hobby projects)
- Database: Free tier (Vercel Postgres or Supabase)
- Total: **$0/year**
- You maintain it (~1 hour/month)

**My recommendation:** Start with Cloud ($9/mo) for simplicity. Move to self-hosted later if you want to save money.

---

**Status:** Code ready ✅
**Action needed:** Sign up for Umami and add Website ID to `.env.local`

Let me know when you have the Website ID and I'll help you test it!
