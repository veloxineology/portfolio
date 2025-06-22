"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface LightboxProps {
  image: {
    id: string
    src: string
    caption: string
    category: string
  }
  onClose: () => void
}

export default function Lightbox({ image, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Image */}
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.caption}
            className="w-full h-auto max-h-[70vh] object-contain"
          />

          {/* Caption */}
          <div className="p-6 text-white">
            <h3 className="font-mono font-bold text-lg mb-2">{image.caption}</h3>
            <span className="px-3 py-1 bg-orange-500/80 text-white text-sm rounded-full">{image.category}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
