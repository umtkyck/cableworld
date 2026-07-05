'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, ShoppingCart, LogOut, Moon, Sun } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useRouter } from 'next/navigation'

const navLinkClass = 'px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200'

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
        <div className="bg-slate-900 dark:bg-slate-900 text-white py-2 px-4 relative">
          <div className="container-custom flex items-center justify-center gap-3 text-xs sm:text-sm">
            <span className="hidden sm:inline">Free Worldwide Shipping on orders over $1,000</span>
            <span className="sm:hidden">Free Shipping over $1,000</span>
            <Link href="/shop" className="underline underline-offset-4 hover:no-underline font-medium">
              Shop Now
            </Link>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <nav className={`sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-shadow duration-200 border-b border-slate-200 dark:border-slate-800 ${
        scrolled ? 'shadow-soft' : ''
      }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Logo variant="default" showText={true} size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="relative group">
              <button className={`flex items-center gap-1 ${navLinkClass}`}>
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-56 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-medium p-1.5">
                  <Link href="/cable-designer" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">Cable Designer</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Design custom cables</div>
                  </Link>
                  <Link href="/cad-viewer" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">CAD Viewer</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">View 3D CAD files</div>
                  </Link>
                  <Link href="/services" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">Design Services</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Expert consultation</div>
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
          <div className="hidden md:flex items-center gap-1">
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
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
            <Link href="/cart" className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
              <ShoppingCart className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <div className="flex items-center gap-2 px-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-semibold text-xs">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-[18px] h-[18px]" />
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
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-1 animate-fade-in border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg"
            >
              <span>Products</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
            </button>
            {productsOpen && (
              <div className="pl-3 space-y-1">
                <Link href="/cable-designer" className="block px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
                  Cable Designer
                </Link>
                <Link href="/cad-viewer" className="block px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
                  CAD Viewer
                </Link>
                <Link href="/services" className="block px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
                  Design Services
                </Link>
              </div>
            )}
            <Link href="/shop" className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
              Shop
            </Link>
            <Link href="/marketplace" className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
              Marketplace
            </Link>
            <Link href="/how-it-works" className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
              How It Works
            </Link>
            <Link href="/pricing" className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
              Pricing
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
              Contact
            </Link>
            <div className="pt-3 space-y-2">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <Link href="/login" className="block w-full text-center px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
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
