import React from 'react';
import Link from 'next/link';
import { apiService } from '@/api.service';
import UnitActionsClient from '@/app/UnitActionsClient';
import AdminSyncClient from '@/app/admin/components/AdminSyncClient';
import { UnitStatus, UnitListItem } from '@/unit.types';

type StatusUI = {
  color: string;
  label: string;
};

const statusConfig: Record<UnitStatus, StatusUI> = {
  draft: { color: 'bg-gray-500/10 text-gray-500 border-gray-500/30', label: 'Rascunho' },
  coming_soon: { color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30', label: 'Em Breve' },
  pre_launch: { color: 'bg-purple-500/10 text-purple-500 border-purple-500/30', label: 'Pré-Venda' },
  active: { color: 'bg-green-500/10 text-green-500 border-green-500/30', label: 'Ativa' },
  maintenance: { color: 'bg-orange-500/10 text-orange-500 border-orange-500/30', label: 'Manutenção' },
  hidden: { color: 'bg-gray-500/10 text-gray-500 border-gray-500/30', label: 'Oculta' },
  archived: { color: 'bg-red-500/10 text-red-500 border-red-500/30', label: 'Arquivada' },
  blocked: { color: 'bg-red-600/10 text-red-600 border-red-600/30', label: 'Bloqueada' },
};

export default async function AdminUnidadesPage() {
  const units = await apiService.getUnits() as UnitListItem[];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-widest text-white mb-2">Gestão de <span className="text-red-600">Unidades</span></h1>
          <p className="text-gray-500 text-sm">Controle de ativação, edição e informações operacionais das franquias.</p>
        </div>
        <div className="flex items-center gap-3">
          <AdminSyncClient />
          <Link href="/admin/unidades/nova" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Nova Unidade
          </Link>
          <Link href="/admin/logout" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Sair
          </Link>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#111]">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Unidade</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Acessos</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {units.map((unit: UnitListItem) => {
                const currentStatus = statusConfig[unit.status] || statusConfig.draft;

                return (
                  <tr key={unit.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-white uppercase tracking-wider">{unit.name}</div>
                      <div className="text-gray-500 text-xs mt-1">{unit.city} - {unit.state}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 text-[10px] font-bold uppercase tracking-widest border rounded-sm ${currentStatus.color}`}>
                        {currentStatus.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-400 font-mono text-xs">ID Evo: {unit.evoId || 'N/A'}</div>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <UnitActionsClient unit={unit} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
