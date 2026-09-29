'use client'

import Link from 'next/link'
import {
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Sparkles,
  Globe,
  Shield,
  Zap,
} from 'lucide-react'
import Logo from './Logo'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="container-custom py-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-orange-500/10 via-transparent to-emerald-500/10 p-8 backdrop-blur-sm md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                    <Sparkles className="h-4 w-4 text-orange-400" />
                    <span className="text-sm font-medium">Stay Updated</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold md:text-3xl">Get the latest updates</h3>
                  <p className="text-slate-400">
                    Subscribe to our newsletter for industry insights, product updates, and
                    exclusive offers.
                  </p>
                </div>
                <div>
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-white/20 bg-white/10 py-4 pl-12 pr-4 text-white transition-all placeholder:text-slate-400 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary group whitespace-nowrap">
                      {subscribed ? (
                        <>Subscribed!</>
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                  <p className="mt-3 text-xs text-slate-500">
                    By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom relative py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-block">
              <Logo variant="white" showText={true} size="lg" />
            </Link>
            <p className="mb-6 leading-relaxed text-slate-400">
              Revolutionizing cable and wire harness manufacturing with instant quotes, AI-powered
              design analysis, and a global manufacturer network.
            </p>

            {/* Contact Info */}
            <div className="mb-6 space-y-3">
              <a
                href="mailto:hello@harnesscart.com"
                className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-orange-500/20">
                  <Mail className="h-5 w-5" />
                </div>
                <span>hello@harnesscart.com</span>
              </a>
              <a
                href="tel:+1-800-HARNESS"
                className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-orange-500/20">
                  <Phone className="h-5 w-5" />
                </div>
                <span>1-800-HARNESS</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-orange-500 hover:to-emerald-500"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-orange-500 hover:to-emerald-500"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-orange-500 hover:to-emerald-500"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/quote"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Cable Harnesses
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Connectors
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Wire Assemblies
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Custom Cables
                </Link>
              </li>
              <li>
                <Link
                  href="/cable-designer"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Cable Designer
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/quality"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Quality Assurance
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/documentation"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/api-reference"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover-underline inline-block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Certifications</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <Shield className="h-8 w-8 text-emerald-400" />
                <div>
                  <div className="text-sm font-semibold">ISO 9001:2015</div>
                  <div className="text-xs text-slate-500">Certified</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <Globe className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-sm font-semibold">RoHS</div>
                  <div className="text-xs text-slate-500">Compliant</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <Zap className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="text-sm font-semibold">UL Listed</div>
                  <div className="text-xs text-slate-500">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Harness Cart. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
              <Link href="/privacy" className="text-slate-400 transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 transition-colors hover:text-white">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-slate-400 transition-colors hover:text-white">
                Cookie Policy
              </Link>
              <Link
                href="/accessibility"
                className="text-slate-400 transition-colors hover:text-white"
              >
                Accessibility
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
