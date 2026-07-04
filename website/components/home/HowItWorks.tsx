import { Upload, Search, CheckCircle, Package } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Design',
      description: 'Drag and drop your harness diagram in any format - CAD, PDF, Excel, or images.',
      step: '01'
    },
    {
      icon: Search,
      title: 'AI Parsing & Matching',
      description: 'Our AI extracts components and matches them with real-time pricing from suppliers.',
      step: '02'
    },
    {
      icon: CheckCircle,
      title: 'Review Your Quote',
      description: 'Get instant quotes with 3D visualization, DFM analysis, and alternative options.',
      step: '03'
    },
    {
      icon: Package,
      title: 'Receive Your Harness',
      description: 'We handle manufacturing, testing, and shipping. Track your order in real-time.',
      step: '04'
    }
  ]

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            From Design to Delivery in 4 Simple Steps
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Our streamlined process makes getting custom cable harnesses faster and easier than ever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative animate-scale-in" style={{animationDelay: `${index * 100}ms`}}>
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-accent-green to-accent-blue -translate-x-1/2 z-0" />
                )}

                <div className="relative bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-soft hover:shadow-medium transition-shadow">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-accent-green to-accent-blue rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {step.step}
                  </div>

                  <div className="w-16 h-16 bg-gradient-to-br from-accent-green/10 to-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-accent-green" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a href="/how-it-works" className="text-accent-green hover:text-accent-green/80 font-semibold inline-flex items-center group">
            Learn more about our process
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
