'use server'

import { googleService } from '@/services/google.service';
import { revalidatePath } from 'next/cache';
import { ActionResponse } from '@/types/api.types';

export async function handleGoogleSync(unitId: string, placeId: string, unitSlug: string): Promise<ActionResponse> {
  try {
    await googleService.syncGooglePlaceData(unitId, placeId);
    
    // Invalida o cache estático para que o site B2C e Admin mostrem a nota nova
    revalidatePath('/admin/unidades');
    revalidatePath(`/unidades/${unitSlug}`);
    
    return { success: true, message: 'Google Places sincronizado com sucesso.' };
  } catch (error: any) {
    return { success: false, message: 'Falha na sincronização com o Google.', error: error.message };
  }
}