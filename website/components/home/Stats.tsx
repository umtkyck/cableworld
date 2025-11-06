import { TrendingUp, Users, Globe, Award } from 'lucide-react'

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Happy Customers',
      color: 'text-accent-green'
    },
    {
      icon: Globe,
      value: '1M+',
      label: 'Harnesses Manufactured',
      color: 'text-accent-blue'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'On-Time Delivery',
      color: 'text-accent-yellow'
    },
    {
      icon: Award,
      value: '150+',
      label: 'Countries Served',
      color: 'text-accent-green'
    }
  ]

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center animate-scale-in" style={{animationDelay: `${index * 100}ms`}}>
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.color} bg-white rounded-full shadow-soft mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
