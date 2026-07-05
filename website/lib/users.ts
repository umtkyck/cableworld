import { User } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { isAdminEmail } from '@/lib/admin'

interface SyncUserProfileOptions {
  company?: string
}

/** Create or update the Firestore profile for any auth provider. */
export async function syncUserProfile(user: User, options: SyncUserProfileOptions = {}) {
  const userRef = doc(db, 'users', user.uid)
  const existing = await getDoc(userRef)
  const provider = user.providerData[0]?.providerId ?? 'password'

  const profile = {
    email: user.email ?? '',
    displayName: user.displayName ?? '',
    photoURL: user.photoURL ?? '',
    provider,
    role: isAdminEmail(user.email) ? 'admin' : 'user',
    updatedAt: serverTimestamp(),
  }

  if (!existing.exists()) {
    await setDoc(userRef, {
      ...profile,
      company: options.company ?? '',
      createdAt: serverTimestamp(),
    })
    return
  }

  await setDoc(userRef, profile, { merge: true })
}
