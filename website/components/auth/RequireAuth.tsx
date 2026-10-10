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
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-500" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-900">
        <div className="w-full max-w-md text-center">
          <Lock className="mx-auto mb-6 h-16 w-16 text-slate-300" />
          <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            Sign In Required
          </h1>
          <Link href="/login" className="btn-primary inline-flex">
            Sign In
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    )
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-900">
        <div className="w-full max-w-md text-center">
          <Lock className="mx-auto mb-6 h-16 w-16 text-slate-300" />
          <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            Admin Access Required
          </h1>
          <Link href="/dashboard" className="btn-primary inline-flex">
            Back to Dashboard
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
