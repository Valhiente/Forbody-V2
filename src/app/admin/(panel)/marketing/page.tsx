import Button from '@/components/ui/Button';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import MarketingManagerForm from './MarketingManagerForm';

const fallbackSections = {
  home_hero: {
    section_key: 'home_hero',
    title: 'Forbody, feita para cada etapa da sua vida.',
    subtitle: 'Forbody Academia',
    description: 'Na Forbody, ajudamos você a conquistar seus objetivos, porque cada conquista sua também é nossa.',
    image_url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1800&q=90',
    button_label: 'Escolher unidade',
    button_href: '/unidades',
  },
  home_plans: {
    section_key: 'home_plans',
    title: 'Escolha o plano que combina com sua rotina.',
    subtitle: 'Planos Forbody',
    description: 'Dois caminhos para começar: Red para quem quer musculação com apoio técnico, e Black para quem quer a experiência completa da Forbody.',
    image_url: null,
    button_label: 'Ver planos',
    button_href: '#planos',
  },
};

const fallbackPlans = {
  red: {
    plan_key: 'red',
    name: 'Plano Red',
    price_label: 'A partir de R$ 99,90',
    description: 'Musculação com apoio técnico e acesso ao aplicativo.',
    badge: 'Melhor entrada',
    benefits: ['Musculação', 'Treino personalizado com apoio técnico dos professores', 'Acesso ao aplicativo'],
    payment_options: [
      { label: 'Mensal', price: 'R$ 139,90' },
      { label: 'Recorrente', price: 'R$ 129,90' },
      { label: '12 meses', price: '12x R$ 99,90' },
    ],
  },
  black: {
    plan_key: 'black',
    name: 'Plano Black',
    price_label: 'A partir de R$ 109,90',
    description: 'Plano completo para quem quer aproveitar mais a Forbody.',
    badge: 'Mais completo',
    benefits: ['Musculação', 'Aulas coletivas', 'Avaliação com bioimpedância a cada 90 dias', '5 convidados por mês', 'Acesso às outras unidades'],
    payment_options: [
      { label: 'Mensal', price: 'R$ 149,90' },
      { label: 'Recorrente', price: 'R$ 139,90' },
      { label: '12 meses', price: '12x R$ 109,90' },
    ],
  },
};

async function getMarketingData() {
  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return {
      source: 'fallback',
      hero: fallbackSections.home_hero,
      plansSection: fallbackSections.home_plans,
      redPlan: fallbackPlans.red,
      blackPlan: fallbackPlans.black,
    };
  }

  const [{ data: sections }, { data: plans }] = await Promise.all([
    supabase.from('site_marketing_sections').select('*').in('section_key', ['home_hero', 'home_plans']),
    supabase.from('site_plans').select('*').in('plan_key', ['red', 'black']).order('sort_order'),
  ]);

  const hero = sections?.find((section: any) => section.section_key === 'home_hero') || fallbackSections.home_hero;
  const plansSection = sections?.find((section: any) => section.section_key === 'home_plans') || fallbackSections.home_plans;
  const redPlan = plans?.find((plan: any) => plan.plan_key === 'red') || fallbackPlans.red;
  const blackPlan = plans?.find((plan: any) => plan.plan_key === 'black') || fallbackPlans.black;

  return {
    source: 'supabase',
    hero,
    plansSection,
    redPlan,
    blackPlan,
  };
}

const managerCards = [
  {
    title: 'Banner principal',
    description: 'Edite a headline, texto de apoio, botão e imagem principal da Home.',
    status: 'Editável',
  },
  {
    title: 'Fotos da Home',
    description: 'Base pronta para URLs. Upload direto entra na próxima etapa com Storage.',
    status: 'Preparado',
  },
  {
    title: 'Frases e copys',
    description: 'Controle as chamadas comerciais sem alterar código.',
    status: 'Editável',
  },
  {
    title: 'Planos Red e Black',
    description: 'Preço, descrição, selos e benefícios salvos no Supabase.',
    status: 'Editável',
  },
];

export default async function AdminMarketingPage() {
  const data = await getMarketingData();

  return (
    <div className="space-y-8 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/30">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-red-500">Admin / Marketing</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Marketing Manager próprio</h1>
            <p className="mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
              Edite banner principal, frases, promoções e planos da Forbody com dados salvos no Supabase, sem mexer no código.
            </p>
          </div>
          <Button disabled variant="b2b-primary" className="w-full max-w-xs uppercase tracking-[0.2em] sm:w-auto">
            Fonte: {data.source === 'supabase' ? 'Supabase' : 'Fallback'}
          </Button>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {managerCards.map((card) => (
          <div key={card.title} className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 shadow-sm shadow-black/20">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{card.title}</p>
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-red-300">
                {card.status}
              </span>
            </div>
            <p className="mt-6 text-sm leading-6 text-gray-400">{card.description}</p>
          </div>
        ))}
      </div>

      <MarketingManagerForm
        hero={data.hero}
        plansSection={data.plansSection}
        redPlan={data.redPlan}
        blackPlan={data.blackPlan}
      />
    </div>
  );
}
