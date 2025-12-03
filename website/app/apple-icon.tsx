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
          background: 'linear-gradient(135deg, #f97316 0%, #10b981 100%)',
          borderRadius: '32px',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shopping Cart Body */}
          <path
            d="M 20 30 L 28 30 L 38 65 L 75 65 L 85 40 L 35 40"
            stroke="white"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cart Wheels */}
          <circle cx="45" cy="78" r="7" stroke="white" strokeWidth="4" fill="none" />
          <circle cx="68" cy="78" r="7" stroke="white" strokeWidth="4" fill="none" />

          {/* Cable Harness Wires in Cart */}
          <path
            d="M 42 48 Q 55 42, 65 48"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 45 54 Q 55 48, 70 54"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Connector Nodes */}
          <circle cx="42" cy="48" r="3" fill="white" />
          <circle cx="65" cy="48" r="3" fill="white" />
          <circle cx="45" cy="54" r="3" fill="white" />
          <circle cx="70" cy="54" r="3" fill="white" />

          {/* Handle accent */}
          <circle cx="20" cy="30" r="4" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
