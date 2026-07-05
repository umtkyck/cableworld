import type { ShipmentDetails, ShippingRate } from './types'

/**
 * Table rates used when no carrier API is configured, or when every carrier
 * call fails. Weight-banded so checkout always has a working shipping step.
 */
export function getFallbackRates(shipment: ShipmentDetails): ShippingRate[] {
  const weight = Math.max(shipment.weightLb, 0.1)
  const international = shipment.destination.country !== 'US'
  const surcharge = international ? 15 : 0

  const ground = 8.95 + weight * 0.55 + surcharge
  const expedited = 18.95 + weight * 0.95 + surcharge
  const overnight = 39.95 + weight * 1.45 + surcharge

  const round = (n: number) => Math.round(n * 100) / 100

  return [
    {
      id: 'flat:ground',
      carrier: 'flat',
      carrierName: 'Standard',
      service: 'Ground Shipping',
      serviceCode: 'ground',
      amount: round(ground),
      currency: 'USD',
      estimatedDays: international ? 8 : 5
    },
    {
      id: 'flat:expedited',
      carrier: 'flat',
      carrierName: 'Expedited',
      service: 'Expedited Shipping',
      serviceCode: 'expedited',
      amount: round(expedited),
      currency: 'USD',
      estimatedDays: international ? 4 : 2
    },
    {
      id: 'flat:overnight',
      carrier: 'flat',
      carrierName: 'Express',
      service: international ? 'Priority International' : 'Overnight Shipping',
      serviceCode: 'overnight',
      amount: round(overnight),
      currency: 'USD',
      estimatedDays: international ? 2 : 1,
      guaranteed: true
    }
  ]
}
