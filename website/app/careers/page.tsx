import Link from 'next/link'
import { Briefcase, Heart, Globe, Rocket, Mail } from 'lucide-react'

export const metadata = {
  title: 'Careers',
  description: 'Join the Harness Cart team and help transform cable harness manufacturing.',
}

export default function CareersPage() {
  const perks = [
    {
      icon: Rocket,
      title: 'High-Impact Work',
      description: 'Ship features used by thousands of engineers around the world every day.'
    },
    {
      icon: Globe,
      title: 'Remote-Friendly',
      description: 'Work from anywhere. Our team spans multiple time zones and continents.'
    },
    {
      icon: Heart,
      title: 'Great Benefits',
      description: 'Competitive salary, equity, health coverage, and a learning budget.'
    },
    {
      icon: Briefcase,
      title: 'Room to Grow',
      description: 'Early-stage company with plenty of ownership and career growth opportunities.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Careers at Harness Cart</h1>
          <p className="text-xl sm:text-2xl text-slate-200 max-w-3xl mx-auto">
            Help us build the future of cable harness manufacturing.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Why Work With Us
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              We're a small, ambitious team solving real problems for hardware engineers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => {
              const Icon = perk.icon
              return (
                <div key={index} className="card text-center">
                  <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-accent-green" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{perk.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{perk.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Open Positions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            We don't have any open roles right now, but we're always excited to meet
            talented people. Send us your resume and tell us how you'd like to contribute.
          </p>
          <a href="mailto:careers@harnesscart.com" className="btn-primary inline-flex text-lg">
            <Mail className="w-5 h-5 mr-2" />
            careers@harnesscart.com
          </a>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            Prefer to chat first? <Link href="/contact" className="font-medium text-slate-900 dark:text-white underline underline-offset-4 hover:no-underline">Contact us</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
