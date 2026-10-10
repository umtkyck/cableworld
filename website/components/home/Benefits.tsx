import { Clock, DollarSign, Target, Shield } from 'lucide-react'

export default function Benefits() {
  const benefits = [
    {
      icon: Clock,
      title: '70% faster time-to-market',
      description:
        'Instant quotes and rapid prototyping mean your products reach customers weeks sooner.',
      stat: '10 weeks → 3 weeks',
    },
    {
      icon: DollarSign,
      title: 'Up to 30% cost savings',
      description:
        'Competitive global pricing and volume discounts reduce your manufacturing costs.',
      stat: 'Average savings: $800/unit',
    },
    {
      icon: Target,
      title: '95% fewer manufacturing issues',
      description: 'AI-powered DFM analysis catches problems before production starts.',
      stat: '99.5% quality rate',
    },
    {
      icon: Shield,
      title: '100% on-time guarantee',
      description: 'We guarantee on-time delivery or your next order is free.',
      stat: '95% delivered early',
    },
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left - Heading */}
          <div className="lg:sticky lg:top-32">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Why leading companies choose Harness Cart
            </h2>
            <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">
              Join thousands of engineers who have accelerated their product development with our
              platform.
            </p>
            <div className="border-l-2 border-slate-900 pl-5 dark:border-white">
              <div className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                10,000+
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
                  <div className="mb-2 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-slate-900 dark:text-white" strokeWidth={1.75} />
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="mb-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {benefit.description}
                  </p>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    {benefit.stat}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
