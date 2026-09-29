import Link from 'next/link'

export const metadata = {
  title: 'Accessibility',
  description: 'Our commitment to making Harness Cart accessible to everyone.',
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
        <div className="container-custom max-w-3xl">
          <h1 className="mb-3 text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl">
            Accessibility Statement
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-3xl space-y-10 leading-relaxed text-slate-700 dark:text-slate-300">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Our Commitment
            </h2>
            <p>
              Harness Cart is committed to ensuring our platform is accessible to all users,
              including people with disabilities. We aim to conform to the Web Content Accessibility
              Guidelines (WCAG) 2.1 Level AA.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
              What We Do
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Semantic HTML with proper heading structure and landmarks</li>
              <li>Form inputs associated with visible labels</li>
              <li>Accessible names on icon-only buttons and controls</li>
              <li>Keyboard navigability across all interactive elements</li>
              <li>Sufficient color contrast in both light and dark themes</li>
              <li>Alternative text for meaningful images</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Known Limitations
            </h2>
            <p>
              Some interactive 3D tools (the CAD Viewer and Cable Designer) rely on WebGL and
              pointer interactions that are not yet fully accessible. We provide file upload and
              form-based alternatives for all quoting workflows.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">Feedback</h2>
            <p>
              If you encounter an accessibility barrier, please tell us. Email{' '}
              <a
                href="mailto:accessibility@harnesscart.com"
                className="font-semibold text-primary-500 hover:text-primary-600"
              >
                accessibility@harnesscart.com
              </a>{' '}
              or use our{' '}
              <Link
                href="/contact"
                className="font-semibold text-primary-500 hover:text-primary-600"
              >
                contact form
              </Link>{' '}
              and we will work with you to resolve it.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
