import { notFound } from 'next/navigation';

import Button from '@/components/ui/Button';
import { getAdminUnitBySlug } from '@/services/units.service';
import type { Unit } from '@/app/index';
import UnitEditForm from './UnitEditForm';

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: 'ATIVA', color: 'bg-green-600/20 text-green-400' },
  coming_soon: { label: 'EM BREVE', color: 'bg-yellow-600/20 text-yellow-400' },
  maintenance: { label: 'MANUTENÇÃO', color: 'bg-orange-600/20 text-orange-400' },
  hidden: { label: 'OCULTA', color: 'bg-gray-600/20 text-gray-400' },
};

const getStatusBadge = (status?: string) => {
  return statusLabels[status || ''] || { label: 'DESCONHECIDO', color: 'bg-gray-600/20 text-gray-400' };
};

const getIntegrationText = (unit: Unit) => ({
  evo: Boolean(unit.salesUrl || unit.studentAreaUrl || unit.evoUnitId),
  google: Boolean(unit.googlePlaceId),
  site: Boolean(unit.slug),
});

export default async function AdminUnitDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = await getAdminUnitBySlug(slug);
  if (!unit) notFound();

  const statusBadge = getStatusBadge(unit.status);
  const integrations = getIntegrationText(unit);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Unidades</p>
        <h1 className="mt-4 text-4xl font-black text-white">Editar Unidade: {unit.name}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${statusBadge.color}`}>
            {statusBadge.label}
          </span>
          <span className="text-sm text-gray-400">Slug: {unit.slug}</span>
        </div>
      </div>

      <UnitEditForm unit={unit} />

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40">
          <h2 className="text-xl font-black text-white">Dados Básicos</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <p><span className="font-semibold text-white">Cidade:</span> {unit.city}, {unit.state}</p>
            <p><span className="font-semibold text-white">Endereço:</span> {unit.address}</p>
            <p><span className="font-semibold text-white">WhatsApp:</span> {unit.whatsapp || 'Não informado'}</p>
            <p><span className="font-semibold text-white">Instagram:</span> {unit.instagram || 'Não informado'}</p>
          </div>
          <Button disabled variant="b2b-primary" className="mt-6 w-full">Editar dados</Button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40">
          <h2 className="text-xl font-black text-white">Links EVO/W12</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <p><span className="font-semibold text-white">EVO Unit ID:</span> {unit.evoUnitId ?? 'Não configurado'}</p>
            <p><span className="font-semibold text-white">Link de vendas:</span> {unit.salesUrl || 'Não configurado'}</p>
            <p><span className="font-semibold text-white">Área do aluno:</span> {unit.studentAreaUrl || 'Não configurado'}</p>
          </div>
          <Button disabled variant="b2b-primary" className="mt-6 w-full">Configurar EVO</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40">
          <h2 className="text-xl font-black text-white">Google Place ID</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <p><span className="font-semibold text-white">Place ID:</span> {unit.googlePlaceId || 'Não informado'}</p>
            <p><span className="font-semibold text-white">Nota Google:</span> {unit.googleReviewsScore || '0.0'}</p>
            <p><span className="font-semibold text-white">Avaliações:</span> {unit.googleReviewsCount}</p>
          </div>
          <Button disabled variant="b2b-primary" className="mt-6 w-full">Atualizar Place ID</Button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40">
          <h2 className="text-xl font-black text-white">Fotos</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <p><span className="font-semibold text-white">Galeria:</span> {unit.galleryUrls?.length ?? 0} imagens</p>
            <p><span className="font-semibold text-white">Fachada:</span> placeholder</p>
            <p><span className="font-semibold text-white">Ambiente interno:</span> placeholder</p>
            <p><span className="font-semibold text-white">Professores:</span> {unit.teachers?.length ?? 0}</p>
          </div>
          <Button disabled variant="b2b-primary" className="mt-6 w-full">Gerenciar fotos</Button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40">
        <h2 className="text-xl font-black text-white">Status</h2>
        <div className="mt-4 space-y-3 text-sm text-gray-300">
          <p><span className="font-semibold text-white">Status atual:</span> <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusBadge.color}`}>{statusBadge.label}</span></p>
          <p><span className="font-semibold text-white">Google Place ID:</span> {unit.googlePlaceId ? 'Configurado' : 'Não configurado'}</p>
          <p><span className="font-semibold text-white">Integrações ativas:</span></p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(integrations).map(([key, active]) => (
              <span
                key={key}
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${active ? 'bg-red-600/20 text-red-300' : 'bg-white/5 text-gray-500'}`}
              >
                {key.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <Button disabled variant="b2b-primary" className="mt-6 w-full">Alterar status</Button>
      </div>
    </div>
  );
}
