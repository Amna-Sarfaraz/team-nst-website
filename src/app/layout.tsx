import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TEAM NST - NED Society of Technology',
  description: 'Official website of TEAM NST (NED Society of Technology). Innovation through technology at NED University.',
  keywords: 'NED University, Technology Society, TEAM NST, Innovation, Projects, Competitions',
  authors: [{ name: 'TEAM NST' }],
  openGraph: {
    title: 'TEAM NST - NED Society of Technology',
    description: 'Innovation through technology at NED University',
    type: 'website',
    locale: 'en_US',
    siteName: 'TEAM NST',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEAM NST - NED Society of Technology',
    description: 'Innovation through technology at NED University',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#0586F0',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
