'use client'

import Link from 'next/link'
import { ArrowRight, Upload, CheckCircle, Sparkles, ShoppingCart, Shield, Zap, Globe, Play } from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative min-h-[90vh] gradient-bg text-white overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-orange-500/25 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] animate-float" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400/40 rounded-full animate-float animation-delay-200" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-emerald-400/30 rounded-full animate-float animation-delay-400" />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-white/20 rounded-full animate-float animation-delay-600" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-28">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-emerald-500/20 backdrop-blur-md rounded-full px-5 py-2.5 mb-8 border border-white/10 shadow-lg animate-bounce-gentle">
              <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-300 to-emerald-300 bg-clip-text text-transparent">Instant quotes in under 60 seconds</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              Your One-Stop Shop for
              <span className="block mt-3 relative">
                <span className="text-gradient-warm text-shadow-lg">Cable Harnesses</span>
                {/* Underline decoration */}
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 2 150 2 298 10" stroke="url(#underline-gradient)" strokeWidth="4" strokeLinecap="round" className="animate-fade-in animation-delay-600"/>
                  <defs>
                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-300 mb-10 max-w-xl leading-relaxed animate-fade-in animation-delay-200">
              Upload your design and get instant quotes from our global network of certified manufacturers.
              <span className="text-white font-semibold"> Quality guaranteed, delivered fast.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in animation-delay-300">
              <Link
                href="/quote"
                className="btn-primary btn-lg group relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Get Instant Quote
                <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </Link>
              <Link href="/how-it-works" className="btn btn-lg glass hover:bg-white/20 text-white group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                How It Works
              </Link>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 animate-fade-in animation-delay-400">
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">ISO 9001 Certified</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">RoHS Compliant</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <Zap className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-medium">UL Listed</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Upload Preview Card */}
          <div className="animate-fade-in-up animation-delay-300">
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-emerald-500/40 blur-3xl rounded-3xl transform scale-95 animate-glow-pulse" />

              {/* Floating decoration elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl rotate-12 opacity-80 animate-float shadow-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl -rotate-12 opacity-80 animate-float animation-delay-400 shadow-xl" />

              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500/10 to-emerald-500/10 rounded-2xl mb-4">
                    <Globe className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Start Your Quote</h3>
                  <p className="text-slate-600">Upload your harness design to begin</p>
                </div>

                {/* Upload Zone */}
                <Link href="/quote" className="block border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50/50 hover:to-emerald-50/50 transition-all duration-500 cursor-pointer group">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <Upload className="w-10 h-10 text-orange-500 group-hover:animate-bounce-gentle" />
                  </div>
                  <p className="text-slate-900 font-bold text-lg mb-2">Drag & drop files here</p>
                  <p className="text-slate-600 mb-4">or click to browse</p>
                  <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-100 rounded-full px-4 py-2">
                    <span>Supports:</span>
                    <span className="font-semibold text-slate-700">CAD, PDF, Excel, Images</span>
                    <span>•</span>
                    <span>Max 100MB</span>
                  </div>
                </Link>

                {/* Enhanced Feature Pills */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-5 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl border border-orange-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                    <div className="text-3xl font-bold text-gradient-warm mb-1">60s</div>
                    <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Quote Time</div>
                  </div>
                  <div className="text-center p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                    <div className="text-3xl font-bold text-gradient-cool mb-1">50+</div>
                    <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Manufacturers</div>
                  </div>
                  <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 mb-1">95%</div>
                    <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider">On-Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider with gradient */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
