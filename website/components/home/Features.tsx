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
    }
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-4 tracking-tight">
            Everything you need to build better products
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            From instant quotes to global manufacturing, we handle the complexity
            so you can focus on innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white dark:bg-slate-950 p-8 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors duration-200">
                <Icon className="w-5 h-5 text-slate-900 dark:text-white mb-5" strokeWidth={1.75} />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
