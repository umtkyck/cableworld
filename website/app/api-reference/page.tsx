import Link from 'next/link'
import { Code, Key, Zap, Package } from 'lucide-react'

export const metadata = {
  title: 'API Reference',
  description: 'REST API for instant quotes, order management, and component pricing.',
}

export default function ApiReferencePage() {
  const endpoints = [
    {
      method: 'POST',
      path: '/v1/quotes',
      description: 'Upload a design file and receive an instant quote with line-item pricing and lead times.'
    },
    {
      method: 'GET',
      path: '/v1/quotes/{id}',
      description: 'Retrieve a previously generated quote, including DFM warnings and alternatives.'
    },
    {
      method: 'POST',
      path: '/v1/orders',
      description: 'Convert an accepted quote into a production order.'
    },
    {
      method: 'GET',
      path: '/v1/orders/{id}',
      description: 'Track order status: production milestones, test results, and shipping information.'
    },
    {
      method: 'GET',
      path: '/v1/components/search',
      description: 'Search real-time component pricing and stock across Digikey, Mouser, and Newark.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-gradient-to-br from-slate-800 to-slate-950 text-white">
        <div className="container-custom text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Code className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">API Reference</h1>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto">
            Integrate instant quoting and order management into your own tools.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            <div className="card text-center">
              <Key className="w-8 h-8 text-accent-green mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">API Keys</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Generate keys from your dashboard settings</p>
            </div>
            <div className="card text-center">
              <Zap className="w-8 h-8 text-accent-blue mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">REST + JSON</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Standard HTTPS endpoints with JSON payloads</p>
            </div>
            <div className="card text-center">
              <Package className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Webhooks</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Real-time order status notifications</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">Endpoints</h2>
          <div className="space-y-4 mb-16">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2 font-mono text-sm">
                  <span className={`px-2 py-1 rounded-md font-bold text-xs ${
                    endpoint.method === 'POST'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-slate-900 dark:text-slate-100">{endpoint.path}</code>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{endpoint.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-emerald-500/10 rounded-2xl p-8 text-center border border-orange-500/20">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              API access is currently in private beta
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Contact us to get early access and detailed endpoint documentation.
            </p>
            <Link href="/contact" className="btn-primary inline-flex">Request API Access</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
