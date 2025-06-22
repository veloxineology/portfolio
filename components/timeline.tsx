"use client"

import { motion } from "framer-motion"

interface TimelineItem {
  time: string
  activity: string
  emoji: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-orange-600" />

      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center gap-6"
          >
            {/* Timeline dot */}
            <div className="relative z-10 w-4 h-4 bg-orange-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" />

            {/* Content */}
            <div className="flex-1 backdrop-blur-lg bg-white/20 dark:bg-white/5 rounded-xl p-4 border border-orange-200/30 dark:border-white/10 shadow-lg dark:shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-mono font-semibold text-gray-800 dark:text-white">{item.time}</p>
                  <p className="text-gray-600 dark:text-gray-300">{item.activity}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
