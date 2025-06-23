"use client"

import { motion } from "framer-motion"
import { MapPin, Quote, Heart } from "lucide-react"
import { siteData } from "@/lib/site-data"
import SpotifyWidget from "@/components/spotify-widget"
import DailyRoutine from "@/components/daily-routine"

export default function AboutPage() {
  const { about } = siteData

  if (!about.visible) return null

  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 main-content-mobile-pb">
      <div className="max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-mono font-bold text-primary mb-8">// About Me</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Section */}
              <div className="card-minimal">
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <img
                      src={about.profileImage || "/placeholder.svg?height=120&width=120"}
                      alt="Kaushik"
                      className="w-24 h-24 rounded-full border-2 border-accent"
                    />
                    <div className="absolute -bottom-1 -right-1 text-2xl">{about.signatureEmoji}</div>
                  </div>
                  <div>
                    <h2 className="text-xl font-mono font-bold text-primary mb-2">{about.introLine}</h2>
                    <div className="flex items-center gap-2 text-muted font-mono text-sm mb-4">
                      <MapPin size={14} />
                      <span>{about.location}</span>
                    </div>
                  </div>
                </div>
                <p className="font-mono text-sm text-secondary leading-relaxed">{about.longBio}</p>
              </div>

              {/* Skills Grid */}
              <div>
                <h2 className="text-xl font-mono font-bold text-primary mb-6">Technical Skills</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {about.skills.map((skill) => (
                    <div key={skill.category} className="card-minimal">
                      <h3 className="text-sm font-mono font-bold text-accent mb-3">{skill.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-1 bg-accent/10 text-accent text-xs font-mono rounded border border-accent/20"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entertainment Preferences */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-minimal">
                  <h3 className="text-sm font-mono font-bold text-accent mb-3">Favorite Movies</h3>
                  <ul className="space-y-1">
                    {about.favoriteMovies.map((movie) => (
                      <li key={movie} className="text-xs font-mono text-secondary">
                        • {movie}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-minimal">
                  <h3 className="text-sm font-mono font-bold text-accent mb-3">To Watch List</h3>
                  <ul className="space-y-1">
                    {about.toWatchList.map((item) => (
                      <li key={item} className="text-xs font-mono text-secondary">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-minimal">
                  <h3 className="text-sm font-mono font-bold text-accent mb-3">Favorite Books</h3>
                  <ul className="space-y-1">
                    {about.favoriteBooks.map((book) => (
                      <li key={book} className="text-xs font-mono text-secondary">
                        • {book}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-minimal">
                  <h3 className="text-sm font-mono font-bold text-accent mb-3">Music Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {about.favoriteGenres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs font-mono rounded border border-accent/20"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Songs */}
              <div className="card-minimal">
                <h3 className="text-sm font-mono font-bold text-accent mb-3">Top 5 Songs</h3>
                <ul className="space-y-2">
                  {about.topSongs.map((song, index) => (
                    <li key={song} className="text-xs font-mono text-secondary flex items-center gap-2">
                      <span className="text-accent font-bold">{index + 1}.</span>
                      {song}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Spotify Widget */}
              <SpotifyWidget />

              {/* Daily Quote */}
              <div className="card-minimal">
                <div className="flex items-center gap-2 mb-3">
                  <Quote size={14} className="text-accent" />
                  <h3 className="text-sm font-mono font-bold text-accent">Quote of the Day</h3>
                </div>
                <p className="text-xs font-mono text-secondary italic leading-relaxed">"{about.dailyQuote}"</p>
              </div>

              {/* Fun Facts */}
              <div className="card-minimal">
                <h3 className="text-sm font-mono font-bold text-accent mb-3">Fun Facts</h3>
                <ul className="space-y-2">
                  {about.funFacts.map((fact, index) => (
                    <li key={index} className="text-xs font-mono text-secondary">
                      • {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quotes I Say */}
              <div className="card-minimal">
                <div className="flex items-center gap-2 mb-3">
                  <Heart size={14} className="text-accent" />
                  <h3 className="text-sm font-mono font-bold text-accent">Things I Say</h3>
                </div>
                <ul className="space-y-2">
                  {about.quotesYouSay.map((quote, index) => (
                    <li key={index} className="text-xs font-mono text-secondary italic">
                      "{quote}"
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Daily Routine */}
          <div className="mt-12">
            <h2 className="text-xl font-mono font-bold text-primary mb-6">Daily Routine</h2>
            <DailyRoutine routine={about.dailyRoutine} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
