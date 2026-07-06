import { NextRequest, NextResponse } from 'next/server'
import { requireAuthUser } from '@/lib/auth-server'
import { getOrdersForUser } from '@/lib/orders/server'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const user = await requireAuthUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const orders = await getOrdersForUser(user.uid, user.email)
  return NextResponse.json({ orders })
}
