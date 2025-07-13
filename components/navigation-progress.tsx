"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function NavigationProgress() {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setIsNavigating(true)
    const timer = setTimeout(() => setIsNavigating(false), 500)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {/* Navigation Progress Bar - Removed scroll animation */}
      {/* Page Transition Progress */}
      {isNavigating && (
        <motion.div
          className="fixed top-0 left-0 h-1 bg-accent z-50"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          exit={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}
    </>
  )
} 