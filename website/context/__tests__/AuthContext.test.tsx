import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthContext'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { setDoc } from 'firebase/firestore'

// Mock Firebase functions
jest.mock('firebase/auth')
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}))
jest.mock('@/lib/firebase', () => ({
  auth: {},
  db: {},
}))

const mockCreateUser = createUserWithEmailAndPassword as jest.Mock
const mockSignIn = signInWithEmailAndPassword as jest.Mock
const mockSignOut = signOut as jest.Mock
const mockOnAuthStateChanged = onAuthStateChanged as jest.Mock
const mockUpdateProfile = updateProfile as jest.Mock
const mockSetDoc = setDoc as jest.Mock

// Test component to access context
function TestComponent() {
  const { user, loading, signUp, signIn, logout } = useAuth()
  const [error, setError] = React.useState('')

  const runAndCaptureError = (action: () => Promise<void>) => async () => {
    try {
      await action()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <div>
      <div data-testid="user-status">{user ? user.email : 'No user'}</div>
      <div data-testid="loading-status">{loading ? 'Loading' : 'Ready'}</div>
      <div data-testid="error-status">{error}</div>
      <button onClick={runAndCaptureError(() => signUp('test@test.com', 'password123', 'Test User'))}>
        Sign Up
      </button>
      <button onClick={runAndCaptureError(() => signIn('test@test.com', 'password123'))}>
        Sign In
      </button>
      <button onClick={runAndCaptureError(logout)}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default mock for onAuthStateChanged
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null)
      return jest.fn() // unsubscribe function
    })
  })

  describe('AuthProvider', () => {
    it('should provide auth context to children', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      expect(screen.getByTestId('user-status')).toHaveTextContent('No user')
    })

    it('should initialize loading state and then set to false', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('loading-status')).toHaveTextContent('Ready')
      })
    })

    it('should update user state when auth state changes', async () => {
      const mockUser = {
        email: 'test@test.com',
        displayName: 'Test User',
        uid: '123',
      }

      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockUser)
        return jest.fn()
      })

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('user-status')).toHaveTextContent('test@test.com')
      })
    })
  })

  describe('signUp', () => {
    it('should create a new user with email and password', async () => {
      const mockUser = {
        email: 'test@test.com',
        uid: '123',
      }

      mockCreateUser.mockResolvedValue({
        user: mockUser,
      })
      mockUpdateProfile.mockResolvedValue(undefined)
      mockSetDoc.mockResolvedValue(undefined)

      const { getByText } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      const signUpButton = getByText('Sign Up')
      signUpButton.click()

      await waitFor(() => {
        expect(mockCreateUser).toHaveBeenCalledWith(
          {},
          'test@test.com',
          'password123'
        )
        expect(mockUpdateProfile).toHaveBeenCalledWith(mockUser, {
          displayName: 'Test User',
        })
        expect(mockSetDoc).toHaveBeenCalled()
      })
    })

    it('should handle sign up errors', async () => {
      mockCreateUser.mockRejectedValue(new Error('Email already in use'))

      const { getByText, getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      getByText('Sign Up').click()

      await waitFor(() => {
        expect(mockCreateUser).toHaveBeenCalled()
        expect(getByTestId('error-status')).toHaveTextContent('Email already in use')
      })
    })
  })

  describe('signIn', () => {
    it('should sign in user with email and password', async () => {
      const mockUser = {
        email: 'test@test.com',
        uid: '123',
      }

      mockSignIn.mockResolvedValue({
        user: mockUser,
      })

      const { getByText } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      const signInButton = getByText('Sign In')
      signInButton.click()

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith(
          {},
          'test@test.com',
          'password123'
        )
      })
    })

    it('should handle sign in errors', async () => {
      mockSignIn.mockRejectedValue(new Error('Invalid credentials'))

      const { getByText, getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      getByText('Sign In').click()

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalled()
        expect(getByTestId('error-status')).toHaveTextContent('Invalid credentials')
      })
    })
  })

  describe('logout', () => {
    it('should sign out current user', async () => {
      mockSignOut.mockResolvedValue(undefined)

      const { getByText } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      const logoutButton = getByText('Logout')
      logoutButton.click()

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalledWith({})
      })
    })

    it('should handle logout errors', async () => {
      mockSignOut.mockRejectedValue(new Error('Logout failed'))

      const { getByText, getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )

      getByText('Logout').click()

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalled()
        expect(getByTestId('error-status')).toHaveTextContent('Logout failed')
      })
    })
  })

  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      expect(() => {
        render(<TestComponent />)
      }).toThrow('useAuth must be used within an AuthProvider')

      consoleSpy.mockRestore()
    })
  })
})
