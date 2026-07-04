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
          background: '#0f172a',
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 28,
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 15 C 8 15, 8 9, 12 9 C 16 9, 16 15, 20 15"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="4" cy="15" r="2" fill="#0f172a" />
            <circle cx="20" cy="15" r="2" fill="#0f172a" />
          </svg>
        </div>

        {/* Brand Name */}
        <div
          style={{
            display: 'flex',
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#ffffff',
          }}
        >
          Harness Cart
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: 'rgba(255,255,255,0.7)',
            marginTop: 20,
          }}
        >
          Cable harnesses, manufactured on demand
        </div>

        {/* Sub-tagline */}
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.45)',
            marginTop: 12,
          }}
        >
          Instant quotes in under 60 seconds
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
