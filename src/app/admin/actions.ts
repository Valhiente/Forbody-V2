'use server';

import * as Google from '@/app/google';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

type ReviewSyncUnit = {
  id: string;
  google_place_id: string | null;
  status: string | null;
};

async function getUnitsForGoogleSync(): Promise<ReviewSyncUnit[]> {
  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('units')
    .select('id, google_place_id, status');

  if (error) {
    console.error('Erro ao buscar unidades para sincronização Google:', error.message);
    return [];
  }

  return (data || []) as ReviewSyncUnit[];
}

export async function syncAllGoogleReviews() {
  let synced = 0;
  let failed = 0;

  const units = await getUnitsForGoogleSync();

  for (const unit of units) {
    if (unit.status === 'coming_soon') continue;
    if (!unit.google_place_id) continue;

    try {
      await Google.syncGooglePlaceData(unit.id, unit.google_place_id);
      synced++;
    } catch (err) {
      console.error(`syncAllGoogleReviews error for ${unit.id}`, err);
      failed++;
    }
  }

  return {
    success: true,
    synced,
    failed,
  } as const;
}

export default syncAllGoogleReviews;

export async function triggerSyncAllGoogleReviews() {
  'use server';
  return await syncAllGoogleReviews();
}
