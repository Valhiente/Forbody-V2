'use server';

import * as Google from '@/app/google';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { requirePermission } from '@/lib/admin-auth';

type ReviewSyncUnit = {
  id: string;
  google_place_id: string | null;
  status: string | null;
};

async function getUnitsForGoogleSync(): Promise<ReviewSyncUnit[]> {
  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    throw new Error('Configuração administrativa do Supabase indisponível.');
  }

  const { data, error } = await supabase
    .from('units')
    .select('id, google_place_id, status');

  if (error) {
    throw new Error(`Não foi possível carregar as unidades: ${error.message}`);
  }

  return (data || []) as ReviewSyncUnit[];
}

export async function syncAllGoogleReviews() {
  await requirePermission('reviews.write');

  let synced = 0;
  let failed = 0;

  const units = await getUnitsForGoogleSync();
  const eligibleUnits = units.filter(
    (unit) => unit.status !== 'coming_soon' && Boolean(unit.google_place_id),
  );

  for (const unit of eligibleUnits) {
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
    success: failed === 0,
    synced,
    failed,
    total: eligibleUnits.length,
  } as const;
}

export default syncAllGoogleReviews;

export async function triggerSyncAllGoogleReviews() {
  'use server';
  return await syncAllGoogleReviews();
}
