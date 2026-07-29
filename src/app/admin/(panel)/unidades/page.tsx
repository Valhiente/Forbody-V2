import type { Unit } from '@/app/index';
import { getAdminUnits } from '@/services/units.service';
import UnitsTableClient from '@/app/admin/(panel)/unidades/UnitsTableClient';
import UnitCreateForm from './UnitCreateForm';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';

function getAverageRating(unitsData: Unit[]) {
  const ratedUnits = unitsData.filter(
    (unit) => typeof unit.googleReviewsScore === 'number' && unit.googleReviewsScore > 0
  );
  if (!ratedUnits.length) return 'N/A';
  const average = ratedUnits.reduce((sum, unit) => sum + unit.googleReviewsScore, 0) / ratedUnits.length;
  return average.toFixed(1);
}

export default async function AdminUnidadesPage() {
  const admin = await requirePermission('units.read');
  const canWrite = hasAdminPermission(admin, 'units.write');
  const unitsData = await getAdminUnits();
  const activeCount = unitsData.filter((unit) => unit.status === 'active').length;
  const comingSoonCount = unitsData.filter((unit) => unit.status === 'coming_soon').length;
  const totalCount = unitsData.length;
  const averageRating = getAverageRating(unitsData);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Unidades</p>
        <h1 className="mt-4 text-4xl font-black text-white">Gestão de Unidades</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-400">
          Adicione unidades e edite dados públicos, integrações EVO/W12, Google Place e status operacional.
        </p>
      </div>

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

      {canWrite ? (
        <UnitCreateForm />
      ) : (
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-200">
          Modo visualização: seu perfil pode consultar as unidades, mas não criar ou salvar alterações.
        </div>
      )}

      <UnitsTableClient units={unitsData} />
    </div>
  );
}
