"use client"

import { motion } from "framer-motion"
import { siteData } from "@/lib/site-data"

export default function TechStack() {
  const { work } = siteData

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Tech Stack</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {work.techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="backdrop-blur-lg bg-white/20 dark:bg-white/5 rounded-2xl p-6 border border-orange-200/30 dark:border-white/10 shadow-lg dark:shadow-2xl text-center"
          >
            <img src={tech.logo || "/placeholder.svg"} alt={tech.name} className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm text-gray-700 dark:text-gray-300">{tech.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
