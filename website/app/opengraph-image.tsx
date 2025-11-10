import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'CableWorld - Instant Cable Harness Manufacturing'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Open Graph Image generation
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #092c47 0%, #051a2a 100%)',
          position: 'relative',
        }}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo and Brand */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo SVG */}
          <svg
            width="200"
            height="200"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* Main Circle Background */}
            <circle cx="50" cy="50" r="48" fill="url(#cableGradient)" opacity="0.2" />

            {/* Connection Nodes */}
            <circle cx="30" cy="35" r="4" fill="url(#cableGradient)" />
            <circle cx="70" cy="35" r="4" fill="url(#cableGradient)" />
            <circle cx="30" cy="65" r="4" fill="url(#cableGradient)" />
            <circle cx="70" cy="65" r="4" fill="url(#cableGradient)" />
            <circle cx="50" cy="50" r="6" fill="url(#cableGradient)" />

            {/* Cable Connections */}
            <path
              d="M 30 35 Q 40 30, 50 35 T 70 35"
              stroke="url(#cableGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            <path d="M 30 35 L 50 50" stroke="url(#cableGradient)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 70 35 L 50 50" stroke="url(#cableGradient)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 30 65 L 50 50" stroke="url(#cableGradient)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 70 65 L 50 50" stroke="url(#cableGradient)" strokeWidth="2.5" strokeLinecap="round" />

            <path
              d="M 30 65 Q 40 70, 50 65 T 70 65"
              stroke="url(#cableGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* C Letter */}
            <path
              d="M 70 25 A 25 25 0 0 1 70 75"
              stroke="url(#cableGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>

          {/* Brand Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: 'white',
              marginTop: 30,
              letterSpacing: '-0.02em',
            }}
          >
            CableWorld
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255,255,255,0.8)',
              marginTop: 20,
              textAlign: 'center',
            }}
          >
            Instant Cable Harness Manufacturing
          </div>

          {/* Sub-tagline */}
          <div
            style={{
              fontSize: 24,
              background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginTop: 15,
            }}
          >
            Get Quotes in Under 60 Seconds
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
