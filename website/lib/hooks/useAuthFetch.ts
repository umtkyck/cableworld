'use client'

import { useCallback } from 'react'
import { useAuth } from '@/context/AuthContext'

export function useAuthFetch() {
  const { user } = useAuth()

  return useCallback(
    async (input: RequestInfo | URL, init: RequestInit = {}) => {
      const headers = new Headers(init.headers)
      if (user) {
        const token = await user.getIdToken()
        headers.set('Authorization', `Bearer ${token}`)
      }
      return fetch(input, { ...init, headers })
    },
    [user]
  )
}
