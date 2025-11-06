import { Upload, Zap, Factory, Truck, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: 'Upload Your Design',
      description: 'Upload your cable harness design files (CAD, Excel, PDF, or images). Our AI analyzes your specifications instantly.',
      details: [
        'Supports multiple file formats',
        'AI-powered component detection',
        'Automatic BOM extraction',
        'Design validation'
      ]
    },
    {
      number: 2,
      icon: Zap,
      title: 'Get Instant Quote',
      description: 'Receive a detailed quote in under 60 seconds with pricing, lead time, and DFM feedback.',
      details: [
        'Real-time pricing calculation',
        'Multiple manufacturer options',
        'DFM analysis included',
        'Alternative component suggestions'
      ]
    },
    {
      number: 3,
      icon: CheckCircle,
      title: 'Review & Approve',
      description: 'Review the quote, make any adjustments, and approve. Our team verifies your design before production.',
      details: [
        'Interactive quote review',
        'Design revision support',
        'Engineering consultation',
        'Clear approval process'
      ]
    },
    {
      number: 4,
      icon: Factory,
      title: 'Manufacturing Begins',
      description: 'Your order is sent to our certified manufacturing partner. Track progress in real-time.',
      details: [
        'IPC-620 certified facilities',
        '100% electrical testing',
        'Quality control checkpoints',
        'Real-time status updates'
      ]
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
        'Fast, tracked shipping'
      ]
    }
  ]

  const benefits = [
    {
      stat: '< 60 sec',
      label: 'Quote Time'
    },
    {
      stat: '7-10 days',
      label: 'Standard Lead Time'
    },
    {
      stat: '99.5%',
      label: 'On-Time Delivery'
    },
    {
      stat: '100%',
      label: 'Quality Tested'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            How CableWorld Works
          </h1>
          <p className="text-xl sm:text-2xl text-slate-200 max-w-3xl mx-auto mb-8">
            From design to delivery in 5 simple steps
          </p>
          <Link href="/quote" className="btn bg-accent-green text-white hover:bg-accent-green/90 text-lg inline-flex">
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-soft">
                <div className="text-3xl sm:text-4xl font-bold text-accent-green mb-2">
                  {benefit.stat}
                </div>
                <div className="text-sm sm:text-base text-slate-600">{benefit.label}</div>
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
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                  {/* Icon & Number */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-accent-green to-accent-blue rounded-2xl flex items-center justify-center shadow-large">
                        <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-medium">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-slate-600 mb-6">
                      {step.description}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail, dIndex) => (
                        <li key={dIndex} className="flex items-center gap-2 text-slate-600">
                          <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
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
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Powered by Advanced Technology
            </h2>
            <p className="text-lg text-slate-600">
              Our platform uses AI and automation to deliver speed and accuracy
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-soft">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Design Analysis</h3>
              <p className="text-slate-600">
                Machine learning algorithms analyze your designs for manufacturability, suggesting improvements and catching errors before production.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-soft">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Quoting Engine</h3>
              <p className="text-slate-600">
                Real-time pricing from our global manufacturer network, considering materials, labor, and logistics for accurate quotes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-soft">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Network</h3>
              <p className="text-slate-600">
                Access to 150+ certified manufacturers worldwide ensures competitive pricing, fast delivery, and reliable quality.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-soft">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-Time Tracking</h3>
              <p className="text-slate-600">
                Monitor your order status, production milestones, and shipping updates from a single dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-12 lg:p-16 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Upload your design and get an instant quote in under 60 seconds
            </p>
            <Link href="/quote" className="btn bg-accent-green text-white hover:bg-accent-green/90 text-lg inline-flex">
              Get Your Quote Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
