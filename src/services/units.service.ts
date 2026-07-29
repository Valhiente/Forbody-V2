import { createPublicClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { unitsData } from '@/app/data';
import type {
  Unit,
  UnitBusinessHour,
  UnitGalleryItem,
} from '@/app/index';

type UnitTeacher = NonNullable<Unit['teachers']>[number];

type UnitRow = {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  state: string | null;
  evo_id: number | null;
  evo_unit_id: number | null;
  google_reviews_score: number | string | null;
  google_reviews_count: number | null;
  address: string | null;
  whatsapp: string | null;
  instagram: string | null;
  map_embed_url: string | null;
  sales_url: string | null;
  student_area_url: string | null;
  checkout_url?: string | null;
  location_url: string | null;
  status: Unit['status'] | null;
  google_place_id: string | null;
  business_hours: UnitBusinessHour[] | null;
  gallery_urls: UnitGalleryItem[] | null;
  teachers: UnitTeacher[] | null;
};

type UnitWritePayload = {
  id?: string;
  slug?: string;
  name?: string;
  city?: string;
  state?: string;
  address?: string;
  status?: Unit['status'];
  whatsapp?: string;
  instagram?: string;
  sales_url?: string;
  student_area_url?: string;
  location_url?: string;
  google_place_id?: string | null;
  google_reviews_score?: number;
  google_reviews_count?: number;
  business_hours?: UnitBusinessHour[];
  gallery_urls?: UnitGalleryItem[];
  teachers?: UnitTeacher[];
  created_at?: string;
  updated_at: string;
};

type UnitMutationResult = {
  success: boolean;
  error?: string;
  id?: string;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Erro desconhecido.';
}

function toNumber(value: number | string | null | undefined): number {
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function mapUnitRow(item: UnitRow): Unit {
  const fallback = unitsData.find((unit) => unit.slug === item.slug);

  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    city: item.city || fallback?.city || '',
    state: item.state || fallback?.state || '',
    evoId: item.evo_id || fallback?.evoId || 0,
    evoUnitId: item.evo_unit_id || fallback?.evoUnitId,
    googleReviewsScore: toNumber(item.google_reviews_score) || fallback?.googleReviewsScore || 0,
    googleReviewsCount: item.google_reviews_count || fallback?.googleReviewsCount || 0,
    address: item.address || fallback?.address || '',
    whatsapp: item.whatsapp || fallback?.whatsapp || '',
    imageUrl: fallback?.imageUrl,
    instagram: item.instagram || fallback?.instagram,
    mapEmbedUrl: item.map_embed_url || fallback?.mapEmbedUrl,
    salesUrl: item.sales_url || fallback?.salesUrl,
    studentAreaUrl: item.student_area_url || fallback?.studentAreaUrl,
    checkoutUrl: item.checkout_url || undefined,
    locationUrl: item.location_url || fallback?.locationUrl,
    status: item.status || fallback?.status,
    googlePlaceId: item.google_place_id || fallback?.googlePlaceId,
    googleReviews: fallback?.googleReviews,
    businessHours: item.business_hours?.length ? item.business_hours : fallback?.businessHours || [],
    galleryUrls: item.gallery_urls?.length ? item.gallery_urls : fallback?.galleryUrls || [],
    teachers: item.teachers?.length ? item.teachers : fallback?.teachers || [],
  };
}

export async function createUnit(payload: Partial<Unit>): Promise<UnitMutationResult> {
  try {
    const supabaseAdmin = await createSupabaseAdminClient();

    if (!supabaseAdmin) {
      return {
        success: false,
        error: 'Supabase admin não configurado. Verifique SUPABASE_SERVICE_ROLE_KEY.',
      };
    }

    if (!payload.name || !payload.slug) {
      return { success: false, error: 'Nome e slug são obrigatórios.' };
    }

    const id = `u-${payload.slug}`;
    const now = new Date().toISOString();

    const newUnit: UnitWritePayload = {
      id,
      slug: payload.slug,
      name: payload.name,
      city: payload.city || 'Ribeirão Preto',
      state: payload.state || 'SP',
      address: payload.address || '',
      status: payload.status || 'coming_soon',
      whatsapp: payload.whatsapp || '',
      instagram: payload.instagram || '',
      sales_url: payload.salesUrl || '',
      student_area_url: payload.studentAreaUrl || '',
      location_url: payload.locationUrl || '',
      google_place_id: payload.googlePlaceId || '',
      google_reviews_score: 0,
      google_reviews_count: 0,
      business_hours: [],
      gallery_urls: [],
      teachers: [],
      created_at: now,
      updated_at: now,
    };

    const { error } = await supabaseAdmin.from('units').insert([newUnit]);

    if (error) {
      console.warn('Erro ao criar unidade no Supabase:', error.message);
      if (error.code === '23505') {
        return { success: false, error: 'Já existe uma unidade com este slug ou ID.' };
      }
      return {
        success: false,
        error: `Não foi possível salvar no Supabase. Detalhes: ${error.message}`,
      };
    }

    return { success: true, id };
  } catch (error: unknown) {
    console.warn('Erro inesperado ao criar unidade:', error);
    return {
      success: false,
      error: `Não foi possível salvar no Supabase. Detalhes: ${getErrorMessage(error)}`,
    };
  }
}

export async function getUnits(): Promise<Unit[]> {
  try {
    const supabase = createPublicClient();

    const { data, error } = await supabase
      .from('units')
      .select('*')
      .order('evo_id', { ascending: true, nullsFirst: false })
      .order('name', { ascending: true });

    if (error) {
      console.warn('Erro ao buscar unidades do Supabase:', error.message);
      return unitsData;
    }

    if (data && data.length > 0) {
      return (data as UnitRow[]).map(mapUnitRow);
    }

    return unitsData;
  } catch (error: unknown) {
    console.warn('Erro inesperado ao buscar unidades:', error);
    return unitsData;
  }
}

export async function getUnitBySlug(slug: string): Promise<Unit | undefined> {
  const units = await getUnits();
  return units.find((unit) => unit.slug === slug);
}

export async function getAdminUnits(): Promise<Unit[]> {
  try {
    const supabaseAdmin = await createSupabaseAdminClient();

    if (!supabaseAdmin) {
      return unitsData;
    }

    const { data, error } = await supabaseAdmin
      .from('units')
      .select('*')
      .order('evo_id', { ascending: true, nullsFirst: false })
      .order('name', { ascending: true });

    if (error) {
      console.warn('Erro ao buscar unidades do Supabase (Admin):', error.message);
      return unitsData;
    }

    if (data && data.length > 0) {
      return (data as UnitRow[]).map(mapUnitRow);
    }

    return unitsData;
  } catch (error: unknown) {
    console.warn('Erro inesperado ao buscar unidades (Admin):', error);
    return unitsData;
  }
}

export async function getAdminUnitBySlug(slug: string): Promise<Unit | undefined> {
  const units = await getAdminUnits();
  return units.find((unit) => unit.slug === slug);
}

export async function updateUnit(
  id: string,
  payload: Partial<Unit>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabaseAdmin = await createSupabaseAdminClient();

    if (!supabaseAdmin) {
      return {
        success: false,
        error: 'Supabase admin não configurado. Verifique SUPABASE_SERVICE_ROLE_KEY.',
      };
    }

    const updates: UnitWritePayload = {
      updated_at: new Date().toISOString(),
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

    const { error } = await supabaseAdmin.from('units').update(updates).eq('id', id);

    if (error) {
      console.warn('Erro ao atualizar unidade no Supabase:', error.message);
      return {
        success: false,
        error: `Não foi possível salvar no Supabase. Verifique políticas/RLS ou chave server-side. Detalhes: ${error.message}`,
      };
    }

    return { success: true };
  } catch (error: unknown) {
    console.warn('Erro inesperado ao atualizar unidade:', error);
    return {
      success: false,
      error: `Não foi possível salvar no Supabase. Verifique políticas/RLS ou chave server-side. Detalhes: ${getErrorMessage(error)}`,
    };
  }
}
