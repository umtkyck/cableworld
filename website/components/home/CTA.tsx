import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Ready to transform your manufacturing process?
          </h2>
          <p className="mb-10 text-lg text-slate-500 dark:text-slate-400">
            Join thousands of engineers building better products faster with Harness Cart. Get your
            first quote today — no credit card required.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/quote" className="btn-primary btn-lg group">
              Get Instant Quote
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact" className="btn-outline btn-lg">
              Schedule a Demo
            </Link>
          </div>

          <p className="mt-8 text-sm text-slate-400 dark:text-slate-500">
            No setup fees &nbsp;·&nbsp; No minimum order &nbsp;·&nbsp; Free design review
          </p>
        </div>
      </div>
    </section>
  )
}
