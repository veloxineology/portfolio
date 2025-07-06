import { useEffect, useRef, useCallback, useState } from 'react'
import { debounce, throttle, createIntersectionObserver } from '@/lib/performance'

// Hook for debounced functions
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  return useCallback(debounce(callback, delay), [callback, delay]) as T
}

// Hook for throttled functions
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): T {
  return useCallback(throttle(callback, limit), [callback, limit]) as T
}

// Hook for intersection observer
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = createIntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      options
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options, hasIntersected])

  return { ref, isIntersecting, hasIntersected }
}

// Hook for performance monitoring
export function usePerformanceMonitor(name: string) {
  const startTime = useRef<number>(0)
  const [duration, setDuration] = useState<number>(0)

  const start = useCallback(() => {
    startTime.current = performance.now()
  }, [])

  const end = useCallback(() => {
    if (startTime.current > 0) {
      const endTime = performance.now()
      const duration = endTime - startTime.current
      setDuration(duration)
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${name} took ${duration.toFixed(2)}ms`)
      }
    }
  }, [name])

  return { start, end, duration }
}

// Hook for memory management
export function useCleanup() {
  const cleanupFunctions = useRef<(() => void)[]>([])

  const addCleanup = useCallback((fn: () => void) => {
    cleanupFunctions.current.push(fn)
  }, [])

  const executeCleanup = useCallback(() => {
    cleanupFunctions.current.forEach(fn => fn())
    cleanupFunctions.current = []
  }, [])

  useEffect(() => {
    return executeCleanup
  }, [executeCleanup])

  return { addCleanup, executeCleanup }
}

// Hook for lazy loading
export function useLazyLoad<T>(
  loadFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const hasLoaded = useRef(false)

  const load = useCallback(async () => {
    if (hasLoaded.current) return

    setLoading(true)
    setError(null)

    try {
      const result = await loadFunction()
      setData(result)
      hasLoaded.current = true
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [loadFunction])

  useEffect(() => {
    load()
  }, [load, ...dependencies])

  return { data, loading, error, reload: load }
}

// Hook for viewport size with debouncing
export function useViewportSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 100)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// Hook for scroll position with throttling
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollX, setScrollX] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = throttle(() => {
      setScrollY(window.scrollY)
      setScrollX(window.scrollX)
    }, 16) // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, scrollX }
}

// Hook for device capabilities
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    supportsTouch: false,
    supportsHover: false,
    prefersReducedMotion: false,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateCapabilities = () => {
      const width = window.innerWidth
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024

      setCapabilities({
        isMobile,
        isTablet,
        isDesktop,
        supportsTouch: 'ontouchstart' in window,
        supportsHover: window.matchMedia('(hover: hover)').matches,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      })
    }

    updateCapabilities()
    window.addEventListener('resize', updateCapabilities)
    return () => window.removeEventListener('resize', updateCapabilities)
  }, [])

  return capabilities
}

// Hook for network status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
} 