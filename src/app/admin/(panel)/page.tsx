import Link from 'next/link';
import { unitsData } from '@/app/data';

export default function AdminDashboardPage() {
  const activeUnits = unitsData.filter(u => u.status === 'active');
  const comingSoonUnits = unitsData.filter(u => u.status === 'coming_soon');
  
  const totalUnits = unitsData.length;
  const activeCount = activeUnits.length;
  const comingSoonCount = comingSoonUnits.length;

  const totalReviewsCount = activeUnits.reduce((acc, curr) => acc + (curr.googleReviewsCount || 0), 0);
  const averageReviewScore = activeCount > 0 
    ? (activeUnits.reduce((acc, curr) => acc + (curr.googleReviewsScore || 0), 0) / activeCount).toFixed(1)
    : '0.0';

  const quickActions = [
    { title: 'Editar site', href: '/admin/site' },
    { title: 'Nova campanha', href: '/admin/marketing' },
    { title: 'Gerenciar unidades', href: '/admin/unidades' },
    { title: 'Sincronizar reviews', href: '/admin/reviews' },
    { title: 'Configurações', href: '/admin/settings' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Cabeçalho */}
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-black text-white">Dashboard</h1>
          <p className="mt-3 text-sm text-gray-400">
            Visão geral do desempenho da rede ForBody.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select className="bg-[#0d0d0d] border border-white/10 text-white text-sm rounded-lg px-4 py-2 focus:ring-red-600 focus:border-red-600 outline-none">
            <option>Todas as unidades</option>
          </select>
          <select className="bg-[#0d0d0d] border border-white/10 text-white text-sm rounded-lg px-4 py-2 focus:ring-red-600 focus:border-red-600 outline-none">
            <option>Período atual</option>
          </select>
          <select className="bg-[#0d0d0d] border border-white/10 text-white text-sm rounded-lg px-4 py-2 focus:ring-red-600 focus:border-red-600 outline-none">
            <option>Comparar com mês anterior</option>
          </select>
        </div>
      </div>

      {/* 2. Cards principais */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Unidades Ativas</p>
          <p className="mt-2 text-3xl font-black text-white">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Em Breve</p>
          <p className="mt-2 text-3xl font-black text-red-500">{comingSoonCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Média Google</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-black text-white">{averageReviewScore}</p>
            <span className="text-xs text-gray-500">({totalReviewsCount})</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Campanhas Ativas</p>
          <p className="mt-2 text-3xl font-black text-white">3</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Leads (Est.)</p>
          <p className="mt-2 text-3xl font-black text-white">450</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Alunos (Est.)</p>
          <p className="mt-2 text-3xl font-black text-white">3.2k</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 3. Gráfico visual placeholder */}
        <div className="rounded-3xl border border-white/10 bg-[#111] p-8 lg:col-span-2 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Leads por mês</h2>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Projeção</span>
          </div>
          <div className="h-48 flex items-end justify-between gap-2 sm:gap-6 mt-4">
            {/* Fake bars */}
            {[
              { label: 'Jan', height: '40%' },
              { label: 'Fev', height: '55%' },
              { label: 'Mar', height: '45%' },
              { label: 'Abr', height: '70%' },
              { label: 'Mai', height: '65%' },
              { label: 'Jun', height: '90%' }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group">
                <div 
                  className="w-full bg-red-600/20 group-hover:bg-red-600 transition-colors rounded-t-md" 
                  style={{ height: bar.height }}
                ></div>
                <span className="text-xs font-bold text-gray-500 mt-3">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Relatórios e ações rápidas */}
        <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
          <h2 className="text-xl font-bold text-white mb-6">Ações Rápidas</h2>
          <div className="flex flex-col gap-3">
            {quickActions.map((action, i) => (
              <Link 
                key={i}
                href={action.href}
                className="flex items-center justify-between p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-red-600/30 hover:bg-red-600/10 transition-colors group"
              >
                <span className="text-sm font-bold text-gray-300 group-hover:text-white">{action.title}</span>
                <span className="text-red-600" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 4. Ranking por unidade */}
        <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
          <h2 className="text-xl font-bold text-white mb-6">Desempenho por Unidade</h2>
          <div className="space-y-5">
            {[
              { name: 'Triunfo', percent: 85, color: 'bg-red-600' },
              { name: 'Barão do Bananal', percent: 70, color: 'bg-red-600/80' },
              { name: 'Vila Virgínia', percent: 60, color: 'bg-red-600/60' },
              { name: 'Portinari', percent: 45, color: 'bg-red-600/40' },
              { name: 'Novas Unidades', percent: 10, color: 'bg-gray-700', label: 'Em breve' }
            ].map((unit, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-300">{unit.name}</span>
                  {unit.label ? (
                    <span className="text-gray-500">{unit.label}</span>
                  ) : (
                    <span className="text-gray-400">{unit.percent}%</span>
                  )}
                </div>
                <div className="w-full bg-[#0d0d0d] h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${unit.color} rounded-full`} style={{ width: `${unit.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Distribuição por unidade */}
        <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
          <h2 className="text-xl font-bold text-white mb-6">Participação por Unidade</h2>
          <div className="h-full min-h-[200px] flex items-center justify-center">
            {/* Visual placeholder blocks */}
            <div className="w-full grid grid-cols-4 grid-rows-2 gap-2 h-32">
              <div className="col-span-2 row-span-2 bg-red-600/30 border border-red-600/50 rounded-xl flex items-center justify-center p-4">
                <span className="text-xs font-bold text-red-200 text-center">Triunfo<br/>35%</span>
              </div>
              <div className="col-span-1 row-span-2 bg-red-600/20 border border-red-600/30 rounded-xl flex items-center justify-center p-2">
                <span className="text-xs font-bold text-red-200/70 text-center">Barão<br/>25%</span>
              </div>
              <div className="col-span-1 row-span-1 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center p-2">
                <span className="text-xs font-bold text-gray-400 text-center">V. Vir.<br/>20%</span>
              </div>
              <div className="col-span-1 row-span-1 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center p-2">
                <span className="text-xs font-bold text-gray-500 text-center">Port.<br/>15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 7. Escalabilidade automática */}
        <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-xl font-bold text-white mb-2">Escalabilidade do Painel</h2>
          <p className="text-sm text-gray-400 mb-6">
            O painel se adapta conforme a rede cresce.
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              Status atual: Modo inicial ativo
            </span>
          </div>
          <div className="mt-6 flex text-xs text-gray-500 justify-between border-t border-white/5 pt-4">
            <span className="text-white font-bold">Até 7 unidades (Atual)</span>
            <span>10+ (Avançado)</span>
            <span>15+ (Regional)</span>
            <span>20+ (Alertas)</span>
          </div>
        </div>

        {/* 8. Sistema “adormecido” */}
        <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-white">Módulos Inteligentes em Espera</h2>
            <span className="px-3 py-1 bg-gray-800 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400">Em espera</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Ranking avançado',
              'Comparação regional',
              'Alertas automáticos',
              'Automação de campanhas'
            ].map((module, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#0d0d0d] border border-white/5 opacity-60">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                <span className="text-xs font-bold text-gray-400">{module}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}