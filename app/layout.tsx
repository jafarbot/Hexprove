import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageLoader from "@/components/PageLoader";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: "Hexprove | Crypto QA Consultancy | Web3 Testing Experts",
  description:
    "Hexprove (also searched as Hex Proof, HexProof) - Outsource QA to crypto-native experts. Dedicated QA testing for DeFi, NFT, and Web3 companies. Deep blockchain knowledge, no crowdsourced inconsistency.",
  keywords: [
    "crypto QA",
    "Web3 testing",
    "outsource QA",
    "QA consultancy",
    "DeFi testing",
    "NFT testing",
    "blockchain QA",
    "quality assurance crypto",
    "software testing Web3",
    "dApp testing",
    "smart contract QA",
    "wallet testing",
    "crypto bug testing",
    "dedicated QA team",
    "manual QA testing",
    "E2E automation",
    "Uniswap",
    "OpenSea",
  ],
  authors: [{ name: "Hexprove", url: "https://hexprove.com" }],
  creator: "Hexprove",
  publisher: "Hexprove",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Hexprove | Crypto QA Consultancy | Web3 Testing Experts",
    description:
      "Outsource QA to crypto-native experts. Dedicated QA testing for DeFi, NFT, and Web3 companies. Experience from Uniswap, OpenSea, Bloomberg, and Tradeweb.",
    url: "https://hexprove.com",
    siteName: "Hexprove",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hexprove | Crypto QA Consultancy",
    description:
      "Outsource QA to crypto-native experts. Dedicated QA testing for DeFi, NFT, and Web3 companies.",
    creator: "@hexprove",
  },
  alternates: {
    canonical: "https://hexprove.com",
  },
  category: "Technology",
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hexprove",
  alternateName: [
    "Hex Proof",
    "HexProof",
    "Hex-Proof",
    "Hexproof",
    "Hex Prove",
    "hex proof",
    "hexproof",
  ],
  description: "Crypto-native QA consultancy providing dedicated testing services for Web3, DeFi, and NFT companies.",
  url: "https://hexprove.com",
  logo: "https://hexprove.com/logo.svg",
  contactPoint: {
    "@type": "ContactPoint",
    email: "team@hexprove.com",
    contactType: "sales",
  },
  sameAs: [
    "https://twitter.com/hexprove",
    "https://linkedin.com/company/hexprove",
  ],
  knowsAbout: [
    "Quality Assurance",
    "Software Testing",
    "Web3",
    "DeFi",
    "NFT",
    "Blockchain",
    "Crypto",
    "E2E Testing",
    "Manual Testing",
    "dApp Testing",
  ],
  serviceArea: {
    "@type": "Place",
    name: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "QA Testing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Manual QA Testing",
          description: "Comprehensive manual testing by crypto-native QA experts",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E2E Automation",
          description: "Automated end-to-end testing with wallet mocking and transaction verification",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "dApp Testing",
          description: "Transaction flows, gas estimation, and chain-specific edge case testing",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Umami Analytics */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            defer
            src={process.env.NEXT_PUBLIC_UMAMI_URL || "https://cloud.umami.is/script.js"}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body className="bg-background text-foreground antialiased">
        <PageLoader />
        <ThemeProvider>
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
