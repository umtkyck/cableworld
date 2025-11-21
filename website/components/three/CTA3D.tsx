'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import Link from 'next/link'
import { ArrowRight, Sparkles, Upload } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Animated particle ring
function ParticleRing() {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = 200
  const radius = 3

  const positions = new Float32Array(particles * 3)
  const colors = new Float32Array(particles * 3)

  for (let i = 0; i < particles; i++) {
    const angle = (i / particles) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = (Math.random() - 0.5) * 0.5
    const z = Math.sin(angle) * radius

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    const color = new THREE.Color()
    color.setHSL(i / particles, 0.8, 0.6)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.5
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Central glowing sphere
function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function CTA3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content > *', {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-50">
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />

            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

            <GlowingSphere />
            <ParticleRing />

            <EffectComposer>
              <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(15,23,42,0.8)_100%)]" />

      {/* Content */}
      <div ref={contentRef} className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center cta-content">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">
              Join 10,000+ Manufacturers
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Manufacturing?
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Get started in seconds. Upload your design and receive instant quotes from
            our global network of certified manufacturers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/quote"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Design Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white border-2 border-cyan-400 rounded-xl backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              Schedule Demo
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Free instant quotes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>24/7 AI support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}
