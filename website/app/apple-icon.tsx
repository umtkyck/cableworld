import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Apple Icon generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Connection Nodes */}
          <circle cx="30" cy="35" r="4" fill="white" />
          <circle cx="70" cy="35" r="4" fill="white" />
          <circle cx="30" cy="65" r="4" fill="white" />
          <circle cx="70" cy="65" r="4" fill="white" />
          <circle cx="50" cy="50" r="6" fill="white" />

          {/* Cable Connections */}
          <path
            d="M 30 35 Q 40 30, 50 35 T 70 35"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          <path d="M 30 35 L 50 50" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 70 35 L 50 50" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 30 65 L 50 50" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 70 65 L 50 50" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

          <path
            d="M 30 65 Q 40 70, 50 65 T 70 65"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* C Letter */}
          <path
            d="M 70 25 A 25 25 0 0 1 70 75"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
