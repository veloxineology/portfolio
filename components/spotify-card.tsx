"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Music } from "lucide-react"

interface SpotifyTrack {
  name: string
  artist: string
  album: string
  image: string
  isPlaying: boolean
}

export default function SpotifyCard() {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate Spotify API call
    const fetchCurrentTrack = async () => {
      setIsLoading(true)
      // Mock data - in real implementation, this would call Spotify API
      setTimeout(() => {
        const mockTrack: SpotifyTrack = {
          name: "Blinding Lights",
          artist: "The Weeknd",
          album: "After Hours",
          image: "/placeholder.svg?height=64&width=64",
          isPlaying: Math.random() > 0.5,
        }
        setCurrentTrack(mockTrack)
        setIsLoading(false)
      }, 1000)
    }

    fetchCurrentTrack()
    const interval = setInterval(fetchCurrentTrack, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="backdrop-blur-lg bg-white/20 dark:bg-white/5 rounded-2xl p-4 border border-orange-200/30 dark:border-white/10 shadow-lg dark:shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-2">
        <Music className="text-green-500" size={20} />
        <span className="font-mono font-semibold text-gray-800 dark:text-white">Now Playing</span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse" />
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      ) : currentTrack?.isPlaying ? (
        <div className="flex items-center gap-3">
          <img src={currentTrack.image || "/placeholder.svg"} alt={currentTrack.album} className="w-12 h-12 rounded" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 dark:text-white truncate">{currentTrack.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{currentTrack.artist}</p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            className="w-3 h-3 bg-green-500 rounded-full"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
            <Music size={20} />
          </div>
          <span>Not playing</span>
        </div>
      )}
    </motion.div>
  )
}
