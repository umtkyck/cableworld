'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import {
  Shield,
  Package,
  FileText,
  Users,
  DollarSign,
  ExternalLink,
  ChevronRight,
  Lock
} from 'lucide-react'

// Operational data would come from a backend in production; these mirror the
// mock orders shown elsewhere on the site.
const recentOrders = [
  { id: 'ORD-2024-00126', customer: 'Acme Robotics', total: 750.0, status: 'Pending', statusColor: 'text-yellow-600 bg-yellow-50' },
  { id: 'ORD-2024-00125', customer: 'Midwest Controls', total: 2700.0, status: 'Processing', statusColor: 'text-blue-600 bg-blue-50' },
  { id: 'ORD-2024-00124', customer: 'Vertex Automation', total: 2125.0, status: 'Shipped', statusColor: 'text-purple-600 bg-purple-50' },
  { id: 'ORD-2024-00123', customer: 'Acme Robotics', total: 2500.0, status: 'Delivered', statusColor: 'text-green-600 bg-green-50' }
]

const externalTools = [
  { name: 'Stripe Dashboard', description: 'Payments, refunds, payouts', href: 'https://dashboard.stripe.com' },
  { name: 'Firebase Console', description: 'Users, authentication providers', href: 'https://console.firebase.google.com' },
  { name: 'Vercel', description: 'Deployments, environment variables', href: 'https://vercel.com/dashboard' },
  { name: 'Mercury', description: 'Bank transfers (ACH / wire) reconciliation', href: 'https://mercury.com' }
]

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <Lock className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Admin Access Required</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {user
              ? 'Your account does not have administrator access.'
              : 'Please sign in with an administrator account to view this page.'}
          </p>
          <Link href={user ? '/dashboard' : '/login'} className="btn-primary inline-flex">
            {user ? 'Back to Dashboard' : 'Sign In'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center">
            <Shield className="w-6 h-6 text-white dark:text-slate-900" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Console</h1>
            <p className="text-slate-600 dark:text-slate-400">
              God mode · signed in as {user.email}
            </p>
          </div>
        </div>

        {/* Overview stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Open Orders', value: '2', icon: Package },
            { label: 'Quotes This Week', value: '11', icon: FileText },
            { label: 'Registered Users', value: '38', icon: Users },
            { label: 'Revenue (30d)', value: '$8,075', icon: DollarSign }
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-soft">
                <Icon className="w-6 h-6 text-slate-400 mb-4" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent orders */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Orders — All Customers</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-3 font-medium">Order</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium text-right">Total</th>
                  <th className="px-6 py-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                    <td className="px-6 py-3 font-mono text-slate-900 dark:text-white">{order.id}</td>
                    <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{order.customer}</td>
                    <td className="px-6 py-3 text-right font-medium text-slate-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* External tools */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Operations</h2>
            <div className="space-y-3">
              {externalTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 hover:border-slate-400 dark:hover:border-slate-500 transition group"
                >
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{tool.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{tool.description}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
