'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Cog,
  FileCheck,
  Wrench,
  Users,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react'

const services = [
  {
    id: 'design',
    icon: Cog,
    title: 'Custom Cable Design',
    description: 'Our expert engineers will design custom cable harnesses tailored to your specific requirements.',
    features: [
      '3D CAD modeling and visualization',
      'Material selection optimization',
      'Thermal and electrical analysis',
      'Prototype development',
      'Design for manufacturability review'
    ],
    price: 'From $500'
  },
  {
    id: 'prototyping',
    icon: Wrench,
    title: 'Rapid Prototyping',
    description: 'Get functional prototypes quickly to validate your designs before full production.',
    features: [
      '48-hour turnaround available',
      'Small batch production (1-50 units)',
      'Functional testing included',
      'Design iteration support',
      'Quality inspection reports'
    ],
    price: 'From $250'
  },
  {
    id: 'testing',
    icon: FileCheck,
    title: 'Testing & Certification',
    description: 'Comprehensive testing services to ensure your cables meet industry standards.',
    features: [
      'Continuity and isolation testing',
      'Environmental stress testing',
      'Pull strength verification',
      'UL/CE certification support',
      'Detailed test documentation'
    ],
    price: 'From $150'
  },
  {
    id: 'consulting',
    icon: Users,
    title: 'Engineering Consultation',
    description: 'One-on-one consultation with our cable engineering experts.',
    features: [
      'Design review and optimization',
      'Cost reduction strategies',
      'Supplier qualification support',
      'Production scaling guidance',
      'Technical documentation review'
    ],
    price: '$200/hour'
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Most services completed within 5 business days'
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: '100% satisfaction guarantee on all services'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: '20+ years combined cable engineering experience'
  }
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Design Services
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              From concept to production, our expert team provides comprehensive
              cable harness design and engineering services.
            </p>
            <Link href="/contact" className="btn-primary">
              Request a Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose from our range of professional services designed to support
              every stage of your cable harness project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl border-2 transition-all duration-300 ${
                  selectedService === service.id
                    ? 'border-primary-500 shadow-large'
                    : 'border-slate-200 hover:border-primary-300 hover:shadow-lg'
                }`}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-primary-600" />
                    </div>
                    <span className="text-lg font-bold text-primary-600">{service.price}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedService(
                      selectedService === service.id ? null : service.id
                    )}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                      selectedService === service.id
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {selectedService === service.id ? 'Selected' : 'Select Service'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedService && (
            <div className="mt-8 text-center">
              <Link
                href={`/contact?service=${selectedService}`}
                className="btn-primary inline-flex"
              >
                Request {services.find(s => s.id === selectedService)?.title}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Our team is here to help. Schedule a free consultation to discuss
              your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
              <a
                href="tel:+1-555-123-4567"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
