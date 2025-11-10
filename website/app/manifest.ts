import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CableWorld - Instant Cable Harness Manufacturing',
    short_name: 'CableWorld',
    description: 'Get instant quotes for custom cable and wire harnesses in under 60 seconds.',
    start_url: '/',
    display: 'standalone',
    background_color: '#092c47',
    theme_color: '#13bf87',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
