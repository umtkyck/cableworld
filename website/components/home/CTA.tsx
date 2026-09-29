import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="gradient-bg relative overflow-hidden rounded-3xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 px-8 py-16 text-center text-white lg:px-16 lg:py-24">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Ready to Transform Your Manufacturing Process?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-200">
              Join thousands of engineers who are building better products faster with Harness Cart.
              Get your first quote today—no credit card required.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/quote"
                className="btn group bg-accent-green text-lg text-white hover:bg-accent-green/90 hover:shadow-xl"
              >
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="btn bg-white text-lg text-primary-500 hover:shadow-xl"
              >
                Schedule a Demo
              </Link>
            </div>

            <p className="mt-8 text-sm text-slate-300">
              ✓ No setup fees &nbsp;&nbsp; ✓ No minimum order &nbsp;&nbsp; ✓ Free design review
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
