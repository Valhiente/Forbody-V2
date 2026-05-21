import React from 'react';
import type { Unit } from '@/app/index';
import { unitsData } from '@/app/data';

export async function generateStaticParams() {
  return unitsData.map((unit) => ({
    slug: unit.slug,
  }));
}

export default async function UnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = unitsData.find((u) => u.slug === slug) as Unit | undefined;

  if (!unit) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Unidade não encontrada.</div>;
  }

  const isComingSoon = unit.status === 'coming_soon';
  const salesLink = unit.salesUrl && unit.salesUrl !== '#' ? unit.salesUrl : unit.checkoutUrl;
  const studentLink = unit.studentAreaUrl && unit.studentAreaUrl !== '#' ? unit.studentAreaUrl : undefined;
  const locationLink = unit.locationUrl || unit.mapEmbedUrl || '#';

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900">
      <section className="relative pt-24 pb-16 px-6 max-w-6xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-gray-200/50 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black capitalize">ForBody {unit.name}</h1>
          <p className="text-gray-600 text-lg">Sua segunda casa. Venha fazer parte da nossa comunidade.</p>

          <div className="mt-10 flex flex-col items-center gap-3">
            {isComingSoon ? (
              <>
                <span className="inline-block px-4 py-2 bg-yellow-200 text-yellow-800 font-bold rounded-full">EM BREVE</span>
                <a
                  href="#"
                  className="inline-block px-8 py-3 bg-gray-700 text-white rounded-md"
                >
                  Quero ser avisado
                </a>
              </>
            ) : (
              <>
                {salesLink ? (
                  <a
                    href={salesLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-12 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm rounded-md transition-all transform hover:scale-105"
                  >
                    Matricule-se Agora
                  </a>
                ) : (
                  <a
                    href={locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-12 py-4 bg-gray-600 hover:bg-gray-700 text-white font-black uppercase tracking-widest text-sm rounded-md transition-all"
                  >
                    Consultar Unidade
                  </a>
                )}

                {studentLink && (
                  <a
                    href={studentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                  >
                    Área do Aluno
                  </a>
                )}

                {locationLink && (
                  <a
                    href={locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
                  >
                    Ver Localização
                  </a>
                )}
              </>
            )}

            <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-wider font-semibold">Links externos abrem em nova aba</p>
          </div>
        </div>
      </section>
    </main>
  );
}