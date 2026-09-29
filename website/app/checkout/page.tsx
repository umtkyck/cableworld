'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import { useSearchParams } from 'next/navigation'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get quote details from URL params
  const quoteId = searchParams.get('quote_id') || 'CW-2024-00789'
  const rawAmount = parseFloat(searchParams.get('amount') || '0')

  // Validate amount - must be between $1 and $1,000,000
  const isValidAmount = rawAmount >= 1 && rawAmount <= 1000000
  const amount = isValidAmount ? rawAmount : 0
  const customerEmail = searchParams.get('email') || ''
  const customerName = searchParams.get('name') || ''

  useEffect(() => {
    // Validate amount before creating payment intent
    if (!isValidAmount) {
      setError('Invalid payment amount. Please return to your quote and try again.')
      setLoading(false)
      return
    }

    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        quoteId,
        customerEmail,
        customerName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setLoading(false)
        } else {
          setClientSecret(data.clientSecret)
          setLoading(false)
        }
      })
      .catch(() => {
        setError('Failed to initialize payment')
        setLoading(false)
      })
  }, [amount, quoteId, customerEmail, customerName, isValidAmount])

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
            href="/quote"
            className="inline-block rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-600"
          >
            Return to Quote
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
          <p className="text-gray-600">Secure checkout powered by Stripe</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Order Summary</h2>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quote ID</span>
                  <span className="font-medium text-gray-900">{quoteId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Components</span>
                  <span className="font-medium text-gray-900">$1,420.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Labor & Assembly</span>
                  <span className="font-medium text-gray-900">$980.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Testing & QA</span>
                  <span className="font-medium text-gray-900">$250.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">$197.00</span>
                </div>
              </div>

              <div className="mb-6 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary-500">
                    ${amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl text-green-600">✓</span>
                  <div className="text-sm text-green-800">
                    <p className="mb-1 font-semibold">Production starts immediately</p>
                    <p className="text-green-700">Expected delivery: 7-10 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Payment Information</h2>

              {clientSecret && (
                <Elements options={{ clientSecret, appearance }} stripe={getStripe()}>
                  <CheckoutForm amount={amount} quoteId={quoteId} />
                </Elements>
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
