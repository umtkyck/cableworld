import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Icon generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        <svg
          width="32"
          height="32"
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
          <circle cx="50" cy="50" r="48" fill="url(#cableGradient)" opacity="0.1" />

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
      </div>
    ),
    {
      ...size,
    }
  )
}
