import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import { getBlogPostCount } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Contact Us | Hire Crypto-Native QA Experts | Hexprove",
  description:
    "Get in touch with Hexprove for dedicated QA testing for your crypto, DeFi, or Web3 product. Book a call, request a QA audit, or start a pre-launch testing sprint.",
  keywords: [
    "hire crypto QA",
    "contact Web3 QA",
    "book QA consultation",
    "crypto QA audit",
    "Web3 testing quote",
    "DeFi QA contact",
  ],
  openGraph: {
    title: "Contact Hexprove | Crypto-Native QA Experts",
    description:
      "Ready to upgrade your QA? Tell us about your project. QA audits, pre-launch sprints, and dedicated teams available.",
    url: "https://hexprove.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Hexprove | Crypto QA Experts",
    description:
      "Get in touch for dedicated QA testing for your crypto product. QA audits, pre-launch sprints, and dedicated teams.",
  },
  alternates: {
    canonical: "https://hexprove.com/contact",
  },
};

export default function ContactPage() {
  const blogPostCount = getBlogPostCount();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <Contact blogPostCount={blogPostCount} />
      </main>
    </>
  );
}
