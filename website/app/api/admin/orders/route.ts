import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/auth-server'
import { getAllOrders } from '@/lib/orders/server'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const admin = await requireAdminUser(request)
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const orders = await getAllOrders(100)
  return NextResponse.json({ orders })
}
