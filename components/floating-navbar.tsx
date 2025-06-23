"use client"

import { motion } from "framer-motion"
import { Home, Briefcase, BookOpen, ImageIcon, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "work", icon: Briefcase, label: "Work" },
  { id: "blog", icon: BookOpen, label: "Blog" },
  { id: "gallery", icon: ImageIcon, label: "Gallery" },
]

interface FloatingNavbarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function FloatingNavbar({ currentPage, setCurrentPage }: FloatingNavbarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-nav max-w-xl w-full"
    >
      <div className="flex items-center justify-between w-full px-6 py-3">
        <div className="flex gap-2 mx-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`nav-item relative ${currentPage === item.id ? "nav-item-active" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={16} />
              <span className="font-mono text-xs">{item.label}</span>
              {currentPage === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center">
          <div className="w-px h-6 bg-border mx-3" />
          <motion.button
            onClick={toggleTheme}
            className="nav-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span className="font-mono text-xs">Theme</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
