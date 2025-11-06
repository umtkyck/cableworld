# Stripe Payment Integration

Complete Stripe payment integration for CableWorld web and mobile applications.

## Table of Contents

- [Overview](#overview)
- [Web Application](#web-application)
- [Mobile Application](#mobile-application)
- [Setup Instructions](#setup-instructions)
- [Testing](#testing)
- [Production Deployment](#production-deployment)
- [Security Best Practices](#security-best-practices)

## Overview

CableWorld uses Stripe for secure payment processing across web and mobile platforms. This integration includes:

- ✅ Secure card payments with Stripe Elements
- ✅ Payment intents for 3D Secure compliance
- ✅ Real-time payment status updates
- ✅ Receipt generation and email confirmation
- ✅ Mobile-optimized payment flow
- ✅ PCI DSS compliant implementation

### Features

| Feature | Web | Mobile | Description |
|---------|-----|--------|-------------|
| Card Payments | ✅ | ✅ | Accept all major credit/debit cards |
| Apple Pay | ✅ | ✅ | Native Apple Pay support |
| Google Pay | ✅ | ✅ | Native Google Pay support |
| 3D Secure | ✅ | ✅ | SCA compliance for European payments |
| Payment Status | ✅ | ✅ | Real-time payment confirmation |
| Receipt Email | ✅ | ✅ | Automatic receipt delivery |
| Refunds | 🚧 | 🚧 | Coming soon |

## Web Application

### Architecture

```
┌─────────────────┐
│  Checkout Page  │
│  /checkout      │
└────────┬────────┘
         │
         ├─> Create Payment Intent (API)
         │   POST /api/create-payment-intent
         │
         ├─> Stripe Elements
         │   Card Input Component
         │
         └─> Confirm Payment
             ├─> Success → /payment/success
             └─> Error → Show Error Message
```

### Files Structure

```
website/
├── app/
│   ├── api/
│   │   └── create-payment-intent/
│   │       └── route.ts              # Payment Intent API
│   ├── checkout/
│   │   └── page.tsx                  # Checkout page
│   └── payment/
│       └── success/
│           └── page.tsx              # Success page
├── components/
│   └── checkout/
│       └── CheckoutForm.tsx          # Stripe Elements form
└── lib/
    └── stripe.ts                     # Stripe utilities
```

### Key Components

#### 1. Stripe Utility (`lib/stripe.ts`)

```typescript
import { loadStripe } from '@stripe/stripe-js';

export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
};
```

#### 2. Payment Intent API (`app/api/create-payment-intent/route.ts`)

Creates a payment intent on the server side:

```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(amount * 100),
  currency: 'usd',
  automatic_payment_methods: { enabled: true },
  metadata: { quoteId, customerEmail },
});
```

#### 3. Checkout Form (`components/checkout/CheckoutForm.tsx`)

Handles payment confirmation:

```typescript
const { error } = await stripe.confirmPayment({
  elements,
  confirmParams: {
    return_url: `${window.location.origin}/payment/success`,
  },
});
```

### Usage Flow

1. **User navigates to checkout**:
   ```
   /checkout?quote_id=CW-123&amount=2847&email=user@example.com
   ```

2. **Page creates payment intent**:
   - Calls `/api/create-payment-intent`
   - Receives `clientSecret`

3. **User enters card details**:
   - Stripe Elements handles input validation
   - PCI compliance automatically maintained

4. **User clicks "Pay"**:
   - `confirmPayment()` is called
   - 3D Secure challenge if required
   - Redirect to success page

## Mobile Application

### Architecture

```
┌──────────────────┐
│  Quote Details   │
│  Screen          │
└────────┬─────────┘
         │
         v
┌──────────────────┐
│  Payment Screen  │
│  PaymentScreen   │
└────────┬─────────┘
         │
         ├─> Create Payment Intent (API)
         │
         ├─> Stripe Card Input
         │   <CardField />
         │
         ├─> Confirm Payment
         │   confirmPayment()
         │
         └─> Navigate to Success
             PaymentSuccessScreen
```

### Files Structure

```
mobile/
├── src/
│   ├── screens/
│   │   └── payment/
│   │       ├── PaymentScreen.tsx         # Payment input screen
│   │       └── PaymentSuccessScreen.tsx  # Success confirmation
│   └── services/
│       └── payment.ts                    # Payment service
├── App.tsx                               # Stripe provider setup
└── package.json                          # Dependencies
```

### Key Components

#### 1. Payment Service (`src/services/payment.ts`)

```typescript
class PaymentService {
  async initialize() {
    await initStripe({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      merchantIdentifier: 'merchant.com.cableworld',
    });
  }

  async createPaymentIntent(params) {
    // Creates payment intent via API
  }

  async processPayment(params) {
    // Confirms payment with Stripe SDK
  }
}
```

#### 2. Payment Screen (`src/screens/payment/PaymentScreen.tsx`)

Features:
- Order summary display
- Stripe CardField component
- Real-time validation
- Loading states
- Error handling

```typescript
<CardField
  postalCodeEnabled={true}
  onCardChange={(details) => setCardComplete(details.complete)}
/>
```

#### 3. Success Screen (`src/screens/payment/PaymentSuccessScreen.tsx`)

Shows:
- Confirmation checkmark
- Order details
- Payment ID
- Next steps timeline
- Action buttons (Track Order, Return Home)

### Usage Flow

1. **User accepts quote**:
   - Navigates to PaymentScreen with quote details

2. **Screen initializes payment**:
   - Calls `paymentService.createPaymentIntent()`
   - Receives `clientSecret`

3. **User enters card**:
   - Uses Stripe CardField
   - Real-time validation

4. **User taps "Pay"**:
   - `confirmPayment()` called
   - Native 3D Secure if required
   - Navigate to success screen

## Setup Instructions

### Prerequisites

1. **Stripe Account**: Sign up at [stripe.com](https://stripe.com)
2. **API Keys**: Get from [Dashboard → API Keys](https://dashboard.stripe.com/apikeys)

### Web Setup

1. **Install dependencies**:
   ```bash
   cd website
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```

3. **Add Stripe keys to `.env.local`**:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Test checkout**:
   ```
   http://localhost:3000/checkout?quote_id=TEST-001&amount=100
   ```

### Mobile Setup

1. **Install dependencies**:
   ```bash
   cd mobile
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   ```

3. **Add Stripe key to `.env`**:
   ```env
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

4. **iOS specific setup**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

5. **Run on simulator**:
   ```bash
   # iOS
   npm run ios

   # Android
   npm run android
   ```

## Testing

### Test Card Numbers

Stripe provides test cards for different scenarios:

| Card Number | Scenario | CVV | Exp |
|-------------|----------|-----|-----|
| 4242 4242 4242 4242 | Success | Any | Future |
| 4000 0025 0000 3155 | 3D Secure Required | Any | Future |
| 4000 0000 0000 9995 | Decline | Any | Future |
| 4000 0000 0000 0002 | Decline (card declined) | Any | Future |

### Test Scenarios

#### Web Testing

1. **Successful Payment**:
   ```
   Card: 4242 4242 4242 4242
   Exp: 12/34
   CVC: 123
   ZIP: 12345
   ```

2. **3D Secure Flow**:
   ```
   Card: 4000 0025 0000 3155
   Complete: Click "Complete" in test modal
   Fail: Click "Fail" in test modal
   ```

3. **Declined Card**:
   ```
   Card: 4000 0000 0000 9995
   Expected: Error message displayed
   ```

#### Mobile Testing

Same test cards work on mobile. Additional tests:

1. **Apple Pay** (iOS only):
   - Requires physical device
   - Use test cards in Wallet

2. **Google Pay** (Android only):
   - Requires physical device or emulator with Play Services
   - Use test cards in Google Pay

### Webhook Testing

Test webhooks locally using Stripe CLI:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger payment_intent.succeeded
```

## Production Deployment

### Checklist

- [ ] Replace test keys with live keys
- [ ] Enable webhook endpoints
- [ ] Configure proper error handling
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Test with real cards (small amounts)
- [ ] Review Stripe compliance requirements
- [ ] Configure currency and payment methods
- [ ] Set up refund workflow
- [ ] Add fraud prevention (Radar)
- [ ] Document customer support process

### Environment Variables

**Web Production** (`.env.production`):
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_APP_URL=https://cableworld.com
```

**Mobile Production**:
```env
STRIPE_PUBLISHABLE_KEY=pk_live_...
API_BASE_URL=https://api.cableworld.com
```

### Webhooks Setup

1. **Create webhook endpoint**:
   ```
   https://api.cableworld.com/webhooks/stripe
   ```

2. **Select events to receive**:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`

3. **Add webhook secret to env**:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Security Best Practices

### Never Expose

❌ **DO NOT** commit these to git:
- Secret keys (`sk_live_...`, `sk_test_...`)
- Webhook secrets
- Customer payment data

✅ **DO** use:
- Environment variables
- `.env.local` for local development
- Secure secret management in production

### PCI Compliance

✅ **Stripe Elements/SDK handles**:
- Card number tokenization
- PCI DSS compliance
- Secure card data transmission
- No card data touches your servers

✅ **You must ensure**:
- HTTPS in production
- Secure API endpoints
- Proper error handling
- Activity logging

### Best Practices

1. **Always validate on server**:
   ```typescript
   // Server-side validation
   if (!amount || amount <= 0) {
     throw new Error('Invalid amount');
   }
   ```

2. **Use payment intents**:
   - Supports 3D Secure
   - Better fraud protection
   - Automatic retries

3. **Implement idempotency**:
   ```typescript
   const paymentIntent = await stripe.paymentIntents.create({
     amount,
     currency: 'usd',
   }, {
     idempotencyKey: `quote-${quoteId}`,
   });
   ```

4. **Handle all payment states**:
   - `requires_payment_method` → Show card input
   - `requires_action` → Handle 3D Secure
   - `processing` → Show loading
   - `succeeded` → Show success
   - `canceled` → Show cancellation
   - `failed` → Show error

5. **Monitor for fraud**:
   - Enable Stripe Radar
   - Set risk thresholds
   - Review disputed charges
   - Block suspicious patterns

## API Reference

### Create Payment Intent

**Endpoint**: `POST /api/create-payment-intent`

**Request**:
```json
{
  "amount": 2847,
  "quoteId": "CW-2024-00789",
  "customerEmail": "user@example.com",
  "customerName": "John Doe"
}
```

**Response**:
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### Payment Service Methods

**Mobile** (`paymentService.ts`):

```typescript
// Initialize Stripe
await paymentService.initialize();

// Create payment intent
const { clientSecret } = await paymentService.createPaymentIntent({
  amount: 2847,
  quoteId: 'CW-123',
});

// Process payment
const result = await paymentService.processPayment({
  clientSecret,
  billingDetails: { email, name },
});

// Format amount
const formatted = paymentService.formatAmount(2847); // "$2,847.00"
```

## Troubleshooting

### Common Issues

**1. "Invalid API key"**
- Check environment variables are loaded
- Verify key starts with `pk_test_` or `pk_live_`
- Ensure no spaces or quotes in key

**2. "Payment failed" (mobile)**
- Check internet connection
- Verify Stripe is initialized
- Check API endpoint is reachable

**3. "Card declined"**
- Use test cards in test mode
- Check card expiry is future date
- Verify CVV is provided

**4. Elements not loading (web)**
- Check `@stripe/stripe-js` is installed
- Verify publishable key is correct
- Check browser console for errors

**5. 3D Secure not triggering**
- Use card `4000 0025 0000 3155`
- Ensure payment intent amount > 0
- Check SCA settings in Stripe Dashboard

## Support

- **Stripe Docs**: https://stripe.com/docs
- **Stripe Support**: https://support.stripe.com
- **CableWorld Team**: support@cableworld.com

## Updates

| Date | Version | Changes |
|------|---------|---------|
| 2024-12 | 1.0.0 | Initial Stripe integration for web and mobile |

---

**Last Updated**: December 2024
**Maintained by**: CableWorld Development Team
