import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Blog | Hexprove - Crypto QA Insights",
  description:
    "Expert insights on QA testing for crypto, DeFi, and Web3 applications. Learn from the team that built QA at Uniswap and OpenSea.",
  openGraph: {
    title: "Blog | Hexprove - Crypto QA Insights",
    description:
      "Expert insights on QA testing for crypto, DeFi, and Web3 applications.",
    url: "https://hexprove.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-theme-primary mb-4">
              Blog
            </h1>
            <p className="text-lg text-theme-secondary max-w-2xl">
              Insights on crypto QA, Web3 testing strategies, and lessons learned
              from testing at Uniswap and OpenSea.
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 rounded-2xl border"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              <p className="text-theme-muted">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
