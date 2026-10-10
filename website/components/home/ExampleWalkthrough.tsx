'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, Cpu, Calculator, PackageCheck, Check, ArrowRight } from 'lucide-react'

const steps = [
  {
    id: 0,
    icon: FileText,
    label: 'Upload',
    title: 'You upload a drawing',
    description:
      'A robotics team needs a 1 m shielded control harness. They drop their PDF drawing into the uploader — no account required.',
  },
  {
    id: 1,
    icon: Cpu,
    label: 'AI Parsing',
    title: 'AI reads the design in seconds',
    description:
      'Connectors, cable spec, crimp terminals, and pin assignments are extracted automatically and matched to live supplier stock.',
  },
  {
    id: 2,
    icon: Calculator,
    label: 'Instant Quote',
    title: 'Transparent pricing, instantly',
    description:
      'Every line item is priced live — components from Digi-Key, labor, and overhead. No sales calls, no waiting.',
  },
  {
    id: 3,
    icon: PackageCheck,
    label: 'Build & Ship',
    title: 'Built, tested, delivered',
    description:
      'Assembled to IPC/WHMA-A-620, 100% continuity tested, and shipped with full lot traceability in 5–7 business days.',
  },
]

function UploadPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
        <FileText className="mx-auto mb-3 h-8 w-8 text-slate-400" />
        <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">
          <span className="font-mono text-slate-900 dark:text-white">
            dsub9-control-harness-rev2.pdf
          </span>
          <span className="text-slate-400">248 KB</span>
          <Check className="h-4 w-4 text-accent-green" />
        </div>
        <p className="mt-3 text-xs text-slate-400">CAD, PDF, Excel or images · up to 100MB</p>
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400">
        The drawing specifies two D-Sub 9 connectors joined by a shielded 4-conductor cable.
      </div>
    </div>
  )
}

function ParsingPanel() {
  const detected = [
    { qty: '1×', part: 'D-Sub 9P Male', pn: 'A-DS 09 A/KG-T4-S · TE Connectivity' },
    { qty: '1×', part: 'D-Sub 9P Female', pn: 'A-DS 09 LL/KG-P · TE Connectivity' },
    { qty: '1 m', part: '4C 22 AWG Shielded Cable', pn: 'Matched from Digi-Key stock' },
    { qty: '2×', part: 'D-Sub Crimp Pins (22–26 AWG)', pn: 'Auto-selected for wire gauge' },
  ]
  return (
    <div className="space-y-3">
      {detected.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-800"
        >
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-green" />
          <div className="min-w-0">
            <div className="text-sm font-medium text-slate-900 dark:text-white">
              {item.qty} {item.part}
            </div>
            <div className="truncate text-xs text-slate-400">{item.pn}</div>
          </div>
        </div>
      ))}
      <div className="pt-1 text-xs text-slate-400">
        Pin map extracted: 1→1, 2→2, 3→3, shield→9 · DFM check passed
      </div>
    </div>
  )
}

function QuotePanel() {
  const lines = [
    ['Connector A (D-Sub 9P Male)', '$2.45'],
    ['Connector B (D-Sub 9P Female)', '$2.65'],
    ['Cable, 4C 22 AWG shielded (1 m)', '$1.25'],
    ['Crimp pins (2)', '$0.24'],
    ['Labor & assembly', '$2.50'],
    ['Overhead (15%)', '$1.36'],
  ]
  return (
    <div>
      <div className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {lines.map(([label, price], i) => (
          <div key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="text-slate-500 dark:text-slate-400">{label}</span>
            <span className="font-mono text-slate-900 dark:text-white">{price}</span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-slate-50 px-4 py-3 dark:bg-slate-900">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            Total per unit
          </span>
          <span className="font-mono text-lg font-semibold text-slate-900 dark:text-white">
            $10.45
          </span>
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-400">
        Quoted in under 60 seconds · Lead time 5–7 business days · Volume discounts applied
        automatically
      </div>
    </div>
  )
}

function ShipPanel() {
  const checks = [
    'Assembled to IPC/WHMA-A-620 workmanship standards',
    '100% electrical continuity testing — every harness, no sampling',
    'Lot tracking and full documentation included',
    'Real-time order tracking until it reaches your bench',
  ]
  return (
    <div className="space-y-3">
      {checks.map((c, i) => (
        <div key={i} className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-green" />
          <span className="text-sm text-slate-600 dark:text-slate-300">{c}</span>
        </div>
      ))}
      <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-800">
        <div>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            Order #HC-2026-01847
          </div>
          <div className="text-xs text-slate-400">Shipped · arriving in 2 days</div>
        </div>
        <PackageCheck className="h-5 w-5 text-accent-green" />
      </div>
    </div>
  )
}

export default function ExampleWalkthrough() {
  const [active, setActive] = useState(0)
  const step = steps[active]

  return (
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="container-custom">
        <div className="mb-12 max-w-2xl">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            See it in action: one cable, start to finish
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Follow a real example — a 1 m shielded D-Sub 9 control harness — through every step of
            the process.
          </p>
        </div>

        {/* Step tabs */}
        <div
          className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4"
          role="tablist"
          aria-label="Example order steps"
        >
          {steps.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-left transition-colors duration-150 ${
                active === i
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                  : 'border-slate-200 text-slate-500 hover:border-slate-400 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-600'
              }`}
            >
              <s.icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">
                <span className="mr-1.5 font-mono">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mb-6 leading-relaxed text-slate-500 dark:text-slate-400">
              {step.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary">
                Try it with your design
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/cable-designer" className="btn-outline">
                Open the Cable Designer
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/30">
            {active === 0 && <UploadPanel />}
            {active === 1 && <ParsingPanel />}
            {active === 2 && <QuotePanel />}
            {active === 3 && <ShipPanel />}
          </div>
        </div>
      </div>
    </section>
  )
}
