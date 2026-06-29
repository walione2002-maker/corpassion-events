import { MetadataRoute } from 'next';
import { events } from '@/data/events';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://corpassion-events.vercel.app';

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Dynamic Event Routes
  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${baseUrl}/events/${event.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...routes, ...eventRoutes];
}
