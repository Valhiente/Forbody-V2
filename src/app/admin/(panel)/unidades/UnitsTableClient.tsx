'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Unit } from '@/app/index';
import { getUnitStatus, getUnitStatusBadgeClasses, getUnitStatusLabel } from '@/utils/unit-status';

interface UnitsTableClientProps {
  units: Unit[];
  canWrite?: boolean;
}

const getIntegrationBadges = (unit: Unit) => {
  return [
    { label: 'EVO', active: Boolean(unit.salesUrl || unit.studentAreaUrl || unit.evoUnitId) },
    { label: 'Google', active: Boolean(unit.googlePlaceId) },
    { label: 'Site', active: Boolean(unit.slug) },
  ];
};

export default function UnitsTableClient({ units, canWrite = false }: UnitsTableClientProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filteredUnits = useMemo(() => {
    const query = search.trim().toLowerCase();

    return units.filter((unit) => {
      const matchesText =
        unit.name.toLowerCase().includes(query) || unit.city.toLowerCase().includes(query);

      const matchesStatus = status === 'all' || getUnitStatus(unit.status) === status;
      return matchesText && matchesStatus;
    });
  }, [search, status, units]);

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Unidades Cadastradas</h2>
            <p className="mt-2 text-sm text-gray-400">Pesquise, filtre e navegue por todas as unidades.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-gray-300">
              <span>Buscar</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nome ou cidade"
                className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
              />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-gray-300">
              <span>Status</span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="bg-transparent text-sm text-white outline-none"
              >
                <option value="all">Todos</option>
                <option value="active">Ativas</option>
                <option value="coming_soon">Em breve</option>
                <option value="maintenance">Em manutenção</option>
                <option value="hidden">Ocultas</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-xl shadow-black/40">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-white/10 bg-[#111]">
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-400">Unidade</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-400">Conexões</th>
              <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-gray-400">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.map((unit, idx) => {
              const integrations = getIntegrationBadges(unit);

              return (
                <tr
                  key={unit.id}
                  className={`${idx % 2 === 0 ? 'bg-black/20' : 'bg-black/10'} border-b border-white/5 transition-colors hover:bg-white/5`}
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-white">{unit.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{unit.city}, {unit.state}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getUnitStatusBadgeClasses(unit.status)}`}>
                      {getUnitStatusLabel(unit.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <div className="flex flex-wrap gap-2">
                      {integrations.map((integration) => (
                        <span
                          key={integration.label}
                          className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold uppercase ${integration.active ? 'bg-red-600/20 text-red-300' : 'bg-white/5 text-gray-500'}`}
                        >
                          {integration.label}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Google: {unit.googleReviewsScore > 0 ? `${unit.googleReviewsScore} · ${unit.googleReviewsCount} avaliações` : 'sem nota'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link prefetch={false} href={`/admin/unidades/${unit.slug}`} className="inline-flex rounded-lg bg-red-600/20 px-4 py-2 text-xs font-bold uppercase text-red-400 transition hover:bg-red-600/30">
                      {canWrite ? 'Editar' : 'Visualizar'}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
