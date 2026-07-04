import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      title: 'Upload your design',
      description: 'Drag and drop your harness diagram in any format — CAD, PDF, Excel, or images.',
      step: '01'
    },
    {
      title: 'AI parsing & matching',
      description: 'Our AI extracts components and matches them with real-time pricing from suppliers.',
      step: '02'
    },
    {
      title: 'Review your quote',
      description: 'Get instant quotes with 3D visualization, DFM analysis, and alternative options.',
      step: '03'
    },
    {
      title: 'Receive your harness',
      description: 'We handle manufacturing, testing, and shipping. Track your order in real-time.',
      step: '04'
    }
  ]

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
      <div className="container-custom">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-4 tracking-tight">
            From design to delivery in four steps
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Our streamlined process makes getting custom cable harnesses faster
            and easier than ever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="text-sm font-mono text-slate-400 dark:text-slate-500 mb-4">{step.step}</div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Link href="/how-it-works" className="inline-flex items-center text-sm font-medium text-slate-900 dark:text-white group">
            Learn more about our process
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
