import { Target, Users, Globe, Award, TrendingUp, Shield } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { label: 'Manufacturing Partners', value: '150+' },
    { label: 'Countries Served', value: '45' },
    { label: 'Cable Harnesses Delivered', value: '1M+' },
    { label: 'Customer Satisfaction', value: '99.5%' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We leverage cutting-edge AI and automation to revolutionize cable harness manufacturing.'
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Your success is our success. We provide dedicated support throughout your entire journey.'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Access to a worldwide network of certified manufacturers ensures quality and fast delivery.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: '100% IPC-620 compliance and rigorous testing on every single harness we produce.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'We constantly evolve our platform based on customer feedback and industry trends.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Clear pricing, real-time updates, and honest communication at every step.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            About CableWorld
          </h1>
          <p className="text-xl sm:text-2xl text-slate-200 max-w-3xl mx-auto">
            Transforming cable harness manufacturing through technology, transparency, and trust.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-soft">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              We exist to eliminate the friction in cable harness manufacturing. By combining
              AI-powered design analysis, instant quoting, and a global manufacturer network,
              we empower engineers to bring their products to market faster and more affordably
              than ever before.
            </p>
          </div>

          {/* Story */}
          <div className="bg-slate-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              How We Started
            </h3>
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                CableWorld was born from frustration. Our founders, experienced hardware engineers,
                spent countless hours waiting weeks for cable harness quotes, only to discover
                design issues that required expensive rework.
              </p>
              <p>
                We knew there had to be a better way. In 2023, we set out to build a platform
                that would give engineers instant quotes, automated design feedback, and access
                to a vetted global manufacturer network.
              </p>
              <p>
                Today, CableWorld serves thousands of engineers worldwide, from startups building
                their first prototype to Fortune 500 companies manufacturing at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 lg:p-8 shadow-soft hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent-green" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Join Our Team
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              We're always looking for talented, passionate people to join our mission
            </p>
            <a
              href="/careers"
              className="btn-primary inline-flex text-lg"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
