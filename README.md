# Hexprove

Crypto-native QA consultancy website built with Next.js 14, Tailwind CSS, and Framer Motion.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with fonts and metadata
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Hero.tsx        # Hero section
│   ├── WhyChooseUs.tsx # Comparison section
│   ├── Services.tsx    # Services offered
│   ├── Experience.tsx  # Company experience
│   ├── Team.tsx        # Team section
│   └── Contact.tsx     # Contact form
└── public/
    └── logos/          # Company logos (add your own)
```

## Customization

### Adding Real Names
Edit `components/Team.tsx` to add real team member names.

### Contact Form
The contact form currently logs to console. To make it functional:
1. Set up an API route in `app/api/contact/route.ts`
2. Connect to your email service (Resend, SendGrid, etc.)

### Calendly Integration
Replace the "Schedule a Call" link in `Contact.tsx` with your Calendly link.

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

MIT
