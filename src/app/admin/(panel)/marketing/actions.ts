'use server'

import { revalidatePath } from 'next/cache';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

type ActionResult = {
  success: boolean;
  error?: string;
};

function text(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function checkbox(value: FormDataEntryValue | null): boolean {
  return value === 'on';
}

function lines(value: FormDataEntryValue | null): string[] {
  return text(value)
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function paymentOptions(formData: FormData, key: string) {
  return [
    { label: 'Mensal', price: text(formData.get(`${key}Monthly`)) },
    { label: 'Recorrente', price: text(formData.get(`${key}Recurring`)) },
    { label: '12 meses', price: text(formData.get(`${key}TwelveMonths`)) },
  ].filter((item) => item.price);
}

async function upsertSection(supabase: any, payload: Record<string, unknown>) {
  const { error } = await supabase
    .from('site_marketing_sections')
    .upsert(payload, { onConflict: 'section_key' });

  if (error) {
    throw new Error(error.message);
  }
}

async function upsertItem(supabase: any, payload: Record<string, unknown>) {
  const { error } = await supabase
    .from('site_marketing_items')
    .upsert(payload, { onConflict: 'section_key,item_key' });

  if (error) {
    throw new Error(error.message);
  }
}

async function upsertPlan(supabase: any, payload: Record<string, unknown>) {
  const { error } = await supabase
    .from('site_plans')
    .upsert(payload, { onConflict: 'plan_key' });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateMarketingManagerAction(formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase não está configurado no ambiente. Verifique as variáveis NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.',
    };
  }

  try {
    await upsertSection(supabase, {
      section_key: 'home_hero',
      title: text(formData.get('heroTitle')),
      subtitle: text(formData.get('heroSubtitle')),
      description: text(formData.get('heroDescription')),
      image_url: text(formData.get('heroImageUrl')) || null,
      button_label: text(formData.get('heroButtonLabel')),
      button_href: text(formData.get('heroButtonHref')),
      sort_order: 1,
      is_active: true,
    });

    await upsertSection(supabase, {
      section_key: 'home_plans',
      title: text(formData.get('plansTitle')),
      subtitle: text(formData.get('plansSubtitle')),
      description: text(formData.get('plansDescription')),
      button_label: text(formData.get('plansButtonLabel')),
      button_href: text(formData.get('plansButtonHref')),
      sort_order: 2,
      is_active: true,
    });

    const photos = [
      { key: 'main', field: 'photoMain', title: 'Foto principal', order: 1 },
      { key: 'card_1', field: 'photoCard1', title: 'Foto card 1', order: 2 },
      { key: 'card_2', field: 'photoCard2', title: 'Foto card 2', order: 3 },
      { key: 'card_3', field: 'photoCard3', title: 'Foto card 3', order: 4 },
    ];

    await Promise.all(
      photos.map((photo) =>
        upsertItem(supabase, {
          section_key: 'home_photos',
          item_key: photo.key,
          title: photo.title,
          image_url: text(formData.get(photo.field)) || null,
          sort_order: photo.order,
          is_active: true,
        })
      )
    );

    await upsertItem(supabase, {
      section_key: 'home_promotions',
      item_key: 'main',
      title: text(formData.get('promoTitle')),
      description: text(formData.get('promoDescription')),
      badge: text(formData.get('promoValue')),
      is_active: checkbox(formData.get('promoActive')),
      sort_order: 1,
    });

    await upsertPlan(supabase, {
      plan_key: 'red',
      name: text(formData.get('redName')),
      price_label: text(formData.get('redPrice')),
      description: text(formData.get('redDescription')),
      badge: text(formData.get('redBadge')),
      benefits: lines(formData.get('redBenefits')),
      payment_options: paymentOptions(formData, 'red'),
      is_featured: false,
      is_active: true,
      sort_order: 1,
    });

    await upsertPlan(supabase, {
      plan_key: 'black',
      name: text(formData.get('blackName')),
      price_label: text(formData.get('blackPrice')),
      description: text(formData.get('blackDescription')),
      badge: text(formData.get('blackBadge')),
      benefits: lines(formData.get('blackBenefits')),
      payment_options: paymentOptions(formData, 'black'),
      is_featured: true,
      is_active: true,
      sort_order: 2,
    });

    revalidatePath('/');
    revalidatePath('/admin/marketing');

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Não foi possível salvar as alterações de marketing.',
    };
  }
}
