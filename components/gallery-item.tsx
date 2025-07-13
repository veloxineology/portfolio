"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  caption: string
  category: string
}

interface GalleryItemProps {
  image: GalleryImage
  index: number
  isFavorite: boolean
  onToggleFavorite: () => void
  onOpenLightbox: () => void
}

export default function GalleryItem({ image, index, isFavorite, onToggleFavorite, onOpenLightbox }: GalleryItemProps) {
  const imageSrc = image.src || "/image-not-found.png"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="break-inside-avoid mb-6 group cursor-pointer"
      onClick={onOpenLightbox}
    >
      <div className="relative backdrop-blur-lg bg-white/20 dark:bg-white/5 rounded-2xl border border-orange-200/30 dark:border-white/10 shadow-lg dark:shadow-2xl overflow-hidden">
        <img
          src={imageSrc}
          alt={image.caption}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
          <div className="p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-sm mb-2">{image.caption}</p>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-orange-500/80 text-white text-xs rounded-full">{image.category}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite()
                }}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <Star size={16} className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-white"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
