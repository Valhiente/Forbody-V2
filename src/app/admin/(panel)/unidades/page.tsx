'use client';

import Button from '@/components/ui/Button';
import { unitsData } from '@/app/data';

interface AdminSection {
  id: string;
  title: string;
  description: string;
  items: { icon: string; label: string }[];
  buttonLabel: string;
}

const sections: AdminSection[] = [
  {
    id: 'add-unit',
    title: 'Adicionar Unidade',
    description: 'Cadastro de novas academias na rede ForBody',
    items: [
      { icon: '📛', label: 'Nome da unidade' },
      { icon: '🌍', label: 'Cidade/estado' },
      { icon: '📍', label: 'Endereço' },
      { icon: '🔘', label: 'Status inicial' },
    ],
    buttonLabel: 'Adicionar unidade',
  },
  {
    id: 'edit-data',
    title: 'Editar Dados',
    description: 'Informações gerais e contatos da unidade',
    items: [
      { icon: '📝', label: 'Nome' },
      { icon: '🔗', label: 'Slug' },
      { icon: '📍', label: 'Endereço' },
      { icon: '📱', label: 'WhatsApp' },
      { icon: '📸', label: 'Instagram' },
      { icon: '🕐', label: 'Horários' },
    ],
    buttonLabel: 'Editar dados',
  },
  {
    id: 'evo-links',
    title: 'Links EVO/W12',
    description: 'Integrações com área do aluno e vendas',
    items: [
      { icon: '🛒', label: 'Link de vendas' },
      { icon: '👨‍🎓', label: 'Área do aluno' },
      { icon: '🆔', label: 'ID EVO' },
    ],
    buttonLabel: 'Configurar EVO',
  },
  {
    id: 'google-place',
    title: 'Google Place ID',
    description: 'Integração com Google Maps e Reviews',
    items: [
      { icon: '🗺️', label: 'Campo Place ID' },
      { icon: '📌', label: 'Nota Google' },
      { icon: '⭐', label: 'Quantidade de avaliações' },
    ],
    buttonLabel: 'Atualizar Place ID',
  },
  {
    id: 'unit-photos',
    title: 'Fotos da Unidade',
    description: 'Galeria de imagens e ambiente',
    items: [
      { icon: '🖼️', label: 'Galeria' },
      { icon: '🏢', label: 'Fachada' },
      { icon: '🏋️', label: 'Ambiente interno' },
      { icon: '👨‍🏫', label: 'Professores' },
    ],
    buttonLabel: 'Gerenciar fotos',
  },
  {
    id: 'unit-status',
    title: 'Status da Unidade',
    description: 'Controlar visibilidade e disponibilidade',
    items: [
      { icon: '✅', label: 'Ativa' },
      { icon: '🚀', label: 'Em breve' },
      { icon: '🔧', label: 'Manutenção' },
      { icon: '👻', label: 'Oculta' },
    ],
    buttonLabel: 'Alterar status',
  },
];

export default function AdminUnidadesPage() {
  const getStatusBadge = (status: string | undefined) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      active: { label: 'ATIVA', color: 'bg-green-600/20 text-green-400' },
      coming_soon: { label: 'EM BREVE', color: 'bg-yellow-600/20 text-yellow-400' },
    };
    return statusMap[status || 'active'] || { label: 'DESCONHECIDO', color: 'bg-gray-600/20 text-gray-400' };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Unidades</p>
        <h1 className="mt-4 text-4xl font-black text-white">Gestão de Unidades</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-400">
          Central de controle de todas as unidades da rede ForBody. Adicione novas academias, edite dados, configure
          integrações com EVO/W12, Google Place e gerencie fotos e status operacional.
        </p>
      </div>

      {/* Management Sections Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex flex-col rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40 transition-all duration-300 hover:border-red-600/30 hover:shadow-red-600/10"
          >
            {/* Section Title */}
            <h2 className="text-xl font-black text-white">{section.title}</h2>
            <p className="mt-2 text-sm text-gray-400">{section.description}</p>

            {/* Divider */}
            <div className="my-4 h-px bg-gradient-to-r from-red-600/20 to-transparent" />

            {/* Items */}
            <div className="space-y-3 flex-1">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-lg bg-black/30 px-3 py-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <Button variant="b2b-primary" disabled className="mt-6 w-full">
              {section.buttonLabel}
            </Button>
          </div>
        ))}
      </div>

      {/* Units List Section */}
      <div className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-[#111] p-6">
          <h2 className="text-2xl font-black text-white">Unidades Cadastradas</h2>
          <p className="mt-2 text-sm text-gray-400">Lista de todas as academias da rede ForBody ({unitsData.length} unidades)</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-xl shadow-black/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-[#111]">
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-400">
                  Unidade
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-400">Cidade</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-400">
                  Avaliações
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-gray-400">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {unitsData.map((unit, idx) => {
                const statusBadge = getStatusBadge(unit.status);
                return (
                  <tr
                    key={unit.id}
                    className={`border-b border-white/5 transition-colors hover:bg-white/5 ${
                      idx % 2 === 0 ? 'bg-black/20' : 'bg-black/10'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-white">{unit.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {unit.city}, {unit.state}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      ⭐ {unit.googleReviewsScore} ({unit.googleReviewsCount})
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        disabled
                        className="inline-flex rounded-lg bg-red-600/20 px-4 py-2 text-xs font-bold uppercase text-red-400 transition hover:bg-red-600/30 disabled:opacity-50"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-3xl border border-red-600/20 bg-[#111] p-6 text-sm text-gray-400">
        <p className="font-semibold text-red-500">Status:</p>
        <p>
          Estrutura visual criada. Funcionalidades de edição, salvamento e sincronização com banco de dados serão
          adicionadas nas próximas fases.
        </p>
      </div>
    </div>
  );
}
