import { createClient } from '@/lib/supabase/server';
import { unitsData } from '@/app/data';
import type { Unit } from '@/app/index';

export async function getUnits(): Promise<Unit[]> {
  try {
    const supabase = await createClient();
    
    // Se o supabase não foi inicializado (falta de env vars), usar mock
    if (!supabase) {
      return unitsData;
    }

    const { data, error } = await supabase.from('units').select('*');
    
    if (error) {
      console.warn('Erro ao buscar unidades do Supabase:', error.message);
      return unitsData;
    }

    if (data && data.length > 0) {
      // Mapear snake_case do banco para camelCase do Unit type, se necessário.
      // Assumindo que a tabela usa snake_case (ex: evo_id)
      return data.map((item: any) => ({
        id: item.id,
        slug: item.slug,
        name: item.name,
        city: item.city,
        state: item.state,
        evoId: item.evo_id,
        evoUnitId: item.evo_unit_id,
        googleReviewsScore: item.google_reviews_score,
        googleReviewsCount: item.google_reviews_count,
        address: item.address,
        whatsapp: item.whatsapp,
        instagram: item.instagram,
        mapEmbedUrl: item.map_embed_url,
        salesUrl: item.sales_url,
        studentAreaUrl: item.student_area_url,
        checkoutUrl: item.checkout_url,
        locationUrl: item.location_url,
        status: item.status,
        googlePlaceId: item.google_place_id,
        businessHours: item.business_hours,
        galleryUrls: item.gallery_urls,
        teachers: item.teachers,
      })) as Unit[];
    }

    return unitsData;
  } catch (err) {
    console.warn('Erro inesperado ao buscar unidades:', err);
    return unitsData;
  }
}

export async function getUnitBySlug(slug: string): Promise<Unit | undefined> {
  const units = await getUnits();
  return units.find((unit) => unit.slug === slug);
}
