"use client"

import { motion } from "framer-motion"
import { Calendar, Github, Linkedin, Mail, MapPin, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { siteData } from "@/lib/site-data"

export default function HeroSection() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { hero } = siteData

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="flex-1 ml-80 relative">
      {/* Digital Clock */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 right-8 z-10"
      >
        <div className="glass-card px-4 py-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-400" />
          <span className="font-mono text-sm text-white">{formatTime(currentTime)}</span>
          <span className="text-xs text-gray-400">PST</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-12">
        <div className="max-w-2xl w-full">
          {/* Schedule Call Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <button className="btn-gradient flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium">
              <Calendar className="w-4 h-4" />
              Schedule a call
            </button>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-lg opacity-30"></div>
              <img
                src={hero.profileImage || "/placeholder.svg?height=128&width=128"}
                alt="Kaushik"
                className="relative w-full h-full rounded-full object-cover border-4 border-white/10 shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-dark-primary flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>

          {/* Name and Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {hero.name}
            </h1>
            <p className="text-xl text-orange-400 font-medium mb-4">{hero.role}</p>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{hero.location}</span>
              <span className="text-xs">•</span>
              <span className="text-sm">{hero.timezone}</span>
            </div>
          </motion.div>

          {/* Language Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center gap-2 mb-8"
          >
            {hero.languages.map((language, index) => (
              <motion.span
                key={language}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="pill-badge"
              >
                {language}
              </motion.span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-10"
          >
            <p className="text-gray-300 leading-relaxed text-center max-w-lg mx-auto">{hero.bio}</p>
          </motion.div>

          {/* Social/Contact Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center gap-4"
          >
            <motion.a
              href={hero.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </motion.a>

            <motion.a
              href={hero.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href={`mailto:${hero.social.email}`}
              className="social-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/5 to-purple-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
    </div>
  )
}
