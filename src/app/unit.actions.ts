import { unitsData } from '@/app/data';
import * as Google from '@/app/google';

export async function syncAllGoogleReviews() {
  let synced = 0;
  let failed = 0;

  for (const unit of unitsData) {
    // ignore coming_soon units
    if (unit.status === 'coming_soon') continue;
    // ignore units without googlePlaceId
    if (!unit.googlePlaceId) continue;

    try {
      await Google.syncGooglePlaceData(unit.id, unit.googlePlaceId);
      synced++;
    } catch (err) {
      // log and continue with other units
      // eslint-disable-next-line no-console
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

// Server action wrapper for client components in the admin area
export async function triggerSyncAllGoogleReviews() {
  'use server'
  return await syncAllGoogleReviews();
}