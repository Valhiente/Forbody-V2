import { redirect } from 'next/navigation';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';
import { updatePromotionsAction } from '../actions';
import { MarketingUploadGuard } from '../MarketingUploadGuard';
import { MarketingImageField } from '../MarketingImageField';
import { MarketingFeedback, MarketingHeader, MarketingSection, ReadOnlyNotice, SaveBar, TextField, type MarketingSearchParams } from '../components';

export default async function MarketingPromotionsPage({ searchParams }: { searchParams?: MarketingSearchParams }) {
  const admin = await requirePermission('marketing.read');
  const canWrite = hasAdminPermission(admin, 'marketing.write');
  const params = await searchParams;
  const supabase = await createSupabaseAdminClient();
  const { data: promotion } = supabase
    ? await supabase.from('site_marketing_sections').select('*').eq('section_key', 'home_promotion').maybeSingle()
    : { data: null };

  return (
    <div className="space-y-7 pb-12">
      <MarketingHeader eyebrow="Marketing / Promoções" title="Promoções" description="Crie uma campanha temporária na Home e desative-a quando a ação terminar, sem apagar o conteúdo cadastrado." />
      <MarketingFeedback saved={params?.saved === '1'} error={params?.error} />
      <ReadOnlyNotice canWrite={canWrite} />
      <form data-marketing-form="true" action={async (formData) => {
        'use server';
        const result = await updatePromotionsAction(formData);
        redirect(result.success ? '/admin/marketing/promocoes?saved=1' : `/admin/marketing/promocoes?error=${encodeURIComponent(result.error ?? 'Erro ao salvar.')}`);
      }} className="space-y-7">
        <MarketingUploadGuard />
        <fieldset disabled={!canWrite} className="contents">
          <MarketingSection title="Status da campanha" description="Uma promoção desativada permanece salva, mas não aparece no site.">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 p-4 text-sm font-semibold text-white">
              <input type="checkbox" name="promotionActive" defaultChecked={promotion?.is_active === true} className="h-5 w-5 accent-red-600" />
              Exibir esta promoção na página inicial
            </label>
          </MarketingSection>

          <MarketingSection title="Conteúdo da promoção" description="Os campos obrigatórios serão validados quando a campanha estiver ativa.">
            <TextField label="Identificação curta" name="promotionEyebrow" defaultValue={promotion?.subtitle ?? ''} placeholder="Oferta especial" helper="Texto pequeno exibido acima do título." />
            <TextField label="Título" name="promotionTitle" defaultValue={promotion?.title ?? ''} placeholder="Treine hoje com uma condição especial" />
            <TextField label="Descrição" name="promotionDescription" defaultValue={promotion?.description ?? ''} textarea />
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField label="Texto do botão" name="promotionButtonLabel" defaultValue={promotion?.button_label ?? ''} placeholder="Conhecer unidades" />
              <TextField label="Destino do botão" name="promotionButtonHref" defaultValue={promotion?.button_href ?? '/unidades'} helper="Exemplo: /unidades, /franquias ou um link completo." />
            </div>
          </MarketingSection>

          <MarketingSection title="Imagem da promoção" description="A imagem é opcional. Sem ela, o banner mantém o fundo escuro e vermelho do site.">
            <div className="max-w-xl">
              <MarketingImageField
                label="Imagem da campanha"
                name="promotionImageFile"
                urlName="promotionImageUrl"
                removeName="promotionImageRemove"
                currentUrl={promotion?.image_url ?? ''}
                helper="Recomendado: 1600×700, WebP ou JPG otimizado."
              />
            </div>
          </MarketingSection>
          <SaveBar label="Salvar promoção" />
        </fieldset>
      </form>
    </div>
  );
}
