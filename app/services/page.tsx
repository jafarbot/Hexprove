import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Engagement from "@/components/Engagement";
import Contact from "@/components/Contact";
import { getBlogPostCount } from "@/lib/blog";

export const metadata: Metadata = {
  title: "QA Testing Services for Crypto & Web3 | Hexprove",
  description:
    "Manual QA testing, E2E automation, API testing, dApp & payments, and cross-chain validation for crypto startups. Dedicated QA team with experience from Uniswap and OpenSea.",
  keywords: [
    "crypto QA services",
    "Web3 testing services",
    "DeFi QA testing",
    "API testing crypto",
    "E2E automation blockchain",
    "dApp testing",
    "cross-chain testing",
    "manual QA testing crypto",
  ],
  openGraph: {
    title: "QA Testing Services for Crypto & Web3 | Hexprove",
    description:
      "Manual QA, E2E automation, API testing, and cross-chain validation for crypto products. Dedicated team, no crowdsourced inconsistency.",
    url: "https://hexprove.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto & Web3 QA Testing Services | Hexprove",
    description:
      "Manual QA, E2E automation, API testing, and cross-chain validation. Built by the team that built QA at Uniswap and OpenSea.",
  },
  alternates: {
    canonical: "https://hexprove.com/services",
  },
};

export default function ServicesPage() {
  const blogPostCount = getBlogPostCount();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <Services />
        <Engagement />
        <Contact blogPostCount={blogPostCount} />
      </main>
    </>
  );
}
