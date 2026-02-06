import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Cookie Policy | Hexprove",
  description: "Cookie policy for Hexprove. How we use cookies and similar technologies on hexprove.com.",
  openGraph: {
    title: "Cookie Policy | Hexprove",
    url: "https://hexprove.com/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-invert prose-p:text-theme-secondary prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
          <div className="mb-8 flex justify-center">
            <Link href="/" className="text-sm text-theme-secondary hover:text-theme-primary transition-colors">
              ← Back to home
            </Link>
          </div>
          <h1 className="text-theme-primary">Cookie Policy</h1>
          <p className="text-theme-muted text-sm">Last updated February 2026</p>

          <h2 className="text-theme-primary mt-8">What we use</h2>
          <p>
            We use <strong>Umami</strong> for analytics on hexprove.com. Umami is privacy-focused: it does not use advertising cookies, does not collect personal data for advertising, and does not share data with third parties for marketing. We use it only to understand how visitors use our site (e.g. page views, referrers) so we can improve our content and services.
          </p>

          <h2 className="text-theme-primary mt-8">What we don’t use</h2>
          <p>
            We do not use advertising cookies, social-media tracking pixels, or third-party marketing cookies on this site.
          </p>

          <h2 className="text-theme-primary mt-8">More information</h2>
          <p>
            For details on what data we collect and how we use it, see our <Link href="/privacy">Privacy Policy</Link>. If you have questions, contact us at <a href="mailto:team@hexprove.com">team@hexprove.com</a>.
          </p>
        </div>
      </main>
    </>
  );
}
