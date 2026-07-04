import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from '../Navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

// Mock the contexts
jest.mock('@/context/CartContext')
jest.mock('@/context/AuthContext')
jest.mock('../Logo', () => {
  return function Logo() {
    return <div data-testid="logo">Harness Cart Logo</div>
  }
})

const mockLogout = jest.fn()

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
  })

  describe('Promotional Banner', () => {
    it('should render promotional banner', () => {
      render(<Navigation />)

      expect(screen.getByText('Free Worldwide Shipping on orders over $1,000')).toBeInTheDocument()
      expect(screen.getByText('Shop Now')).toBeInTheDocument()
    })

    it('should close banner when X button is clicked', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const closeButton = screen.getByRole('button', { name: /close banner/i })
      await user.click(closeButton)

      expect(screen.queryByText('Free Worldwide Shipping on orders over $1,000')).not.toBeInTheDocument()
    })
  })

  describe('Desktop Navigation', () => {
    it('should render logo and main navigation links', () => {
      render(<Navigation />)

      expect(screen.getByTestId('logo')).toBeInTheDocument()
      expect(screen.getByText('Shop')).toBeInTheDocument()
      expect(screen.getByText('Marketplace')).toBeInTheDocument()
      expect(screen.getByText('Pricing')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('should have Products dropdown with submenu items', () => {
      render(<Navigation />)

      const productsButtons = screen.getAllByText('Products')
      expect(productsButtons.length).toBeGreaterThan(0)

      expect(screen.getByText('Cable Designer')).toBeInTheDocument()
      expect(screen.getByText('CAD Viewer')).toBeInTheDocument()
      expect(screen.getByText('Design Services')).toBeInTheDocument()
    })

    it('should render Sign In link when user is not logged in', () => {
      render(<Navigation />)

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
      expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
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

      const getQuoteButtons = screen.getAllByText(/Get.*Quote/)
      expect(getQuoteButtons.length).toBeGreaterThan(0)
    })
  })

  describe('Shopping Cart', () => {
    it('should display cart icon', () => {
      render(<Navigation />)

      const cartLinks = screen.getAllByRole('link').filter(link => link.getAttribute('href') === '/cart')
      expect(cartLinks.length).toBeGreaterThan(0)
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
    it('should call logout on Sign Out click', async () => {
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

      const signOutButton = screen.getByRole('button', { name: /sign out/i })
      await user.click(signOutButton)

      await waitFor(() => {
        expect(mockLogout).toHaveBeenCalled()
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

      const signOutButton = screen.getByRole('button', { name: /sign out/i })
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
      render(<Navigation />)

      expect(screen.queryByText('How It Works')).not.toBeInTheDocument()

      const buttons = document.querySelectorAll('button.md\\:hidden')
      if (buttons.length > 0) {
        fireEvent.click(buttons[0])
      }

      await waitFor(() => {
        expect(screen.getByText('How It Works')).toBeInTheDocument()
      })
    })

    it('should close mobile menu when menu button is clicked again', async () => {
      render(<Navigation />)

      const buttons = document.querySelectorAll('button.md\\:hidden')
      if (buttons.length > 0) {
        fireEvent.click(buttons[0])
      }

      await waitFor(() => {
        expect(screen.getByText('How It Works')).toBeInTheDocument()
      })

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
      const marketplaceLink = screen.getAllByText('Marketplace')[0].closest('a')
      const pricingLink = screen.getAllByText('Pricing')[0].closest('a')
      const contactLink = screen.getAllByText('Contact')[0].closest('a')

      expect(shopLink).toHaveAttribute('href', '/shop')
      expect(marketplaceLink).toHaveAttribute('href', '/marketplace')
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
  })
})
