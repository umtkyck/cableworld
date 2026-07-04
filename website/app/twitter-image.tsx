import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Harness Cart - Instant Cable Harness Manufacturing'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function TwitterImage() {
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
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(249,115,22,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.15) 0%, transparent 40%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo Icon */}
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 32,
              background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 30,
              boxShadow: '0 20px 60px rgba(249,115,22,0.3)',
            }}
          >
            <svg
              width="110"
              height="110"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 18 25 C 18 23 20 22 22 23 L 26 25 L 30 55 C 30 58 32 60 35 60 L 72 60 C 75 60 77 58 78 55 L 84 32 C 85 29 83 27 80 27 L 32 27"
                stroke="white"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="40" cy="72" r="6" fill="white" />
              <circle cx="66" cy="72" r="6" fill="white" />
              <path d="M 38 40 Q 55 32, 72 40" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <circle cx="38" cy="40" r="4" fill="white" />
              <circle cx="72" cy="40" r="4" fill="white" />
            </svg>
          </div>

          {/* Brand Name */}
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: '#f97316' }}>Harness</span>
            <span style={{ color: '#10b981' }}>Cart</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.9)',
              marginTop: 16,
              fontWeight: 500,
            }}
          >
            Cable Solutions • Instant Quotes • Global Network
          </div>

          {/* Sub-tagline */}
          <div
            style={{
              fontSize: 22,
              color: 'rgba(255,255,255,0.6)',
              marginTop: 12,
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
