'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, MapPin, Star, Award, TrendingUp, Users, DollarSign, CheckCircle, Factory } from 'lucide-react'

interface Supplier {
  id: string
  name: string
  logo: string
  location: string
  country: string
  rating: number
  reviews: number
  verified: boolean
  tier: 'Gold' | 'Silver' | 'Bronze'
  specialties: string[]
  minOrder: number
  leadTime: string
  completedOrders: number
  responseTime: string
  pricing: 'Budget' | 'Moderate' | 'Premium'
  certifications: string[]
  commission: number
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [selectedTier, setSelectedTier] = useState('All')
  const [selectedPricing, setSelectedPricing] = useState('All')
  const [minRating, setMinRating] = useState(0)

  // Sample supplier data
  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'TechWire Manufacturing Co.',
      logo: '🏭',
      location: 'Shenzhen',
      country: 'China',
      rating: 4.8,
      reviews: 156,
      verified: true,
      tier: 'Gold',
      specialties: ['Custom Cable Harnesses', 'Overmolding', 'High Volume'],
      minOrder: 100,
      leadTime: '7-10 days',
      completedOrders: 342,
      responseTime: '< 2 hours',
      pricing: 'Budget',
      certifications: ['ISO 9001', 'UL', 'RoHS'],
      commission: 15
    },
    {
      id: '2',
      name: 'Precision Cable Systems',
      logo: '⚡',
      location: 'Austin, TX',
      country: 'USA',
      rating: 4.9,
      reviews: 203,
      verified: true,
      tier: 'Gold',
      specialties: ['Aerospace Grade', 'Medical Devices', 'Mil-Spec'],
      minOrder: 50,
      leadTime: '5-7 days',
      completedOrders: 489,
      responseTime: '< 1 hour',
      pricing: 'Premium',
      certifications: ['ISO 13485', 'AS9100', 'IPC-A-620'],
      commission: 12
    },
    {
      id: '3',
      name: 'Euro Wire Solutions',
      logo: '🔌',
      location: 'Munich',
      country: 'Germany',
      rating: 4.7,
      reviews: 128,
      verified: true,
      tier: 'Silver',
      specialties: ['Automotive', 'Industrial', 'Custom Connectors'],
      minOrder: 200,
      leadTime: '10-14 days',
      completedOrders: 267,
      responseTime: '< 4 hours',
      pricing: 'Moderate',
      certifications: ['ISO 9001', 'IATF 16949', 'VDE'],
      commission: 18
    },
    {
      id: '4',
      name: 'FlexCable Industries',
      logo: '🔧',
      location: 'Bangalore',
      country: 'India',
      rating: 4.6,
      reviews: 94,
      verified: true,
      tier: 'Silver',
      specialties: ['Flexible Cables', 'Data Cables', 'USB Assemblies'],
      minOrder: 500,
      leadTime: '14-21 days',
      completedOrders: 178,
      responseTime: '< 6 hours',
      pricing: 'Budget',
      certifications: ['ISO 9001', 'CE', 'RoHS'],
      commission: 20
    },
    {
      id: '5',
      name: 'Pacific Assembly Partners',
      logo: '🌊',
      location: 'Taipei',
      country: 'Taiwan',
      rating: 4.5,
      reviews: 67,
      verified: false,
      tier: 'Bronze',
      specialties: ['PCB Assembly', 'Cable Assembly', 'Testing'],
      minOrder: 1000,
      leadTime: '21-30 days',
      completedOrders: 89,
      responseTime: '< 12 hours',
      pricing: 'Budget',
      certifications: ['ISO 9001', 'UL'],
      commission: 22
    },
    {
      id: '6',
      name: 'Premium Harness Group',
      logo: '👑',
      location: 'Toronto',
      country: 'Canada',
      rating: 4.9,
      reviews: 145,
      verified: true,
      tier: 'Gold',
      specialties: ['Custom Engineering', 'Prototyping', 'Low Volume'],
      minOrder: 10,
      leadTime: '3-5 days',
      completedOrders: 234,
      responseTime: '< 30 min',
      pricing: 'Premium',
      certifications: ['ISO 9001', 'CSA', 'UL'],
      commission: 10
    },
  ]

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCountry = selectedCountry === 'All' || supplier.country === selectedCountry
    const matchesTier = selectedTier === 'All' || supplier.tier === selectedTier
    const matchesPricing = selectedPricing === 'All' || supplier.pricing === selectedPricing
    const matchesRating = supplier.rating >= minRating

    return matchesSearch && matchesCountry && matchesTier && matchesPricing && matchesRating
  })

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Silver': return 'bg-slate-100 text-slate-800 border-slate-300'
      case 'Bronze': return 'bg-orange-100 text-orange-800 border-orange-300'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Budget': return 'text-green-600'
      case 'Moderate': return 'text-blue-600'
      case 'Premium': return 'text-purple-600'
      default: return 'text-slate-600'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Supplier Marketplace</h1>
              <p className="text-lg text-slate-600">
                Connect with verified cable harness manufacturers worldwide
              </p>
            </div>
            <Link href="/marketplace/apply" className="btn-primary flex items-center gap-2">
              <Factory className="w-5 h-5" />
              Become a Supplier
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{suppliers.length}</p>
                  <p className="text-sm text-slate-600">Active Suppliers</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {suppliers.reduce((sum, s) => sum + s.completedOrders, 0)}
                  </p>
                  <p className="text-sm text-slate-600">Completed Orders</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">4.7</p>
                  <p className="text-sm text-slate-600">Avg Rating</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {suppliers.filter(s => s.verified).length}
                  </p>
                  <p className="text-sm text-slate-600">Verified Suppliers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search Suppliers
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              >
                <option value="All">All Countries</option>
                <option value="USA">USA</option>
                <option value="China">China</option>
                <option value="Germany">Germany</option>
                <option value="India">India</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            {/* Tier Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tier
              </label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              >
                <option value="All">All Tiers</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </select>
            </div>

            {/* Pricing Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pricing
              </label>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              >
                <option value="All">All Pricing</option>
                <option value="Budget">Budget</option>
                <option value="Moderate">Moderate</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>

          {/* Min Rating Slider */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Minimum Rating: {minRating.toFixed(1)} ⭐
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-slate-600">
            Showing <strong>{filteredSuppliers.length}</strong> of <strong>{suppliers.length}</strong> suppliers
          </p>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Supplier Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{supplier.logo}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-900">{supplier.name}</h3>
                        {supplier.verified && (
                          <CheckCircle className="w-5 h-5 text-blue-500" title="Verified Supplier" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span>{supplier.location}, {supplier.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTierColor(supplier.tier)}`}>
                    {supplier.tier}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= Math.floor(supplier.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-slate-900">{supplier.rating}</span>
                    <span className="text-sm text-slate-600">({supplier.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-600">Min Order</p>
                    <p className="font-semibold text-slate-900">{supplier.minOrder} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Lead Time</p>
                    <p className="font-semibold text-slate-900">{supplier.leadTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Response Time</p>
                    <p className="font-semibold text-slate-900">{supplier.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Pricing</p>
                    <p className={`font-semibold ${getPricingColor(supplier.pricing)}`}>{supplier.pricing}</p>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <p className="text-xs text-slate-600 mb-2">Certifications:</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.certifications.map((cert, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Commission Badge */}
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Commission Rate</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">{supplier.commission}%</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={`/marketplace/${supplier.id}`}
                    className="flex-1 btn-primary text-center py-2 text-sm"
                  >
                    View Profile
                  </Link>
                  <button className="flex-1 btn-secondary py-2 text-sm">
                    Send RFQ
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>{supplier.completedOrders} orders completed</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No suppliers found</h3>
            <p className="text-slate-600">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
