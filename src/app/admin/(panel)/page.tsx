import Link from 'next/link';
import { getAdminUnits } from '@/services/units.service';
import { getUnitStatus } from '@/utils/unit-status';

export default async function AdminDashboardPage() {
  const unitsData = await getAdminUnits();

  const activeUnits = unitsData.filter((unit) => getUnitStatus(unit.status) === 'active');
  const comingSoonUnits = unitsData.filter((unit) => getUnitStatus(unit.status) === 'coming_soon');
  const maintenanceUnits = unitsData.filter((unit) => getUnitStatus(unit.status) === 'maintenance');
  const hiddenUnits = unitsData.filter((unit) => getUnitStatus(unit.status) === 'hidden');

  const totalUnits = unitsData.length;
  const activeCount = activeUnits.length;
  const comingSoonCount = comingSoonUnits.length;
  const maintenanceCount = maintenanceUnits.length;
  const hiddenCount = hiddenUnits.length;

  const totalReviewsCount = activeUnits.reduce((acc, curr) => acc + (curr.googleReviewsCount || 0), 0);
  const averageReviewScore = activeCount > 0
    ? (activeUnits.reduce((acc, curr) => acc + (curr.googleReviewsScore || 0), 0) / activeCount).toFixed(1)
    : '0.0';

  const quickActions = [
    { title: 'Gerenciar unidades', href: '/admin/unidades' },
    { title: 'Gerenciar marketing', href: '/admin/marketing' },
    { title: 'Sincronizar reviews', href: '/admin/reviews' },
  ];

  const alerts = [
    ...(maintenanceCount > 0
      ? [{ text: `${maintenanceCount} unidade(s) em manutenção precisam de acompanhamento.`, badge: 'Manutenção', badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20' }]
      : []),
    ...(comingSoonCount > 0
      ? [{ text: `${comingSoonCount} unidade(s) em breve aguardando ativação.`, badge: 'Em breve', badgeColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' }]
      : []),
    ...(hiddenCount > 0
      ? [{ text: `${hiddenCount} unidade(s) ocultas continuam salvas no admin.`, badge: 'Oculta', badgeColor: 'bg-gray-500/10 text-gray-400 border-gray-500/20' }]
      : []),
    { text: 'Campanhas em planejamento', badge: 'Atenção', badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20 flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
        <div>
          <h1 className="text-4xl font-black text-white">Dashboard</h1>
          <p className="mt-3 text-sm text-gray-400">
            Visão geral do desempenho da rede ForBody.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select className="bg-[#0d0d0d] border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2.5 focus:ring-red-600 focus:border-red-600 outline-none hover:border-white/20 transition-colors">
            <option>Todas as unidades</option>
            {unitsData.map((unit) => (
              <option key={unit.id}>{unit.name}</option>
            ))}
          </select>
          <select className="bg-[#0d0d0d] border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2.5 focus:ring-red-600 focus:border-red-600 outline-none hover:border-white/20 transition-colors">
            <option>Período atual</option>
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
          </select>
          <select className="bg-[#0d0d0d] border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2.5 focus:ring-red-600 focus:border-red-600 outline-none hover:border-white/20 transition-colors">
            <option>Comparar com mês anterior</option>
            <option>Sem comparação</option>
            <option>Ano anterior</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[
          { label: 'Unidades Ativas', value: activeCount, trend: `${activeCount}/${totalUnits}`, trendColor: 'text-green-500' },
          { label: 'Em Breve', value: comingSoonCount, trend: 'pipeline', trendColor: 'text-yellow-400', isHighlight: comingSoonCount > 0 },
          { label: 'Manutenção', value: maintenanceCount, trend: maintenanceCount > 0 ? 'atenção' : 'OK', trendColor: maintenanceCount > 0 ? 'text-orange-400' : 'text-green-500' },
          { label: 'Ocultas', value: hiddenCount, trend: 'admin', trendColor: 'text-gray-500' },
          { label: 'Total Admin', value: totalUnits, trend: 'rede', trendColor: 'text-gray-500' },
          { label: 'Média Google', value: averageReviewScore, subtitle: `(${totalReviewsCount} avaliações)`, trend: '+0.1', trendColor: 'text-green-500' },
        ].map((kpi, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 hover:border-red-600/30 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600/0 group-hover:bg-red-600/80 transition-colors"></div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">{kpi.label}</p>
              <span className={`text-[10px] font-bold uppercase ${kpi.trendColor}`}>{kpi.trend}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <p className={`text-2xl sm:text-3xl font-black ${kpi.isHighlight ? 'text-red-500' : 'text-white'}`}>{kpi.value}</p>
              {kpi.subtitle && <span className="text-xs text-gray-500 hidden sm:inline-block">{kpi.subtitle}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-8 lg:col-span-2 shadow-xl shadow-black/20 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Leads por mês
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-red-600/10 text-red-500 border border-red-600/20">Projeção</span>
              </h2>
            </div>
            <div className="flex bg-[#0d0d0d] border border-white/10 rounded-lg p-1 self-start sm:self-auto">
              <button className="px-3 py-1.5 text-xs font-bold bg-white/10 text-white rounded-md">Barras</button>
              <button className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-300">Linha</button>
              <button className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-300">Distribuição</button>
            </div>
          </div>

          <div className="flex-1 min-h-[200px] flex items-end justify-between gap-2 sm:gap-6 mt-4">
            {[
              { label: 'Jan', height: '40%' },
              { label: 'Fev', height: '55%' },
              { label: 'Mar', height: '45%' },
              { label: 'Abr', height: '70%' },
              { label: 'Mai', height: '65%' },
              { label: 'Jun', height: '90%' }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group h-full">
                <div
                  className="w-full bg-red-600/20 group-hover:bg-red-600/80 border-t-2 border-red-600/0 group-hover:border-red-500 transition-all rounded-t-md relative"
                  style={{ height: bar.height }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#222] text-white text-[10px] px-2 py-1 rounded border border-white/10 transition-opacity pointer-events-none whitespace-nowrap">
                    {bar.height}
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-500 mt-3 group-hover:text-gray-300 transition-colors">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-8 shadow-xl shadow-black/20 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6">Alertas Inteligentes</h2>
          <div className="flex flex-col gap-3 flex-1">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#0d0d0d] border border-white/5">
                <div className={`mt-0.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap ${alert.badgeColor}`}>
                  {alert.badge}
                </div>
                <p className="text-sm text-gray-400 leading-snug">{alert.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-8 shadow-xl shadow-black/20 lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex flex-col items-center justify-center text-center p-4 sm:p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 hover:border-red-600/30 hover:bg-red-600/5 transition-all group h-full"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-red-600/10 group-hover:text-red-500 text-gray-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{action.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-8 shadow-xl shadow-black/20 relative overflow-hidden group flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Escalabilidade do Painel</h2>
            <p className="text-sm text-gray-400 mb-6">
              O painel ajusta seus recursos automaticamente conforme a rede cresce.
            </p>
          </div>

          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-red-600/10 border border-red-600/20 rounded-xl mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Modo atual: {totalUnits >= 10 ? 'Expansão' : 'Inicial'}
              </span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Gatilho 10+ unidades', desc: 'Ranking avançado' },
                { label: 'Gatilho 15+ unidades', desc: 'Comparação regional' },
                { label: 'Gatilho 20+ unidades', desc: 'Alertas automáticos' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-[#0d0d0d] border border-white/5">
                  <span className="text-xs font-bold text-gray-300">{item.label}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-8 shadow-xl shadow-black/20 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-3">
            <h2 className="text-xl font-bold text-white">Módulos Inteligentes em Espera</h2>
            <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Dormindo
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Recursos preparados para quando a operação pedir mais automação.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-auto">
            {['Heatmap de Leads', 'Ranking de Unidades', 'Alertas de SEO', 'Integração WhatsApp'].map((mod) => (
              <div key={mod} className="p-3 rounded-xl bg-[#0d0d0d] border border-white/5 opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-gray-500">{mod}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
