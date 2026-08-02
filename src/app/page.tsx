import Link from "next/link";
import { createPublicClient } from "@/lib/supabase/server";
import HomeShowcaseRotatingCard from "@/components/home/HomeShowcaseRotatingCard";

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
  plans: MarketingPlan[];
};

type MarketingPlan = {
  plan_key: string;
  name: string;
  price_label: string;
  description: string | null;
  badge: string | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  sort_order: number | null;
};

const officialHeroBackgroundImage =
  "/images/hero/forbody-hero-background.webp";

const fallbackPlanCards = [
  {
    name: "Plano Red",
    price: "R$ 99,90",
    description: "Musculação com apoio técnico e acesso ao aplicativo.",
    tag: "Melhor entrada",
    featured: false,
  },
  {
    name: "Plano Black",
    price: "R$ 109,90",
    description: "Plano completo para quem quer aproveitar mais a Forbody.",
    tag: "Mais completo",
    featured: true,
  },
];

const fallbackShowcaseCards = [
  {
    eyebrow: "Estrutura",
    title: "Equipamentos para treinar com mais resultado.",
    description:
      "A Forbody oferece uma estrutura pensada para o aluno aproveitar melhor cada treino, com espaços organizados e equipamentos para diferentes objetivos.",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=90",
  },
  {
    eyebrow: "Profissionais",
    title: "Orientação para você treinar com mais segurança.",
    description:
      "Bons profissionais fazem diferença na experiência do aluno: orientação, presença, correção e apoio para manter constância.",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=90",
  },
  {
    eyebrow: "Aulas coletivas",
    title: "Mais energia para quem gosta de treinar junto.",
    description:
      "As aulas coletivas ajudam a criar ritmo, motivação e uma experiência mais completa dentro da academia.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=90",
  },
];

const heroProofItems = [
  "5 unidades abertas",
  "3 em abertura",
  "Planos a partir de R$ 99,90",
  "Professores presentes",
];

const heroUnitCards = [
  { name: "Triunfo", href: "/unidades/triunfo" },
  { name: "Barão do Bananal", href: "/unidades/barao-do-bananal" },
  { name: "Vila Virgínia", href: "/unidades/vila-virginia" },
  { name: "Portinari", href: "/unidades/portinari" },
  { name: "Campo Belo", href: "/unidades/campo-belo" },
];

function normalizeSupplierHref(value: string | null | undefined) {
  const cleanValue = value?.trim();

  if (!cleanValue || cleanValue === "#") return undefined;
  if (cleanValue.startsWith("/") || cleanValue.startsWith("#")) return cleanValue;
  if (/^https?:\/\//i.test(cleanValue)) return cleanValue;

  return `https://${cleanValue}`;
}

function renderHeroTitle(title: string) {
  const marker = "Forbody";
  const index = title.toLowerCase().indexOf(marker.toLowerCase());

  if (index === -1) return title;

  return (
    <>
      {title.slice(0, index)}
      <span className="text-red-600 drop-shadow-[0_0_28px_rgba(220,38,38,0.55)]">
        {title.slice(index, index + marker.length)}
      </span>
      {title.slice(index + marker.length)}
    </>
  );
}

function safeText(value: string | null | undefined, fallback: string) {
  return value && value.trim().length > 0 ? value : fallback;
}

async function getHomeMarketingData(): Promise<HomeMarketingData> {
  try {
    const supabase = createPublicClient();

    const [sectionsResult, itemsResult, plansResult] = await Promise.all([
      supabase
        .from("site_marketing_sections")
        .select("section_key,title,subtitle,description,button_label,button_href,is_active,sort_order")
        .order("sort_order", { ascending: true }),
      supabase
        .from("site_marketing_items")
        .select("section_key,item_key,title,description,badge,image_url,is_active,sort_order")
        .order("sort_order", { ascending: true }),
      supabase
        .from("site_plans")
        .select("plan_key,name,price_label,description,badge,is_featured,is_active,sort_order")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
    ]);

    return {
      sections: (sectionsResult.data || []) as MarketingSection[],
      items: (itemsResult.data || []) as MarketingItem[],
      plans: (plansResult.data || []) as MarketingPlan[],
    };
  } catch (error) {
    console.error("Erro ao carregar marketing da Home:", error);
    return { sections: [], items: [], plans: [] };
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
  const photoItems = itemsBySection(marketing.items, "home_photos");
  const supplierItems = itemsBySection(marketing.items, "home_suppliers");
  const planCards =
    marketing.plans.length > 0
      ? marketing.plans.map((plan) => ({
          name: plan.name,
          price: plan.price_label.replace(/^A partir de\s*/i, ""),
          description: safeText(plan.description, "Plano Forbody."),
          tag: safeText(plan.badge, plan.is_featured ? "Mais completo" : "Melhor entrada"),
          featured: plan.is_featured === true,
        }))
      : fallbackPlanCards;

  const hero = {
    title: safeText(heroSection?.title, "Sua melhor versão começa dentro da Forbody."),
    description: safeText(
      heroSection?.description,
      "Estrutura completa, professores presentes, planos acessíveis e unidades preparadas para acompanhar você em cada fase da sua rotina."
    ),
    buttonLabel: safeText(heroSection?.button_label, "Escolher unidade"),
    buttonHref: safeText(heroSection?.button_href, "/unidades"),
  };

  const showcaseCards = fallbackShowcaseCards.map((card, index) => {
    const baseKey = `card_${index + 1}`;
    const cardPhotos = photoItems.filter(
      (item) =>
        item.image_url &&
        (item.item_key === baseKey || item.item_key.startsWith(`${baseKey}_`))
    );
    const mainPhoto = cardPhotos.find((item) => item.item_key === baseKey) || cardPhotos[0];
    const images = cardPhotos
      .map((item) => item.image_url)
      .filter((imageUrl): imageUrl is string => Boolean(imageUrl));

    return {
      ...card,
      title: mainPhoto?.title || card.title,
      description: mainPhoto?.description || card.description,
      images: images.length > 0 ? images : [card.image],
    };
  });

  const suppliers = supplierItems
    .map((item) => ({
      name: safeText(item.title, item.badge || "Fornecedor Forbody"),
      href: normalizeSupplierHref(item.description),
      logo: item.image_url?.trim(),
    }))
    .filter((supplier) => supplier.href && supplier.logo);

  const mainVisualImage =
    photoItems.find((item) => item.item_key === "main")?.image_url ||
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=90";

  return (
    <main className="relative isolate min-h-screen overflow-x-clip text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 saturate-[1.08]"
          style={{ backgroundImage: `url(${officialHeroBackgroundImage})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,transparent_0%,rgba(3,3,3,0.08)_38%,rgba(3,3,3,0.54)_100%),linear-gradient(90deg,rgba(3,3,3,0.78)_0%,rgba(3,3,3,0.5)_34%,rgba(3,3,3,0.16)_68%,rgba(3,3,3,0.34)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(3,3,3,0.18)_0%,rgba(3,3,3,0.38)_52%,rgba(3,3,3,0.64)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      <section className="relative z-10 isolate min-h-screen overflow-clip">

        <div className="absolute -left-32 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full bg-red-600/20 blur-[160px]" />
        <div className="absolute bottom-10 right-0 h-[28rem] w-[28rem] rounded-full bg-red-600/10 blur-[140px]" />

        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-5 pb-10 pt-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pt-28 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="animate-slide-up">
            <h1 className="max-w-4xl text-[2.25rem] font-black uppercase leading-[0.94] tracking-[-0.05em] text-white drop-shadow-[0_10px_34px_rgba(0,0,0,0.7)] min-[390px]:text-[2.55rem] sm:text-[4rem] lg:text-[5rem] xl:text-[5.6rem]">
              {renderHeroTitle(hero.title)}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-200 sm:mt-7 sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:mt-9 sm:flex-row">
              <Link href={hero.buttonHref} className="rounded-lg bg-red-600 px-7 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_0_38px_rgba(220,38,38,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-red-700 sm:px-8 sm:text-sm sm:tracking-[0.18em]">
                {hero.buttonLabel} <span className="ml-2">→</span>
              </Link>
              <Link href="/franquias" className="group rounded-lg border border-white/20 bg-black/30 px-7 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-red-600 hover:bg-red-600/10 sm:px-8 sm:text-sm sm:tracking-[0.18em]">
                Seja franqueado <span className="ml-2 inline-block text-red-500 transition group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="mt-9 grid overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/45 shadow-[0_0_80px_rgba(220,38,38,0.12)] backdrop-blur-xl sm:mt-10 sm:grid-cols-2">
              {heroProofItems.map((item) => (
                <div key={item} className="border-b border-white/10 px-4 py-4 text-[10px] font-black uppercase tracking-[0.13em] text-zinc-200 even:border-l sm:px-5 sm:text-xs sm:tracking-[0.16em] sm:[&:nth-child(n+3)]:border-b-0">
                  <span className="mr-2 text-red-500">●</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in">
            <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="grid gap-4">
                  {planCards.map((plan) => (
                    <article key={plan.name} className={`relative overflow-hidden rounded-[1.35rem] border p-5 transition duration-300 hover:-translate-y-1 ${plan.featured ? "border-red-600/70 bg-[linear-gradient(145deg,rgba(70,4,9,0.92),rgba(3,3,3,0.96))] shadow-[0_0_42px_rgba(220,38,38,0.12)] backdrop-blur-xl" : "border-white/10 bg-white/[0.06]"}`}>
                      <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-red-400">{plan.tag}</p>
                          <h2 className="mt-3 text-2xl font-black uppercase tracking-[-0.06em] text-white">{plan.name}</h2>
                        </div>
                        <div className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-300">
                          Plano
                        </div>
                      </div>

                      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">A partir de</p>
                      <p className="mt-1 text-4xl font-black tracking-[-0.08em] text-white">{plan.price}</p>
                      <p className="mt-4 text-xs leading-relaxed text-zinc-300">{plan.description}</p>

                      <Link href="/unidades" className="mt-5 inline-flex w-full justify-center rounded-lg bg-red-600 px-5 py-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700">
                        Escolher unidade
                      </Link>
                    </article>
                  ))}
                </div>

                <article className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#080808]/90 p-5">
                  <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${mainVisualImage})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/88 to-black/40" />

                  <div className="relative">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-400">Nossas unidades</p>
                    <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-[-0.06em] text-white">
                      Encontre sua unidade Forbody.
                    </h2>
                    <p className="mt-4 text-xs leading-relaxed text-zinc-300">
                      Encontre a Forbody mais próxima e veja os detalhes da unidade.
                    </p>

                    <div className="mt-6 grid gap-3">
                      {heroUnitCards.map((unit) => (
                        <Link key={unit.href + unit.name} href={unit.href} className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/45 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-red-600/60 hover:bg-red-600/10">
                          <span>
                            <span className="block text-sm font-black uppercase tracking-[-0.03em] text-white">{unit.name}</span>
                            <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Ver unidade</span>
                          </span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white transition group-hover:translate-x-1">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">Por que treinar na Forbody?</p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">Tudo pensado para você treinar melhor.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {showcaseCards.map((card) => (
              <HomeShowcaseRotatingCard
                key={card.title}
                eyebrow={card.eyebrow}
                title={card.title}
                description={card.description}
                images={card.images}
              />
            ))}
          </div>
        </div>
      </section>

      {suppliers.length > 0 && (
        <section id="fornecedores" className="relative z-10 px-5 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-white/10 bg-white/[0.025] px-5 py-6 sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-red-500">Empresas parceiras</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Marcas que fazem parte da estrutura Forbody.
                </p>
              </div>

              <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:max-w-xl">
                {suppliers.map((supplier) => (
                  <a
                    key={`${supplier.name}-${supplier.href}`}
                    href={supplier.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir site do fornecedor ${supplier.name}`}
                    className="group flex min-h-[82px] items-center justify-center rounded-2xl border border-white/10 bg-black/30 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-red-600/50 hover:bg-red-600/10"
                  >
                    <span
                      className="block h-12 w-full bg-contain bg-center bg-no-repeat opacity-55 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                      style={{ backgroundImage: `url(${supplier.logo})` }}
                    />
                    <span className="sr-only">{supplier.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="relative z-10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <div>
            <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">Unidades</p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">Encontre sua unidade Forbody.</h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-300">Escolha a unidade mais próxima, veja os detalhes e comece seu plano hoje.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {heroUnitCards.map((unit) => (
              <Link key={unit.href + unit.name} href={unit.href} className="group border border-white/10 bg-black/30 p-5 transition hover:-translate-y-1 hover:border-red-600/50 hover:bg-red-600/10">
                <p className="text-lg font-black uppercase tracking-[-0.04em] text-white">{unit.name}</p>
                <span className="mt-4 inline-flex text-xs font-black uppercase tracking-[0.2em] text-red-500 group-hover:text-red-400">Ver unidade →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
