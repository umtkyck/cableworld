import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/auth-server'
import { getOrderStats } from '@/lib/orders/server'
import { getAdminDb, isAdminConfigured } from '@/lib/firebase-admin'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const admin = await requireAdminUser(request)
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const stats = await getOrderStats()

  let registeredUsers = 0
  let quotesThisWeek = 0

  if (isAdminConfigured()) {
    const db = getAdminDb()
    const usersSnap = await db.collection('users').count().get()
    registeredUsers = usersSnap.data().count

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const quotesSnap = await db
      .collection('quotes')
      .where('createdAt', '>=', weekAgo)
      .count()
      .get()
      .catch(() => null)
    quotesThisWeek = quotesSnap?.data().count ?? 0
  }

  return NextResponse.json({
    ...stats,
    registeredUsers,
    quotesThisWeek,
  })
}
