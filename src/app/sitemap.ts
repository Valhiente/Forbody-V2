import type { MetadataRoute } from 'next';
import { getUnits } from '@/services/units.service';

const baseUrl = 'https://forbodyacademia.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const units = await getUnits();
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/unidades`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/franquias`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
  const unitRoutes: MetadataRoute.Sitemap = units
    .filter((unit) => unit.status !== 'hidden')
    .map((unit) => ({
      url: `${baseUrl}/unidades/${unit.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: unit.status === 'active' ? 0.8 : 0.5,
    }));

  return [...staticRoutes, ...unitRoutes];
}
