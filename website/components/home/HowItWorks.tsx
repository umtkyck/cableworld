import { Upload, Search, CheckCircle, Package } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Design',
      description: 'Drag and drop your harness diagram in any format - CAD, PDF, Excel, or images.',
      step: '01',
    },
    {
      icon: Search,
      title: 'AI Parsing & Matching',
      description:
        'Our AI extracts components and matches them with real-time pricing from suppliers.',
      step: '02',
    },
    {
      icon: CheckCircle,
      title: 'Review Your Quote',
      description:
        'Get instant quotes with 3D visualization, DFM analysis, and alternative options.',
      step: '03',
    },
    {
      icon: Package,
      title: 'Receive Your Harness',
      description: 'We handle manufacturing, testing, and shipping. Track your order in real-time.',
      step: '04',
    },
  ]

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
            From Design to Delivery in 4 Simple Steps
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400">
            Our streamlined process makes getting custom cable harnesses faster and easier than
            ever.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="relative animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-full top-20 z-0 hidden h-0.5 w-full -translate-x-1/2 bg-gradient-to-r from-accent-green to-accent-blue lg:block" />
                )}

                <div className="relative rounded-xl bg-white p-6 text-center shadow-soft transition-shadow hover:shadow-medium dark:bg-slate-800">
                  {/* Step Number */}
                  <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-green to-accent-blue font-bold text-white shadow-lg">
                    {step.step}
                  </div>

                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-green/10 to-accent-blue/10">
                    <Icon className="h-8 w-8 text-accent-green" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/how-it-works"
            className="group inline-flex items-center font-semibold text-accent-green hover:text-accent-green/80"
          >
            Learn more about our process
            <svg
              className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
