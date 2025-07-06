// Performance utilities for better app performance

// Debounce function for expensive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for rate limiting
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  })
}

// Preload critical resources
export function preloadResource(href: string, as: string = 'fetch'): void {
  if (typeof window === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  document.head.appendChild(link)
}

// Prefetch non-critical resources
export function prefetchResource(href: string): void {
  if (typeof window === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  document.head.appendChild(link)
}

// Memory-efficient event listener
export function addEventListenerWithCleanup(
  element: EventTarget,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): () => void {
  element.addEventListener(event, handler, options)
  return () => element.removeEventListener(event, handler, options)
}

// Batch DOM updates
export function batchDOMUpdates(updates: (() => void)[]): void {
  if (typeof window === 'undefined') {
    updates.forEach(update => update())
    return
  }

  // Use requestAnimationFrame for smooth updates
  requestAnimationFrame(() => {
    updates.forEach(update => update())
  })
}

// Optimize images
export function optimizeImage(src: string, width: number, quality: number = 75): string {
  // Add image optimization parameters
  const url = new URL(src, window.location.origin)
  url.searchParams.set('w', width.toString())
  url.searchParams.set('q', quality.toString())
  url.searchParams.set('f', 'webp')
  return url.toString()
}

// Cache management
export class SimpleCache<T> {
  private cache = new Map<string, { data: T; timestamp: number }>()
  private maxAge: number

  constructor(maxAge: number = 5 * 60 * 1000) { // 5 minutes default
    this.maxAge = maxAge
  }

  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  get(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear(): void {
    this.cache.clear()
  }
}

// Performance monitoring
export function measurePerformance<T>(name: string, fn: () => T): T {
  if (typeof window === 'undefined') return fn()

  const start = performance.now()
  const result = fn()
  const end = performance.now()
  
  console.log(`${name} took ${end - start}ms`)
  return result
}

// Async performance measurement
export async function measureAsyncPerformance<T>(
  name: string, 
  fn: () => Promise<T>
): Promise<T> {
  if (typeof window === 'undefined') return fn()

  const start = performance.now()
  const result = await fn()
  const end = performance.now()
  
  console.log(`${name} took ${end - start}ms`)
  return result
}

// Resource hints for better loading
export function addResourceHints(): void {
  if (typeof window === 'undefined') return

  // Preconnect to external domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://api.spotify.com'
  ]

  domains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    document.head.appendChild(link)
  })
}

// Optimize animations
export function optimizeAnimations(): void {
  if (typeof window === 'undefined') return

  // Reduce motion if user prefers it
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms')
  }
}

// Memory leak prevention
export function createCleanupFunction(): () => void {
  const cleanupFunctions: (() => void)[] = []
  
  return {
    add: (fn: () => void) => cleanupFunctions.push(fn),
    execute: () => {
      cleanupFunctions.forEach(fn => fn())
      cleanupFunctions.length = 0
    }
  } as any
} 