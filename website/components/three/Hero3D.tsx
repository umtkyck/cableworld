'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, Zap, Sparkles, Box, Cpu } from 'lucide-react'
import DitherScene from './DitherScene'

gsap.registerPlugin(ScrollTrigger)

// Loading fallback
function CanvasLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
    </div>
  )
}

export default function Hero3D() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // GSAP Scroll Animations
    const ctx = gsap.context(() => {
      // Hero content animations
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4,
      })

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6,
        stagger: 0.1,
      })

      gsap.from('.hero-badge', {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.8,
        stagger: 0.1,
      })

      // Parallax effect on scroll
      if (heroRef.current) {
        gsap.to(canvasContainerRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          y: 200,
          opacity: 0.3,
        })

        gsap.to(contentRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          y: 100,
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Mouse move parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
    >
      {/* Three.js Canvas Background */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <Canvas>
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={75} />
            <DitherScene />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Environment preset="night" />

            {/* Post-processing effects */}
            <EffectComposer>
              <Bloom
                intensity={0.8}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                height={300}
              />
              <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.001, 0.001]} />
              <Vignette eskil={false} offset={0.1} darkness={0.5} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

      {/* Hero Content */}
      <div ref={contentRef} className="container-custom relative z-20 flex h-full items-center">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="hero-badge mb-8 inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-6 py-3 backdrop-blur-xl">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">
              AI-Powered Cable Manufacturing Platform
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title mb-6 text-6xl font-black leading-tight md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              The Future of
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cable Harness
            </span>
            <br />
            <span className="text-white">Manufacturing</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle mb-10 max-w-2xl text-xl leading-relaxed text-slate-300 md:text-2xl">
            Experience instant quotes powered by cutting-edge AI. Upload your design and connect
            with
            <span className="font-semibold text-cyan-400"> vetted global manufacturers</span> in
            seconds.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/quote"
              className="hero-cta group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10 flex items-center">
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            <Link
              href="/how-it-works"
              className="hero-cta group inline-flex items-center justify-center rounded-xl border-2 border-cyan-400 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
            >
              Explore Platform
              <Zap className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            </Link>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-4">
            <div className="hero-badge flex items-center space-x-3 rounded-lg border border-slate-700/50 bg-slate-900/50 px-5 py-3 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">60s</div>
                <div className="text-xs text-slate-400">Instant Quotes</div>
              </div>
            </div>

            <div className="hero-badge flex items-center space-x-3 rounded-lg border border-slate-700/50 bg-slate-900/50 px-5 py-3 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                <Box className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-slate-400">Manufacturers</div>
              </div>
            </div>

            <div className="hero-badge flex items-center space-x-3 rounded-lg border border-slate-700/50 bg-slate-900/50 px-5 py-3 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">AI</div>
                <div className="text-xs text-slate-400">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-cyan-400/50">
          <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-cyan-400" />
        </div>
      </div>

      {/* Grid Overlay */}
      <div className="z-5 pointer-events-none absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </section>
  )
}
