'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy, Check, Landmark, Mail, CheckCircle } from 'lucide-react'

interface BankTransferDetailsProps {
  amount: number
  reference: string
  onPlaceOrder?: () => Promise<void>
  placing?: boolean
  placed?: boolean
}

const BANK_DETAILS = [
  { label: 'Beneficiary', value: 'Melis Electronics LLC' },
  { label: 'Bank', value: 'Mercury (Choice Financial Group)' },
  { label: 'Account Number', value: '738169316558493', mono: true },
  { label: 'Account Type', value: 'Checking' },
  { label: 'ABA Routing (ACH / Domestic Wire)', value: '121145433', mono: true },
  { label: 'SWIFT / BIC (International)', value: 'CLNOUS66MER', mono: true },
  { label: 'Intermediary SWIFT / BIC', value: 'CHASUS33XXX', mono: true },
  {
    label: 'Bank Address',
    value: '1 Letterman Drive, Building A, Suite A4-700, San Francisco, CA 94129 US',
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — ignore.
    }
  }

  return (
    <button
      onClick={copy}
      className="p-1 text-gray-400 transition-colors hover:text-gray-600"
      aria-label={`Copy ${text}`}
      type="button"
    >
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
    </button>
  )
}

export default function BankTransferDetails({
  amount,
  reference,
  onPlaceOrder,
  placing = false,
  placed = false,
}: BankTransferDetailsProps) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Landmark className="h-5 w-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">Pay by Bank Transfer</h3>
      </div>

      <p className="mb-6 text-sm text-gray-600">
        Send an ACH or wire transfer for{' '}
        <span className="font-semibold text-gray-900">
          $
          {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>{' '}
        using the details below. Production starts as soon as the payment is received (ACH typically
        1–2 business days, domestic wire same day).
      </p>

      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200">
        {BANK_DETAILS.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="min-w-0">
              <div className="text-xs text-gray-500">{row.label}</div>
              <div className={`text-sm text-gray-900 ${row.mono ? 'font-mono' : ''}`}>
                {row.value}
              </div>
            </div>
            <CopyButton text={row.value} />
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 bg-amber-50 px-4 py-3">
          <div>
            <div className="text-xs font-medium text-amber-700">Payment Reference (required)</div>
            <div className="font-mono text-sm font-semibold text-amber-900">{reference}</div>
          </div>
          <CopyButton text={reference} />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
        <div className="text-sm text-blue-800">
          <p className="mb-1 font-semibold">After sending your transfer</p>
          <p>
            Email your remittance confirmation to{' '}
            <a
              href={`mailto:umtkyck@gmail.com?subject=Payment%20remittance%20${encodeURIComponent(reference)}`}
              className="font-medium underline"
            >
              umtkyck@gmail.com
            </a>{' '}
            with the reference <span className="font-mono">{reference}</span> so we can match your
            payment and start production immediately.
          </p>
        </div>
      </div>

      {onPlaceOrder && (
        <div className="mt-6">
          {placed ? (
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle className="h-5 w-5" />
              Order placed. Send your transfer using the reference above, then email your
              confirmation.
            </div>
          ) : (
            <button
              type="button"
              onClick={() => void onPlaceOrder()}
              disabled={placing}
              className="w-full rounded-lg bg-primary-500 px-6 py-4 font-semibold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
            >
              {placing ? 'Placing order…' : 'Place order — pay by bank transfer'}
            </button>
          )}
          {placed && (
            <Link
              href="/orders"
              className="mt-3 block text-center text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View your orders →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
