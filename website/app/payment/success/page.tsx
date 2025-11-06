'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const quoteId = searchParams.get('quote_id') || '';
  const amount = searchParams.get('amount') || '';
  const paymentIntent = searchParams.get('payment_intent') || '';

  useEffect(() => {
    if (paymentIntent) {
      // In a real app, verify the payment intent status with your backend
      // For now, we'll just simulate a successful payment
      setTimeout(() => {
        setPaymentStatus('success');
      }, 1000);
    } else {
      setPaymentStatus('error');
    }
  }, [paymentIntent]);

  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h2>
          <p className="text-gray-600 mb-6">
            We couldn't confirm your payment. Please contact support if you were charged.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600"
          >
            Return to Quotes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-green-600"
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your order
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Order Confirmation
          </h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">{quoteId}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold text-gray-900 text-xl">
                ${parseFloat(amount).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-mono text-sm text-gray-900">
                {paymentIntent.substring(0, 20)}...
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Production Starting
              </span>
            </div>
          </div>

          {/* Receipt Email Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Receipt sent to your email</p>
                <p className="text-blue-700">
                  You'll receive a confirmation email with your receipt and order details shortly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What Happens Next?
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-primary-500 font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Production Starts Immediately
                </h3>
                <p className="text-gray-600 text-sm">
                  Our team will begin manufacturing your cable harnesses right away. You'll receive updates as your order progresses.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-primary-500 font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Quality Testing & Inspection
                </h3>
                <p className="text-gray-600 text-sm">
                  Every harness undergoes 100% electrical testing and visual inspection to ensure IPC-620 compliance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-primary-500 font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Shipping & Delivery
                </h3>
                <p className="text-gray-600 text-sm">
                  Your order will ship within 7-10 business days. You'll receive tracking information via email.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-primary-500 font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Test Reports Included
                </h3>
                <p className="text-gray-600 text-sm">
                  Each shipment includes complete test documentation and certificates of compliance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/orders"
            className="flex-1 bg-primary-500 text-white px-6 py-4 rounded-lg font-semibold text-center hover:bg-primary-600 transition-colors"
          >
            Track Your Order
          </Link>
          <Link
            href="/"
            className="flex-1 bg-white text-primary-500 border-2 border-primary-500 px-6 py-4 rounded-lg font-semibold text-center hover:bg-primary-50 transition-colors"
          >
            Return to Home
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">
            Need help with your order?
          </p>
          <a
            href="mailto:support@cableworld.com"
            className="text-primary-500 font-semibold hover:text-primary-600"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
