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

  const inProduction = orders.filter(
    (o) => o.status === 'processing' || o.status === 'pending'
  ).length
  const completed = orders.filter((o) => o.status === 'delivered').length
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0)

  const stats = [
    {
      label: 'Total Orders',
      value: String(orders.length),
      icon: Package,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      label: 'In Production',
      value: String(inProduction),
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      label: 'Completed',
      value: String(completed),
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      label: 'Total Spent',
      value: `$${totalSpent.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      icon: DollarSign,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ]

  const recentOrders = orders.slice(0, 4).map((order) => ({
    id: order.orderRef,
    product: order.items[0]?.name || 'Order',
    quantity: order.items.reduce((sum, i) => sum + i.quantity, 0),
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' '),
    date: new Date(order.createdAt).toLocaleDateString(),
    total: `$${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
    statusColor:
      order.status === 'delivered'
        ? 'text-green-600 bg-green-50'
        : order.status === 'shipped'
          ? 'text-blue-600 bg-blue-50'
          : order.status === 'processing'
            ? 'text-yellow-600 bg-yellow-50'
            : 'text-slate-600 bg-slate-50',
  }))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container-custom section-padding">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome back! Here&apos;s your order overview.
          </p>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="rounded-xl bg-white p-6 shadow-soft dark:bg-slate-800"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`h-12 w-12 ${stat.bg} flex items-center justify-center rounded-lg`}
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-soft dark:bg-slate-800">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/quote"
              className="btn justify-center border-2 border-primary-500 text-primary-500 hover:bg-primary-50"
            >
              <FileText className="mr-2 h-5 w-5" />
              New Quote
            </Link>
            <Link
              href="/shop"
              className="btn justify-center border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <Package className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
            <Link
              href="/orders"
              className="btn justify-center border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <Truck className="mr-2 h-5 w-5" />
              Track Shipment
            </Link>
            <Link
              href="/contact"
              className="btn justify-center border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Support
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-soft dark:bg-slate-800">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Orders</h2>
            <Link
              href="/orders"
              className="text-sm font-semibold text-primary-500 hover:text-primary-600"
            >
              View all
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              No orders yet.{' '}
              <Link href="/shop" className="font-semibold text-primary-500">
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{order.id}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {order.product} · Qty {order.quantity}
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                    <div className="mt-1 text-sm text-slate-500">
                      {order.date} · {order.total}
                    </div>
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
