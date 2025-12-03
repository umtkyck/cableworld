import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

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
          background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #10b981 100%)',
          borderRadius: '36px',
        }}
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Modern Shopping Cart */}
          <path
            d="M 18 25 C 18 23 20 22 22 23 L 26 25 L 30 55 C 30 58 32 60 35 60 L 72 60 C 75 60 77 58 78 55 L 84 32 C 85 29 83 27 80 27 L 32 27"
            stroke="white"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cart Wheels */}
          <circle cx="40" cy="72" r="6" fill="white" />
          <circle cx="40" cy="72" r="2" fill="#f97316" />
          <circle cx="66" cy="72" r="6" fill="white" />
          <circle cx="66" cy="72" r="2" fill="#10b981" />

          {/* Cable Harness Wires */}
          <path
            d="M 38 38 Q 50 32, 62 38 Q 74 44, 74 38"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M 36 46 Q 48 40, 60 46 Q 72 52, 76 46"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* Connector Dots */}
          <circle cx="38" cy="38" r="3.5" fill="white" />
          <circle cx="74" cy="38" r="3.5" fill="white" />
          <circle cx="36" cy="46" r="3.5" fill="white" />
          <circle cx="76" cy="46" r="3.5" fill="white" />

          {/* Quality Badge */}
          <circle cx="82" cy="18" r="9" fill="white" />
          <path
            d="M 82 12 L 83 15.5 L 86.5 16.5 L 83 17.5 L 82 21 L 81 17.5 L 77.5 16.5 L 81 15.5 Z"
            fill="#10b981"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
