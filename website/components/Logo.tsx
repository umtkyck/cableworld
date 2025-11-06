interface LogoProps {
  variant?: 'default' | 'white';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'default', showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-lg' },
    md: { container: 'w-10 h-10', text: 'text-2xl' },
    lg: { container: 'w-12 h-12', text: 'text-3xl' }
  };

  const colors = {
    default: {
      gradient1: '#10b981', // accent-green
      gradient2: '#3b82f6', // accent-blue
      text: 'text-primary-500'
    },
    white: {
      gradient1: '#10b981',
      gradient2: '#3b82f6',
      text: 'text-white'
    }
  };

  const currentSize = sizes[size];
  const currentColors = colors[variant];

  return (
    <div className="flex items-center space-x-2">
      <div className={`${currentSize.container} relative`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColors.gradient1} />
              <stop offset="100%" stopColor={currentColors.gradient2} />
            </linearGradient>
          </defs>

          {/* Modern Cable/Circuit Design */}
          {/* Main Circle Background */}
          <circle cx="50" cy="50" r="48" fill="url(#cableGradient)" opacity="0.1" />

          {/* Connection Nodes (Circuit Style) */}
          <circle cx="30" cy="35" r="4" fill="url(#cableGradient)" />
          <circle cx="70" cy="35" r="4" fill="url(#cableGradient)" />
          <circle cx="30" cy="65" r="4" fill="url(#cableGradient)" />
          <circle cx="70" cy="65" r="4" fill="url(#cableGradient)" />
          <circle cx="50" cy="50" r="6" fill="url(#cableGradient)" />

          {/* Cable/Wire Connections */}
          {/* Top connections */}
          <path
            d="M 30 35 Q 40 30, 50 35 T 70 35"
            stroke="url(#cableGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Center connections */}
          <path
            d="M 30 35 L 50 50"
            stroke="url(#cableGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 70 35 L 50 50"
            stroke="url(#cableGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 30 65 L 50 50"
            stroke="url(#cableGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 70 65 L 50 50"
            stroke="url(#cableGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Bottom connections */}
          <path
            d="M 30 65 Q 40 70, 50 65 T 70 65"
            stroke="url(#cableGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* C Letter Integration (Subtle) */}
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

      {showText && (
        <span className={`${currentSize.text} font-bold ${currentColors.text}`}>
          CableWorld
        </span>
      )}
    </div>
  );
}
