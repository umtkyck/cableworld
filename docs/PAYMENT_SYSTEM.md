# Payment Integration System

## Overview
Fast, reliable, and secure payment processing supporting multiple payment methods, currencies, and business models (instant checkout, subscriptions, net terms).

---

## Payment Methods Supported

### 1. Credit/Debit Cards
- Visa, Mastercard, American Express, Discover
- 3D Secure (SCA compliance for EU)
- Instant processing

### 2. ACH/Bank Transfer
- Direct bank account payments (US)
- Lower fees than cards (0.8% vs 2.9%)
- 3-5 business day processing

### 3. Wire Transfer
- International payments
- Large transactions ($10K+)
- Manual reconciliation

### 4. PayPal
- Consumer and business accounts
- Global coverage
- Buyer protection

### 5. Net Terms (Business Customers)
- Net-30, Net-60, Net-90
- Credit approval required
- Invoice-based payment

### 6. Purchase Orders
- Enterprise procurement workflow
- PO number tracking
- Invoice reconciliation

### 7. Cryptocurrency
- USDC, USDT (stablecoins)
- International payments
- Lower cross-border fees

---

## Payment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Stripe       │  │ PayPal       │  │ Crypto       │      │
│  │ Elements     │  │ SDK          │  │ Wallet       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
┌────────────────────────▼────────────────────────────────────┐
│                   API Gateway                                │
│                (SSL/TLS, Rate Limiting)                      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│               Payment Service                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  - Payment Intent Creation                           │   │
│  │  - Payment Method Handling                           │   │
│  │  - Fraud Detection                                   │   │
│  │  - Transaction Logging                               │   │
│  │  - Webhook Processing                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────┬────────────┬────────────┬────────────┬───────────────┘
      │            │            │            │
      ▼            ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Stripe  │ │  PayPal  │ │  Plaid   │ │ Coinbase │
│  API     │ │  API     │ │  (ACH)   │ │ Commerce │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
      │            │            │            │
      ▼            ▼            ▼            ▼
┌──────────────────────────────────────────────────┐
│           Database (Transaction Records)          │
└──────────────────────────────────────────────────┘
```

---

## Stripe Integration (Primary)

### Setup
```python
import stripe
from decimal import Decimal

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

class StripePaymentProcessor:
    """
    Stripe payment processing
    """

    def __init__(self):
        self.stripe = stripe
        self.webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    async def create_payment_intent(
        self,
        amount: Decimal,
        currency: str,
        customer_id: str = None,
        metadata: dict = None
    ) -> dict:
        """
        Create Stripe PaymentIntent
        """
        try:
            intent = await self.stripe.PaymentIntent.create_async(
                amount=int(amount * 100),  # Convert to cents
                currency=currency.lower(),
                customer=customer_id,
                metadata=metadata or {},
                automatic_payment_methods={"enabled": True},
                capture_method="automatic",
                statement_descriptor="LOOMBOTIC",
                description=f"Cable harness order {metadata.get('order_id')}"
            )

            return {
                "payment_intent_id": intent.id,
                "client_secret": intent.client_secret,
                "status": intent.status,
                "amount": amount,
                "currency": currency
            }

        except stripe.error.StripeError as e:
            raise PaymentError(f"Stripe error: {str(e)}")

    async def confirm_payment(self, payment_intent_id: str) -> dict:
        """
        Confirm payment was successful
        """
        intent = await self.stripe.PaymentIntent.retrieve_async(payment_intent_id)

        return {
            "id": intent.id,
            "status": intent.status,
            "amount": Decimal(intent.amount) / 100,
            "currency": intent.currency,
            "payment_method": intent.payment_method,
            "receipt_url": intent.charges.data[0].receipt_url if intent.charges.data else None
        }

    async def create_customer(
        self,
        email: str,
        name: str,
        metadata: dict = None
    ) -> str:
        """
        Create Stripe customer for saved payment methods
        """
        customer = await self.stripe.Customer.create_async(
            email=email,
            name=name,
            metadata=metadata or {}
        )

        return customer.id

    async def attach_payment_method(
        self,
        payment_method_id: str,
        customer_id: str
    ):
        """
        Attach payment method to customer
        """
        await self.stripe.PaymentMethod.attach_async(
            payment_method_id,
            customer=customer_id
        )

        # Set as default
        await self.stripe.Customer.modify_async(
            customer_id,
            invoice_settings={"default_payment_method": payment_method_id}
        )

    async def create_refund(
        self,
        payment_intent_id: str,
        amount: Decimal = None,
        reason: str = "requested_by_customer"
    ):
        """
        Create refund for payment
        """
        refund = await self.stripe.Refund.create_async(
            payment_intent=payment_intent_id,
            amount=int(amount * 100) if amount else None,
            reason=reason
        )

        return {
            "refund_id": refund.id,
            "status": refund.status,
            "amount": Decimal(refund.amount) / 100
        }

    def verify_webhook(self, payload: bytes, signature: str) -> dict:
        """
        Verify and parse webhook event
        """
        try:
            event = stripe.Webhook.construct_event(
                payload,
                signature,
                self.webhook_secret
            )
            return event
        except stripe.error.SignatureVerificationError as e:
            raise WebhookError(f"Invalid signature: {e}")
```

### Frontend Integration
```javascript
// React component for Stripe checkout
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm({ amount, orderId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    // Create payment intent on backend
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId })
    });

    const { clientSecret } = await response.json();

    // Confirm payment
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/order/confirmation`,
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || processing}>
        {processing ? 'Processing...' : `Pay $${amount}`}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default function Checkout({ amount, orderId }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} orderId={orderId} />
    </Elements>
  );
}
```

---

## ACH/Bank Transfer (Plaid + Stripe)

```python
class ACHPaymentProcessor:
    """
    ACH payment processing via Plaid + Stripe
    """

    def __init__(self):
        self.plaid_client = plaid.Client(
            client_id=os.getenv("PLAID_CLIENT_ID"),
            secret=os.getenv("PLAID_SECRET"),
            environment=os.getenv("PLAID_ENV", "sandbox")
        )
        self.stripe = stripe

    async def create_link_token(self, user_id: str) -> str:
        """
        Create Plaid Link token for bank account connection
        """
        response = self.plaid_client.LinkToken.create({
            "user": {"client_user_id": user_id},
            "client_name": "Loombotic",
            "products": ["auth"],
            "country_codes": ["US"],
            "language": "en"
        })

        return response["link_token"]

    async def exchange_public_token(self, public_token: str) -> str:
        """
        Exchange public token for access token
        """
        response = self.plaid_client.Item.public_token.exchange(public_token)
        return response["access_token"]

    async def get_bank_account_token(self, access_token: str) -> str:
        """
        Get Stripe bank account token from Plaid
        """
        response = self.plaid_client.Processor.stripeBankAccountTokenCreate(
            access_token,
            "account_id"
        )

        return response["stripe_bank_account_token"]

    async def create_ach_payment(
        self,
        amount: Decimal,
        customer_id: str,
        bank_account_token: str,
        metadata: dict = None
    ):
        """
        Create ACH payment via Stripe
        """
        # Create bank account as payment method
        payment_method = await self.stripe.PaymentMethod.create_async(
            type="us_bank_account",
            us_bank_account={"account_holder_type": "company"},
            billing_details={"name": metadata.get("customer_name")}
        )

        # Create payment intent
        intent = await self.stripe.PaymentIntent.create_async(
            amount=int(amount * 100),
            currency="usd",
            customer=customer_id,
            payment_method=payment_method.id,
            payment_method_types=["us_bank_account"],
            metadata=metadata or {}
        )

        # Confirm (requires customer mandate acceptance)
        confirmed = await self.stripe.PaymentIntent.confirm_async(intent.id)

        return {
            "payment_intent_id": confirmed.id,
            "status": confirmed.status,
            "amount": amount,
            "processing_days": 3  # ACH typically 3-5 days
        }
```

---

## PayPal Integration

```python
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment, LiveEnvironment
from paypalcheckoutsdk.orders import OrdersCreateRequest, OrdersCaptureRequest

class PayPalProcessor:
    """
    PayPal payment processing
    """

    def __init__(self):
        environment = LiveEnvironment(
            client_id=os.getenv("PAYPAL_CLIENT_ID"),
            client_secret=os.getenv("PAYPAL_CLIENT_SECRET")
        )
        self.client = PayPalHttpClient(environment)

    async def create_order(
        self,
        amount: Decimal,
        currency: str,
        order_id: str
    ) -> dict:
        """
        Create PayPal order
        """
        request = OrdersCreateRequest()
        request.prefer('return=representation')
        request.request_body({
            "intent": "CAPTURE",
            "purchase_units": [{
                "reference_id": order_id,
                "amount": {
                    "currency_code": currency,
                    "value": str(amount)
                },
                "description": f"Loombotic Order {order_id}"
            }],
            "application_context": {
                "brand_name": "Loombotic",
                "landing_page": "BILLING",
                "user_action": "PAY_NOW",
                "return_url": f"https://loombotic.com/order/{order_id}/confirm",
                "cancel_url": f"https://loombotic.com/order/{order_id}/cancel"
            }
        })

        response = await self.client.execute(request)

        return {
            "order_id": response.result.id,
            "status": response.result.status,
            "approval_url": next(
                link.href for link in response.result.links
                if link.rel == "approve"
            )
        }

    async def capture_order(self, paypal_order_id: str) -> dict:
        """
        Capture payment for approved order
        """
        request = OrdersCaptureRequest(paypal_order_id)

        response = await self.client.execute(request)

        return {
            "order_id": response.result.id,
            "status": response.result.status,
            "payer_email": response.result.payer.email_address,
            "amount": response.result.purchase_units[0].payments.captures[0].amount.value
        }
```

---

## Cryptocurrency Payments (Coinbase Commerce)

```python
from coinbase_commerce.client import Client

class CryptoPaymentProcessor:
    """
    Cryptocurrency payment processing via Coinbase Commerce
    """

    def __init__(self):
        self.client = Client(api_key=os.getenv("COINBASE_COMMERCE_API_KEY"))

    async def create_charge(
        self,
        amount: Decimal,
        currency: str,
        order_id: str,
        customer_email: str
    ) -> dict:
        """
        Create cryptocurrency charge
        """
        charge = self.client.charge.create(
            name=f"Order {order_id}",
            description="Cable harness manufacturing",
            local_price={
                "amount": str(amount),
                "currency": currency
            },
            pricing_type="fixed_price",
            metadata={
                "order_id": order_id,
                "customer_email": customer_email
            },
            redirect_url=f"https://loombotic.com/order/{order_id}/confirm",
            cancel_url=f"https://loombotic.com/order/{order_id}/cancel"
        )

        return {
            "charge_id": charge.id,
            "hosted_url": charge.hosted_url,
            "pricing": charge.pricing,
            "addresses": charge.addresses,
            "expires_at": charge.expires_at
        }

    async def get_charge_status(self, charge_id: str) -> dict:
        """
        Check charge status
        """
        charge = self.client.charge.retrieve(charge_id)

        return {
            "id": charge.id,
            "status": charge.timeline[-1]["status"],
            "payments": charge.payments,
            "confirmed": any(
                event["status"] == "CONFIRMED"
                for event in charge.timeline
            )
        }
```

---

## Net Terms / Invoice System

```python
class InvoicePaymentSystem:
    """
    Invoice-based payment for enterprise customers
    """

    def __init__(self):
        self.db = database
        self.email = EmailService()

    async def create_invoice(
        self,
        customer_id: str,
        amount: Decimal,
        due_date: datetime,
        line_items: List[dict],
        net_terms: int = 30
    ) -> dict:
        """
        Create invoice for net terms customer
        """
        # Verify customer has net terms approval
        customer = await self.db.get_customer(customer_id)

        if not customer.net_terms_approved:
            raise PaymentError("Customer not approved for net terms")

        if customer.credit_limit < amount:
            raise PaymentError("Order exceeds credit limit")

        # Generate invoice
        invoice_id = self.generate_invoice_id()

        invoice = {
            "invoice_id": invoice_id,
            "customer_id": customer_id,
            "amount": amount,
            "due_date": due_date,
            "net_terms": net_terms,
            "status": "pending",
            "line_items": line_items,
            "created_at": datetime.now()
        }

        await self.db.insert("invoices", invoice)

        # Send invoice email
        await self.email.send_invoice(customer.email, invoice)

        return invoice

    async def mark_invoice_paid(
        self,
        invoice_id: str,
        payment_method: str,
        transaction_id: str = None
    ):
        """
        Mark invoice as paid
        """
        await self.db.update("invoices", invoice_id, {
            "status": "paid",
            "paid_at": datetime.now(),
            "payment_method": payment_method,
            "transaction_id": transaction_id
        })

        # Update customer credit utilization
        invoice = await self.db.get_invoice(invoice_id)
        await self.update_credit_utilization(
            invoice.customer_id,
            -invoice.amount
        )

    async def check_overdue_invoices(self):
        """
        Check for overdue invoices and send reminders
        """
        overdue = await self.db.query("""
            SELECT * FROM invoices
            WHERE status = 'pending'
            AND due_date < NOW()
        """)

        for invoice in overdue:
            await self.send_overdue_notice(invoice)

            # Suspend account if > 60 days overdue
            if (datetime.now() - invoice.due_date).days > 60:
                await self.suspend_customer_account(invoice.customer_id)
```

---

## Purchase Order System

```python
class PurchaseOrderProcessor:
    """
    Purchase order processing for enterprise customers
    """

    async def create_po_order(
        self,
        customer_id: str,
        po_number: str,
        amount: Decimal,
        line_items: List[dict],
        shipping_address: dict,
        billing_address: dict
    ) -> dict:
        """
        Create order from purchase order
        """
        # Validate PO number isn't duplicate
        existing = await self.db.query(
            "SELECT id FROM orders WHERE po_number = ?",
            [po_number]
        )

        if existing:
            raise ValueError(f"PO number {po_number} already exists")

        # Create order
        order = {
            "customer_id": customer_id,
            "po_number": po_number,
            "amount": amount,
            "line_items": line_items,
            "shipping_address": shipping_address,
            "billing_address": billing_address,
            "payment_method": "purchase_order",
            "status": "pending_approval"
        }

        order_id = await self.db.insert("orders", order)

        # Create invoice
        invoice = await self.invoice_system.create_invoice(
            customer_id=customer_id,
            amount=amount,
            due_date=datetime.now() + timedelta(days=30),
            line_items=line_items
        )

        return {
            "order_id": order_id,
            "invoice_id": invoice["invoice_id"],
            "po_number": po_number,
            "status": "pending_approval"
        }
```

---

## Multi-Currency Support

```python
class CurrencyConverter:
    """
    Real-time currency conversion
    """

    SUPPORTED_CURRENCIES = [
        "USD", "EUR", "GBP", "JPY", "CNY", "CAD", "AUD", "CHF"
    ]

    def __init__(self):
        self.cache = redis.Redis()
        self.api_key = os.getenv("EXCHANGE_RATE_API_KEY")

    async def get_exchange_rate(
        self,
        from_currency: str,
        to_currency: str
    ) -> Decimal:
        """
        Get exchange rate with caching
        """
        if from_currency == to_currency:
            return Decimal("1.0")

        cache_key = f"rate:{from_currency}:{to_currency}"
        cached = await self.cache.get(cache_key)

        if cached:
            return Decimal(cached)

        # Fetch from API
        url = f"https://v6.exchangerate-api.com/v6/{self.api_key}/pair/{from_currency}/{to_currency}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            data = response.json()

        rate = Decimal(str(data["conversion_rate"]))

        # Cache for 1 hour
        await self.cache.setex(cache_key, 3600, str(rate))

        return rate

    async def convert(
        self,
        amount: Decimal,
        from_currency: str,
        to_currency: str
    ) -> Decimal:
        """
        Convert amount between currencies
        """
        rate = await self.get_exchange_rate(from_currency, to_currency)
        return amount * rate

    async def get_customer_currency(self, country_code: str) -> str:
        """
        Get default currency for country
        """
        currency_map = {
            "US": "USD",
            "GB": "GBP",
            "EU": "EUR",
            "JP": "JPY",
            "CN": "CNY",
            "CA": "CAD",
            "AU": "AUD",
            "CH": "CHF"
        }

        return currency_map.get(country_code, "USD")
```

---

## Tax Calculation (Avalara)

```python
from avalara import TaxCalculator

class TaxService:
    """
    Sales tax calculation via Avalara
    """

    def __init__(self):
        self.client = TaxCalculator(
            account_id=os.getenv("AVALARA_ACCOUNT_ID"),
            license_key=os.getenv("AVALARA_LICENSE_KEY"),
            environment="production"
        )

    async def calculate_tax(
        self,
        amount: Decimal,
        shipping_address: dict,
        line_items: List[dict]
    ) -> dict:
        """
        Calculate sales tax for order
        """
        transaction = {
            "type": "SalesOrder",
            "companyCode": "LOOMBOTIC",
            "date": datetime.now().isoformat(),
            "customerCode": shipping_address.get("customer_id"),
            "addresses": {
                "ShipTo": {
                    "line1": shipping_address["line1"],
                    "city": shipping_address["city"],
                    "region": shipping_address["state"],
                    "country": shipping_address["country"],
                    "postalCode": shipping_address["postal_code"]
                }
            },
            "lines": [
                {
                    "number": str(i),
                    "quantity": item["quantity"],
                    "amount": float(item["amount"]),
                    "taxCode": "P0000000",  # Physical goods
                    "description": item["description"]
                }
                for i, item in enumerate(line_items)
            ]
        }

        result = await self.client.create_transaction(transaction)

        return {
            "total_tax": Decimal(str(result["totalTax"])),
            "tax_rate": Decimal(str(result["totalTax"])) / amount,
            "line_taxes": [
                {
                    "line": line["lineNumber"],
                    "tax": Decimal(str(line["tax"]))
                }
                for line in result["lines"]
            ]
        }
```

---

## Fraud Detection

```python
class FraudDetectionService:
    """
    Fraud detection and prevention
    """

    def __init__(self):
        self.stripe_radar = stripe  # Stripe Radar for card fraud
        self.maxmind = MaxMindClient()  # IP geolocation

    async def assess_risk(
        self,
        customer_id: str,
        amount: Decimal,
        payment_method: str,
        ip_address: str,
        billing_address: dict
    ) -> dict:
        """
        Assess fraud risk for transaction
        """
        risk_score = 0
        flags = []

        # Check customer history
        customer_risk = await self.check_customer_history(customer_id)
        risk_score += customer_risk

        # Check IP geolocation
        ip_data = await self.maxmind.lookup(ip_address)
        if ip_data["country"] != billing_address["country"]:
            risk_score += 20
            flags.append("ip_country_mismatch")

        # Check velocity (multiple orders in short time)
        velocity_risk = await self.check_velocity(customer_id)
        risk_score += velocity_risk

        # Large order from new customer
        if amount > 5000 and customer_risk > 50:
            risk_score += 30
            flags.append("large_order_new_customer")

        # Classify risk level
        if risk_score >= 80:
            decision = "block"
        elif risk_score >= 50:
            decision = "review"
        else:
            decision = "approve"

        return {
            "risk_score": risk_score,
            "decision": decision,
            "flags": flags
        }

    async def check_customer_history(self, customer_id: str) -> int:
        """
        Check customer's order history
        """
        customer = await self.db.get_customer(customer_id)

        if not customer:
            return 50  # New customer = medium risk

        # Check for chargebacks
        if customer.chargeback_count > 0:
            return 100  # High risk

        # Check order history
        if customer.order_count > 10:
            return 10  # Low risk
        elif customer.order_count > 5:
            return 20
        else:
            return 40
```

---

## Payment Webhooks Handler

```python
from fastapi import Request, HTTPException

class WebhookHandler:
    """
    Handle payment provider webhooks
    """

    def __init__(self):
        self.stripe = StripePaymentProcessor()
        self.paypal = PayPalProcessor()

    async def handle_stripe_webhook(self, request: Request):
        """
        Handle Stripe webhook events
        """
        payload = await request.body()
        signature = request.headers.get("stripe-signature")

        try:
            event = self.stripe.verify_webhook(payload, signature)
        except WebhookError:
            raise HTTPException(status_code=400, detail="Invalid signature")

        # Handle event types
        if event["type"] == "payment_intent.succeeded":
            await self.handle_payment_success(event["data"]["object"])

        elif event["type"] == "payment_intent.payment_failed":
            await self.handle_payment_failure(event["data"]["object"])

        elif event["type"] == "charge.refunded":
            await self.handle_refund(event["data"]["object"])

        return {"status": "success"}

    async def handle_payment_success(self, payment_intent: dict):
        """
        Process successful payment
        """
        order_id = payment_intent["metadata"]["order_id"]

        # Update order status
        await self.db.update("orders", order_id, {
            "payment_status": "paid",
            "payment_intent_id": payment_intent["id"],
            "paid_at": datetime.now()
        })

        # Send confirmation email
        await self.email.send_order_confirmation(order_id)

        # Notify manufacturing
        await self.manufacturing.start_production(order_id)
```

---

## Payment Summary

**Supported Methods**:
- ✅ Credit/Debit Cards (Stripe)
- ✅ ACH/Bank Transfer (Plaid + Stripe)
- ✅ PayPal
- ✅ Wire Transfer (manual)
- ✅ Net Terms (approved customers)
- ✅ Purchase Orders (enterprise)
- ✅ Cryptocurrency (USDC/USDT)

**Features**:
- ✅ Multi-currency support
- ✅ Automated tax calculation
- ✅ Fraud detection
- ✅ PCI DSS compliant
- ✅ 3D Secure for cards
- ✅ Instant payment confirmation
- ✅ Automatic invoicing
- ✅ Refund processing

**Processing Times**:
- Cards: Instant
- PayPal: Instant
- ACH: 3-5 business days
- Wire: 1-3 business days
- Crypto: 10-60 minutes
- Net Terms: 30-90 days

**Fees**:
- Cards: 2.9% + $0.30
- ACH: 0.8% (capped at $5)
- PayPal: 3.49% + $0.49
- Wire: $0 (customer pays bank fees)
- Crypto: 1%
- Net Terms: $0
