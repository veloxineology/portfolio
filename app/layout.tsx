import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientRootLayout from "@/components/client-root-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kaushik S – Portfolio",
  description: "Poet at heart, developer by trade. Explore my work, blog, and more.",
  keywords: [
    "Kaushikieee",
    "kaushikieee",
    "Kaushik S",
    "kaushik s",
    "Veloxineology Labs",
    "veloxineology labs",
    "Veloxineology",
    "veloxineology",
    "Veloxine",
    "veloxine",
    "GhostGMS",
    "ghostgms",
    "ghostgms github",
    "github kaushikieee",
    "veloxineology github",
    "kaushikieee instagram",
    "kaushikieee snapchat",
    "kaushik s instagram",
    "kaushik s snapchat",
    "kaushik s portfolio",
    "kaushikieee portfolio",
    "veloxineology labs portfolio",
    "kaushik s developer",
    "kaushik s blog",
    "kaushik s projects",
    "kaushik s work",
    "kaushik s poetry",
    "kaushik s tech stack",
    "kaushik s github",
    "kaushik s contact",
    "kaushik s email",
    "kaushik s website",
    "kaushik s personal site",
    "kaushik s open source",
    "kaushik s india",
    "kaushik s software engineer",
    "kaushik s frontend developer",
    "kaushik s backend developer",
    "kaushik s full stack",
    "kaushik s portfolio site",
    "kaushik s creative",
    "kaushik s coder",
    "kaushik s programmer",
    "kaushik s resume",
    "kaushik s experience",
    "kaushik s achievements",
    "kaushik s skills",
  ],
  openGraph: {
    title: "Kaushik S – Portfolio",
    description: "Poet at heart, developer by trade. Explore my work, blog, and more.",
    url: "https://kaushikieee.me/",
    siteName: "Kaushik S Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaushik S – Portfolio",
    description: "Poet at heart, developer by trade. Explore my work, blog, and more.",
    images: ["/og-image.png"],
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
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}
