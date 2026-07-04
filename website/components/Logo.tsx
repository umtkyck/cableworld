'use client'

interface LogoProps {
  variant?: 'default' | 'white';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  animated?: boolean;
}

export default function Logo({ variant = 'default', showText = true, size = 'md', animated = true }: LogoProps) {
  const sizes = {
    icon: { container: 'w-6 h-6', text: 'text-base' },
    sm: { container: 'w-7 h-7', text: 'text-lg' },
    md: { container: 'w-8 h-8', text: 'text-lg' },
    lg: { container: 'w-10 h-10', text: 'text-xl' },
    xl: { container: 'w-14 h-14', text: 'text-2xl' }
  };

  const colors = {
    default: {
      mark: 'bg-slate-900 dark:bg-white',
      glyph: 'text-white dark:text-slate-900',
      text: 'text-slate-900 dark:text-white',
    },
    white: {
      mark: 'bg-white',
      glyph: 'text-slate-900',
      text: 'text-white',
    }
  };

  const currentSize = sizes[size];
  const currentColors = colors[variant];

  return (
    <div className={`flex items-center gap-2.5 group ${animated ? 'cursor-pointer' : ''}`}>
      <div className={`${currentSize.container} ${currentColors.mark} rounded-lg flex items-center justify-center flex-shrink-0 transition-opacity duration-200 ${animated ? 'group-hover:opacity-80' : ''}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-3/5 h-3/5 ${currentColors.glyph}`}
        >
          {/* Minimal cable glyph: a wire with two connector dots */}
          <path
            d="M4 15 C 8 15, 8 9, 12 9 C 16 9, 16 15, 20 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="4" cy="15" r="2" fill="currentColor" />
          <circle cx="20" cy="15" r="2" fill="currentColor" />
        </svg>
      </div>

      {showText && (
        <span className={`${currentSize.text} font-semibold tracking-tight ${currentColors.text}`}>
          Harness Cart
        </span>
      )}
    </div>
  );
}
