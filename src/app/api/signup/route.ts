import { NextRequest, NextResponse } from 'next/server'
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { Resend } from 'resend'
import { z } from 'zod'

// Initialize Firebase Admin (singleton pattern)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_PROJECT_ID!,
      privateKey:  process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    })
  })
}

const db = getFirestore()
const resend = new Resend(process.env.RESEND_API_KEY!)
const emailSchema = z.email()

export async function POST(req: NextRequest) {
  try {
    // 1. Parse and validate
    const body = await req.json()
    const parsed = emailSchema.safeParse(body.email)

    if (!parsed.success) {
      return NextResponse.json({ success: false, code: 'INVALID_EMAIL' }, { status: 400 })
    }

    const email = parsed.data.toLowerCase().trim()

    // 2. Check for duplicate
    const existing = await db.collection('waitlist')
      .where('email', '==', email).limit(1).get()

    if (!existing.empty) {
      return NextResponse.json({ success: false, code: 'ALREADY_REGISTERED' })
    }

    // 3. Get current count + atomically increment
    const metaRef = db.collection('waitlist').doc('--meta--')
    const metaSnap = await metaRef.get()
    const currentCount = metaSnap.exists ? (metaSnap.data()?.count ?? 0) : 0
    const position = currentCount + 1

    // 4. Write signup document
    await db.collection('waitlist').add({
      email,
      position,
      createdAt:  Timestamp.now(),
      confirmed:  false,
      source:     body.source ?? 'hero_form',
      userAgent:  req.headers.get('user-agent') ?? '',
      country:    req.headers.get('x-vercel-ip-country') ?? '',
    })

    // 5. Increment counter atomically
    await metaRef.set({ count: FieldValue.increment(1) }, { merge: true })

    // 6. Send confirmation email (non-fatal — signup still succeeds if email fails)
    try {
      await resend.emails.send({
        from:    'Kreiq <onboarding@resend.dev>',
        to:      email,
        subject: `You're #${position} on the Kreiq waitlist`,
        html:    buildEmailHTML(position, email),
      })
    } catch (emailErr) {
      console.error('Confirmation email failed (non-fatal):', emailErr)
    }

    return NextResponse.json({ success: true, position })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json({ success: false, code: 'SERVER_ERROR' }, { status: 500 })
  }
}

function buildEmailHTML(position: number, email: string): string {
  const ig = 'https://www.instagram.com/kreiqai?utm_source=qr&igsh=MW9jbW00eHF4ZnB6Nw=='
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4F6FB;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FB;padding:40px 0;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 24px rgba(0,64,255,0.07);">

        <!-- Header bar -->
        <tr>
          <td style="background:#0040FF;padding:6px 0;"></td>
        </tr>

        <!-- Logo -->
        <tr>
          <td align="center" style="padding:36px 32px 0;">
            <img src="https://kreiq.ai/kreiqlogo.png" alt="Kreiq" width="120" height="auto"
                 style="display:block;border:0;outline:none;max-width:120px;height:auto;" />
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td align="center" style="padding:20px 32px 0;">
            <div style="width:40px;height:2px;background:#0040FF;border-radius:2px;"></div>
          </td>
        </tr>

        <!-- You're in -->
        <tr>
          <td align="center" style="padding:28px 32px 0;">
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:#0F0F11;letter-spacing:-0.3px;">You're in.</p>
          </td>
        </tr>

        <!-- Position number -->
        <tr>
          <td align="center" style="padding:12px 32px 0;">
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:56px;font-weight:700;color:#0040FF;line-height:1;letter-spacing:-1px;">#${position}</p>
          </td>
        </tr>

        <!-- Body copy -->
        <tr>
          <td align="center" style="padding:24px 40px 0;">
            <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Inter',Arial,sans-serif;font-size:15px;color:#4B4D58;text-align:center;line-height:1.7;">
              You're number <strong style="color:#0F0F11;">${position}</strong> on the Kreiq waitlist.<br>
              We'll email you the moment beta opens.
            </p>
          </td>
        </tr>

        <!-- Follow line -->
        <tr>
          <td align="center" style="padding:16px 40px 0;">
            <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Inter',Arial,sans-serif;font-size:15px;color:#4B4D58;text-align:center;line-height:1.7;">
              In the meantime, follow <strong style="color:#0F0F11;">@kreiq</strong> for build updates.
            </p>
          </td>
        </tr>

        <!-- CTA Button -->
        <tr>
          <td align="center" style="padding:32px 32px 0;">
            <a href="${ig}"
               style="display:inline-block;background:#0040FF;color:#ffffff;padding:14px 36px;border-radius:10px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Inter',Arial,sans-serif;font-weight:600;font-size:14px;letter-spacing:0.01em;">
              Follow @kreiq
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:36px 32px 32px;">
            <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Inter',Arial,sans-serif;font-size:11px;color:#AAADB8;text-align:center;line-height:1.6;">
              You signed up with ${email}.&nbsp;
              <a href="https://kreiq.ai/unsubscribe?email=${encodeURIComponent(email)}" style="color:#AAADB8;text-decoration:underline;">Unsubscribe</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
