import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyAttend from "@/components/WhyAttend";
import EventCatalog from "@/components/events/EventCatalog";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <WhyAttend />
        <EventCatalog />
        <Gallery />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
