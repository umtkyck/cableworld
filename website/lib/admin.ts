// God-mode (admin) access is granted by email allowlist. Extend via the
// NEXT_PUBLIC_ADMIN_EMAILS env var (comma-separated) without a code change.

const BASE_ADMIN_EMAILS = ['umtkyck@gmail.com']

const envAdmins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

export const ADMIN_EMAILS = Array.from(new Set([...BASE_ADMIN_EMAILS, ...envAdmins]))

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.trim().toLowerCase())
}
