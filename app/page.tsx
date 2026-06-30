import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";

// Lazy load below-the-fold components
const About = dynamic(() => import('@/components/About'), { ssr: true });
const EventCatalog = dynamic(() => import('@/components/events/EventCatalog'), { ssr: true });
const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: true });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true });
const Newsletter = dynamic(() => import('@/components/Newsletter'), { ssr: true });
const Marquee = dynamic(() => import('@/components/Marquee'), { ssr: true });

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
