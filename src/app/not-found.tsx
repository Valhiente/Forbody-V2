import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-black px-6 text-center text-white">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">Erro 404</p>
        <h1 className="mt-4 text-5xl font-black uppercase">Página não encontrada</h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          O endereço acessado não existe ou foi alterado.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-red-600 px-7 py-4 text-sm font-black uppercase tracking-wider"
        >
          Voltar para a Home
        </Link>
      </div>
    </main>
  );
}
