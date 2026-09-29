import { Zap, Shield, Globe, BarChart3, Code, Wrench } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Instant Quotes',
      description: 'Get accurate quotes in under 60 seconds. No more waiting days for pricing.',
      color: 'bg-accent-green/10 text-accent-green',
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'All manufacturers are vetted and certified. ISO 9001, UL, and RoHS compliance.',
      color: 'bg-accent-blue/10 text-accent-blue',
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Access 50+ manufacturers worldwide. Get the best price and fastest delivery.',
      color: 'bg-accent-yellow/10 text-accent-yellow',
    },
    {
      icon: BarChart3,
      title: 'DFM Analysis',
      description: 'AI-powered design for manufacturing checks catch issues before production.',
      color: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      icon: Code,
      title: 'API Integration',
      description: 'Real-time component pricing from Digikey, Mouser, Newark, and more.',
      color: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      icon: Wrench,
      title: 'Design Services',
      description: 'Need help? Our engineers provide custom harness design consultation.',
      color: 'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
    },
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
            Everything You Need to Build Better Products
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400">
            From instant quotes to global manufacturing, we handle the complexity so you can focus
            on innovation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="card group animate-slide-up transition-all duration-300 hover:shadow-large"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`h-14 w-14 ${feature.color} mb-4 flex items-center justify-center rounded-xl transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
