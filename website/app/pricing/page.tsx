import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: 'Pay As You Go',
      price: 'No Subscription',
      description: 'Perfect for prototypes and small batches',
      features: [
        'Instant online quotes',
        'No minimum order quantity',
        'Standard lead time (7-10 days)',
        'Email support',
        'IPC-620 compliant',
        'Basic DFM analysis',
        'Secure payment processing'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Business',
      price: '$199/month',
      description: 'Best for growing companies with regular orders',
      features: [
        'Everything in Pay As You Go',
        'Priority manufacturing queue',
        'Faster lead times (5-7 days)',
        'Dedicated account manager',
        'Advanced DFM analysis',
        'Volume discounts (up to 15%)',
        'Phone & chat support',
        'Custom NET payment terms',
        'Quarterly business reviews'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale manufacturing needs',
      features: [
        'Everything in Business',
        'Custom pricing models',
        'Expedited production (2-4 days)',
        'White-glove onboarding',
        'API access',
        'Custom integrations',
        'Dedicated engineering support',
        'Volume discounts (up to 30%)',
        'SLA guarantees',
        'Executive reporting'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const pricing = {
    basePricing: [
      { quantity: '1-10 units', price: '$45-150', leadTime: '7-10 days' },
      { quantity: '11-50 units', price: '$35-120', leadTime: '7-10 days' },
      { quantity: '51-100 units', price: '$25-90', leadTime: '5-7 days' },
      { quantity: '101-500 units', price: '$18-65', leadTime: '7-14 days' },
      { quantity: '500+ units', price: 'Custom Quote', leadTime: '14-21 days' }
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl sm:text-2xl text-slate-200 max-w-3xl mx-auto">
            Pay only for what you need. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 ${
                  plan.popular
                    ? 'ring-2 ring-accent-green shadow-large relative'
                    : 'shadow-soft'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-accent-green text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-primary-500 mb-4">{plan.price}</div>
                <p className="text-slate-600 mb-8">{plan.description}</p>

                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/quote'}
                  className={`btn w-full justify-center mb-8 ${
                    plan.popular ? 'btn-primary' : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Base Pricing Table */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Estimated Base Pricing
            </h2>
            <p className="text-lg text-slate-600">
              Actual prices vary based on complexity, components, and specifications
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-large overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Quantity</th>
                    <th className="px-6 py-4 text-left font-semibold">Price per Unit</th>
                    <th className="px-6 py-4 text-left font-semibold">Typical Lead Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pricing.basePricing.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{row.quantity}</td>
                      <td className="px-6 py-4 text-slate-600">{row.price}</td>
                      <td className="px-6 py-4 text-slate-600">{row.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/quote" className="btn-primary inline-flex text-lg group">
              Get Your Exact Quote
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            Pricing FAQs
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                What's included in the price?
              </h3>
              <p className="text-slate-600">
                All quotes include materials, labor, assembly, testing, and standard packaging. Shipping is calculated separately based on destination and urgency.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Are there any hidden fees?
              </h3>
              <p className="text-slate-600">
                No. We believe in transparent pricing. The quote you receive is what you pay. The only additional cost would be expedited shipping if requested.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Can I get a discount for large orders?
              </h3>
              <p className="text-slate-600">
                Yes! Volume discounts are automatically applied to orders over 50 units. Business and Enterprise plans receive additional discounts up to 30%.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Do you offer payment terms?
              </h3>
              <p className="text-slate-600">
                Business and Enterprise plans can access NET-30 or NET-60 payment terms after credit approval. Pay As You Go requires payment at time of order.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
