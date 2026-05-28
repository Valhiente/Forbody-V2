import Button from '@/components/ui/Button';

const sections = [
  {
    title: 'Campanhas',
    items: ['Campanhas ativas', 'Campanhas futuras', 'Campanhas encerradas'],
    buttonLabel: 'Gerenciar campanhas',
  },
  {
    title: 'Promoções',
    items: ['Promoções mensais', 'Matrícula grátis', 'Descontos', 'Planos promocionais'],
    buttonLabel: 'Gerenciar promoções',
  },
  {
    title: 'Textos e Copy',
    items: ['Headline principal', 'Textos da home', 'Frases motivacionais', 'CTA'],
    buttonLabel: 'Editar textos',
  },
  {
    title: 'Banners',
    items: ['Banner home', 'Banner campanhas', 'Banner matrícula', 'Banner unidades'],
    buttonLabel: 'Gerenciar banners',
  },
  {
    title: 'Redes Sociais',
    items: ['Instagram', 'Campanhas reels', 'Artes feed', 'Anúncios'],
    buttonLabel: 'Planejar conteúdo',
  },
];

const metrics = [
  { label: 'Campanhas ativas', value: '12', accent: 'text-red-400' },
  { label: 'Promoções em destaque', value: '4', accent: 'text-white' },
  { label: 'Banners publicados', value: '8', accent: 'text-red-400' },
  { label: 'Leads estimados', value: '1.240', accent: 'text-white' },
];

export default function AdminMarketingPage() {
  return (
    <div className="space-y-8 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/30">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-red-500">Admin / Marketing</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Central de campanhas e comunicação</h1>
            <p className="mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
              Estruture ações promocionais, copys, banners e conteúdos com uma visão premium e alinhada ao padrão ForBody.
            </p>
          </div>
          <Button disabled variant="b2b-primary" className="w-full max-w-xs uppercase tracking-[0.2em] sm:w-auto">
            Visão geral do marketing
          </Button>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 shadow-black/20 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{metric.label}</p>
            <p className={`mt-6 text-4xl font-black ${metric.accent}`}>{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title} className="space-y-6 rounded-[2rem] border border-white/10 bg-[#111] p-6 shadow-xl shadow-black/20">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-red-500">{section.title}</p>
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              <div className="space-y-2 text-sm text-gray-400">
                {section.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button disabled variant="b2b-primary" className="w-full uppercase tracking-[0.12em]">
              {section.buttonLabel}
            </Button>
          </div>
        ))}

        <div className="rounded-[2rem] border border-red-600/20 bg-[#0a0a0a] p-6 shadow-xl shadow-black/30">
          <p className="text-sm uppercase tracking-[0.3em] text-red-500">Em breve</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Automação e crescimento</h2>
          <p className="mt-4 text-sm leading-6 text-gray-400">
            Próximos módulos para ampliar a rotina administrativa: automação, CRM, Meta Ads e WhatsApp para campanhas.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-gray-300 sm:grid-cols-2">
            {['Automação', 'CRM', 'Meta Ads', 'WhatsApp campanhas'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#111] px-4 py-3">
                {item}
              </div>
            ))}
          </div>
          <Button disabled variant="b2b-outline" className="mt-6 w-full uppercase tracking-[0.12em]">
            Em breve
          </Button>
        </div>
      </div>
    </div>
  );
}
