// Client-safe helpers for carrier tracking links. No API keys required —
// deep links to the carriers' public tracking pages.

export interface TrackingInfo {
  carrier: string
  url: string
}

/**
 * Detect the carrier from a tracking number's format and return the public
 * tracking URL for it.
 *
 * - UPS: starts with "1Z" (e.g. 1Z999AA10123456784)
 * - USPS: 20–22 digits starting with 9 (e.g. 9400 1000 0000 ...)
 * - FedEx: 12, 15 or 20 digit numeric
 */
export function getTrackingInfo(trackingNumber: string): TrackingInfo | null {
  const cleaned = trackingNumber.replace(/\s/g, '').toUpperCase()
  if (!cleaned) return null

  if (/^1Z[0-9A-Z]{16}$/.test(cleaned)) {
    return {
      carrier: 'UPS',
      url: `https://www.ups.com/track?tracknum=${encodeURIComponent(cleaned)}`
    }
  }

  if (/^9\d{19,21}$/.test(cleaned)) {
    return {
      carrier: 'USPS',
      url: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encodeURIComponent(cleaned)}`
    }
  }

  if (/^\d{12}$/.test(cleaned) || /^\d{15}$/.test(cleaned) || /^\d{20}$/.test(cleaned)) {
    return {
      carrier: 'FedEx',
      url: `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(cleaned)}`
    }
  }

  return null
}
