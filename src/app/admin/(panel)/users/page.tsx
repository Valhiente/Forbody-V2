const cards = [
  { title: 'Perfis', description: 'Gerenciar administrativo, editores e contas de suporte.' },
  { title: 'Permissões', description: 'Definir acesso de cada usuário dentro do painel.' },
  { title: 'Atividade', description: 'Auditar sessões e ações recentes no sistema.' },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Usuários</p>
        <h1 className="mt-4 text-4xl font-black text-white">Usuários</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-400">
          Área para controlar contas de acesso do painel administrativo e permissões da equipe.
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
        <p className="font-semibold text-white">Em desenvolvimento:</p>
        <p>Monitoramento de sessões, criação de usuários e controle de acesso por perfil.</p>
      </div>
    </div>
  );
}
