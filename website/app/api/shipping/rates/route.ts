import { NextRequest, NextResponse } from 'next/server'
import { getShippingRates, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'
import type { ShipmentDetails, ShippingAddress } from '@/lib/shipping'

// Cable harnesses are light; estimate package weight from item count when the
// client doesn't send an explicit weight.
const DEFAULT_ITEM_WEIGHT_LB = 0.75
const DEFAULT_DIMENSIONS_IN = { length: 14, width: 10, height: 4 }

const SUPPORTED_COUNTRIES = ['US', 'CA', 'MX'] as const

function parseAddress(input: any): ShippingAddress | null {
  if (!input || typeof input !== 'object') return null

  const country = String(input.country || 'US').toUpperCase()
  if (!SUPPORTED_COUNTRIES.includes(country as any)) return null

  const required = ['street1', 'city', 'state', 'postalCode']
  for (const field of required) {
    if (!input[field] || typeof input[field] !== 'string' || !input[field].trim()) {
      return null
    }
  }

  return {
    name: String(input.name || '').trim(),
    street1: input.street1.trim(),
    street2: input.street2 ? String(input.street2).trim() : undefined,
    city: input.city.trim(),
    state: input.state.trim().toUpperCase(),
    postalCode: input.postalCode.trim(),
    country: country as ShippingAddress['country'],
    phone: input.phone ? String(input.phone).trim() : undefined
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const destination = parseAddress(body.destination)
    if (!destination) {
      return NextResponse.json(
        { error: 'Please provide a complete shipping address in the US, Canada, or Mexico.' },
        { status: 400 }
      )
    }

    const itemCount = Number(body.itemCount) || 1
    const weightLb = Number(body.weightLb) || Math.max(itemCount * DEFAULT_ITEM_WEIGHT_LB, 0.5)
    const orderTotal = Number(body.orderTotal) || 0

    const shipment: ShipmentDetails = {
      destination,
      weightLb,
      dimensionsIn: DEFAULT_DIMENSIONS_IN
    }

    const { rates, usedFallback } = await getShippingRates(shipment)

    // Site-wide promise: free ground shipping on orders over $1,000.
    const freeShippingApplied = orderTotal >= FREE_SHIPPING_THRESHOLD
    const finalRates = freeShippingApplied
      ? rates.map((rate, index) => (index === 0 ? { ...rate, amount: 0 } : rate))
      : rates

    return NextResponse.json({
      rates: finalRates,
      usedFallback,
      freeShippingApplied
    })
  } catch (error) {
    console.error('[api/shipping/rates] error:', error)
    return NextResponse.json(
      { error: 'Unable to calculate shipping rates right now. Please try again.' },
      { status: 500 }
    )
  }
}
