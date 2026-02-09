import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Engagement from "@/components/Engagement";
import Contact from "@/components/Contact";
import { getBlogPostCount } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Flexible QA Engagement Models | QA Audit, Pre-Launch Sprint | Hexprove",
  description:
    "No long-term contracts required. Choose from a one-time QA audit, intensive pre-launch testing sprint, or a dedicated QA team embedded in your sprints. Flexible engagement for crypto startups.",
  keywords: [
    "QA audit crypto",
    "pre-launch QA testing",
    "dedicated QA team",
    "flexible QA engagement",
    "outsource QA crypto",
    "QA sprint Web3",
    "one-time QA audit",
  ],
  openGraph: {
    title: "Flexible QA Engagement Models | Hexprove",
    description:
      "QA audits, pre-launch sprints, and dedicated teams. No long-term contracts — we scale to fit your stage.",
    url: "https://hexprove.com/how-we-work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QA Engagement Models | Hexprove",
    description:
      "From a one-time audit to a dedicated team every sprint. Flexible QA for crypto startups.",
  },
  alternates: {
    canonical: "https://hexprove.com/how-we-work",
  },
};

export default function EngagementPage() {
  const blogPostCount = getBlogPostCount();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <Engagement />
        <Contact blogPostCount={blogPostCount} />
      </main>
    </>
  );
}
