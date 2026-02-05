import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ClientProviders from '@/components/ClientProviders'
import Chatbot from '@/components/Chatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://harnesscart.vercel.app'),
  title: {
    default: 'Harness Cart - Instant Cable Harness Manufacturing',
    template: '%s | Harness Cart'
  },
  description: 'Get instant quotes for custom cable and wire harnesses. Upload your design and receive quotes in under 60 seconds from our global manufacturer network.',
  keywords: ['cable harness', 'wire harness', 'custom manufacturing', 'instant quotes', 'PCB assembly', 'cable assembly', 'custom cables', 'wire assembly'],
  authors: [{ name: 'Harness Cart' }],
  creator: 'Harness Cart',
  publisher: 'Harness Cart',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harnesscart.vercel.app',
    title: 'Harness Cart - Instant Cable Harness Manufacturing',
    description: 'Get instant quotes for custom cable and wire harnesses. Upload your design and receive quotes in under 60 seconds from our global manufacturer network.',
    siteName: 'Harness Cart',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harness Cart - Instant Cable Harness Manufacturing',
    description: 'Get instant quotes for custom cable and wire harnesses in under 60 seconds.',
    creator: '@harnesscart',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Chatbot />
        </ClientProviders>
      </body>
    </html>
  )
}
