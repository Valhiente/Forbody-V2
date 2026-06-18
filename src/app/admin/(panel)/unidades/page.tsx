import UnitsTableClient from '@/app/admin/(panel)/unidades/UnitsTableClient';
import { getAdminUnits } from '@/services/units.service';
import UnitCreateForm from './UnitCreateForm';

const getAverageRating = (unitsData: any[]) => {
  const ratedUnits = unitsData.filter((unit) => typeof unit.googleReviewsScore === 'number' && unit.googleReviewsScore > 0);
  if (!ratedUnits.length) return 'N/A';
  const average = ratedUnits.reduce((sum, unit) => sum + unit.googleReviewsScore, 0) / ratedUnits.length;
  return average.toFixed(1);
};

export default async function AdminUnidadesPage() {
  const unitsData = await getAdminUnits();
  const activeCount = unitsData.filter((unit) => unit.status === 'active').length;
  const comingSoonCount = unitsData.filter((unit) => unit.status === 'coming_soon').length;
  const maintenanceCount = unitsData.filter((unit) => unit.status === 'maintenance').length;
  const hiddenCount = unitsData.filter((unit) => unit.status === 'hidden').length;
  const totalCount = unitsData.length;
  const averageRating = getAverageRating(unitsData);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Unidades</p>
        <h1 className="mt-4 text-4xl font-black text-white">Gestão de Unidades</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-400">
          Central de controle das unidades da rede ForBody. Cadastre uma nova unidade ou use a tabela para editar dados,
          links EVO/W12, Google Place, contato e status.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {[
          { label: 'Ativas', value: activeCount.toString(), color: 'text-green-400' },
          { label: 'Em Breve', value: comingSoonCount.toString(), color: 'text-yellow-400' },
          { label: 'Manutenção', value: maintenanceCount.toString(), color: 'text-orange-400' },
          { label: 'Ocultas', value: hiddenCount.toString(), color: 'text-gray-400' },
          { label: 'Total', value: totalCount.toString(), color: 'text-white' },
        ].map((card) => (
          <div key={card.label} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40">
            <p className="text-sm uppercase tracking-[0.32em] text-gray-500">{card.label}</p>
            <p className={`mt-4 text-4xl font-black ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-red-600/20 bg-[#111] p-6 text-sm text-gray-300">
        <p className="font-semibold text-red-500">Fluxo ativo:</p>
        <p className="mt-2">
          A criação e a edição de unidades salvam no Supabase e atualizam as páginas públicas /unidades e /unidades/[slug].
          Fotos, galeria, professores e horários continuam fora desta etapa.
        </p>
        <p className="mt-2 text-gray-500">Média Google atual: {averageRating}</p>
      </div>

      <UnitCreateForm />

      <UnitsTableClient units={unitsData} />
    </div>
  );
}
