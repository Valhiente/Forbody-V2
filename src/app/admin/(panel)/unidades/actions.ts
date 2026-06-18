'use server'

import { createUnit } from '@/services/units.service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function trimText(text: any): string {
  if (typeof text !== 'string') return '';
  return text.trim();
}

function normalizeUrl(url: any): string {
  if (typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (trimmed === '#' || trimmed === '') return '';
  return trimmed;
}

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export async function createUnitAction(formData: FormData) {
  const rawName = trimText(formData.get('name'));
  const rawSlug = trimText(formData.get('slug'));
  const city = trimText(formData.get('city')) || 'Ribeirão Preto';
  const state = trimText(formData.get('state')) || 'SP';
  const address = trimText(formData.get('address'));
  const status = trimText(formData.get('status')) || 'coming_soon';
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

  const payload = {
    name: rawName,
    slug,
    city,
    state,
    address,
    status: status as any,
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
  revalidatePath('/unidades');
  revalidatePath(`/unidades/${slug}`);
  
  if (result.id) {
    redirect(`/admin/unidades/${slug}`);
  }
  
  return { success: true };
}
