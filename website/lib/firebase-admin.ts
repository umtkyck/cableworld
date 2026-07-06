import { initializeApp, getApps, cert, type App } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'
import { getAuth, type Auth } from 'firebase-admin/auth'
import { getStorage, type Storage } from 'firebase-admin/storage'

let adminApp: App | undefined
let adminDb: Firestore | undefined
let adminAuth: Auth | undefined
let adminStorage: Storage | undefined

function parseServiceAccount(): Record<string, string> | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim()
  if (!raw) return null
  try {
    return JSON.parse(raw) as Record<string, string>
  } catch {
    return null
  }
}

/** Returns true when Admin SDK is configured (service account JSON present). */
export function isAdminConfigured(): boolean {
  return parseServiceAccount() !== null
}

function getAdminApp(): App {
  if (adminApp) return adminApp
  if (getApps().length > 0) {
    adminApp = getApps()[0]
    return adminApp
  }

  const serviceAccount = parseServiceAccount()
  if (serviceAccount) {
    adminApp = initializeApp({
      credential: cert(serviceAccount as Parameters<typeof cert>[0]),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    })
    return adminApp
  }

  // Allows local emulators / ADC when configured; production should set FIREBASE_SERVICE_ACCOUNT_JSON.
  adminApp = initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'harnesscart',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  })
  return adminApp
}

export function getAdminDb(): Firestore {
  if (!adminDb) adminDb = getFirestore(getAdminApp())
  return adminDb
}

export function getAdminAuth(): Auth {
  if (!adminAuth) adminAuth = getAuth(getAdminApp())
  return adminAuth
}

export function getAdminStorage(): Storage {
  if (!adminStorage) adminStorage = getStorage(getAdminApp())
  return adminStorage
}
