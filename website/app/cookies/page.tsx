import Link from 'next/link'

export const metadata = {
  title: 'Cookie Policy',
  description: 'How Harness Cart uses cookies and similar technologies.',
}

export default function CookiesPage() {
  const cookieTypes = [
    {
      name: 'Strictly Necessary',
      purpose: 'Authentication, security, shopping cart state, and theme preference. The site cannot function without these.',
      canDisable: 'No'
    },
    {
      name: 'Functional',
      purpose: 'Remembering your preferences such as saved quotes and recently viewed products.',
      canDisable: 'Yes'
    },
    {
      name: 'Analytics',
      purpose: 'Anonymous usage statistics that help us understand which features are useful and where users get stuck.',
      canDisable: 'Yes'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-3">Cookie Policy</h1>
          <p className="text-slate-500 dark:text-slate-400">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-3xl space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">What Are Cookies?</h2>
            <p>
              Cookies are small text files stored in your browser. We use them to keep you signed
              in, remember your cart and preferences, and understand how the site is used.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Cookies We Use</h2>
            <div className="space-y-4">
              {cookieTypes.map((cookie, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">{cookie.name}</h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Can be disabled: {cookie.canDisable}</span>
                  </div>
                  <p className="text-sm">{cookie.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Managing Cookies</h2>
            <p>
              You can delete or block cookies through your browser settings. Note that blocking
              strictly necessary cookies will prevent you from signing in or placing orders.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Questions?</h2>
            <p>
              See our <Link href="/privacy" className="text-primary-500 hover:text-primary-600 font-semibold">Privacy Policy</Link>{' '}
              or <Link href="/contact" className="text-primary-500 hover:text-primary-600 font-semibold">contact us</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
