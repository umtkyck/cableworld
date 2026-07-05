import type { RatesResponse, ShipmentDetails, ShippingRate } from './types'
import { getUpsRates, isUpsConfigured } from './ups'
import { getFedexRates, isFedexConfigured } from './fedex'
import { getUspsRates, isUspsConfigured } from './usps'
import { getFallbackRates } from './fallback'

export type { CarrierId, RatesResponse, ShipmentDetails, ShippingAddress, ShippingRate } from './types'
export { SHIP_FROM } from './origin'

/** Free shipping threshold advertised site-wide ("Free shipping over $1,000"). */
export const FREE_SHIPPING_THRESHOLD = 1000

/**
 * Rate-shop every configured North American carrier (UPS, FedEx, USPS) in
 * parallel and return the combined list sorted by price. Falls back to table
 * rates when nothing is configured or every carrier errors out, so checkout
 * never dead-ends.
 */
export async function getShippingRates(shipment: ShipmentDetails): Promise<RatesResponse> {
  const carriers: Promise<ShippingRate[]>[] = []

  if (isUpsConfigured()) carriers.push(getUpsRates(shipment))
  if (isFedexConfigured()) carriers.push(getFedexRates(shipment))
  if (isUspsConfigured()) carriers.push(getUspsRates(shipment))

  if (carriers.length > 0) {
    const results = await Promise.allSettled(carriers)

    for (const result of results) {
      if (result.status === 'rejected') {
        console.error('[shipping] carrier rate request failed:', result.reason)
      }
    }

    const rates = results
      .filter((r): r is PromiseFulfilledResult<ShippingRate[]> => r.status === 'fulfilled')
      .flatMap((r) => r.value)
      .sort((a, b) => a.amount - b.amount)

    if (rates.length > 0) {
      return { rates, usedFallback: false }
    }
  }

  return { rates: getFallbackRates(shipment), usedFallback: true }
}
