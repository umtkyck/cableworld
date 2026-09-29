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
      description: 'Ship features used by thousands of engineers around the world every day.',
    },
    {
      icon: Globe,
      title: 'Remote-Friendly',
      description: 'Work from anywhere. Our team spans multiple time zones and continents.',
    },
    {
      icon: Heart,
      title: 'Great Benefits',
      description: 'Competitive salary, equity, health coverage, and a learning budget.',
    },
    {
      icon: Briefcase,
      title: 'Room to Grow',
      description: 'Early-stage company with plenty of ownership and career growth opportunities.',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Careers at Harness Cart
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-200 sm:text-2xl">
            Help us build the future of cable harness manufacturing.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
              Why Work With Us
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400">
              We're a small, ambitious team solving real problems for hardware engineers.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk, index) => {
              const Icon = perk.icon
              return (
                <div key={index} className="card text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-green/10">
                    <Icon className="h-7 w-7 text-accent-green" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {perk.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{perk.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
            Open Positions
          </h2>
          <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
            We don't have any open roles right now, but we're always excited to meet talented
            people. Send us your resume and tell us how you'd like to contribute.
          </p>
          <a href="mailto:careers@harnesscart.com" className="btn-primary inline-flex text-lg">
            <Mail className="mr-2 h-5 w-5" />
            careers@harnesscart.com
          </a>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Prefer to chat first?{' '}
            <Link href="/contact" className="font-semibold text-primary-500 hover:text-primary-600">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
