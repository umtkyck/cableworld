import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of the Harness Cart platform.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
        <div className="container-custom max-w-3xl">
          <h1 className="mb-3 text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-3xl space-y-10 leading-relaxed text-slate-700 dark:text-slate-300">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
              1. Acceptance of Terms
            </h2>
            <p>
              By creating an account or placing an order on Harness Cart, you agree to these terms.
              If you use the platform on behalf of a company, you represent that you are authorized
              to bind that company.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
              2. Quotes and Orders
            </h2>
            <p>
              Automated quotes are valid for 30 days unless stated otherwise. An order is formed
              when you accept a quote and complete payment. Lead times are estimates; we will notify
              you promptly of any changes. Custom-manufactured goods cannot be cancelled once
              production has started.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
              3. Your Designs
            </h2>
            <p>
              You retain all intellectual property rights in the designs you upload. You grant us a
              limited license to use your files solely to generate quotes and fulfill your orders.
              You are responsible for ensuring your designs do not infringe third-party rights.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
              4. Quality and Returns
            </h2>
            <p>
              All harnesses are manufactured to IPC/WHMA-A-620 standards and 100% electrically
              tested. If a product fails to conform to your accepted specification, we will remake
              it or refund the purchase price. Claims must be submitted within 30 days of delivery.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, our total liability for any claim is limited
              to the amount you paid for the affected order. We are not liable for indirect or
              consequential damages, including lost profits or production downtime.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
              6. Contact
            </h2>
            <p>
              Questions about these terms? Email{' '}
              <a
                href="mailto:legal@harnesscart.com"
                className="font-semibold text-primary-500 hover:text-primary-600"
              >
                legal@harnesscart.com
              </a>{' '}
              or use our{' '}
              <Link
                href="/contact"
                className="font-semibold text-primary-500 hover:text-primary-600"
              >
                contact form
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
