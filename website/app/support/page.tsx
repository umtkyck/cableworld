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
      detail: 'Typical response: under 5 minutes',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'For order issues, technical questions, or anything else.',
      detail: 'support@harnesscart.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      description: 'Talk to a real engineer during business hours (9am–6pm PT).',
      detail: '1-800-HARNESS',
    },
  ]

  const faqs = [
    {
      q: 'How fast will I get my quote?',
      a: 'Automated quotes are generated in under 60 seconds. Complex designs that need engineering review are quoted within one business day.',
    },
    {
      q: 'What file formats can I upload?',
      a: 'CAD files (STEP, DXF), PDF drawings, Excel wire lists, and images (PNG/JPG). Our AI parser extracts components from all of them.',
    },
    {
      q: 'What are the minimum order quantities?',
      a: 'There is no minimum order. We support one-off prototypes through high-volume production runs.',
    },
    {
      q: 'How do I track my order?',
      a: 'Sign in and open your Dashboard to see real-time production and shipping status for every order.',
    },
    {
      q: 'What if there is a problem with my harness?',
      a: 'Every harness ships 100% tested with a certificate of conformance. If anything is wrong, we remake or refund it — no questions asked.',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">Support</h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-200 sm:text-2xl">
            We're here to help — from your first quote to your thousandth harness.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
            {channels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <div key={index} className="card text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-green/10">
                    <Icon className="h-7 w-7 text-accent-green" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {channel.title}
                  </h3>
                  <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                    {channel.description}
                  </p>
                  <div className="text-sm font-semibold text-primary-500">{channel.detail}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
        <div className="container-custom max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-blue/10">
              <FileQuestion className="h-8 w-8 text-accent-blue" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-soft dark:bg-slate-800">
                <h3 className="mb-2 font-bold text-slate-900 dark:text-slate-100">{faq.q}</h3>
                <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/documentation" className="btn-outline inline-flex">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Documentation
            </Link>
            <Link href="/contact" className="btn-primary inline-flex">
              <Clock className="mr-2 h-5 w-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
