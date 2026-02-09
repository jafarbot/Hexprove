import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatWeCatch from "@/components/WhatWeCatch";
import Services from "@/components/Services";
import Engagement from "@/components/Engagement";
import Experience from "@/components/Experience";
import Team from "@/components/Team";
import Founder from "@/components/Founder";
import Contact from "@/components/Contact";
import { getBlogPostCount } from "@/lib/blog";

export default function Home() {
  const blogPostCount = getBlogPostCount();

  return (
    <main>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <WhatWeCatch />
      <Services />
      <Engagement />
      <Experience />
      <Team />
      <Founder />
      <Contact blogPostCount={blogPostCount} />
    </main>
  );
}
