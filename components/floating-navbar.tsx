"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import React from "react"
import { siteData } from "@/lib/site-data"
import { usePathname } from "next/navigation"
import "./SpotlightCard.css"

export default function FloatingNavbar() {
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

  const pathname = usePathname();
  const divRef = React.useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", "rgba(100, 255, 218, 0.15)");
  };

  return (
    <>
      {/* Floating Navigation Bar */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          className="card-spotlight bg-card/80 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-lg"
        >
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

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {isClient && siteData.navigation?.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-mono transition-colors duration-200 ${pathname === item.href ? "text-accent font-bold" : "text-secondary hover:text-accent"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 left-0 right-0 flex justify-center z-40 md:hidden"
        >
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg px-6 py-4 shadow-lg">
            <div className="flex flex-col gap-4">
              {isClient && siteData.navigation?.map((item) => (
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
    </>
  )
}
