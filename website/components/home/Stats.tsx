import { TrendingUp, Users, Globe, Award } from 'lucide-react'

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Happy Customers',
      color: 'text-accent-green',
    },
    {
      icon: Globe,
      value: '1M+',
      label: 'Harnesses Manufactured',
      color: 'text-accent-blue',
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'On-Time Delivery',
      color: 'text-accent-yellow',
    },
    {
      icon: Award,
      value: '150+',
      label: 'Countries Served',
      color: 'text-accent-green',
    },
  ]

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="animate-scale-in text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center ${stat.color} mb-4 rounded-full bg-white shadow-soft dark:bg-slate-800`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <div className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
