"use client"

import type React from "react"

import { Calendar, Clock, Lock, ChevronLeft, ChevronRight, ArrowRight, Search } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { getBlogPosts, BlogPost } from "@/lib/blog-data"
import PersonalStuffPage from "@/components/personal-stuff-page"
import BlogPostPage from "@/components/blog-post-page"
import FloatingDock from "@/components/floating-navbar"

const POSTS_PER_PAGE = 3

export default function BlogPage() {
  const [showPersonalStuff, setShowPersonalStuff] = useState(false)
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [blogPosts, setBlogPosts] = useState(getBlogPosts())
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Filter blog posts based on search query
  const filteredPosts = useMemo(() => {
    if (!isClient || !blogPosts || !Array.isArray(blogPosts)) return []
    if (!searchQuery.trim()) return blogPosts

    const query = searchQuery.toLowerCase()
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags?.some((tag: string) => tag.toLowerCase().includes(query)) ||
        post.body.toLowerCase().includes(query)
    )
  }, [searchQuery, blogPosts, isClient])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string): void => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const goToPage = (page: number): void => {
    setCurrentPage(page)
  }

  const goToPrevious = (): void => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goToNext = (): void => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePersonalStuffClick = (): void => {
    setShowPasswordPrompt(true)
  }

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (password === "shelovesgwagons") {
      setShowPersonalStuff(true)
      setShowPasswordPrompt(false)
      setPassword("")
    } else {
      alert("Wrong password!")
      setPassword("")
    }
  }

  const handleBlogClick = (slug: string): void => {
    setSelectedBlogSlug(slug)
  }

  const handleBackToBlog = (): void => {
    setSelectedBlogSlug(null)
  }

  if (showPersonalStuff) {
    return <PersonalStuffPage onBack={() => setShowPersonalStuff(false)} />
  }

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 pb-40 main-content-mobile-pb">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-card rounded-lg w-1/3 mb-8"></div>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-8 bg-card rounded-lg w-3/4 mb-4"></div>
                  <div className="h-4 bg-card rounded-lg w-full mb-2"></div>
                  <div className="h-4 bg-card rounded-lg w-5/6 mb-6"></div>
                  <div className="flex gap-4 mb-4">
                    <div className="h-4 bg-card rounded-lg w-24"></div>
                    <div className="h-4 bg-card rounded-lg w-24"></div>
                  </div>
                  <div className="flex gap-3">
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

  if (selectedBlogSlug) {
    const selectedPost = filteredPosts.find((post) => post.slug === selectedBlogSlug)
    if (selectedPost) {
      return <BlogPostPage post={selectedPost} onBack={handleBackToBlog} />
    }
  }

  return (
    <>
      <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 pb-40 main-content-mobile-pb">
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <h1 className="text-3xl font-bold text-primary">// Blog & Thoughts</h1>

              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl font-mono text-sm text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
                />
              </div>
            </div>

            {/* Results count */}
            {searchQuery && (
              <p className="text-sm font-mono text-muted mb-6">
                Found {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} matching "{searchQuery}"
              </p>
            )}

            {/* Blog Posts */}
            {currentPosts.length > 0 ? (
              <div className="space-y-8 mb-8">
                {currentPosts.map((post: BlogPost, index: number) => (
                  <article
                    key={post.slug}
                    className="blog-card cursor-pointer"
                    onClick={() => handleBlogClick(post.slug)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-bold text-primary leading-tight">{post.title}</h2>
                      <ArrowRight size={18} className="text-muted flex-shrink-0 ml-4 mt-1" />
                    </div>

                    <p className="text-base text-secondary mb-6 leading-relaxed">{post.description}</p>

                    <div className="flex items-center gap-6 text-sm text-muted mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {post.tags?.map((tag: string) => (
                        <span key={tag} className="text-sm text-accent">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-bold text-primary mb-2">No posts found</h3>
                <p className="text-sm text-muted">Try adjusting your search terms</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-secondary font-mono text-sm rounded-lg hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) => (
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

            {/* Personal Stuff Button at Bottom */}
            <div className="flex justify-center pt-8 border-t border-border">
              <button
                onClick={handlePersonalStuffClick}
                className="flex items-center gap-2 px-6 py-3 bg-muted/10 hover:bg-muted/20 border border-muted/30 text-muted hover:text-primary font-mono text-sm rounded-xl transition-all duration-200 personal-stuff-btn-mobile"
              >
                <Lock size={14} />
                <span>Personal Stuff</span>
              </button>
            </div>

            {/* Password Prompt Modal */}
            {showPasswordPrompt && (
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={() => setShowPasswordPrompt(false)}
              >
                <div
                  className="bg-card border border-border rounded-xl p-6 max-w-sm w-full mx-4"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-bold text-primary mb-4">Enter Password</h3>
                  <form onSubmit={handlePasswordSubmit}>
                    <input
                      type="password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      placeholder="Password..."
                      className="w-full px-4 py-3 bg-dark-bg border border-border rounded-lg font-mono text-sm text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent mb-4"
                      autoFocus
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-accent text-white font-mono text-sm rounded-lg hover:bg-accent/90 transition-colors"
                      >
                        Enter
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPasswordPrompt(false)}
                        className="flex-1 px-4 py-2 bg-muted/10 text-muted font-mono text-sm rounded-lg hover:bg-muted/20 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <FloatingDock />
    </>
  )
}


