"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { useAnimations } from "@/hooks/use-animations"
import { ReactNode } from "react"

interface AnimationWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  variant?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "stagger" | "scale"
  delay?: number
  className?: string
}

export default function AnimationWrapper({ 
  children, 
  variant = "fadeIn", 
  delay = 0,
  className = "",
  ...props 
}: AnimationWrapperProps) {
  const { disableAnimations, variants } = useAnimations()

  if (disableAnimations) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  const animationVariant = variants[variant]
  const finalDelay = (animationVariant.transition as any).delay || delay

  return (
    <motion.div
      className={className}
      initial={animationVariant.initial}
      animate={animationVariant.animate}
      transition={{
        ...animationVariant.transition,
        delay: finalDelay
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Specialized animation components
export const FadeIn = ({ children, delay = 0, className = "", ...props }: Omit<AnimationWrapperProps, "variant">) => (
  <AnimationWrapper variant="fadeIn" delay={delay} className={className} {...props}>
    {children}
  </AnimationWrapper>
)

export const FadeInUp = ({ children, delay = 0, className = "", ...props }: Omit<AnimationWrapperProps, "variant">) => (
  <AnimationWrapper variant="fadeInUp" delay={delay} className={className} {...props}>
    {children}
  </AnimationWrapper>
)

export const FadeInLeft = ({ children, delay = 0, className = "", ...props }: Omit<AnimationWrapperProps, "variant">) => (
  <AnimationWrapper variant="fadeInLeft" delay={delay} className={className} {...props}>
    {children}
  </AnimationWrapper>
)

export const Stagger = ({ children, delay = 0, className = "", ...props }: Omit<AnimationWrapperProps, "variant">) => (
  <AnimationWrapper variant="stagger" delay={delay} className={className} {...props}>
    {children}
  </AnimationWrapper>
)

export const Scale = ({ children, delay = 0, className = "", ...props }: Omit<AnimationWrapperProps, "variant">) => (
  <AnimationWrapper variant="scale" delay={delay} className={className} {...props}>
    {children}
  </AnimationWrapper>
) 