import Link from 'next/link';

const cards = [
  { title: 'Site', description: 'Visão geral do site, conteúdo e principais métricas de engajamento.', href: '/admin/site' },
  { title: 'Unidades', description: 'Acesso rápido para gerenciar unidades, status e informações locais.', href: '/admin/unidades' },
  { title: 'Marketing', description: 'Campanhas, anúncios e resultados para divulgar a marca.', href: '/admin/marketing' },
  { title: 'Reviews', description: 'Monitorar avaliações e a reputação das unidades ForBody.', href: '/admin/reviews' },
  { title: 'Configurações', description: 'Ajustar preferências do painel e configurações administrativas.', href: '/admin/settings' },
  { title: 'Usuários', description: 'Gerenciar contas de acesso e permissões do time.', href: '/admin/users' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Dashboard</p>
        <h1 className="mt-4 text-4xl font-black text-white">Painel Administrativo</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-400">
          Bem-vindo ao painel da ForBody. Use os atalhos abaixo para navegar pelas seções de gestão do site, unidades, marketing e toda a administração da plataforma.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group block rounded-3xl border border-white/10 bg-[#0d0d0d] p-8 transition hover:border-red-600/20 hover:bg-red-600/10"
          >
            <h2 className="text-2xl font-bold text-white group-hover:text-red-400">{card.title}</h2>
            <p className="mt-4 text-sm leading-7 text-gray-400">{card.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-red-400">
              Abrir seção
              <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
