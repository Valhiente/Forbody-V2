import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getAdminUnitBySlug } from '@/services/units.service';
import UnitEditForm from './UnitEditForm';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: 'ATIVA', color: 'bg-green-600/20 text-green-400' },
  coming_soon: { label: 'EM BREVE', color: 'bg-yellow-600/20 text-yellow-400' },
  maintenance: { label: 'MANUTENÇÃO', color: 'bg-orange-600/20 text-orange-400' },
  hidden: { label: 'OCULTA', color: 'bg-gray-600/20 text-gray-400' },
};

const getStatusBadge = (status?: string) => {
  return statusLabels[status || ''] || { label: 'DESCONHECIDO', color: 'bg-gray-600/20 text-gray-400' };
};

export default async function AdminUnitDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const admin = await requirePermission('units.read');
  const canWrite = hasAdminPermission(admin, 'units.write');
  const { slug } = await params;
  const unit = await getAdminUnitBySlug(slug);
  if (!unit) notFound();

  const statusBadge = getStatusBadge(unit.status);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <Link href="/admin/unidades" className="text-xs font-bold uppercase tracking-[0.24em] text-red-500 hover:text-red-400">
          ← Voltar para unidades
        </Link>
        <h1 className="mt-4 text-4xl font-black text-white">{unit.name}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${statusBadge.color}`}>
            {statusBadge.label}
          </span>
          <span className="text-sm text-gray-400">Slug: {unit.slug}</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Contato',
            value: unit.whatsapp || 'Não informado',
            detail: unit.instagram || 'Instagram não informado',
          },
          {
            label: 'EVO / W12',
            value: unit.salesUrl && unit.studentAreaUrl ? 'Completo' : 'Pendente',
            detail: `Unidade ${unit.evoUnitId ?? 'sem ID'}`,
          },
          {
            label: 'Google',
            value: unit.googlePlaceId ? 'Configurado' : 'Pendente',
            detail: unit.googleReviewsScore > 0 ? `${unit.googleReviewsScore} · ${unit.googleReviewsCount} avaliações` : 'Sem nota',
          },
          {
            label: 'Imagens',
            value: `${unit.galleryUrls?.length ?? 0} na galeria`,
            detail: unit.imageUrl ? 'Capa configurada' : 'Capa pendente',
          },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{item.label}</p>
            <p className="mt-3 font-bold text-white">{item.value}</p>
            <p className="mt-1 truncate text-xs text-gray-500">{item.detail}</p>
          </div>
        ))}
      </div>

      {canWrite ? (
        <UnitEditForm unit={unit} />
      ) : (
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-200">
          Modo visualização: os dados abaixo são somente para consulta.
        </div>
      )}
    </div>
  );
}
