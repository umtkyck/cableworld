import Link from 'next/link'
import { ArrowRight, Upload } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center pt-24 pb-16 sm:pt-32 sm:pb-20">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 tracking-wide uppercase animate-fade-in">
            Instant quotes in under 60 seconds
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 leading-[1.1] tracking-tight text-slate-900 dark:text-white animate-fade-in-up">
            Cable harnesses,
            <br />
            manufactured on demand.
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
            Upload your design and get instant quotes from a global network
            of certified manufacturers. Quality guaranteed, delivered fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in animation-delay-300">
            <Link href="/quote" className="btn-primary btn-lg group">
              Get Instant Quote
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/how-it-works" className="btn-outline btn-lg">
              How It Works
            </Link>
          </div>

          <p className="text-sm text-slate-400 dark:text-slate-500 mt-10 animate-fade-in animation-delay-400">
            ISO 9001 Certified &nbsp;·&nbsp; RoHS Compliant &nbsp;·&nbsp; UL Listed
          </p>
        </div>

        {/* Upload panel */}
        <div className="max-w-2xl mx-auto pb-24 sm:pb-32 animate-fade-in-up animation-delay-300">
          <Link
            href="/quote"
            className="block border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-10 sm:p-12 text-center hover:border-slate-900 dark:hover:border-white transition-colors duration-200 group"
          >
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-5 transition-colors duration-200 group-hover:bg-slate-900 dark:group-hover:bg-white">
              <Upload className="w-5 h-5 text-slate-600 dark:text-slate-300 transition-colors duration-200 group-hover:text-white dark:group-hover:text-slate-900" />
            </div>
            <p className="text-slate-900 dark:text-white font-medium mb-1">
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
