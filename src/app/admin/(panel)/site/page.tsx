import Link from 'next/link';

const cards = [
  { title: 'Conteúdo do site', description: 'Editar seções principais, chamadas e ofertas de destaque.' },
  { title: 'SEO e metadados', description: 'Ajustar títulos, descrições e palavras-chave para o site.' },
  { title: 'Banners e hero', description: 'Organizar imagens, textos e promoções do topo da página.' },
];

export default function AdminSitePage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Site</p>
        <h1 className="mt-4 text-4xl font-black text-white">Gerenciar Site</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-400">
          Espaço inicial para configurar conteúdo, páginas públicas e campanhas de destaque da ForBody.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 shadow-sm shadow-black/20">
            <h2 className="text-xl font-bold text-white">{card.title}</h2>
            <p className="mt-3 text-sm text-gray-400">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-red-600/20 bg-[#111] p-6 text-sm text-gray-400">
        <p className="font-semibold text-white">Em breve:</p>
        <p>Configurações de homepage, atualizações de banners, formulários e integração de marketing.</p>
      </div>
    </div>
  );
}
