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
      primary: '#f97316', // orange-500
      secondary: '#10b981', // emerald-500
      text: 'text-slate-800 dark:text-white'
    },
    white: {
      primary: '#f97316',
      secondary: '#10b981',
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
            <linearGradient id="harnessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColors.primary} />
              <stop offset="100%" stopColor={currentColors.secondary} />
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

          {/* Cable Harness Wires in Cart */}
          <path
            d="M 42 48 Q 55 42, 65 48"
            stroke={currentColors.primary}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 45 54 Q 55 48, 70 54"
            stroke={currentColors.secondary}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Connector Nodes */}
          <circle cx="42" cy="48" r="3" fill={currentColors.primary} />
          <circle cx="65" cy="48" r="3" fill={currentColors.primary} />
          <circle cx="45" cy="54" r="3" fill={currentColors.secondary} />
          <circle cx="70" cy="54" r="3" fill={currentColors.secondary} />

          {/* Handle accent */}
          <circle cx="20" cy="30" r="4" fill="url(#harnessGradient)" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${currentSize.text} font-bold ${currentColors.text}`}>
            Harness<span className="text-orange-500">Cart</span>
          </span>
        </div>
      )}
    </div>
  );
}
