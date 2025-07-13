"use client"

import { ChevronLeft, ChevronRight, ArrowLeft, Search, Filter } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { siteData } from "@/lib/site-data"
import GalleryItem from "@/components/gallery-item"
import Lightbox from "@/components/lightbox"
import FloatingNavbar from "@/components/floating-navbar"

const ITEMS_PER_PAGE = 6

export default function GalleryPage() {
  const { gallery } = siteData
  const [currentPage, setCurrentPage] = useState(1)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 pb-40 main-content-mobile-pb">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-card rounded-lg w-1/3 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-card rounded border border-border mb-3"></div>
                  <div className="h-4 bg-card rounded-lg w-3/4 mb-1"></div>
                  <div className="h-3 bg-card rounded-lg w-full mb-2"></div>
                  <div className="h-3 bg-card rounded-lg w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

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
    <>
      <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 pb-40 main-content-mobile-pb">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl font-mono font-bold text-primary mb-8">// Gallery</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentItems.map((item, index) => {
                const imageSrc = item.image || "/image-not-found.png"
                return (
                  <div
                    key={item.id}
                    className="gallery-card"
                  >
                    <img
                      src={imageSrc}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded border border-border mb-3"
                    />
                    <h3 className="text-sm font-mono font-semibold text-primary mb-1">{item.title}</h3>
                    <p className="text-xs font-mono text-secondary mb-2">{item.description}</p>
                    <span className="text-xs font-mono text-accent">#{item.category}</span>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-secondary font-mono text-sm rounded-lg hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 font-mono text-sm rounded-lg transition-all duration-200 ${
                        currentPage === page
                          ? "bg-accent text-white"
                          : "bg-card border border-border text-secondary hover:bg-accent/10 hover:text-accent hover:border-accent/50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-secondary font-mono text-sm rounded-lg hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <FloatingNavbar />
    </>
  )
}


