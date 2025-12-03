'use client'

import dynamic from 'next/dynamic'

// Dynamic imports with SSR disabled for Three.js components
const Hero3D = dynamic(() => import('@/components/three/Hero3D'), { ssr: false })
const Features3D = dynamic(() => import('@/components/three/Features3D'), { ssr: false })
const Showcase3D = dynamic(() => import('@/components/three/Showcase3D'), { ssr: false })
const CTA3D = dynamic(() => import('@/components/three/CTA3D'), { ssr: false })

export default function LandingPage() {
  return (
    <main className="relative bg-slate-950 overflow-x-hidden">
      {/* Hero Section with 3D Dither Effects */}
      <Hero3D />

      {/* Features Section with 3D Cards */}
      <Features3D />

      {/* Showcase Section with Live 3D Visualization */}
      <Showcase3D />

      {/* CTA Section with 3D Elements */}
      <CTA3D />
    </main>
  )
}
