import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Events from "@/components/Events";
import Marquee from "@/components/Marquee";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Events />
        <Marquee />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
