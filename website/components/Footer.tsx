import Link from 'next/link'
import { Linkedin, Twitter, Youtube, Mail } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-primary-500 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Logo variant="white" showText={true} size="md" />
            </Link>
            <p className="text-slate-300 mb-4 max-w-md">
              Revolutionizing cable and wire harness manufacturing with instant quotes,
              AI-powered design analysis, and a global manufacturer network.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/cable-harnesses" className="text-slate-300 hover:text-white transition">Cable Harnesses</Link></li>
              <li><Link href="/connectors" className="text-slate-300 hover:text-white transition">Connectors</Link></li>
              <li><Link href="/wire-assemblies" className="text-slate-300 hover:text-white transition">Wire Assemblies</Link></li>
              <li><Link href="/custom-cables" className="text-slate-300 hover:text-white transition">Custom Cables</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-slate-300 hover:text-white transition">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-slate-300 hover:text-white transition">How It Works</Link></li>
              <li><Link href="/quality" className="text-slate-300 hover:text-white transition">Quality Assurance</Link></li>
              <li><Link href="/careers" className="text-slate-300 hover:text-white transition">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/documentation" className="text-slate-300 hover:text-white transition">Documentation</Link></li>
              <li><Link href="/api" className="text-slate-300 hover:text-white transition">API Reference</Link></li>
              <li><Link href="/blog" className="text-slate-300 hover:text-white transition">Blog</Link></li>
              <li><Link href="/case-studies" className="text-slate-300 hover:text-white transition">Case Studies</Link></li>
              <li><Link href="/support" className="text-slate-300 hover:text-white transition">Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-300 text-sm">
            © 2024 Harness Cart. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-slate-300 hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-300 hover:text-white transition">Terms of Service</Link>
            <Link href="/cookies" className="text-slate-300 hover:text-white transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
