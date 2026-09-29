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
      description:
        'Upload a design file and receive an instant quote with line-item pricing and lead times.',
    },
    {
      method: 'GET',
      path: '/v1/quotes/{id}',
      description:
        'Retrieve a previously generated quote, including DFM warnings and alternatives.',
    },
    {
      method: 'POST',
      path: '/v1/orders',
      description: 'Convert an accepted quote into a production order.',
    },
    {
      method: 'GET',
      path: '/v1/orders/{id}',
      description:
        'Track order status: production milestones, test results, and shipping information.',
    },
    {
      method: 'GET',
      path: '/v1/components/search',
      description:
        'Search real-time component pricing and stock across Digikey, Mouser, and Newark.',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-gradient-to-br from-slate-800 to-slate-950 text-white">
        <div className="container-custom text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Code className="h-8 w-8 text-orange-400" />
          </div>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">API Reference</h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-300 sm:text-2xl">
            Integrate instant quoting and order management into your own tools.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="mb-16 grid gap-6 sm:grid-cols-3">
            <div className="card text-center">
              <Key className="mx-auto mb-3 h-8 w-8 text-accent-green" />
              <h3 className="mb-1 font-bold text-slate-900 dark:text-slate-100">API Keys</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Generate keys from your dashboard settings
              </p>
            </div>
            <div className="card text-center">
              <Zap className="mx-auto mb-3 h-8 w-8 text-accent-blue" />
              <h3 className="mb-1 font-bold text-slate-900 dark:text-slate-100">REST + JSON</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Standard HTTPS endpoints with JSON payloads
              </p>
            </div>
            <div className="card text-center">
              <Package className="mx-auto mb-3 h-8 w-8 text-orange-500" />
              <h3 className="mb-1 font-bold text-slate-900 dark:text-slate-100">Webhooks</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Real-time order status notifications
              </p>
            </div>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            Endpoints
          </h2>
          <div className="mb-16 space-y-4">
            {endpoints.map((endpoint, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-2 flex items-center gap-3 font-mono text-sm">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-bold ${
                      endpoint.method === 'POST'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-slate-900 dark:text-slate-100">{endpoint.path}</code>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{endpoint.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-emerald-500/10 p-8 text-center">
            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">
              API access is currently in private beta
            </h3>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              Contact us to get early access and detailed endpoint documentation.
            </p>
            <Link href="/contact" className="btn-primary inline-flex">
              Request API Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
