import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder, getOrderByPaymentIntent } from '@/lib/orders/server'

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function GET(req: NextRequest) {
  const paymentIntentId = req.nextUrl.searchParams.get('payment_intent')
  if (!paymentIntentId) {
    return NextResponse.json({ error: 'Missing payment_intent' }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const succeeded = paymentIntent.status === 'succeeded'

    let order = await getOrderByPaymentIntent(paymentIntentId)

    // Webhook may not have fired yet in dev — create order on verified success.
    if (succeeded && !order) {
      const meta = paymentIntent.metadata
      const shippingCost = Number(meta.shippingCost || 0)
      const subtotal = paymentIntent.amount_received / 100 - shippingCost
      order = await createOrder({
        orderRef: meta.orderRef || paymentIntentId,
        userId: meta.userId || undefined,
        customerEmail: meta.customerEmail || paymentIntent.receipt_email || '',
        customerName: meta.customerName,
        quoteId: meta.quoteId,
        status: 'processing',
        paymentMethod: 'card',
        subtotal: Math.max(subtotal, 0),
        shippingCost,
        total: paymentIntent.amount_received / 100,
        items: [{ name: meta.quoteId ? `Quote ${meta.quoteId}` : 'Order', quantity: 1, price: Math.max(subtotal, 0) }],
        stripePaymentIntentId: paymentIntentId,
      })
    }

    return NextResponse.json({
      verified: succeeded,
      status: paymentIntent.status,
      amount: paymentIntent.amount_received / 100,
      quoteId: paymentIntent.metadata.quoteId || '',
      orderRef: paymentIntent.metadata.orderRef || order?.orderRef || '',
      order,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Verification failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
