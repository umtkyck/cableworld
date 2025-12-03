import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

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
          background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #10b981 100%)',
          borderRadius: '6px',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Modern Shopping Cart */}
          <path
            d="M 18 25 C 18 23 20 22 22 23 L 26 25 L 30 55 C 30 58 32 60 35 60 L 72 60 C 75 60 77 58 78 55 L 84 32 C 85 29 83 27 80 27 L 32 27"
            stroke="white"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cart Wheels */}
          <circle cx="40" cy="72" r="7" fill="white" />
          <circle cx="66" cy="72" r="7" fill="white" />

          {/* Cable Wire */}
          <path
            d="M 38 40 Q 55 32, 72 40"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Connector Dots */}
          <circle cx="38" cy="40" r="4" fill="white" />
          <circle cx="72" cy="40" r="4" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
