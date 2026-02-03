"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPostMeta;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className="p-6 rounded-2xl border transition-all duration-300 hover:border-accent/50"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
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
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-theme-primary mb-2 group-hover:text-accent transition-colors">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-theme-secondary text-sm mb-4 line-clamp-2">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-theme-muted">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
