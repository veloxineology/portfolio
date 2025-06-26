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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-nav w-auto max-w-lg rounded-2xl shadow-2xl"
    >
      <div className="flex items-center justify-between w-full px-6 py-3">
        <div className="flex gap-2 mx-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={`nav-item relative`}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              style={{ borderRadius: '1rem' }}
            >
              <item.icon size={22} />
              <span className="font-mono text-xs hidden md:inline">{item.label}</span>
            </motion.button>
          ))}
        </div>
        <div className="flex items-center">
          <div className="w-px h-6 bg-border mx-3" />
          <motion.button
            onClick={toggleTheme}
            className="nav-item"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
            style={{ borderRadius: '1rem' }}
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            <span className="font-mono text-xs hidden md:inline">Theme</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
