interface LogoProps {
  variant?: 'default' | 'white';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'default', showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-lg', subtext: 'text-[8px]' },
    md: { container: 'w-10 h-10', text: 'text-xl', subtext: 'text-[9px]' },
    lg: { container: 'w-14 h-14', text: 'text-2xl', subtext: 'text-xs' }
  };

  const colors = {
    default: {
      primary: '#f97316', // orange-500
      secondary: '#10b981', // emerald-500
      accent: '#fbbf24', // amber-400
      text: 'text-slate-800 dark:text-white',
      subtext: 'text-slate-500 dark:text-slate-400'
    },
    white: {
      primary: '#f97316',
      secondary: '#10b981',
      accent: '#fbbf24',
      text: 'text-white',
      subtext: 'text-slate-300'
    }
  };

  const currentSize = sizes[size];
  const currentColors = colors[variant];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${currentSize.container} relative flex-shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColors.primary} />
              <stop offset="50%" stopColor={currentColors.accent} />
              <stop offset="100%" stopColor={currentColors.secondary} />
            </linearGradient>
            <linearGradient id="wireGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentColors.primary} />
              <stop offset="100%" stopColor={currentColors.accent} />
            </linearGradient>
            <linearGradient id="wireGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentColors.secondary} />
              <stop offset="100%" stopColor={currentColors.primary} />
            </linearGradient>
          </defs>

          {/* Background Circle */}
          <circle cx="50" cy="50" r="46" fill="url(#logoGradient)" opacity="0.1" />

          {/* Modern Shopping Cart - Rounded Style */}
          <path
            d="M 18 25 C 18 23 20 22 22 23 L 26 25 L 30 55 C 30 58 32 60 35 60 L 72 60 C 75 60 77 58 78 55 L 84 32 C 85 29 83 27 80 27 L 32 27"
            stroke="url(#logoGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cart Wheels - Modern */}
          <circle cx="40" cy="72" r="6" fill="url(#logoGradient)" />
          <circle cx="40" cy="72" r="2.5" fill={variant === 'white' ? '#1e293b' : 'white'} />
          <circle cx="66" cy="72" r="6" fill="url(#logoGradient)" />
          <circle cx="66" cy="72" r="2.5" fill={variant === 'white' ? '#1e293b' : 'white'} />

          {/* Cable Harness Wires - Professional Style */}
          <path
            d="M 38 38 Q 50 32, 62 38 Q 74 44, 74 38"
            stroke="url(#wireGradient1)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 36 46 Q 48 40, 60 46 Q 72 52, 76 46"
            stroke="url(#wireGradient2)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Connector Dots */}
          <circle cx="38" cy="38" r="4" fill={currentColors.primary} />
          <circle cx="74" cy="38" r="4" fill={currentColors.accent} />
          <circle cx="36" cy="46" r="4" fill={currentColors.secondary} />
          <circle cx="76" cy="46" r="4" fill={currentColors.primary} />

          {/* Sparkle/Quality Badge */}
          <circle cx="82" cy="18" r="10" fill={currentColors.secondary} />
          <path
            d="M 82 12 L 83 16 L 87 17 L 83 18 L 82 22 L 81 18 L 77 17 L 81 16 Z"
            fill="white"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`${currentSize.text} font-bold tracking-tight ${currentColors.text}`}>
            <span className="text-orange-500">Harness</span>
            <span className="text-emerald-500">Cart</span>
          </span>
          <span className={`${currentSize.subtext} font-medium tracking-wider uppercase ${currentColors.subtext}`}>
            Cable Solutions
          </span>
        </div>
      )}
    </div>
  );
}
