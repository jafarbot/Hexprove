import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Terms and Conditions | Hexprove",
  description:
    "Terms and conditions for use of the Hexprove website and services. Hexprove LLC.",
  openGraph: {
    title: "Terms and Conditions | Hexprove",
    url: "https://hexprove.com/terms",
  },
};

export default function TermsPage() {
  const htmlPath = path.join(process.cwd(), "content/terms.html");
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
            className="terms-content prose prose-invert max-w-none prose-headings:text-theme-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-p:text-theme-secondary prose-li:text-theme-secondary"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </main>
    </>
  );
}
