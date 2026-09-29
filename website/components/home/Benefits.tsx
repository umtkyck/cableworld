import { Clock, DollarSign, Target, Shield } from 'lucide-react'

export default function Benefits() {
  const benefits = [
    {
      icon: Clock,
      title: '70% Faster Time-to-Market',
      description:
        'Instant quotes and rapid prototyping mean your products reach customers weeks sooner.',
      stat: '10 weeks → 3 weeks',
    },
    {
      icon: DollarSign,
      title: 'Up to 30% Cost Savings',
      description:
        'Competitive global pricing and volume discounts reduce your manufacturing costs.',
      stat: 'Average savings: $800/unit',
    },
    {
      icon: Target,
      title: '95% Fewer Manufacturing Issues',
      description: 'AI-powered DFM analysis catches problems before production starts.',
      stat: '99.5% quality rate',
    },
    {
      icon: Shield,
      title: '100% On-Time Guarantee',
      description: 'We guarantee on-time delivery or your next order is free.',
      stat: '95% delivered early',
    },
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left - Image */}
          <div className="relative animate-slide-up">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-accent-green/20 to-accent-blue/20">
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                {/* Placeholder for actual image */}
                <div className="text-center">
                  <div className="mb-4 text-6xl">🔌</div>
                  <p className="text-lg font-medium">Professional Cable Harness Assembly</p>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 max-w-xs rounded-xl bg-white p-6 shadow-large dark:bg-slate-800">
              <div className="mb-2 text-4xl font-bold text-accent-green">10,000+</div>
              <p className="text-slate-600 dark:text-slate-400">
                Engineers trust Harness Cart for their critical projects
              </p>
            </div>
          </div>

          {/* Right - Benefits */}
          <div className="animation-delay-200 animate-slide-up">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
              Why Leading Companies Choose Harness Cart
            </h2>
            <p className="mb-8 text-xl text-slate-600 dark:text-slate-400">
              Join thousands of engineers who have accelerated their product development with our
              platform.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="group flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent-green/10 transition-all group-hover:scale-110 group-hover:bg-accent-green">
                      <Icon className="h-6 w-6 text-accent-green transition-colors group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-slate-100">
                        {benefit.title}
                      </h3>
                      <p className="mb-2 text-slate-600 dark:text-slate-400">
                        {benefit.description}
                      </p>
                      <div className="text-sm font-semibold text-accent-green">{benefit.stat}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
