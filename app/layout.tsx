import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space',
})

export const metadata: Metadata = {
  title: 'TEAM NST - NED Society of Technology',
  description: 'Official website of TEAM NST (NED Society of Technology) - Innovating the future through technology, competitions, and collaboration.',
  keywords: 'TEAM NST, NED University, Technology Society, Innovation, Competitions, Projects',
  authors: [{ name: 'TEAM NST' }],
  openGraph: {
    title: 'TEAM NST - NED Society of Technology',
    description: 'Official website of TEAM NST - Innovating the future through technology',
    url: 'https://teamnst.com',
    siteName: 'TEAM NST',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background text-white antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  )
}
