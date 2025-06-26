"use client"

import { motion } from "framer-motion"
import { Home, Briefcase, BookOpen, ImageIcon, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useRouter, usePathname } from "next/navigation"

const navItems = [
  { id: "home", icon: Home, label: "Home", href: "/" },
  { id: "work", icon: Briefcase, label: "Work", href: "/work" },
  { id: "blog", icon: BookOpen, label: "Blog", href: "/blog" },
  { id: "gallery", icon: ImageIcon, label: "Gallery", href: "/gallery" },
]

export default function FloatingNavbar() {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      {/* macOS Dock-style container */}
      <div className="relative">
        {/* Main dock background */}
        <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl px-3 py-2">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/10 rounded-2xl pointer-events-none" />

          {/* Content container */}
          <div className="relative flex items-center gap-1">
            {/* Navigation items */}
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 group ${
                  isActive(item.href)
                    ? "bg-accent/20 text-accent"
                    : "text-muted hover:text-primary hover:bg-white/10 dark:hover:bg-white/5"
                }`}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {/* Icon */}
                <item.icon size={22} className="mb-1" />

                {/* Label - hidden on mobile, shown on hover on desktop */}
                <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded-md whitespace-nowrap pointer-events-none hidden md:block">
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.button>
            ))}

            {/* Separator */}
            <div className="w-px h-8 bg-white/20 dark:bg-white/10 mx-2" />

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative flex flex-col items-center justify-center p-3 rounded-xl text-muted hover:text-primary hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 group"
              whileHover={{
                scale: 1.1,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}

              {/* Tooltip */}
              <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded-md whitespace-nowrap pointer-events-none hidden md:block">
                Theme
              </span>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.button>
          </div>
        </div>

        {/* Dock reflection effect */}
        <div className="absolute top-full left-0 right-0 h-8 bg-gradient-to-b from-white/5 to-transparent rounded-b-2xl transform scale-y-[-1] opacity-30 pointer-events-none" />
      </div>
    </motion.nav>
  )
}
