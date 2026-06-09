import Link from "next/link";

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

const pillars = [
  "Musculação completa",
  "Bons profissionais",
  "Aulas coletivas",
  "Planos acessíveis",
];

const showcaseCards = [
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

const planCards = [
  {
    name: "Plano Red",
    highlight: "A partir de R$ 99,90",
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
    highlight: "A partir de R$ 109,90",
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

const unitPreview = [
  "Triunfo",
  "Barão do Bananal",
  "Vila Virgínia",
];

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

        <div className="absolute left-0 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/18 blur-[150px]" />
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
              <Link href="/unidades" className="rounded-sm bg-red-600 px-8 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-white shadow-[0_0_34px_rgba(220,38,38,0.28)] transition duration-300 hover:bg-red-700 hover:shadow-[0_0_46px_rgba(220,38,38,0.42)]">
                Escolher unidade
              </Link>
              <Link href="#estrutura" className="group rounded-sm border border-white/15 bg-white/[0.04] px-8 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-white backdrop-blur-xl transition duration-300 hover:border-red-600 hover:bg-red-600/10">
                Conhecer estrutura
                <span className="ml-2 inline-block text-red-500 transition group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
              {pillars.map((pillar) => (
                <div key={pillar} className="border border-white/10 bg-black/35 px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-xl transition duration-300 hover:border-red-600/50 hover:bg-red-600/10 hover:text-white">
                  {pillar}
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-8 bg-red-600/10 blur-[90px]" />
            <div className="relative min-h-[560px] overflow-hidden border border-white/10 bg-[#080808]/90 shadow-2xl shadow-red-950/30 backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=90')] bg-cover bg-center opacity-38 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/72 to-black/10" />
              <div className="absolute right-6 top-6 border border-red-600/40 bg-black/60 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-red-300 backdrop-blur-xl">
                Para alunos
              </div>

              <div className="relative flex h-full min-h-[560px] flex-col justify-end p-6 sm:p-8">
                <div className="mb-8 max-w-md">
                  <p className="text-xs font-black uppercase tracking-[0.34em] text-red-500">treino, energia e evolução</p>
                  <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl">
                    Musculação, aulas e estrutura em um só lugar.
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-300">
                    A Home agora fala primeiro com quem quer treinar, conhecer a academia e encontrar a unidade ideal.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {studentStats.map((card) => (
                    <div key={card.label} className="border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-red-600/50 hover:bg-red-600/10">
                      <p className="text-3xl font-black text-white">{card.value}</p>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-400">{card.label}</p>
                      <p className="mt-3 text-xs leading-relaxed text-zinc-400">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="estrutura" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">Vitrine para o aluno</p>
              <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl">
                Tudo que o aluno procura em uma academia.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              A Home passa a apresentar a Forbody como academia completa: estrutura, acompanhamento, aulas, preço acessível e produtos para a rotina de treino.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {showcaseCards.map((block) => (
              <article key={block.title} className="group relative min-h-[520px] overflow-hidden border border-white/10 bg-black/40 transition duration-500 hover:-translate-y-2 hover:border-red-600/60">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-44" style={{ backgroundImage: `url(${block.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/76 to-black/20" />
                <div className="absolute inset-x-0 top-0 h-1 bg-red-600 opacity-0 transition group-hover:opacity-100" />
                <div className="relative flex min-h-[520px] flex-col justify-end p-7">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">{block.eyebrow}</p>
                  <h3 className="mt-5 text-3xl font-black uppercase leading-none tracking-[-0.05em] text-white">{block.title}</h3>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-300">{block.description}</p>
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
              <p className="border-l-4 border-red-600 pl-4 text-xs font-black uppercase tracking-[0.34em] text-red-500">Planos Forbody</p>
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
              <article key={plan.name} className={`relative overflow-hidden border bg-[#080808] p-8 transition duration-300 hover:-translate-y-2 sm:p-10 ${plan.featured ? "border-red-600/60 shadow-[0_0_80px_rgba(220,38,38,0.18)]" : "border-white/10 hover:border-red-600/50"}`}>
                <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-600/14 blur-[90px]" />
                <div className="relative">
                  <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">{plan.name}</h3>
                    <span className="border border-red-600/50 bg-red-600/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-red-300">{plan.tag}</span>
                  </div>

                  <p className="text-sm font-black uppercase tracking-[0.24em] text-zinc-400">{plan.description}</p>
                  <div className="mt-7 border border-white/10 bg-white/[0.04] p-6">
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-red-500">A partir de</p>
                    <p className="mt-2 text-5xl font-black uppercase tracking-[-0.07em] text-white sm:text-6xl">{plan.highlight.replace("A partir de ", "")}</p>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-600 shadow-[0_0_16px_rgba(220,38,38,0.8)]" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link href="/unidades" className={`mt-9 inline-flex w-full justify-center rounded-sm px-8 py-4 text-center text-xs font-black uppercase tracking-[0.24em] transition ${plan.featured ? "bg-red-600 text-white hover:bg-red-700" : "border border-white/15 bg-white/[0.04] text-white hover:border-red-600 hover:bg-red-600/10"}`}>
                    Escolher {plan.name.replace("Plano ", "")}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            Valores referentes aos planos de 12 meses. Consulte condições na unidade escolhida.
          </p>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl overflow-hidden border border-white/10 bg-[#080808] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[460px] overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=90')] bg-cover bg-center opacity-38 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/50 to-[#080808]" />
            <div className="absolute bottom-8 left-8 border-l-4 border-red-600 bg-black/55 px-5 py-4 backdrop-blur-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-zinc-400">Forbody Academia</p>
              <p className="mt-2 text-3xl font-black uppercase tracking-[-0.06em] text-white">Rotina real.</p>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-red-500">Caminho do aluno</p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-[0.94] tracking-[-0.06em] text-white sm:text-5xl">
              Da primeira visita ao primeiro treino.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-300">
              Cada seção da Home passa a ajudar o aluno a entender a Forbody e avançar para uma unidade.
            </p>

            <div className="mt-10 space-y-4">
              {studentJourney.map((step, index) => (
                <div key={step} className="flex items-center gap-4 border border-white/10 bg-white/[0.03] p-4 transition hover:border-red-600/50 hover:bg-red-600/10">
                  <span className="flex h-10 w-10 items-center justify-center bg-red-600 text-sm font-black text-white">0{index + 1}</span>
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-zinc-200">{step}</p>
                </div>
              ))}
            </div>

            <Link href="/unidades" className="mt-10 inline-flex rounded-sm bg-red-600 px-7 py-4 text-center text-xs font-black uppercase tracking-[0.22em] text-white transition hover:bg-red-700">
              Ver unidades
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-white/10 bg-[#080808] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-red-500">Unidades Forbody</p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-[0.94] tracking-[-0.06em] text-white sm:text-5xl">
              Encontre uma Forbody perto de você.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300">
              A Home direciona o aluno para o caminho mais importante: escolher uma unidade e iniciar o contato.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {unitPreview.map((unit) => (
                <div key={unit} className="border border-white/10 bg-black/35 px-5 py-5 transition hover:border-red-600/50 hover:bg-red-600/10">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white">{unit}</p>
                </div>
              ))}
            </div>

            <Link href="/unidades" className="mt-10 inline-flex rounded-sm bg-red-600 px-8 py-4 text-xs font-black uppercase tracking-[0.22em] text-white transition hover:bg-red-700">
              Ver todas as unidades
            </Link>
          </div>

          <div className="relative min-h-[420px] overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=1200&q=90')] bg-cover bg-center opacity-42 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/52 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-red-500">Forbody</p>
              <h3 className="mt-3 text-3xl font-black uppercase leading-none tracking-[-0.05em] text-white">Mais perto. Mais direto. Mais forte.</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden border border-red-600/30 bg-red-600 px-8 py-14 text-white shadow-[0_0_80px_rgba(220,38,38,0.22)] sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.24),transparent_26%),linear-gradient(135deg,rgba(0,0,0,0.18),rgba(0,0,0,0.45))]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-white/80">Comece pela unidade</p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl">
                A Forbody está pronta para receber você.
              </h2>
              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/82">
                Escolha sua unidade, conheça a estrutura e dê o próximo passo para começar a treinar.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/unidades" className="rounded-sm bg-black px-8 py-4 text-center text-xs font-black uppercase tracking-[0.24em] text-white transition hover:bg-zinc-950">
                Escolher unidade
              </Link>
              <Link href="#estrutura" className="rounded-sm border border-white/35 px-8 py-4 text-center text-xs font-black uppercase tracking-[0.24em] text-white transition hover:bg-white/10">
                Ver estrutura
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
