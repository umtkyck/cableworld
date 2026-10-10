'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, ShoppingCart, LogOut, Moon, Sun } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useRouter } from 'next/navigation'

const navLinkClass =
  'px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const { cartCount } = useCart()
  const { user, isAdmin, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const router = useRouter()

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
      {/* Announcement bar */}
      {showBanner && (
        <div className="relative bg-slate-900 px-4 py-2 text-white dark:bg-slate-900">
          <div className="container-custom flex items-center justify-center gap-3 text-xs sm:text-sm">
            <span className="hidden sm:inline">
              Free North America shipping on orders over $1,000
            </span>
            <span className="sm:hidden">Free shipping over $1,000 (US/CA/MX)</span>
            <Link
              href="/shop"
              className="font-medium underline underline-offset-4 hover:no-underline"
            >
              Shop Now
            </Link>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-white"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <nav
        className={`sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md transition-shadow duration-200 dark:border-slate-800 dark:bg-slate-950/90 ${
          scrolled ? 'shadow-soft' : ''
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Logo variant="default" showText={true} size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center md:flex">
              <div className="group relative">
                <button className={`flex items-center gap-1 ${navLinkClass}`}>
                  <span>Products</span>
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-medium dark:border-slate-800 dark:bg-slate-900">
                    <Link
                      href="/cable-designer"
                      className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        Cable Designer
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Design custom cables
                      </div>
                    </Link>
                    <Link
                      href="/cad-viewer"
                      className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        CAD Viewer
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        View 3D CAD files
                      </div>
                    </Link>
                    <Link
                      href="/services"
                      className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        Design Services
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Expert consultation
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/shop" className={navLinkClass}>
                Shop
              </Link>
              <Link href="/marketplace" className={navLinkClass}>
                Marketplace
              </Link>
              <Link href="/pricing" className={navLinkClass}>
                Pricing
              </Link>
              <Link href="/contact" className={navLinkClass}>
                Contact
              </Link>
            </div>

            {/* Actions */}
            <div className="hidden items-center gap-1 md:flex">
              {user && (
                <Link href="/dashboard" className={navLinkClass}>
                  Dashboard
                </Link>
              )}
              {isAdmin && (
                <Link href="/admin" className={navLinkClass}>
                  Admin
                </Link>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-[18px] w-[18px]" />
                ) : (
                  <Moon className="h-[18px] w-[18px]" />
                )}
              </button>
              <Link
                href="/cart"
                className="relative p-2 text-slate-500 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <ShoppingCart className="h-[18px] w-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-semibold text-white dark:bg-white dark:text-slate-900">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <span className="max-w-[120px] truncate">{user.displayName || user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-500 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="h-[18px] w-[18px]" />
                  </button>
                </>
              ) : (
                <Link href="/login" className={navLinkClass}>
                  Sign In
                </Link>
              )}
              <Link href="/quote" className="btn-primary btn-sm ml-2">
                Get Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white md:hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="animate-fade-in space-y-1 border-t border-slate-200 py-4 dark:border-slate-800 md:hidden">
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                <span>Products</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {productsOpen && (
                <div className="space-y-1 pl-3">
                  <Link
                    href="/cable-designer"
                    className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                  >
                    Cable Designer
                  </Link>
                  <Link
                    href="/cad-viewer"
                    className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                  >
                    CAD Viewer
                  </Link>
                  <Link
                    href="/services"
                    className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                  >
                    Design Services
                  </Link>
                </div>
              )}
              <Link
                href="/shop"
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Shop
              </Link>
              <Link
                href="/marketplace"
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Marketplace
              </Link>
              <Link
                href="/how-it-works"
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Contact
              </Link>
              <div className="space-y-2 pt-3">
                <button
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <Link
                  href="/login"
                  className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-center text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  Sign In
                </Link>
                <Link href="/quote" className="btn-primary w-full">
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
