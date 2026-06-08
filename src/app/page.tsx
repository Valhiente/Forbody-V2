import Link from "next/link";

const performanceCards = [
  {
    value: "24/7",
    label: "Presença digital",
    description: "Estrutura preparada para captação, matrícula, unidades e expansão da rede.",
  },
  {
    value: "+4",
    label: "Unidades ativas",
    description: "Base regional forte com arquitetura pronta para crescer como rede nacional.",
  },
  {
    value: "RED",
    label: "Identidade própria",
    description: "Marca mais agressiva, premium e reconhecível em todos os pontos de contato.",
  },
];

const pillars = [
  "Musculação completa",
  "Ambiente premium",
  "Tecnologia operacional",
  "Franquia escalável",
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <section className="premium-depth relative min-h-screen px-6 py-20 sm:px-8 lg:px-12">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-red-600/30 blur-[120px]" />
          <div className="absolute bottom-20 right-8 h-96 w-96 rounded-full bg-red-900/20 blur-[140px]" />
          <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-white/5 blur-[120px]" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#030303_95%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-slide-up">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-red-600/30 bg-red-600/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-red-400 shadow-lg shadow-red-600/10 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_20px_rgba(227,6,19,0.9)]" />
              ForBody National Network
            </div>

            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl lg:text-8xl">
              A nova era da <span className="text-red-600">ForBody</span> começa aqui.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Plataforma premium para unidades, matrículas, franquias e expansão. Visual forte, navegação direta e presença digital com cara de rede nacional.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/unidades" className="cta-button rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em]">
                Escolher unidade
              </Link>
              <Link href="/franquias" className="group rounded-full border border-white/15 bg-white/5 px-8 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur-xl transition duration-300 hover:border-red-600 hover:bg-red-600/10 hover:text-red-400">
                Seja franqueado
                <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
              {pillars.map((pillar) => (
                <div key={pillar} className="glass-effect rounded-2xl px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-200 transition duration-300 hover:border-red-600/40 hover:text-white">
                  {pillar}
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-8 rounded-[3rem] bg-red-600/10 blur-[80px]" />
            <div className="premium-card aggressive-card relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#090909]/90 p-6 shadow-2xl shadow-red-950/30 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1600&q=85')] bg-cover bg-center opacity-30 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="absolute right-6 top-6 rounded-full border border-red-600/30 bg-red-600/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-300 backdrop-blur-xl">
                Premium UI 10.4
              </div>

              <div className="relative flex h-full min-h-[512px] flex-col justify-end">
                <div className="mb-8 max-w-md">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">rede nacional</p>
                  <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl">
                    Força visual para vender mais.
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-slate-300">
                    Um site com estética de alto impacto, preparado para alunos, investidores e expansão da marca.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {performanceCards.map((card) => (
                    <div key={card.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-red-600/50 hover:bg-red-600/10">
                      <p className="text-3xl font-black text-white">{card.value}</p>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-400">{card.label}</p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-400">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-red-500">ForBody System</p>
              <h2 className="mt-5 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">
                Visual agressivo. Experiência simples. Conversão direta.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Aluno encontra unidade', 'Investidor entende franquia', 'Marca transmite autoridade'].map((item, index) => (
                <div key={item} className="premium-card rounded-3xl p-6">
                  <span className="text-sm font-black text-red-500">0{index + 1}</span>
                  <h3 className="mt-5 text-lg font-black uppercase leading-tight text-white">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
