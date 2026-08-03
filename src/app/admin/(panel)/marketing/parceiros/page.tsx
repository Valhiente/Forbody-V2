import { redirect } from 'next/navigation';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';
import { updatePartnersAction } from '../actions';
import { MarketingUploadGuard } from '../MarketingUploadGuard';
import { MarketingImageField } from '../MarketingImageField';
import { MarketingFeedback, MarketingHeader, ReadOnlyNotice, SaveBar, TextField, type MarketingSearchParams } from '../components';

export default async function MarketingPartnersPage({ searchParams }: { searchParams?: MarketingSearchParams }) {
  const admin = await requirePermission('marketing.read');
  const canWrite = hasAdminPermission(admin, 'marketing.write');
  const params = await searchParams;
  const supabase = await createSupabaseAdminClient();
  const { data } = supabase
    ? await supabase.from('site_marketing_items').select('*').eq('section_key', 'home_suppliers').order('sort_order')
    : { data: [] };
  const partners = data ?? [];

  return (
    <div className="space-y-7 pb-12">
      <MarketingHeader eyebrow="Marketing / Parceiros" title="Empresas parceiras" description="Gerencie as logos e os links exibidos na seção Parceiros da página inicial." />
      <MarketingFeedback saved={params?.saved === '1'} error={params?.error} />
      <ReadOnlyNotice canWrite={canWrite} />
      <form data-marketing-form="true" action={async (formData) => {
        'use server';
        const result = await updatePartnersAction(formData);
        redirect(result.success ? '/admin/marketing/parceiros?saved=1' : `/admin/marketing/parceiros?error=${encodeURIComponent(result.error ?? 'Erro ao salvar.')}`);
      }} className="space-y-7">
        <MarketingUploadGuard />
        <fieldset disabled={!canWrite} className="contents">
          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2, 3, 4].map((slot) => {
              const current = partners.find((entry) => entry.item_key === `fornecedor_${slot}`);
              const prefix = `partner_${slot}`;
              return (
                <section key={slot} className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-500">Parceiro {slot}</p>
                  <div className="mt-5 grid gap-5">
                    <MarketingImageField label={`Logo do parceiro ${slot}`} name={`${prefix}_logo_file`} urlName={`${prefix}_logo_url`} removeName={`${prefix}_logo_remove`} currentUrl={current?.image_url ?? ''} helper="Recomendado: PNG ou WebP com fundo transparente." />
                    <TextField label="Nome da empresa" name={`${prefix}_name`} defaultValue={current?.title ?? ''} />
                    <TextField label="Link do site" name={`${prefix}_href`} type="url" defaultValue={current?.description ?? ''} placeholder="https://..." />
                    <label className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-sm text-white">
                      <input type="checkbox" name={`${prefix}_active`} defaultChecked={current?.is_active === true} className="h-4 w-4 accent-red-600" />
                      Exibir este parceiro na Home
                    </label>
                  </div>
                </section>
              );
            })}
          </div>
          <SaveBar label="Salvar parceiros" />
        </fieldset>
      </form>
    </div>
  );
}
