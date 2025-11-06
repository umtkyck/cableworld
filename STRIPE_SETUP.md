# Stripe Payment Setup - Quick Start Guide

Get Stripe payments working in CableWorld in under 10 minutes.

## 🚀 Quick Setup

### Step 1: Get Stripe Keys (2 minutes)

1. Go to [https://stripe.com](https://stripe.com) and sign up
2. Navigate to **Developers → API Keys**
3. Copy your **Publishable key** (starts with `pk_test_`)
4. Copy your **Secret key** (starts with `sk_test_`) - click "Reveal test key"

### Step 2: Configure Web App (3 minutes)

```bash
cd website

# Create environment file
cp .env.example .env.local

# Edit .env.local and add your keys:
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
# STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE

# Install dependencies
npm install

# Start dev server
npm run dev
```

**Test it**:
```
Open: http://localhost:3000/checkout?quote_id=TEST-001&amount=100
Card: 4242 4242 4242 4242
Exp: 12/34, CVC: 123, ZIP: 12345
```

### Step 3: Configure Mobile App (5 minutes)

```bash
cd mobile

# Create environment file
cp .env.example .env

# Edit .env and add your key:
# STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE

# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Run app
npm run ios  # or npm run android
```

**Test it**:
- Navigate to a quote
- Click "Accept & Pay"
- Use card: 4242 4242 4242 4242

## 📋 Test Cards

| Scenario | Card Number | Result |
|----------|-------------|--------|
| Success | 4242 4242 4242 4242 | ✅ Payment succeeds |
| 3D Secure | 4000 0025 0000 3155 | 🔐 Requires authentication |
| Declined | 4000 0000 0000 9995 | ❌ Card declined |

All test cards:
- **CVV**: Any 3 digits (e.g., 123)
- **Expiry**: Any future date (e.g., 12/34)
- **ZIP**: Any 5 digits (e.g., 12345)

## ✅ Verify Setup

### Web App Checklist

- [ ] Environment variables loaded (`.env.local` exists)
- [ ] Can access checkout page
- [ ] Card form appears
- [ ] Test payment succeeds
- [ ] Redirects to success page

### Mobile App Checklist

- [ ] Environment variables loaded (`.env` exists)
- [ ] App builds and runs
- [ ] Can navigate to payment screen
- [ ] Card input appears
- [ ] Test payment succeeds
- [ ] Shows success screen

## 🐛 Troubleshooting

### "Invalid API Key" Error

**Problem**: Stripe can't validate your key

**Solution**:
1. Check `.env.local` (web) or `.env` (mobile) exists
2. Verify key has no spaces or quotes
3. Restart dev server after adding keys
4. Use `pk_test_` for publishable, `sk_test_` for secret

### Stripe Elements Not Loading (Web)

**Problem**: Card form doesn't appear

**Solution**:
1. Check browser console for errors
2. Verify `@stripe/stripe-js` is installed
3. Clear browser cache
4. Try in incognito mode

### Payment Intent Creation Fails

**Problem**: Gets error when initializing payment

**Solution**:
1. Check backend is running
2. Verify `STRIPE_SECRET_KEY` is set (server-side)
3. Check network tab for API errors
4. Ensure amount is greater than $0.50

### Mobile Build Errors (iOS)

**Problem**: Pod install or build fails

**Solution**:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

### Mobile Build Errors (Android)

**Problem**: Gradle or build fails

**Solution**:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## 📚 Next Steps

1. **Read Full Documentation**: See `docs/STRIPE_INTEGRATION.md`
2. **Test All Scenarios**: Try different test cards
3. **Customize Styling**: Update checkout page design
4. **Add Webhooks**: Handle payment events
5. **Go Live**: Replace test keys with live keys

## 🔗 Resources

- **Stripe Dashboard**: https://dashboard.stripe.com
- **Test Cards**: https://stripe.com/docs/testing
- **API Docs**: https://stripe.com/docs/api
- **Support**: support@cableworld.com

## 📝 Example Payment Flow

### Web
```
Quote Page → Click "Checkout"
  → /checkout?quote_id=CW-123&amount=2847
  → Enter card details
  → Click "Pay $2,847"
  → /payment/success
```

### Mobile
```
Quote Details Screen → Tap "Accept & Pay"
  → PaymentScreen (enter card)
  → Tap "Pay $2,847"
  → PaymentSuccessScreen
```

## 💡 Tips

1. **Use Test Mode**: Don't switch to live mode until ready for production
2. **Check Logs**: View payment attempts in Stripe Dashboard → Payments
3. **Enable Webhooks**: Set up webhooks for production to handle events
4. **Monitor Performance**: Use Stripe Dashboard analytics
5. **Stay Updated**: Follow [Stripe's changelog](https://stripe.com/docs/upgrades)

---

**Ready to Go Live?**

When you're ready for production:
1. Get live API keys from Stripe Dashboard
2. Replace test keys with live keys in environment
3. Test with small real transactions
4. Set up webhooks for event handling
5. Enable Stripe Radar for fraud protection

**Questions?** See full docs in `docs/STRIPE_INTEGRATION.md`
