import { ADMIN_ROLE_LABELS, requirePermission, type AdminRole } from '@/lib/admin-auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { inviteAdminUser, updateAdminAccess } from './actions';

type ProfileRow = {
  user_id: string;
  email: string;
  full_name: string | null;
  role: AdminRole | null;
  status: 'pending' | 'active' | 'blocked';
  invited_at: string;
  invite_accepted_at: string | null;
  last_sign_in_at: string | null;
};

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  await requirePermission('users.manage');
  const params = await searchParams;
  const adminClient = await createSupabaseAdminClient();
  const profilesResult = adminClient
    ? await adminClient
        .from('admin_profiles')
        .select('user_id, email, full_name, role, status, invited_at, invite_accepted_at, last_sign_in_at')
        .order('created_at', { ascending: false })
    : { data: [], error: new Error('Configuração administrativa indisponível.') };
  const profiles = (profilesResult.data ?? []) as ProfileRow[];
  const activeCount = profiles.filter((profile) => profile.status === 'active').length;
  const pendingCount = profiles.filter((profile) => profile.status === 'pending').length;
  const blockedCount = profiles.filter((profile) => profile.status === 'blocked').length;

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-red-500">Admin / Acessos</p>
        <h1 className="mt-4 text-4xl font-extrabold text-white">Usuários e permissões</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-400">
          Somente pessoas convidadas podem criar senha. Contas novas permanecem sem acesso até receberem um perfil.
        </p>
      </header>

      {(params.success || params.error) && (
        <div className={`rounded-2xl border p-4 text-sm ${params.error ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-green-500/30 bg-green-500/10 text-green-300'}`}>
          {params.error || params.success}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Ativos', value: activeCount, className: 'text-green-400' },
          { label: 'Pendentes', value: pendingCount, className: 'text-yellow-400' },
          { label: 'Bloqueados', value: blockedCount, className: 'text-red-400' },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{item.label}</p>
            <p className={`mt-2 text-3xl font-black ${item.className}`}>{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-6">
        <h2 className="text-xl font-bold">Convidar pessoa</h2>
        <p className="mt-2 text-sm text-gray-400">A pessoa cria a senha pelo link recebido. Depois, escolha o perfil e ative o acesso abaixo.</p>
        <form action={inviteAdminUser} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input name="email" type="email" required placeholder="pessoa@empresa.com.br" className="min-w-0 flex-1 rounded-xl border border-white/15 bg-black px-4 py-3 text-white outline-none focus:border-red-500" />
          <button className="rounded-xl bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wider">Enviar convite</button>
        </form>
      </section>

      {profilesResult.error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          Não foi possível carregar os usuários. Tente novamente em instantes.
        </div>
      )}

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-5 py-4">Pessoa</th>
                <th className="px-5 py-4">Atividade</th>
                <th className="px-5 py-4">Acesso</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => {
                const updateAction = updateAdminAccess.bind(null, profile.user_id);
                return (
                  <tr key={profile.user_id} className="border-t border-white/5">
                    <td className="px-5 py-5">
                      <p className="font-semibold text-white">{profile.full_name || profile.email}</p>
                      <p className="mt-1 text-xs text-gray-500">{profile.email}</p>
                      <p className="mt-2 text-xs text-gray-400">
                        {profile.invite_accepted_at ? 'Cadastro concluído' : 'Convite aguardando aceite'}
                      </p>
                    </td>
                    <td className="px-5 py-5 text-gray-300">
                      <p>{profile.last_sign_in_at ? new Date(profile.last_sign_in_at).toLocaleString('pt-BR') : 'Nunca acessou'}</p>
                      <p className="mt-1 text-xs text-gray-500">Convidado em {new Date(profile.invited_at).toLocaleDateString('pt-BR')}</p>
                    </td>
                    <td className="px-5 py-5">
                      <form action={updateAction} className="flex flex-wrap items-center gap-2">
                        <select name="role" defaultValue={profile.role ?? 'viewer'} className="rounded-lg border border-white/10 bg-black px-3 py-2 text-white">
                          {Object.entries(ADMIN_ROLE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                        </select>
                        <select name="status" defaultValue={profile.status} className="rounded-lg border border-white/10 bg-black px-3 py-2 text-white">
                          <option value="pending">Pendente</option>
                          <option value="active">Ativo</option>
                          <option value="blocked">Bloqueado</option>
                        </select>
                        <button className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 font-semibold text-red-300">Salvar</button>
                      </form>
                    </td>
                  </tr>
                );
              })}
              {profiles.length === 0 && !profilesResult.error && (
                <tr><td colSpan={3} className="px-5 py-10 text-center text-gray-500">Nenhum administrador cadastrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
