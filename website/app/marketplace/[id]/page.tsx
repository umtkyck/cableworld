'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Building2,
  MapPin,
  Star,
  CheckCircle,
  Shield,
  Clock,
  Package,
  ArrowLeft,
  MessageSquare,
  FileText,
  Award,
} from 'lucide-react'

// Mock supplier data - would come from backend in production
const mockSuppliers: Record<
  string,
  {
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
  }
> = {
  'precision-cables': {
    id: 'precision-cables',
    name: 'Precision Cables Inc.',
    logo: '🏭',
    location: 'Los Angeles, CA',
    country: 'United States',
    description:
      'Leading manufacturer of custom cable harnesses for automotive and aerospace industries.',
    longDescription:
      'Precision Cables Inc. has been at the forefront of custom cable manufacturing for over 25 years. Our state-of-the-art facilities in Los Angeles produce high-quality cable harnesses for demanding applications in automotive, aerospace, and industrial sectors. We pride ourselves on our quick turnaround times, competitive pricing, and exceptional quality control processes.',
    rating: 4.9,
    reviewCount: 156,
    verified: true,
    yearsInBusiness: 25,
    employeeCount: '201-500',
    specialties: [
      'Automotive Wiring',
      'Aerospace Cables',
      'Custom Cable Harnesses',
      'Wire Assemblies',
    ],
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
      { id: '4', name: 'Custom Wire Assembly', price: 'Request Quote', image: '🔧' },
    ],
    reviews: [
      {
        id: '1',
        author: 'Michael Chen',
        company: 'AutoTech Manufacturing',
        rating: 5,
        date: '2024-01-15',
        comment:
          'Excellent quality and fast delivery. The team was very responsive to our custom requirements.',
      },
      {
        id: '2',
        author: 'Sarah Johnson',
        company: 'AeroSpace Dynamics',
        rating: 5,
        date: '2024-01-08',
        comment:
          "We've been working with Precision Cables for 3 years now. Consistently high quality and professional service.",
      },
      {
        id: '3',
        author: 'David Kim',
        company: 'Industrial Solutions Ltd',
        rating: 4,
        date: '2023-12-20',
        comment: 'Good products and fair pricing. Would recommend for industrial applications.',
      },
    ],
  },
}

// Default supplier for unknown IDs
const defaultSupplier = {
  id: 'unknown',
  name: 'Cable Solutions Co.',
  logo: '🏢',
  location: 'New York, NY',
  country: 'United States',
  description: 'Professional cable harness manufacturer serving various industries.',
  longDescription:
    'We are a professional cable harness manufacturer with years of experience serving various industries including automotive, telecommunications, and industrial automation.',
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
  reviews: [],
}

export default function SupplierProfilePage() {
  const params = useParams()
  const supplierId = params.id as string
  const supplier = mockSuppliers[supplierId] || {
    ...defaultSupplier,
    id: supplierId,
    name: `Supplier ${supplierId}`,
  }

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'reviews'>('overview')
  const [showContactForm, setShowContactForm] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-custom py-8">
          <Link
            href="/marketplace"
            className="mb-6 inline-flex items-center text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>

          <div className="flex flex-col gap-6 md:flex-row">
            {/* Logo & Basic Info */}
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-100 text-5xl">
                {supplier.logo}
              </div>
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">{supplier.name}</h1>
                  {supplier.verified && (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="mb-3 flex items-center gap-4 text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {supplier.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    {supplier.rating} ({supplier.reviewCount} reviews)
                  </span>
                </div>
                <p className="max-w-xl text-slate-600">{supplier.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 md:ml-auto">
              <button
                onClick={() => setShowContactForm(true)}
                className="btn-primary justify-center"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Supplier
              </button>
              <Link
                href={`/quote?supplier=${supplier.id}`}
                className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-10 border-b border-slate-200 bg-white">
        <div className="container-custom">
          <div className="flex gap-8">
            {(['overview', 'products', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 py-4 font-medium capitalize transition ${
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
          <div className="grid gap-8 md:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 md:col-span-2">
              {/* About */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">About</h2>
                <p className="text-slate-600">{supplier.longDescription}</p>
              </div>

              {/* Specialties */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {supplier.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Certifications</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {supplier.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-lg bg-slate-50 p-3">
                      <Award className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm font-medium text-slate-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Quick Facts</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Years in Business</p>
                      <p className="font-medium text-slate-900">{supplier.yearsInBusiness} years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Completed Orders</p>
                      <p className="font-medium text-slate-900">
                        {supplier.completedOrders.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Response Time</p>
                      <p className="font-medium text-slate-900">{supplier.responseTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Repeat Customers</p>
                      <p className="font-medium text-slate-900">{supplier.repeatCustomerRate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Contact</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="h-5 w-5" />
                    <span>
                      {supplier.location}, {supplier.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="h-5 w-5" />
                    <span>Lead Time: {supplier.leadTime}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <FileText className="h-5 w-5" />
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
              <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {supplier.products.map((product) => (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-lg"
                  >
                    <div className="flex aspect-square items-center justify-center bg-slate-100 text-6xl">
                      {product.image}
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 font-semibold text-slate-900">{product.name}</h3>
                      <p className="font-medium text-primary-600">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-12 text-center">
                <Package className="mx-auto mb-4 h-16 w-16 text-slate-300" />
                <h3 className="mb-2 text-xl font-semibold text-slate-900">No Products Listed</h3>
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
                  <div key={review.id} className="rounded-xl border border-slate-200 bg-white p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{review.author}</h3>
                        <p className="text-sm text-slate-500">{review.company}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600">{review.comment}</p>
                    <p className="mt-4 text-sm text-slate-400">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-12 text-center">
                <Star className="mx-auto mb-4 h-16 w-16 text-slate-300" />
                <h3 className="mb-2 text-xl font-semibold text-slate-900">No Reviews Yet</h3>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Contact {supplier.name}</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                  placeholder="Product inquiry"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe your requirements..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 justify-center">
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
