import { Nav } from "@/components/Nav";
import { useReveals } from "@/lib/motion";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { About } from "@/sections/About";
import { Champions } from "@/sections/Champions";
import { Contact, Cta } from "@/sections/Contact";
import { Faq } from "@/sections/Faq";
import { Footer, WhatsAppButton } from "@/sections/Footer";
import { Gallery } from "@/sections/Gallery";
import { Hero } from "@/sections/Hero";
import { Master } from "@/sections/Master";
import { Press } from "@/sections/Press";
import { Programs } from "@/sections/Programs";

export default function App() {
  useSmoothScroll();
  useReveals();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Master />
        <Champions />
        <Programs />
        <Press />
        <Gallery />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
