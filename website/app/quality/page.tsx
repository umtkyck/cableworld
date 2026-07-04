import Link from 'next/link'
import { Shield, CheckCircle, Microscope, FileCheck, Zap, Globe } from 'lucide-react'

export const metadata = {
  title: 'Quality Assurance',
  description: 'Our quality standards: IPC/WHMA-A-620 workmanship, ISO 9001 certified partners, and 100% electrical testing.',
}

export default function QualityPage() {
  const standards = [
    {
      icon: Shield,
      title: 'ISO 9001:2015',
      description: 'Every manufacturing partner in our network holds a current ISO 9001:2015 certification.'
    },
    {
      icon: FileCheck,
      title: 'IPC/WHMA-A-620',
      description: 'All harnesses are built to IPC/WHMA-A-620 workmanship standards, Class 2 or Class 3 on request.'
    },
    {
      icon: Globe,
      title: 'RoHS & REACH',
      description: 'Materials are RoHS and REACH compliant, with full material declarations available.'
    },
    {
      icon: Zap,
      title: 'UL Listed Components',
      description: 'Wire, connectors, and terminals are sourced from UL-listed suppliers with traceable lot codes.'
    }
  ]

  const process = [
    'Incoming inspection of all wire, connectors, and terminals',
    'First-article inspection on every new design before production',
    'In-process crimp height and pull-force verification',
    '100% electrical continuity and hipot testing on finished harnesses',
    'Final visual inspection to IPC/WHMA-A-620 acceptance criteria',
    'Full test reports and certificates of conformance with every shipment'
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Quality Assurance</h1>
          <p className="text-xl sm:text-2xl text-slate-200 max-w-3xl mx-auto">
            Every harness is built to spec, tested 100%, and shipped with full documentation.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Certifications & Standards
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {standards.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="card text-center">
                  <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-accent-green" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Microscope className="w-8 h-8 text-accent-blue" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Our Inspection Process
            </h2>
          </div>
          <ul className="space-y-4">
            {process.map((step, index) => (
              <li key={index} className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl p-5 shadow-soft">
                <CheckCircle className="w-6 h-6 text-accent-green flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">{step}</span>
              </li>
            ))}
          </ul>
          <div className="text-center mt-12">
            <Link href="/quote" className="btn-primary inline-flex text-lg">
              Get a Quality-Guaranteed Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
