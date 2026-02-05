'use client'

import Link from 'next/link'
import { Linkedin, Twitter, Youtube, Mail, MapPin, Phone, ArrowRight, Sparkles, Globe, Shield, Zap } from 'lucide-react'
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
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500/10 via-transparent to-emerald-500/10 rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-4">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-medium">Stay Updated</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Get the latest updates
                  </h3>
                  <p className="text-slate-400">
                    Subscribe to our newsletter for industry insights, product updates, and exclusive offers.
                  </p>
                </div>
                <div>
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary whitespace-nowrap group"
                    >
                      {subscribed ? (
                        <>Subscribed!</>
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-slate-500 mt-3">
                    By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-block">
              <Logo variant="white" showText={true} size="lg" />
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Revolutionizing cable and wire harness manufacturing with instant quotes,
              AI-powered design analysis, and a global manufacturer network.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:hello@harnesscart.com" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>hello@harnesscart.com</span>
              </a>
              <a href="tel:+1-800-HARNESS" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>1-800-HARNESS</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-emerald-500 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-emerald-500 transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                 className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-emerald-500 transition-all duration-300 hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/cable-harnesses" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Cable Harnesses</Link></li>
              <li><Link href="/connectors" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Connectors</Link></li>
              <li><Link href="/wire-assemblies" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Wire Assemblies</Link></li>
              <li><Link href="/custom-cables" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Custom Cables</Link></li>
              <li><Link href="/cable-designer" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Cable Designer</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">How It Works</Link></li>
              <li><Link href="/quality" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Quality Assurance</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/documentation" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Documentation</Link></li>
              <li><Link href="/api" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">API Reference</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Blog</Link></li>
              <li><Link href="/case-studies" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Case Studies</Link></li>
              <li><Link href="/support" className="text-slate-400 hover:text-orange-400 transition-colors hover-underline inline-block">Support</Link></li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Certifications</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <Shield className="w-8 h-8 text-emerald-400" />
                <div>
                  <div className="font-semibold text-sm">ISO 9001:2015</div>
                  <div className="text-xs text-slate-500">Certified</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <Globe className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="font-semibold text-sm">RoHS</div>
                  <div className="text-xs text-slate-500">Compliant</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <Zap className="w-8 h-8 text-orange-400" />
                <div>
                  <div className="font-semibold text-sm">UL Listed</div>
                  <div className="text-xs text-slate-500">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Harness Cart. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="/accessibility" className="text-slate-400 hover:text-white transition-colors">Accessibility</Link>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
