'use client'

import { useState } from 'react'
import { CheckCircle, Zap, Shield, Gauge, Clock, Package, AlertCircle } from 'lucide-react'

interface TestService {
  id: string
  name: string
  description: string
  price: number
  duration: string
  icon: any
  features: string[]
  popular?: boolean
}

interface TestFixture {
  id: string
  name: string
  description: string
  price: number
  rentalPrice: number
  specifications: string[]
}

interface SelectedTest {
  serviceId: string
  fixtureId?: string
  isRental: boolean
}

export default function TestServicesAddOn({ onSelectionChange }: { onSelectionChange?: (total: number, services: SelectedTest[]) => void }) {
  const [selectedServices, setSelectedServices] = useState<SelectedTest[]>([])
  const [showDetails, setShowDetails] = useState(false)

  const testServices: TestService[] = [
    {
      id: 'basic',
      name: 'Basic Quality Test',
      description: 'Essential continuity and resistance testing',
      price: 25,
      duration: '1 day',
      icon: CheckCircle,
      features: [
        'Visual inspection',
        'Continuity test (all pins)',
        'Resistance measurement',
        'Basic documentation',
      ]
    },
    {
      id: 'standard',
      name: 'Standard IPC Test',
      description: 'IPC-A-620 compliant testing procedures',
      price: 75,
      duration: '2 days',
      icon: Shield,
      popular: true,
      features: [
        'IPC-A-620 Class 2 inspection',
        'Continuity & resistance testing',
        'Insulation resistance (500V)',
        'Dielectric withstand test',
        'Detailed test report with photos',
        'Certificate of conformance',
      ]
    },
    {
      id: 'power',
      name: 'Power & Load Test',
      description: 'Full electrical testing under load conditions',
      price: 150,
      duration: '3 days',
      icon: Zap,
      features: [
        'All Standard IPC tests',
        'High current testing (up to 30A)',
        'Voltage drop measurement',
        'Temperature rise test',
        'Power cycling (100 cycles)',
        'Load simulation',
        'Thermal imaging report',
      ]
    },
    {
      id: 'premium',
      name: 'Premium Validation',
      description: 'Complete testing with environmental stress',
      price: 350,
      duration: '5 days',
      icon: Gauge,
      features: [
        'All Power & Load tests',
        'Vibration testing',
        'Thermal cycling (-40°C to +85°C)',
        'Salt spray test',
        'Humidity testing',
        'EMI/EMC screening',
        'Full validation report',
        '1-year test data retention',
      ]
    },
  ]

  const testFixtures: TestFixture[] = [
    {
      id: 'universal',
      name: 'Universal Test Fixture',
      description: 'Standard breakout box for common connectors',
      price: 250,
      rentalPrice: 50,
      specifications: [
        'Supports D-Sub, JST, Molex connectors',
        'LED indicators per pin',
        'Manual test points',
        'Includes test cables',
      ]
    },
    {
      id: 'custom',
      name: 'Custom Test Fixture',
      description: 'Designed specifically for your cable assembly',
      price: 850,
      rentalPrice: 150,
      specifications: [
        'Custom PCB design',
        'Automated testing capability',
        'Pogo pin contacts',
        'Includes software & documentation',
        'Reusable for future orders',
      ]
    },
    {
      id: 'automated',
      name: 'Automated Test Station',
      description: 'Full automated testing with data logging',
      price: 2500,
      rentalPrice: 400,
      specifications: [
        'Computer-controlled testing',
        'Multi-cable testing capability',
        'Real-time data logging',
        'Pass/Fail automation',
        'Statistical analysis software',
        'Remote monitoring',
      ]
    },
  ]

  const handleServiceToggle = (serviceId: string) => {
    const exists = selectedServices.find(s => s.serviceId === serviceId)
    let updated: SelectedTest[]

    if (exists) {
      updated = selectedServices.filter(s => s.serviceId !== serviceId)
    } else {
      updated = [...selectedServices, { serviceId, isRental: false }]
    }

    setSelectedServices(updated)
    calculateTotal(updated)
  }

  const handleFixtureSelect = (serviceId: string, fixtureId: string, isRental: boolean) => {
    const updated = selectedServices.map(s =>
      s.serviceId === serviceId
        ? { ...s, fixtureId, isRental }
        : s
    )
    setSelectedServices(updated)
    calculateTotal(updated)
  }

  const calculateTotal = (services: SelectedTest[]) => {
    let total = 0

    services.forEach(selected => {
      const service = testServices.find(s => s.id === selected.serviceId)
      if (service) total += service.price

      if (selected.fixtureId) {
        const fixture = testFixtures.find(f => f.id === selected.fixtureId)
        if (fixture) {
          total += selected.isRental ? fixture.rentalPrice : fixture.price
        }
      }
    })

    if (onSelectionChange) {
      onSelectionChange(total, services)
    }

    return total
  }

  const total = calculateTotal(selectedServices)

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-blue-600 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Premium Test Services</h2>
            <p className="text-primary-100">
              Ensure quality and reliability with professional testing
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-xs uppercase tracking-wide opacity-80">Add-On Services</p>
            <p className="text-2xl font-bold">${total}</p>
          </div>
        </div>
      </div>

      {/* Benefits Banner */}
      <div className="bg-blue-50 border-b border-blue-200 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Why choose professional testing?</p>
            <p className="text-xs text-blue-800">
              Reduce field failures by 95% • Meet industry standards • Ensure customer satisfaction •
              Protect your brand reputation
            </p>
          </div>
        </div>
      </div>

      {/* Test Services */}
      <div className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Select Test Level</h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {testServices.map(service => {
            const Icon = service.icon
            const isSelected = selectedServices.some(s => s.serviceId === service.id)

            return (
              <div
                key={service.id}
                className={`relative border-2 rounded-xl p-4 cursor-pointer transition ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-200 hover:border-primary-300'
                } ${service.popular ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}
                onClick={() => handleServiceToggle(service.id)}
              >
                {service.popular && (
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-primary-100' : 'bg-slate-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-primary-600' : 'text-slate-600'}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{service.name}</h4>
                      <p className="text-xs text-slate-600">{service.description}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">${service.price}</p>
                  </div>
                </div>

                <ul className="space-y-1.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Test Fixture Selection */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Add Test Fixture (Optional)</p>

                    <div className="space-y-2">
                      {testFixtures.map(fixture => {
                        const selected = selectedServices.find(s => s.serviceId === service.id)
                        const isFixtureSelected = selected?.fixtureId === fixture.id

                        return (
                          <div key={fixture.id} className="border border-slate-200 rounded-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h5 className="font-medium text-slate-900 text-sm">{fixture.name}</h5>
                                <p className="text-xs text-slate-600">{fixture.description}</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleFixtureSelect(service.id, fixture.id, false)
                                }}
                                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition ${
                                  isFixtureSelected && !selected.isRental
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                Buy ${fixture.price}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleFixtureSelect(service.id, fixture.id, true)
                                }}
                                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition ${
                                  isFixtureSelected && selected.isRental
                                    ? 'bg-accent-blue-500 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                Rent ${fixture.rentalPrice}
                              </button>
                            </div>

                            {isFixtureSelected && (
                              <ul className="mt-2 space-y-1">
                                {fixture.specifications.map((spec, idx) => (
                                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{spec}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary */}
        {selectedServices.length > 0 && (
          <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Selected Services Summary</h3>

            <div className="space-y-3">
              {selectedServices.map(selected => {
                const service = testServices.find(s => s.id === selected.serviceId)
                const fixture = selected.fixtureId
                  ? testFixtures.find(f => f.id === selected.fixtureId)
                  : null

                return (
                  <div key={selected.serviceId} className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">{service?.name}</p>
                        {fixture && (
                          <p className="text-sm text-slate-600">
                            + {fixture.name} ({selected.isRental ? 'Rental' : 'Purchase'})
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">
                          ${service?.price}
                          {fixture && ` + $${selected.isRental ? fixture.rentalPrice : fixture.price}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 pt-4 border-t-2 border-slate-300 flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-900">Total Test Services:</span>
              <span className="text-3xl font-bold text-primary-600">${total}</span>
            </div>

            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-900 mb-1">
                    Quality Guarantee
                  </p>
                  <p className="text-xs text-green-800">
                    All tested cables include detailed test reports and certificates.
                    Failed units are replaced at no additional cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Selection State */}
        {selectedServices.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Shield className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Select a test level to ensure your cables meet quality standards</p>
          </div>
        )}
      </div>
    </div>
  )
}
