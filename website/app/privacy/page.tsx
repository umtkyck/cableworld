import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Harness Cart collects, uses, and protects your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-3">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-slate-400">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-3xl space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly: account details (name, email, company),
              design files you upload for quoting, order and payment information, and messages you
              send to our support team. We also collect standard usage data such as pages visited
              and browser type to improve the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">2. How We Use Your Information</h2>
            <p>
              Your data is used to generate quotes, manufacture and ship your orders, process
              payments, provide support, and improve our services. Design files are shared only
              with the manufacturing partner fulfilling your order, under strict confidentiality
              agreements. We never sell your personal data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">3. Intellectual Property Protection</h2>
            <p>
              You retain full ownership of all designs you upload. Files are encrypted in transit
              and at rest, access is limited to personnel and partners directly involved in your
              order, and files are deleted upon request.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">4. Data Sharing</h2>
            <p>
              We share data only with: manufacturing partners fulfilling your orders, payment
              processors (Stripe), cloud infrastructure providers, and authorities when legally
              required. All partners are bound by data processing agreements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">5. Your Rights</h2>
            <p>
              You may access, correct, export, or delete your personal data at any time from your
              account settings or by contacting us. EU and California residents have additional
              rights under GDPR and CCPA respectively.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">6. Contact</h2>
            <p>
              Questions about this policy? Email{' '}
              <a href="mailto:privacy@harnesscart.com" className="font-medium text-slate-900 dark:text-white underline underline-offset-4 hover:no-underline">privacy@harnesscart.com</a>{' '}
              or use our <Link href="/contact" className="font-medium text-slate-900 dark:text-white underline underline-offset-4 hover:no-underline">contact form</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
