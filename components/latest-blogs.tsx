"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

export default function LatestBlogs() {
  const latestPosts = blogPosts.slice(0, 2)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">// Latest Thoughts</h2>
        <button className="text-sm font-mono text-accent hover:text-primary transition-colors">
          View All <ArrowRight size={12} className="inline ml-1" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {latestPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="blog-card"
            whileHover={{ scale: 1.01 }}
            onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
          >
            <h3 className="text-lg font-bold text-primary mb-3">{post.title}</h3>
            <p className="text-sm text-secondary mb-4 leading-relaxed">{post.description}</p>

            <div className="flex items-center gap-4 text-xs text-muted">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-accent">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
