import { redirect } from 'next/navigation';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';
import { updatePlansAction } from '../actions';
import { MarketingFeedback, MarketingHeader, MarketingSection, ReadOnlyNotice, SaveBar, TextField, type MarketingSearchParams } from '../components';

export default async function MarketingPlansPage({ searchParams }: { searchParams?: MarketingSearchParams }) {
  const admin = await requirePermission('marketing.read');
  const canWrite = hasAdminPermission(admin, 'marketing.write');
  const params = await searchParams;
  const supabase = await createSupabaseAdminClient();
  const [sectionResult, plansResult] = supabase ? await Promise.all([
    supabase.from('site_marketing_sections').select('*').eq('section_key', 'home_plans').maybeSingle(),
    supabase.from('site_plans').select('*').in('plan_key', ['red', 'black']),
  ]) : [{ data: null }, { data: [] }];
  const section = sectionResult.data;
  const plan = (key: string) => (plansResult.data ?? []).find((entry) => entry.plan_key === key);

  return (
    <div className="space-y-7 pb-12">
      <MarketingHeader eyebrow="Marketing / Planos" title="Planos" description="Atualize os dados comerciais dos planos. Esta página não altera o estilo visual dos cards." />
      <MarketingFeedback saved={params?.saved === '1'} error={params?.error} />
      <ReadOnlyNotice canWrite={canWrite} />
      <form action={async (formData) => {
        'use server';
        const result = await updatePlansAction(formData);
        redirect(result.success ? '/admin/marketing/planos?saved=1' : `/admin/marketing/planos?error=${encodeURIComponent(result.error ?? 'Erro ao salvar.')}`);
      }} className="space-y-7">
        <fieldset disabled={!canWrite} className="contents">
          <MarketingSection title="Texto da seção" description="Chamada que apresenta os planos na página inicial.">
            <TextField label="Título" name="plansTitle" defaultValue={section?.title ?? ''} required />
            <TextField label="Descrição" name="plansDescription" defaultValue={section?.description ?? ''} textarea required />
            <TextField label="Texto do botão" name="plansButtonLabel" defaultValue={section?.button_label ?? ''} required />
            <TextField label="Destino do botão" name="plansButtonHref" defaultValue={section?.button_href === '#planos' ? '/unidades' : (section?.button_href ?? '/unidades')} helper="Exemplo: /unidades" required />
          </MarketingSection>
          <div className="grid gap-6 lg:grid-cols-2">
            {(['red', 'black'] as const).map((key) => {
              const current = plan(key);
              const label = key === 'red' ? 'Plano RED' : 'Plano BLACK';
              return (
                <MarketingSection key={key} title={label} description={key === 'red' ? 'Plano de entrada com foco em musculação.' : 'Plano completo da experiência Forbody.'}>
                  <TextField label="Nome" name={`${key}Name`} defaultValue={current?.name ?? label} required />
                  <TextField label="Preço exibido" name={`${key}Price`} defaultValue={current?.price_label ?? ''} placeholder="R$ 99,90" required />
                  <TextField label="Descrição" name={`${key}Description`} defaultValue={current?.description ?? ''} textarea required />
                  <TextField label="Benefícios" name={`${key}Features`} defaultValue={Array.isArray(current?.benefits) ? current.benefits.join('\n') : ''} textarea helper="Digite um benefício por linha. É necessário informar pelo menos um." required />
                  <TextField label="Texto de destaque" name={`${key}Badge`} defaultValue={current?.badge ?? ''} />
                </MarketingSection>
              );
            })}
          </div>
          <SaveBar label="Salvar planos" />
        </fieldset>
      </form>
    </div>
  );
}
