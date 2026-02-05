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
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-theme-primary">Cookie Policy</h1>
          <p className="text-theme-secondary">
            This page will display our full Cookie Policy. If you completed the
            Cookie Policy in Termly, paste or embed the content here, then
            redeploy.
          </p>
          <p className="text-theme-secondary">
            <Link href="/" className="text-accent hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
