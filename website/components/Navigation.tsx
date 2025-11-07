'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, ShoppingCart, LogOut, User as UserIcon, Moon, Sun } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Logo variant="default" showText={true} size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 transition">
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-large border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/cable-designer" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-t-lg">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">Cable Designer</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Design custom cables</div>
                </Link>
                <Link href="/cad-viewer" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">CAD Viewer</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">View 3D CAD files</div>
                </Link>
                <Link href="/services" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-b-lg">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">Design Services</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Expert consultation</div>
                </Link>
              </div>
            </div>

            <Link href="/shop" className="text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 transition">
              Shop
            </Link>
            <Link href="/marketplace" className="text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 transition">
              Marketplace
            </Link>
            <Link href="/pricing" className="text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 transition">
              Pricing
            </Link>
            <Link href="/contact" className="text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 transition">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <Link href="/dashboard" className="text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 transition">
                Dashboard
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 transition"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <Link href="/cart" className="relative p-2 text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 transition">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-green text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <UserIcon className="w-5 h-5" />
                  <span className="font-medium">{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-slate-700 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-400 transition flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 transition">
                Sign In
              </Link>
            )}
            <Link href="/quote" className="btn-primary">
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
  )
}
