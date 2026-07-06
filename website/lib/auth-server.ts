import { NextRequest } from 'next/server'
import { getAdminAuth, isAdminConfigured } from '@/lib/firebase-admin'
import { isAdminEmail } from '@/lib/admin'

export interface AuthUser {
  uid: string
  email: string
}

export async function verifyBearerToken(request: NextRequest): Promise<AuthUser | null> {
  const header = request.headers.get('authorization')
  if (!header?.startsWith('Bearer ')) return null

  const token = header.slice(7).trim()
  if (!token) return null

  if (!isAdminConfigured()) return null

  try {
    const decoded = await getAdminAuth().verifyIdToken(token)
    if (!decoded.email) return null
    return { uid: decoded.uid, email: decoded.email }
  } catch {
    return null
  }
}

export async function requireAuthUser(request: NextRequest): Promise<AuthUser | null> {
  return verifyBearerToken(request)
}

export async function requireAdminUser(request: NextRequest): Promise<AuthUser | null> {
  const user = await verifyBearerToken(request)
  if (!user || !isAdminEmail(user.email)) return null
  return user
}
