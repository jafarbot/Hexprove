import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import Experience from "@/components/Experience";
import Team from "@/components/Team";
import Founder from "@/components/Founder";
import Contact from "@/components/Contact";
import { getBlogPostCount } from "@/lib/blog";

export const metadata: Metadata = {
  title: "About Hexprove | Crypto-Native QA Consultancy",
  description:
    "Founded by the former Lead QA at Uniswap and OpenSea. 10+ years of QA experience across Web3 and enterprise. Dedicated teams, not crowdsourced testers.",
  keywords: [
    "about hexprove",
    "crypto QA consultancy",
    "Web3 QA company",
    "Uniswap QA",
    "OpenSea QA",
    "dedicated QA team crypto",
    "blockchain QA experts",
  ],
  openGraph: {
    title: "About Hexprove | Crypto-Native QA Consultancy",
    description:
      "Founded by Uniswap and OpenSea's former Lead QA. 10+ years experience, dedicated teams, deep crypto knowledge.",
    url: "https://hexprove.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hexprove | Crypto QA Experts",
    description:
      "Built QA at Uniswap and OpenSea. Now building yours. Dedicated crypto-native QA teams.",
  },
  alternates: {
    canonical: "https://hexprove.com/about",
  },
};

export default function AboutPage() {
  const blogPostCount = getBlogPostCount();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <WhyChooseUs />
        <Experience />
        <Team />
        <Founder />
        <Contact blogPostCount={blogPostCount} />
      </main>
    </>
  );
}
