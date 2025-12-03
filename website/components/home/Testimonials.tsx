import { Quote, Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Lead Engineer',
      company: 'RoboTech Industries',
      avatar: 'SC',
      quote: 'Harness Cart cut our prototyping time in half. We can now iterate on designs weekly instead of monthly. Game changer for our product development.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'VP of Operations',
      company: 'Automation Systems Corp',
      avatar: 'MR',
      quote: 'The instant quotes and transparent pricing have saved us thousands. No more back-and-forth with suppliers. Just upload, review, and order.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Hardware Designer',
      company: 'MedTech Innovations',
      avatar: 'EW',
      quote: 'The DFM analysis caught errors that would have cost us weeks in rework. The quality of the harnesses is consistently excellent.',
      rating: 5
    }
  ]

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See what engineers and product teams are saying about Harness Cart.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-shadow animate-scale-in"
                 style={{animationDelay: `${index * 100}ms`}}>
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center mb-4">
                <Quote className="w-6 h-6 text-accent-green" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-blue rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                  <div className="text-sm text-slate-500">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="mt-16 pt-16 border-t border-slate-200">
          <p className="text-center text-slate-600 mb-8">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {['TechCorp', 'InnovateLab', 'FutureTech', 'RoboSystems', 'AutomationPro'].map((company, index) => (
              <div key={index} className="text-2xl font-bold text-slate-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
