'use server'

import type { Unit } from '@/app/index';
import { createUnit } from '@/services/units.service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function trimText(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeUrl(value: FormDataEntryValue | null): string {
  const trimmed = trimText(value);
  return trimmed === '#' ? '' : trimmed;
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function normalizeStatus(value: string): NonNullable<Unit['status']> {
  const validStatuses: NonNullable<Unit['status']>[] = ['active', 'coming_soon', 'maintenance', 'hidden'];
  return validStatuses.includes(value as NonNullable<Unit['status']>)
    ? (value as NonNullable<Unit['status']>)
    : 'coming_soon';
}

export async function createUnitAction(formData: FormData) {
  const rawName = trimText(formData.get('name'));
  const rawSlug = trimText(formData.get('slug'));
  const city = trimText(formData.get('city')) || 'Ribeirão Preto';
  const state = trimText(formData.get('state')) || 'SP';
  const address = trimText(formData.get('address'));
  const status = normalizeStatus(trimText(formData.get('status')));
  const whatsapp = trimText(formData.get('whatsapp'));
  const instagram = trimText(formData.get('instagram'));
  const salesUrl = normalizeUrl(formData.get('salesUrl'));
  const studentAreaUrl = normalizeUrl(formData.get('studentAreaUrl'));
  const locationUrl = normalizeUrl(formData.get('locationUrl'));
  const googlePlaceId = trimText(formData.get('googlePlaceId'));

  if (!rawName) {
    return { success: false, error: 'O nome da unidade é obrigatório.' };
  }

  const slug = rawSlug ? slugify(rawSlug) : slugify(rawName);

  if (!slug) {
    return { success: false, error: 'O slug é obrigatório e não pôde ser gerado automaticamente.' };
  }

  const payload: Partial<Unit> = {
    name: rawName,
    slug,
    city,
    state,
    address,
    status,
    whatsapp,
    instagram,
    salesUrl,
    studentAreaUrl,
    locationUrl,
    googlePlaceId,
  };

  const result = await createUnit(payload);

  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath('/admin');
  revalidatePath('/admin/unidades');

  if (result.id) {
    redirect(`/admin/unidades/${slug}`);
  }

  return { success: true };
}
