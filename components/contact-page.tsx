"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Github, Instagram, Mail, Send } from "lucide-react"
import { siteData } from "@/lib/site-data"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { contact } = siteData

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Reset form after animation
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen py-20 px-6 main-content-mobile-pb">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">Contact Me</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">I'd love to hear from you!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="backdrop-blur-lg bg-white/20 dark:bg-white/5 rounded-2xl p-8 border border-orange-200/30 dark:border-white/10 shadow-lg dark:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{contact.description}</p>

              {/* Social Links */}
              <div className="space-y-4">
                <motion.a
                  href={contact.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/30 dark:bg-white/10 hover:bg-white/40 dark:hover:bg-white/20 transition-colors group"
                  whileHover={{ x: 10 }}
                >
                  <Github
                    className="text-gray-700 dark:text-white group-hover:text-orange-500 transition-colors"
                    size={24}
                  />
                  <span className="font-mono text-gray-700 dark:text-white">GitHub</span>
                </motion.a>

                <motion.a
                  href={contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/30 dark:bg-white/10 hover:bg-white/40 dark:hover:bg-white/20 transition-colors group"
                  whileHover={{ x: 10 }}
                >
                  <Instagram
                    className="text-gray-700 dark:text-white group-hover:text-orange-500 transition-colors"
                    size={24}
                  />
                  <span className="font-mono text-gray-700 dark:text-white"></span>
                </motion.a>

                <motion.a
                  href={`mailto:${contact.social.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/30 dark:bg-white/10 hover:bg-white/40 dark:hover:bg-white/20 transition-colors group"
                  whileHover={{ x: 10 }}
                >
                  <Mail
                    className="text-gray-700 dark:text-white group-hover:text-orange-500 transition-colors"
                    size={24}
                  />
                  <span className="font-mono text-gray-700 dark:text-white">Email</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-lg bg-white/20 dark:bg-white/5 rounded-2xl p-8 border border-orange-200/30 dark:border-white/10 shadow-lg dark:shadow-2xl"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/30 dark:bg-white/10 border border-orange-200/50 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/30 dark:bg-white/10 border border-orange-200/50 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/30 dark:bg-white/10 border border-orange-200/50 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-6xl mb-6"
                >
                  📨
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-300 dark:hidden">
                  Thanks for reaching out! I'll get back to you soon.
                </p>
                <motion.p
                  animate={{
                    textShadow: ["0 0 5px #ff6b35", "0 0 20px #ff6b35", "0 0 5px #ff6b35"],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-orange-400 font-mono hidden dark:block"
                >
                  We're printing your thoughts...
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  keywords: [
    "kaushikieee",
    "kaushikieee portfolio",
    "kaushikieee developer",
    "kaushikieee blog",
    "kaushikieee projects",
    "kaushikieee work",
    "kaushikieee poetry",
    "kaushikieee tech stack",
    "kaushikieee github",
    "kaushikieee contact",
    "kaushikieee email",
    "kaushikieee website",
    "kaushikieee open source",
    "kaushikieee india",
    "kaushikieee software engineer",
    "kaushikieee frontend developer",
    "kaushikieee backend developer",
    "kaushikieee full stack",
    "kaushikieee creative",
    "kaushikieee coder",
    "kaushikieee programmer",
    "kaushikieee resume",
    "kaushikieee experience",
    "kaushikieee achievements",
    "kaushikieee skills",
    "ghostgms",
    "ghostgms github",
    "ghostgms portfolio",
    "ghostgms project",
    "ghostgms veloxineology",
    "veloxineologylabs portfolio",
    "veloxineologylabs",
    "veloxineology",
    "veloxineology labs",
    "veloxineology github",
    "veloxineology labs portfolio",
    "veloxineology labs github",
    "veloxineology open source",
    "veloxineology projects",
    "veloxineology developer",
    "veloxineology blog",
    "veloxineology work"
  ]
};
