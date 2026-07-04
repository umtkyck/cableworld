export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Lead Engineer, RoboTech Industries',
      quote: 'Harness Cart cut our prototyping time in half. We can now iterate on designs weekly instead of monthly. Game changer for our product development.',
    },
    {
      name: 'Michael Rodriguez',
      role: 'VP of Operations, Automation Systems Corp',
      quote: 'The instant quotes and transparent pricing have saved us thousands. No more back-and-forth with suppliers. Just upload, review, and order.',
    },
    {
      name: 'Emily Watson',
      role: 'Hardware Designer, MedTech Innovations',
      quote: 'The DFM analysis caught errors that would have cost us weeks in rework. The quality of the harnesses is consistently excellent.',
    }
  ]

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
      <div className="container-custom">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-4 tracking-tight">
            Trusted by industry leaders
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            See what engineers and product teams are saying about Harness Cart.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <figure key={index} className="flex flex-col justify-between bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
              <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{testimonial.name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Company names */}
        <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            {['TechCorp', 'InnovateLab', 'FutureTech', 'RoboSystems', 'AutomationPro'].map((company, index) => (
              <div key={index} className="text-base font-medium text-slate-300 dark:text-slate-700">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
