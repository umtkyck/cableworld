import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ClientProviders from '@/components/ClientProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CableWorld - Instant Cable Harness Manufacturing',
  description: 'Get instant quotes for custom cable and wire harnesses. Upload your design and receive quotes in under 60 seconds from our global manufacturer network.',
  keywords: ['cable harness', 'wire harness', 'custom manufacturing', 'instant quotes', 'PCB assembly'],
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
        </ClientProviders>
      </body>
    </html>
  )
}
