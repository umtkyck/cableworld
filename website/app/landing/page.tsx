import Hero3D from '@/components/three/Hero3D'
import Features3D from '@/components/three/Features3D'
import Showcase3D from '@/components/three/Showcase3D'
import CTA3D from '@/components/three/CTA3D'

export const metadata = {
  title: 'Harness Cart - AI-Powered Cable Harness Manufacturing Platform',
  description: 'Experience the future of cable harness manufacturing with cutting-edge WebGL visualization, AI-powered instant quotes, and a global network of certified manufacturers.',
  keywords: 'cable harness, wire harness, manufacturing, AI, WebGL, 3D visualization, instant quotes',
}

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
