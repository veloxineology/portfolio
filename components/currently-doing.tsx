"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { siteData } from "@/lib/site-data"

export default function CurrentlyDoing() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentActivity, setCurrentActivity] = useState<{
    time: string
    activity: string
    emoji: string
  } | null>(null)

  const { about } = siteData

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)

      // Get current day of week
      const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
      const currentDay = days[now.getDay()] as keyof typeof about.weeklyRoutine
      const todayRoutine = about.weeklyRoutine[currentDay]

      // Find current activity based on time
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      let latestActivity = todayRoutine[0];
      for (const item of todayRoutine) {
        const [h, m] = item.time.split(":").map(Number);
        const itemMinutes = h * 60 + (m || 0);
        if (itemMinutes <= nowMinutes) {
          latestActivity = item;
        } else {
          break;
        }
      }
      setCurrentActivity(latestActivity);
    }, 1000)

    return () => clearInterval(timer)
  }, [about.weeklyRoutine])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" })
  }

  return (
    <div className="card-minimal">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={14} className="text-accent" />
        <h3 className="text-sm font-bold text-accent">Currently Doing</h3>
      </div>

      <div className="space-y-3">
        {/* Current Time & Day */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">{getDayName(currentTime)}</span>
          <span className="text-sm font-bold text-primary">{formatTime(currentTime)}</span>
        </div>

        {/* Current Activity */}
        {currentActivity && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20"
          >
            <span className="text-xl">{currentActivity.emoji}</span>
            <div>
              <p className="text-xs font-bold text-accent">{currentActivity.time}</p>
              <p className="text-xs text-secondary">{currentActivity.activity}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
