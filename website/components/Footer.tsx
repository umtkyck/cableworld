'use client'

import Link from 'next/link'
import { Linkedin, Twitter, Youtube, ArrowRight } from 'lucide-react'
import Logo from './Logo'
import { useState } from 'react'

const footerLinkClass = 'text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200'

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
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="mb-5 inline-block">
              <Logo variant="default" showText={true} size="md" />
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-xs">
              Instant quotes, AI-powered design analysis, and a global
              manufacturer network for cable and wire harnesses.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="input-modern text-sm"
                aria-label="Email address"
                required
              />
              <button
                type="submit"
                className="btn-primary btn-sm flex-shrink-0"
                aria-label="Subscribe to newsletter"
              >
                {subscribed ? 'Done' : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-slate-900 dark:text-white">Products</h3>
            <ul className="space-y-2.5">
              <li><Link href="/quote" className={footerLinkClass}>Cable Harnesses</Link></li>
              <li><Link href="/shop" className={footerLinkClass}>Connectors</Link></li>
              <li><Link href="/shop" className={footerLinkClass}>Wire Assemblies</Link></li>
              <li><Link href="/shop" className={footerLinkClass}>Custom Cables</Link></li>
              <li><Link href="/cable-designer" className={footerLinkClass}>Cable Designer</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-slate-900 dark:text-white">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className={footerLinkClass}>About Us</Link></li>
              <li><Link href="/how-it-works" className={footerLinkClass}>How It Works</Link></li>
              <li><Link href="/quality" className={footerLinkClass}>Quality Assurance</Link></li>
              <li><Link href="/careers" className={footerLinkClass}>Careers</Link></li>
              <li><Link href="/contact" className={footerLinkClass}>Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-slate-900 dark:text-white">Resources</h3>
            <ul className="space-y-2.5">
              <li><Link href="/documentation" className={footerLinkClass}>Documentation</Link></li>
              <li><Link href="/api-reference" className={footerLinkClass}>API Reference</Link></li>
              <li><Link href="/blog" className={footerLinkClass}>Blog</Link></li>
              <li><Link href="/case-studies" className={footerLinkClass}>Case Studies</Link></li>
              <li><Link href="/support" className={footerLinkClass}>Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-slate-900 dark:text-white">Contact</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:umtkyck@gmail.com" className={footerLinkClass}>
                  umtkyck@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+12246299664" className={footerLinkClass}>
                  +1 (224) 629-9664
                </a>
              </li>
              <li className="text-sm text-slate-500 dark:text-slate-400">1109 W Bauer Rd, Naperville, IL 60563</li>
            </ul>
            <div className="flex gap-4 mt-5">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                 className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                <Linkedin className="w-[18px] h-[18px]" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                 className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                <Twitter className="w-[18px] h-[18px]" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                 className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                <Youtube className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 mt-14 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} Harness Cart. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/privacy" className={footerLinkClass}>Privacy</Link>
              <Link href="/terms" className={footerLinkClass}>Terms</Link>
              <Link href="/cookies" className={footerLinkClass}>Cookies</Link>
              <Link href="/accessibility" className={footerLinkClass}>Accessibility</Link>
            </div>

            <div className="text-sm text-slate-400 dark:text-slate-500">
              ISO 9001 · RoHS · UL Listed
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
