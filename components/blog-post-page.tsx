"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"
import FloatingDock from "@/components/floating-navbar"

interface BlogPostPageProps {
  post: BlogPost
  onBack: () => void
}

// Enhanced markdown parser
const parseMarkdown = (markdown: string): string => {
  let html = markdown

  // Headers
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>")
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>")
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>")

  // Bold and Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")

  // Strikethrough
  html = html.replace(/~~(.*?)~~/g, "<del>$1</del>")

  // Code blocks with language support
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || "text"
    return `<pre class="code-block" data-language="${language}"><code>${code.trim()}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")

  // Lists
  html = html.replace(/^- (.*$)/gim, "<li>$1</li>")
  html = html.replace(/^(\d+)\. (.*$)/gim, "<li>$2</li>")

  // Wrap consecutive <li> elements in <ul> or <ol>
  html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
    if (match.includes("1.")) {
      return `<ol>${match}</ol>`
    }
    return `<ul>${match}</ul>`
  })

  // Links
  html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // Horizontal rules
  html = html.replace(/^---$/gim, "<hr>")

  // Paragraphs (split by double newlines)
  html = html.replace(/\n\n/g, "</p><p>")
  html = `<p>${html}</p>`

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, "")
  html = html.replace(/<p>(<h[1-6]>)/g, "$1")
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, "$1")
  html = html.replace(/<p>(<pre)/g, "$1")
  html = html.replace(/(<\/pre>)<\/p>/g, "$1")
  html = html.replace(/<p>(<blockquote>)/g, "$1")
  html = html.replace(/(<\/blockquote>)<\/p>/g, "$1")
  html = html.replace(/<p>(<ul>)/g, "$1")
  html = html.replace(/(<\/ul>)<\/p>/g, "$1")
  html = html.replace(/<p>(<ol>)/g, "$1")
  html = html.replace(/(<\/ol>)<\/p>/g, "$1")
  html = html.replace(/<p>(<hr>)/g, "$1")
  html = html.replace(/(<hr>)<\/p>/g, "$1")

  return html
}

export default function BlogPostPage({ post, onBack }: BlogPostPageProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const parsedContent = parseMarkdown(post.body)

  return (
    <>
      <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-4xl mx-auto">
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
                Back to Blog
              </motion.button>

              <motion.button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent font-mono text-sm rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 size={14} />
                Share
              </motion.button>
            </div>

            {/* Article Header */}
            <article className="prose prose-lg max-w-none">
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>
                <p className="text-lg font-secondary mb-6 leading-relaxed">{post.description}</p>

                <div className="flex items-center gap-6 text-sm text-muted mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </header>

              {/* Article Content */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            </article>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <motion.button
                  onClick={onBack}
                  className="flex items-center gap-2 px-6 py-3 bg-card border border-border text-secondary font-mono text-sm rounded-xl hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft size={16} />
                  Back to All Posts
                </motion.button>

                <motion.button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent font-mono text-sm rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 size={16} />
                  Share This Post
                </motion.button>
              </div>
            </footer>
          </motion.div>
        </div>
      </div>
      <FloatingDock />
    </>
  )
}
