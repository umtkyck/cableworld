import type { ShipmentDetails, ShippingRate } from './types'
import { SHIP_FROM } from './origin'

const BASE_URL = process.env.UPS_API_BASE || 'https://onlinetools.ups.com'

const SERVICE_NAMES: Record<string, string> = {
  '01': 'UPS Next Day Air',
  '02': 'UPS 2nd Day Air',
  '03': 'UPS Ground',
  '12': 'UPS 3 Day Select',
  '13': 'UPS Next Day Air Saver',
  '14': 'UPS Next Day Air Early',
  '07': 'UPS Worldwide Express',
  '08': 'UPS Worldwide Expedited',
  '11': 'UPS Standard',
  '65': 'UPS Worldwide Saver'
}

export function isUpsConfigured(): boolean {
  return Boolean(
    process.env.UPS_CLIENT_ID &&
    process.env.UPS_CLIENT_SECRET &&
    process.env.UPS_ACCOUNT_NUMBER
  )
}

let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token
  }

  const credentials = Buffer.from(
    `${process.env.UPS_CLIENT_ID}:${process.env.UPS_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch(`${BASE_URL}/security/v1/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(`UPS OAuth failed: ${res.status}`)
  }

  const data = await res.json()
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000
  }
  return cachedToken.token
}

/**
 * Fetch rates for all eligible UPS services using the Rating API "Shop"
 * operation with transit times.
 */
export async function getUpsRates(shipment: ShipmentDetails): Promise<ShippingRate[]> {
  const token = await getAccessToken()
  const { destination, weightLb, dimensionsIn } = shipment

  const body = {
    RateRequest: {
      Request: {
        TransactionReference: { CustomerContext: 'harnesscart rate shop' }
      },
      Shipment: {
        Shipper: {
          Name: SHIP_FROM.name,
          ShipperNumber: process.env.UPS_ACCOUNT_NUMBER,
          Address: {
            AddressLine: [SHIP_FROM.street1],
            City: SHIP_FROM.city,
            StateProvinceCode: SHIP_FROM.state,
            PostalCode: SHIP_FROM.postalCode,
            CountryCode: SHIP_FROM.country
          }
        },
        ShipFrom: {
          Name: SHIP_FROM.name,
          Address: {
            AddressLine: [SHIP_FROM.street1],
            City: SHIP_FROM.city,
            StateProvinceCode: SHIP_FROM.state,
            PostalCode: SHIP_FROM.postalCode,
            CountryCode: SHIP_FROM.country
          }
        },
        ShipTo: {
          Name: destination.name,
          Address: {
            AddressLine: [destination.street1, destination.street2].filter(Boolean),
            City: destination.city,
            StateProvinceCode: destination.state,
            PostalCode: destination.postalCode,
            CountryCode: destination.country
          }
        },
        Package: [
          {
            PackagingType: { Code: '02', Description: 'Customer Supplied Package' },
            Dimensions: {
              UnitOfMeasurement: { Code: 'IN' },
              Length: String(dimensionsIn.length),
              Width: String(dimensionsIn.width),
              Height: String(dimensionsIn.height)
            },
            PackageWeight: {
              UnitOfMeasurement: { Code: 'LBS' },
              Weight: String(Math.max(weightLb, 0.1))
            }
          }
        ]
      }
    }
  }

  const res = await fetch(
    `${BASE_URL}/api/rating/v2409/Shop?additionalinfo=timeintransit`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body),
      cache: 'no-store'
    }
  )

  if (!res.ok) {
    throw new Error(`UPS Rating failed: ${res.status}`)
  }

  const data = await res.json()
  const ratedShipments = data?.RateResponse?.RatedShipment
  const list = Array.isArray(ratedShipments) ? ratedShipments : ratedShipments ? [ratedShipments] : []

  return list
    .map((rated: any): ShippingRate | null => {
      const code: string = rated?.Service?.Code
      const total = parseFloat(rated?.TotalCharges?.MonetaryValue)
      if (!code || !Number.isFinite(total)) return null

      const transitDays = rated?.TimeInTransit?.ServiceSummary?.EstimatedArrival?.BusinessDaysInTransit

      return {
        id: `ups:${code}`,
        carrier: 'ups',
        carrierName: 'UPS',
        service: SERVICE_NAMES[code] || `UPS Service ${code}`,
        serviceCode: code,
        amount: total,
        currency: rated?.TotalCharges?.CurrencyCode || 'USD',
        estimatedDays: transitDays ? parseInt(transitDays, 10) : undefined,
        guaranteed: rated?.GuaranteedDelivery !== undefined
      }
    })
    .filter((rate): rate is ShippingRate => rate !== null)
}
