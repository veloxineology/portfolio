"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Heart } from "lucide-react"
import { protectedData } from "@/lib/protected-data"

// Markdown parser for italic text
const parseMarkdown = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, "<em>$1</em>")
}

interface PersonalStuffPageProps {
  onBack: () => void
}

export default function PersonalStuffPage({ onBack }: PersonalStuffPageProps) {
  const { personalStuff } = protectedData

  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-muted/10 hover:bg-muted/20 text-muted hover:text-primary font-mono text-sm rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft size={14} />
              Back
            </motion.button>
            <div>
              <h1 className="text-3xl font-mono font-bold text-primary">{personalStuff.title}</h1>
              <p className="text-sm font-mono text-secondary mt-1">{personalStuff.description}</p>
            </div>
          </div>

          {/* Current Mood */}
          <div className="card-minimal mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-accent" />
                <span className="font-mono text-sm font-bold text-accent">Current Mood</span>
              </div>
              <span className="font-mono text-sm text-secondary">Last updated: {personalStuff.lastUpdated}</span>
            </div>
            <p className="font-mono text-lg text-primary mt-2">{personalStuff.currentMood}</p>
          </div>

          {/* Sections Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {personalStuff.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-minimal"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">{section.emoji}</span>
                  <h3 className="text-sm font-mono font-bold text-accent">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-xs font-mono text-secondary leading-relaxed">
                      • <span dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Personal Notes */}
          <div className="mb-8">
            <h2 className="text-xl font-mono font-bold text-primary mb-6">// Personal Notes</h2>
            <div className="space-y-4">
              {personalStuff.personalNotes.map((note, index) => (
                <motion.div
                  key={note.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-minimal"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={14} className="text-accent" />
                    <span className="text-xs font-mono text-accent">{note.date}</span>
                    <span className="text-sm font-mono font-bold text-primary">{note.title}</span>
                  </div>
                  <p className="text-sm font-mono text-secondary leading-relaxed">{note.content}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Favorite Memories */}
          <div className="card-minimal">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">💝</span>
              <h3 className="text-lg font-mono font-bold text-accent">Favorite Memories</h3>
            </div>
            <ul className="space-y-2">
              {personalStuff.favoriteMemories.map((memory, index) => (
                <li key={index} className="text-sm font-mono text-secondary leading-relaxed">
                  • {memory}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
