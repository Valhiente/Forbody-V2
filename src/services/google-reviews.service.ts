import { createClient } from '@/lib/supabase/server';

export type GooglePlaceReview = {
  author_name?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
  time?: number;
};

export type UnitGoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription?: string;
  time?: number;
};

function getGooglePlacesApiKey() {
  return (
    process.env.GOOGLE_PLACES_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    ''
  );
}

function normalizePositiveReviews(reviews: GooglePlaceReview[] = []): UnitGoogleReview[] {
  return reviews
    .filter((review) => (review.rating || 0) >= 4 && Boolean(review.text?.trim()))
    .sort((a, b) => (b.time || 0) - (a.time || 0))
    .slice(0, 5)
    .map((review) => ({
      authorName: review.author_name || 'Cliente Google',
      rating: review.rating || 5,
      text: review.text?.trim() || '',
      relativeTimeDescription: review.relative_time_description,
      time: review.time,
    }));
}

export async function fetchGooglePlaceReviews(placeId?: string | null) {
  const GOOGLE_API_KEY = getGooglePlacesApiKey();

  if (!GOOGLE_API_KEY || !placeId) {
    return {
      rating: null,
      reviewsCount: null,
      reviews: [] as UnitGoogleReview[],
      hasApiKey: Boolean(GOOGLE_API_KEY),
    };
  }

  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'rating,user_ratings_total,reviews,url',
    key: GOOGLE_API_KEY,
    language: 'pt-BR',
    reviews_sort: 'newest',
  });

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    if (data.status !== 'OK') {
      return {
        rating: null,
        reviewsCount: null,
        reviews: [] as UnitGoogleReview[],
        hasApiKey: true,
      };
    }

    const { rating, user_ratings_total, reviews = [] } = data.result;

    return {
      rating: typeof rating === 'number' ? rating : null,
      reviewsCount: typeof user_ratings_total === 'number' ? user_ratings_total : null,
      reviews: normalizePositiveReviews(reviews),
      hasApiKey: true,
    };
  } catch {
    return {
      rating: null,
      reviewsCount: null,
      reviews: [] as UnitGoogleReview[],
      hasApiKey: true,
    };
  }
}

export async function syncGooglePlaceData(unitId: string, placeId: string) {
  const googleData = await fetchGooglePlaceReviews(placeId);

  if (!googleData.rating && !googleData.reviewsCount) {
    return googleData;
  }

  const supabase = await createClient();

  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  const { error } = await supabase
    .from('units')
    .update({
      google_reviews_score: googleData.rating,
      google_reviews_count: googleData.reviewsCount,
      updated_at: new Date().toISOString(),
    })
    .eq('id', unitId);

  if (error) {
    throw new Error(`Erro ao salvar no Supabase: ${error.message}`);
  }

  return googleData;
}