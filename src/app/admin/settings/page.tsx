const cards = [
  { title: 'Acesso e segurança', description: 'Gerenciar permissões e políticas de acesso ao painel.' },
  { title: 'Preferências', description: 'Ajustar parâmetros gerais do sistema e notificações.' },
  { title: 'Integrações', description: 'Configurar serviços externos e conexões administrativas.' },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Configurações</p>
        <h1 className="mt-4 text-4xl font-black text-white">Configurações</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-400">
          Central de ajustes operacionais do painel, limpeza de cache e parâmetros da plataforma.
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
        <p>Preferências de painel, configurações de autenticação e ajustes avançados da plataforma.</p>
      </div>
    </div>
  );
}
