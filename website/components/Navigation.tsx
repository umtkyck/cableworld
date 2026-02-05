'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, ShoppingCart, LogOut, User as UserIcon, Moon, Sun, Truck, Sparkles, Zap } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const router = useRouter()

  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch {
      // Error is already handled in AuthContext
    }
  }

  return (
    <>
      {/* Promotional Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white py-2.5 px-4 relative overflow-hidden">
          {/* Animated background shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" style={{ animationDuration: '3s' }} />

          <div className="container-custom flex items-center justify-center gap-3 text-sm font-medium relative z-10">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline">Free Worldwide Shipping on orders over $1,000</span>
            <span className="sm:hidden">Free Shipping over $1,000</span>
            <span className="mx-2 text-emerald-200 hidden sm:inline">|</span>
            <Link href="/shop" className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 font-semibold">
              <Zap className="w-3 h-3" />
              Shop Now
            </Link>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-90"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg border-b border-slate-200/50 dark:border-slate-700/50'
          : 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700'
      }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Logo variant="default" showText={true} size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="relative group">
              <button className="flex items-center space-x-1 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium">
                <span>Products</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 p-2">
                <Link href="/cable-designer" className="flex items-start gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent dark:hover:from-orange-900/20 rounded-xl transition-all duration-300 group/item">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500/10 to-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                    <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">Cable Designer</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Design custom cables</div>
                  </div>
                </Link>
                <Link href="/cad-viewer" className="flex items-start gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent dark:hover:from-orange-900/20 rounded-xl transition-all duration-300 group/item">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">CAD Viewer</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">View 3D CAD files</div>
                  </div>
                </Link>
                <Link href="/services" className="flex items-start gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent dark:hover:from-orange-900/20 rounded-xl transition-all duration-300 group/item">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">Design Services</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Expert consultation</div>
                  </div>
                </Link>
              </div>
            </div>

            <Link href="/shop" className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium hover-underline">
              Shop
            </Link>
            <Link href="/marketplace" className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium hover-underline">
              Marketplace
            </Link>
            <Link href="/pricing" className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium hover-underline">
              Pricing
            </Link>
            <Link href="/contact" className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium hover-underline">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {user && (
              <Link href="/dashboard" className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium">
                Dashboard
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/cart" className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-orange-500 to-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce-gentle">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="font-medium max-w-[120px] truncate">{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link href="/login" className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium">
                Sign In
              </Link>
            )}
            <Link href="/quote" className="btn-primary ml-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
            >
              <span>Products</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
            </button>
            {productsOpen && (
              <div className="pl-4 space-y-2">
                <Link href="/cable-designer" className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                  Cable Designer
                </Link>
                <Link href="/cad-viewer" className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                  CAD Viewer
                </Link>
                <Link href="/services" className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                  Design Services
                </Link>
              </div>
            )}
            <Link href="/shop" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
              Shop
            </Link>
            <Link href="/marketplace" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
              Marketplace
            </Link>
            <Link href="/how-it-works" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
              How It Works
            </Link>
            <Link href="/pricing" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
              Pricing
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
              Contact
            </Link>
            <div className="pt-4 space-y-2">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <Link href="/login" className="block w-full text-center px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                Sign In
              </Link>
              <Link href="/quote" className="block w-full text-center btn-primary">
                Get Instant Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  )
}
