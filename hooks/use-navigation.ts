"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export function useNavigation() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [previousPath, setPreviousPath] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (previousPath && previousPath !== pathname) {
      setIsNavigating(true)
      const timer = setTimeout(() => {
        setIsNavigating(false)
      }, 500)
      return () => clearTimeout(timer)
    }
    setPreviousPath(pathname)
  }, [pathname, previousPath])

  const navigateTo = (href: string) => {
    setIsNavigating(true)
    router.push(href)
  }

  return {
    isNavigating,
    navigateTo,
    currentPath: pathname
  }
} 