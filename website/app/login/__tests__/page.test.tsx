import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '../page'
import { useAuth } from '@/context/AuthContext'

// Mock the auth context
jest.mock('@/context/AuthContext')

const mockSignIn = jest.fn()
const mockSignInWithGoogle = jest.fn()
const mockSignInWithFacebook = jest.fn()
const mockSignInWithApple = jest.fn()

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      signInWithGoogle: mockSignInWithGoogle,
      signInWithFacebook: mockSignInWithFacebook,
      signInWithApple: mockSignInWithApple,
      user: null,
      loading: false,
    })
  })

  it('should render login form with all fields', () => {
    render(<LoginPage />)

    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByText('Sign in to your Harness Cart account')).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('should have links to register and forgot password', () => {
    render(<LoginPage />)

    const registerLink = screen.getByRole('link', { name: /sign up/i })
    const forgotPasswordLink = screen.getByRole('link', { name: /forgot password/i })

    expect(registerLink).toHaveAttribute('href', '/register')
    expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password')
  })

  it('should update email and password fields on user input', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('should call signIn on form submission', async () => {
    const user = userEvent.setup()
    mockSignIn.mockResolvedValue(undefined)

    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    const form = screen.getByRole('button', { name: /sign in/i }).closest('form')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    if (form) {
      fireEvent.submit(form)
    }

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123')
    })
  })

  it('should display error message on failed login', async () => {
    const user = userEvent.setup()
    const errorMessage = 'Invalid credentials'
    mockSignIn.mockRejectedValue(new Error(errorMessage))

    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    const form = screen.getByRole('button', { name: /sign in/i }).closest('form')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'wrongpassword')

    if (form) {
      fireEvent.submit(form)
    }

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('should display default error message when error has no message', async () => {
    const user = userEvent.setup()
    mockSignIn.mockRejectedValue({})

    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    const form = screen.getByRole('button', { name: /sign in/i }).closest('form')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    if (form) {
      fireEvent.submit(form)
    }

    await waitFor(() => {
      expect(screen.getByText('Failed to sign in. Please check your credentials.')).toBeInTheDocument()
    })
  })

  it('should show loading state during sign in', async () => {
    const user = userEvent.setup()
    mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))

    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    const form = screen.getByRole('button', { name: /sign in/i }).closest('form')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    if (form) {
      fireEvent.submit(form)
    }

    // Check loading state
    expect(screen.getByText('Signing in...')).toBeInTheDocument()
  })

  it('should display Firebase authentication badge', () => {
    render(<LoginPage />)

    expect(screen.getByText(/Protected by Firebase Authentication/)).toBeInTheDocument()
  })

  it('should require email and password fields', () => {
    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')

    expect(emailInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })

  it('should render social login buttons', () => {
    render(<LoginPage />)

    // Check for Google, Facebook, Apple sign-in options
    expect(screen.getByText('Or continue with')).toBeInTheDocument()

    // There should be 3 social login buttons
    const socialButtons = screen.getAllByRole('button').filter(
      button => button.closest('.grid.grid-cols-3')
    )
    expect(socialButtons.length).toBe(3)
  })

  it('should call signInWithGoogle when Google button is clicked', async () => {
    const user = userEvent.setup()
    mockSignInWithGoogle.mockResolvedValue(undefined)

    render(<LoginPage />)

    // Find Google button (first social button)
    const socialButtons = screen.getAllByRole('button').filter(
      button => button.closest('.grid.grid-cols-3')
    )

    await user.click(socialButtons[0])

    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled()
    })
  })
})
