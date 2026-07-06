import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getAdminDb, isAdminConfigured } from '@/lib/firebase-admin'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  if (isAdminConfigured()) {
    await getAdminDb().collection('newsletter').doc(email.toLowerCase()).set({
      email: email.toLowerCase(),
      subscribedAt: FieldValue.serverTimestamp(),
    })
  }

  return NextResponse.json({ success: true })
}
