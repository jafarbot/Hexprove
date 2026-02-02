// COMING SOON MODE - Temporarily showing coming soon page
// To restore full site, uncomment the imports and return statement below
import ComingSoon from "./coming-soon/page";

export default function Home() {
  return <ComingSoon />;
}

// ===== FULL SITE CODE (currently disabled) =====
// import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
// import WhyChooseUs from "@/components/WhyChooseUs";
// import WhatWeCatch from "@/components/WhatWeCatch";
// import Services from "@/components/Services";
// import Experience from "@/components/Experience";
// import Team from "@/components/Team";
// import Founder from "@/components/Founder";
// import Contact from "@/components/Contact";

// export default function Home() {
//   return (
//     <main>
//       <Navbar />
//       <Hero />
//       <WhyChooseUs />
//       <WhatWeCatch />
//       <Services />
//       <Experience />
//       <Team />
//       <Founder />
//       <Contact />
//     </main>
//   );
// }
