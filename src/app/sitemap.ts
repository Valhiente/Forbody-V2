import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { supabasePublishableKey, supabaseUrl } from '@/lib/supabase/config';

const baseUrl = 'https://forbodyacademia.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const units =
    (
      await createClient(supabaseUrl, supabasePublishableKey, {
        auth: { persistSession: false },
      })
        .from('units')
        .select('slug, status')
        .neq('status', 'hidden')
    ).data ?? [];
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/unidades`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/franquias`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
  const unitRoutes: MetadataRoute.Sitemap = units
    .map((unit) => ({
      url: `${baseUrl}/unidades/${unit.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: unit.status === 'active' ? 0.8 : 0.5,
    }));

  return [...staticRoutes, ...unitRoutes];
}
