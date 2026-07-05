import { getTrackingInfo } from '../tracking'
import { getFallbackRates } from '../fallback'

describe('getTrackingInfo', () => {
  it('detects UPS tracking numbers', () => {
    const info = getTrackingInfo('1Z999AA10123456784')
    expect(info?.carrier).toBe('UPS')
    expect(info?.url).toContain('ups.com/track')
  })

  it('detects USPS tracking numbers', () => {
    const info = getTrackingInfo('9400100000000000000000')
    expect(info?.carrier).toBe('USPS')
    expect(info?.url).toContain('tools.usps.com')
  })

  it('detects FedEx 12-digit tracking numbers', () => {
    const info = getTrackingInfo('771234567890')
    expect(info?.carrier).toBe('FedEx')
    expect(info?.url).toContain('fedex.com/fedextrack')
  })

  it('detects FedEx 15-digit tracking numbers', () => {
    expect(getTrackingInfo('123456789012345')?.carrier).toBe('FedEx')
  })

  it('handles whitespace and lowercase', () => {
    expect(getTrackingInfo('1z 999aa1 0123 4567 84')?.carrier).toBe('UPS')
  })

  it('returns null for unrecognized formats', () => {
    expect(getTrackingInfo('TRK-123456789')).toBeNull()
    expect(getTrackingInfo('')).toBeNull()
  })
})

describe('getFallbackRates', () => {
  const shipment = {
    destination: {
      name: 'Test',
      street1: '1 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US' as const
    },
    weightLb: 2,
    dimensionsIn: { length: 14, width: 10, height: 4 }
  }

  it('returns three rate options sorted from cheapest to fastest', () => {
    const rates = getFallbackRates(shipment)
    expect(rates).toHaveLength(3)
    expect(rates[0].amount).toBeLessThan(rates[1].amount)
    expect(rates[1].amount).toBeLessThan(rates[2].amount)
  })

  it('adds an international surcharge for Canada and Mexico', () => {
    const us = getFallbackRates(shipment)
    const ca = getFallbackRates({
      ...shipment,
      destination: { ...shipment.destination, country: 'CA' }
    })
    expect(ca[0].amount).toBeGreaterThan(us[0].amount)
  })

  it('scales price with weight', () => {
    const light = getFallbackRates(shipment)
    const heavy = getFallbackRates({ ...shipment, weightLb: 50 })
    expect(heavy[0].amount).toBeGreaterThan(light[0].amount)
  })
})
