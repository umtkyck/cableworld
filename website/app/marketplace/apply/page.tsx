'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  AlertCircle
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
  'Industrial Cables'
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
  'IPC/WHMA-A-620'
]

export default function SupplierApplicationPage() {
  const { user } = useAuth()
  const router = useRouter()
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
    documents: []
  })

  const updateFormData = (field: keyof FormData, value: string | string[] | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: 'specialties' | 'certifications', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // In production, this would send to backend API
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitted(true)
    } catch {
      setError('Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h1>
          <p className="text-slate-600 mb-8">
            Thank you for your interest in becoming a supplier. Our team will review your
            application and contact you within 3-5 business days.
          </p>
          <div className="space-y-3">
            <Link href="/marketplace" className="btn-primary w-full justify-center inline-flex">
              Back to Marketplace
            </Link>
            <Link
              href="/dashboard"
              className="block w-full py-3 px-4 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition text-center"
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
        <div className="text-center mb-8">
          <Link
            href="/marketplace"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Become a Supplier</h1>
          <p className="text-slate-600">
            Join our marketplace and connect with thousands of buyers worldwide
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-20 h-1 ${
                    step > s ? 'bg-primary-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-large p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Company Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Company Information</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => updateFormData('companyName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your Company Ltd."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => updateFormData('contactName', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="contact@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => updateFormData('website', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="https://www.company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Country *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => updateFormData('country', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe your company, capabilities, and what makes you unique..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Capabilities */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Capabilities & Certifications</h2>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Specialties (Select all that apply) *
                  </label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {specialtyOptions.map((specialty) => (
                      <label
                        key={specialty}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
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
                        <span className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                          formData.specialties.includes(specialty)
                            ? 'bg-primary-500 border-primary-500'
                            : 'border-slate-300'
                        }`}>
                          {formData.specialties.includes(specialty) && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </span>
                        <span className="text-sm text-slate-700">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Certifications
                  </label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {certificationOptions.map((cert) => (
                      <label
                        key={cert}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
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
                        <span className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                          formData.certifications.includes(cert)
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-slate-300'
                        }`}>
                          {formData.certifications.includes(cert) && (
                            <CheckCircle className="w-4 h-4 text-white" />
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
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Business Details</h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Years in Business *
                    </label>
                    <select
                      required
                      value={formData.yearsInBusiness}
                      onChange={(e) => updateFormData('yearsInBusiness', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Employees *
                    </label>
                    <select
                      required
                      value={formData.employeeCount}
                      onChange={(e) => updateFormData('employeeCount', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Annual Revenue
                    </label>
                    <select
                      value={formData.annualRevenue}
                      onChange={(e) => updateFormData('annualRevenue', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Supporting Documents (Optional)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">
                      Upload certifications, company profile, or product catalogs
                    </p>
                    <p className="text-sm text-slate-500 mb-4">
                      PDF, DOC, or images up to 10MB each
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={(e) => updateFormData('documents', Array.from(e.target.files || []))}
                      className="hidden"
                      id="documents"
                    />
                    <label
                      htmlFor="documents"
                      className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Choose Files
                    </label>
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center text-sm text-slate-600">
                          <FileText className="w-4 h-4 mr-2" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
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
                  className="px-6 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="btn-primary"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-5 h-5 ml-2" />
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
