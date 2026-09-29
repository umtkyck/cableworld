import Link from 'next/link'
import { Upload, FileText, Cpu, ShoppingCart, Wrench, Code, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Documentation',
  description:
    'Guides for uploading designs, getting quotes, ordering, and integrating with the Harness Cart API.',
}

export default function DocumentationPage() {
  const guides = [
    {
      icon: Upload,
      title: 'Uploading Your Design',
      description:
        'Supported file formats (STEP, DXF, PDF, Excel, images), file size limits, and tips for getting the most accurate automated quote.',
      href: '/quote',
    },
    {
      icon: Cpu,
      title: 'How AI Parsing Works',
      description:
        'How our AI extracts connectors, wire gauges, lengths, and labels from your drawings, and how to review the parsed bill of materials.',
      href: '/how-it-works',
    },
    {
      icon: FileText,
      title: 'Understanding Your Quote',
      description:
        'Line-item pricing, lead time options, DFM warnings, and how alternative components affect cost and availability.',
      href: '/pricing',
    },
    {
      icon: ShoppingCart,
      title: 'Ordering & Tracking',
      description:
        'Placing orders, payment options, production milestones, shipping, and tracking everything from your dashboard.',
      href: '/dashboard',
    },
    {
      icon: Wrench,
      title: 'Cable Designer Tool',
      description:
        'Build custom cables from scratch in the browser: pick connectors, wire types, lengths, and options with live pricing.',
      href: '/cable-designer',
    },
    {
      icon: Code,
      title: 'API Reference',
      description:
        'Integrate instant quoting and order management directly into your own tools with our REST API.',
      href: '/api-reference',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">Documentation</h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-200 sm:text-2xl">
            Everything you need to go from design file to delivered harness.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, index) => {
              const Icon = guide.icon
              return (
                <Link key={index} href={guide.href} className="card group">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-green/10 transition-transform group-hover:scale-110">
                    <Icon className="h-7 w-7 text-accent-green" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {guide.title}
                  </h3>
                  <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                    {guide.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-primary-500">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
          <div className="mt-16 text-center">
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              Can't find what you're looking for?
            </p>
            <Link href="/support" className="btn-primary inline-flex">
              Visit Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
