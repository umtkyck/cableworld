import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterPage from '../page'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

// Mock the auth context
jest.mock('@/context/AuthContext')
jest.mock('next/navigation')

const mockSignUp = jest.fn()
const mockPush = jest.fn()

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
      user: null,
      loading: false,
    })
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  it('should render registration form with all fields', () => {
    render(<RegisterPage />)

    expect(screen.getByText('Create Account')).toBeInTheDocument()
    expect(screen.getByText('Join CableWorld and start ordering today')).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
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
    const submitButton = screen.getByRole('button', { name: /create account/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'differentpassword')
    await user.click(submitButton)

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
    const submitButton = screen.getByRole('button', { name: /create account/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, '12345')
    await user.type(confirmPasswordInput, '12345')
    await user.click(submitButton)

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

  it('should call signUp and redirect to dashboard on successful registration', async () => {
    const user = userEvent.setup()
    mockSignUp.mockResolvedValue(undefined)

    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]
    const submitButton = screen.getByRole('button', { name: /create account/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
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
    const submitButton = screen.getByRole('button', { name: /create account/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'existing@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('should disable form inputs and button while loading', async () => {
    const user = userEvent.setup()
    mockSignUp.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))

    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const companyInput = screen.getByPlaceholderText('Your Company Inc.')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]
    const submitButton = screen.getByRole('button', { name: /create account/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    // Check loading state
    expect(screen.getByText('Creating account...')).toBeInTheDocument()
    expect(nameInput).toBeDisabled()
    expect(emailInput).toBeDisabled()
    expect(companyInput).toBeDisabled()
    expect(passwordInput).toBeDisabled()
    expect(confirmPasswordInput).toBeDisabled()
    expect(submitButton).toBeDisabled()
  })

  it('should show loading spinner during registration', async () => {
    const user = userEvent.setup()
    mockSignUp.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))

    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]
    const submitButton = screen.getByRole('button', { name: /create account/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    const loadingSpinner = document.querySelector('.animate-spin')
    expect(loadingSpinner).toBeInTheDocument()
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

    expect(screen.getByText('🔒 Protected by Firebase Authentication')).toBeInTheDocument()
  })

  it('should clear error message on new submission', async () => {
    const user = userEvent.setup()
    mockSignUp.mockRejectedValueOnce(new Error('Email already in use'))
      .mockResolvedValueOnce(undefined)

    render(<RegisterPage />)

    const nameInput = screen.getByPlaceholderText('John Doe')
    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0]
    const confirmPasswordInput = screen.getAllByPlaceholderText('••••••••')[1]
    const submitButton = screen.getByRole('button', { name: /create account/i })

    // First attempt - should fail
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'existing@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Email already in use')).toBeInTheDocument()
    })

    // Second attempt - should succeed and clear error
    await user.clear(emailInput)
    await user.type(emailInput, 'newemail@example.com')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText('Email already in use')).not.toBeInTheDocument()
    })
  })
})
