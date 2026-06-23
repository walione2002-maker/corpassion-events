'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const clients = [
  { name: 'Emirates', domain: 'emirates.com' },
  { name: 'Emirates NBD', domain: 'emiratesnbd.com' },
  { name: 'Etisalat by e&', domain: 'etisalat.ae' },
  { name: 'FAB', domain: 'bankfab.com' },
  { name: 'EGPC', domain: 'egpc.com.eg' },
  { name: 'Al Rajhi Bank', domain: 'alrajhibank.com.sa' },
  { name: 'Kuwait Petroleum Corporation', domain: 'kpc.com.kw' },
  { name: 'Ministry of Oil', domain: 'oil.gov.iq' },
  { name: 'Omanoil', domain: 'oomco.com' },
  { name: 'Ooredoo', domain: 'ooredoo.com' },
  { name: 'Qatar Airways', domain: 'qatarairways.com' },
  { name: 'QatarEnergy', domain: 'qatarenergy.qa' },
  { name: 'Qatargas', domain: 'qatargas.com' },
  { name: 'QNB', domain: 'qnb.com' },
  { name: 'SABIC', domain: 'sabic.com' },
  { name: 'SNB', domain: 'alahli.com' },
  { name: 'Sonatrach', domain: 'sonatrach.dz' },
  { name: 'Aramco', domain: 'aramco.com' },
  { name: 'stc', domain: 'stc.com.sa' },
  { name: 'Zain', domain: 'zain.com' },
  { name: 'ADCB', domain: 'adcb.com' },
  { name: 'ADNOC', domain: 'adnoc.ae' },
  { name: 'Almarai', domain: 'almarai.com' },
  { name: 'Bapco', domain: 'bapco.net' },
  { name: 'du', domain: 'du.ae' },
  { name: 'EMAAR', domain: 'emaar.com' },
];

function ClientLogo({ client }: { client: typeof clients[0] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex-shrink-0 flex items-center justify-center w-48 h-24 px-4 hover:scale-105 transition-transform duration-300">
      {!imgError ? (
        <img
          src={`/logos/${client.domain}.png`}
          alt={`${client.name} logo`}
          className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-lg font-bold text-gray-800 text-center whitespace-normal">
          {client.name}
        </span>
      )}
    </div>
  );
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex gap-12 items-center">
      {/* Render the list multiple times for a seamless loop */}
      {[...clients, ...clients, ...clients].map((client, index) => (
        <ClientLogo key={`${client.name}-${index}`} client={client} />
      ))}
    </div>
  );
}

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <>
      {/* View Events Bar */}
      <div className="w-full bg-slate-500 py-3 text-center cursor-pointer hover:bg-slate-600 transition-colors">
        <span className="text-white text-sm font-medium">View Events</span>
      </div>

      <section id="clients" className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div ref={sectionRef} className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-gray-900">
            Industries We Serve
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full max-w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
        {/* Left gradient mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        {/* Right gradient mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div className="flex animate-marquee">
          <MarqueeRow />
        </div>
      </div>
    </section>
    </>
  );
}
