import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      title: 'Upload your design',
      description: 'Drag and drop your harness diagram in any format — CAD, PDF, Excel, or images.',
      step: '01',
    },
    {
      title: 'AI parsing & matching',
      description:
        'Our AI extracts components and matches them with real-time pricing from suppliers.',
      step: '02',
    },
    {
      title: 'Review your quote',
      description:
        'Get instant quotes with 3D visualization, DFM analysis, and alternative options.',
      step: '03',
    },
    {
      title: 'Receive your harness',
      description: 'We handle manufacturing, testing, and shipping. Track your order in real-time.',
      step: '04',
    },
  ]

  return (
    <section className="section-padding border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-custom">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            From design to delivery in four steps
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Our streamlined process makes getting custom cable harnesses faster and easier than
            ever.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="mb-4 font-mono text-sm text-slate-400 dark:text-slate-500">
                {step.step}
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Link
            href="/how-it-works"
            className="group inline-flex items-center text-sm font-medium text-slate-900 dark:text-white"
          >
            Learn more about our process
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
