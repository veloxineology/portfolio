"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { siteData } from "@/lib/site-data"

export default function MobileNavbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (!isClient) return null

  return (
    <div className="md:hidden">
      {/* Floating Navigation Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-4 left-0 right-0 flex justify-center z-50"
      >
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon size={16} />
              ) : theme === "dark" ? (
                <Sun size={16} />
              ) : (
                <Sun size={16} />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 left-0 right-0 flex justify-center z-40"
        >
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg px-6 py-4 shadow-lg">
            <div className="flex flex-col gap-4">
              {siteData.navigation?.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-mono text-secondary hover:text-accent transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
} 