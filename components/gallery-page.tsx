"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { siteData } from "@/lib/site-data"

const ITEMS_PER_PAGE = 6

export default function GalleryPage() {
  const { gallery } = siteData
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(gallery.items.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = gallery.items.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 main-content-mobile-pb">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-mono font-bold text-primary mb-8">// Gallery</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="gallery-card"
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 0 12px rgba(0, 255, 150, 0.3)",
                }}
              >
                <img
                  src={item.image || "/placeholder.svg?height=250&width=300"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded border border-border mb-3"
                />
                <h3 className="text-sm font-mono font-semibold text-primary mb-1">{item.title}</h3>
                <p className="text-xs font-mono text-secondary mb-2">{item.description}</p>
                <span className="text-xs font-mono text-accent">#{item.category}</span>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-secondary font-mono text-sm rounded-lg hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: currentPage === 1 ? 1 : 1.02 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.98 }}
              >
                <ChevronLeft size={14} />
                Previous
              </motion.button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 font-mono text-sm rounded-lg transition-all duration-200 ${
                      currentPage === page
                        ? "bg-accent text-white"
                        : "bg-card border border-border text-secondary hover:bg-accent/10 hover:text-accent hover:border-accent/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-secondary font-mono text-sm rounded-lg hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.02 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.98 }}
              >
                Next
                <ChevronRight size={14} />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
