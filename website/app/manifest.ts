import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Harness Cart - Instant Cable Harness Manufacturing',
    short_name: 'Harness Cart',
    description: 'Get instant quotes for custom cable and wire harnesses in under 60 seconds.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1e293b',
    theme_color: '#f97316',
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
