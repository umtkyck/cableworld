import type { ShipmentDetails, ShippingRate } from './types'
import { SHIP_FROM } from './origin'

const BASE_URL = process.env.FEDEX_API_BASE || 'https://apis.fedex.com'

const SERVICE_NAMES: Record<string, string> = {
  FEDEX_GROUND: 'FedEx Ground',
  GROUND_HOME_DELIVERY: 'FedEx Home Delivery',
  FEDEX_EXPRESS_SAVER: 'FedEx Express Saver',
  FEDEX_2_DAY: 'FedEx 2Day',
  FEDEX_2_DAY_AM: 'FedEx 2Day A.M.',
  STANDARD_OVERNIGHT: 'FedEx Standard Overnight',
  PRIORITY_OVERNIGHT: 'FedEx Priority Overnight',
  FIRST_OVERNIGHT: 'FedEx First Overnight',
  INTERNATIONAL_ECONOMY: 'FedEx International Economy',
  INTERNATIONAL_PRIORITY: 'FedEx International Priority'
}

export function isFedexConfigured(): boolean {
  return Boolean(
    process.env.FEDEX_CLIENT_ID &&
    process.env.FEDEX_CLIENT_SECRET &&
    process.env.FEDEX_ACCOUNT_NUMBER
  )
}

let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token
  }

  const res = await fetch(`${BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.FEDEX_CLIENT_ID || '',
      client_secret: process.env.FEDEX_CLIENT_SECRET || ''
    }),
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(`FedEx OAuth failed: ${res.status}`)
  }

  const data = await res.json()
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000
  }
  return cachedToken.token
}

/** Fetch rates for all available FedEx services via the Rate API. */
export async function getFedexRates(shipment: ShipmentDetails): Promise<ShippingRate[]> {
  const token = await getAccessToken()
  const { destination, weightLb, dimensionsIn } = shipment

  const body = {
    accountNumber: { value: process.env.FEDEX_ACCOUNT_NUMBER },
    rateRequestControlParameters: {
      returnTransitTimes: true
    },
    requestedShipment: {
      shipper: {
        address: {
          streetLines: [SHIP_FROM.street1],
          city: SHIP_FROM.city,
          stateOrProvinceCode: SHIP_FROM.state,
          postalCode: SHIP_FROM.postalCode,
          countryCode: SHIP_FROM.country
        }
      },
      recipient: {
        address: {
          streetLines: [destination.street1, destination.street2].filter(Boolean),
          city: destination.city,
          stateOrProvinceCode: destination.state,
          postalCode: destination.postalCode,
          countryCode: destination.country,
          residential: true
        }
      },
      pickupType: 'DROPOFF_AT_FEDEX_LOCATION',
      rateRequestType: ['ACCOUNT', 'LIST'],
      requestedPackageLineItems: [
        {
          weight: { units: 'LB', value: Math.max(weightLb, 0.1) },
          dimensions: {
            length: dimensionsIn.length,
            width: dimensionsIn.width,
            height: dimensionsIn.height,
            units: 'IN'
          }
        }
      ]
    }
  }

  const res = await fetch(`${BASE_URL}/rate/v1/rates/quotes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body),
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(`FedEx Rate failed: ${res.status}`)
  }

  const data = await res.json()
  const details = data?.output?.rateReplyDetails
  const list = Array.isArray(details) ? details : []

  return list
    .map((detail: any): ShippingRate | null => {
      const code: string = detail?.serviceType
      const shipmentDetail =
        detail?.ratedShipmentDetails?.find((d: any) => d.rateType === 'ACCOUNT') ||
        detail?.ratedShipmentDetails?.[0]
      const total = Number(shipmentDetail?.totalNetCharge)
      if (!code || !Number.isFinite(total)) return null

      const transitDays = detail?.operationalDetail?.transitTime
      // FedEx returns transit as e.g. "TWO_DAYS"; map the common values.
      const daysMap: Record<string, number> = {
        ONE_DAY: 1, TWO_DAYS: 2, THREE_DAYS: 3, FOUR_DAYS: 4,
        FIVE_DAYS: 5, SIX_DAYS: 6, SEVEN_DAYS: 7
      }

      return {
        id: `fedex:${code}`,
        carrier: 'fedex',
        carrierName: 'FedEx',
        service: SERVICE_NAMES[code] || detail?.serviceName || code,
        serviceCode: code,
        amount: total,
        currency: shipmentDetail?.currency || 'USD',
        estimatedDays: transitDays ? daysMap[transitDays] : undefined
      }
    })
    .filter((rate): rate is ShippingRate => rate !== null)
}
