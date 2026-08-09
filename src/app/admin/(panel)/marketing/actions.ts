'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { requirePermission } from '@/lib/admin-auth';

export type MarketingActionResult = { success: boolean; error?: string };

const marketingImagesBucket = 'marketing-images';
const maxImageSizeBytes = 10 * 1024 * 1024;

function text(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function checked(formData: FormData, name: string): boolean {
  return formData.get(name) === 'on';
}

function lines(formData: FormData, name: string): string[] {
  return text(formData.get(name)).split(/\r?\n/).map((value) => value.trim()).filter(Boolean);
}

function requiredText(formData: FormData, name: string, label: string): string {
  const value = text(formData.get(name));
  if (!value) throw new Error(`Preencha o campo \"${label}\".`);
  return value;
}

function priceText(formData: FormData, name: string, label: string): string {
  const value = requiredText(formData, name, label);
  if (!/\d/.test(value) || !/^((a partir de)\s*)?(r\$\s*)?\d{1,6}([.,]\d{2})?$/i.test(value)) {
    throw new Error(`${label} deve ser um preço válido, como R$ 99,90.`);
  }
  return value;
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

function imageFile(formData: FormData, name: string): File | null {
  const value = formData.get(name);
  if (!(value instanceof File) || value.size === 0) return null;

  const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
  if (!allowedTypes.has(value.type)) {
    throw new Error(`A imagem "${value.name}" não está em JPG, PNG, WebP ou AVIF.`);
  }
  if (value.size > maxImageSizeBytes) {
    throw new Error(`A imagem "${value.name}" ultrapassa o limite de 10MB.`);
  }
  return value;
}

async function resolveImageUrl(
  supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseAdminClient>>>,
  formData: FormData,
  fileField: string,
  urlField: string,
  removeField: string,
  storagePrefix: string,
): Promise<string | null> {
  if (checked(formData, removeField)) return null;
  const file = imageFile(formData, fileField);
  const currentUrl = text(formData.get(urlField));
  if (!file) return currentUrl || null;

  const extension = file.name.split('.').pop()?.toLowerCase() || 'webp';
  const safeName = slugFileName(file.name.replace(/\.[^.]+$/, '')) || 'imagem';
  const filePath = `${storagePrefix}/${Date.now()}-${safeName}.${extension}`;
  const { error } = await supabase.storage.from(marketingImagesBucket).upload(filePath, file, {
    cacheControl: '3600',
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(`Erro ao enviar "${file.name}": ${error.message}`);
  return supabase.storage.from(marketingImagesBucket).getPublicUrl(filePath).data.publicUrl;
}

async function marketingClient() {
  await requirePermission('marketing.write');
  const supabase = await createSupabaseAdminClient();
  if (!supabase) throw new Error('Supabase não está configurado no ambiente de produção.');
  return supabase;
}

async function finish(action: () => Promise<void>): Promise<MarketingActionResult> {
  try {
    await action();
    revalidatePath('/');
    revalidatePath('/admin/marketing');
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Erro inesperado ao salvar.' };
  }
}

export async function updateHomeContentAction(formData: FormData): Promise<MarketingActionResult> {
  return finish(async () => {
    const supabase = await marketingClient();
    const imageUrl = await resolveImageUrl(supabase, formData, 'heroImageFile', 'heroImageUrl', 'heroImageRemove', 'home/hero');
    const { error } = await supabase.from('site_marketing_sections').upsert({
      section_key: 'home_hero',
      title: requiredText(formData, 'heroTitle', 'Título principal'),
      subtitle: null,
      description: requiredText(formData, 'heroDescription', 'Texto de apoio'),
      image_url: imageUrl,
      button_label: requiredText(formData, 'heroButtonLabel', 'Texto do botão'),
      button_href: requiredText(formData, 'heroButtonHref', 'Destino do botão'),
      sort_order: 1,
      is_active: true,
      metadata: { style: 'forbody-3d' },
    }, { onConflict: 'section_key' });
    if (error) throw new Error(`Erro ao salvar Página Inicial: ${error.message}`);
  });
}

const homeCards = [
  { key: 'card_1', label: 'Estrutura', titleFallback: 'Estrutura completa', sortOrder: 11 },
  { key: 'card_2', label: 'Professores', titleFallback: 'Professores presentes', sortOrder: 21 },
  { key: 'card_3', label: 'Aulas coletivas', titleFallback: 'Aulas coletivas', sortOrder: 31 },
] as const;

export async function updateHomeCardsAction(formData: FormData): Promise<MarketingActionResult> {
  return finish(async () => {
    const supabase = await marketingClient();
    const { error: sectionError } = await supabase.from('site_marketing_sections').upsert({
      section_key: 'home_photos',
      title: 'Cards da Home',
      subtitle: 'Estrutura, Professores e Aulas coletivas',
      description: 'Imagens e textos dos três cards principais da página inicial.',
      sort_order: 2,
      is_active: true,
      metadata: { images_per_card: 3 },
    }, { onConflict: 'section_key' });
    if (sectionError) throw new Error(`Erro ao preparar os Cards da Home: ${sectionError.message}`);

    const unitsImageUrl = await resolveImageUrl(
      supabase,
      formData,
      'unitsCardImageFile',
      'unitsCardImageUrl',
      'unitsCardImageRemove',
      'home/photos/units-card',
    );
    const { error: unitsImageError } = await supabase.from('site_marketing_items').upsert({
      section_key: 'home_photos',
      item_key: 'main',
      title: 'Nossas unidades',
      description: 'Imagem de fundo do card que lista as unidades na Home.',
      image_url: unitsImageUrl,
      sort_order: 1,
      is_active: Boolean(unitsImageUrl),
      metadata: { type: 'units_card_background' },
    }, { onConflict: 'section_key,item_key' });
    if (unitsImageError) throw new Error(`Erro ao salvar a imagem de Nossas unidades: ${unitsImageError.message}`);

    for (const [cardIndex, card] of homeCards.entries()) {
      const title = requiredText(formData, `${card.key}_title`, `Título de ${card.label}`) || card.titleFallback;
      const description = requiredText(formData, `${card.key}_description`, `Descrição de ${card.label}`);

      for (let slot = 1; slot <= 3; slot += 1) {
        const itemKey = slot === 1 ? card.key : `${card.key}_${slot}`;
        const fieldPrefix = `${card.key}_image_${slot}`;
        const imageUrl = await resolveImageUrl(
          supabase,
          formData,
          `${fieldPrefix}_file`,
          `${fieldPrefix}_url`,
          `${fieldPrefix}_remove`,
          `home/photos/${card.key}`,
        );
        const { error } = await supabase.from('site_marketing_items').upsert({
          section_key: 'home_photos',
          item_key: itemKey,
          title,
          description: slot === 1 ? description : '',
          image_url: imageUrl,
          sort_order: card.sortOrder + slot - 1,
          is_active: Boolean(imageUrl),
          metadata: { type: 'home_card_image', card: card.label, slot },
        }, { onConflict: 'section_key,item_key' });
        if (error) throw new Error(`Erro ao salvar ${card.label}, imagem ${slot}: ${error.message}`);
      }
      revalidatePath(`/admin/marketing/cards#card-${cardIndex + 1}`);
    }
  });
}

export async function updatePlansAction(formData: FormData): Promise<MarketingActionResult> {
  return finish(async () => {
    const supabase = await marketingClient();
    const { error: sectionError } = await supabase.from('site_marketing_sections').upsert({
      section_key: 'home_plans',
      title: requiredText(formData, 'plansTitle', 'Título da seção de planos'),
      subtitle: 'Planos Forbody',
      description: requiredText(formData, 'plansDescription', 'Descrição da seção de planos'),
      button_label: requiredText(formData, 'plansButtonLabel', 'Texto do botão dos planos'),
      button_href: requiredText(formData, 'plansButtonHref', 'Destino do botão dos planos'),
      sort_order: 3,
      is_active: true,
      metadata: {},
    }, { onConflict: 'section_key' });
    if (sectionError) throw new Error(`Erro ao salvar a seção de planos: ${sectionError.message}`);

    const planConfigs = [
      { key: 'red', featured: false, order: 1 },
      { key: 'black', featured: true, order: 2 },
    ] as const;
    for (const plan of planConfigs) {
      const { error } = await supabase.from('site_plans').upsert({
        plan_key: plan.key,
        name: requiredText(formData, `${plan.key}Name`, `Nome do plano ${plan.key.toUpperCase()}`),
        price_label: priceText(formData, `${plan.key}Price`, `Preço do plano ${plan.key.toUpperCase()}`),
        description: requiredText(formData, `${plan.key}Description`, `Descrição do plano ${plan.key.toUpperCase()}`),
        badge: text(formData.get(`${plan.key}Badge`)),
        benefits: (() => {
          const benefits = lines(formData, `${plan.key}Features`);
          if (benefits.length === 0) throw new Error(`Informe ao menos um benefício do plano ${plan.key.toUpperCase()}.`);
          return benefits;
        })(),
        is_featured: plan.featured,
        is_active: true,
        sort_order: plan.order,
      }, { onConflict: 'plan_key' });
      if (error) throw new Error(`Erro ao salvar o plano ${plan.key.toUpperCase()}: ${error.message}`);
    }
  });
}

export async function updatePromotionsAction(formData: FormData): Promise<MarketingActionResult> {
  return finish(async () => {
    const supabase = await marketingClient();
    const isActive = checked(formData, 'promotionActive');
    const imageUrl = await resolveImageUrl(
      supabase,
      formData,
      'promotionImageFile',
      'promotionImageUrl',
      'promotionImageRemove',
      'home/promotions',
    );
    const title = isActive
      ? requiredText(formData, 'promotionTitle', 'Título da promoção')
      : text(formData.get('promotionTitle'));
    const description = isActive
      ? requiredText(formData, 'promotionDescription', 'Descrição da promoção')
      : text(formData.get('promotionDescription'));
    const buttonLabel = isActive
      ? requiredText(formData, 'promotionButtonLabel', 'Texto do botão da promoção')
      : text(formData.get('promotionButtonLabel'));

    const { error } = await supabase.from('site_marketing_sections').upsert({
      section_key: 'home_promotion',
      title,
      subtitle: text(formData.get('promotionEyebrow')),
      description,
      image_url: imageUrl,
      button_label: buttonLabel,
      button_href: text(formData.get('promotionButtonHref')) || '/unidades',
      sort_order: 40,
      is_active: isActive,
      metadata: { type: 'home_promotion' },
    }, { onConflict: 'section_key' });
    if (error) throw new Error(`Erro ao salvar Promoções: ${error.message}`);
  });
}

export async function updatePartnersAction(formData: FormData): Promise<MarketingActionResult> {
  return finish(async () => {
    const supabase = await marketingClient();
    const { error: sectionError } = await supabase.from('site_marketing_sections').upsert({
      section_key: 'home_suppliers',
      title: 'Empresas parceiras',
      subtitle: 'Parceiros',
      description: 'Marcas que fazem parte da estrutura Forbody.',
      sort_order: 50,
      is_active: true,
      metadata: {},
    }, { onConflict: 'section_key' });
    if (sectionError) throw new Error(`Erro ao preparar Parceiros: ${sectionError.message}`);

    for (let slot = 1; slot <= 4; slot += 1) {
      const prefix = `partner_${slot}`;
      const logoUrl = await resolveImageUrl(supabase, formData, `${prefix}_logo_file`, `${prefix}_logo_url`, `${prefix}_logo_remove`, `home/fornecedores`);
      const name = text(formData.get(`${prefix}_name`));
      const href = text(formData.get(`${prefix}_href`));
      const isActive = checked(formData, `${prefix}_active`) && Boolean(name && href && logoUrl);
      const { error } = await supabase.from('site_marketing_items').upsert({
        section_key: 'home_suppliers',
        item_key: `fornecedor_${slot}`,
        title: name,
        description: href,
        image_url: logoUrl,
        sort_order: slot,
        is_active: isActive,
        metadata: { type: 'partner' },
      }, { onConflict: 'section_key,item_key' });
      if (error) throw new Error(`Erro ao salvar o parceiro ${slot}: ${error.message}`);
    }
  });
}
