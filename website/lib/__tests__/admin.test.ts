import { isAdminEmail, ADMIN_EMAILS } from '../admin'

describe('isAdminEmail', () => {
  it('grants access to the built-in admin email', () => {
    expect(isAdminEmail('umtkyck@gmail.com')).toBe(true)
  })

  it('is case- and whitespace-insensitive', () => {
    expect(isAdminEmail('  UmtKyck@Gmail.com ')).toBe(true)
  })

  it('rejects non-admin emails', () => {
    expect(isAdminEmail('someone@example.com')).toBe(false)
  })

  it('rejects null / undefined / empty', () => {
    expect(isAdminEmail(null)).toBe(false)
    expect(isAdminEmail(undefined)).toBe(false)
    expect(isAdminEmail('')).toBe(false)
  })

  it('includes the built-in email in the allowlist', () => {
    expect(ADMIN_EMAILS).toContain('umtkyck@gmail.com')
  })
})
