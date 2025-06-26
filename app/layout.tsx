import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider";
import FloatingNavbar from "@/components/floating-navbar";
import LoadingScreen from "@/components/loading-screen";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

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
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

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
          <FloatingNavbar />
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LoadingScreen />
              </motion.div>
            ) : (
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </ThemeProvider>
      </body>
    </html>
  )
}
