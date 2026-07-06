'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [orderRef, setOrderRef] = useState('');

  const quoteId = searchParams.get('quote_id') || '';
  const amount = searchParams.get('amount') || '';
  const paymentIntent = searchParams.get('payment_intent') || '';
  const urlOrderRef = searchParams.get('order_ref') || '';

  useEffect(() => {
    if (!paymentIntent) {
      setPaymentStatus('error');
      return;
    }

    fetch(`/api/payment/verify?payment_intent=${encodeURIComponent(paymentIntent)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.verified) {
          setOrderRef(data.orderRef || urlOrderRef || quoteId);
          setPaymentStatus('success');
        } else {
          setPaymentStatus('error');
        }
      })
      .catch(() => setPaymentStatus('error'));
  }, [paymentIntent, urlOrderRef, quoteId]);

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
            We couldn&apos;t confirm your payment. Please contact support if you were charged.
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

  const displayOrderId = orderRef || quoteId;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-xl text-gray-600">Thank you for your order</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Confirmation</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">{displayOrderId}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold text-gray-900 text-xl">
                ${parseFloat(amount || '0').toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-mono text-sm text-gray-900">{paymentIntent.substring(0, 20)}...</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Production Starting
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/orders" className="flex-1 bg-primary-500 text-white px-6 py-4 rounded-lg font-semibold text-center hover:bg-primary-600 transition-colors">
            Track Your Order
          </Link>
          <Link href="/" className="flex-1 bg-white text-primary-500 border-2 border-primary-500 px-6 py-4 rounded-lg font-semibold text-center hover:bg-primary-50 transition-colors">
            Return to Home
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Need help with your order?</p>
          <a href="mailto:umtkyck@gmail.com" className="text-primary-500 font-semibold hover:text-primary-600">
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
