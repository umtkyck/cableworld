'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { Activity, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Animated 3D Cable/Wire visualization
function CableVisualization() {
  const groupRef = useRef<THREE.Group>(null)
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([])

  useEffect(() => {
    // Create materials
    materialsRef.current = [
      new THREE.MeshStandardMaterial({ color: '#06b6d4', metalness: 0.8, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: '#3b82f6', metalness: 0.8, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: '#8b5cf6', metalness: 0.8, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: '#ec4899', metalness: 0.8, roughness: 0.2 }),
    ]
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#06b6d4"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Orbiting Cables */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        const radius = 2
        return (
          <group key={i} rotation={[0, angle, 0]}>
            <Float speed={2 + i * 0.5} rotationIntensity={0.5} floatIntensity={0.5}>
              {/* Cable segment */}
              <mesh position={[radius, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 1.5, 16]} />
                <meshStandardMaterial
                  color={['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'][i]}
                  metalness={0.9}
                  roughness={0.1}
                  emissive={['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'][i]}
                  emissiveIntensity={0.2}
                />
              </mesh>

              {/* Connector */}
              <mesh position={[radius, 0.8, 0]}>
                <boxGeometry args={[0.2, 0.15, 0.15]} />
                <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.2} />
              </mesh>
            </Float>
          </group>
        )
      })}

      {/* Connection nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 1.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <mesh key={`node-${i}`} position={[x, 0, z]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#06b6d4"
              emissiveIntensity={0.5}
              metalness={1}
              roughness={0.2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function Showcase3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.from('.showcase-content', {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out',
      })

      // Canvas animation
      gsap.from(canvasRef.current, {
        scrollTrigger: {
          trigger: canvasRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power3.out',
      })

      // Stats animation
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div ref={contentRef} className="showcase-content">
            <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-2 backdrop-blur-xl">
              <Activity className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300">Live Visualization</span>
            </div>

            <h2 className="mb-6 text-5xl font-black md:text-6xl">
              <span className="bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Real-Time 3D
              </span>
              <br />
              <span className="text-white">Cable Modeling</span>
            </h2>

            <p className="mb-8 text-xl leading-relaxed text-slate-400">
              Our advanced WebGL engine renders your cable harness designs in real-time 3D.
              Visualize complex assemblies, identify potential issues, and optimize before
              manufacturing.
            </p>

            {/* Stats Grid */}
            <div className="stats-grid mb-8 grid grid-cols-2 gap-4">
              <div className="stat-item rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-xl">
                <div className="mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-black text-transparent">
                  99.9%
                </div>
                <div className="text-sm text-slate-400">Accuracy Rate</div>
              </div>

              <div className="stat-item rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-xl">
                <div className="mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-4xl font-black text-transparent">
                  10M+
                </div>
                <div className="text-sm text-slate-400">Cables Analyzed</div>
              </div>

              <div className="stat-item rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-xl">
                <div className="mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-4xl font-black text-transparent">
                  2.5s
                </div>
                <div className="text-sm text-slate-400">Avg. Process Time</div>
              </div>

              <div className="stat-item rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-xl">
                <div className="mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-4xl font-black text-transparent">
                  24/7
                </div>
                <div className="text-sm text-slate-400">AI Monitoring</div>
              </div>
            </div>

            <button className="group inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
              <span>Try 3D Visualizer</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right - 3D Canvas */}
          <div ref={canvasRef} className="relative h-[600px] overflow-hidden rounded-2xl">
            {/* Canvas Background */}
            <div className="absolute inset-0 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-950">
              <Canvas>
                <Suspense fallback={null}>
                  <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

                  {/* Lighting */}
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                  <spotLight
                    position={[0, 10, 0]}
                    angle={0.3}
                    penumbra={1}
                    intensity={1}
                    color="#3b82f6"
                  />

                  {/* Main Visualization */}
                  <CableVisualization />

                  {/* Post-processing */}
                  <EffectComposer>
                    <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
                    <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={3} />
                  </EffectComposer>
                </Suspense>
              </Canvas>
            </div>

            {/* Overlay Info */}
            <div className="absolute left-6 top-6 rounded-lg border border-slate-700/50 bg-slate-900/80 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-sm font-semibold text-white">Live Rendering</span>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 rounded-lg border border-slate-700/50 bg-slate-900/80 px-4 py-3 backdrop-blur-xl">
              <div className="mb-1 text-xs text-slate-400">WebGL Performance</div>
              <div className="text-2xl font-bold text-green-400">60 FPS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
