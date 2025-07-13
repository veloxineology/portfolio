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

  // Example images for Masonry (filled grid)
  const items = [
    { id: "1", img: "https://picsum.photos/200/250?random=1", url: "https://picsum.photos/200/250?random=1", height: 250 },
    { id: "2", img: "https://picsum.photos/200/300?random=2", url: "https://picsum.photos/200/300?random=2", height: 300 },
    { id: "3", img: "https://picsum.photos/200/350?random=3", url: "https://picsum.photos/200/350?random=3", height: 350 },
    { id: "4", img: "https://picsum.photos/200/400?random=4", url: "https://picsum.photos/200/400?random=4", height: 400 },
    { id: "5", img: "https://picsum.photos/200/450?random=5", url: "https://picsum.photos/200/450?random=5", height: 450 },
    { id: "6", img: "https://picsum.photos/200/500?random=6", url: "https://picsum.photos/200/500?random=6", height: 500 },
    { id: "7", img: "https://picsum.photos/200/275?random=7", url: "https://picsum.photos/200/275?random=7", height: 275 },
    { id: "8", img: "https://picsum.photos/200/325?random=8", url: "https://picsum.photos/200/325?random=8", height: 325 },
    { id: "9", img: "https://picsum.photos/200/375?random=9", url: "https://picsum.photos/200/375?random=9", height: 375 },
    { id: "10", img: "https://picsum.photos/200/425?random=10", url: "https://picsum.photos/200/425?random=10", height: 425 },
    { id: "11", img: "https://picsum.photos/200/475?random=11", url: "https://picsum.photos/200/475?random=11", height: 475 },
    { id: "12", img: "https://picsum.photos/200/525?random=12", url: "https://picsum.photos/200/525?random=12", height: 525 },
    { id: "13", img: "https://picsum.photos/200/260?random=13", url: "https://picsum.photos/200/260?random=13", height: 260 },
    { id: "14", img: "https://picsum.photos/200/310?random=14", url: "https://picsum.photos/200/310?random=14", height: 310 },
    { id: "15", img: "https://picsum.photos/200/360?random=15", url: "https://picsum.photos/200/360?random=15", height: 360 },
    { id: "16", img: "https://picsum.photos/200/410?random=16", url: "https://picsum.photos/200/410?random=16", height: 410 },
    { id: "17", img: "https://picsum.photos/200/460?random=17", url: "https://picsum.photos/200/460?random=17", height: 460 },
    { id: "18", img: "https://picsum.photos/200/510?random=18", url: "https://picsum.photos/200/510?random=18", height: 510 },
    { id: "19", img: "https://picsum.photos/200/285?random=19", url: "https://picsum.photos/200/285?random=19", height: 285 },
    { id: "20", img: "https://picsum.photos/200/335?random=20", url: "https://picsum.photos/200/335?random=20", height: 335 },
    { id: "21", img: "https://picsum.photos/200/385?random=21", url: "https://picsum.photos/200/385?random=21", height: 385 },
    { id: "22", img: "https://picsum.photos/200/435?random=22", url: "https://picsum.photos/200/435?random=22", height: 435 },
    { id: "23", img: "https://picsum.photos/200/485?random=23", url: "https://picsum.photos/200/485?random=23", height: 485 },
    { id: "24", img: "https://picsum.photos/200/535?random=24", url: "https://picsum.photos/200/535?random=24", height: 535 },
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
              gap={16}
            />
          </div>
        </div>
      </div>
      <FloatingDock />
    </>
  )
}


