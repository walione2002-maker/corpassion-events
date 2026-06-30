import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import EventCatalog from "@/components/events/EventCatalog";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <About />
      <EventCatalog />
      <Gallery />
      <FAQ />
      <Newsletter />
      <Marquee />
    </main>
  );
}
