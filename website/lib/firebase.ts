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
  authDomain: env(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, "cableworld-demo.firebaseapp.com"),
  projectId: env(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, "cableworld-demo"),
  storageBucket: env(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, "cableworld-demo.appspot.com"),
  messagingSenderId: env(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, "123456789"),
  appId: env(process.env.NEXT_PUBLIC_FIREBASE_APP_ID, "1:123456789:web:abcdef")
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
