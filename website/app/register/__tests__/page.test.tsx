import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterPage from '../page'
import { useAuth } from '@/context/AuthContext'

// Mock the auth context
jest.mock('@/context/AuthContext')

const mockSignUp = jest.fn()
const mockSignInWithGoogle = jest.fn()
const mockSignInWithFacebook = jest.fn()
const mockSignInWithApple = jest.fn()

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
      signInWithGoogle: mockSignInWithGoogle,
      signInWithFacebook: mockSignInWithFacebook,
      signInWithApple: mockSignInWithApple,
      user: null,
      loading: false,
    })
  })

  it('should render registration form with all fields', () => {
    render(<RegisterPage />)

    // Use getAllByText since there might be multiple elements with same text
    expect(screen.getAllByText('Create Account').length).toBeGreaterThan(0)
    expect(screen.getByText('Join Harness Cart and start ordering today')).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument()
  })

  it('should have link to login page', () => {
    render(<RegisterPage />)

    const loginLink = screen.getByRole('link', { name: /sign in/i })
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('should update form fields on user input', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const companyInput = screen.getByPlaceholderText('Your Company Inc.')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(companyInput, 'ACME Corp')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(companyInput).toHaveValue('ACME Corp')
    expect(passwordInput).toHaveValue('password123')
    expect(confirmPasswordInput).toHaveValue('password123')
  })

  it('should show error when passwords do not match', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]
    const form = screen.getByRole('button', { name: /create account/i }).closest('form')

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'differentpassword')

    if (form) {
      fireEvent.submit(form)
    }

    expect(screen.getByText('Passwords do not match!')).toBeInTheDocument()
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('should show error when password is too short', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]
    const form = screen.getByRole('button', { name: /create account/i }).closest('form')

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, '12345')
    await user.type(confirmPasswordInput, '12345')

    if (form) {
      fireEvent.submit(form)
    }

    expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument()
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('should show real-time password match feedback', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)

    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]

    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')

    expect(screen.getByText('Passwords match')).toBeInTheDocument()

    await user.clear(confirmPasswordInput)
    await user.type(confirmPasswordInput, 'different')

    expect(screen.getByText("Passwords don't match")).toBeInTheDocument()
  })

  it('should call signUp on successful form submission', async () => {
    const user = userEvent.setup()
    mockSignUp.mockResolvedValue(undefined)

    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]
    const form = screen.getByRole('button', { name: /create account/i }).closest('form')

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')

    if (form) {
      fireEvent.submit(form)
    }

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe', '')
    })
  })

  it('should display error message on failed registration', async () => {
    const user = userEvent.setup()
    const errorMessage = 'Email already in use'
    mockSignUp.mockRejectedValue(new Error(errorMessage))

    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]
    const form = screen.getByRole('button', { name: /create account/i }).closest('form')

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'existing@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')

    if (form) {
      fireEvent.submit(form)
    }

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('should show loading state during registration', async () => {
    const user = userEvent.setup()
    mockSignUp.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))

    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]
    const form = screen.getByRole('button', { name: /create account/i }).closest('form')

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')

    if (form) {
      fireEvent.submit(form)
    }

    // Check loading state
    expect(screen.getByText('Creating account...')).toBeInTheDocument()
  })

  it('should require name, email, and password fields', () => {
    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const companyInput = screen.getByPlaceholderText('Your Company Inc.')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]

    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(companyInput).not.toBeRequired() // Company is optional
    expect(passwordInput).toBeRequired()
    expect(confirmPasswordInput).toBeRequired()
  })

  it('should display password requirement hint', () => {
    render(<RegisterPage />)

    expect(screen.getByText('Minimum 6 characters')).toBeInTheDocument()
  })

  it('should display Firebase authentication badge', () => {
    render(<RegisterPage />)

    expect(screen.getByText(/Protected by Firebase Authentication/)).toBeInTheDocument()
  })

  it('should render social login buttons', () => {
    render(<RegisterPage />)

    expect(screen.getByText('Or sign up with')).toBeInTheDocument()

    // There should be 3 social login buttons
    const socialButtons = screen.getAllByRole('button').filter(
      button => button.closest('.grid.grid-cols-3')
    )
    expect(socialButtons.length).toBe(3)
  })
})
