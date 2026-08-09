import { redirect } from 'next/navigation';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';
import { updateHomeContentAction } from '../actions';
import { MarketingUploadGuard } from '../MarketingUploadGuard';
import { MarketingImageField } from '../MarketingImageField';
import { MarketingFeedback, MarketingHeader, MarketingSection, ReadOnlyNotice, SaveBar, TextField, type MarketingSearchParams } from '../components';

export default async function MarketingHomePage({ searchParams }: { searchParams?: MarketingSearchParams }) {
  const admin = await requirePermission('marketing.read');
  const canWrite = hasAdminPermission(admin, 'marketing.write');
  const params = await searchParams;
  const supabase = await createSupabaseAdminClient();
  const { data: hero } = supabase
    ? await supabase.from('site_marketing_sections').select('*').eq('section_key', 'home_hero').maybeSingle()
    : { data: null };

  return (
    <div className="space-y-7 pb-12">
      <MarketingHeader eyebrow="Marketing / Página inicial" title="Página inicial" description="Edite somente o conteúdo principal do topo da Home. Os cards, planos e parceiros ficam em módulos separados." />
      <MarketingFeedback saved={params?.saved === '1'} error={params?.error} />
      <ReadOnlyNotice canWrite={canWrite} />
      <form data-marketing-form="true" action={async (formData) => {
        'use server';
        const result = await updateHomeContentAction(formData);
        redirect(result.success ? '/admin/marketing/home?saved=1' : `/admin/marketing/home?error=${encodeURIComponent(result.error ?? 'Erro ao salvar.')}`);
      }} className="space-y-7">
        <MarketingUploadGuard />
        <fieldset disabled={!canWrite} className="contents">
          <MarketingSection title="Chamada principal" description="Esses textos aparecem no primeiro bloco da página inicial.">
            <TextField label="Texto do botão" name="heroButtonLabel" defaultValue={hero?.button_label ?? ''} placeholder="Escolher unidade" required />
            <TextField label="Título principal" name="heroTitle" defaultValue={hero?.title ?? ''} helper="Use uma frase curta e forte." required />
            <TextField label="Texto de apoio" name="heroDescription" defaultValue={hero?.description ?? ''} textarea required />
            <TextField label="Destino do botão" name="heroButtonHref" type="text" defaultValue={hero?.button_href ?? '/unidades'} helper="Exemplo: /unidades ou /franquias" required />
          </MarketingSection>

          <MarketingSection title="Imagem principal da Home" description="Quando nenhuma imagem é cadastrada aqui, o site utiliza a imagem de fundo padrão incorporada ao projeto.">
            <div className="max-w-xl">
              <MarketingImageField label="Imagem de fundo" name="heroImageFile" urlName="heroImageUrl" removeName="heroImageRemove" currentUrl={hero?.image_url ?? ''} helper="Recomendado para desktop: 1920×1080 ou proporção 16:9. Use WebP ou JPG otimizado." />
            </div>
          </MarketingSection>
          <SaveBar label="Salvar página inicial" />
        </fieldset>
      </form>
    </div>
  );
}
