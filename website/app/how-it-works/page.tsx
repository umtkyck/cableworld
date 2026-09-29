import { Upload, Zap, Factory, Truck, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: 'Upload Your Design',
      description:
        'Upload your cable harness design files (CAD, Excel, PDF, or images). Our AI analyzes your specifications instantly.',
      details: [
        'Supports multiple file formats',
        'AI-powered component detection',
        'Automatic BOM extraction',
        'Design validation',
      ],
    },
    {
      number: 2,
      icon: Zap,
      title: 'Get Instant Quote',
      description:
        'Receive a detailed quote in under 60 seconds with pricing, lead time, and DFM feedback.',
      details: [
        'Real-time pricing calculation',
        'Multiple manufacturer options',
        'DFM analysis included',
        'Alternative component suggestions',
      ],
    },
    {
      number: 3,
      icon: CheckCircle,
      title: 'Review & Approve',
      description:
        'Review the quote, make any adjustments, and approve. Our team verifies your design before production.',
      details: [
        'Interactive quote review',
        'Design revision support',
        'Engineering consultation',
        'Clear approval process',
      ],
    },
    {
      number: 4,
      icon: Factory,
      title: 'Manufacturing Begins',
      description:
        'Your order is sent to our certified manufacturing partner. Track progress in real-time.',
      details: [
        'IPC-620 certified facilities',
        '100% electrical testing',
        'Quality control checkpoints',
        'Real-time status updates',
      ],
    },
    {
      number: 5,
      icon: Truck,
      title: 'Delivery',
      description: 'Receive your cable harnesses with complete documentation and test reports.',
      details: [
        'Secure packaging',
        'Full test documentation',
        'Certificate of compliance',
        'Fast, tracked shipping',
      ],
    },
  ]

  const benefits = [
    {
      stat: '< 60 sec',
      label: 'Quote Time',
    },
    {
      stat: '7-10 days',
      label: 'Standard Lead Time',
    },
    {
      stat: '99.5%',
      label: 'On-Time Delivery',
    },
    {
      stat: '100%',
      label: 'Quality Tested',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            How Harness Cart Works
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-slate-200 sm:text-2xl">
            From design to delivery in 5 simple steps
          </p>
          <Link
            href="/quote"
            className="btn inline-flex bg-accent-green text-lg text-white hover:bg-accent-green/90"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="rounded-xl bg-white p-6 text-center shadow-soft">
                <div className="mb-2 text-3xl font-bold text-accent-green sm:text-4xl">
                  {benefit.stat}
                </div>
                <div className="text-sm text-slate-600 sm:text-base">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}
                >
                  {/* Icon & Number */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-green to-accent-blue shadow-large sm:h-32 sm:w-32">
                        <Icon className="h-12 w-12 text-white sm:h-16 sm:w-16" />
                      </div>
                      <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-xl font-bold text-white shadow-medium">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mb-6 text-lg text-slate-600">{step.description}</p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {step.details.map((detail, dIndex) => (
                        <li key={dIndex} className="flex items-center gap-2 text-slate-600">
                          <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent-green" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Powered by Advanced Technology
            </h2>
            <p className="text-lg text-slate-600">
              Our platform uses AI and automation to deliver speed and accuracy
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-soft">
              <div className="mb-4 text-4xl">🤖</div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">AI Design Analysis</h3>
              <p className="text-slate-600">
                Machine learning algorithms analyze your designs for manufacturability, suggesting
                improvements and catching errors before production.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-soft">
              <div className="mb-4 text-4xl">⚡</div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Instant Quoting Engine</h3>
              <p className="text-slate-600">
                Real-time pricing from our global manufacturer network, considering materials,
                labor, and logistics for accurate quotes.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-soft">
              <div className="mb-4 text-4xl">🌍</div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Global Network</h3>
              <p className="text-slate-600">
                Access to 150+ certified manufacturers worldwide ensures competitive pricing, fast
                delivery, and reliable quality.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-soft">
              <div className="mb-4 text-4xl">📊</div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Real-Time Tracking</h3>
              <p className="text-slate-600">
                Monitor your order status, production milestones, and shipping updates from a single
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 p-12 text-white lg:p-16">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Ready to Get Started?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-200">
              Upload your design and get an instant quote in under 60 seconds
            </p>
            <Link
              href="/quote"
              className="btn inline-flex bg-accent-green text-lg text-white hover:bg-accent-green/90"
            >
              Get Your Quote Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
