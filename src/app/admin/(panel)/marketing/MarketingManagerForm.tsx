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

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/30">
      <div className="mb-6 border-b border-white/10 pb-5">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">Marketing Manager</p>
        <h2 className="mt-3 text-2xl font-black text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function MarketingManagerForm({ hero, plansSection, redPlan, blackPlan }: Props) {
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

    setMessage('Alterações salvas com sucesso. A Home será atualizada pela integração com o Supabase.');
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

      <SectionCard title="Banner principal da Home" description="Edite a primeira chamada do site, frase principal, imagem de fundo e botão.">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Selo acima do título" name="heroSubtitle" defaultValue={hero.subtitle} placeholder="Forbody Academia" />
          <Field label="Imagem do banner" name="heroImageUrl" defaultValue={hero.image_url} placeholder="https://..." type="url" />
          <div className="md:col-span-2">
            <Field label="Título principal" name="heroTitle" defaultValue={hero.title} placeholder="Forbody, feita para cada etapa da sua vida." />
          </div>
          <div className="md:col-span-2">
            <TextArea label="Texto de apoio" name="heroDescription" defaultValue={hero.description} rows={3} />
          </div>
          <Field label="Texto do botão" name="heroButtonLabel" defaultValue={hero.button_label} placeholder="Escolher unidade" />
          <Field label="Link do botão" name="heroButtonHref" defaultValue={hero.button_href} placeholder="/unidades" />
        </div>
      </SectionCard>

      <SectionCard title="Frases e chamada dos planos" description="Controle o texto que apresenta os planos Red e Black na Home.">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Selo da seção" name="plansSubtitle" defaultValue={plansSection.subtitle} placeholder="Planos Forbody" />
          <Field label="Texto do botão" name="plansButtonLabel" defaultValue={plansSection.button_label} placeholder="Ver planos" />
          <div className="md:col-span-2">
            <Field label="Título da seção" name="plansTitle" defaultValue={plansSection.title} />
          </div>
          <div className="md:col-span-2">
            <TextArea label="Descrição da seção" name="plansDescription" defaultValue={plansSection.description} rows={3} />
          </div>
          <Field label="Link do botão" name="plansButtonHref" defaultValue={plansSection.button_href} placeholder="#planos" />
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Plano Red" description="Edite preço, descrição e benefícios do plano de entrada.">
          <div className="space-y-5">
            <Field label="Nome" name="redName" defaultValue={redPlan.name} />
            <Field label="Preço de destaque" name="redPrice" defaultValue={redPlan.price_label} />
            <Field label="Selo" name="redBadge" defaultValue={redPlan.badge} />
            <TextArea label="Descrição" name="redDescription" defaultValue={redPlan.description} rows={3} />
            <TextArea label="Benefícios — um por linha" name="redBenefits" defaultValue={(redPlan.benefits || []).join('\n')} rows={5} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Mensal" name="redMonthly" defaultValue={paymentValue(redPlan, 'Mensal')} />
              <Field label="Recorrente" name="redRecurring" defaultValue={paymentValue(redPlan, 'Recorrente')} />
              <Field label="12 meses" name="redTwelveMonths" defaultValue={paymentValue(redPlan, '12 meses')} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Plano Black" description="Edite preço, descrição e benefícios do plano mais completo.">
          <div className="space-y-5">
            <Field label="Nome" name="blackName" defaultValue={blackPlan.name} />
            <Field label="Preço de destaque" name="blackPrice" defaultValue={blackPlan.price_label} />
            <Field label="Selo" name="blackBadge" defaultValue={blackPlan.badge} />
            <TextArea label="Descrição" name="blackDescription" defaultValue={blackPlan.description} rows={3} />
            <TextArea label="Benefícios — um por linha" name="blackBenefits" defaultValue={(blackPlan.benefits || []).join('\n')} rows={5} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Mensal" name="blackMonthly" defaultValue={paymentValue(blackPlan, 'Mensal')} />
              <Field label="Recorrente" name="blackRecurring" defaultValue={paymentValue(blackPlan, 'Recorrente')} />
              <Field label="12 meses" name="blackTwelveMonths" defaultValue={paymentValue(blackPlan, '12 meses')} />
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="sticky bottom-4 z-10 flex flex-col gap-4 rounded-3xl border border-red-600/30 bg-black/85 p-4 shadow-2xl shadow-black/60 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white">Salvar Marketing</p>
          <p className="mt-1 text-xs text-gray-400">Por enquanto salva textos e planos. Upload de imagem entra na próxima etapa.</p>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
