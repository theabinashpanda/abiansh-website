"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Industries } from "@/components/industries";
import { Process } from "@/components/process";
import { WhyUs } from "@/components/why-us";
import { Founders } from "@/components/founders";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <div className="divider max-w-7xl mx-auto" />
        <Services />
        <Industries />
        <Process />
        <WhyUs />
        <Founders />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
