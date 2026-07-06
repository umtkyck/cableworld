import { NextRequest, NextResponse } from 'next/server'
import { requireAuthUser, verifyBearerToken } from '@/lib/auth-server'
import { createOrder } from '@/lib/orders/server'
import type { CreateOrderInput, OrderItem, OrderShipping } from '@/lib/orders/types'
import { sendNotificationEmail, escapeHtml } from '@/lib/email'

export const runtime = 'nodejs'

interface BankTransferBody {
  orderRef: string
  quoteId?: string
  customerEmail: string
  customerName?: string
  subtotal: number
  shippingCost: number
  total: number
  items?: OrderItem[]
  shipping?: OrderShipping
}

export async function POST(request: NextRequest) {
  let body: BankTransferBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body.orderRef || !body.customerEmail || !body.total || body.total <= 0) {
    return NextResponse.json({ error: 'Missing required order fields' }, { status: 400 })
  }

  const authUser = await verifyBearerToken(request)

  const input: CreateOrderInput = {
    orderRef: body.orderRef,
    userId: authUser?.uid,
    customerEmail: body.customerEmail,
    customerName: body.customerName,
    quoteId: body.quoteId,
    status: 'awaiting_payment',
    paymentMethod: 'bank',
    subtotal: body.subtotal,
    shippingCost: body.shippingCost ?? 0,
    total: body.total,
    items: body.items?.length ? body.items : [{ name: 'Harness Cart Order', quantity: 1, price: body.subtotal }],
    shipping: body.shipping,
  }

  const order = await createOrder(input)

  await sendNotificationEmail({
    subject: `[Harness Cart] Bank transfer order ${body.orderRef}`,
    html: `<p>New bank transfer order awaiting payment.</p><p><strong>Reference:</strong> ${escapeHtml(body.orderRef)}</p><p><strong>Total:</strong> $${body.total.toFixed(2)}</p><p><strong>Email:</strong> ${escapeHtml(body.customerEmail)}</p>`,
    replyTo: body.customerEmail,
  })

  return NextResponse.json({ success: true, order })
}
