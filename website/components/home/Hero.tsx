'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Upload,
  CheckCircle,
  Sparkles,
  ShoppingCart,
  Shield,
  Zap,
  Globe,
  Play,
} from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="gradient-bg relative min-h-[90vh] overflow-hidden text-white">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />

        {/* Animated Gradient Orbs */}
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] animate-blob rounded-full bg-orange-500/25 blur-[100px]" />
        <div className="animation-delay-2000 absolute right-0 top-40 h-[400px] w-[400px] animate-blob rounded-full bg-emerald-500/20 blur-[100px]" />
        <div className="animation-delay-4000 absolute -bottom-20 left-1/3 h-[500px] w-[500px] animate-blob rounded-full bg-orange-600/20 blur-[100px]" />
        <div className="absolute right-1/4 top-1/2 h-[300px] w-[300px] animate-float rounded-full bg-blue-500/10 blur-[80px]" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Particles */}
        <div className="animation-delay-200 absolute left-1/4 top-1/4 h-2 w-2 animate-float rounded-full bg-orange-400/40" />
        <div className="animation-delay-400 absolute right-1/3 top-1/3 h-3 w-3 animate-float rounded-full bg-emerald-400/30" />
        <div className="animation-delay-600 absolute bottom-1/3 left-1/2 h-2 w-2 animate-float rounded-full bg-white/20" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="mb-8 inline-flex animate-bounce-gentle items-center space-x-2 rounded-full border border-white/10 bg-gradient-to-r from-orange-500/20 to-emerald-500/20 px-5 py-2.5 shadow-lg backdrop-blur-md">
              <Sparkles className="h-4 w-4 animate-pulse text-orange-400" />
              <span className="bg-gradient-to-r from-orange-300 to-emerald-300 bg-clip-text text-sm font-semibold text-transparent">
                Instant quotes in under 60 seconds
              </span>
            </div>

            <h1 className="mb-8 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Your One-Stop Shop for
              <span className="relative mt-3 block">
                <span className="text-gradient-warm text-shadow-lg">Cable Harnesses</span>
                {/* Underline decoration */}
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 2 150 2 298 10"
                    stroke="url(#underline-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="animation-delay-600 animate-fade-in"
                  />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="animation-delay-200 mb-10 max-w-xl animate-fade-in text-xl leading-relaxed text-slate-300 lg:text-2xl">
              Upload your design and get instant quotes from our global network of certified
              manufacturers.
              <span className="font-semibold text-white"> Quality guaranteed, delivered fast.</span>
            </p>

            <div className="animation-delay-300 mb-12 flex animate-fade-in flex-col gap-4 sm:flex-row">
              <Link
                href="/quote"
                className="btn-primary btn-lg group relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Get Instant Quote
                <ArrowRight
                  className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                />
              </Link>
              <Link
                href="/how-it-works"
                className="btn btn-lg glass group text-white hover:bg-white/20"
              >
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                How It Works
              </Link>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="animation-delay-400 flex animate-fade-in flex-wrap items-center gap-4 lg:gap-6">
              <div className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium">ISO 9001 Certified</span>
              </div>
              <div className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium">RoHS Compliant</span>
              </div>
              <div className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <Zap className="h-5 w-5 text-orange-400" />
                <span className="text-sm font-medium">UL Listed</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Upload Preview Card */}
          <div className="animation-delay-300 animate-fade-in-up">
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 scale-95 transform animate-glow-pulse rounded-3xl bg-gradient-to-r from-orange-500/40 to-emerald-500/40 blur-3xl" />

              {/* Floating decoration elements */}
              <div className="absolute -right-6 -top-6 h-20 w-20 rotate-12 animate-float rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 opacity-80 shadow-xl" />
              <div className="animation-delay-400 absolute -bottom-4 -left-4 h-16 w-16 -rotate-12 animate-float rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 opacity-80 shadow-xl" />

              <div className="relative rounded-3xl border border-white/50 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-8 text-center">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/10 to-emerald-500/10">
                    <Globe className="h-7 w-7 text-orange-500" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-slate-900">Start Your Quote</h3>
                  <p className="text-slate-600">Upload your harness design to begin</p>
                </div>

                {/* Upload Zone */}
                <Link
                  href="/quote"
                  className="group block cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center transition-all duration-500 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50/50 hover:to-emerald-50/50"
                >
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 shadow-lg transition-all duration-500 group-hover:rotate-3 group-hover:scale-110">
                    <Upload className="h-10 w-10 text-orange-500 group-hover:animate-bounce-gentle" />
                  </div>
                  <p className="mb-2 text-lg font-bold text-slate-900">Drag & drop files here</p>
                  <p className="mb-4 text-slate-600">or click to browse</p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-500">
                    <span>Supports:</span>
                    <span className="font-semibold text-slate-700">CAD, PDF, Excel, Images</span>
                    <span>•</span>
                    <span>Max 100MB</span>
                  </div>
                </Link>

                {/* Enhanced Feature Pills */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="cursor-default rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-orange-100/50 p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="text-gradient-warm mb-1 text-3xl font-bold">60s</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Quote Time
                    </div>
                  </div>
                  <div className="cursor-default rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="text-gradient-cool mb-1 text-3xl font-bold">50+</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Manufacturers
                    </div>
                  </div>
                  <div className="cursor-default rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="mb-1 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
                      95%
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      On-Time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider with gradient */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
