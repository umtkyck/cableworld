'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileText,
  Upload,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react'

interface FormData {
  companyName: string
  contactName: string
  email: string
  phone: string
  website: string
  country: string
  city: string
  description: string
  specialties: string[]
  certifications: string[]
  yearsInBusiness: string
  employeeCount: string
  annualRevenue: string
  documents: File[]
}

const specialtyOptions = [
  'Custom Cable Harnesses',
  'Wire Assemblies',
  'Connector Solutions',
  'PCB Assemblies',
  'Power Cables',
  'Data/Communication Cables',
  'Automotive Wiring',
  'Aerospace Cables',
  'Medical Device Cables',
  'Industrial Cables',
]

const certificationOptions = [
  'ISO 9001',
  'ISO 14001',
  'IATF 16949',
  'AS9100',
  'ISO 13485',
  'UL Listed',
  'CE Certified',
  'RoHS Compliant',
  'REACH Compliant',
  'IPC/WHMA-A-620',
]

export default function SupplierApplicationPage() {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: user?.email || '',
    phone: '',
    website: '',
    country: '',
    city: '',
    description: '',
    specialties: [],
    certifications: [],
    yearsInBusiness: '',
    employeeCount: '',
    annualRevenue: '',
    documents: [],
  })

  const updateFormData = (field: keyof FormData, value: string | string[] | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: 'specialties' | 'certifications', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // In production, this would send to backend API
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitted(true)
    } catch {
      setError('Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-slate-900">Application Submitted!</h1>
          <p className="mb-8 text-slate-600">
            Thank you for your interest in becoming a supplier. Our team will review your
            application and contact you within 3-5 business days.
          </p>
          <div className="space-y-3">
            <Link href="/marketplace" className="btn-primary inline-flex w-full justify-center">
              Back to Marketplace
            </Link>
            <Link
              href="/dashboard"
              className="block w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-slate-700 transition hover:bg-slate-50"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/marketplace"
            className="mb-4 inline-flex items-center text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Become a Supplier</h1>
          <p className="text-slate-600">
            Join our marketplace and connect with thousands of buyers worldwide
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                  step >= s ? 'bg-primary-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`h-1 w-20 ${step > s ? 'bg-primary-500' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-large">
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Company Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Company Information</h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => updateFormData('companyName', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                        placeholder="Your Company Ltd."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => updateFormData('contactName', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                        placeholder="contact@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => updateFormData('website', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                        placeholder="https://www.company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Country *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => updateFormData('country', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Company Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe your company, capabilities, and what makes you unique..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Capabilities */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">
                  Capabilities & Certifications
                </h2>

                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-700">
                    Specialties (Select all that apply) *
                  </label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {specialtyOptions.map((specialty) => (
                      <label
                        key={specialty}
                        className={`flex cursor-pointer items-center rounded-lg border p-3 transition ${
                          formData.specialties.includes(specialty)
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-200 hover:border-primary-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.specialties.includes(specialty)}
                          onChange={() => toggleArrayItem('specialties', specialty)}
                          className="sr-only"
                        />
                        <span
                          className={`mr-3 flex h-5 w-5 items-center justify-center rounded border ${
                            formData.specialties.includes(specialty)
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-slate-300'
                          }`}
                        >
                          {formData.specialties.includes(specialty) && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </span>
                        <span className="text-sm text-slate-700">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-700">
                    Certifications
                  </label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {certificationOptions.map((cert) => (
                      <label
                        key={cert}
                        className={`flex cursor-pointer items-center rounded-lg border p-3 transition ${
                          formData.certifications.includes(cert)
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-slate-200 hover:border-emerald-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.certifications.includes(cert)}
                          onChange={() => toggleArrayItem('certifications', cert)}
                          className="sr-only"
                        />
                        <span
                          className={`mr-3 flex h-5 w-5 items-center justify-center rounded border ${
                            formData.certifications.includes(cert)
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-slate-300'
                          }`}
                        >
                          {formData.certifications.includes(cert) && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </span>
                        <span className="text-sm text-slate-700">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Business Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Business Details</h2>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Years in Business *
                    </label>
                    <select
                      required
                      value={formData.yearsInBusiness}
                      onChange={(e) => updateFormData('yearsInBusiness', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select...</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-20">11-20 years</option>
                      <option value="20+">20+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Number of Employees *
                    </label>
                    <select
                      required
                      value={formData.employeeCount}
                      onChange={(e) => updateFormData('employeeCount', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select...</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Annual Revenue
                    </label>
                    <select
                      value={formData.annualRevenue}
                      onChange={(e) => updateFormData('annualRevenue', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="<1M">Less than $1M</option>
                      <option value="1-5M">$1M - $5M</option>
                      <option value="5-10M">$5M - $10M</option>
                      <option value="10-50M">$10M - $50M</option>
                      <option value="50M+">$50M+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Supporting Documents (Optional)
                  </label>
                  <div className="rounded-lg border-2 border-dashed border-slate-300 p-8 text-center">
                    <Upload className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                    <p className="mb-2 text-slate-600">
                      Upload certifications, company profile, or product catalogs
                    </p>
                    <p className="mb-4 text-sm text-slate-500">
                      PDF, DOC, or images up to 10MB each
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={(e) =>
                        updateFormData('documents', Array.from(e.target.files || []))
                      }
                      className="hidden"
                      id="documents"
                    />
                    <label
                      htmlFor="documents"
                      className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Choose Files
                    </label>
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center text-sm text-slate-600">
                          <FileText className="mr-2 h-4 w-4" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-slate-600">
                      I agree to the{' '}
                      <Link href="/terms" className="text-primary-600 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-primary-600 hover:underline">
                        Privacy Policy
                      </Link>
                      . I confirm that the information provided is accurate.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button type="button" onClick={() => setStep(step + 1)} className="btn-primary">
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
