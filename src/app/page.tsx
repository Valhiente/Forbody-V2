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
    description: "Marca intensa, reconhecível e alinhada em todos os pontos de contato.",
  },
];

const pillars = [
  "Musculação completa",
  "Ambiente de presença",
  "Atendimento próximo",
  "Franquia escalável",
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <section className="relative min-h-screen overflow-hidden px-5 py-20 sm:px-8 lg:px-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center opacity-25 grayscale" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(220,38,38,0.34),transparent_28%),linear-gradient(90deg,#030303_0%,rgba(3,3,3,0.88)_36%,rgba(3,3,3,0.48)_68%,#030303_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.2)_0%,#030303_96%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:82px_82px] opacity-20" />
        </div>

        <div className="absolute left-0 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/18 blur-[150px]" />
        <div className="absolute bottom-10 right-0 h-[34rem] w-[34rem] translate-x-1/3 rounded-full bg-red-900/25 blur-[150px]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="animate-slide-up">
            <div className="mb-7 inline-flex items-center gap-3 border-l-4 border-red-600 bg-white/[0.04] px-5 py-3 text-[10px] font-black uppercase tracking-[0.34em] text-zinc-300 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.9)]" />
              Forbody Academia
            </div>

            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl xl:text-9xl">
              Treino forte. <span className="block text-red-600">Marca forte.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              A Forbody conecta alunos, unidades e expansão em uma experiência direta, intensa e preparada para crescer como rede de academias.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/unidades" className="rounded-sm bg-red-600 px-8 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-white shadow-[0_0_34px_rgba(220,38,38,0.28)] transition duration-300 hover:bg-red-700 hover:shadow-[0_0_46px_rgba(220,38,38,0.42)]">
                Escolher unidade
              </Link>
              <Link href="/franquias" className="group rounded-sm border border-white/15 bg-white/[0.04] px-8 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-white backdrop-blur-xl transition duration-300 hover:border-red-600 hover:bg-red-600/10">
                Seja franqueado
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
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=90')] bg-cover bg-center opacity-36 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/72 to-black/10" />
              <div className="absolute right-6 top-6 border border-red-600/40 bg-black/60 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-red-300 backdrop-blur-xl">
                Forbody 10.4
              </div>

              <div className="relative flex h-full min-h-[560px] flex-col justify-end p-6 sm:p-8">
                <div className="mb-8 max-w-md">
                  <p className="text-xs font-black uppercase tracking-[0.34em] text-red-500">rede em expansão</p>
                  <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl">
                    Presença para vender. Estrutura para crescer.
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-300">
                    Um site pensado para matrícula, unidade, franquia e posicionamento forte da marca Forbody.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {performanceCards.map((card) => (
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

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-red-500">Forbody Academia</p>
              <h2 className="mt-5 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">
                Visual forte. Experiência simples. Conversão direta.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Aluno encontra unidade', 'Investidor entende franquia', 'Marca transmite presença'].map((item, index) => (
                <div key={item} className="border border-white/10 bg-black/30 p-6 transition duration-300 hover:border-red-600/50 hover:bg-red-600/10">
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
