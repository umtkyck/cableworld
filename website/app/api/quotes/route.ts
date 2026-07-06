import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getAdminDb, getAdminStorage, isAdminConfigured } from '@/lib/firebase-admin'
import { verifyBearerToken } from '@/lib/auth-server'
import { sendNotificationEmail, escapeHtml } from '@/lib/email'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const notes = String(formData.get('notes') || '')
  const authUser = await verifyBearerToken(request)

  const files = formData.getAll('files').filter((entry): entry is File => entry instanceof File)
  if (files.length === 0) {
    return NextResponse.json({ error: 'At least one file is required' }, { status: 400 })
  }

  const quoteId = `Q-${Date.now().toString(36).toUpperCase()}`
  const uploadedFiles: { name: string; size: number; url?: string }[] = []

  if (isAdminConfigured()) {
    const db = getAdminDb()
    const bucket = getAdminStorage().bucket()

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const path = `quotes/${authUser?.uid || 'guest'}/${quoteId}/${file.name}`
      const fileRef = bucket.file(path)
      await fileRef.save(buffer, {
        metadata: { contentType: file.type || 'application/octet-stream' },
      })
      const [url] = await fileRef.getSignedUrl({ action: 'read', expires: Date.now() + 7 * 24 * 60 * 60 * 1000 })
      uploadedFiles.push({ name: file.name, size: file.size, url })
    }

    await db.collection('quotes').doc(quoteId).set({
      quoteId,
      userId: authUser?.uid || null,
      customerEmail: authUser?.email || null,
      notes,
      files: uploadedFiles,
      status: 'submitted',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
  } else {
    for (const file of files) {
      uploadedFiles.push({ name: file.name, size: file.size })
    }
  }

  await sendNotificationEmail({
    subject: `[Harness Cart] New quote request ${quoteId}`,
    html: `<p>New quote upload.</p><p><strong>Quote ID:</strong> ${escapeHtml(quoteId)}</p><p><strong>Files:</strong> ${uploadedFiles.map((f) => escapeHtml(f.name)).join(', ')}</p>`,
    replyTo: authUser?.email,
  })

  return NextResponse.json({ success: true, quoteId, files: uploadedFiles })
}
