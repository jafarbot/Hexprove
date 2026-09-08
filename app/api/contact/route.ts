import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// --- Rate limiting: max 3 requests per 10 minutes per IP ---
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3;
const contactRateMap = new Map<string, number[]>();

function getRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = contactRateMap.get(ip) || [];
  // Filter to only timestamps within the window
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    return true; // rate limited
  }
  recent.push(now);
  contactRateMap.set(ip, recent);
  return false;
}

// --- HTML escaping for email templates ---
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    if (getRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const smtpUser = process.env.PROTON_SMTP_USER;
    const smtpPass = process.env.PROTON_SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error('[Contact API] Proton SMTP credentials not configured. Set PROTON_SMTP_USER and PROTON_SMTP_PASS in Vercel.');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    let body: { name?: string; email?: string; company?: string; message?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { name, email, company, message } = body;

    // Trim whitespace from all fields
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedMessage = message?.trim();

    // Validate required fields
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate message length
    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: 'Message is too long. Please limit to 5000 characters.' },
        { status: 400 }
      );
    }

    // Strict email validation (matches client-side validation)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Additional validation: check for obviously fake domains
    const domain = trimmedEmail.toLowerCase().split('@')[1];
    const suspiciousDomains = [
      'test.com',
      'example.com',
      'fake.com',
      'asdasiodjas.co',
      'tempmail.com',
      'guerrillamail.com',
      '10minutemail.com',
    ];
    
    if (suspiciousDomains.includes(domain)) {
      return NextResponse.json(
        { error: 'Please use a valid email address' },
        { status: 400 }
      );
    }

    // Create Proton SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.protonmail.ch',
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Escape user input for HTML email templates (text versions are safe)
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeCompany = escapeHtml(String(company ?? '').trim());
    const safeMessage = escapeHtml(trimmedMessage);

    // Send both emails in parallel for faster response
    await Promise.all([
      // Notification email to team
      transporter.sendMail({
        from: `Hexprove <${smtpUser}>`,
        to: smtpUser,
        replyTo: trimmedEmail,
        subject: `New inquiry from ${trimmedName}${company != null && String(company).trim() ? ` (${String(company).trim()})` : ''}`,
        text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nCompany: ${company != null ? String(company).trim() || 'Not provided' : 'Not provided'}\n\nMessage:\n${trimmedMessage}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0A0A0A; color: #fff;">
            <h2 style="color: #00F5A0; margin-bottom: 24px;">New Contact Form Submission</h2>
            <p><strong style="color: #9CA3AF;">Name:</strong> ${safeName}</p>
            <p><strong style="color: #9CA3AF;">Email:</strong> <a href="mailto:${safeEmail}" style="color: #00F5A0;">${safeEmail}</a></p>
            ${company != null && String(company).trim() ? `<p><strong style="color: #9CA3AF;">Company:</strong> ${safeCompany}</p>` : ''}
            <hr style="border-color: #2A2A2A; margin: 24px 0;" />
            <p style="color: #9CA3AF;"><strong>Message:</strong></p>
            <div style="background-color: #1A1A1A; padding: 16px 20px; border-radius: 8px; border: 1px solid #2A2A2A;">
              <p style="color: #D1D5DB; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          </div>
        `,
      }),
      // Confirmation email to customer
      transporter.sendMail({
        from: `Hexprove <${smtpUser}>`,
        to: trimmedEmail,
        subject: `We got your message, ${trimmedName} ✓`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0A0A0A; color: #fff;">
            <h2 style="color: #fff; margin-bottom: 24px;">Hi ${safeName},</h2>
            <p style="color: #9CA3AF; line-height: 1.6;">
              Thanks for reaching out. We've received your message and will get back to you within 24 hours.
            </p>
            <hr style="border-color: #2A2A2A; margin: 24px 0;" />
            <p style="color: #9CA3AF; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
              Here's what you sent us:
            </p>
            <div style="background-color: #1A1A1A; padding: 16px 20px; border-radius: 8px; border: 1px solid #2A2A2A; margin-bottom: 24px;">
              <p style="color: #D1D5DB; margin: 0; font-style: italic;">${safeMessage}</p>
            </div>
            <hr style="border-color: #2A2A2A; margin: 24px 0;" />
            <p style="color: #9CA3AF; line-height: 1.6;">While you wait, you might find this helpful:</p>
            <p style="margin-bottom: 24px;">
              <a href="https://hexprove.com/blog/truebit-26m-logic-bug" style="color: #00F5A0; text-decoration: none;">
                How a $26M Bug Slipped Through →
              </a>
            </p>
            <p style="color: #9CA3AF;">Talk soon,</p>
            <p style="color: #fff; font-weight: 500;">The Hexprove Team</p>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Contact form error:', message, error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us at team@hexprove.com.' },
      { status: 500 }
    );
  }
}
