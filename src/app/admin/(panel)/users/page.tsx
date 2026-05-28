const roles = [
  {
    key: 'admin',
    title: 'Admin',
    desc: 'Acesso total ao painel — gerenciar unidades, site, marketing e usuários.',
    color: 'bg-red-600',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    desc: 'Editar campanhas, banners e textos; visualizar unidades.',
    color: 'bg-violet-600',
  },
  {
    key: 'editor',
    title: 'Editor',
    desc: 'Editar textos e imagens; revisar conteúdo.',
    color: 'bg-green-600',
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-8 shadow-lg">
        <p className="text-xs font-bold uppercase tracking-widest text-red-500">Admin / Usuários</p>
        <h1 className="mt-4 text-4xl font-extrabold text-white">Usuários</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-400">
          Estrutura visual para gerenciamento de usuários e permissões do painel ForBody. Somente
          estrutura — sem criação, salvamento ou alterações na autenticação atual.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {roles.map((r) => (
          <div key={r.key} className="rounded-2xl border border-white/5 bg-[#0f0f10] p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">{r.title}</h2>
                <p className="mt-2 text-sm text-gray-400">{r.desc}</p>
              </div>
              <span className={`${r.color} ml-4 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-white`}>{r.title}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/6 bg-[#0b0b0b] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Usuários cadastrados</h3>
              <p className="mt-1 text-sm text-gray-400">Tabela placeholder com colunas principais.</p>
            </div>
            <div>
              <button disabled className="rounded-md border border-white/6 bg-transparent px-4 py-2 text-sm font-medium text-gray-400" aria-disabled>
                Novo usuário
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-left text-xs uppercase text-gray-400">
                  <th className="px-3 py-2">Nome</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Perfil</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Último acesso</th>
                  <th className="px-3 py-2">Ações</th>
                </tr>
              </thead>
              <tbody className="mt-2">
                {/* Placeholder rows - não criar usuários reais */}
                <tr className="border-t border-white/6">
                  <td className="px-3 py-4 text-white">Nome do Usuário</td>
                  <td className="px-3 py-4 text-gray-300">usuario@exemplo.com</td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">Admin</span>
                  </td>
                  <td className="px-3 py-4 text-gray-300">Ativo</td>
                  <td className="px-3 py-4 text-gray-300">2026-05-01</td>
                  <td className="px-3 py-4">
                    <button disabled className="rounded-md bg-white/5 px-3 py-1 text-sm text-gray-300" aria-disabled>
                      Editar
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-white/6">
                  <td className="px-3 py-4 text-white">Maria Silva</td>
                  <td className="px-3 py-4 text-gray-300">maria@exemplo.com</td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center rounded-full bg-violet-600 px-2 py-1 text-xs font-semibold text-white">Marketing</span>
                  </td>
                  <td className="px-3 py-4 text-gray-300">Ativo</td>
                  <td className="px-3 py-4 text-gray-300">2026-05-20</td>
                  <td className="px-3 py-4">
                    <button disabled className="rounded-md bg-white/5 px-3 py-1 text-sm text-gray-300" aria-disabled>
                      Editar
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-white/6">
                  <td className="px-3 py-4 text-white">João Editor</td>
                  <td className="px-3 py-4 text-gray-300">joao@exemplo.com</td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">Editor</span>
                  </td>
                  <td className="px-3 py-4 text-gray-300">Inativo</td>
                  <td className="px-3 py-4 text-gray-300">2026-04-10</td>
                  <td className="px-3 py-4">
                    <button disabled className="rounded-md bg-white/5 px-3 py-1 text-sm text-gray-300" aria-disabled>
                      Editar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-white/6 bg-[#0b0b0b] p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">Convites</h3>
            <p className="mt-2 text-sm text-gray-400">Futuramente será possível convidar membros da equipe por email.</p>
            <div className="mt-4">
              <button disabled className="rounded-md border border-white/6 bg-transparent px-4 py-2 text-sm font-medium text-gray-400" aria-disabled>
                Convidar usuário
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">Segurança</h3>
            <p className="mt-2 text-sm text-gray-400">
              A autenticação atual é baseada em variáveis de ambiente. Haverá migração futura para
              Supabase Auth e um modelo de roles/permissões mais robusto.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>- Roles planejadas: Admin, Marketing, Editor</li>
              <li>- Não será alterado o sistema de autenticação atual nesta etapa</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
