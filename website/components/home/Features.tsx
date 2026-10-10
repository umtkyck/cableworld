import { Zap, Shield, Globe, BarChart3, Code, Wrench } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Instant Quotes',
      description: 'Get accurate quotes in under 60 seconds. No more waiting days for pricing.',
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'All manufacturers are vetted and certified. ISO 9001, UL, and RoHS compliance.',
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Access 50+ manufacturers worldwide. Get the best price and fastest delivery.',
    },
    {
      icon: BarChart3,
      title: 'DFM Analysis',
      description: 'AI-powered design for manufacturing checks catch issues before production.',
    },
    {
      icon: Code,
      title: 'API Integration',
      description: 'Real-time component pricing from Digikey, Mouser, Newark, and more.',
    },
    {
      icon: Wrench,
      title: 'Design Services',
      description: 'Need help? Our engineers provide custom harness design consultation.',
    },
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Everything you need to build better products
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            From instant quotes to global manufacturing, we handle the complexity so you can focus
            on innovation.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white p-8 transition-colors duration-200 hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                <Icon className="mb-5 h-5 w-5 text-slate-900 dark:text-white" strokeWidth={1.75} />
                <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
