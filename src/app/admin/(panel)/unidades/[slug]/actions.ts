'use server'

import { updateUnit } from '@/services/units.service';
import { revalidatePath } from 'next/cache';
import type { Unit } from '@/app/index';
import { requirePermission } from '@/lib/admin-auth';

const normalizeText = (value: FormDataEntryValue | null): string | undefined => {
  if (value === null) return undefined;
  return value.toString().trim();
};

const normalizeUrl = (value: FormDataEntryValue | null): string | undefined => {
  if (value === null) return undefined;
  const trimmed = value.toString().trim();
  if (trimmed === '#' || trimmed === '') return '';
  return trimmed;
};

export async function updateUnitAction(formData: FormData) {
  await requirePermission('units.write');

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  
  if (!id || !slug) {
    return { success: false, error: 'ID e slug são obrigatórios.' };
  }

  const payload: Partial<Unit> = {
    name: normalizeText(formData.get('name')),
    city: normalizeText(formData.get('city')),
    state: normalizeText(formData.get('state')),
    address: normalizeText(formData.get('address')),
    status: (formData.get('status') as 'active' | 'coming_soon' | 'maintenance' | 'hidden') || undefined,
    whatsapp: normalizeText(formData.get('whatsapp')),
    instagram: normalizeText(formData.get('instagram')),
    salesUrl: normalizeUrl(formData.get('salesUrl')),
    studentAreaUrl: normalizeUrl(formData.get('studentAreaUrl')),
    locationUrl: normalizeUrl(formData.get('locationUrl')),
    googlePlaceId: normalizeText(formData.get('googlePlaceId')),
  };

  const result = await updateUnit(id, payload);

  if (result.success) {
    revalidatePath('/admin');
    revalidatePath('/admin/unidades');
    revalidatePath(`/admin/unidades/${slug}`);
  }

  return result;
}
