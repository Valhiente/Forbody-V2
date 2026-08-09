import { redirect } from 'next/navigation';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';
import { updateHomeCardsAction } from '../actions';
import { MarketingUploadGuard } from '../MarketingUploadGuard';
import { MarketingImageField } from '../MarketingImageField';
import { MarketingFeedback, MarketingHeader, MarketingSection, ReadOnlyNotice, SaveBar, TextField, type MarketingSearchParams } from '../components';

const cardConfigs = [
  { key: 'card_1', label: 'Estrutura', fallbackTitle: 'Estrutura completa', description: 'Equipamentos, espaço físico e ambiente da academia.' },
  { key: 'card_2', label: 'Professores', fallbackTitle: 'Professores presentes', description: 'Equipe, orientação e acompanhamento dos alunos.' },
  { key: 'card_3', label: 'Aulas coletivas', fallbackTitle: 'Aulas coletivas', description: 'Aulas, turmas, energia e atividades em grupo.' },
] as const;

export default async function MarketingCardsPage({ searchParams }: { searchParams?: MarketingSearchParams }) {
  const admin = await requirePermission('marketing.read');
  const canWrite = hasAdminPermission(admin, 'marketing.write');
  const params = await searchParams;
  const supabase = await createSupabaseAdminClient();
  const { data } = supabase
    ? await supabase.from('site_marketing_items').select('*').eq('section_key', 'home_photos')
    : { data: [] };
  const items = data ?? [];
  const item = (key: string) => items.find((entry) => entry.item_key === key);

  return (
    <div className="space-y-7 pb-12">
      <MarketingHeader eyebrow="Marketing / Cards da Home" title="Cards da Home" description="Cada card tem nome próprio e até três imagens. As imagens alternam automaticamente na página inicial." />
      <MarketingFeedback saved={params?.saved === '1'} error={params?.error} />
      <ReadOnlyNotice canWrite={canWrite} />
      <form data-marketing-form="true" action={async (formData) => {
        'use server';
        const result = await updateHomeCardsAction(formData);
        redirect(result.success ? '/admin/marketing/cards?saved=1' : `/admin/marketing/cards?error=${encodeURIComponent(result.error ?? 'Erro ao salvar.')}`);
      }} className="space-y-7">
        <MarketingUploadGuard />
        <fieldset disabled={!canWrite} className="contents">
          <MarketingSection title="Card Nossas unidades" description="Esta imagem aparece ao fundo do card que lista Triunfo, Barão do Bananal, Vila Virgínia, Portinari e Campo Belo.">
            <div className="max-w-xl">
              <MarketingImageField
                label="Imagem de fundo de Nossas unidades"
                name="unitsCardImageFile"
                urlName="unitsCardImageUrl"
                removeName="unitsCardImageRemove"
                currentUrl={item('main')?.image_url ?? ''}
                helper="Recomendado: imagem vertical ou quadrada, com o assunto principal centralizado."
              />
            </div>
          </MarketingSection>
          {cardConfigs.map((card, cardIndex) => {
            const mainItem = item(card.key);
            return (
              <section id={`card-${cardIndex + 1}`} key={card.key} className="scroll-mt-8 rounded-3xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-500">Card {cardIndex + 1}</p>
                <h2 className="mt-3 text-3xl font-black text-white">{card.label}</h2>
                <p className="mt-2 text-sm text-zinc-400">{card.description}</p>
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <TextField label={`Título exibido em ${card.label}`} name={`${card.key}_title`} defaultValue={mainItem?.title ?? card.fallbackTitle} required />
                  <TextField label={`Descrição de ${card.label}`} name={`${card.key}_description`} defaultValue={mainItem?.description ?? ''} textarea required />
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-3">
                  {[1, 2, 3].map((slot) => {
                    const itemKey = slot === 1 ? card.key : `${card.key}_${slot}`;
                    return (
                      <MarketingImageField
                        key={itemKey}
                        label={`${card.label} — Imagem ${slot}`}
                        name={`${card.key}_image_${slot}_file`}
                        urlName={`${card.key}_image_${slot}_url`}
                        removeName={`${card.key}_image_${slot}_remove`}
                        currentUrl={item(itemKey)?.image_url ?? ''}
                        helper="Formato recomendado: vertical 4:5 ou 3:4. O site faz o enquadramento automaticamente."
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
          <SaveBar label="Salvar cards da Home" />
        </fieldset>
      </form>
    </div>
  );
}
