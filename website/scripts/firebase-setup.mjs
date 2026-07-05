#!/usr/bin/env node
/**
 * Validates Firebase client env vars and prints deploy instructions.
 * Run from website/: node scripts/firebase-setup.mjs
 */

import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const envPath = resolve(process.cwd(), '.env.local')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (!(key in process.env)) process.env[key] = value
  }
}

const required = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
]

const missing = required.filter((key) => !process.env[key]?.trim())

if (missing.length > 0) {
  console.error('Missing Firebase env vars:')
  missing.forEach((key) => console.error(`  - ${key}`))
  console.error('\nCopy .env.example to .env.local and fill in values from:')
  console.error('https://console.firebase.google.com/project/harnesscart/settings/general')
  process.exit(1)
}

console.log('Firebase client config looks good.')
console.log(`  projectId: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`)
console.log(`  authDomain: ${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`)
console.log('\nNext steps:')
console.log('  1. npm run firebase:login')
console.log('  2. npm run firebase:deploy')
console.log('  3. In Firebase Console, enable Facebook + Apple providers manually')
console.log('     https://console.firebase.google.com/project/harnesscart/authentication/providers')
