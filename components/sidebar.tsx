"use client"

import { motion } from "framer-motion"
import { User, Briefcase, GraduationCap, Code, Home, Mail } from "lucide-react"

const sidebarItems = [
  { id: "introduction", icon: User, label: "Introduction", active: true },
  { id: "experience", icon: Briefcase, label: "Work Experience" },
  { id: "studies", icon: GraduationCap, label: "Studies" },
  { id: "skills", icon: Code, label: "Technical Skills" },
  { id: "contact", icon: Mail, label: "Contact" },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-0 h-full w-80 bg-dark-secondary/50 backdrop-blur-xl border-r border-white/10 z-50"
    >
      <div className="flex flex-col h-full p-8">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Portfolio</h2>
              <p className="text-xs text-gray-400">Kaushik's Space</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <button
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    item.active
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-colors ${
                      item.active ? "text-orange-400" : "text-gray-500 group-hover:text-white"
                    }`}
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.active && (
                    <motion.div layoutId="activeIndicator" className="ml-auto w-2 h-2 bg-orange-400 rounded-full" />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Made with ❤️ using</p>
            <div className="flex justify-center gap-2">
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md">React</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-md">Framer</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}
