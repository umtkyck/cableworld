import { NextRequest, NextResponse } from 'next/server'

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

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // In production, you would:
    // 1. Send email via service like SendGrid, Resend, or AWS SES
    // 2. Store in database for tracking
    // 3. Send notification to support team

    // Example with a generic email service (implement based on your provider):
    // await sendEmail({
    //   to: 'umtkyck@gmail.com',
    //   from: 'noreply@harnesscart.com',
    //   replyTo: data.email,
    //   subject: `[Contact Form] ${data.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${data.name}</p>
    //     <p><strong>Email:</strong> ${data.email}</p>
    //     <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
    //     <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
    //     <p><strong>Subject:</strong> ${data.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${data.message}</p>
    //   `
    // })

    // For now, we'll simulate successful submission
    // In production, replace this with actual email sending logic

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
