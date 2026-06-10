import type { ReactNode } from 'react';
import { updateMarketingManagerAction } from './actions';

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  textarea?: boolean;
};

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Input({
  label,
  name,
  placeholder = '',
  textarea = false,
}: InputProps) {
  const baseClassName =
    'w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-sm text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500';

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-white">
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={`${baseClassName} min-h-[120px] py-3`}
        />
      ) : (
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          className={`${baseClassName} h-12`}
        />
      )}
    </div>
  );
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-black p-6">
      <form
        action={async (formData: FormData) => {
          'use server';

          await updateMarketingManagerAction(formData);
        }}
        className="mx-auto max-w-5xl space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Gestão de Marketing</h1>
          <p className="text-sm text-zinc-400">
            Edite banners, frases, promoções e planos da Home sem mexer no código.
          </p>
        </div>

        <Section title="Banner principal">
          <Input label="Selo" name="heroSubtitle" />
          <Input label="Título" name="heroTitle" />
          <Input label="Texto de apoio" name="heroDescription" textarea />
          <Input label="URL da imagem" name="heroImageUrl" />
          <Input label="Texto do botão" name="heroButtonLabel" />
        </Section>

        <Section title="Fotos da Home">
          <Input label="Foto principal" name="photoMain" />
          <Input label="Foto card 1" name="photoCard1" />
          <Input label="Foto card 2" name="photoCard2" />
          <Input label="Foto card 3" name="photoCard3" />
        </Section>

        <Section title="Frases da Home">
          <Input label="Título da seção de planos" name="plansTitle" />
          <Input
            label="Descrição da seção de planos"
            name="plansDescription"
            textarea
          />
          <Input label="Chamada dos botões" name="plansButtonLabel" />
        </Section>

        <Section title="Promoções">
          <Input label="Título da promoção" name="promoTitle" />
          <Input label="Descrição da promoção" name="promoDescription" textarea />
          <Input label="Valor/chamada promocional" name="promoValue" />

          <label className="flex items-center gap-3 text-sm text-white">
            <input
              type="checkbox"
              name="promoActive"
              className="h-4 w-4 accent-red-600"
            />
            Ativar/desativar
          </label>
        </Section>

        <Section title="Planos">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-zinc-800 p-4">
              <h3 className="text-lg font-semibold text-red-500">Plano Red</h3>

              <Input label="Plano Red" name="redName" />
              <Input label="Preço" name="redPrice" />
              <Input label="Descrição" name="redDescription" textarea />
              <Input label="Benefícios" name="redBenefits" textarea />
              <Input label="Condições" name="redBadge" />
            </div>

            <div className="space-y-4 rounded-2xl border border-zinc-800 p-4">
              <h3 className="text-lg font-semibold text-white">Plano Black</h3>

              <Input label="Plano Black" name="blackName" />
              <Input label="Preço" name="blackPrice" />
              <Input label="Descrição" name="blackDescription" textarea />
              <Input label="Benefícios" name="blackBenefits" textarea />
              <Input label="Condições" name="blackBadge" />
            </div>
          </div>
        </Section>

        <div className="sticky bottom-0 rounded-2xl border border-zinc-800 bg-black/95 p-4 backdrop-blur">
          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-red-600 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}