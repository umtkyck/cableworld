import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder, updateOrderStatus } from '@/lib/orders/server'
import type { OrderItem } from '@/lib/orders/types'
import { sendNotificationEmail, escapeHtml } from '@/lib/email'

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

function parseItems(raw: string | undefined): OrderItem[] {
  if (!raw) return [{ name: 'Harness Cart Order', quantity: 1, price: 0 }]
  try {
    const parsed = JSON.parse(raw) as OrderItem[]
    return Array.isArray(parsed) ? parsed : [{ name: 'Harness Cart Order', quantity: 1, price: 0 }]
  } catch {
    return [{ name: 'Harness Cart Order', quantity: 1, price: 0 }]
  }
}

async function persistPaidOrder(paymentIntent: Stripe.PaymentIntent) {
  const meta = paymentIntent.metadata
  const orderRef = meta.orderRef || paymentIntent.id
  const shippingCost = Number(meta.shippingCost || 0)
  const subtotal = paymentIntent.amount_received / 100 - shippingCost

  const order = await createOrder({
    orderRef,
    userId: meta.userId || undefined,
    customerEmail: meta.customerEmail || paymentIntent.receipt_email || 'unknown@harnesscart.com',
    customerName: meta.customerName,
    quoteId: meta.quoteId,
    status: 'processing',
    paymentMethod: 'card',
    subtotal: Math.max(subtotal, 0),
    shippingCost,
    total: paymentIntent.amount_received / 100,
    items: parseItems(meta.itemsJson),
    shipping: meta.shippingCarrier
      ? {
          carrierName: meta.shippingCarrier,
          service: meta.shippingService,
          amount: shippingCost,
        }
      : undefined,
    stripePaymentIntentId: paymentIntent.id,
  })

  if (order) {
    await sendNotificationEmail({
      subject: `[Harness Cart] Paid order ${order.orderRef}`,
      html: `<p>New card payment received.</p><p><strong>Order:</strong> ${escapeHtml(order.orderRef)}</p><p><strong>Total:</strong> $${order.total.toFixed(2)}</p><p><strong>Email:</strong> ${escapeHtml(order.customerEmail)}</p>`,
      replyTo: order.customerEmail,
    })
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 503 })
  }

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid signature'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      await persistPaidOrder(paymentIntent)
      break
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const orderRef = paymentIntent.metadata.orderRef
      if (orderRef) {
        await updateOrderStatus(orderRef, 'cancelled')
      }
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
