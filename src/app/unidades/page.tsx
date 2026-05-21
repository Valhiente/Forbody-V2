import Link from 'next/link';
import { unitsData } from '@/app/data';

export default function UnitsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900">
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-sm font-black uppercase tracking-[0.4em] text-red-600">ForBody</span>
          <h1 className="mt-4 text-4xl font-black md:text-5xl">Unidades ForBody</h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">Escolha a unidade mais próxima e acesse os links de matrícula e área do aluno.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {unitsData.map((unit) => (
            <Link
              key={unit.slug}
              href={`/unidades/${unit.slug}`}
              className="group block rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-black capitalize">{unit.name}</h2>
                  <p className="mt-2 text-sm text-gray-500">{unit.city}, {unit.state}</p>
                </div>
                {unit.status === 'coming_soon' ? (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-yellow-800">Em Breve</span>
                ) : (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-green-800">Ativa</span>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-500">{unit.address || 'Endereço em breve'}</p>
                <span className="text-sm font-bold text-red-600 group-hover:text-red-700">Ver detalhes →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
