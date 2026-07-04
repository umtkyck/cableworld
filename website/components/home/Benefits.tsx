import { Clock, DollarSign, Target, Shield } from 'lucide-react'
import Image from 'next/image'

export default function Benefits() {
  const benefits = [
    {
      icon: Clock,
      title: '70% Faster Time-to-Market',
      description: 'Instant quotes and rapid prototyping mean your products reach customers weeks sooner.',
      stat: '10 weeks → 3 weeks'
    },
    {
      icon: DollarSign,
      title: 'Up to 30% Cost Savings',
      description: 'Competitive global pricing and volume discounts reduce your manufacturing costs.',
      stat: 'Average savings: $800/unit'
    },
    {
      icon: Target,
      title: '95% Fewer Manufacturing Issues',
      description: 'AI-powered DFM analysis catches problems before production starts.',
      stat: '99.5% quality rate'
    },
    {
      icon: Shield,
      title: '100% On-Time Guarantee',
      description: 'We guarantee on-time delivery or your next order is free.',
      stat: '95% delivered early'
    }
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative animate-slide-up">
            <div className="aspect-square bg-gradient-to-br from-accent-green/20 to-accent-blue/20 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                {/* Placeholder for actual image */}
                <div className="text-center">
                  <div className="text-6xl mb-4">🔌</div>
                  <p className="text-lg font-medium">Professional Cable Harness Assembly</p>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-xl shadow-large p-6 max-w-xs">
              <div className="text-4xl font-bold text-accent-green mb-2">10,000+</div>
              <p className="text-slate-600 dark:text-slate-400">Engineers trust Harness Cart for their critical projects</p>
            </div>
          </div>

          {/* Right - Benefits */}
          <div className="animate-slide-up animation-delay-200">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Why Leading Companies Choose Harness Cart
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Join thousands of engineers who have accelerated their product development with our platform.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center group-hover:bg-accent-green group-hover:scale-110 transition-all">
                      <Icon className="w-6 h-6 text-accent-green group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">{benefit.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">{benefit.description}</p>
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
