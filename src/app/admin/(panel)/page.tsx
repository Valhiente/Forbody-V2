import Link from 'next/link';
import { getAdminUnits } from '@/services/units.service';
import { getUnitStatus } from '@/utils/unit-status';

export default async function AdminDashboardPage() {
  const units = await getAdminUnits();
  const activeUnits = units.filter((unit) => getUnitStatus(unit.status) === 'active');
  const comingSoonCount = units.filter((unit) => getUnitStatus(unit.status) === 'coming_soon').length;
  const maintenanceCount = units.filter((unit) => getUnitStatus(unit.status) === 'maintenance').length;
  const hiddenCount = units.filter((unit) => getUnitStatus(unit.status) === 'hidden').length;
  const totalReviews = activeUnits.reduce((total, unit) => total + (unit.googleReviewsCount || 0), 0);
  const ratedUnits = activeUnits.filter((unit) => (unit.googleReviewsScore || 0) > 0);
  const averageReviewScore = ratedUnits.length
    ? (ratedUnits.reduce((total, unit) => total + unit.googleReviewsScore, 0) / ratedUnits.length).toFixed(1)
    : '—';

  const alerts = [
    ...(maintenanceCount
      ? [{ label: 'Manutenção', text: `${maintenanceCount} unidade(s) em manutenção.` }]
      : []),
    ...(comingSoonCount
      ? [{ label: 'Em breve', text: `${comingSoonCount} unidade(s) aguardando ativação.` }]
      : []),
    ...(hiddenCount
      ? [{ label: 'Oculta', text: `${hiddenCount} unidade(s) estão ocultas no site público.` }]
      : []),
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="rounded-3xl border border-white/10 bg-[#111] p-6 shadow-xl shadow-black/20 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-red-500">Forbody Admin</p>
        <h1 className="mt-4 text-4xl font-black text-white">Dashboard</h1>
        <p className="mt-3 text-sm text-gray-400">
          Visão atual das unidades e acessos rápidos para as áreas operacionais.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {[
          { label: 'Ativas', value: activeUnits.length, color: 'text-green-400' },
          { label: 'Em breve', value: comingSoonCount, color: 'text-yellow-400' },
          { label: 'Manutenção', value: maintenanceCount, color: 'text-orange-400' },
          { label: 'Ocultas', value: hiddenCount, color: 'text-gray-400' },
          { label: 'Total', value: units.length, color: 'text-white' },
          { label: 'Média Google', value: averageReviewScore, color: 'text-red-400' },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-xs">{item.label}</p>
            <p className={`mt-3 text-3xl font-black ${item.color}`}>{item.value}</p>
            {item.label === 'Média Google' && (
              <p className="mt-1 text-xs text-gray-600">{totalReviews} avaliações cadastradas</p>
            )}
          </div>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { title: 'Gerenciar unidades', href: '/admin/unidades' },
          { title: 'Gerenciar marketing', href: '/admin/marketing' },
          { title: 'Sincronizar avaliações', href: '/admin/reviews' },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            prefetch={false}
            className="rounded-2xl border border-white/10 bg-[#111] p-6 text-center text-sm font-bold text-gray-200 transition hover:border-red-600/40 hover:bg-red-600/5 hover:text-white"
          >
            {action.title}
          </Link>
        ))}
      </section>

      {alerts.length > 0 && (
        <section className="rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white">Pendências das unidades</h2>
          <div className="mt-5 grid gap-3">
            {alerts.map((alert) => (
              <div key={alert.label} className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/30 p-4">
                <span className="rounded-full bg-red-600/10 px-3 py-1 text-xs font-bold uppercase text-red-400">{alert.label}</span>
                <p className="text-sm text-gray-300">{alert.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
