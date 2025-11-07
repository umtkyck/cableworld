import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from '../Navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

// Mock the contexts and router
jest.mock('@/context/CartContext')
jest.mock('@/context/AuthContext')
jest.mock('next/navigation')
jest.mock('../Logo', () => {
  return function Logo() {
    return <div data-testid="logo">CableWorld Logo</div>
  }
})

const mockLogout = jest.fn()
const mockPush = jest.fn()

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useCart as jest.Mock).mockReturnValue({
      cartCount: 0,
    })
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: mockLogout,
    })
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  describe('Desktop Navigation', () => {
    it('should render logo and main navigation links', () => {
      render(<Navigation />)

      expect(screen.getByTestId('logo')).toBeInTheDocument()
      expect(screen.getByText('Shop')).toBeInTheDocument()
      expect(screen.getByText('Blog')).toBeInTheDocument()
      expect(screen.getByText('Pricing')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('should have Products dropdown with submenu items', () => {
      render(<Navigation />)

      // Find the Products button (there might be multiple in desktop/mobile)
      const productsButtons = screen.getAllByText('Products')
      expect(productsButtons.length).toBeGreaterThan(0)

      // Check submenu items are present
      expect(screen.getByText('Cable Harnesses')).toBeInTheDocument()
      expect(screen.getByText('Connectors')).toBeInTheDocument()
      expect(screen.getByText('Design Services')).toBeInTheDocument()
    })

    it('should render Sign In link when user is not logged in', () => {
      render(<Navigation />)

      // There might be multiple "Sign In" links (desktop and mobile)
      const signInLinks = screen.getAllByText('Sign In')
      expect(signInLinks.length).toBeGreaterThan(0)
    })

    it('should render user info and Sign Out button when user is logged in', () => {
      ;(useAuth as jest.Mock).mockReturnValue({
        user: {
          email: 'test@example.com',
          displayName: 'Test User',
        },
        logout: mockLogout,
      })

      render(<Navigation />)

      expect(screen.getByText('Test User')).toBeInTheDocument()
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
    })

    it('should display user email when displayName is not available', () => {
      ;(useAuth as jest.Mock).mockReturnValue({
        user: {
          email: 'test@example.com',
        },
        logout: mockLogout,
      })

      render(<Navigation />)

      expect(screen.getByText('test@example.com')).toBeInTheDocument()
    })

    it('should show Dashboard link when user is logged in', () => {
      ;(useAuth as jest.Mock).mockReturnValue({
        user: {
          email: 'test@example.com',
        },
        logout: mockLogout,
      })

      render(<Navigation />)

      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    it('should not show Dashboard link when user is not logged in', () => {
      render(<Navigation />)

      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    })

    it('should render Get Quote button', () => {
      render(<Navigation />)

      // There might be multiple "Get Quote" buttons (desktop and mobile)
      const getQuoteButtons = screen.getAllByText(/Get.*Quote/)
      expect(getQuoteButtons.length).toBeGreaterThan(0)
    })
  })

  describe('Shopping Cart', () => {
    it('should display cart icon', () => {
      render(<Navigation />)

      // Cart icon is rendered as an SVG, check for the link to /cart
      const cartLinks = screen.getAllByRole('link').filter(link => link.getAttribute('href') === '/cart')
      expect(cartLinks.length).toBeGreaterThan(0)
    })

    it('should not display cart count badge when cart is empty', () => {
      render(<Navigation />)

      // The badge has specific content, let's check it's not showing "0"
      const badges = document.querySelectorAll('.absolute.-top-1.-right-1')
      expect(badges.length).toBe(0)
    })

    it('should display cart count badge when cart has items', () => {
      ;(useCart as jest.Mock).mockReturnValue({
        cartCount: 5,
      })

      render(<Navigation />)

      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should update cart count badge when cart changes', () => {
      const { rerender } = render(<Navigation />)

      expect(screen.queryByText('3')).not.toBeInTheDocument()

      ;(useCart as jest.Mock).mockReturnValue({
        cartCount: 3,
      })

      rerender(<Navigation />)

      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  describe('User Authentication', () => {
    it('should call logout and redirect to home on Sign Out click', async () => {
      const user = userEvent.setup()
      mockLogout.mockResolvedValue(undefined)

      ;(useAuth as jest.Mock).mockReturnValue({
        user: {
          email: 'test@example.com',
          displayName: 'Test User',
        },
        logout: mockLogout,
      })

      render(<Navigation />)

      const signOutButton = screen.getByText('Sign Out')
      await user.click(signOutButton)

      await waitFor(() => {
        expect(mockLogout).toHaveBeenCalled()
        expect(mockPush).toHaveBeenCalledWith('/')
      })
    })

    it('should handle logout errors gracefully', async () => {
      const user = userEvent.setup()
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockLogout.mockRejectedValue(new Error('Logout failed'))

      ;(useAuth as jest.Mock).mockReturnValue({
        user: {
          email: 'test@example.com',
        },
        logout: mockLogout,
      })

      render(<Navigation />)

      const signOutButton = screen.getByText('Sign Out')
      await user.click(signOutButton)

      await waitFor(() => {
        expect(mockLogout).toHaveBeenCalled()
        expect(consoleErrorSpy).toHaveBeenCalledWith('Logout failed:', expect.any(Error))
      })

      consoleErrorSpy.mockRestore()
    })
  })

  describe('Mobile Navigation', () => {
    it('should toggle mobile menu when hamburger is clicked', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      // Initially, mobile menu items should not be visible (due to {isOpen && ...})
      // But the Products button exists in both desktop and mobile

      // Find the mobile menu button
      const menuButton = screen.getByRole('button', { hidden: true }).parentElement?.querySelector('button')

      // Look for the mobile-specific link "How It Works"
      expect(screen.queryByText('How It Works')).not.toBeInTheDocument()

      // Click hamburger menu
      const buttons = document.querySelectorAll('button.md\\:hidden')
      if (buttons.length > 0) {
        fireEvent.click(buttons[0])
      }

      // Mobile menu should now be visible
      await waitFor(() => {
        expect(screen.getByText('How It Works')).toBeInTheDocument()
      })
    })

    it('should toggle Products submenu in mobile view', async () => {
      render(<Navigation />)

      // Open mobile menu first
      const buttons = document.querySelectorAll('button.md\\:hidden')
      if (buttons.length > 0) {
        fireEvent.click(buttons[0])
      }

      await waitFor(() => {
        expect(screen.getByText('How It Works')).toBeInTheDocument()
      })

      // Find and click Products dropdown in mobile menu
      const productsButtons = screen.getAllByText('Products')
      const mobileProductsButton = productsButtons.find(button =>
        button.closest('button')?.classList.contains('w-full')
      )

      if (mobileProductsButton) {
        fireEvent.click(mobileProductsButton)
      }

      // Submenu items should be visible
      await waitFor(() => {
        const cableHarnessLinks = screen.getAllByText('Cable Harnesses')
        expect(cableHarnessLinks.length).toBeGreaterThan(0)
      })
    })

    it('should close mobile menu when menu button is clicked again', async () => {
      render(<Navigation />)

      // Open mobile menu
      const buttons = document.querySelectorAll('button.md\\:hidden')
      if (buttons.length > 0) {
        fireEvent.click(buttons[0])
      }

      await waitFor(() => {
        expect(screen.getByText('How It Works')).toBeInTheDocument()
      })

      // Close mobile menu
      if (buttons.length > 0) {
        fireEvent.click(buttons[0])
      }

      await waitFor(() => {
        expect(screen.queryByText('How It Works')).not.toBeInTheDocument()
      })
    })
  })

  describe('Navigation Links', () => {
    it('should have correct href attributes for all main links', () => {
      render(<Navigation />)

      const shopLink = screen.getAllByText('Shop')[0].closest('a')
      const blogLink = screen.getAllByText('Blog')[0].closest('a')
      const pricingLink = screen.getAllByText('Pricing')[0].closest('a')
      const contactLink = screen.getAllByText('Contact')[0].closest('a')

      expect(shopLink).toHaveAttribute('href', '/shop')
      expect(blogLink).toHaveAttribute('href', '/blog')
      expect(pricingLink).toHaveAttribute('href', '/pricing')
      expect(contactLink).toHaveAttribute('href', '/contact')
    })

    it('should have correct href for logo link', () => {
      render(<Navigation />)

      const logoLink = screen.getByTestId('logo').closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('should have correct href for quote button', () => {
      render(<Navigation />)

      const quoteButtons = screen.getAllByText(/Get.*Quote/)
      const quoteLink = quoteButtons[0].closest('a')
      expect(quoteLink).toHaveAttribute('href', '/quote')
    })

    it('should have correct href for Dashboard link when user is logged in', () => {
      ;(useAuth as jest.Mock).mockReturnValue({
        user: {
          email: 'test@example.com',
        },
        logout: mockLogout,
      })

      render(<Navigation />)

      const dashboardLink = screen.getByText('Dashboard').closest('a')
      expect(dashboardLink).toHaveAttribute('href', '/dashboard')
    })
  })

  describe('Styling and Accessibility', () => {
    it('should have sticky navigation', () => {
      render(<Navigation />)

      const nav = document.querySelector('nav')
      expect(nav).toHaveClass('sticky')
      expect(nav).toHaveClass('top-0')
    })

    it('should have proper z-index for overlay', () => {
      render(<Navigation />)

      const nav = document.querySelector('nav')
      expect(nav).toHaveClass('z-50')
    })

    it('should apply hover styles to navigation links', () => {
      render(<Navigation />)

      const shopLink = screen.getAllByText('Shop')[0]
      expect(shopLink).toHaveClass('hover:text-primary-500')
    })
  })
})
