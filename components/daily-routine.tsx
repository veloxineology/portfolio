"use client"

import { motion } from "framer-motion"

interface RoutineItem {
  time: string
  activity: string
  emoji: string
}

interface DailyRoutineProps {
  routine: RoutineItem[]
}

export default function DailyRoutine({ routine }: DailyRoutineProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {routine.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card-minimal text-center"
        >
          <div className="text-2xl mb-2">{item.emoji}</div>
          <div className="text-sm font-mono font-bold text-accent mb-1">{item.time}</div>
          <div className="text-xs font-mono text-secondary">{item.activity}</div>
        </motion.div>
      ))}
    </div>
  )
}
