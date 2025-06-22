import type React from "react"
// Type definitions for dotlottie-player web component
declare namespace JSX {
  interface IntrinsicElements {
    "dotlottie-player": {
      src: string
      background?: string
      speed?: string
      style?: React.CSSProperties
      loop?: boolean
      autoplay?: boolean
    }
  }
}
