"use client"

import { useEffect } from "react"

export default function LoadingScreen() {
  useEffect(() => {
    // Load the dotlottie player script
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
    script.type = "module"
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-dark-bg flex items-center justify-center z-50">
      <div className="text-center">
        {/* Large Lottie Animation */}
        <div className="flex justify-center items-center">
          <dotlottie-player
            src="https://lottie.host/10d4a931-f0cd-4d13-a1e4-7f92ad5d1c01/iDXQGQri75.lottie"
            background="transparent"
            speed="1"
            style={{
              width: "500px",
              height: "500px",
              margin: "0 auto",
            }}
            loop
            autoplay
          />
        </div>
        {/* Loading Text */}
        <div className="mt-8 text-2xl font-bold text-black dark:text-white transition-colors duration-300">
          Loading...
        </div>
      </div>
    </div>
  )
}
