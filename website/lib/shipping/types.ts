export type CarrierId = 'ups' | 'fedex' | 'usps'

export interface ShippingAddress {
  name: string
  street1: string
  street2?: string
  city: string
  state: string
  postalCode: string
  /** ISO 3166-1 alpha-2. North American carriers: US, CA, MX */
  country: 'US' | 'CA' | 'MX'
  phone?: string
}

export interface ShipmentDetails {
  destination: ShippingAddress
  /** Total package weight in pounds */
  weightLb: number
  /** Package dimensions in inches */
  dimensionsIn: {
    length: number
    width: number
    height: number
  }
}

export interface ShippingRate {
  /** Unique id, e.g. "ups:03" */
  id: string
  carrier: CarrierId | 'flat'
  carrierName: string
  service: string
  serviceCode: string
  /** USD */
  amount: number
  currency: string
  estimatedDays?: number
  guaranteed?: boolean
}

export interface RatesResponse {
  rates: ShippingRate[]
  /** True when no carrier APIs are configured and table rates were used */
  usedFallback: boolean
}
