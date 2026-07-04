import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="relative gradient-bg rounded-3xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative z-10 py-16 px-8 lg:py-24 lg:px-16 text-center text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Manufacturing Process?
            </h2>
            <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
              Join thousands of engineers who are building better products faster with Harness Cart.
              Get your first quote today—no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="btn bg-accent-green text-white hover:bg-accent-green/90 hover:shadow-xl text-lg group">
                Get Instant Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn bg-white text-primary-500 hover:shadow-xl text-lg">
                Schedule a Demo
              </Link>
            </div>

            <p className="text-sm text-slate-300 mt-8">
              ✓ No setup fees &nbsp;&nbsp; ✓ No minimum order &nbsp;&nbsp; ✓ Free design review
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
