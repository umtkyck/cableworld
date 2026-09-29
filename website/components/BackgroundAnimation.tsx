'use client'

export default function BackgroundAnimation() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute -left-4 top-0 h-72 w-72 animate-blob rounded-full bg-primary-400/20 mix-blend-multiply blur-xl filter dark:bg-primary-500/10 dark:mix-blend-screen" />
      <div className="animation-delay-2000 absolute -right-4 top-0 h-72 w-72 animate-blob rounded-full bg-accent-blue/20 mix-blend-multiply blur-xl filter dark:bg-accent-blue/10 dark:mix-blend-screen" />
      <div className="animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 animate-blob rounded-full bg-accent-green/20 mix-blend-multiply blur-xl filter dark:bg-accent-green/10 dark:mix-blend-screen" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
    </div>
  )
}
