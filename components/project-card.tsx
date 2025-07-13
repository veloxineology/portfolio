"use client"

import { useState } from "react"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  story: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="project-card"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full preserve-3d cursor-pointer"
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden backdrop-blur-lg bg-white/20 dark:bg-white/5 rounded-2xl border border-orange-200/30 dark:border-white/10 shadow-lg dark:shadow-2xl overflow-hidden">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-orange-200/50 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="px-2 py-1 bg-gray-200/50 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 backdrop-blur-lg bg-white/20 dark:bg-white/5 rounded-2xl border border-orange-200/30 dark:border-white/10 shadow-lg dark:shadow-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Project Story</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{project.story}</p>
          </div>
          <div className="flex gap-4 mt-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github size={16} />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <ExternalLink size={16} />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
