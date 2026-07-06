import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getAdminDb, isAdminConfigured } from '@/lib/firebase-admin'
import { sendNotificationEmail, escapeHtml } from '@/lib/email'

export const runtime = 'nodejs'

interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (isAdminConfigured()) {
      await getAdminDb().collection('contacts').add({
        ...data,
        createdAt: FieldValue.serverTimestamp(),
      })
    }

    await sendNotificationEmail({
      subject: `[Contact] ${data.subject}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company || 'N/A')}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone || 'N/A')}</p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, '<br/>')}</p>
      `,
      replyTo: data.email,
    })

    return NextResponse.json({ success: true, message: 'Message sent successfully' })
  } catch {
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
