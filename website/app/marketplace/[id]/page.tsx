'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  CheckCircle,
  Shield,
  Clock,
  Package,
  ArrowLeft,
  MessageSquare,
  FileText,
  Award
} from 'lucide-react'

// Mock supplier data - would come from backend in production
const mockSuppliers: Record<string, {
  id: string
  name: string
  logo: string
  location: string
  country: string
  description: string
  longDescription: string
  rating: number
  reviewCount: number
  verified: boolean
  yearsInBusiness: number
  employeeCount: string
  specialties: string[]
  certifications: string[]
  minOrderValue: string
  leadTime: string
  responseTime: string
  completedOrders: number
  repeatCustomerRate: string
  products: Array<{
    id: string
    name: string
    price: string
    image: string
  }>
  reviews: Array<{
    id: string
    author: string
    company: string
    rating: number
    date: string
    comment: string
  }>
}> = {
  'precision-cables': {
    id: 'precision-cables',
    name: 'Precision Cables Inc.',
    logo: '🏭',
    location: 'Los Angeles, CA',
    country: 'United States',
    description: 'Leading manufacturer of custom cable harnesses for automotive and aerospace industries.',
    longDescription: 'Precision Cables Inc. has been at the forefront of custom cable manufacturing for over 25 years. Our state-of-the-art facilities in Los Angeles produce high-quality cable harnesses for demanding applications in automotive, aerospace, and industrial sectors. We pride ourselves on our quick turnaround times, competitive pricing, and exceptional quality control processes.',
    rating: 4.9,
    reviewCount: 156,
    verified: true,
    yearsInBusiness: 25,
    employeeCount: '201-500',
    specialties: ['Automotive Wiring', 'Aerospace Cables', 'Custom Cable Harnesses', 'Wire Assemblies'],
    certifications: ['ISO 9001', 'AS9100', 'IATF 16949', 'UL Listed'],
    minOrderValue: '$500',
    leadTime: '2-3 weeks',
    responseTime: '< 2 hours',
    completedOrders: 2847,
    repeatCustomerRate: '89%',
    products: [
      { id: '1', name: 'Automotive Harness Type A', price: 'From $45', image: '🔌' },
      { id: '2', name: 'Aerospace Grade Cable', price: 'From $120', image: '✈️' },
      { id: '3', name: 'Industrial Power Cable', price: 'From $85', image: '⚡' },
      { id: '4', name: 'Custom Wire Assembly', price: 'Request Quote', image: '🔧' }
    ],
    reviews: [
      {
        id: '1',
        author: 'Michael Chen',
        company: 'AutoTech Manufacturing',
        rating: 5,
        date: '2024-01-15',
        comment: 'Excellent quality and fast delivery. The team was very responsive to our custom requirements.'
      },
      {
        id: '2',
        author: 'Sarah Johnson',
        company: 'AeroSpace Dynamics',
        rating: 5,
        date: '2024-01-08',
        comment: 'We\'ve been working with Precision Cables for 3 years now. Consistently high quality and professional service.'
      },
      {
        id: '3',
        author: 'David Kim',
        company: 'Industrial Solutions Ltd',
        rating: 4,
        date: '2023-12-20',
        comment: 'Good products and fair pricing. Would recommend for industrial applications.'
      }
    ]
  }
}

// Default supplier for unknown IDs
const defaultSupplier = {
  id: 'unknown',
  name: 'Cable Solutions Co.',
  logo: '🏢',
  location: 'New York, NY',
  country: 'United States',
  description: 'Professional cable harness manufacturer serving various industries.',
  longDescription: 'We are a professional cable harness manufacturer with years of experience serving various industries including automotive, telecommunications, and industrial automation.',
  rating: 4.5,
  reviewCount: 42,
  verified: true,
  yearsInBusiness: 10,
  employeeCount: '51-200',
  specialties: ['Custom Cable Harnesses', 'Wire Assemblies', 'Connector Solutions'],
  certifications: ['ISO 9001', 'UL Listed'],
  minOrderValue: '$250',
  leadTime: '2-4 weeks',
  responseTime: '< 4 hours',
  completedOrders: 523,
  repeatCustomerRate: '75%',
  products: [],
  reviews: []
}

export default function SupplierProfilePage() {
  const params = useParams()
  const supplierId = params.id as string
  const supplier = mockSuppliers[supplierId] || { ...defaultSupplier, id: supplierId, name: `Supplier ${supplierId}` }

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'reviews'>('overview')
  const [showContactForm, setShowContactForm] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-custom py-8">
          <Link
            href="/marketplace"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo & Basic Info */}
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center text-5xl">
                {supplier.logo}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-slate-900">{supplier.name}</h1>
                  {supplier.verified && (
                    <span className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-slate-600 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {supplier.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {supplier.rating} ({supplier.reviewCount} reviews)
                  </span>
                </div>
                <p className="text-slate-600 max-w-xl">{supplier.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="md:ml-auto flex flex-col gap-3">
              <button
                onClick={() => setShowContactForm(true)}
                className="btn-primary justify-center"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Supplier
              </button>
              <Link
                href={`/quote?supplier=${supplier.id}`}
                className="px-6 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition text-center"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-10">
        <div className="container-custom">
          <div className="flex gap-8">
            {(['overview', 'products', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 border-b-2 font-medium capitalize transition ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
                {tab === 'reviews' && ` (${supplier.reviewCount})`}
                {tab === 'products' && ` (${supplier.products.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">About</h2>
                <p className="text-slate-600">{supplier.longDescription}</p>
              </div>

              {/* Specialties */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {supplier.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Certifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {supplier.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                    >
                      <Award className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-slate-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Facts</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Years in Business</p>
                      <p className="font-medium text-slate-900">{supplier.yearsInBusiness} years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Completed Orders</p>
                      <p className="font-medium text-slate-900">{supplier.completedOrders.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Response Time</p>
                      <p className="font-medium text-slate-900">{supplier.responseTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Repeat Customers</p>
                      <p className="font-medium text-slate-900">{supplier.repeatCustomerRate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-5 h-5" />
                    <span>{supplier.location}, {supplier.country}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-5 h-5" />
                    <span>Lead Time: {supplier.leadTime}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <FileText className="w-5 h-5" />
                    <span>Min. Order: {supplier.minOrderValue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            {supplier.products.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {supplier.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="aspect-square bg-slate-100 flex items-center justify-center text-6xl">
                      {product.image}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">{product.name}</h3>
                      <p className="text-primary-600 font-medium">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center">
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Products Listed</h3>
                <p className="text-slate-600">
                  Contact the supplier directly for product information and quotes.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-3xl">
            {supplier.reviews.length > 0 ? (
              <div className="space-y-6">
                {supplier.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl p-6 border border-slate-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">{review.author}</h3>
                        <p className="text-sm text-slate-500">{review.company}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600">{review.comment}</p>
                    <p className="text-sm text-slate-400 mt-4">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center">
                <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Reviews Yet</h3>
                <p className="text-slate-600">
                  Be the first to review this supplier after placing an order.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact {supplier.name}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Product inquiry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe your requirements..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary justify-center"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
