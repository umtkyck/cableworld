import Link from 'next/link'
import { TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Case Studies',
  description: 'How engineering teams cut lead times and costs with Harness Cart.',
}

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      company: 'RoboTech Industries',
      industry: 'Robotics',
      title: 'Cutting prototype lead time from 6 weeks to 5 days',
      summary:
        "RoboTech needed weekly harness iterations for a new robotic arm. Traditional suppliers quoted 4–6 week lead times. Using Harness Cart's instant quoting and prototype fast lane, they now iterate weekly.",
      results: [
        { icon: Clock, value: '88%', label: 'faster prototyping' },
        { icon: DollarSign, value: '$45k', label: 'saved in year one' },
        { icon: TrendingUp, value: '12', label: 'design iterations shipped' },
      ],
    },
    {
      company: 'Automation Systems Corp',
      industry: 'Industrial Automation',
      title: 'Scaling from prototype to 10,000 units without switching suppliers',
      summary:
        'ASC prototyped control cabinet harnesses on Harness Cart, then scaled to volume production through the same platform. DFM analysis caught two connector issues before tooling, avoiding costly rework.',
      results: [
        { icon: DollarSign, value: '23%', label: 'lower unit cost at volume' },
        { icon: Clock, value: '100%', label: 'on-time deliveries' },
        { icon: TrendingUp, value: '10k+', label: 'units delivered' },
      ],
    },
    {
      company: 'MedTech Innovations',
      industry: 'Medical Devices',
      title: 'IPC Class 3 harnesses with full traceability for FDA submission',
      summary:
        'MedTech required Class 3 workmanship and complete lot traceability for a patient-monitoring device. Harness Cart matched them with an ISO 13485 partner and delivered full documentation packages.',
      results: [
        { icon: TrendingUp, value: '99.8%', label: 'first-pass yield' },
        { icon: Clock, value: '3 weeks', label: 'from PO to delivery' },
        { icon: DollarSign, value: '0', label: 'quality escapes' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">Case Studies</h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-200 sm:text-2xl">
            Real results from engineering teams who build with Harness Cart.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-5xl space-y-10">
          {caseStudies.map((study, index) => (
            <div key={index} className="card">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="badge-primary">{study.industry}</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {study.company}
                </span>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
                {study.title}
              </h2>
              <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
                {study.summary}
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-6 dark:border-slate-700">
                {study.results.map((result, i) => {
                  const Icon = result.icon
                  return (
                    <div key={i} className="text-center">
                      <Icon className="mx-auto mb-2 h-6 w-6 text-accent-green" />
                      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {result.value}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {result.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="pt-6 text-center">
            <p className="mb-6 text-lg text-slate-600 dark:text-slate-400">
              Ready to write your own success story?
            </p>
            <Link href="/quote" className="btn-primary group inline-flex text-lg">
              Get Your Instant Quote
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
