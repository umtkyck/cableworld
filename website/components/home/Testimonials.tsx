import { Quote, Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Lead Engineer',
      company: 'RoboTech Industries',
      avatar: 'SC',
      quote:
        'Harness Cart cut our prototyping time in half. We can now iterate on designs weekly instead of monthly. Game changer for our product development.',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'VP of Operations',
      company: 'Automation Systems Corp',
      avatar: 'MR',
      quote:
        'The instant quotes and transparent pricing have saved us thousands. No more back-and-forth with suppliers. Just upload, review, and order.',
      rating: 5,
    },
    {
      name: 'Emily Watson',
      role: 'Hardware Designer',
      company: 'MedTech Innovations',
      avatar: 'EW',
      quote:
        'The DFM analysis caught errors that would have cost us weeks in rework. The quality of the harnesses is consistently excellent.',
      rating: 5,
    },
  ]

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400">
            See what engineers and product teams are saying about Harness Cart.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-scale-in rounded-xl bg-white p-8 shadow-soft transition-shadow hover:shadow-medium dark:bg-slate-800"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-green/10">
                <Quote className="h-6 w-6 text-accent-green" />
              </div>

              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent-yellow text-accent-yellow" />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-green to-accent-blue font-bold text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="mt-16 border-t border-slate-200 pt-16 dark:border-slate-700">
          <p className="mb-8 text-center text-slate-600 dark:text-slate-400">
            Trusted by innovative companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {['TechCorp', 'InnovateLab', 'FutureTech', 'RoboSystems', 'AutomationPro'].map(
              (company, index) => (
                <div key={index} className="text-2xl font-bold text-slate-400">
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
