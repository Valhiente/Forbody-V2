'use client'

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import Button from '@/components/ui/Button';
import { updateMarketingManagerAction } from './actions';

type MarketingSection = {
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  button_label: string | null;
  button_href: string | null;
};

type MarketingItem = {
  item_key: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  badge: string | null;
  is_active?: boolean | null;
};

type SitePlan = {
  plan_key: string;
  name: string | null;
  price_label: string | null;
  description: string | null;
  badge: string | null;
  benefits: string[] | null;
  payment_options: Array<{ label: string; price: string }> | null;
};

type Props = {
  hero: MarketingSection;
  plansSection: MarketingSection;
  photos: Record<string, MarketingItem>;
  promotion: MarketingItem;
  redPlan: SitePlan;
  blackPlan: SitePlan;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="b2b-primary" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Salvando...' : 'Salvar alterações'}
    </Button>
  );
}

function paymentValue(plan: SitePlan, label: string) {
  return plan.payment_options?.find((item) => item.label === label)?.price || '';
}

function Field({ label, name, defaultValue, placeholder, type = 'text' }: { label: string; name: string; defaultValue?: string | null; placeholder?: string; type?: string }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
      />
    </div>
  );
}

function TextArea({ label, name, defaultValue, placeholder, rows = 4 }: { label: string; name: string; defaultValue?: string | null; placeholder?: string; rows?: number }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-300">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
      />
    </div>
  );
}

function Toggle({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean | null }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm font-semibold text-gray-300">
      {label}
      <input name={name} type="checkbox" defaultChecked={Boolean(defaultChecked)} className="h-5 w-5 accent-red-600" />
    </label>
  );
}

function SectionCard({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/30">
      <div className="mb-6 border-b border-white/10 pb-5">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">Bloco {number}</p>
        <h2 className="mt-3 text-2xl font-black text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function MarketingManagerForm({ hero, plansSection, photos, promotion, redPlan, blackPlan }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function action(formData: FormData) {
    setMessage(null);
    setError(null);

    const result = await updateMarketingManagerAction(formData);

    if (!result.success) {
      setError(result.error || 'Não foi possível salvar as alterações.');
      return;
    }

    setMessage('Alterações salvas com sucesso.');
  }

  return (
    <form action={action} className="space-y-8">
      {message && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-300">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm font-semibold text-red-300">
          {error}
        </div>
      )}

      <SectionCard number="1" title="Banner principal" description="Altere o primeiro bloco da Home.">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Selo" name="heroSubtitle" defaultValue={hero.subtitle} placeholder="Forbody Academia" />
          <Field label="URL da imagem" name="heroImageUrl" defaultValue={hero.image_url} placeholder="https://..." type="url" />
          <div className="md:col-span-2">
            <Field label="Título" name="heroTitle" defaultValue={hero.title} placeholder="Forbody, feita para cada etapa da sua vida." />
          </div>
          <div className="md:col-span-2">
            <TextArea label="Texto de apoio" name="heroDescription" defaultValue={hero.description} rows={3} />
          </div>
          <Field label="Texto do botão" name="heroButtonLabel" defaultValue={hero.button_label} placeholder="Escolher unidade" />
        </div>
        <input type="hidden" name="heroButtonHref" value={hero.button_href || '/unidades'} />
      </SectionCard>

      <SectionCard number="2" title="Fotos da Home" description="Cole as URLs das imagens que serão usadas nos blocos visuais.">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Foto principal" name="photoMain" defaultValue={photos.main?.image_url} placeholder="https://..." type="url" />
          <Field label="Foto card 1" name="photoCard1" defaultValue={photos.card_1?.image_url} placeholder="https://..." type="url" />
          <Field label="Foto card 2" name="photoCard2" defaultValue={photos.card_2?.image_url} placeholder="https://..." type="url" />
          <Field label="Foto card 3" name="photoCard3" defaultValue={photos.card_3?.image_url} placeholder="https://..." type="url" />
        </div>
      </SectionCard>

      <SectionCard number="3" title="Frases da Home" description="Controle as chamadas da vitrine de planos.">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field label="Título da seção de planos" name="plansTitle" defaultValue={plansSection.title} />
          </div>
          <div className="md:col-span-2">
            <TextArea label="Descrição da seção de planos" name="plansDescription" defaultValue={plansSection.description} rows={3} />
          </div>
          <Field label="Chamada do botão" name="plansButtonLabel" defaultValue={plansSection.button_label} placeholder="Ver planos" />
        </div>
        <input type="hidden" name="plansSubtitle" value={plansSection.subtitle || 'Planos Forbody'} />
        <input type="hidden" name="plansButtonHref" value={plansSection.button_href || '#planos'} />
      </SectionCard>

      <SectionCard number="4" title="Promoções" description="Cadastre uma chamada promocional para a Home.">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Título da promoção" name="promoTitle" defaultValue={promotion.title} placeholder="Promoção especial" />
          <Field label="Valor/chamada promocional" name="promoValue" defaultValue={promotion.badge} placeholder="12x de R$ 79,90" />
          <div className="md:col-span-2">
            <TextArea label="Descrição da promoção" name="promoDescription" defaultValue={promotion.description} rows={3} />
          </div>
          <Toggle label="Promoção ativa" name="promoActive" defaultChecked={promotion.is_active} />
        </div>
      </SectionCard>

      <SectionCard number="5" title="Planos" description="Edite Red e Black, valores, benefícios e condições.">
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-xl font-black text-white">Plano Red</h3>
            <div className="mt-5 space-y-5">
              <Field label="Nome" name="redName" defaultValue={redPlan.name} />
              <Field label="Preço" name="redPrice" defaultValue={redPlan.price_label} />
              <Field label="Chamada/selo" name="redBadge" defaultValue={redPlan.badge} />
              <TextArea label="Descrição" name="redDescription" defaultValue={redPlan.description} rows={3} />
              <TextArea label="Benefícios — um por linha" name="redBenefits" defaultValue={(redPlan.benefits || []).join('\n')} rows={5} />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Mensal" name="redMonthly" defaultValue={paymentValue(redPlan, 'Mensal')} />
                <Field label="Recorrente" name="redRecurring" defaultValue={paymentValue(redPlan, 'Recorrente')} />
                <Field label="12 meses" name="redTwelveMonths" defaultValue={paymentValue(redPlan, '12 meses')} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-red-600/30 bg-red-600/5 p-5">
            <h3 className="text-xl font-black text-white">Plano Black</h3>
            <div className="mt-5 space-y-5">
              <Field label="Nome" name="blackName" defaultValue={blackPlan.name} />
              <Field label="Preço" name="blackPrice" defaultValue={blackPlan.price_label} />
              <Field label="Chamada/selo" name="blackBadge" defaultValue={blackPlan.badge} />
              <TextArea label="Descrição" name="blackDescription" defaultValue={blackPlan.description} rows={3} />
              <TextArea label="Benefícios — um por linha" name="blackBenefits" defaultValue={(blackPlan.benefits || []).join('\n')} rows={5} />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Mensal" name="blackMonthly" defaultValue={paymentValue(blackPlan, 'Mensal')} />
                <Field label="Recorrente" name="blackRecurring" defaultValue={paymentValue(blackPlan, 'Recorrente')} />
                <Field label="12 meses" name="blackTwelveMonths" defaultValue={paymentValue(blackPlan, '12 meses')} />
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="sticky bottom-4 z-10 flex flex-col gap-4 rounded-3xl border border-red-600/30 bg-black/85 p-4 shadow-2xl shadow-black/60 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-white">Salvar alterações</p>
        <SubmitButton />
      </div>
    </form>
  );
}
