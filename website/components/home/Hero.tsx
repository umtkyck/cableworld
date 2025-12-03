'use client'

import Link from 'next/link'
import { ArrowRight, Upload, CheckCircle, Sparkles, ShoppingCart } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] gradient-bg text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 -left-40 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl animate-blob animation-delay-4000" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          {/* Left Content */}
          <div className="animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-orange-300 to-emerald-300 bg-clip-text text-transparent">Instant quotes in under 60 seconds</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your One-Stop Shop for
              <span className="block mt-2 text-gradient-warm">Cable Harnesses</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
              Upload your design and get instant quotes from our global network of certified manufacturers.
              Quality guaranteed, delivered fast.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/quote" className="btn-primary text-lg group">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Get Instant Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/how-it-works" className="btn glass hover:bg-white/20 text-white text-lg">
                How It Works
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">ISO 9001 Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">RoHS Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">UL Listed</span>
              </div>
            </div>
          </div>

          {/* Right Content - Upload Preview Card */}
          <div className="animate-slide-up animation-delay-200">
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-emerald-500/30 blur-2xl rounded-3xl transform scale-95" />

              <div className="relative bg-white rounded-2xl shadow-large p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Start Your Quote</h3>
                  <p className="text-slate-600">Upload your harness design to begin</p>
                </div>

                {/* Upload Zone */}
                <Link href="/quote" className="block border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:border-orange-400 hover:bg-orange-50/50 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Upload className="w-8 h-8 text-orange-500" />
                  </div>
                  <p className="text-slate-900 font-semibold mb-2">Drag & drop files here</p>
                  <p className="text-sm text-slate-600 mb-4">or click to browse</p>
                  <p className="text-xs text-slate-500">
                    Supports: CAD, PDF, Excel, Images • Max 100MB
                  </p>
                </Link>

                {/* Feature Pills */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">60s</div>
                    <div className="text-xs text-slate-600 font-medium">Quote Time</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">50+</div>
                    <div className="text-xs text-slate-600 font-medium">Manufacturers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">95%</div>
                    <div className="text-xs text-slate-600 font-medium">On-Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
