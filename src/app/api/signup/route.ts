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
  return `
  <div style='font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#ffffff'>
    <div style='text-align:center;margin-bottom:32px'>
      <span style='font-family:Georgia,serif;font-size:28px;font-weight:700;color:#09090B'>KRE</span>
      <span style='font-family:Georgia,serif;font-size:28px;font-weight:700;color:#7C3AED'>IQ</span>
    </div>
    <h1 style='font-size:22px;color:#09090B;text-align:center;margin-bottom:8px'>
      You're in.</h1>
    <p style='font-size:40px;font-weight:700;text-align:center;color:#7C3AED;margin:0 0 24px'>
      #${position}</p>
    <p style='font-size:15px;color:#71717A;text-align:center;line-height:1.6'>
      You're number <strong style='color:#09090B'>${position}</strong> on the
      Kreiq waitlist. We'll email you the moment beta opens.<br><br>
      In the meantime, follow <strong>@kreiq</strong> for build updates.
    </p>
    <div style='text-align:center;margin-top:32px'>
      <a href='https://instagram.com/kreiq'
         style='display:inline-block;background:linear-gradient(135deg,#7C3AED,#06B6D4);
                color:white;padding:12px 28px;border-radius:8px;text-decoration:none;
                font-weight:600;font-size:14px'>
        Follow @kreiq
      </a>
    </div>
    <p style='font-size:11px;color:#D4D4D8;text-align:center;margin-top:40px'>
      You signed up with ${email}.
      <a href='https://kreiq.ai/unsubscribe?email=${encodeURIComponent(email)}'
         style='color:#D4D4D8'>Unsubscribe</a>
    </p>
  </div>`
}
