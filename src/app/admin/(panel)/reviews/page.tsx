import AdminSyncClient from '@/app/admin/components/AdminSyncClient';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';
import { getAdminUnits } from '@/services/units.service';

const getStats = (unitsData: Awaited<ReturnType<typeof getAdminUnits>>) => {
  const unitsWithPlace = unitsData.filter((u) => u.googlePlaceId && u.googlePlaceId.length > 0 && u.status !== 'coming_soon');
  const totalUnitsWithPlace = unitsWithPlace.length;
  const totalReviews = unitsWithPlace.reduce((s, u) => s + (u.googleReviewsCount ?? 0), 0);
  const avgScore = unitsWithPlace.length ? +(unitsWithPlace.reduce((s, u) => s + (u.googleReviewsScore ?? 0), 0) / unitsWithPlace.length).toFixed(2) : 0;
  return { totalUnitsWithPlace, totalReviews, avgScore };
};

export default async function AdminReviewsPage() {
  const admin = await requirePermission('reviews.read');
  const canWrite = hasAdminPermission(admin, 'reviews.write');
  const unitsData = await getAdminUnits();
  const stats = getStats(unitsData);

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-8 shadow-lg">
        <p className="text-xs font-bold uppercase tracking-widest text-red-500">Admin / Reviews</p>
        <h1 className="mt-4 text-4xl font-extrabold text-white">Google Reviews</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-400">Sincronize avaliações e acompanhe a reputação das unidades ForBody.</p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/6 bg-[#0f0f10] p-5">
          <p className="text-sm text-gray-400">Unidades com Place ID</p>
          <div className="mt-2 text-2xl font-bold text-white">{stats.totalUnitsWithPlace}</div>
        </div>

        <div className="rounded-2xl border border-white/6 bg-[#0f0f10] p-5">
          <p className="text-sm text-gray-400">Média geral Google</p>
          <div className="mt-2 text-2xl font-bold text-white">{stats.avgScore}</div>
        </div>

        <div className="rounded-2xl border border-white/6 bg-[#0f0f10] p-5">
          <p className="text-sm text-gray-400">Total de avaliações</p>
          <div className="mt-2 text-2xl font-bold text-white">{stats.totalReviews}</div>
        </div>

        <div className="rounded-2xl border border-white/6 bg-[#0f0f10] p-5">
          <p className="text-sm text-gray-400">Modo de sincronização</p>
          <div className="mt-2 text-sm font-medium text-gray-300">Sob demanda</div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/6 bg-[#0b0b0b] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Sincronização manual</h2>
            <p className="mt-1 text-sm text-gray-400">Atualize as notas e avaliações das unidades usando os Place IDs cadastrados.</p>
          </div>
          <div>
            {/* AdminSyncClient é um client component */}
            <AdminSyncClient canWrite={canWrite} />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/6 bg-[#0b0b0b] p-6">
        <h3 className="text-xl font-bold text-white">Unidades</h3>
        <p className="mt-1 text-sm text-gray-400">Lista por unidade com status de integração do Google.</p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-gray-400">
                <th className="px-3 py-2">Unidade</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Google Place ID</th>
                <th className="px-3 py-2">Nota Google</th>
                <th className="px-3 py-2">Avaliações</th>
                <th className="px-3 py-2">Integração</th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {unitsData.map((u) => {
                const hasPlace = Boolean(u.googlePlaceId && u.googlePlaceId.length > 0);
                const integrationLabel = hasPlace ? 'Configurado' : 'Pendente';
                const integrationClass = hasPlace ? 'bg-green-600' : u.status === 'coming_soon' ? 'bg-gray-600' : 'bg-yellow-500';

                return (
                  <tr key={u.id} className="border-t border-white/6">
                    <td className="px-3 py-4 text-white">{u.name}</td>
                    <td className="px-3 py-4 text-gray-300">{u.status}</td>
                    <td className="px-3 py-4 text-gray-300">{u.googlePlaceId || '—'}</td>
                    <td className="px-3 py-4 text-gray-300">{u.googleReviewsScore ?? '—'}</td>
                    <td className="px-3 py-4 text-gray-300">{u.googleReviewsCount ?? 0}</td>
                    <td className="px-3 py-4">
                      <span className={`${integrationClass} inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold text-white`}>{integrationLabel}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
