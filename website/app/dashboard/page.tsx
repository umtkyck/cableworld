'use client'

import { useEffect, useState } from 'react'
import { Package, Clock, CheckCircle, Truck, DollarSign, FileText } from 'lucide-react'
import Link from 'next/link'
import RequireAuth from '@/components/auth/RequireAuth'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'
import type { OrderRecord } from '@/lib/orders/types'

function DashboardContent() {
  const authFetch = useAuthFetch()
  const [orders, setOrders] = useState<OrderRecord[]>([])

  useEffect(() => {
    authFetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => setOrders([]))
  }, [authFetch])

  const inProduction = orders.filter((o) => o.status === 'processing' || o.status === 'pending').length
  const completed = orders.filter((o) => o.status === 'delivered').length
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0)

  const stats = [
    { label: 'Total Orders', value: String(orders.length), icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'In Production', value: String(inProduction), icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Completed', value: String(completed), icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Total Spent', value: `$${totalSpent.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: DollarSign, color: 'text-purple-500', bg: 'bg-purple-50' }
  ]

  const recentOrders = orders.slice(0, 4).map((order) => ({
    id: order.orderRef,
    product: order.items[0]?.name || 'Order',
    quantity: order.items.reduce((sum, i) => sum + i.quantity, 0),
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' '),
    date: new Date(order.createdAt).toLocaleDateString(),
    total: `$${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
    statusColor:
      order.status === 'delivered' ? 'text-green-600 bg-green-50'
      : order.status === 'shipped' ? 'text-blue-600 bg-blue-50'
      : order.status === 'processing' ? 'text-yellow-600 bg-yellow-50'
      : 'text-slate-600 bg-slate-50',
  }))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container-custom section-padding">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Welcome back! Here&apos;s your order overview.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-soft mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/quote" className="btn border-2 border-primary-500 text-primary-500 hover:bg-primary-50 justify-center">
              <FileText className="w-5 h-5 mr-2" />
              New Quote
            </Link>
            <Link href="/shop" className="btn border-2 border-slate-300 text-slate-700 hover:bg-slate-50 justify-center">
              <Package className="w-5 h-5 mr-2" />
              Browse Products
            </Link>
            <Link href="/orders" className="btn border-2 border-slate-300 text-slate-700 hover:bg-slate-50 justify-center">
              <Truck className="w-5 h-5 mr-2" />
              Track Shipment
            </Link>
            <Link href="/contact" className="btn border-2 border-slate-300 text-slate-700 hover:bg-slate-50 justify-center">
              Support
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Orders</h2>
            <Link href="/orders" className="text-sm text-primary-500 hover:text-primary-600 font-semibold">View all</Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              No orders yet. <Link href="/shop" className="text-primary-500 font-semibold">Start shopping</Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {recentOrders.map((order) => (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{order.id}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{order.product} · Qty {order.quantity}</div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}>{order.status}</span>
                    <div className="text-sm text-slate-500 mt-1">{order.date} · {order.total}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  )
}
