import { createClient } from './server';

/**
 * INTEGRAÇÃO GOOGLE PLACES API
 * Arquitetura projetada para SEO Local e Prova Social Automática.
 */
export async function syncGooglePlaceData(unitId: string, placeId: string) {
  const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!GOOGLE_API_KEY) {
    return {
      rating: null,
      reviewsCount: null,
      reviews: [],
    };
  }

  // 1. Fetch de Dados da API do Google
  // Previne estourar limite da API delegando a responsabilidade de cache para o fetch
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${GOOGLE_API_KEY}&language=pt-BR`,
    { next: { revalidate: 3600 } }
  );

  const data = await response.json();

  if (data.status !== 'OK') {
    return {
      rating: null,
      reviewsCount: null,
      reviews: [],
    };
  }

  const { rating, user_ratings_total, reviews = [] } = data.result;

  // 2. Sincronização com Supabase (Persistência)
  const supabase = await createClient();
  const { error } = await supabase
    .from('units')
    .update({
      google_rating: rating,
      google_reviews_count: user_ratings_total,
      updated_at: new Date().toISOString(),
    })
    .eq('id', unitId);

  if (error) {
    throw new Error(`Erro ao salvar no Supabase: ${error.message}`);
  }

  return {
    rating,
    reviewsCount: user_ratings_total,
    reviews,
  };
}
