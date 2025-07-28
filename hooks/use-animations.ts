import { useState, useEffect } from 'react'
import { isBot, prefersReducedMotion, getAnimationVariants, getBotDetails } from '@/lib/utils'

export const useAnimations = () => {
  const [disableAnimations, setDisableAnimations] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [botDetails, setBotDetails] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Get detailed bot information
    const details = getBotDetails()
    setBotDetails(details)
    
    // Check if animations should be disabled
    const shouldDisable = isBot()
    setDisableAnimations(shouldDisable)

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      const newDetails = getBotDetails()
      setBotDetails(newDetails)
      setDisableAnimations(e.matches || isBot())
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const variants = getAnimationVariants()

  return {
    disableAnimations,
    isClient,
    variants,
    botDetails,
    isBot: botDetails?.isBot || false,
    prefersReducedMotion: prefersReducedMotion(),
    botInfo: botDetails?.botInfo || null,
    botCategories: botDetails?.categories || [],
    isSearchEngine: botDetails?.isSearchEngine || false,
    isSocialMedia: botDetails?.isSocialMedia || false,
    isTestingTool: botDetails?.isTestingTool || false
  }
}

// Hook for server-side rendering with user agent
export const useAnimationsWithUserAgent = (userAgent?: string) => {
  const [disableAnimations, setDisableAnimations] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [botDetails, setBotDetails] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Get detailed bot information with user agent
    const details = getBotDetails(userAgent)
    setBotDetails(details)
    
    // Check if animations should be disabled
    const shouldDisable = isBot(userAgent)
    setDisableAnimations(shouldDisable)

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      const newDetails = getBotDetails(userAgent)
      setBotDetails(newDetails)
      setDisableAnimations(e.matches || isBot(userAgent))
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [userAgent])

  const variants = getAnimationVariants(userAgent)

  return {
    disableAnimations,
    isClient,
    variants,
    botDetails,
    isBot: botDetails?.isBot || false,
    prefersReducedMotion: prefersReducedMotion(),
    botInfo: botDetails?.botInfo || null,
    botCategories: botDetails?.categories || [],
    isSearchEngine: botDetails?.isSearchEngine || false,
    isSocialMedia: botDetails?.isSocialMedia || false,
    isTestingTool: botDetails?.isTestingTool || false
  }
}

// Hook for getting detailed bot information
export const useBotDetection = (userAgent?: string) => {
  const [botDetails, setBotDetails] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const details = getBotDetails(userAgent)
    setBotDetails(details)
  }, [userAgent])

  return {
    isClient,
    ...botDetails,
    botDetails
  }
} 