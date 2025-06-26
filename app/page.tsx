"use client"
import { useState } from "react"
import HomePage from "@/components/home-page"
import WorkPage from "@/components/work-page"
import BlogPage from "@/components/blog-page"
import GalleryPage from "@/components/gallery-page"
import FloatingNavbar from "@/components/floating-navbar"
import React from "react"

export default function Page() {
  const [activeSection, setActiveSection] = useState("home")

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomePage key="home" />
      case "work":
        return <WorkPage key="work" />
      case "blog":
        return <BlogPage key="blog" />
      case "gallery":
        return <GalleryPage key="gallery" />
      default:
        return <HomePage key="home" />
    }
  }

  return (
    <div className="min-h-screen">
      <FloatingNavbar onSectionChange={setActiveSection} activeSection={activeSection} />
      <div className="w-full">
        {renderSection()}
      </div>
    </div>
  )
}
