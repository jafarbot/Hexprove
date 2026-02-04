"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useScrollDepth } from "@/lib/useScrollDepth";
import type { BlogPost as BlogPostType } from "@/lib/blog";

interface BlogPostProps {
  post: BlogPostType;
  children: React.ReactNode;
}

export default function BlogPost({ post, children }: BlogPostProps) {
  // Track scroll depth for blog engagement
  useScrollDepth(`/blog/${post.slug}`);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="min-h-screen bg-background">
      {/* Header */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-theme-secondary hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono rounded"
                style={{
                  backgroundColor: "var(--accent-muted)",
                  color: "var(--accent)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-primary mb-4"
          >
            {post.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-lg text-theme-secondary mb-6"
          >
            {post.description}
          </motion.p>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center gap-4 text-sm text-theme-muted pb-8 border-b"
            style={{ borderColor: "var(--border-color)" }}
          >
            <span className="font-medium text-theme-secondary">{post.author}</span>
            <span>•</span>
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="px-4 pb-24"
      >
        <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
          {children}
        </div>
      </motion.div>
    </article>
  );
}
