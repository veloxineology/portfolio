"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"
import FloatingDock from "@/components/floating-navbar"
import { CodeBlock } from "@/components/ui/code-block";
import ReactMarkdown from "react-markdown";

interface BlogPostPageProps {
  post: BlogPost
  onBack: () => void
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
              <div className="blog-content">
                <ReactMarkdown
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline ? (
                        <CodeBlock
                          language={match ? match[1] : "text"}
                          filename={""}
                          code={String(children).replace(/\n$/, "")}
                        />
                      ) : (
                        <code className={className} {...props}>{children}</code>
                      );
                    },
                  }}
                >
                  {post.body}
                </ReactMarkdown>
              </div>
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
