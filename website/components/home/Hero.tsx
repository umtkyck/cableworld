'use client'

import Link from 'next/link'
import { ArrowRight, Upload, Zap, CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative gradient-bg text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          {/* Left Content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-accent-yellow" />
              <span className="text-sm font-medium">Instant quotes in under 60 seconds</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Cable Harness Manufacturing,
              <span className="text-accent-green"> Simplified</span>
            </h1>

            <p className="text-xl text-slate-200 mb-8 max-w-xl">
              Upload your design and get instant quotes from our global network of vetted manufacturers.
              No more waiting days for quotes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/quote" className="btn-primary text-lg group">
                Get Instant Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/how-it-works" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-500">
                How It Works
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-accent-green" />
                <span className="text-sm">ISO 9001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-accent-green" />
                <span className="text-sm">RoHS Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-accent-green" />
                <span className="text-sm">UL Listed</span>
              </div>
            </div>
          </div>

          {/* Right Content - Upload Preview */}
          <div className="animate-slide-up animation-delay-200">
            <div className="bg-white rounded-2xl shadow-large p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Start Your Quote</h3>
                <p className="text-slate-600">Upload your harness diagram to begin</p>
              </div>

              {/* Upload Zone */}
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-accent-green transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-accent-green" />
                </div>
                <p className="text-slate-900 font-semibold mb-2">Drag & drop files here</p>
                <p className="text-sm text-slate-600 mb-4">or click to browse</p>
                <p className="text-xs text-slate-500">
                  Supports: CAD, PDF, Excel, Images • Max 100MB
                </p>
              </div>

              {/* Feature Pills */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent-green">60s</div>
                  <div className="text-xs text-slate-600">Quote Time</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent-green">50+</div>
                  <div className="text-xs text-slate-600">Manufacturers</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent-green">95%</div>
                  <div className="text-xs text-slate-600">On-Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
