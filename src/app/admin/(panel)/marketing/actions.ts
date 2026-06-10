'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

type ActionResult = {
  success: boolean;
  error?: string;
};

type SupabaseError = {
  message: string;
};

type SupabaseWriteResult = {
  error: SupabaseError | null;
};

type SupabaseUpsertOptions = {
  onConflict?: string;
};

type SupabaseTableWriter = {
  upsert: (
    payload: Record<string, unknown>,
    options?: SupabaseUpsertOptions
  ) => Promise<SupabaseWriteResult>;
};

type SupabaseWriterClient = {
  from: (table: string) => SupabaseTableWriter;
};

type PaymentOption = {
  label: string;
  price: string;
};

const fallbackPayments = {
  red: [
    { label: 'Mensal', price: 'R$ 139,90' },
    { label: 'Recorrente', price: 'R$ 129,90' },
    { label: '12 meses', price: '12x R$ 99,90' },
  ],
  black: [
    { label: 'Mensal', price: 'R$ 149,90' },
    { label: 'Recorrente', price: 'R$ 139,90' },
    { label: '12 meses', price: '12x R$ 109,90' },
  ],
};

function text(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function textWithFallback(
  formData: FormData,
  name: string,
  fallback: string
): string {
  const value = text(formData.get(name));
  return value || fallback;
}

function checkbox(value: FormDataEntryValue | null): boolean {
  return value === 'on';
}

function lines(value: FormDataEntryValue | null, fallback: string[]): string[] {
  const parsed = text(value)
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  return parsed.length > 0 ? parsed : fallback;
}

function paymentOptions(
  formData: FormData,
  key: 'red' | 'black',
  fallback: PaymentOption[]
): PaymentOption[] {
  const parsed = [
    { label: 'Mensal', price: text(formData.get(`${key}Monthly`)) },
    { label: 'Recorrente', price: text(formData.get(`${key}Recurring`)) },
    { label: '12 meses', price: text(formData.get(`${key}TwelveMonths`)) },
  ].filter((item) => item.price);

  return parsed.length > 0 ? parsed : fallback;
}

async function upsertSection(
  supabase: SupabaseWriterClient,
  payload: Record<string, unknown>
) {
  const { error } = await supabase
    .from('site_marketing_sections')
    .upsert(payload, { onConflict: 'section_key' });

  if (error) {
    throw new Error(error.message);
  }
}

async function upsertItem(
  supabase: SupabaseWriterClient,
  payload: Record<string, unknown>
) {
  const { error } = await supabase
    .from('site_marketing_items')
    .upsert(payload, { onConflict: 'section_key,item_key' });

  if (error) {
    throw new Error(error.message);
  }
}

async function upsertPlan(
  supabase: SupabaseWriterClient,
  payload: Record<string, unknown>
) {
  const { error } = await supabase
    .from('site_plans')
    .upsert(payload, { onConflict: 'plan_key' });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateMarketingManagerAction(
  formData: FormData
): Promise<ActionResult> {
  const supabase = (await createSupabaseAdminClient()) as SupabaseWriterClient | null;

  if (!supabase) {
    return {
      success: false,
      error:
        'Supabase não está configurado no ambiente. Verifique as variáveis NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.',
    };
  }

  try {
    await upsertSection(supabase, {
      section_key: 'home_hero',
      title: textWithFallback(
        formData,
        'heroTitle',
        'Forbody, feita para cada etapa da sua vida.'
      ),
      subtitle: textWithFallback(formData, 'heroSubtitle', 'Forbody Academia'),
      description: textWithFallback(
        formData,
        'heroDescription',
        'Na Forbody, ajudamos você a conquistar seus objetivos, porque cada conquista sua também é nossa.'
      ),
      image_url: text(formData.get('heroImageUrl')) || null,
      button_label: textWithFallback(formData, 'heroButtonLabel', 'Escolher unidade'),
      button_href: '/unidades',
      sort_order: 1,
      is_active: true,
    });

    await upsertSection(supabase, {
      section_key: 'home_photos',
      title: 'Fotos da Home',
      subtitle: 'Imagens',
      description: 'Imagens usadas nos blocos visuais da Home.',
      sort_order: 2,
      is_active: true,
    });

    await upsertSection(supabase, {
      section_key: 'home_plans',
      title: textWithFallback(
        formData,
        'plansTitle',
        'Escolha o plano que combina com sua rotina.'
      ),
      subtitle: 'Planos Forbody',
      description: textWithFallback(
        formData,
        'plansDescription',
        'Dois caminhos para começar: Red para quem quer musculação com apoio técnico, e Black para quem quer a experiência completa da Forbody.'
      ),
      button_label: textWithFallback(formData, 'plansButtonLabel', 'Ver planos'),
      button_href: '#planos',
      sort_order: 3,
      is_active: true,
    });

    await upsertSection(supabase, {
      section_key: 'home_promotions',
      title: textWithFallback(formData, 'promoTitle', 'Promoções'),
      subtitle: 'Promoções',
      description: text(formData.get('promoDescription')),
      sort_order: 4,
      is_active: checkbox(formData.get('promoActive')),
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
      name: textWithFallback(formData, 'redName', 'Plano Red'),
      price_label: textWithFallback(formData, 'redPrice', 'A partir de R$ 99,90'),
      description: textWithFallback(
        formData,
        'redDescription',
        'Musculação com apoio técnico e acesso ao aplicativo.'
      ),
      badge: textWithFallback(formData, 'redBadge', 'Melhor entrada'),
      benefits: lines(formData.get('redBenefits'), [
        'Musculação',
        'Treino personalizado com apoio técnico dos professores',
        'Acesso ao aplicativo',
      ]),
      payment_options: paymentOptions(formData, 'red', fallbackPayments.red),
      is_featured: false,
      is_active: true,
      sort_order: 1,
    });

    await upsertPlan(supabase, {
      plan_key: 'black',
      name: textWithFallback(formData, 'blackName', 'Plano Black'),
      price_label: textWithFallback(
        formData,
        'blackPrice',
        'A partir de R$ 109,90'
      ),
      description: textWithFallback(
        formData,
        'blackDescription',
        'Plano completo para quem quer aproveitar mais a Forbody.'
      ),
      badge: textWithFallback(formData, 'blackBadge', 'Mais completo'),
      benefits: lines(formData.get('blackBenefits'), [
        'Musculação',
        'Aulas coletivas',
        'Avaliação com bioimpedância a cada 90 dias',
        '5 convidados por mês',
        'Acesso às outras unidades',
      ]),
      payment_options: paymentOptions(formData, 'black', fallbackPayments.black),
      is_featured: true,
      is_active: true,
      sort_order: 2,
    });

    revalidatePath('/');
    revalidatePath('/admin/marketing');

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Não foi possível salvar as alterações de marketing.';

    return {
      success: false,
      error: message,
    };
  }
}