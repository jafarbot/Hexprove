import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatWeCatch from "@/components/WhatWeCatch";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Team from "@/components/Team";
import Founder from "@/components/Founder";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <WhatWeCatch />
      <Services />
      <Experience />
      <Team />
      <Founder />
      <Contact />
    </main>
  );
}
