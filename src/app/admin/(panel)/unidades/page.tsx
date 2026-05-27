const cards = [
  { title: 'Cadastro de unidades', description: 'Adicionar novas academias e preencher dados de contato.' },
  { title: 'Status operacional', description: 'Controlar abertura, manutenção e disponibilidade de unidades.' },
  { title: 'Informações locais', description: 'Gerenciar horários, endereços e redes sociais.' },
];

export default function AdminUnidadesPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Unidades</p>
        <h1 className="mt-4 text-4xl font-black text-white">Gestão de Unidades</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-400">
          Área para controlar cada franquia da rede ForBody, com visão de configuração e informações operacionais.
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
        <p className="font-semibold text-white">Futuro:</p>
        <p>Busca por unidades, edição rápida e integração com painel de performance operacional.</p>
      </div>
    </div>
  );
}
