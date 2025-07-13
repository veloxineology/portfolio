"use client"

import { useState, useEffect } from "react"
import { siteData } from "@/lib/site-data"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import FloatingDock from "@/components/floating-navbar"

const DummyContent = ({ item }: { item: any }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {item.title}
        </span>{" "}
        {item.description}
      </p>
      <img
        src={item.image}
        alt={item.title}
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-lg"
      />
    </div>
  );
};

export default function GalleryPage() {
  const { gallery } = siteData
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen px-8 md:px-16 lg:px-24 py-8 pb-32 main-content-mobile-pb">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-card rounded-lg w-1/3 mb-8"></div>
            <div className="flex gap-6 overflow-x-auto py-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-[600px] w-full max-w-4xl bg-card rounded-3xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Transform gallery items to carousel format
  const carouselData = gallery.items.map((item) => ({
    category: item.category,
    title: item.title,
    src: item.image || "/image-not-found.png",
    content: <DummyContent item={item} />,
  }));

  const cards = carouselData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <>
      <div className="min-h-screen px-8 md:px-16 lg:px-24 py-8 pb-32 main-content-mobile-pb">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8">// Gallery</h2>
          <div className="w-full h-full py-8">
            <Carousel items={cards} />
          </div>
        </div>
      </div>
      <FloatingDock />
    </>
  )
}


