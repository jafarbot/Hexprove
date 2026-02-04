import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const smtpUser = process.env.PROTON_SMTP_USER;
    const smtpPass = process.env.PROTON_SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error('Proton SMTP credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const { name, email, company, message } = await request.json();

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

    // Send both emails in parallel for faster response
    await Promise.all([
      // Notification email to team
      transporter.sendMail({
        from: `Hexprove <${smtpUser}>`,
        to: smtpUser,
        replyTo: trimmedEmail,
        subject: `New inquiry from ${trimmedName}${company ? ` (${company.trim()})` : ''}`,
        text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nCompany: ${company?.trim() || 'Not provided'}\n\nMessage:\n${trimmedMessage}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0A0A0A; color: #fff;">
            <h2 style="color: #00F5A0; margin-bottom: 24px;">New Contact Form Submission</h2>
            <p><strong style="color: #9CA3AF;">Name:</strong> ${trimmedName}</p>
            <p><strong style="color: #9CA3AF;">Email:</strong> <a href="mailto:${trimmedEmail}" style="color: #00F5A0;">${trimmedEmail}</a></p>
            ${company ? `<p><strong style="color: #9CA3AF;">Company:</strong> ${company.trim()}</p>` : ''}
            <hr style="border-color: #2A2A2A; margin: 24px 0;" />
            <p style="color: #9CA3AF;"><strong>Message:</strong></p>
            <div style="background-color: #1A1A1A; padding: 16px 20px; border-radius: 8px; border: 1px solid #2A2A2A;">
              <p style="color: #D1D5DB; margin: 0; white-space: pre-wrap;">${trimmedMessage}</p>
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
            <h2 style="color: #fff; margin-bottom: 24px;">Hi ${trimmedName},</h2>
            <p style="color: #9CA3AF; line-height: 1.6;">
              Thanks for reaching out. We've received your message and will get back to you within 24 hours.
            </p>
            <hr style="border-color: #2A2A2A; margin: 24px 0;" />
            <p style="color: #9CA3AF; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
              Here's what you sent us:
            </p>
            <div style="background-color: #1A1A1A; padding: 16px 20px; border-radius: 8px; border: 1px solid #2A2A2A; margin-bottom: 24px;">
              <p style="color: #D1D5DB; margin: 0; font-style: italic;">${trimmedMessage}</p>
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
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
