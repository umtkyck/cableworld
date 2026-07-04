/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Enable WebAssembly support for occt-import-js (STEP file parsing)
  webpack: (config, { isServer }) => {
    // Enable WebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    // Fix for WebAssembly in Next.js.
    // Exclude `?module` imports (used by Next's own @vercel/og wasm files),
    // which are handled by next-middleware-wasm-loader and must not be re-parsed.
    config.module.rules.push({
      test: /\.wasm$/,
      resourceQuery: { not: [/module/] },
      type: 'webassembly/async',
    })

    // Exclude occt-import-js from server-side bundling
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('occt-import-js')
    }

    return config
  },
}

module.exports = nextConfig
