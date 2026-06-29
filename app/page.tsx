import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import WhyAttend from "@/components/WhyAttend";
import EventCatalog from "@/components/events/EventCatalog";
import Marquee from "@/components/Marquee";
import AgendaTabs from "@/components/summit/AgendaTabs";
import PricingCards from "@/components/pricing/PricingCards";
import SponsorshipHub from "@/components/pricing/SponsorshipHub";
import Gallery from "@/components/Gallery";
import PartnersCarousel from "@/components/PartnersCarousel";
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
        <WhyAttend />
        <EventCatalog />
        <Marquee />
        <AgendaTabs />
        <PricingCards />
        <SponsorshipHub />
        <Gallery />
        <PartnersCarousel />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
