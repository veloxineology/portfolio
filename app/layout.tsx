import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientRootLayout from "@/components/client-root-layout"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: "Kaushik S - Student & Developer Portfolio",
  description: "Poet at heart, with an obsessive devotion to precision—every word, every pixel, placed with purpose in pursuit of perfection. Explore my projects, blog, and creative work.",
  keywords: [
    "kaushikieee",
    "kaushikieee portfolio",
    "kaushikieee developer",
    "kaushikieee blog",
    "kaushikieee projects",
    "kaushikieee work",
    "kaushikieee poetry",
    "kaushikieee tech stack",
    "kaushikieee github",
    "kaushikieee contact",
    "kaushikieee email",
    "kaushikieee website",
    "kaushikieee open source",
    "kaushikieee india",
    "kaushikieee software engineer",
    "kaushikieee frontend developer",
    "kaushikieee backend developer",
    "kaushikieee full stack",
    "kaushikieee creative",
    "kaushikieee coder",
    "kaushikieee programmer",
    "kaushikieee resume",
    "kaushikieee experience",
    "kaushikieee achievements",
    "kaushikieee skills",
    "ghostgms",
    "ghostgms github",
    "ghostgms portfolio",
    "ghostgms project",
    "ghostgms veloxineology",
    "veloxineologylabs portfolio",
    "veloxineologylabs",
    "veloxineology",
    "veloxineology labs",
    "veloxineology github",
    "veloxineology labs portfolio",
    "veloxineology labs github",
    "veloxineology open source",
    "veloxineology projects",
    "veloxineology developer",
    "veloxineology blog",
    "veloxineology work"
  ],
  twitter: {
    card: "summary_large_image",
    site: "@kaushikieee",
    title: "kaushikieee Portfolio",
    description: "Projects, blog, and more by kaushikieee.",
    images: ["/og-image.png"]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        {/* Preload critical resources */}
        <link rel="preload" href="/profile.jpg" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}
