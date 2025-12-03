import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Harness Cart - Instant Cable Harness Manufacturing'
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
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
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
            backgroundImage: 'linear-gradient(to right, rgba(249,115,22,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.08) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(16,185,129,0.15) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(249,115,22,0.1) 100%)',
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
            width="180"
            height="180"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="harnessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Shopping Cart Body */}
            <path
              d="M 20 30 L 28 30 L 38 65 L 75 65 L 85 40 L 35 40"
              stroke="url(#harnessGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Cart Wheels */}
            <circle cx="45" cy="78" r="7" stroke="url(#harnessGradient)" strokeWidth="4" fill="none" />
            <circle cx="68" cy="78" r="7" stroke="url(#harnessGradient)" strokeWidth="4" fill="none" />

            {/* Cable Harness Wires */}
            <path
              d="M 42 48 Q 55 42, 65 48"
              stroke="#f97316"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 45 54 Q 55 48, 70 54"
              stroke="#10b981"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Connector Nodes */}
            <circle cx="42" cy="48" r="3" fill="#f97316" />
            <circle cx="65" cy="48" r="3" fill="#f97316" />
            <circle cx="45" cy="54" r="3" fill="#10b981" />
            <circle cx="70" cy="54" r="3" fill="#10b981" />

            {/* Handle accent */}
            <circle cx="20" cy="30" r="4" fill="url(#harnessGradient)" />
          </svg>

          {/* Brand Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: 'white',
              marginTop: 30,
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            Harness<span style={{ color: '#f97316' }}>Cart</span>
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
              background: 'linear-gradient(90deg, #f97316 0%, #10b981 100%)',
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
