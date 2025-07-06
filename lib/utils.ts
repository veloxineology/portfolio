import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { isBot as isBotFromJson, getBotInfo, getBotCategory, isSearchEngineBot, isSocialMediaBot, isTestingTool } from "./bot-detection"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Enhanced bot detection using JSON data
export const isBot = (userAgent?: string): boolean => {
  return isBotFromJson(userAgent)
}

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Check if animations should be disabled
export const shouldDisableAnimations = (userAgent?: string): boolean => {
  return isBot(userAgent) || prefersReducedMotion()
}

// Get detailed bot information
export const getBotDetails = (userAgent?: string) => {
  const botInfo = getBotInfo(userAgent)
  const categories = getBotCategory(userAgent)
  
  return {
    isBot: isBot(userAgent),
    botInfo,
    categories,
    isSearchEngine: isSearchEngineBot(userAgent),
    isSocialMedia: isSocialMediaBot(userAgent),
    isTestingTool: isTestingTool(userAgent),
    userAgent: userAgent || (typeof window !== 'undefined' ? navigator.userAgent : undefined)
  }
}

// Get animation variants that respect user preferences
export const getAnimationVariants = (userAgent?: string) => {
  const disableAnimations = shouldDisableAnimations(userAgent)
  
  return {
    fadeIn: {
      initial: disableAnimations ? { opacity: 1 } : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: disableAnimations ? { duration: 0 } : { duration: 0.5 }
    },
    fadeInUp: {
      initial: disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: disableAnimations ? { duration: 0 } : { duration: 0.5 }
    },
    fadeInLeft: {
      initial: disableAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: disableAnimations ? { duration: 0 } : { duration: 0.5 }
    },
    stagger: {
      initial: disableAnimations ? { opacity: 1 } : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: disableAnimations ? { duration: 0 } : { duration: 0.5, delay: 0.1 }
    },
    scale: {
      initial: disableAnimations ? { scale: 1 } : { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: disableAnimations ? { duration: 0 } : { duration: 0.3 }
    }
  }
}
