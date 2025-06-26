"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useState, useMemo } from "react"
import { projectsData } from "@/lib/projects-data"

const PROJECTS_PER_PAGE = 6

export default function WorkPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projectsData

    const query = searchQuery.toLowerCase()
    return projectsData.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some((tech) => tech.toLowerCase().includes(query)) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }, [searchQuery])

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 main-content-mobile-pb">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <h1 className="text-3xl font-mono font-bold text-primary">// Work & Projects</h1>

            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl font-mono text-sm text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
              />
            </div>
          </div>

          {/* Results count */}
          {searchQuery && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-mono text-muted mb-6">
              Found {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} matching "{searchQuery}"
            </motion.p>
          )}

          {/* Projects Grid */}
          {currentProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="project-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{project.emoji}</span>
                    <h3 className="text-lg font-mono font-bold text-primary">{project.title}</h3>
                  </div>

                  <p className="text-sm font-mono text-secondary mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs font-mono rounded border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-muted/10 text-muted text-xs font-mono rounded">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.repoLink && (
                      <motion.a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-2 bg-muted/10 hover:bg-muted/20 text-muted text-xs font-mono rounded transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Github size={12} />
                        Code
                      </motion.a>
                    )}
                    {project.demoLink && (
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent text-xs font-mono rounded transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <ExternalLink size={12} />
                        Live
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-mono font-bold text-primary mb-2">No projects found</h3>
              <p className="text-sm font-mono text-muted">Try adjusting your search terms</p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-secondary font-mono text-sm rounded-lg hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: currentPage === 1 ? 1 : 1.02 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.98 }}
              >
                <ChevronLeft size={14} />
                Previous
              </motion.button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 font-mono text-sm rounded-lg transition-all duration-200 ${
                      currentPage === page
                        ? "bg-accent text-white"
                        : "bg-card border border-border text-secondary hover:bg-accent/10 hover:text-accent hover:border-accent/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-secondary font-mono text-sm rounded-lg hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.02 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.98 }}
              >
                Next
                <ChevronRight size={14} />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export const metadata = {
  title: "Projects by Kaushik S – Veloxineology Labs Portfolio",
  description: "Explore projects by Kaushik S, developer at Veloxineology Labs and creator of GhostGMS. See portfolio highlights and open source work.",
  keywords: [
    "Kaushikieee", "kaushikieee", "Kaushik S", "kaushik s", "Veloxineology Labs", "veloxineology labs", "Veloxine", "veloxine", "Veloxine", "veloxine", "GhostGMS", "ghostgms", "ghostgms github", "github kaushikieee", "veloxineology github", "kaushikieee instagram", "kaushikieee snapchat", "kaushik s instagram", "kaushik s snapchat", "kaushik s portfolio", "kaushikieee portfolio", "veloxineology labs portfolio", "kaushik s developer", "kaushik s blog", "kaushik s projects", "kaushik s work", "kaushik s poetry", "kaushik s tech stack", "kaushik s github", "kaushik s contact", "kaushik s email", "kaushik s website", "kaushik s personal site", "kaushik s open source", "kaushik s india", "kaushik s software engineer", "kaushik s frontend developer", "kaushik s backend developer", "kaushik s full stack", "kaushik s portfolio site", "kaushik s creative", "kaushik s coder", "kaushik s programmer", "kaushik s resume", "kaushik s experience", "kaushik s achievements", "kaushik s skills"
  ],
  openGraph: {
    title: "Projects by Kaushik S – Veloxineology Labs Portfolio",
    description: "Explore projects by Kaushik S, developer at Veloxineology Labs and creator of GhostGMS.",
    url: "https://kaushikieee.me/projects",
    siteName: "Kaushik S Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects by Kaushik S – Veloxineology Labs Portfolio",
    description: "Explore projects by Kaushik S, developer at Veloxineology Labs and creator of GhostGMS.",
    images: ["/og-image.png"],
  },
};
