# Backend Patterns for HexProve

## Contact Form Implementation

### Option 1: Resend (Recommended)

```typescript
// app/api/contact/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json();
    
    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send notification email to HexProve
    await resend.emails.send({
      from: 'HexProve <noreply@hexprove.com>',
      to: 'team@hexprove.com',
      subject: `New inquiry from ${name}${company ? ` at ${company}` : ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: 'HexProve <noreply@hexprove.com>',
      to: email,
      subject: 'Thanks for reaching out to HexProve',
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for your interest in HexProve! We received your message and will get back to you within 24 hours.</p>
        <p>Best,<br>The HexProve Team</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
```

### Option 2: SendGrid

```typescript
// app/api/contact/route.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  const { name, email, company, message } = await request.json();
  
  await sgMail.send({
    to: 'team@hexprove.com',
    from: 'noreply@hexprove.com',
    subject: `New inquiry from ${name}`,
    html: `...`,
  });

  return Response.json({ success: true });
}
```

## CRM Integration Patterns

### Notion Database Integration

```typescript
// app/api/contact/route.ts
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_LEADS_DB_ID!;

export async function POST(request: Request) {
  const { name, email, company, message } = await request.json();
  
  // Add to Notion leads database
  await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      'Name': { title: [{ text: { content: name } }] },
      'Email': { email: email },
      'Company': { rich_text: [{ text: { content: company || '' } }] },
      'Message': { rich_text: [{ text: { content: message } }] },
      'Source': { select: { name: 'Website Contact Form' } },
      'Status': { select: { name: 'New Lead' } },
      'Date': { date: { start: new Date().toISOString() } },
    },
  });

  return Response.json({ success: true });
}
```

### Airtable Integration

```typescript
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);

export async function POST(request: Request) {
  const { name, email, company, message } = await request.json();
  
  await base('Leads').create([
    {
      fields: {
        'Name': name,
        'Email': email,
        'Company': company,
        'Message': message,
        'Source': 'Website',
        'Created': new Date().toISOString(),
      },
    },
  ]);

  return Response.json({ success: true });
}
```

## Analytics Integration

### Google Analytics 4

```typescript
// components/Analytics.tsx
'use client';

import Script from 'next/script';

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

// app/layout.tsx
import { GoogleAnalytics } from '@/components/Analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
```

### Plausible Analytics (Privacy-Friendly)

```typescript
// components/Analytics.tsx
import Script from 'next/script';

export function PlausibleAnalytics({ domain }: { domain: string }) {
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  );
}
```

### Vercel Analytics (Built-in)

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Booking/Calendar Integration

### Calendly Embed

```typescript
// components/BookCall.tsx
'use client';

import { useEffect } from 'react';

export function CalendlyEmbed({ url }: { url: string }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: '320px', height: '700px' }}
    />
  );
}
```

### Cal.com Integration

```typescript
// components/BookCall.tsx
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

export function CalEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', { theme: 'auto', hideEventTypeDetails: false });
    })();
  }, []);

  return (
    <Cal
      calLink={calLink}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
    />
  );
}
```

## Rate Limiting

```typescript
// lib/rateLimit.ts
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1]);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        if (isRateLimited) {
          reject(new Error('Rate limited'));
        } else {
          tokenCache.set(token, tokenCount);
          resolve();
        }
      }),
  };
}

// Usage in API route
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  
  try {
    await limiter.check(5, ip); // 5 requests per minute
  } catch {
    return Response.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
  
  // Process request...
}
```

## Environment Variables Checklist

```env
# Email Service (choose one)
RESEND_API_KEY=re_...
SENDGRID_API_KEY=SG....

# CRM (optional, choose one)
NOTION_API_KEY=secret_...
NOTION_LEADS_DB_ID=...
AIRTABLE_API_KEY=...
AIRTABLE_BASE_ID=...

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-...

# Calendar (optional)
CALENDLY_URL=https://calendly.com/hexprove/30min
CAL_LINK=hexprove/30min
```
