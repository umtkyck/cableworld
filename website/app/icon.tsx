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
          background: 'linear-gradient(135deg, #f97316 0%, #10b981 100%)',
          borderRadius: '6px',
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shopping Cart Body */}
          <path
            d="M 20 30 L 28 30 L 38 65 L 75 65 L 85 40 L 35 40"
            stroke="white"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cart Wheels */}
          <circle cx="45" cy="78" r="7" stroke="white" strokeWidth="5" fill="none" />
          <circle cx="68" cy="78" r="7" stroke="white" strokeWidth="5" fill="none" />

          {/* Cable Harness Wires */}
          <path
            d="M 42 50 Q 55 44, 70 50"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Connector Nodes */}
          <circle cx="42" cy="50" r="4" fill="white" />
          <circle cx="70" cy="50" r="4" fill="white" />

          {/* Handle accent */}
          <circle cx="20" cy="30" r="5" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
