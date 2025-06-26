"use client"

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
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4">
      <nav className="relative">
        {/* Enhanced Glassmorphism Background */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl" />

        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/10 dark:from-black/5 dark:via-transparent dark:to-black/10 rounded-2xl" />

        {/* Subtle inner border */}
        <div className="absolute inset-[1px] bg-gradient-to-b from-white/20 via-transparent to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent rounded-2xl" />

        {/* Content */}
        <div className="relative flex items-center gap-1 px-4 py-3">
          {/* Navigation items */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.href)}
              className={`relative flex items-center justify-center gap-2 px-3 py-3 md:px-4 md:py-3 rounded-xl transition-all duration-300 group ${
                isActive(item.href)
                  ? "text-accent bg-white/20 dark:bg-white/10"
                  : "text-muted hover:text-primary hover:bg-white/10 dark:hover:bg-white/5"
              }`}
            >
              {/* Icon */}
              <item.icon size={20} className="transition-colors duration-300 flex-shrink-0" />

              {/* Text label - only visible on desktop */}
              <span className="hidden md:block text-sm font-medium transition-colors duration-300 whitespace-nowrap">
                {item.label}
              </span>

              {/* Active indicator - positioned differently for mobile vs desktop */}
              {isActive(item.href) && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-0.5 bg-accent rounded-full md:rounded-sm" />
              )}

              {/* Tooltip - only show on mobile when text is hidden */}
              <div className="md:hidden absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap backdrop-blur-sm">
                {item.label}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white/90" />
              </div>
            </button>
          ))}

          {/* Separator with glassmorphism */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent dark:via-white/20 mx-2" />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center gap-2 px-3 py-3 md:px-4 md:py-3 rounded-xl text-muted hover:text-primary hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 group"
            aria-label="Toggle theme"
          >
            <div className="transition-transform duration-300 group-hover:rotate-12 flex-shrink-0">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </div>

            {/* Text label - only visible on desktop */}
            <span className="hidden md:block text-sm font-medium transition-colors duration-300 whitespace-nowrap">
              {theme === "dark" ? "Light" : "Dark"}
            </span>

            {/* Tooltip - only show on mobile when text is hidden */}
            <div className="md:hidden absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap backdrop-blur-sm">
              {theme === "dark" ? "Light mode" : "Dark mode"}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white/90" />
            </div>
          </button>
        </div>

        {/* Bottom reflection effect */}
        <div className="absolute top-full left-0 right-0 h-8 bg-gradient-to-b from-white/5 to-transparent dark:from-black/5 dark:to-transparent rounded-b-2xl transform scale-y-[-1] opacity-50 pointer-events-none" />
      </nav>
    </div>
  )
}
