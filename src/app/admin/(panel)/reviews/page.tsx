import AdminSyncClient from '@/app/admin/components/AdminSyncClient';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';
import { getAdminUnits } from '@/services/units.service';
import Link from 'next/link';

const getStats = (unitsData: Awaited<ReturnType<typeof getAdminUnits>>) => {
  const unitsWithPlace = unitsData.filter((u) => u.googlePlaceId && u.googlePlaceId.length > 0 && u.status !== 'coming_soon');
  const ratedUnits = unitsWithPlace.filter((u) => (u.googleReviewsScore ?? 0) > 0);
  const totalUnitsWithPlace = unitsWithPlace.length;
  const totalReviews = unitsWithPlace.reduce((s, u) => s + (u.googleReviewsCount ?? 0), 0);
  const avgScore = ratedUnits.length ? +(ratedUnits.reduce((s, u) => s + (u.googleReviewsScore ?? 0), 0) / ratedUnits.length).toFixed(2) : 0;
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

      <section className="grid gap-6 sm:grid-cols-3">
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

      </section>

      <section className="rounded-3xl border border-white/6 bg-[#0b0b0b] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Sincronização manual</h2>
            <p className="mt-1 text-sm text-gray-400">Atualize as notas e avaliações das unidades usando os Place IDs cadastrados.</p>
          </div>
          <AdminSyncClient canWrite={canWrite} />
        </div>
      </section>

      <section className="rounded-3xl border border-white/6 bg-[#0b0b0b] p-6">
        <h3 className="text-xl font-bold text-white">Unidades</h3>
        <p className="mt-1 text-sm text-gray-400">Mostra somente o necessário para acompanhar e corrigir a integração.</p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-gray-400">
                <th className="px-3 py-2">Unidade</th>
                <th className="px-3 py-2">Integração</th>
                <th className="px-3 py-2">Resultado</th>
                <th className="px-3 py-2 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {unitsData.map((u) => {
                const hasPlace = Boolean(u.googlePlaceId && u.googlePlaceId.length > 0);
                const integrationLabel = hasPlace ? 'Configurado' : 'Pendente';
                const integrationClass = hasPlace ? 'bg-green-600' : u.status === 'coming_soon' ? 'bg-gray-600' : 'bg-yellow-500';

                return (
                  <tr key={u.id} className="border-t border-white/6">
                    <td className="px-3 py-4">
                      <p className="font-semibold text-white">{u.name}</p>
                      <p className="mt-1 text-xs text-gray-500">{u.city}, {u.state}</p>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`${integrationClass} inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold text-white`}>{integrationLabel}</span>
                      <p className="mt-2 max-w-[220px] truncate text-xs text-gray-500" title={u.googlePlaceId || undefined}>
                        {hasPlace ? u.googlePlaceId : 'Place ID não informado'}
                      </p>
                    </td>
                    <td className="px-3 py-4 text-gray-300">
                      <p className="font-semibold text-white">{(u.googleReviewsScore ?? 0) > 0 ? `${u.googleReviewsScore} estrelas` : 'Sem nota'}</p>
                      <p className="mt-1 text-xs text-gray-500">{u.googleReviewsCount ?? 0} avaliações</p>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <Link prefetch={false} href={`/admin/unidades/${u.slug}`} className="inline-flex rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-gray-200 hover:border-red-500/40 hover:text-white">
                        Configurar
                      </Link>
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
