import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Env values pasted into Vercel can carry stray tabs/newlines, which corrupt
// authDomain/projectId and break OAuth popups — always sanitize.
const env = (value: string | undefined, fallback: string) => value?.trim() || fallback

// Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: env(process.env.NEXT_PUBLIC_FIREBASE_API_KEY, "demo-api-key"),
  authDomain: env(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, "harnesscart.firebaseapp.com"),
  projectId: env(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, "harnesscart"),
  storageBucket: env(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, "harnesscart.firebasestorage.app"),
  messagingSenderId: env(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, "88251229440"),
  appId: env(process.env.NEXT_PUBLIC_FIREBASE_APP_ID, "1:88251229440:web:74c401daaf5b2d18f87fe5")
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
