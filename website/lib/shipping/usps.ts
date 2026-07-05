import type { ShipmentDetails, ShippingRate } from './types'
import { SHIP_FROM } from './origin'

const BASE_URL = process.env.USPS_API_BASE || 'https://apis.usps.com'

const MAIL_CLASSES: { code: string; name: string; days: number }[] = [
  { code: 'USPS_GROUND_ADVANTAGE', name: 'USPS Ground Advantage', days: 5 },
  { code: 'PRIORITY_MAIL', name: 'USPS Priority Mail', days: 2 },
  { code: 'PRIORITY_MAIL_EXPRESS', name: 'USPS Priority Mail Express', days: 1 }
]

export function isUspsConfigured(): boolean {
  return Boolean(process.env.USPS_CLIENT_ID && process.env.USPS_CLIENT_SECRET)
}

let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token
  }

  const res = await fetch(`${BASE_URL}/oauth2/v3/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.USPS_CLIENT_ID,
      client_secret: process.env.USPS_CLIENT_SECRET,
      grant_type: 'client_credentials'
    }),
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(`USPS OAuth failed: ${res.status}`)
  }

  const data = await res.json()
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in || 28800) * 1000
  }
  return cachedToken.token
}

/**
 * Fetch USPS domestic rates. USPS prices are per mail class, so we query the
 * main retail classes in parallel. US-only — USPS is skipped for CA/MX.
 */
export async function getUspsRates(shipment: ShipmentDetails): Promise<ShippingRate[]> {
  if (shipment.destination.country !== 'US') {
    return []
  }

  const token = await getAccessToken()
  const { destination, weightLb, dimensionsIn } = shipment

  const results = await Promise.allSettled(
    MAIL_CLASSES.map(async (mailClass) => {
      const res = await fetch(`${BASE_URL}/prices/v3/base-rates/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          originZIPCode: SHIP_FROM.postalCode,
          destinationZIPCode: destination.postalCode.slice(0, 5),
          weight: Math.max(weightLb, 0.1),
          length: dimensionsIn.length,
          width: dimensionsIn.width,
          height: dimensionsIn.height,
          mailClass: mailClass.code,
          processingCategory: 'MACHINABLE',
          rateIndicator: 'SP',
          destinationEntryFacilityType: 'NONE',
          priceType: 'RETAIL',
          mailingDate: new Date().toISOString().slice(0, 10)
        }),
        cache: 'no-store'
      })

      if (!res.ok) {
        throw new Error(`USPS price for ${mailClass.code} failed: ${res.status}`)
      }

      const data = await res.json()
      const price = Number(data?.totalBasePrice ?? data?.rates?.[0]?.price)
      if (!Number.isFinite(price)) {
        throw new Error(`USPS returned no price for ${mailClass.code}`)
      }

      const rate: ShippingRate = {
        id: `usps:${mailClass.code}`,
        carrier: 'usps',
        carrierName: 'USPS',
        service: mailClass.name,
        serviceCode: mailClass.code,
        amount: price,
        currency: 'USD',
        estimatedDays: mailClass.days
      }
      return rate
    })
  )

  return results
    .filter((r): r is PromiseFulfilledResult<ShippingRate> => r.status === 'fulfilled')
    .map((r) => r.value)
}
