'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Brain, Globe, Shield, Layers, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze your designs instantly, providing accurate quotes and manufacturing insights.',
    color: 'from-cyan-500 to-blue-600',
    delay: 0,
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get quotes in under 60 seconds. Our optimized platform processes thousands of parameters in real-time.',
    color: 'from-purple-500 to-pink-600',
    delay: 0.1,
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access 50+ vetted manufacturers worldwide. We ensure quality, reliability, and competitive pricing.',
    color: 'from-green-500 to-emerald-600',
    delay: 0.2,
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'ISO 9001 certified partners. Every manufacturer undergoes rigorous verification and quality audits.',
    color: 'from-orange-500 to-red-600',
    delay: 0.3,
  },
  {
    icon: Layers,
    title: 'Full Stack Integration',
    description: 'Seamless integration with your existing CAD tools, ERP systems, and supply chain management.',
    color: 'from-blue-500 to-indigo-600',
    delay: 0.4,
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Tracking',
    description: 'Monitor your orders from quote to delivery with live updates and predictive shipping analytics.',
    color: 'from-pink-500 to-rose-600',
    delay: 0.5,
  },
]

export default function Features3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      })

      // Feature cards stagger animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.feature-grid',
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 100,
        rotation: -5,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      })

      // Parallax effect for cards
      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: i % 2 === 0 ? -30 : 30,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 2px, transparent 2px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 2px, transparent 2px)
            `,
            backgroundSize: '100px 100px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">Platform Features</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Cutting-Edge Technology
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Powered by advanced AI and WebGL, our platform delivers unprecedented speed,
            accuracy, and user experience in cable harness manufacturing.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="feature-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="feature-card group relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Background with Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 h-full transition-all duration-500 group-hover:border-cyan-500/50 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
            <span>Explore All Features</span>
            <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(100px, 100px);
          }
        }
      `}</style>
    </section>
  )
}
