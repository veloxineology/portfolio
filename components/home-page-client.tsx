"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Mail, Camera, MessageCircle } from "lucide-react"
import Image from "next/image"
import SpotifyWidget from "@/components/spotify-widget"
import CurrentlyDoing from "@/components/currently-doing"
import FloatingDock from "@/components/floating-navbar"
import WorkPage from "@/components/work-page"
import BlogPage from "@/components/blog-page"
import GalleryPage from "@/components/gallery-page"

interface HomePageClientProps {
  home: any
  about: any
}

export default function HomePageClient({ home, about }: HomePageClientProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Hide server-rendered content when client component loads
    const serverContent = document.getElementById('server-content')
    if (serverContent) {
      serverContent.style.display = 'none'
    }
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeContent home={home} about={about} />
      case "work":
        return <WorkPage key="work" />
      case "blog":
        return <BlogPage key="blog" />
      case "gallery":
        return <GalleryPage key="gallery" />
      default:
        return <HomeContent home={home} about={about} />
    }
  }

  if (!isClient) {
    return null // Don't render anything until client-side hydration
  }

  return (
    <>
      <FloatingDock />
      <div className="w-full">
        {renderSection()}
      </div>
    </>
  )
}

function HomeContent({ home, about }: { home: any; about: any }) {
  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Hero Section - Full enhanced content */}
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {/* Left: Profile & Intro */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-start gap-6">
                {/* Profile Photo */}
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-lg overflow-hidden font-mono">
                    <Image
                      src={about.profileImage || "/image-not-found.png"}
                      width={120}
                      height={120}
                      alt="Kaushik"
                      className="w-full h-full object-cover"
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 text-2xl">{about.signatureEmoji}</div>
                </div>

                {/* Name & Intro - Critical LCP content */}
                <div className="flex-1 h-24 flex flex-col justify-center">
                  <div className="mb-1">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight font-sans">{home.name}</h1>
                    <div className="flex items-baseline gap-3 mt-1">
                      <p className="text-xl md:text-2xl font-medium text-accent font-sans">{home.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Description - This is the LCP element */}
              <div className="max-w-2xl">
                <p className="font-mono text-sm text-secondary leading-relaxed">{home.description}</p>
              </div>

              {/* Enhanced Social Links - Left Aligned */}
              <div className="flex flex-col gap-3 max-w-lg">
                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href={home.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center justify-center gap-3 px-6 py-3 group hover:bg-purple-500 hover:text-white hover:border-purple-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} className="flex-shrink-0" />
                    <span className="font-medium">GitHub</span>
                  </motion.a>

                  <motion.a
                    href={home.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center justify-center gap-3 px-6 py-3 group hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-pink-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera size={18} className="flex-shrink-0" />
                    <span className="font-medium">Instagram</span>
                  </motion.a>

                  <motion.a
                    href={home.social.snapchat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center justify-center gap-3 px-6 py-3 group hover:bg-yellow-400 hover:text-black hover:border-yellow-400"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={18} className="flex-shrink-0" />
                    <span className="font-medium">Snapchat</span>
                  </motion.a>

                  <motion.a
                    href={`mailto:${home.social.email}`}
                    className="btn-secondary flex items-center justify-center gap-3 px-6 py-3 group hover:bg-blue-500 hover:text-white hover:border-blue-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={18} className="flex-shrink-0" />
                    <span className="font-medium">Email</span>
                  </motion.a>
                </div>
              </div>

              {/* Languages/Skills Tags */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-accent">Languages I Speak & Code</h3>
                <div className="flex flex-wrap gap-2">
                  {home.languages.map((language: any, index: number) => {
                    const getLanguageStyle = (lang: { name: string; type: string }) => {
                      if (lang.type === "spoken") {
                        const colors = [
                          "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
                          "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
                          "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
                          "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700",
                          "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700",
                        ]
                        return colors[index % colors.length]
                      } else {
                        const codeColors = [
                          "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
                          "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
                          "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
                          "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700",
                          "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700",
                          "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
                          "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700",
                        ]
                        return codeColors[index % codeColors.length]
                      }
                    }

                    return (
                      <motion.span
                        key={language.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 hover:scale-105 ${getLanguageStyle(language)}`}
                      >
                        {language.name}
                      </motion.span>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right: Spotify & Currently Doing */}
            <div className="space-y-6">
              <SpotifyWidget />
              <CurrentlyDoing />
            </div>
          </div>

          {/* Content Grid with Emojis */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Music Preferences */}
            <div className="card-minimal">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🎵</span>
                <h3 className="text-sm font-bold text-accent">Favorite Genres</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {about.favoriteGenres.map((genre: string) => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/20"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Songs */}
            <div className="card-minimal">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🎧</span>
                <h3 className="text-sm font-bold text-accent">Top 5 Songs</h3>
              </div>
              <ul className="space-y-2">
                {about.topSongs.slice(0, 5).map((song: string, index: number) => (
                  <li key={song} className="text-xs text-secondary flex items-start gap-2">
                    <span className="text-accent font-bold flex-shrink-0">{index + 1}.</span>
                    <span className="leading-relaxed">{song}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Favorite Movies */}
            <div className="card-minimal">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🎬</span>
                <h3 className="text-sm font-bold text-accent">Favorite Movies</h3>
              </div>
              <ul className="space-y-1">
                {about.favoriteMovies.slice(0, 5).map((movie: string) => (
                  <li key={movie} className="text-xs text-secondary">
                    • {movie}
                  </li>
                ))}
              </ul>
            </div>

            {/* Favorite Books */}
            <div className="card-minimal">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">📚</span>
                <h3 className="text-sm font-bold text-accent">Favorite Books</h3>
              </div>
              <ul className="space-y-1">
                {about.favoriteBooks.slice(0, 4).map((book: string) => (
                  <li key={book} className="text-xs text-secondary">
                    • {book}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quotes & Daily Quote */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Things I Say */}
            <div className="card-minimal">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">💬</span>
                <h3 className="text-sm font-bold text-accent">Things I Say</h3>
              </div>
              <ul className="space-y-2">
                {about.quotesYouSay.slice(0, 4).map((quote: string, index: number) => (
                  <li key={index} className="text-xs text-secondary italic">
                    "{quote}"
                  </li>
                ))}
              </ul>
            </div>

            {/* Daily Quote */}
            <div className="card-minimal">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">✨</span>
                <h3 className="text-sm font-bold text-accent">Quote of the Day</h3>
              </div>
              <p className="text-xs text-secondary italic leading-relaxed">"{about.dailyQuote}"</p>
            </div>
          </div>

          {/* Fun Facts Section */}
          <div className="card-minimal">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🎯</span>
              <h3 className="text-lg font-bold text-accent">Fun Facts About Me</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {about.funFacts.map((fact: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-accent/5 rounded-lg border border-accent/20"
                >
                  <p className="text-xs text-secondary">• {fact}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 