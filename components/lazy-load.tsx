"use client"

import { useEffect, useRef, useState } from 'react'
import { createIntersectionObserver } from '@/lib/performance'

interface LazyLoadProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
  fallback?: React.ReactNode
  className?: string
}

export default function LazyLoad({ 
  children, 
  threshold = 0.1, 
  rootMargin = '50px',
  fallback = <div className="animate-pulse bg-gray-200 rounded" />,
  className = ""
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = createIntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure smooth loading
      const timer = setTimeout(() => setIsLoaded(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <div ref={ref} className={className}>
      {isLoaded ? children : fallback}
    </div>
  )
}

// Lazy load images specifically
interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
}

export function LazyImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23f3f4f6'/%3E%3C/svg%3E"
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = createIntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ backgroundImage: `url(${placeholder})` }}
        />
      )}
    </div>
  )
}

// Lazy load components with dynamic imports
interface LazyComponentProps {
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
  fallback?: React.ReactNode
  props?: Record<string, any>
}

export function LazyComponent({ 
  importFunc, 
  fallback = <div className="animate-pulse bg-gray-200 rounded h-32" />,
  props = {}
}: LazyComponentProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    importFunc()
      .then((module) => {
        setComponent(() => module.default)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load component:', error)
        setIsLoading(false)
      })
  }, [importFunc])

  if (isLoading) return <>{fallback}</>
  if (!Component) return <div>Failed to load component</div>

  return <Component {...props} />
} 