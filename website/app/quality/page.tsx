import Link from 'next/link'
import { Shield, CheckCircle, Microscope, FileCheck, Zap, Globe } from 'lucide-react'

export const metadata = {
  title: 'Quality Assurance',
  description:
    'Our quality standards: IPC/WHMA-A-620 workmanship, ISO 9001 certified partners, and 100% electrical testing.',
}

export default function QualityPage() {
  const standards = [
    {
      icon: Shield,
      title: 'ISO 9001:2015',
      description:
        'Every manufacturing partner in our network holds a current ISO 9001:2015 certification.',
    },
    {
      icon: FileCheck,
      title: 'IPC/WHMA-A-620',
      description:
        'All harnesses are built to IPC/WHMA-A-620 workmanship standards, Class 2 or Class 3 on request.',
    },
    {
      icon: Globe,
      title: 'RoHS & REACH',
      description:
        'Materials are RoHS and REACH compliant, with full material declarations available.',
    },
    {
      icon: Zap,
      title: 'UL Listed Components',
      description:
        'Wire, connectors, and terminals are sourced from UL-listed suppliers with traceable lot codes.',
    },
  ]

  const process = [
    'Incoming inspection of all wire, connectors, and terminals',
    'First-article inspection on every new design before production',
    'In-process crimp height and pull-force verification',
    '100% electrical continuity and hipot testing on finished harnesses',
    'Final visual inspection to IPC/WHMA-A-620 acceptance criteria',
    'Full test reports and certificates of conformance with every shipment',
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">Quality Assurance</h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-200 sm:text-2xl">
            Every harness is built to spec, tested 100%, and shipped with full documentation.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
              Certifications & Standards
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="card text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-green/10">
                    <Icon className="h-7 w-7 text-accent-green" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
        <div className="container-custom max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-blue/10">
              <Microscope className="h-8 w-8 text-accent-blue" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
              Our Inspection Process
            </h2>
          </div>
          <ul className="space-y-4">
            {process.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-soft dark:bg-slate-800"
              >
                <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent-green" />
                <span className="text-slate-700 dark:text-slate-300">{step}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link href="/quote" className="btn-primary inline-flex text-lg">
              Get a Quality-Guaranteed Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
