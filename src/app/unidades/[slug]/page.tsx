import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import UnitBusinessHours from '@/components/units/UnitBusinessHours';
import { getUnitBySlug, getUnits } from '@/services/units.service';
import {
  canShowSalesCta,
  getUnitStatus,
  getUnitStatusBadgeClasses,
  getUnitStatusLabel,
  hasValidUrl,
  isPubliclyVisible,
} from '@/utils/unit-status';

function whatsappLink(phone?: string) {
  if (!phone) return undefined;

  const digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;

  return `https://wa.me/${digits}`;
}

export async function generateStaticParams() {
  const units = await getUnits();
  return units.filter(isPubliclyVisible).map((unit) => ({ slug: unit.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = await getUnitBySlug(slug);

  if (!unit) {
    return {
      title: 'Unidade não encontrada | Forbody',
    };
  }

  return {
    title: `${unit.name} | Unidades Forbody`,
    description: `Conheça a unidade Forbody ${unit.name} em ${unit.city}, ${unit.state}.`,
  };
}

export default async function UnitDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = await getUnitBySlug(slug);

  if (!unit || !isPubliclyVisible(unit)) {
    notFound();
  }

  const status = getUnitStatus(unit.status);
  const statusLabel = getUnitStatusLabel(unit.status);
  const unitWhatsappLink = whatsappLink(unit.whatsapp);
  const primarySalesUrl = hasValidUrl(unit.salesUrl) ? unit.salesUrl : hasValidUrl(unit.checkoutUrl) ? unit.checkoutUrl : undefined;
  const studentAreaUrl = hasValidUrl(unit.studentAreaUrl) ? unit.studentAreaUrl : undefined;
  const locationUrl = hasValidUrl(unit.locationUrl) ? unit.locationUrl : undefined;
  const instagramUrl = unit.instagram ? `https://instagram.com/${unit.instagram.replace('@', '')}` : undefined;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(227,6,19,0.22),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Link href="/unidades" className="text-xs font-black uppercase tracking-[0.24em] text-red-500 transition hover:text-red-400">
              ← Voltar para unidades
            </Link>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.36em] text-red-600">UNIDADE FORBODY</p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{unit.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {unit.address || `${unit.city}, ${unit.state}`}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${getUnitStatusBadgeClasses(unit.status)}`}>
                {statusLabel}
              </span>
              <span className="text-sm text-slate-400">{unit.city}, {unit.state}</span>
              {unit.googleReviewsScore ? (
                <span className="text-sm text-slate-300">⭐ {unit.googleReviewsScore} ({unit.googleReviewsCount || 0})</span>
              ) : null}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {canShowSalesCta(unit) && primarySalesUrl && (
                <a
                  href={primarySalesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-red-500"
                >
                  Fazer matrícula
                </a>
              )}
              {studentAreaUrl && (
                <a
                  href={studentAreaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-red-600 hover:text-red-500"
                >
                  Área do aluno
                </a>
              )}
              {unitWhatsappLink && (
                <a
                  href={unitWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-red-600/40 bg-red-600/15 px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-red-300 transition hover:bg-red-600 hover:text-black"
                >
                  WhatsApp
                </a>
              )}
              {locationUrl && (
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-red-600 hover:text-red-500"
                >
                  Como chegar
                </a>
              )}
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] shadow-[0_0_60px_rgba(227,6,19,0.16)]">
            {unit.imageUrl ? (
              <Image
                src={unit.imageUrl}
                alt={`Unidade Forbody ${unit.name}`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center p-10 text-center text-sm uppercase tracking-[0.22em] text-slate-500">
                Imagem da unidade em breve
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-white">{status === 'active' ? 'Aberta para treino' : statusLabel}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8">
          <h2 className="text-2xl font-black text-white">Contato e localização</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <p><span className="font-bold text-white">Endereço:</span> {unit.address || 'Em breve'}</p>
            <p><span className="font-bold text-white">WhatsApp:</span> {unit.whatsapp || 'Não informado'}</p>
            <p><span className="font-bold text-white">Instagram:</span> {unit.instagram || 'Não informado'}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-red-600 hover:text-red-500">
                Abrir Instagram
              </a>
            )}
            {locationUrl && (
              <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-red-600 hover:text-red-500">
                Abrir no Google Maps
              </a>
            )}
          </div>
        </div>

        <UnitBusinessHours hours={unit.businessHours} />
      </section>
    </main>
  );
}
