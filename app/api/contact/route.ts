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

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
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

    // Send notification email to team
    await transporter.sendMail({
      from: `Hexprove <${smtpUser}>`,
      to: smtpUser,
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0A0A0A; color: #fff;">
          <h2 style="color: #00F5A0; margin-bottom: 24px;">New Contact Form Submission</h2>
          <p><strong style="color: #9CA3AF;">Name:</strong> ${name}</p>
          <p><strong style="color: #9CA3AF;">Email:</strong> <a href="mailto:${email}" style="color: #00F5A0;">${email}</a></p>
          ${company ? `<p><strong style="color: #9CA3AF;">Company:</strong> ${company}</p>` : ''}
          <hr style="border-color: #2A2A2A; margin: 24px 0;" />
          <p style="color: #9CA3AF;"><strong>Message:</strong></p>
          <div style="background-color: #1A1A1A; padding: 16px 20px; border-radius: 8px; border: 1px solid #2A2A2A;">
            <p style="color: #D1D5DB; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `Hexprove <${smtpUser}>`,
      to: email,
      subject: `We got your message, ${name} ✓`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0A0A0A; color: #fff;">
          <h2 style="color: #fff; margin-bottom: 24px;">Hi ${name},</h2>
          <p style="color: #9CA3AF; line-height: 1.6;">
            Thanks for reaching out. We've received your message and will get back to you within 24 hours.
          </p>
          <hr style="border-color: #2A2A2A; margin: 24px 0;" />
          <p style="color: #9CA3AF; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
            Here's what you sent us:
          </p>
          <div style="background-color: #1A1A1A; padding: 16px 20px; border-radius: 8px; border: 1px solid #2A2A2A; margin-bottom: 24px;">
            <p style="color: #D1D5DB; margin: 0; font-style: italic;">${message}</p>
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
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
