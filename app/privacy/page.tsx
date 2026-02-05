import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Privacy Policy | Hexprove",
  description:
    "Privacy policy for Hexprove LLC. How we collect, use, and protect your personal information when you use hexprove.com.",
  openGraph: {
    title: "Privacy Policy | Hexprove",
    url: "https://hexprove.com/privacy",
  },
};

export default function PrivacyPage() {
  const htmlPath = path.join(process.cwd(), "content/privacy-policy.html");
  const html = fs.readFileSync(htmlPath, "utf8");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Link
              href="/"
              className="text-sm text-theme-secondary hover:text-theme-primary transition-colors"
            >
              ← Back to home
            </Link>
          </div>
          <article
            className="privacy-policy prose prose-invert max-w-none prose-headings:text-theme-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-p:text-theme-secondary prose-li:text-theme-secondary"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </main>
    </>
  );
}
