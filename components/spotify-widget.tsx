"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Music, Pause, Play } from "lucide-react"
import { siteData } from "@/lib/site-data"

interface SpotifyTrack {
  name: string
  artist: string
  album: string
  image: string
  isPlaying: boolean
  playlistName?: string
  playlistOwner?: string
}

export default function SpotifyWidget() {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { about } = siteData

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing')
        const data = await response.json()
        setCurrentTrack(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch Spotify data:", error)
        setIsLoading(false)
      }
    }

    fetchCurrentTrack()
    const interval = setInterval(fetchCurrentTrack, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card-minimal spotify-card">
      <div className="flex items-center gap-2 mb-4">
        <Music size={16} className="text-green-500" />
        <h3 className="text-sm font-mono font-bold text-primary">Now Playing</h3>
        <div className="ml-auto">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-muted/20 rounded animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-muted/20 rounded mb-2 animate-pulse"></div>
            <div className="h-3 bg-muted/20 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      ) : currentTrack?.isPlaying ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <div className="relative">
            <img
              src={currentTrack.image || "/placeholder.svg?height=64&width=64"}
              alt={currentTrack.album}
              className="w-16 h-16 rounded-lg shadow-lg"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Play size={10} className="text-white ml-0.5" />
            </motion.div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-mono font-bold text-primary truncate">{currentTrack.name}</p>
            <p className="text-xs font-mono text-secondary truncate">{currentTrack.artist}</p>
            <p className="text-xs font-mono text-muted truncate">{currentTrack.album}</p>
            {currentTrack.playlistName && currentTrack.playlistOwner && (
              <div className="overflow-hidden whitespace-nowrap w-full">
                <span
                  className="text-xs font-mono text-accent truncate mt-1 inline-block playlist-marquee"
                  style={{ maxWidth: '100%' }}
                >
                  <span role="img" aria-label="Playlist">💿</span> Playlist : {currentTrack.playlistName} by {currentTrack.playlistOwner}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center gap-3 text-muted">
          <div className="w-16 h-16 bg-muted/10 rounded-lg flex items-center justify-center">
            <Pause size={20} />
          </div>
          <div>
            <p className="text-sm font-mono">{about.nowPlaying.fallbackMessage}</p>
            <p className="text-xs font-mono text-muted">Spotify</p>
          </div>
        </div>
      )}
    </div>
  )
}

<style jsx global>{`
  .playlist-marquee {
    display: inline-block;
    min-width: 100%;
    animation: marquee 8s linear infinite;
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`}</style>
