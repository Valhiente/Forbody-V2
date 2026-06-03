import { createClient, createSupabaseAdminClient } from '@/lib/supabase/server';
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

export async function updateUnit(id: string, payload: Partial<Unit>): Promise<{ success: boolean; error?: string }> {
  try {
    const supabaseAdmin = await createSupabaseAdminClient();
    
    if (!supabaseAdmin) {
      return { success: false, error: 'Supabase admin não configurado. Verifique SUPABASE_SERVICE_ROLE_KEY.' };
    }

    const updates: any = {
      updated_at: new Date().toISOString()
    };
    
    if (payload.name !== undefined) updates.name = payload.name;
    if (payload.city !== undefined) updates.city = payload.city;
    if (payload.state !== undefined) updates.state = payload.state;
    if (payload.address !== undefined) updates.address = payload.address;
    if (payload.status !== undefined) updates.status = payload.status;
    if (payload.whatsapp !== undefined) updates.whatsapp = payload.whatsapp;
    if (payload.instagram !== undefined) updates.instagram = payload.instagram;
    if (payload.salesUrl !== undefined) updates.sales_url = payload.salesUrl;
    if (payload.studentAreaUrl !== undefined) updates.student_area_url = payload.studentAreaUrl;
    if (payload.locationUrl !== undefined) updates.location_url = payload.locationUrl;
    if (payload.googlePlaceId !== undefined) updates.google_place_id = payload.googlePlaceId;

    const { error } = await supabaseAdmin
      .from('units')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.warn('Erro ao atualizar unidade no Supabase:', error.message);
      return { success: false, error: `Não foi possível salvar no Supabase. Verifique políticas/RLS ou chave server-side. Detalhes: ${error.message}` };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('Erro inesperado ao atualizar unidade:', err);
    return { success: false, error: `Não foi possível salvar no Supabase. Verifique políticas/RLS ou chave server-side. Detalhes: ${err.message}` };
  }
}

