import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import ClickSpark from "@/components/click-spark"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: "Kaushik S - Portfolio",
  description: "Student & Developer. Poet at heart, with an obsessive devotion to precision—every word, every pixel, placed with purpose in pursuit of perfection.",
  keywords: ["kaushikieee", "portfolio", "developer", "designer", "student", "react", "next.js", "typescript"],
  authors: [{ name: "Kaushik S" }],
  creator: "Kaushik S",
  publisher: "Kaushik S",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kaushikieee.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kaushik S - Portfolio",
    description: "Student & Developer. Poet at heart, with an obsessive devotion to precision.",
    url: 'https://kaushikieee.vercel.app',
    siteName: 'Kaushik S Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kaushik S Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kaushik S - Portfolio",
    description: "Student & Developer. Poet at heart, with an obsessive devotion to precision.",
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/api/spotify/now-playing" as="fetch" crossOrigin="anonymous" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.spotify.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.spotify.com" />
        
        {/* Resource hints for better loading */}
        <link rel="preload" href="/profile.jpg" as="image" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
        
        {/* PWA support */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kaushik S",
              "jobTitle": "Student & Developer",
              "description": "Poet at heart, with an obsessive devotion to precision",
              "url": "https://kaushikieee.vercel.app",
              "sameAs": [
                "https://github.com/veloxineology",
                "https://instagram.com/kaushikieee"
              ],
              "knowsAbout": [
                "React", "TypeScript", "Next.js", "Design Systems", "UI/UX"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <ClickSpark sparkColor="#64ffda" sparkSize={12} sparkRadius={18} children={children} />

        </ThemeProvider>
      </body>
    </html>
  )
}
