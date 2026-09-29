'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, ShoppingCart, LogOut, Moon, Sun, Sparkles, Zap } from 'lucide-react'
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
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      {/* Promotional Banner */}
      {showBanner && (
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 px-4 py-2.5 text-white">
          {/* Animated background shimmer */}
          <div
            className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ animationDuration: '3s' }}
          />

          <div className="container-custom relative z-10 flex items-center justify-center gap-3 text-sm font-medium">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="hidden sm:inline">Free Worldwide Shipping on orders over $1,000</span>
            <span className="sm:hidden">Free Shipping over $1,000</span>
            <span className="mx-2 hidden text-emerald-200 sm:inline">|</span>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/30"
            >
              <Zap className="h-3 w-3" />
              Shop Now
            </Link>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition-all duration-300 hover:rotate-90 hover:bg-white/20"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-200/50 bg-white/80 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80'
            : 'border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Logo variant="default" showText={true} size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-1 md:flex">
              <div className="group relative">
                <button className="flex items-center space-x-1 rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-primary-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-400">
                  <span>Products</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full mt-2 w-64 translate-y-2 transform rounded-2xl border border-slate-200/50 bg-white/95 p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-slate-700/50 dark:bg-slate-800/95">
                  <Link
                    href="/cable-designer"
                    className="group/item flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent dark:hover:from-orange-900/20"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/10 to-emerald-500/10 transition-transform duration-300 group-hover/item:scale-110">
                      <Zap className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        Cable Designer
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Design custom cables
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/cad-viewer"
                    className="group/item flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent dark:hover:from-orange-900/20"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 transition-transform duration-300 group-hover/item:scale-110">
                      <svg
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        CAD Viewer
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        View 3D CAD files
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/services"
                    className="group/item flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent dark:hover:from-orange-900/20"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 transition-transform duration-300 group-hover/item:scale-110">
                      <Sparkles className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        Design Services
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Expert consultation
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <Link
                href="/shop"
                className="hover-underline rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-primary-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-400"
              >
                Shop
              </Link>
              <Link
                href="/marketplace"
                className="hover-underline rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-primary-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-400"
              >
                Marketplace
              </Link>
              <Link
                href="/pricing"
                className="hover-underline rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-primary-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-400"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="hover-underline rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-primary-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-400"
              >
                Contact
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden items-center space-x-2 md:flex">
              {user && (
                <Link
                  href="/dashboard"
                  className="rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-primary-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-400"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={toggleTheme}
                className="rounded-xl p-2.5 text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-primary-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-400"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link
                href="/cart"
                className="group relative rounded-xl p-2.5 text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-primary-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-400"
              >
                <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 animate-bounce-gentle items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 text-xs font-bold text-white shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 text-sm font-bold text-white">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <span className="max-w-[120px] truncate font-medium">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl p-2.5 text-slate-500 transition-all duration-300 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="rounded-xl px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-primary-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-400"
                >
                  Sign In
                </Link>
              )}
              <Link href="/quote" className="btn-primary ml-2">
                <Sparkles className="mr-2 h-4 w-4" />
                Get Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="animate-fade-in space-y-2 py-4 md:hidden">
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span>Products</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {productsOpen && (
                <div className="space-y-2 pl-4">
                  <Link
                    href="/cable-designer"
                    className="block rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    Cable Designer
                  </Link>
                  <Link
                    href="/cad-viewer"
                    className="block rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    CAD Viewer
                  </Link>
                  <Link
                    href="/services"
                    className="block rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    Design Services
                  </Link>
                </div>
              )}
              <Link
                href="/shop"
                className="block rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Shop
              </Link>
              <Link
                href="/marketplace"
                className="block rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Marketplace
              </Link>
              <Link
                href="/how-it-works"
                className="block rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="block rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="block rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Contact
              </Link>
              <div className="space-y-2 pt-4">
                <button
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <Link
                  href="/login"
                  className="block w-full rounded-lg border border-slate-200 px-4 py-2 text-center text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Sign In
                </Link>
                <Link href="/quote" className="btn-primary block w-full text-center">
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
