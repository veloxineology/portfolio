"use client"

import { ExternalLink, Github, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { projectsData } from "@/lib/projects-data"
import FloatingDock from "@/components/floating-navbar"
import SpotlightCard from "@/components/SpotlightCard";

const PROJECTS_PER_PAGE = 6

export default function WorkPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!isClient || !projectsData || !Array.isArray(projectsData)) return []
    if (!searchQuery.trim()) return projectsData

    const query = searchQuery.toLowerCase()
    return projectsData.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech?.some((tech) => tech.toLowerCase().includes(query)) ||
        project.tags?.some((tag) => tag.toLowerCase().includes(query)),
    )
  }, [searchQuery, isClient])

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

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 pb-40 main-content-mobile-pb">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-card rounded-lg w-1/3 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-6 bg-card rounded-lg w-3/4 mb-4"></div>
                  <div className="h-4 bg-card rounded-lg w-full mb-2"></div>
                  <div className="h-4 bg-card rounded-lg w-5/6 mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-4 bg-card rounded-lg w-16"></div>
                    <div className="h-4 bg-card rounded-lg w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 pb-40 main-content-mobile-pb">
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <h1 className="text-3xl font-bold text-primary">// Work & Projects</h1>

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
              <p className="text-sm font-mono text-muted mb-6">
                Found {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} matching "{searchQuery}"
              </p>
            )}

            {/* Projects Grid */}
            {currentProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentProjects.map((project, index) => (
                  <SpotlightCard key={project.slug} className="project-card">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{project.emoji}</span>
                      <h3 className="text-lg font-bold text-primary">{project.title}</h3>
                    </div>

                    <p className="text-sm text-secondary mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs font-mono rounded border border-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech && project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-muted/10 text-muted text-xs font-mono rounded">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.repoLink && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-2 bg-muted/10 hover:bg-muted/20 text-muted text-xs font-mono rounded transition-colors"
                        >
                          <Github size={12} />
                          Code
                        </a>
                      )}
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent text-xs font-mono rounded transition-colors"
                        >
                          <ExternalLink size={12} />
                          Live
                        </a>
                      )}
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-primary mb-2">No projects found</h3>
                <p className="text-sm text-muted">Try adjusting your search terms</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-secondary font-mono text-sm rounded-lg hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 font-mono text-sm rounded-lg transition-all duration-200 ${
                        currentPage === page
                          ? "bg-accent text-white"
                          : "bg-card border border-border text-secondary hover:bg-accent/10 hover:text-accent hover:border-accent/50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-secondary font-mono text-sm rounded-lg hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <FloatingDock />
    </>
  )
}


