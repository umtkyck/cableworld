import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-4 tracking-tight">
            Ready to transform your manufacturing process?
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-10">
            Join thousands of engineers building better products faster with
            Harness Cart. Get your first quote today — no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-primary btn-lg group">
              Get Instant Quote
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact" className="btn-outline btn-lg">
              Schedule a Demo
            </Link>
          </div>

          <p className="text-sm text-slate-400 dark:text-slate-500 mt-8">
            No setup fees &nbsp;·&nbsp; No minimum order &nbsp;·&nbsp; Free design review
          </p>
        </div>
      </div>
    </section>
  )
}
