import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: 'Kaushik S',
  description: 'hello <3',
  generator: 'kaushikieee.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kaushik S",
              "url": "https://kaushikieee.me/",
              "sameAs": [
                "https://github.com/kaushikieee",
                "https://instagram.com/kaushikieee",
                "https://snapchat.com/add/kaushikieee"
              ],
              "jobTitle": "Developer, Poet",
              "worksFor": {
                "@type": "Organization",
                "name": "Veloxineology Labs"
              }
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
