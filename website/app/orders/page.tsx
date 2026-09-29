'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  ChevronRight,
  MapPin,
  Calendar,
  FileText,
  ArrowLeft,
  type LucideIcon,
} from 'lucide-react'

// Mock orders data - would come from backend in production
const mockOrders = [
  {
    id: 'ORD-2024-00123',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      { name: 'Custom Cable Harness - Type A', quantity: 50, price: 45.0 },
      { name: 'DB9 Connectors', quantity: 100, price: 2.5 },
    ],
    total: 2500.0,
    tracking: 'TRK-123456789',
    deliveryDate: '2024-01-22',
  },
  {
    id: 'ORD-2024-00124',
    date: '2024-01-20',
    status: 'shipped',
    items: [{ name: 'Industrial Power Cable', quantity: 25, price: 85.0 }],
    total: 2125.0,
    tracking: 'TRK-987654321',
    estimatedDelivery: '2024-01-28',
  },
  {
    id: 'ORD-2024-00125',
    date: '2024-01-25',
    status: 'processing',
    items: [
      { name: 'Ethernet Cable Assembly', quantity: 200, price: 12.0 },
      { name: 'RJ45 Connectors', quantity: 400, price: 0.75 },
    ],
    total: 2700.0,
    tracking: null,
    estimatedDelivery: '2024-02-05',
  },
  {
    id: 'ORD-2024-00126',
    date: '2024-01-28',
    status: 'pending',
    items: [{ name: 'Custom Prototype Cable', quantity: 5, price: 150.0 }],
    total: 750.0,
    tracking: null,
    estimatedDelivery: null,
  },
]

const statusConfig: Record<
  string,
  { label: string; icon: LucideIcon; color: string; bgColor: string }
> = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  processing: {
    label: 'Processing',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  shipped: {
    label: 'Shipped',
    icon: Truck,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  cancelled: {
    label: 'Cancelled',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
}

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md text-center">
          <Package className="mx-auto mb-6 h-16 w-16 text-slate-300" />
          <h1 className="mb-4 text-2xl font-bold text-slate-900">Sign In to View Orders</h1>
          <p className="mb-8 text-slate-600">
            Please sign in to your account to view and track your orders.
          </p>
          <Link href="/login" className="btn-primary inline-flex">
            Sign In
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
          <p className="mt-2 text-slate-600">View and track all your orders</p>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by order ID or product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <Package className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <h2 className="mb-2 text-xl font-semibold text-slate-900">No Orders Found</h2>
            <p className="mb-6 text-slate-600">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : "You haven't placed any orders yet."}
            </p>
            <Link href="/shop" className="btn-primary inline-flex">
              Browse Products
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.pending
              const StatusIcon = status.icon
              const isExpanded = expandedOrder === order.id

              return (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Order Header */}
                  <div
                    className="cursor-pointer p-4 transition hover:bg-slate-50 md:p-6"
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-12 w-12 rounded-full ${status.bgColor} flex items-center justify-center`}
                        >
                          <StatusIcon className={`h-6 w-6 ${status.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{order.id}</h3>
                          <p className="text-sm text-slate-600">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''} • $
                            {order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${status.bgColor} ${status.color}`}
                          >
                            {status.label}
                          </span>
                          <p className="mt-1 text-sm text-slate-500">
                            Ordered {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Details (Expanded) */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50 p-4 md:p-6">
                      {/* Items */}
                      <div className="mb-6">
                        <h4 className="mb-3 font-semibold text-slate-900">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-slate-700">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="font-medium text-slate-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                          <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 font-semibold">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tracking & Delivery Info */}
                      <div className="grid gap-4 md:grid-cols-3">
                        {order.tracking && (
                          <div className="flex items-start gap-3">
                            <MapPin className="mt-0.5 h-5 w-5 text-slate-400" />
                            <div>
                              <p className="text-sm font-medium text-slate-900">Tracking Number</p>
                              <p className="text-sm text-primary-600">{order.tracking}</p>
                            </div>
                          </div>
                        )}
                        {(order.estimatedDelivery || order.deliveryDate) && (
                          <div className="flex items-start gap-3">
                            <Calendar className="mt-0.5 h-5 w-5 text-slate-400" />
                            <div>
                              <p className="text-sm font-medium text-slate-900">
                                {order.deliveryDate ? 'Delivered On' : 'Estimated Delivery'}
                              </p>
                              <p className="text-sm text-slate-600">
                                {new Date(
                                  order.deliveryDate || order.estimatedDelivery || ''
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <FileText className="mt-0.5 h-5 w-5 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">Invoice</p>
                            <button className="text-sm text-primary-600 hover:text-primary-700">
                              Download PDF
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex flex-wrap gap-3">
                        {order.tracking && (
                          <button className="btn-primary text-sm">Track Shipment</button>
                        )}
                        <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                          View Details
                        </button>
                        <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                          Reorder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
