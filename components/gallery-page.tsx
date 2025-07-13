"use client"

import { useState, useEffect } from "react"
import { siteData } from "@/lib/site-data"
import Masonry from "@/components/Masonry"
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

  // Example images for Masonry
  const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
    // ... more items
  ];

  return (
    <>
      <div className="min-h-screen py-8 pb-32 main-content-mobile-pb">
        <div className="px-8 md:px-16 lg:px-24">
          <h1 className="text-3xl font-bold text-primary mb-8">// Gallery</h1>
          <div className="w-full h-full">
            <Masonry
              items={items}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          </div>
        </div>
      </div>
      <FloatingDock />
    </>
  )
}


