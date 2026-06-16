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

type SupabaseUploadResult = {
  data: { path: string } | null;
  error: SupabaseError | null;
};

type SupabasePublicUrlResult = {
  data: { publicUrl: string };
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

type SupabaseStorageBucket = {
  upload: (
    path: string,
    file: File,
    options?: {
      cacheControl?: string;
      contentType?: string;
      upsert?: boolean;
    }
  ) => Promise<SupabaseUploadResult>;
  getPublicUrl: (path: string) => SupabasePublicUrlResult;
};

type SupabaseWriterClient = {
  from: (table: string) => SupabaseTableWriter;
  storage: {
    from: (bucket: string) => SupabaseStorageBucket;
  };
};

type PaymentOption = {
  label: string;
  price: string;
};

const marketingImagesBucket = 'marketing-images';
const maxMarketingImageSizeMb = 8;
const maxMarketingImageSizeBytes = maxMarketingImageSizeMb * 1024 * 1024;

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

function slugFileName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function formatFileSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')}MB`;
}

function imageFile(formData: FormData, name: string): File | null {
  const value = formData.get(name);

  if (!(value instanceof File) || value.size === 0) {
    return null;
  }

  if (!value.type.startsWith('image/')) {
    throw new Error('Envie apenas arquivos de imagem nos campos de upload.');
  }

  if (value.size > maxMarketingImageSizeBytes) {
    throw new Error(
      `A imagem "${value.name}" tem ${formatFileSize(value.size)} e ultrapassa o limite de ${maxMarketingImageSizeMb}MB. Comprima a imagem ou envie em WebP antes de salvar.`
    );
  }

  return value;
}

async function resolveImageUrl(
  supabase: SupabaseWriterClient,
  formData: FormData,
  fileField: string,
  urlField: string,
  storagePrefix: string
): Promise<string | null> {
  const file = imageFile(formData, fileField);
  const manualUrl = text(formData.get(urlField));

  if (!file) {
    return manualUrl || null;
  }

  const extension = file.name.includes('.') ? file.name.split('.').pop() : 'webp';
  const safeName = slugFileName(file.name.replace(/\.[^.]+$/, '')) || 'imagem';
  const filePath = `${storagePrefix}/${Date.now()}-${safeName}.${extension}`;

  const { error } = await supabase.storage.from(marketingImagesBucket).upload(filePath, file, {
    cacheControl: '3600',
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(`Erro ao enviar imagem para o Supabase Storage: ${error.message}`);
  }

  const { data } = supabase.storage.from(marketingImagesBucket).getPublicUrl(filePath);

  return data.publicUrl;
}

async function upsertSection(
  supabase: SupabaseWriterClient,
  payload: Record<string, unknown>
) {
  const { error } = await supabase
    .from('site_marketing_sections')
    .upsert(payload, { onConflict: 'section_key' });

  if (error) {
    throw new Error(`Erro em site_marketing_sections: ${error.message}`);
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
    throw new Error(`Erro em site_marketing_items: ${error.message}`);
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
    throw new Error(`Erro em site_plans: ${error.message}`);
  }
}

export async function updateMarketingManagerAction(
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = (await createSupabaseAdminClient()) as SupabaseWriterClient | null;

    if (!supabase) {
      return {
        success: false,
        error:
          'Supabase não está configurado na Vercel. Verifique NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no projeto correto.',
      };
    }

    const heroImageUrl = await resolveImageUrl(
      supabase,
      formData,
      'heroImageFile',
      'heroImageUrl',
      'home/hero'
    );

    const carouselSlides = [
      {
        key: 'slide_1',
        fileField: 'heroSlide1File',
        urlField: 'heroSlide1Url',
        titleField: 'heroSlide1Title',
        fallbackTitle: 'FORBODY ACADEMIA',
        descriptionField: 'heroSlide1Description',
        fallbackDescription: 'Treino, estrutura e experiência premium em um só lugar.',
        order: 1,
      },
      {
        key: 'slide_2',
        fileField: 'heroSlide2File',
        urlField: 'heroSlide2Url',
        titleField: 'heroSlide2Title',
        fallbackTitle: 'PLANOS RED E BLACK',
        descriptionField: 'heroSlide2Description',
        fallbackDescription: 'Escolha o plano que combina com sua rotina.',
        order: 2,
      },
      {
        key: 'slide_3',
        fileField: 'heroSlide3File',
        urlField: 'heroSlide3Url',
        titleField: 'heroSlide3Title',
        fallbackTitle: 'VENHA TREINAR',
        descriptionField: 'heroSlide3Description',
        fallbackDescription: 'A Forbody feita para cada etapa da sua vida.',
        order: 3,
      },
    ];

    const photos = [
      {
        key: 'main',
        fileField: 'photoMainFile',
        urlField: 'photoMain',
        title: 'Foto principal',
        order: 10,
      },
      {
        key: 'card_1',
        fileField: 'photoCard1File',
        urlField: 'photoCard1',
        title: 'Foto card 1',
        order: 11,
      },
      {
        key: 'card_2',
        fileField: 'photoCard2File',
        urlField: 'photoCard2',
        title: 'Foto card 2',
        order: 12,
      },
      {
        key: 'card_3',
        fileField: 'photoCard3File',
        urlField: 'photoCard3',
        title: 'Foto card 3',
        order: 13,
      },
    ];

    const resolvedSlides = await Promise.all(
      carouselSlides.map(async (slide) => ({
        ...slide,
        imageUrl: await resolveImageUrl(
          supabase,
          formData,
          slide.fileField,
          slide.urlField,
          `home/carousel/${slide.key}`
        ),
      }))
    );

    const resolvedPhotos = await Promise.all(
      photos.map(async (photo) => ({
        ...photo,
        imageUrl: await resolveImageUrl(
          supabase,
          formData,
          photo.fileField,
          photo.urlField,
          `home/photos/${photo.key}`
        ),
      }))
    );

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
      image_url: heroImageUrl,
      button_label: textWithFallback(formData, 'heroButtonLabel', 'Escolher unidade'),
      button_href: '/unidades',
      sort_order: 1,
      is_active: true,
      metadata: { style: 'forbody-3d', carousel: true },
    });

    await upsertSection(supabase, {
      section_key: 'home_photos',
      title: 'Fotos da Home',
      subtitle: 'Imagens',
      description: 'Imagens usadas nos blocos visuais da Home.',
      sort_order: 2,
      is_active: true,
      metadata: {},
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
      metadata: {},
    });

    await upsertSection(supabase, {
      section_key: 'home_promotions',
      title: textWithFallback(formData, 'promoTitle', 'Promoções'),
      subtitle: 'Promoções',
      description: text(formData.get('promoDescription')),
      sort_order: 4,
      is_active: checkbox(formData.get('promoActive')),
      metadata: {},
    });

    await Promise.all(
      resolvedSlides.map((slide) =>
        upsertItem(supabase, {
          section_key: 'home_hero',
          item_key: slide.key,
          title: textWithFallback(formData, slide.titleField, slide.fallbackTitle),
          description: textWithFallback(formData, slide.descriptionField, slide.fallbackDescription),
          image_url: slide.imageUrl,
          sort_order: slide.order,
          is_active: true,
          metadata: { type: 'hero_slide' },
        })
      )
    );

    await Promise.all(
      resolvedPhotos.map((photo) =>
        upsertItem(supabase, {
          section_key: 'home_photos',
          item_key: photo.key,
          title: photo.title,
          image_url: photo.imageUrl,
          sort_order: photo.order,
          is_active: true,
          metadata: { type: 'home_photo' },
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
      metadata: {},
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
  } catch (error) {
    console.error('Erro ao salvar marketing:', error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao salvar o marketing. Verifique Supabase, Storage e schema das tabelas.',
    };
  }
}
