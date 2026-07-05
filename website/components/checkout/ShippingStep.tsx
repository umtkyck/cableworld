'use client'

import React, { useState } from 'react'
import { Truck, Loader2 } from 'lucide-react'
import type { ShippingRate } from '@/lib/shipping/types'

export interface ShippingSelection {
  address: {
    name: string
    street1: string
    street2: string
    city: string
    state: string
    postalCode: string
    country: 'US' | 'CA' | 'MX'
  }
  rate: ShippingRate
}

interface ShippingStepProps {
  itemCount: number
  orderTotal: number
  onComplete: (selection: ShippingSelection) => void
}

const COUNTRIES = [
  { code: 'US', label: 'United States' },
  { code: 'CA', label: 'Canada' },
  { code: 'MX', label: 'Mexico' }
] as const

export default function ShippingStep({ itemCount, orderTotal, onComplete }: ShippingStepProps) {
  const [address, setAddress] = useState({
    name: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US' as 'US' | 'CA' | 'MX'
  })
  const [rates, setRates] = useState<ShippingRate[] | null>(null)
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null)
  const [freeShippingApplied, setFreeShippingApplied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof typeof address) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAddress((prev) => ({ ...prev, [field]: e.target.value }))
      // Address changed — previously fetched rates no longer apply.
      setRates(null)
      setSelectedRateId(null)
    }

  const addressComplete =
    address.name.trim() && address.street1.trim() && address.city.trim() &&
    address.state.trim() && address.postalCode.trim()

  const fetchRates = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!addressComplete) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/shipping/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: address, itemCount, orderTotal })
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || 'Unable to calculate shipping rates.')
      } else {
        setRates(data.rates)
        setFreeShippingApplied(Boolean(data.freeShippingApplied))
        setSelectedRateId(data.rates[0]?.id ?? null)
      }
    } catch {
      setError('Unable to calculate shipping rates. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const confirm = () => {
    const rate = rates?.find((r) => r.id === selectedRateId)
    if (rate) {
      onComplete({ address, rate })
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Truck className="w-5 h-5" />
        Shipping Information
      </h2>

      <form onSubmit={fetchRates} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
          <input type="text" value={address.name} onChange={set('name')} className={inputClass} placeholder="Jane Smith" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Street address</label>
          <input type="text" value={address.street1} onChange={set('street1')} className={inputClass} placeholder="123 Main St" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apartment, suite, etc. <span className="text-gray-400">(optional)</span>
          </label>
          <input type="text" value={address.street2} onChange={set('street2')} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input type="text" value={address.city} onChange={set('city')} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
            <input type="text" value={address.state} onChange={set('state')} className={inputClass} placeholder="IL" maxLength={2} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal code</label>
            <input type="text" value={address.postalCode} onChange={set('postalCode')} className={inputClass} placeholder="60563" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select value={address.country} onChange={set('country')} className={inputClass}>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {!rates && (
          <button
            type="submit"
            disabled={!addressComplete || loading}
            className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Getting rates from carriers...' : 'Calculate Shipping'}
          </button>
        )}
      </form>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>
      )}

      {rates && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Choose a shipping method</h3>
          {freeShippingApplied && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">
              Your order qualifies for free ground shipping (orders over $1,000).
            </p>
          )}
          <div className="space-y-2" role="radiogroup" aria-label="Shipping method">
            {rates.map((rate) => (
              <label
                key={rate.id}
                className={`flex items-center justify-between gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                  selectedRateId === rate.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping-rate"
                    checked={selectedRateId === rate.id}
                    onChange={() => setSelectedRateId(rate.id)}
                    className="accent-primary-500"
                  />
                  <span>
                    <span className="block text-sm font-medium text-gray-900">{rate.service}</span>
                    <span className="block text-xs text-gray-500">
                      {rate.carrierName}
                      {rate.estimatedDays ? ` · ${rate.estimatedDays} business day${rate.estimatedDays > 1 ? 's' : ''}` : ''}
                      {rate.guaranteed ? ' · Guaranteed' : ''}
                    </span>
                  </span>
                </span>
                <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                  {rate.amount === 0 ? 'FREE' : `$${rate.amount.toFixed(2)}`}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={confirm}
            disabled={!selectedRateId}
            className="mt-4 w-full bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </button>
        </div>
      )}
    </div>
  )
}
