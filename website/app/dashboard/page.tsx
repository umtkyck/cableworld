'use client'

import { Package, Clock, CheckCircle, Truck, DollarSign, FileText } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const stats = [
    { label: 'Total Orders', value: '24', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'In Production', value: '3', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Completed', value: '19', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Total Spent', value: '$45,890', icon: DollarSign, color: 'text-purple-500', bg: 'bg-purple-50' }
  ]

  const orders = [
    {
      id: 'CW-2024-1234',
      product: 'USB-C to USB-C Cable',
      quantity: 500,
      status: 'In Production',
      date: '2024-03-15',
      total: '$6,495',
      statusColor: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 'CW-2024-1233',
      product: 'HDMI 2.1 Cable',
      quantity: 250,
      status: 'Shipped',
      date: '2024-03-10',
      total: '$4,748',
      statusColor: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'CW-2024-1232',
      product: 'Automotive Wire Harness',
      quantity: 100,
      status: 'Delivered',
      date: '2024-03-05',
      total: '$12,500',
      statusColor: 'text-green-600 bg-green-50'
    },
    {
      id: 'CW-2024-1231',
      product: 'Ethernet Cat6A Cable',
      quantity: 1000,
      status: 'Delivered',
      date: '2024-02-28',
      total: '$6,990',
      statusColor: 'text-green-600 bg-green-50'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here's your order overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-soft mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/quote" className="btn border-2 border-primary-500 text-primary-500 hover:bg-primary-50 justify-center">
              <FileText className="w-5 h-5 mr-2" />
              New Quote
            </Link>
            <Link href="/shop" className="btn border-2 border-slate-300 text-slate-700 hover:bg-slate-50 justify-center">
              <Package className="w-5 h-5 mr-2" />
              Browse Products
            </Link>
            <Link href="/contact" className="btn border-2 border-slate-300 text-slate-700 hover:bg-slate-50 justify-center">
              <Truck className="w-5 h-5 mr-2" />
              Track Shipment
            </Link>
            <Link href="/contact" className="btn border-2 border-slate-300 text-slate-700 hover:bg-slate-50 justify-center">
              Support
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-slate-900">Recent Orders</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                    <td className="px-6 py-4 text-slate-600">{order.product}</td>
                    <td className="px-6 py-4 text-slate-600">{order.quantity}</td>
                    <td className="px-6 py-4 text-slate-600">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => router.push(`/orders?id=${order.id}`)}
                        className="text-primary-500 hover:text-primary-600 font-semibold text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t text-center">
            <Link href="/orders" className="text-primary-500 hover:text-primary-600 font-semibold">
              View All Orders →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
