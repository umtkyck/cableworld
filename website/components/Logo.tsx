import { useMemo } from 'react';

interface LogoProps {
  variant?: 'default' | 'white';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export default function Logo({ variant = 'default', showText = true, size = 'md' }: LogoProps) {
  // Generate unique IDs for gradients to avoid conflicts with multiple logos
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  const sizes = {
    icon: { container: 'w-6 h-6', text: 'text-base', subtext: 'text-[7px]' },
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
  const isSmall = size === 'sm' || size === 'icon';

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
            <linearGradient id={`logoGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColors.primary} />
              <stop offset="50%" stopColor={currentColors.accent} />
              <stop offset="100%" stopColor={currentColors.secondary} />
            </linearGradient>
          </defs>

          {/* Background Circle */}
          <circle cx="50" cy="50" r="48" fill={`url(#logoGradient-${uniqueId})`} opacity="0.15" />

          {/* Main Circle Border */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke={`url(#logoGradient-${uniqueId})`}
            strokeWidth={isSmall ? "4" : "3"}
            fill="none"
          />

          {/* Simplified Shopping Cart */}
          <path
            d="M 25 30 L 30 30 L 36 55 C 36 58 38 60 41 60 L 68 60 C 71 60 73 58 74 55 L 78 35 L 34 35"
            stroke={`url(#logoGradient-${uniqueId})`}
            strokeWidth={isSmall ? "6" : "5"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cart Wheels */}
          <circle cx="44" cy="70" r={isSmall ? "7" : "6"} fill={currentColors.primary} />
          <circle cx="65" cy="70" r={isSmall ? "7" : "6"} fill={currentColors.secondary} />

          {/* Cable Wire - Single Bold Line */}
          <path
            d="M 40 42 Q 55 35, 70 45"
            stroke={currentColors.accent}
            strokeWidth={isSmall ? "5" : "4"}
            fill="none"
            strokeLinecap="round"
          />

          {/* Connector Dots */}
          <circle cx="40" cy="42" r={isSmall ? "5" : "4"} fill={currentColors.primary} />
          <circle cx="70" cy="45" r={isSmall ? "5" : "4"} fill={currentColors.secondary} />

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
