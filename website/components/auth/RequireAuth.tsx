'use client'

import { useEffect, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Lock, ChevronRight } from 'lucide-react'

interface RequireAuthProps {
  children: ReactNode
  adminOnly?: boolean
}

export default function RequireAuth({ children, adminOnly = false }: RequireAuthProps) {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace('/login')
      return
    }
    if (adminOnly && !isAdmin) {
      router.replace('/dashboard')
    }
  }, [user, loading, isAdmin, adminOnly, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <Lock className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Sign In Required</h1>
          <Link href="/login" className="btn-primary inline-flex">
            Sign In
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    )
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <Lock className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Admin Access Required</h1>
          <Link href="/dashboard" className="btn-primary inline-flex">
            Back to Dashboard
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
