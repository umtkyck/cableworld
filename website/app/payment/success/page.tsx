'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [orderRef, setOrderRef] = useState('')

  const quoteId = searchParams.get('quote_id') || ''
  const amount = searchParams.get('amount') || ''
  const paymentIntent = searchParams.get('payment_intent') || ''
  const urlOrderRef = searchParams.get('order_ref') || ''

  useEffect(() => {
    if (!paymentIntent) {
      setPaymentStatus('error')
      return
    }

    fetch(`/api/payment/verify?payment_intent=${encodeURIComponent(paymentIntent)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.verified) {
          setOrderRef(data.orderRef || urlOrderRef || quoteId)
          setPaymentStatus('success')
        } else {
          setPaymentStatus('error')
        }
      })
      .catch(() => setPaymentStatus('error'))
  }, [paymentIntent, urlOrderRef, quoteId])

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
            We couldn&apos;t confirm your payment. Please contact support if you were charged.
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

  const displayOrderId = orderRef || quoteId

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
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

        <div className="mb-6 rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">Order Confirmation</h2>
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">{displayOrderId}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-600">Amount Paid</span>
              <span className="text-xl font-semibold text-gray-900">
                ${parseFloat(amount || '0').toLocaleString()}
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
        </div>

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

        <div className="mt-8 text-center">
          <p className="mb-2 text-gray-600">Need help with your order?</p>
          <a
            href="mailto:umtkyck@gmail.com"
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
