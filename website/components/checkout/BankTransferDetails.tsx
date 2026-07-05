'use client'

import { useState } from 'react'
import { Copy, Check, Landmark, Mail } from 'lucide-react'

interface BankTransferDetailsProps {
  amount: number
  reference: string
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
    value: '1 Letterman Drive, Building A, Suite A4-700, San Francisco, CA 94129 US'
  }
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
      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
      aria-label={`Copy ${text}`}
      type="button"
    >
      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

export default function BankTransferDetails({ amount, reference }: BankTransferDetailsProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Landmark className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">Pay by Bank Transfer</h3>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Send an ACH or wire transfer for{' '}
        <span className="font-semibold text-gray-900">
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>{' '}
        using the details below. Production starts as soon as the payment is received
        (ACH typically 1–2 business days, domestic wire same day).
      </p>

      <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 overflow-hidden">
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
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-amber-50">
          <div>
            <div className="text-xs text-amber-700 font-medium">Payment Reference (required)</div>
            <div className="text-sm font-mono font-semibold text-amber-900">{reference}</div>
          </div>
          <CopyButton text={reference} />
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">After sending your transfer</p>
          <p>
            Email your remittance confirmation to{' '}
            <a href={`mailto:umtkyck@gmail.com?subject=Payment%20remittance%20${encodeURIComponent(reference)}`} className="underline font-medium">
              umtkyck@gmail.com
            </a>{' '}
            with the reference <span className="font-mono">{reference}</span> so we can
            match your payment and start production immediately.
          </p>
        </div>
      </div>
    </div>
  )
}
