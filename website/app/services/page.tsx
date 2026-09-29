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
  Mail,
} from 'lucide-react'

const services = [
  {
    id: 'design',
    icon: Cog,
    title: 'Custom Cable Design',
    description:
      'Our expert engineers will design custom cable harnesses tailored to your specific requirements.',
    features: [
      '3D CAD modeling and visualization',
      'Material selection optimization',
      'Thermal and electrical analysis',
      'Prototype development',
      'Design for manufacturability review',
    ],
    price: 'From $500',
  },
  {
    id: 'prototyping',
    icon: Wrench,
    title: 'Rapid Prototyping',
    description:
      'Get functional prototypes quickly to validate your designs before full production.',
    features: [
      '48-hour turnaround available',
      'Small batch production (1-50 units)',
      'Functional testing included',
      'Design iteration support',
      'Quality inspection reports',
    ],
    price: 'From $250',
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
      'Detailed test documentation',
    ],
    price: 'From $150',
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
      'Technical documentation review',
    ],
    price: '$200/hour',
  },
]

const benefits = [
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Most services completed within 5 business days',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: '100% satisfaction guarantee on all services',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: '20+ years combined cable engineering experience',
  },
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Design Services</h1>
            <p className="mb-8 text-xl text-slate-300">
              From concept to production, our expert team provides comprehensive cable harness
              design and engineering services.
            </p>
            <Link href="/contact" className="btn-primary">
              Request a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                  <benefit.icon className="h-6 w-6 text-primary-600" />
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
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Our Services</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Choose from our range of professional services designed to support every stage of your
              cable harness project.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.id}
                className={`rounded-2xl border-2 bg-white transition-all duration-300 ${
                  selectedService === service.id
                    ? 'border-primary-500 shadow-large'
                    : 'border-slate-200 hover:border-primary-300 hover:shadow-lg'
                }`}
              >
                <div className="p-8">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100">
                      <service.icon className="h-7 w-7 text-primary-600" />
                    </div>
                    <span className="text-lg font-bold text-primary-600">{service.price}</span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="mb-6 text-slate-600">{service.description}</p>

                  <ul className="mb-6 space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      setSelectedService(selectedService === service.id ? null : service.id)
                    }
                    className={`w-full rounded-lg px-4 py-3 font-semibold transition ${
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
                Request {services.find((s) => s.id === selectedService)?.title}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Not Sure Which Service You Need?</h2>
            <p className="mb-8 text-lg text-primary-100">
              Our team is here to help. Schedule a free consultation to discuss your project
              requirements.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-primary-600 transition hover:bg-primary-50"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
              <a
                href="tel:+1-555-123-4567"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
