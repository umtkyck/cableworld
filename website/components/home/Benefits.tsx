import { Clock, DollarSign, Target, Shield } from 'lucide-react'

export default function Benefits() {
  const benefits = [
    {
      icon: Clock,
      title: '70% faster time-to-market',
      description: 'Instant quotes and rapid prototyping mean your products reach customers weeks sooner.',
      stat: '10 weeks → 3 weeks'
    },
    {
      icon: DollarSign,
      title: 'Up to 30% cost savings',
      description: 'Competitive global pricing and volume discounts reduce your manufacturing costs.',
      stat: 'Average savings: $800/unit'
    },
    {
      icon: Target,
      title: '95% fewer manufacturing issues',
      description: 'AI-powered DFM analysis catches problems before production starts.',
      stat: '99.5% quality rate'
    },
    {
      icon: Shield,
      title: '100% on-time guarantee',
      description: 'We guarantee on-time delivery or your next order is free.',
      stat: '95% delivered early'
    }
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Heading */}
          <div className="lg:sticky lg:top-32">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-4 tracking-tight">
              Why leading companies choose Harness Cart
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
              Join thousands of engineers who have accelerated their product
              development with our platform.
            </p>
            <div className="border-l-2 border-slate-900 dark:border-white pl-5">
              <div className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">10,000+</div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Engineers trust Harness Cart for their critical projects
              </p>
            </div>
          </div>

          {/* Right - Benefits list */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="py-7 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-slate-900 dark:text-white" strokeWidth={1.75} />
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">{benefit.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-2">{benefit.description}</p>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{benefit.stat}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
