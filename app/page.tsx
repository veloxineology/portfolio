"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import FloatingNavbar from "@/components/floating-navbar"
import HomePage from "@/components/home-page"
import WorkPage from "@/components/work-page"
import BlogPage from "@/components/blog-page"
import GalleryPage from "@/components/gallery-page"
import { ThemeProvider } from "@/components/theme-provider"

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState("home")

  useEffect(() => {
    // 8 second loading duration for longer experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />
      case "work":
        return <WorkPage />
      case "blog":
        return <BlogPage />
      case "gallery":
        return <GalleryPage />
      default:
        return <HomePage />
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-dark-bg text-dark-text transition-colors duration-300">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <FloatingNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
              <main className="pt-24">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderPage()}
                  </motion.div>
                </AnimatePresence>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}
