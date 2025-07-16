"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

const navItems = [
  { id: "home", emoji: "🏠", label: "Home" },
  { id: "about", emoji: "👤", label: "About" },
  { id: "work", emoji: "🛠️", label: "Work" },
  { id: "gallery", emoji: "🖼️", label: "Gallery" },
  { id: "pins", emoji: "📌", label: "Pins" },
  { id: "contact", emoji: "📞", label: "Contact" },
]

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-6 left-6 z-50 backdrop-blur-lg bg-white/20 dark:bg-white/10 rounded-2xl p-2 border border-orange-200/30 dark:border-white/20 shadow-lg dark:shadow-2xl"
    >
      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`relative p-3 rounded-xl transition-all duration-200 ${
              currentPage === item.id
                ? "bg-orange-200/50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
                : "hover:bg-white/30 dark:hover:bg-white/10 text-gray-700 dark:text-white/80"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">{item.emoji}</span>
            {currentPage === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-xl border border-orange-400/30"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}

        {/* Theme toggle */}
        <div className="w-px h-8 bg-gray-300 dark:bg-white/20 mx-2" />
        <motion.button
          onClick={toggleTheme}
          className="p-3 rounded-xl hover:bg-white/30 dark:hover:bg-white/10 text-gray-700 dark:text-white/80 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === "light" ? <Moon size={20} /> : theme === "dark" ? <Sun size={20} /> : <Sun size={20} />}
        </motion.button>
      </div>
    </motion.nav>
  )
}
