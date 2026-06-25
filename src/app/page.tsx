import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const revalidate = 60;

type MarketingSection = {
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  button_label: string | null;
  button_href: string | null;
  is_active: boolean | null;
  sort_order: number | null;
};

type MarketingItem = {
  section_key: string;
  item_key: string;
  title: string | null;
  description: string | null;
  badge: string | null;
  image_url: string | null;
  is_active: boolean | null;
  sort_order: number | null;
};

type HomeMarketingData = {
  sections: MarketingSection[];
  items: MarketingItem[];
};

const officialHeroBackgroundImage =
  process.env.NEXT_PUBLIC_FORBODY_HERO_BACKGROUND_URL ||
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1800&q=90";

const heroProofItems = [
  { value: "4", label: "unidades" },
  { value: "R$ 99,90", label: "planos a partir de" },
  { value: "Professores", label: "presentes" },
  { value: "Aulas", label: "coletivas" },
];

const fallbackPlanCards = [
  {
    name: "Plano Red",
    price: "R$ 99,90",
    description: "Musculação com apoio técnico e acesso ao aplicativo.",
    tag: "Melhor entrada",
    featured: false,
    benefits: ["Musculação", "Treino personalizado com apoio técnico dos professores", "Acesso ao aplicativo"],
  },
  {
    name: "Plano Black",
    price: "R$ 109,90",
    description: "Plano completo para quem quer aproveitar mais a Forbody.",
    tag: "Mais completo",
    featured: true,
    benefits: ["Musculação", "Aulas coletivas", "Avaliação com bioimpedância a cada 90 dias", "5 convidados por mês", "Acesso às outras unidades"],
  },
];

const fallbackStudentStats = [
  { value: "01", label: "Estrutura completa", description: "Academias bem equipadas para musculação, cardio e evolução diária." },
  { value: "02", label: "Profissionais presentes", description: "Equipe preparada para orientar, acompanhar e ajudar no seu treino." },
  { value: "03", label: "Aulas coletivas", description: "Mais movimento, energia e variedade para sua rotina não cair no automático." },
];

const fallbackShowcaseCards = [
  {
    eyebrow: "Estrutura",
    title: "Equipamentos para treinar com mais resultado.",
    description: "A Forbody oferece uma estrutura pensada para o aluno aproveitar melhor cada treino, com espaços organizados e equipamentos para diferentes objetivos.",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=90",
  },
  {
    eyebrow: "Profissionais",
    title: "Orientação para você treinar com mais segurança.",
    description: "Bons profissionais fazem diferença na experiência do aluno: orientação, presença, correção e apoio para manter constância.",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=90",
  },
  {
    eyebrow: "Aulas coletivas",
    title: "Mais energia para quem gosta de treinar junto.",
    description: "As aulas coletivas ajudam a criar ritmo, motivação e uma experiência mais completa dentro da academia.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=90",
  },
];

const fallbackTestimonials = [
  {
    quote: "Os professores ajudam de verdade e deixam o treino mais seguro para quem está começando.",
    source: "Avaliação Google de aluno Forbody",
  },
  {
    quote: "Ambiente organizado, estrutura completa e uma energia que ajuda a manter constância.",
    source: "Avaliação Google de aluno Forbody",
  },
  {
    quote: "A experiência fica melhor quando a unidade é limpa, bem equipada e a equipe está presente.",
    source: "Avaliação Google de aluno Forbody",
  },
];

const unitPreview = ["Triunfo", "Barão do Bananal", "Vila Virgínia", "Candido Portinari"];

function safeText(value: string | null | undefined, fallback: string) {
  return value && value.trim().length > 0 ? value : fallback;
}

function renderHeroTitle(title: string) {
  const marker = "Forbody";
  const index = title.toLowerCase().indexOf(marker.toLowerCase());

  if (index === -1) return title;

  return (
    <>
      {title.slice(0, index)}
      <span className="text-red-600 drop-shadow-[0_0_28px_rgba(220,38,38,0.55)]">{title.slice(index, index + marker.length)}</span>
      {title.slice(index + marker.length)}
    </>
  );
}

async function getHomeMarketingData(): Promise<HomeMarketingData> {
  try {
    const supabase = await createSupabaseAdminClient();
    if (!supabase) return { sections: [], items: [] };

    const [sectionsResult, itemsResult] = await Promise.all([
      supabase
        .from("site_marketing_sections")
        .select("section_key,title,subtitle,description,button_label,button_href,is_active,sort_order")
        .order("sort_order", { ascending: true }),
      supabase
        .from("site_marketing_items")
        .select("section_key,item_key,title,description,badge,image_url,is_active,sort_order")
        .order("sort_order", { ascending: true }),
    ]);

    return {
      sections: (sectionsResult.data || []) as MarketingSection[],
      items: (itemsResult.data || []) as MarketingItem[],
    };
  } catch (error) {
    console.error("Erro ao carregar marketing da Home:", error);
    return { sections: [], items: [] };
  }
}

function sectionByKey(sections: MarketingSection[], key: string) {
  return sections.find((section) => section.section_key === key && section.is_active !== false);
}

function itemsBySection(items: MarketingItem[], key: string) {
  return items
    .filter((item) => item.section_key === key && item.is_active !== false)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

export default async function HomePage() {
  const marketing = await getHomeMarketingData();
  const heroSection = sectionByKey(marketing.sections, "home_hero");
  const plansSection = sectionByKey(marketing.sections, "home_plans");
  const photoItems = itemsBySection(marketing.items, "home_photos");

  const hero = {
    eyebrow: safeText(heroSection?.subtitle, "Forbody Academia"),
    title: safeText(heroSection?.title, "Sua melhor versão começa na Forbody."),
    description: safeText(
      heroSection?.description,
      "Estrutura completa, professores presentes, planos acessíveis e acompanhamento real em cada fase da sua rotina."
    ),
    buttonLabel: safeText(heroSection?.button_label, "Quero começar agora"),
    buttonHref: safeText(heroSection?.button_href, "/unidades"),
  };

  const showcaseCards = fallbackShowcaseCards.map((card, index) => {
    const photo = photoItems.find((item) => item.item_key === `card_${index + 1}`);
    return { ...card, image: photo?.image_url || card.image, title: photo?.title || card.title, description: photo?.description || card.description };
  });

  const planCards = fallbackPlanCards;

  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-14 pt-28 sm:px-8 lg:px-12 lg:pt-32">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-75 saturate-[1.08]"
            style={{ backgroundImage: `url(${officialHeroBackgroundImage})`, backgroundPosition: "center right" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(220,38,38,0.26),transparent_34%),linear-gradient(90deg,#030303_0%,rgba(3,3,3,0.96)_31%,rgba(3,3,3,0.72)_57%,rgba(3,3,3,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.08)_0%,rgba(3,3,3,0.2)_58%,#030303_100%)]" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent" />
        </div>

        <div className="absolute -left-32 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full bg-red-600/20 blur-[160px]" />
        <div className="absolute bottom-10 right-0 h-[28rem] w-[28rem] rounded-full bg-red-600/10 blur-[140px]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-7xl flex-col justify-center">
          <div className="max-w-4xl animate-slide-up">
            <p className="mb-7 inline-flex border-l-4 border-red-600 bg-black/25 px-4 py-2 text-xs font-black uppercase tracking-[0.34em] text-red-500 backdrop-blur-xl">
              {hero.eyebrow}
            </p>
            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.075em] text-white drop-shadow-[0_10px_34px_rgba(0,0,0,0.7)] sm:text-7xl lg:text-[6.6rem]">
              {renderHeroTitle(hero.title)}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-xl">{hero.description}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={hero.buttonHref} className="rounded-lg bg-red-600 px-8 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_0_38px_rgba(220,38,38,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-red-700">
                {hero.buttonLabel} <span className="ml-2">→</span>
              </Link>
              <Link href="#planos" className="group rounded-lg border border-white/20 bg-black/30 px-8 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-red-600 hover:bg-red-600/10">
                Ver planos <span className="ml-2 inline-block text-red-500 transition group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <p className="mt-8 flex items-center gap-3 text-sm font-semibold text-zinc-200">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-600/40 bg-red-600/10 text-red-500">⌖</span>
              Escolha a unidade <strong className="text-white">mais próxima</strong> e comece hoje.
            </p>
          </div>

          <div className="mt-12 grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/45 shadow-[0_0_80px_rgba(220,38,38,0.12)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
            {heroProofItems.map((item) => (
              <div key={item.label} className="border-b border-white/10 p-5 sm:border-r lg:border-b-0 last:border-r-0">
                <p className="text-3xl font-black uppercase tracking-[-0.06em] text-white sm:text-4xl">{item.value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-red-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">Planos Forbody</p>
              <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">
                {safeText(plansSection?.title, "Escolha o plano ideal para sua rotina.")}
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              {safeText(plansSection?.description, "Comece com o Plano Red ou viva a experiência completa com o Plano Black.")}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {planCards.map((plan) => (
              <article key={plan.name} className={`relative overflow-hidden border bg-[#080808] p-8 transition duration-300 hover:-translate-y-2 sm:p-10 ${plan.featured ? "border-red-600/60 shadow-[0_0_80px_rgba(220,38,38,0.18)]" : "border-white/10 hover:border-red-600/50"}`}>
                <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />
                <h3 className="text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">{plan.name}</h3>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.24em] text-zinc-400">{plan.description}</p>
                <div className="mt-7 border border-white/10 bg-white/[0.04] p-6">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-red-500">A partir de</p>
                  <p className="mt-2 text-5xl font-black uppercase tracking-[-0.07em] text-white sm:text-6xl">{plan.price}</p>
                </div>
                <ul className="mt-8 space-y-4">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300"><span className="mt-1 h-2 w-2 flex-none rounded-full bg-red-600" />{benefit}</li>
                  ))}
                </ul>
                <Link href="/unidades" className="mt-8 inline-flex w-full justify-center rounded-sm bg-red-600 px-6 py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-700">
                  Escolher unidade
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {fallbackStudentStats.map((item) => (
              <article key={item.value} className="border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-red-600/50">
                <p className="text-5xl font-black tracking-[-0.08em] text-red-600">{item.value}</p>
                <h3 className="mt-6 text-2xl font-black uppercase tracking-[-0.04em] text-white">{item.label}</h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">Experiência Forbody</p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">Tudo pensado para você treinar melhor.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {showcaseCards.map((card) => (
              <article key={card.title} className="group relative min-h-[420px] overflow-hidden border border-white/10 bg-[#080808]">
                <div className="absolute inset-0 bg-cover bg-center opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-70" style={{ backgroundImage: `url(${card.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/72 to-transparent" />
                <div className="relative flex h-full min-h-[420px] flex-col justify-end p-7">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">{card.eyebrow}</p>
                  <h3 className="mt-4 text-2xl font-black uppercase leading-tight text-white">{card.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">Avaliações Google</p>
              <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">O que os alunos mais valorizam.</h2>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm leading-relaxed text-zinc-300">
                Depoimentos apresentados como resumo institucional de avaliações e comentários recebidos pelas unidades Forbody. A próxima etapa será importar avaliações reais com nome e texto exatamente como aparecem no Google.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {fallbackTestimonials.map((testimonial) => (
              <article key={testimonial.quote} className="relative overflow-hidden border border-white/10 bg-[#080808] p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600/50 hover:shadow-[0_0_64px_rgba(220,38,38,0.14)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />
                <p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">★★★★★</p>
                <p className="mt-7 text-lg font-semibold leading-relaxed text-white">“{testimonial.quote}”</p>
                <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-zinc-500">{testimonial.source}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <div>
            <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">Unidades</p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">Escolha onde começar.</h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-300">Encontre a unidade Forbody mais próxima e fale com nossa equipe para começar hoje.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {unitPreview.map((unit) => (
              <div key={unit} className="border border-white/10 bg-black/30 p-5">
                <p className="text-lg font-black uppercase tracking-[-0.04em] text-white">{unit}</p>
                <Link href="/unidades" className="mt-4 inline-flex text-xs font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-400">Ver unidade →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 pt-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl border border-red-600/30 bg-red-600/10 p-8 text-center shadow-[0_0_120px_rgba(220,38,38,0.14)] sm:p-12">
          <p className="text-xs font-black uppercase tracking-[0.34em] text-red-300">Pronto para começar?</p>
          <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">Escolha sua unidade Forbody e dê o primeiro passo hoje.</h2>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/unidades" className="rounded-sm bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-[0.22em] text-white hover:bg-red-700">Escolher unidade</Link>
            <Link href="#planos" className="rounded-sm border border-white/15 px-8 py-4 text-sm font-black uppercase tracking-[0.22em] text-white hover:border-red-600">Ver planos</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
