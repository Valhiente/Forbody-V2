import { getUnits } from '@/services/units.service';
import Button from '@/components/ui/Button';
import UnitsTableClient from '@/app/admin/(panel)/unidades/UnitsTableClient';

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

const getStatusBadge = (status: string | undefined) => {
  const statusMap: Record<string, { label: string; color: string }> = {
    active: { label: 'ATIVA', color: 'bg-green-600/20 text-green-400' },
    coming_soon: { label: 'EM BREVE', color: 'bg-yellow-600/20 text-yellow-400' },
  };
  return statusMap[status || 'active'] || { label: 'DESCONHECIDO', color: 'bg-gray-600/20 text-gray-400' };
};

const getAverageRating = (unitsData: any[]) => {
  const ratedUnits = unitsData.filter((unit) => typeof unit.googleReviewsScore === 'number' && unit.googleReviewsScore > 0);
  if (!ratedUnits.length) return 'N/A';
  const average = ratedUnits.reduce((sum, unit) => sum + unit.googleReviewsScore, 0) / ratedUnits.length;
  return average.toFixed(1);
};

export default async function AdminUnidadesPage() {
  const unitsData = await getUnits();
  const activeCount = unitsData.filter((unit) => unit.status === 'active').length;
  const comingSoonCount = unitsData.filter((unit) => unit.status === 'coming_soon').length;
  const totalCount = unitsData.length;
  const averageRating = getAverageRating(unitsData);

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

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Unidades Ativas', value: activeCount.toString(), color: 'text-green-400' },
          { label: 'Em Breve', value: comingSoonCount.toString(), color: 'text-yellow-400' },
          { label: 'Média Google', value: averageRating, color: 'text-red-400' },
          { label: 'Total', value: totalCount.toString(), color: 'text-white' },
        ].map((card) => (
          <div key={card.label} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40">
            <p className="text-sm uppercase tracking-[0.32em] text-gray-500">{card.label}</p>
            <p className={`mt-4 text-4xl font-black ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Management Sections Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex flex-col rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40 transition-all duration-300 hover:border-red-600/30 hover:shadow-red-600/10"
          >
            <h2 className="text-xl font-black text-white">{section.title}</h2>
            <p className="mt-2 text-sm text-gray-400">{section.description}</p>
            <div className="my-4 h-px bg-gradient-to-r from-red-600/20 to-transparent" />
            <div className="space-y-3 flex-1">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-lg bg-black/30 px-3 py-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
            <Button variant="b2b-primary" disabled className="mt-6 w-full">
              {section.buttonLabel}
            </Button>
          </div>
        ))}
      </div>

      {/* Units Table with Search/Filter */}
      <UnitsTableClient units={unitsData} />

      {/* Info Box */}
      <div className="rounded-3xl border border-red-600/20 bg-[#111] p-6 text-sm text-gray-400">
        <p className="font-semibold text-red-500">Status:</p>
        <p>
          Estrutura visual criada. Funcionalidades de edição, filtragem e navegação de unidades foram preparadas
          para evolução futura.
        </p>
      </div>
    </div>
  );
}
