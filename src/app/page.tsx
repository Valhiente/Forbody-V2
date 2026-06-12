import Link from "next/link";

const pillars = [
  "Musculação completa",
  "Bons profissionais",
  "Aulas coletivas",
  "Planos acessíveis",
];

const studentStats = [
  {
    value: "01",
    label: "Estrutura completa",
    description: "Academias bem equipadas para musculação, cardio e evolução diária.",
  },
  {
    value: "02",
    label: "Profissionais presentes",
    description: "Equipe preparada para orientar, acompanhar e ajudar no seu treino.",
  },
  {
    value: "03",
    label: "Aulas coletivas",
    description: "Mais movimento, energia e variedade para sua rotina não cair no automático.",
  },
];

const showcaseCards = [
  {
    eyebrow: "Estrutura",
    title: "Equipamentos para treinar com mais resultado.",
    description:
      "A Forbody oferece uma estrutura pensada para o aluno aproveitar melhor cada treino, com espaços organizados e equipamentos para diferentes objetivos.",
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=90",
  },
  {
    eyebrow: "Profissionais",
    title: "Orientação para você treinar com mais segurança.",
    description:
      "Bons profissionais fazem diferença na experiência do aluno: orientação, presença, correção e apoio para manter constância.",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=90",
  },
  {
    eyebrow: "Aulas coletivas",
    title: "Mais energia para quem gosta de treinar junto.",
    description:
      "As aulas coletivas ajudam a criar ritmo, motivação e uma experiência mais completa dentro da academia.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=90",
  },
];

const planCards = [
  {
    name: "Plano Red",
    price: "R$ 99,90",
    description: "Musculação com apoio técnico e acesso ao aplicativo.",
    tag: "Melhor entrada",
    featured: false,
    benefits: [
      "Musculação",
      "Treino personalizado com apoio técnico dos professores",
      "Acesso ao aplicativo",
    ],
  },
  {
    name: "Plano Black",
    price: "R$ 109,90",
    description: "Plano completo para quem quer aproveitar mais a Forbody.",
    tag: "Mais completo",
    featured: true,
    benefits: [
      "Musculação",
      "Aulas coletivas",
      "Avaliação com bioimpedância a cada 90 dias",
      "5 convidados por mês",
      "Acesso às outras unidades",
    ],
  },
];

const studentJourney = [
  "Escolha sua unidade",
  "Conheça a estrutura",
  "Veja planos e modalidades",
  "Comece a treinar",
];

const unitPreview = ["Triunfo", "Barão do Bananal", "Vila Virgínia", "Candido Portinari"];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <section className="relative min-h-screen overflow-hidden px-5 py-20 sm:px-8 lg:px-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center opacity-30 grayscale" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(220,38,38,0.3),transparent_30%),linear-gradient(90deg,#030303_0%,rgba(3,3,3,0.9)_35%,rgba(3,3,3,0.58)_70%,#030303_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.1)_0%,#030303_96%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:82px_82px] opacity-20" />
        </div>

        <div className="absolute left-0 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[150px]" />
        <div className="absolute bottom-10 right-0 h-[34rem] w-[34rem] translate-x-1/3 rounded-full bg-red-900/25 blur-[150px]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="animate-slide-up">
            <div className="mb-7 inline-flex items-center gap-3 border-l-4 border-red-600 bg-white/[0.04] px-5 py-3 text-[10px] font-black uppercase tracking-[0.34em] text-zinc-300 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.9)]" />
              Forbody Academia
            </div>

            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl xl:text-9xl">
              Forbody, feita para <span className="block text-red-600">cada etapa da sua vida.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Na Forbody, ajudamos você a conquistar seus objetivos, porque cada conquista sua também é nossa.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/unidades"
                className="rounded-sm bg-red-600 px-8 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-white shadow-[0_0_34px_rgba(220,38,38,0.28)] transition duration-300 hover:bg-red-700 hover:shadow-[0_0_46px_rgba(220,38,38,0.42)]"
              >
                Escolher unidade
              </Link>

              <Link
                href="#planos"
                className="group rounded-sm border border-white/15 bg-white/[0.04] px-8 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-white backdrop-blur-xl transition duration-300 hover:border-red-600 hover:bg-red-600/10"
              >
                Ver planos
                <span className="ml-2 inline-block text-red-500 transition group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
              {pillars.map((pillar) => (
                <div
                  key={pillar}
                  className="border border-white/10 bg-black/35 px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-xl transition duration-300 hover:border-red-600/50 hover:bg-red-600/10 hover:text-white"
                >
                  {pillar}
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-8 bg-red-600/10 blur-[90px]" />
            <div className="relative min-h-[560px] overflow-hidden border border-white/10 bg-[#080808]/90 shadow-2xl shadow-red-950/30 backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=90')] bg-cover bg-center opacity-30 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
              <div className="absolute right-6 top-6 border border-red-600/40 bg-black/60 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-red-300 backdrop-blur-xl">
                Planos Forbody
              </div>

              <div className="relative flex h-full min-h-[560px] flex-col justify-end p-6 sm:p-8">
                <div className="mb-7 max-w-lg">
                  <p className="text-xs font-black uppercase tracking-[0.34em] text-red-500">comece agora</p>
                  <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl">
                    Red ou Black. Escolha sua rotina.
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-300">
                    Planos para você decidir rápido, encontrar sua unidade e começar a treinar.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {planCards.map((plan) => (
                    <div
                      key={plan.name}
                      className={`border p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 ${
                        plan.featured
                          ? "border-red-600/60 bg-red-600/15"
                          : "border-white/10 bg-white/[0.06] hover:border-red-600/50 hover:bg-red-600/10"
                      }`}
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="text-lg font-black uppercase tracking-[-0.04em] text-white">
                          {plan.name.replace("Plano ", "")}
                        </p>
                        <span className="text-[9px] font-black uppercase tracking-[0.18em] text-red-300">
                          {plan.tag}
                        </span>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">A partir de</p>
                      <p className="mt-1 text-3xl font-black tracking-[-0.07em] text-white">{plan.price}</p>
                      <p className="mt-4 text-xs leading-relaxed text-zinc-400">{plan.description}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                  Valores referentes aos planos de 12 meses. Consulte condições na unidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="planos" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">
                Planos Forbody
              </p>
              <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">
                Escolha o plano que combina com sua rotina.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Dois caminhos para começar: Red para quem quer musculação com apoio técnico, e Black para quem quer a experiência completa da Forbody.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {planCards.map((plan) => (
              <article
                key={plan.name}
                className={`relative overflow-hidden border bg-[#080808] p-8 transition duration-300 hover:-translate-y-2 sm:p-10 ${
                  plan.featured
                    ? "border-red-600/60 shadow-[0_0_80px_rgba(220,38,38,0.18)]"
                    : "border-white/10 hover:border-red-600/50"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-600/15 blur-[90px]" />
                <div className="relative">
                  <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
                      {plan.name}
                    </h3>
                    <span className="border border-red-600/50 bg-red-600/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-red-300">
                      {plan.tag}
                    </span>
                  </div>

                  <p className="text-sm font-black uppercase tracking-[0.24em] text-zinc-400">{plan.description}</p>
                  <div className="mt-7 border border-white/10 bg-white/[0.04] p-6">
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-red-500">A partir de</p>
                    <p className="mt-2 text-5xl font-black uppercase tracking-[-0.07em] text-white sm:text-6xl">
                      {plan.price}
                    </p>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                        <span className="mt-1 h-2 w-2 flex-none rounded-full bg-red-600" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {studentStats.map((item) => (
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
            <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">
              Experiência Forbody
            </p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">
              Tudo pensado para você treinar melhor.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {showcaseCards.map((card) => (
              <article key={card.title} className="group relative min-h-[420px] overflow-hidden border border-white/10 bg-[#080808]">
                <div className="absolute inset-0 bg-cover bg-center opacity-35 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-45" style={{ backgroundImage: `url(${card.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
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
        <div className="mx-auto grid max-w-7xl gap-8 border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">
              Comece em poucos cliques
            </p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">
              Encontre sua Forbody e dê o próximo passo.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-400">
              Escolha uma unidade, veja endereço, links de matrícula e área do aluno.
            </p>
          </div>

          <div className="grid gap-4">
            {studentJourney.map((step, index) => (
              <div key={step} className="flex items-center gap-5 border border-white/10 bg-black/40 p-5">
                <span className="flex h-10 w-10 items-center justify-center bg-red-600 text-sm font-black text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white">{step}</p>
              </div>
            ))}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {unitPreview.map((unit) => (
                <span key={unit} className="border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-zinc-300">
                  {unit}
                </span>
              ))}
            </div>

            <Link
              href="/unidades"
              className="mt-4 inline-flex items-center justify-center rounded-sm bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-red-700"
            >
              Ver unidades
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
