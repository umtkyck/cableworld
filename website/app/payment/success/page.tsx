'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'error'>('loading')

  const quoteId = searchParams.get('quote_id') || ''
  const amount = searchParams.get('amount') || ''
  const paymentIntent = searchParams.get('payment_intent') || ''

  useEffect(() => {
    if (paymentIntent) {
      // In a real app, verify the payment intent status with your backend
      // For now, we'll just simulate a successful payment
      setTimeout(() => {
        setPaymentStatus('success')
      }, 1000)
    } else {
      setPaymentStatus('error')
    }
  }, [paymentIntent])

  if (paymentStatus === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-primary-500"></div>
          <p className="text-lg text-gray-600">Confirming your payment...</p>
        </div>
      </div>
    )
  }

  if (paymentStatus === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-6xl text-red-500">⚠️</div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Payment Error</h2>
          <p className="mb-6 text-gray-600">
            We couldn't confirm your payment. Please contact support if you were charged.
          </p>
          <Link
            href="/quote"
            className="inline-block rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-600"
          >
            Return to Quotes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        {/* Success Animation */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Payment Successful!</h1>
          <p className="text-xl text-gray-600">Thank you for your order</p>
        </div>

        {/* Order Details */}
        <div className="mb-6 rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">Order Confirmation</h2>

          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">{quoteId}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-600">Amount Paid</span>
              <span className="text-xl font-semibold text-gray-900">
                ${parseFloat(amount).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-mono text-sm text-gray-900">
                {paymentIntent.substring(0, 20)}...
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 font-medium text-green-800">
                <span className="h-2 w-2 rounded-full bg-green-600"></span>
                Production Starting
              </span>
            </div>
          </div>

          {/* Receipt Email Notice */}
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="mb-1 font-semibold">Receipt sent to your email</p>
                <p className="text-blue-700">
                  You'll receive a confirmation email with your receipt and order details shortly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="mb-6 rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">What Happens Next?</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                <span className="text-lg font-bold text-primary-500">1</span>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">Production Starts Immediately</h3>
                <p className="text-sm text-gray-600">
                  Our team will begin manufacturing your cable harnesses right away. You'll receive
                  updates as your order progresses.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                <span className="text-lg font-bold text-primary-500">2</span>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">Quality Testing & Inspection</h3>
                <p className="text-sm text-gray-600">
                  Every harness undergoes 100% electrical testing and visual inspection to ensure
                  IPC-620 compliance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                <span className="text-lg font-bold text-primary-500">3</span>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">Shipping & Delivery</h3>
                <p className="text-sm text-gray-600">
                  Your order will ship within 7-10 business days. You'll receive tracking
                  information via email.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                <span className="text-lg font-bold text-primary-500">4</span>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">Test Reports Included</h3>
                <p className="text-sm text-gray-600">
                  Each shipment includes complete test documentation and certificates of compliance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/orders"
            className="flex-1 rounded-lg bg-primary-500 px-6 py-4 text-center font-semibold text-white transition-colors hover:bg-primary-600"
          >
            Track Your Order
          </Link>
          <Link
            href="/"
            className="flex-1 rounded-lg border-2 border-primary-500 bg-white px-6 py-4 text-center font-semibold text-primary-500 transition-colors hover:bg-primary-50"
          >
            Return to Home
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="mb-2 text-gray-600">Need help with your order?</p>
          <a
            href="mailto:support@harnesscart.com"
            className="font-semibold text-primary-500 hover:text-primary-600"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-primary-500"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
