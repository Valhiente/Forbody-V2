import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-red-600">
          ForBody
        </span>

        <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-7xl">
          Performance, estrutura e tecnologia para transformar resultados.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
          A nova plataforma da ForBody está sendo preparada para unidades,
          franquias, administração, conteúdo e futura área do aluno.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/unidades/triunfo"
            className="rounded-full bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-red-700"
          >
            Ver unidade
          </Link>

          <Link
            href="/franquias"
            className="rounded-full border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:border-red-600 hover:text-red-600"
          >
            Seja franqueado
          </Link>
        </div>
      </section>
    </main>
  );
}
