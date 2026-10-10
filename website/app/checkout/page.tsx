'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import ShippingStep, { ShippingSelection } from '@/components/checkout/ShippingStep'
import BankTransferDetails from '@/components/checkout/BankTransferDetails'
import { CreditCard, Landmark } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'

type PaymentMethod = 'card' | 'bank'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const { cart, cartCount, cartTotal, isLoaded: cartLoaded } = useCart()
  const authFetch = useAuthFetch()
  const [bankPlacing, setBankPlacing] = useState(false)
  const [bankPlaced, setBankPlaced] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [shipping, setShipping] = useState<ShippingSelection | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cardError, setCardError] = useState<string | null>(null)
  // Stable reference the customer must include with a bank transfer.
  const [orderRef] = useState(
    () =>
      `HC-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 36 ** 2)
        .toString(36)
        .toUpperCase()
        .padStart(2, '0')}`
  )

  // Two entry points: a quote link with ?amount=..., or the shopping cart.
  const quoteId = searchParams.get('quote_id') || 'CW-2024-00789'
  const rawAmount = parseFloat(searchParams.get('amount') || '0')
  const hasQuoteAmount = rawAmount >= 1 && rawAmount <= 1000000

  const isCartCheckout = !hasQuoteAmount
  const cartAmount = Math.round(cartTotal * 100) / 100
  const isValidCartAmount = cartAmount >= 1 && cartAmount <= 1000000
  const subtotal = hasQuoteAmount ? rawAmount : isValidCartAmount ? cartAmount : 0
  const isValidAmount = hasQuoteAmount || isValidCartAmount

  const shippingCost = shipping ? shipping.rate.amount : 0
  const amount = Math.round((subtotal + shippingCost) * 100) / 100

  const customerEmail = searchParams.get('email') || ''
  const customerName = searchParams.get('name') || ''

  useEffect(() => {
    // Wait for the cart to load from localStorage before deciding.
    if (isCartCheckout && !cartLoaded) {
      return
    }

    if (!isValidAmount) {
      setError(
        isCartCheckout
          ? 'Your cart is empty. Add products to your cart or request a quote first.'
          : 'Invalid payment amount. Please return to your quote and try again.'
      )
      setLoading(false)
      return
    }

    setLoading(false)

    // The PaymentIntent is only created once a shipping method is chosen and
    // card payment is selected, so the charged amount always includes the
    // carrier rate. Bank transfers don't need a PaymentIntent.
    if (!shipping || paymentMethod !== 'card' || clientSecret) {
      return
    }

    setCardError(null)

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        quoteId,
        orderRef,
        customerEmail: customerEmail || shipping.address.name,
        customerName: shipping.address.name || customerName,
        items: isCartCheckout
          ? cart.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price }))
          : [{ name: `Quote ${quoteId}`, quantity: 1, price: subtotal }],
        shipping: {
          carrierName: shipping.rate.carrierName,
          service: shipping.rate.service,
          amount: shipping.rate.amount,
          address: shipping.address,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // Card payment failing shouldn't dead-end checkout — the customer
          // can still pay by bank transfer.
          setCardError(data.error)
        } else {
          setClientSecret(data.clientSecret)
        }
      })
      .catch(() => {
        setCardError('Failed to initialize card payment')
      })
  }, [
    amount,
    quoteId,
    orderRef,
    customerEmail,
    customerName,
    isValidAmount,
    isCartCheckout,
    cartLoaded,
    shipping,
    paymentMethod,
    clientSecret,
    cart,
    subtotal,
  ])

  const placeBankOrder = async () => {
    if (!shipping) return
    setBankPlacing(true)
    try {
      const res = await authFetch('/api/orders/bank-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderRef,
          quoteId,
          customerEmail: customerEmail || shipping.address.name,
          customerName: shipping.address.name || customerName,
          subtotal,
          shippingCost,
          total: amount,
          items: isCartCheckout
            ? cart.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price }))
            : [{ name: `Quote ${quoteId}`, quantity: 1, price: subtotal }],
          shipping: {
            carrierName: shipping.rate.carrierName,
            service: shipping.rate.service,
            amount: shipping.rate.amount,
            address: shipping.address,
          },
        }),
      })
      if (!res.ok) throw new Error('Failed to place order')
      setBankPlaced(true)
    } catch {
      setCardError('Could not place bank transfer order. Please try again or contact support.')
    } finally {
      setBankPlacing(false)
    }
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#092c47',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
      borderRadius: '8px',
    },
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary-500"></div>
          <p className="text-gray-600">Initializing secure checkout...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-4 text-4xl text-red-500">⚠️</div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Payment Error</h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <a
            href={isCartCheckout ? '/shop' : '/quote'}
            className="inline-block rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-600"
          >
            {isCartCheckout ? 'Browse Products' : 'Return to Quote'}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Complete Your Order</h1>
          <p className="text-gray-600">
            Secure card payments by Stripe · Bank transfers (ACH / Wire) accepted
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Order Summary</h2>

              <div className="mb-6 space-y-3">
                {isCartCheckout ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2 text-sm">
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="whitespace-nowrap font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quote ID</span>
                    <span className="font-medium text-gray-900">{quoteId}</span>
                  </div>
                )}
              </div>

              <div className="mb-6 space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Shipping
                    {shipping ? ` (${shipping.rate.service})` : ''}
                  </span>
                  <span className="font-medium text-gray-900">
                    {shipping
                      ? shipping.rate.amount === 0
                        ? 'FREE'
                        : `$${shipping.rate.amount.toFixed(2)}`
                      : 'Select method'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary-500">
                    $
                    {amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              {shipping && (
                <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                  <p className="mb-1 font-semibold text-gray-900">Ships to</p>
                  <p>{shipping.address.name}</p>
                  <p>
                    {shipping.address.street1}
                    {shipping.address.street2 ? `, ${shipping.address.street2}` : ''}
                  </p>
                  <p>
                    {shipping.address.city}, {shipping.address.state} {shipping.address.postalCode},{' '}
                    {shipping.address.country}
                  </p>
                  <button
                    onClick={() => {
                      setShipping(null)
                      setClientSecret('')
                    }}
                    className="mt-2 font-medium text-primary-500 hover:text-primary-600"
                  >
                    Change
                  </button>
                </div>
              )}

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl text-green-600">✓</span>
                  <div className="text-sm text-green-800">
                    <p className="mb-1 font-semibold">Production starts immediately</p>
                    <p className="text-green-700">
                      {shipping?.rate.estimatedDays
                        ? `Ships via ${shipping.rate.carrierName} · ${shipping.rate.estimatedDays} business day${shipping.rate.estimatedDays > 1 ? 's' : ''} transit`
                        : 'Expected delivery: 7-10 business days'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping + Payment */}
          <div className="md:col-span-2">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              {!shipping ? (
                <ShippingStep
                  itemCount={isCartCheckout ? Math.max(cartCount, 1) : 1}
                  orderTotal={subtotal}
                  onComplete={setShipping}
                />
              ) : (
                <>
                  <h2 className="mb-6 text-xl font-semibold text-gray-900">Payment Information</h2>

                  {/* Payment method selector */}
                  <div
                    className="mb-6 grid grid-cols-2 gap-3"
                    role="radiogroup"
                    aria-label="Payment method"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={paymentMethod === 'card'}
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                        paymentMethod === 'card'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={paymentMethod === 'bank'}
                      onClick={() => setPaymentMethod('bank')}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                        paymentMethod === 'bank'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Landmark className="h-4 w-4" />
                      Bank Transfer (ACH / Wire)
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <>
                      {cardError && (
                        <div
                          className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                          role="alert"
                        >
                          <p className="mb-1 font-semibold">Card payment unavailable</p>
                          <p>{cardError} You can also pay by bank transfer.</p>
                        </div>
                      )}

                      {!cardError && !clientSecret && (
                        <div className="flex items-center justify-center gap-3 py-8 text-sm text-gray-600">
                          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary-500"></div>
                          Preparing secure payment...
                        </div>
                      )}

                      {clientSecret && (
                        <Elements options={{ clientSecret, appearance }} stripe={getStripe()}>
                          <CheckoutForm amount={amount} quoteId={quoteId} orderRef={orderRef} />
                        </Elements>
                      )}
                    </>
                  )}

                  {paymentMethod === 'bank' && (
                    <BankTransferDetails
                      amount={amount}
                      reference={orderRef}
                      onPlaceOrder={placeBankOrder}
                      placing={bankPlacing}
                      placed={bankPlaced}
                    />
                  )}
                </>
              )}

              {/* Trust Badges */}
              <div className="mt-8 border-t pt-8">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>PCI Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span>All Cards Accepted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary-500"></div>
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
