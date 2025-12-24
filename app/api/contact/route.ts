import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Simple in-memory rate limiter (for serverless; use Upstash Redis for production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(identifier: string, maxRequests = 3, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // honeypot
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message, website } = body;

    // Honeypot check - if filled, silently succeed (bot likely)
    if (website && website.trim() !== "") {
      console.log("Honeypot triggered, ignoring submission");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Rate limiting
    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Validation
    const errors: Record<string, string> = {};

    if (!name || name.trim().length < 2 || name.trim().length > 80) {
      errors.name = "Name must be between 2 and 80 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!message || message.trim().length < 10 || message.trim().length > 2000) {
      errors.message = "Message must be between 10 and 2000 characters";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", fields: errors },
        { status: 400 }
      );
    }

    // Check required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_TO_EMAIL) {
      console.error("CONTACT_TO_EMAIL is not configured");
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

    // Send email via Resend
    const emailSubject = subject && subject.trim() 
      ? `Portfolio contact: ${subject}` 
      : `Portfolio contact: ${name}`;

    const timestamp = new Date().toISOString();
    const origin = request.headers.get("origin") || request.headers.get("host") || "unknown";

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject || "No subject"}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        <strong>Submitted:</strong> ${timestamp}<br>
        <strong>Origin:</strong> ${origin}<br>
        <strong>IP:</strong> ${clientIp}
      </p>
    `;

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject || "No subject"}

Message:
${message}

---
Submitted: ${timestamp}
Origin: ${origin}
IP: ${clientIp}
    `;

    await resend!.emails.send({
      from: fromEmail,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    });

    console.log("Contact form submission sent successfully", {
      name,
      email,
      timestamp,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
