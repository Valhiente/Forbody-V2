import React from 'react';

// Mapeamento das 4 unidades para os IDs do sistema EVO (W12)
const unitsData: Record<string, { name: string; evoId: number }> = {
  'ribeirao-preto-centro': { name: 'Ribeirão Preto Centro', evoId: 1 },
  'sao-paulo-paulista': { name: 'São Paulo Paulista', evoId: 2 },
  'campinas-cambui': { name: 'Campinas Cambuí', evoId: 3 },
  'sao-jose-campos': { name: 'São José dos Campos', evoId: 4 },
};

// Em Next.js (App Router) + Static Export, precisamos do generateStaticParams para páginas dinâmicas
export function generateStaticParams() {
  // Gera as rotas estáticas automaticamente baseadas no objeto unitsData
  return Object.keys(unitsData).map((slug) => ({
    slug,
  }));
}

export default function UnitPage({ params }: { params: { slug: string } }) {
  const unit = unitsData[params.slug];

  // Fallback de segurança caso acessem uma unidade que não existe
  if (!unit) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Unidade não encontrada.</div>;
  }

  // Link dinâmico gerado para o Totem EVO da unidade específica
  const evoTotemUrl = `https://evo-totem.w12app.com.br/fourbodyacademia/${unit.evoId}/page/landing-page`;

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900">
      {/* HERO SECTION - ACOLHEDOR, CLARO, COMUNITÁRIO */}
      <section className="relative pt-24 pb-16 px-6 max-w-6xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-gray-200/50 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black capitalize">
            ForBody {unit.name}
          </h1>
          <p className="text-gray-600 text-lg">Sua segunda casa. Venha fazer parte da nossa comunidade.</p>
          
          {/* INTEGRAÇÃO EVO: Botão de Matrícula Dinâmico */}
          <div className="mt-10">
            <a 
              href={evoTotemUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-12 py-5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm rounded-md transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(227,6,19,0.3)]"
            >
              Matricule-se Agora
            </a>
            <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-wider font-semibold">Redirecionamento Seguro EVO Totem</p>
          </div>

          {/* Aqui entrará o componente do Google Reviews com as estrelas Douradas/Vermelhas */}
        </div>
      </section>
    </main>
  );
}