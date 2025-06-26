"use client"

import { motion } from "framer-motion"
import { Home, Briefcase, BookOpen, ImageIcon, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useRouter } from "next/navigation"

const navItems = [
  { id: "home", icon: Home, label: "Home", href: "/" },
  { id: "work", icon: Briefcase, label: "Work", href: "/work" },
  { id: "blog", icon: BookOpen, label: "Blog", href: "/blog" },
  { id: "gallery", icon: ImageIcon, label: "Gallery", href: "/gallery" },
]

export default function FloatingNavbar() {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 w-full z-50 glass-nav md:top-6 md:bottom-auto md:left-1/2 md:right-auto md:w-auto md:max-w-xl md:transform md:-translate-x-1/2"
    >
      <div className="flex items-center justify-between w-full px-6 py-3">
        <div className="flex gap-2 mx-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={`nav-item relative`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={16} />
              <span className="font-mono text-xs">{item.label}</span>
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
