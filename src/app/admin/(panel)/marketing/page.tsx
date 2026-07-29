import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { updateMarketingManagerAction } from './actions';
import { MarketingUploadGuard } from './MarketingUploadGuard';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  textarea?: boolean;
  helper?: string;
  defaultValue?: string;
};

type FileInputProps = {
  label: string;
  name: string;
  urlName: string;
  helper?: string;
  currentUrl?: string;
};

type SectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  open?: boolean;
};

type MarketingPageProps = {
  searchParams?: Promise<{
    saved?: string;
    error?: string;
  }>;
};

function Input({
  label,
  name,
  placeholder = '',
  textarea = false,
  helper,
  defaultValue,
}: InputProps) {
  const baseClassName =
    'w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 text-sm text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500';

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-semibold text-white">
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`${baseClassName} min-h-[120px] py-3`}
        />
      ) : (
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`${baseClassName} h-12`}
        />
      )}

      {helper ? <p className="text-xs leading-relaxed text-zinc-500">{helper}</p> : null}
    </div>
  );
}

function FileInput({ label, name, urlName, helper, currentUrl }: FileInputProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
      <label htmlFor={name} className="text-sm font-semibold text-white">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="block w-full cursor-pointer rounded-2xl border border-dashed border-red-600/40 bg-black px-4 py-4 text-sm text-zinc-300 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-xs file:font-black file:uppercase file:tracking-[0.14em] file:text-white hover:border-red-500"
      />

      <details className="rounded-xl border border-zinc-800 bg-black/30 px-3 py-2">
        <summary className="cursor-pointer text-xs font-semibold text-zinc-400">
          Usar ou conferir endereço da imagem
        </summary>
        <input
          name={urlName}
          type="url"
          defaultValue={currentUrl}
          placeholder="https://..."
          className="mt-3 h-11 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-xs text-zinc-300 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
        />
      </details>

      <p className="text-xs leading-relaxed text-zinc-500">
        {helper ??
          'Envie JPG, PNG, WebP ou AVIF. Limite: 10MB por imagem e 50MB por salvamento. Para carrossel, cada slide precisa ter até 10MB; se passar disso, baixe do Canva em WebP/JPG e comprima antes de enviar.'}
      </p>
    </div>
  );
}

function Section({ title, description, children, open = false }: SectionProps) {
  return (
    <details open={open} className="group rounded-3xl border border-zinc-800 bg-zinc-950/90 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <summary className="cursor-pointer list-none p-6 sm:p-8">
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-2">
            <h2 className="text-xl font-black tracking-[-0.03em] text-white sm:text-2xl">{title}</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-400">{description}</p>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-zinc-400 group-open:text-red-400">
            Abrir
          </span>
        </div>
      </summary>
      <div className="grid gap-5 border-t border-zinc-800 p-6 sm:p-8">{children}</div>
    </details>
  );
}

export default async function MarketingPage({ searchParams }: MarketingPageProps) {
  const admin = await requirePermission('marketing.read');
  const canWrite = hasAdminPermission(admin, 'marketing.write');
  const params = await searchParams;
  const saved = params?.saved === '1';
  const error = params?.error;
  const supabase = await createSupabaseAdminClient();
  const [sectionsResult, itemsResult, plansResult] = supabase
    ? await Promise.all([
        supabase.from('site_marketing_sections').select('*'),
        supabase.from('site_marketing_items').select('*'),
        supabase.from('site_plans').select('*'),
      ])
    : [{ data: [] }, { data: [] }, { data: [] }];
  const sections = sectionsResult.data ?? [];
  const items = itemsResult.data ?? [];
  const plans = plansResult.data ?? [];
  const section = (key: string) => sections.find((item) => item.section_key === key);
  const item = (sectionKey: string, itemKey: string) =>
    items.find((entry) => entry.section_key === sectionKey && entry.item_key === itemKey);
  const plan = (key: string) => plans.find((entry) => entry.plan_key === key);
  const hero = section('home_hero');
  const photos = (key: string) => item('home_photos', key);
  const slide = (key: string) => item('home_hero', key);
  const plansSection = section('home_plans');
  const promotion = section('home_promotions');
  const promotionItem = item('home_promotions', 'main');
  const red = plan('red');
  const black = plan('black');

  return (
    <div className="min-h-screen bg-black px-4 py-8 sm:px-6 lg:px-10">
      <form
        data-marketing-form="true"
        action={async (formData: FormData) => {
          'use server';

          const result = await updateMarketingManagerAction(formData);

          if (!result.success) {
            redirect(`/admin/marketing?error=${encodeURIComponent(result.error ?? 'Erro ao salvar Marketing.')}`);
          }

          redirect('/admin/marketing?saved=1');
        }}
        className="mx-auto max-w-6xl space-y-8"
      >
        <MarketingUploadGuard />
        {!canWrite && (
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-200">
            Modo visualização: seu perfil pode consultar o Marketing, mas não salvar alterações.
          </div>
        )}
        <fieldset disabled={!canWrite} className="contents">

        {saved ? (
          <div className="rounded-2xl border border-green-500/40 bg-green-500/10 p-4 text-sm font-semibold text-green-200">
            Marketing salvo com sucesso. Confira a Home e o Supabase Storage.
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-sm font-semibold text-red-200">
            Erro ao salvar Marketing: {error}
          </div>
        ) : null}

        <div className="overflow-hidden rounded-[2rem] border border-red-600/20 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.16),transparent_45%),#090909] p-6 shadow-[0_0_80px_rgba(220,38,38,0.08)] sm:p-8">
          <div className="inline-flex items-center gap-3 border border-red-600/30 bg-red-600/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.32em] text-red-300">
            Gestão de Marketing
          </div>

          <h1 className="mt-5 max-w-4xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl">
            Conteúdo da página inicial
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Abra somente a seção que deseja alterar. Os valores atuais já estão preenchidos
            e campos não modificados serão preservados.
          </p>

          <p className="mt-5 text-xs text-zinc-500">
            Imagens: até 10MB cada e 50MB por salvamento. Recomendado: WebP ou JPG otimizado.
          </p>
        </div>

        <Section
          title="1. Banner principal"
          description="Essa é a primeira área que aparece para o aluno quando entra no site. Use frases curtas, fortes e diretas."
          open
        >
          <Input
            label="Texto pequeno acima do título"
            name="heroSubtitle"
            defaultValue={hero?.subtitle ?? ''}
            placeholder="Ex: Forbody Academia"
            helper="Esse texto aparece acima do título principal da Home."
          />

          <Input
            label="Título principal"
            name="heroTitle"
            defaultValue={hero?.title ?? ''}
            placeholder="Ex: Forbody, feita para cada etapa da sua vida."
            helper="Principal chamada visual da Home."
          />

          <Input
            label="Texto de apoio"
            name="heroDescription"
            defaultValue={hero?.description ?? ''}
            textarea
            helper="Texto curto explicando a proposta da Forbody."
          />

          <FileInput
            label="Imagem principal do banner"
            name="heroImageFile"
            urlName="heroImageUrl"
            currentUrl={hero?.image_url ?? ''}
            helper="Escolha a imagem do computador. Limite: 10MB. Recomendado: 1920x1080 em WebP/JPG com até 2MB para carregar rápido."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            <FileInput label="Carrossel - slide 1" name="heroSlide1File" urlName="heroSlide1Url" currentUrl={slide('slide_1')?.image_url ?? ''} />
            <FileInput label="Carrossel - slide 2" name="heroSlide2File" urlName="heroSlide2Url" currentUrl={slide('slide_2')?.image_url ?? ''} />
            <FileInput label="Carrossel - slide 3" name="heroSlide3File" urlName="heroSlide3Url" currentUrl={slide('slide_3')?.image_url ?? ''} />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <Input label="Título do slide 1" name="heroSlide1Title" placeholder="FORBODY ACADEMIA" defaultValue={slide('slide_1')?.title ?? ''} />
            <Input label="Título do slide 2" name="heroSlide2Title" placeholder="PLANOS RED E BLACK" defaultValue={slide('slide_2')?.title ?? ''} />
            <Input label="Título do slide 3" name="heroSlide3Title" placeholder="VENHA TREINAR" defaultValue={slide('slide_3')?.title ?? ''} />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <Input label="Descrição do slide 1" name="heroSlide1Description" defaultValue={slide('slide_1')?.description ?? ''} />
            <Input label="Descrição do slide 2" name="heroSlide2Description" defaultValue={slide('slide_2')?.description ?? ''} />
            <Input label="Descrição do slide 3" name="heroSlide3Description" defaultValue={slide('slide_3')?.description ?? ''} />
          </div>

          <Input
            label="Texto do botão principal"
            name="heroButtonLabel"
            defaultValue={hero?.button_label ?? ''}
            placeholder="Escolher unidade"
          />
        </Section>

        <Section
          title="2. Fotos da Home"
          description="Essas imagens aparecem nos cards e blocos visuais da página inicial."
        >
          <FileInput label="Imagem principal" name="photoMainFile" urlName="photoMain" currentUrl={photos('main')?.image_url ?? ''} />

          <div className="grid gap-5 md:grid-cols-3">
            <FileInput label="Imagem do card 1" name="photoCard1File" urlName="photoCard1" currentUrl={photos('card_1')?.image_url ?? ''} />
            <FileInput label="Imagem do card 2" name="photoCard2File" urlName="photoCard2" currentUrl={photos('card_2')?.image_url ?? ''} />
            <FileInput label="Imagem do card 3" name="photoCard3File" urlName="photoCard3" currentUrl={photos('card_3')?.image_url ?? ''} />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((number) => {
              const currentPhoto = photos(`card_${number}`);
              return (
                <div key={number} className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                  <Input
                    label={`Título do card ${number}`}
                    name={`photoCard${number}Title`}
                    defaultValue={currentPhoto?.title ?? ''}
                  />
                  <Input
                    label={`Descrição do card ${number}`}
                    name={`photoCard${number}Description`}
                    defaultValue={currentPhoto?.description ?? ''}
                    textarea
                  />
                </div>
              );
            })}
          </div>
        </Section>

        <Section
          title="3. Sessão de planos"
          description="Controle os textos principais da área onde o aluno visualiza os planos Red e Black."
        >
          <Input
            label="Título da sessão"
            name="plansTitle"
            defaultValue={plansSection?.title ?? ''}
            placeholder="Escolha o plano que combina com sua rotina."
          />

          <Input
            label="Descrição da sessão"
            name="plansDescription"
            defaultValue={plansSection?.description ?? ''}
            textarea
          />

          <Input
            label="Texto do botão"
            name="plansButtonLabel"
            defaultValue={plansSection?.button_label ?? ''}
            placeholder="Ver planos"
          />
        </Section>

        <Section
          title="4. Promoções"
          description="Use esta área para destacar campanhas, descontos ou promoções temporárias."
        >
          <Input label="Título da promoção" name="promoTitle" defaultValue={promotion?.title ?? ''} />

          <Input
            label="Descrição da promoção"
            name="promoDescription"
            defaultValue={promotion?.description ?? ''}
            textarea
          />

          <Input
            label="Valor ou chamada promocional"
            name="promoValue"
            defaultValue={promotionItem?.metadata?.badge ?? ''}
            placeholder="12x de R$ 99,90"
          />

          <Input
            label="Texto do botão da promoção"
            name="promoButtonLabel"
            defaultValue={promotionItem?.metadata?.button_label ?? ''}
            placeholder="Quero aproveitar"
          />

          <label className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-4 text-sm text-white">
            <input
              type="checkbox"
              name="promoActive"
              defaultChecked={promotion?.is_active === true}
              className="h-4 w-4 accent-red-600"
            />
            Promoção ativa
          </label>
        </Section>

        <Section
          title="5. Planos"
          description="Configure os planos Red e Black exibidos na Home da Forbody."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-5 rounded-3xl border border-red-600/20 bg-red-600/[0.04] p-6">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-[-0.04em] text-red-400">
                  Plano Red
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Plano de entrada focado em musculação.
                </p>
              </div>

              <Input label="Nome do plano" name="redName" defaultValue={red?.name ?? ''} />
              <Input label="Preço" name="redPrice" placeholder="R$ 99,90" defaultValue={red?.price_label ?? ''} />
              <Input label="Descrição" name="redDescription" textarea defaultValue={red?.description ?? ''} />
              <Input
                label="Benefícios"
                name="redFeatures"
                defaultValue={Array.isArray(red?.benefits) ? red.benefits.join('\n') : ''}
                textarea
                helper="Digite um benefício por linha."
              />
              <Input label="Texto de destaque" name="redBadge" defaultValue={red?.badge ?? ''} />
            </div>

            <div className="space-y-5 rounded-3xl border border-zinc-700 bg-zinc-900/60 p-6">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-[-0.04em] text-white">
                  Plano Black
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Plano completo da experiência Forbody.
                </p>
              </div>

              <Input label="Nome do plano" name="blackName" defaultValue={black?.name ?? ''} />
              <Input label="Preço" name="blackPrice" placeholder="R$ 109,90" defaultValue={black?.price_label ?? ''} />
              <Input label="Descrição" name="blackDescription" textarea defaultValue={black?.description ?? ''} />
              <Input
                label="Benefícios"
                name="blackFeatures"
                defaultValue={Array.isArray(black?.benefits) ? black.benefits.join('\n') : ''}
                textarea
                helper="Digite um benefício por linha."
              />
              <Input label="Texto de destaque" name="blackBadge" defaultValue={black?.badge ?? ''} />
            </div>
          </div>
        </Section>

        <div className="sticky bottom-0 z-30 rounded-3xl border border-zinc-800 bg-black/95 p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Salvar alterações</p>
              <p className="text-xs text-zinc-500">O sistema preserva tudo que não foi alterado.</p>
            </div>

            <button
              type="submit"
              className="h-12 rounded-2xl bg-red-600 px-8 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-500"
            >
              Salvar marketing
            </button>
          </div>
        </div>
        </fieldset>
      </form>
    </div>
  );
}
