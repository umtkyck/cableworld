'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import RequireAuth from '@/components/auth/RequireAuth'
import { useAuth } from '@/context/AuthContext'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'
import type { OrderRecord } from '@/lib/orders/types'
import { Shield, Package, FileText, Users, DollarSign, ExternalLink } from 'lucide-react'

const externalTools = [
  {
    name: 'Stripe Dashboard',
    description: 'Payments, refunds, payouts',
    href: 'https://dashboard.stripe.com',
  },
  {
    name: 'Firebase Console',
    description: 'Users, authentication providers',
    href: 'https://console.firebase.google.com/project/harnesscart',
  },
  {
    name: 'Vercel',
    description: 'Deployments, environment variables',
    href: 'https://vercel.com/dashboard',
  },
  {
    name: 'Mercury',
    description: 'Bank transfers (ACH / wire) reconciliation',
    href: 'https://mercury.com',
  },
]

function statusColor(status: OrderRecord['status']) {
  switch (status) {
    case 'awaiting_payment':
      return 'text-orange-600 bg-orange-50'
    case 'pending':
      return 'text-yellow-600 bg-yellow-50'
    case 'processing':
      return 'text-blue-600 bg-blue-50'
    case 'shipped':
      return 'text-purple-600 bg-purple-50'
    case 'delivered':
      return 'text-green-600 bg-green-50'
    case 'cancelled':
      return 'text-red-600 bg-red-50'
    default: {
      const _exhaustive: never = status
      return _exhaustive
    }
  }
}

function AdminContent() {
  const { user } = useAuth()
  const authFetch = useAuthFetch()
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [stats, setStats] = useState({
    openOrders: 0,
    quotesThisWeek: 0,
    registeredUsers: 0,
    revenue30d: 0,
  })

  useEffect(() => {
    authFetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => setOrders([]))

    authFetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => undefined)
  }, [authFetch])

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="container-custom">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 dark:bg-white">
            <Shield className="h-6 w-6 text-white dark:text-slate-900" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Console</h1>
            <p className="text-slate-600 dark:text-slate-400">
              God mode · signed in as {user?.email}
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Open Orders', value: String(stats.openOrders), icon: Package },
            { label: 'Quotes This Week', value: String(stats.quotesThisWeek), icon: FileText },
            { label: 'Registered Users', value: String(stats.registeredUsers), icon: Users },
            {
              label: 'Revenue (30d)',
              value: `$${stats.revenue30d.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
              icon: DollarSign,
            },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="rounded-xl bg-white p-6 shadow-soft dark:bg-slate-800"
              >
                <Icon className="mb-4 h-6 w-6 text-slate-400" />
                <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl bg-white shadow-soft dark:bg-slate-800 lg:col-span-2">
            <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Recent Orders — All Customers
              </h2>
            </div>
            {orders.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No orders in Firestore yet.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    <th className="px-6 py-3 font-medium">Order</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 text-right font-medium">Total</th>
                    <th className="px-6 py-3 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 20).map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 last:border-0 dark:border-slate-700/50"
                    >
                      <td className="px-6 py-3 font-mono text-slate-900 dark:text-white">
                        {order.orderRef}
                      </td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">
                        {order.customerEmail}
                      </td>
                      <td className="px-6 py-3 text-right font-medium text-slate-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(order.status)}`}
                        >
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="rounded-xl bg-white p-6 shadow-soft dark:bg-slate-800">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Operations
            </h2>
            <div className="space-y-3">
              {externalTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-3 transition hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500"
                >
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      {tool.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {tool.description}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 flex-shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
              Enable Facebook & Apple sign-in in{' '}
              <Link
                href="https://console.firebase.google.com/project/harnesscart/authentication/providers"
                className="underline"
              >
                Firebase Console
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <RequireAuth adminOnly>
      <AdminContent />
    </RequireAuth>
  )
}
