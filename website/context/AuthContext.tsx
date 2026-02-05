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

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, displayName: string, company?: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithFacebook: () => Promise<void>
  signInWithApple: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

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
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account'
      throw new Error(errorMessage)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in'
      throw new Error(errorMessage)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      setUser(userCredential.user)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Google'
      throw new Error(errorMessage)
    }
  }

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      setUser(userCredential.user)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Facebook'
      throw new Error(errorMessage)
    }
  }

  const signInWithApple = async () => {
    try {
      const provider = new OAuthProvider('apple.com')
      const userCredential = await signInWithPopup(auth, provider)
      setUser(userCredential.user)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Apple'
      throw new Error(errorMessage)
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
