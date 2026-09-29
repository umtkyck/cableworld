import { Target, Users, Globe, Award, TrendingUp, Shield } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { label: 'Manufacturing Partners', value: '150+' },
    { label: 'Countries Served', value: '45' },
    { label: 'Cable Harnesses Delivered', value: '1M+' },
    { label: 'Customer Satisfaction', value: '99.5%' },
  ]

  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description:
        'We leverage cutting-edge AI and automation to revolutionize cable harness manufacturing.',
    },
    {
      icon: Users,
      title: 'Customer Success',
      description:
        'Your success is our success. We provide dedicated support throughout your entire journey.',
    },
    {
      icon: Globe,
      title: 'Global Network',
      description:
        'Access to a worldwide network of certified manufacturers ensures quality and fast delivery.',
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description:
        '100% IPC-620 compliance and rigorous testing on every single harness we produce.',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description:
        'We constantly evolve our platform based on customer feedback and industry trends.',
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Clear pricing, real-time updates, and honest communication at every step.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">About Harness Cart</h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-200 sm:text-2xl">
            Transforming cable harness manufacturing through technology, transparency, and trust.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-xl bg-white p-6 text-center shadow-soft">
                <div className="mb-2 text-3xl font-bold text-primary-500 sm:text-4xl lg:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 sm:text-xl">
              We exist to eliminate the friction in cable harness manufacturing. By combining
              AI-powered design analysis, instant quoting, and a global manufacturer network, we
              empower engineers to bring their products to market faster and more affordably than
              ever before.
            </p>
          </div>

          {/* Story */}
          <div className="rounded-2xl bg-slate-50 p-8 lg:p-12">
            <h3 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">How We Started</h3>
            <div className="space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              <p>
                Harness Cart was born from frustration. Our founders, experienced hardware
                engineers, spent countless hours waiting weeks for cable harness quotes, only to
                discover design issues that required expensive rework.
              </p>
              <p>
                We knew there had to be a better way. In 2023, we set out to build a platform that
                would give engineers instant quotes, automated design feedback, and access to a
                vetted global manufacturer network.
              </p>
              <p>
                Today, Harness Cart serves thousands of engineers worldwide, from startups building
                their first prototype to Fortune 500 companies manufacturing at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Our Values
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-600 sm:text-xl">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white p-6 shadow-soft transition-shadow hover:shadow-medium lg:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-green/10">
                    <Icon className="h-6 w-6 text-accent-green" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{value.title}</h3>
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
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Join Our Team
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-600 sm:text-xl">
              We're always looking for talented, passionate people to join our mission
            </p>
            <a href="/careers" className="btn-primary inline-flex text-lg">
              View Open Positions
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
