'use server'

import { updateUnit } from '@/services/units.service';
import { revalidatePath } from 'next/cache';
import type { Unit } from '@/app/index';

export async function updateUnitAction(formData: FormData) {
  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  
  if (!id || !slug) {
    return { success: false, error: 'ID e slug são obrigatórios.' };
  }

  const payload: Partial<Unit> = {
    name: (formData.get('name') as string) || undefined,
    city: (formData.get('city') as string) || undefined,
    state: (formData.get('state') as string) || undefined,
    address: (formData.get('address') as string) || undefined,
    status: (formData.get('status') as 'active' | 'coming_soon' | 'maintenance' | 'hidden') || undefined,
    whatsapp: (formData.get('whatsapp') as string) || undefined,
    instagram: (formData.get('instagram') as string) || undefined,
    salesUrl: (formData.get('salesUrl') as string) || undefined,
    studentAreaUrl: (formData.get('studentAreaUrl') as string) || undefined,
    locationUrl: (formData.get('locationUrl') as string) || undefined,
    googlePlaceId: (formData.get('googlePlaceId') as string) || undefined,
  };

  const result = await updateUnit(id, payload);

  if (result.success) {
    revalidatePath('/admin');
    revalidatePath('/admin/unidades');
    revalidatePath(`/admin/unidades/${slug}`);
  }

  return result;
}
