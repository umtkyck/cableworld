'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { isAdminEmail } from '@/lib/admin'

interface AuthContextType {
  user: User | null
  loading: boolean
  /** True when the signed-in user has god-mode (admin) access. */
  isAdmin: boolean
  signUp: (email: string, password: string, displayName: string, company?: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithFacebook: () => Promise<void>
  signInWithApple: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Translate Firebase error codes into messages users can act on.
function friendlyAuthError(error: unknown, fallback: string): Error {
  const raw = error instanceof Error ? error.message : ''
  const code = raw.match(/auth\/[a-z-.]+/)?.[0]

  // Not a Firebase auth error — keep the original message if there is one.
  if (!code) {
    return new Error(raw || fallback)
  }

  const messages: Record<string, string> = {
    'auth/invalid-credential': 'Incorrect email or password. Please try again.',
    'auth/wrong-password': 'Incorrect email or password. Please try again.',
    'auth/user-not-found': 'No account found with this email. Please sign up first.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/email-already-in-use': 'An account with this email already exists. Try signing in instead.',
    'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
    'auth/network-request-failed': 'Network error. Please check your connection and try again.',
    'auth/popup-closed-by-user': 'Sign-in window was closed before completing. Please try again.',
    'auth/popup-blocked': 'Your browser blocked the sign-in window. Please allow popups and try again.',
    'auth/operation-not-allowed': 'This sign-in method is not available right now.',
    'auth/api-key-not-valid.-please-pass-a-valid-api-key.': 'Sign-in is temporarily unavailable. Please try again later or contact support.',
    'auth/invalid-api-key': 'Sign-in is temporarily unavailable. Please try again later or contact support.',
  }

  return new Error(messages[code] ?? fallback)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signUp = async (email: string, password: string, displayName: string, company?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: displayName
      })

      // Save user profile to Firestore (including company)
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        displayName: displayName,
        company: company || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      setUser(userCredential.user)
    } catch (error: unknown) {
      throw friendlyAuthError(error, 'Failed to create account. Please try again.')
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user)
    } catch (error: unknown) {
      throw friendlyAuthError(error, 'Failed to sign in. Please check your credentials.')
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      setUser(userCredential.user)
    } catch (error: unknown) {
      throw friendlyAuthError(error, 'Failed to sign in with Google.')
    }
  }

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      setUser(userCredential.user)
    } catch (error: unknown) {
      throw friendlyAuthError(error, 'Failed to sign in with Facebook.')
    }
  }

  const signInWithApple = async () => {
    try {
      const provider = new OAuthProvider('apple.com')
      const userCredential = await signInWithPopup(auth, provider)
      setUser(userCredential.user)
    } catch (error: unknown) {
      throw friendlyAuthError(error, 'Failed to sign in with Apple.')
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to logout'
      throw new Error(errorMessage)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAdmin: isAdminEmail(user?.email),
      signUp,
      signIn,
      signInWithGoogle,
      signInWithFacebook,
      signInWithApple,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
