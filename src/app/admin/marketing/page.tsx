const cards = [
  { title: 'Campanhas', description: 'Planejar e acompanhar ações promocionais e anúncios.' },
  { title: 'Performance', description: 'Acompanhar resultados de tráfego e conversões.' },
  { title: 'Promoções', description: 'Criar ofertas sazonais e planos especiais para clientes.' },
];

export default function AdminMarketingPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Marketing</p>
        <h1 className="mt-4 text-4xl font-black text-white">Marketing</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-400">
          Planeje a comunicação da marca ForBody e acompanhe o impacto das ações comerciais.
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
        <p>Central de anúncios, criativos e integrações com redes sociais e mídia paga.</p>
      </div>
    </div>
  );
}
