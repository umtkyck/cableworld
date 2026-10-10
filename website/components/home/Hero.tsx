import Link from 'next/link'
import { ArrowRight, Upload } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl pb-16 pt-24 text-center sm:pb-20 sm:pt-32">
          <p className="mb-6 animate-fade-in text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Instant quotes in under 60 seconds
          </p>

          <h1 className="mb-6 animate-fade-in-up text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Cable harnesses,
            <br />
            manufactured on demand.
          </h1>

          <p className="animation-delay-200 mx-auto mb-10 max-w-xl animate-fade-in text-lg leading-relaxed text-slate-500 dark:text-slate-400 sm:text-xl">
            Upload your design and get instant quotes from a global network of certified
            manufacturers. Quality guaranteed, delivered fast.
          </p>

          <div className="animation-delay-300 flex animate-fade-in flex-col justify-center gap-3 sm:flex-row">
            <Link href="/quote" className="btn-primary btn-lg group">
              Get Instant Quote
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/how-it-works" className="btn-outline btn-lg">
              How It Works
            </Link>
          </div>

          <p className="animation-delay-400 mt-10 animate-fade-in text-sm text-slate-400 dark:text-slate-500">
            ISO 9001 Certified &nbsp;·&nbsp; RoHS Compliant &nbsp;·&nbsp; UL Listed
          </p>
        </div>

        {/* Upload panel */}
        <div className="animation-delay-300 mx-auto max-w-2xl animate-fade-in-up pb-24 sm:pb-32">
          <Link
            href="/quote"
            className="group block rounded-2xl border border-dashed border-slate-300 p-10 text-center transition-colors duration-200 hover:border-slate-900 dark:border-slate-700 dark:hover:border-white sm:p-12"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition-colors duration-200 group-hover:bg-slate-900 dark:bg-slate-800 dark:group-hover:bg-white">
              <Upload className="h-5 w-5 text-slate-600 transition-colors duration-200 group-hover:text-white dark:text-slate-300 dark:group-hover:text-slate-900" />
            </div>
            <p className="mb-1 font-medium text-slate-900 dark:text-white">
              Drop your harness design here
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              CAD, PDF, Excel or images · Max 100MB
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}
