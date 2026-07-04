import Link from 'next/link'
import { Mail, Phone, MessageCircle, FileQuestion, Clock, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Support',
  description: 'Get help with quotes, orders, shipping, and technical questions.',
}

export default function SupportPage() {
  const channels = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Use the chat widget in the corner of any page for the fastest response.',
      detail: 'Typical response: under 5 minutes'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'For order issues, technical questions, or anything else.',
      detail: 'support@harnesscart.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      description: 'Talk to a real engineer during business hours (9am–6pm PT).',
      detail: '1-800-HARNESS'
    }
  ]

  const faqs = [
    {
      q: 'How fast will I get my quote?',
      a: 'Automated quotes are generated in under 60 seconds. Complex designs that need engineering review are quoted within one business day.'
    },
    {
      q: 'What file formats can I upload?',
      a: 'CAD files (STEP, DXF), PDF drawings, Excel wire lists, and images (PNG/JPG). Our AI parser extracts components from all of them.'
    },
    {
      q: 'What are the minimum order quantities?',
      a: 'There is no minimum order. We support one-off prototypes through high-volume production runs.'
    },
    {
      q: 'How do I track my order?',
      a: 'Sign in and open your Dashboard to see real-time production and shipping status for every order.'
    },
    {
      q: 'What if there is a problem with my harness?',
      a: 'Every harness ships 100% tested with a certificate of conformance. If anything is wrong, we remake or refund it — no questions asked.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Support</h1>
          <p className="text-xl sm:text-2xl text-slate-200 max-w-3xl mx-auto">
            We're here to help — from your first quote to your thousandth harness.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {channels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <div key={index} className="card text-center">
                  <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-accent-green" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{channel.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{channel.description}</p>
                  <div className="text-sm font-semibold text-primary-500">{channel.detail}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileQuestion className="w-8 h-8 text-accent-blue" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-soft">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">{faq.q}</h3>
                <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/documentation" className="btn-outline inline-flex">
              <BookOpen className="w-5 h-5 mr-2" />
              Browse Documentation
            </Link>
            <Link href="/contact" className="btn-primary inline-flex">
              <Clock className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
