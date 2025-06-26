"use client"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import FloatingNavbar from "@/components/floating-navbar"
import LoadingScreen from "@/components/loading-screen"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

// Preload all page components and data
function PreloadAllContent() {
  const router = useRouter()

  useEffect(() => {
    const preloadEverything = async () => {
      try {
        // Prefetch all routes immediately
        const routes = ["/", "/work", "/blog", "/gallery"]

        // Prefetch all routes in parallel
        await Promise.all(routes.map((route) => router.prefetch(route)))

        // Preload all dynamic imports and data
        await Promise.all([
          // Preload page components
          import("@/components/home-page"),
          import("@/components/work-page"),
          import("@/components/blog-page"),
          import("@/components/gallery-page"),

          // Preload data modules
          import("@/lib/projects-data"),
          import("@/lib/blog-data"),
          import("@/lib/site-data"),

          // Preload UI components that might be used
          import("@/components/project-card"),
          import("@/components/spotify-widget"),
          import("@/components/tech-stack"),
          import("@/components/timeline"),
          import("@/components/gallery-item"),
          import("@/components/lightbox"),
        ])

        // Preload images that are commonly used
        const imageUrls = ["/profile.jpg", "/image-not-found.png"]

        await Promise.all(
          imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
              const img = new Image()
              img.onload = resolve
              img.onerror = reject
              img.src = url
            })
          }),
        )

        console.log("✅ All content preloaded successfully")
      } catch (error) {
        console.warn("⚠️ Some content failed to preload:", error)
      }
    }

    preloadEverything()
  }, [router])

  return null
}

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (isFirstLoad.current) {
      setLoading(true)

      // Show loading screen while everything preloads
      const timer = setTimeout(() => {
        setLoading(false)
        setHasLoaded(true)
        isFirstLoad.current = false
        console.log("🚀 Site fully loaded and ready")
      }, 2500) // Reduced time since we're preloading everything

      return () => clearTimeout(timer)
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <ThemeProvider>
      <PreloadAllContent />
      <FloatingNavbar />
      {loading && !hasLoaded ? (
        <LoadingScreen />
      ) : (
        <div className="transition-opacity duration-300 ease-in-out">{children}</div>
      )}
    </ThemeProvider>
  )
}
