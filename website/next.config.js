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

    // Fix for WebAssembly in Next.js
    config.module.rules.push({
      test: /\.wasm$/,
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
