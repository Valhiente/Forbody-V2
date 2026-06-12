import type { ReactNode } from 'react';
import { updateMarketingManagerAction } from './actions';

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  textarea?: boolean;
  helper?: string;
};

type SectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function Input({
  label,
  name,
  placeholder = '',
  textarea = false,
  helper,
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

      {helper ? <p className="text-xs leading-relaxed text-zinc-500">{helper}</p> : null}
    </div>
  );
}

function Section({ title, description, children }: SectionProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
      <div className="space-y-2 border-b border-zinc-800 pb-5">
        <h2 className="text-2xl font-black tracking-[-0.03em] text-white">{title}</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>

      <div className="grid gap-5">{children}</div>
    </section>
  );
}

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-black px-4 py-8 sm:px-6 lg:px-10">
      <form
        action={async (formData: FormData) => {
          'use server';

          await updateMarketingManagerAction(formData);
        }}
        className="mx-auto max-w-6xl space-y-8"
      >
        <div className="overflow-hidden rounded-[2rem] border border-red-600/20 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.16),transparent_45%),#090909] p-8 shadow-[0_0_80px_rgba(220,38,38,0.08)] sm:p-10">
          <div className="inline-flex items-center gap-3 border border-red-600/30 bg-red-600/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.32em] text-red-300">
            Gestão de Marketing
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">
            Controle visual da Home da Forbody.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Edite banners, frases, promoções, planos e imagens sem precisar abrir o código.
            Tudo que for salvo aqui será usado futuramente pela Home integrada ao Supabase.
          </p>
        </div>

        <Section
          title="1. Banner principal"
          description="Essa é a primeira área que aparece para o aluno quando entra no site. Use frases curtas, fortes e diretas."
        >
          <Input
            label="Texto pequeno acima do título"
            name="heroSubtitle"
            placeholder="Ex: Forbody Academia"
            helper="Esse texto aparece acima do título principal da Home."
          />

          <Input
            label="Título principal"
            name="heroTitle"
            placeholder="Ex: Forbody, feita para cada etapa da sua vida."
            helper="Principal chamada visual da Home."
          />

          <Input
            label="Texto de apoio"
            name="heroDescription"
            textarea
            helper="Texto curto explicando a proposta da Forbody."
          />

          <Input
            label="Imagem principal do banner"
            name="heroImageUrl"
            placeholder="https://..."
            helper="Cole a URL da imagem principal usada no banner."
          />

          <Input
            label="Texto do botão principal"
            name="heroButtonLabel"
            placeholder="Escolher unidade"
          />
        </Section>

        <Section
          title="2. Fotos da Home"
          description="Essas imagens aparecem nos cards e blocos visuais da página inicial."
        >
          <Input
            label="Imagem principal"
            name="photoMain"
            placeholder="https://..."
          />

          <div className="grid gap-5 md:grid-cols-3">
            <Input label="Imagem do card 1" name="photoCard1" placeholder="https://..." />
            <Input label="Imagem do card 2" name="photoCard2" placeholder="https://..." />
            <Input label="Imagem do card 3" name="photoCard3" placeholder="https://..." />
          </div>
        </Section>

        <Section
          title="3. Sessão de planos"
          description="Controle os textos principais da área onde o aluno visualiza os planos Red e Black."
        >
          <Input
            label="Título da sessão"
            name="plansTitle"
            placeholder="Escolha o plano que combina com sua rotina."
          />

          <Input
            label="Descrição da sessão"
            name="plansDescription"
            textarea
          />

          <Input
            label="Texto do botão"
            name="plansButtonLabel"
            placeholder="Ver planos"
          />
        </Section>

        <Section
          title="4. Promoções"
          description="Use esta área para destacar campanhas, descontos ou promoções temporárias."
        >
          <Input label="Título da promoção" name="promoTitle" />

          <Input
            label="Descrição da promoção"
            name="promoDescription"
            textarea
          />

          <Input
            label="Valor ou chamada promocional"
            name="promoValue"
            placeholder="12x de R$ 99,90"
          />

          <label className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-4 text-sm text-white">
            <input
              type="checkbox"
              name="promoActive"
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

              <Input label="Nome do plano" name="redName" />
              <Input label="Preço" name="redPrice" placeholder="R$ 99,90" />
              <Input label="Descrição" name="redDescription" textarea />
              <Input
                label="Benefícios"
                name="redBenefits"
                textarea
                helper="Digite um benefício por linha."
              />
              <Input label="Texto de destaque" name="redBadge" />
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

              <Input label="Nome do plano" name="blackName" />
              <Input label="Preço" name="blackPrice" placeholder="R$ 109,90" />
              <Input label="Descrição" name="blackDescription" textarea />
              <Input
                label="Benefícios"
                name="blackBenefits"
                textarea
                helper="Digite um benefício por linha."
              />
              <Input label="Texto de destaque" name="blackBadge" />
            </div>
          </div>
        </Section>

        <div className="sticky bottom-0 z-30 rounded-3xl border border-zinc-800 bg-black/95 p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Salvar alterações</p>
              <p className="text-xs text-zinc-500">
                As alterações serão enviadas para o Supabase.
              </p>
            </div>

            <button
              type="submit"
              className="h-12 rounded-2xl bg-red-600 px-8 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-500"
            >
              Salvar marketing
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
