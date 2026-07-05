import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Online payment is not available right now. Please contact us to complete your order.' },
        { status: 503 }
      );
    }

    const { amount, quoteId, customerEmail, customerName, shipping } = await req.json();

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        quoteId: quoteId || 'unknown',
        customerEmail: customerEmail || 'unknown',
        customerName: customerName || 'unknown',
        shippingCarrier: shipping?.carrierName || 'unknown',
        shippingService: shipping?.service || 'unknown',
        shippingCost: shipping?.amount != null ? String(shipping.amount) : 'unknown',
      },
      // Attach the shipping address so it shows on the Stripe dashboard and
      // receipts, and is available for label creation during fulfillment.
      ...(shipping?.address
        ? {
            shipping: {
              name: shipping.address.name || customerName || 'Customer',
              address: {
                line1: shipping.address.street1,
                line2: shipping.address.street2 || undefined,
                city: shipping.address.city,
                state: shipping.address.state,
                postal_code: shipping.address.postalCode,
                country: shipping.address.country,
              },
            },
          }
        : {}),
      description: `Harness Cart Quote #${quoteId}`,
      receipt_email: customerEmail,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
