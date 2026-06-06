import React from 'react';
import { notFound } from 'next/navigation';
import type { Unit } from '@/app/index';
import { unitsData } from '@/app/data';
import {
  canShowSalesCta,
  getUnitStatus,
  getUnitStatusBadgeClasses,
  getUnitStatusLabel,
  hasValidUrl,
  isPubliclyVisible,
} from '@/utils/unit-status';

export async function generateStaticParams() {
  return unitsData
    .filter(isPubliclyVisible)
    .map((unit) => ({
      slug: unit.slug,
    }));
}

export default async function UnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = unitsData.find((u) => u.slug === slug) as Unit | undefined;

  if (!unit || !isPubliclyVisible(unit)) {
    notFound();
  }

  const status = getUnitStatus(unit.status);
  const isComingSoon = status === 'coming_soon';
  const isMaintenance = status === 'maintenance';

  const salesLink = hasValidUrl(unit.salesUrl)
    ? unit.salesUrl
    : hasValidUrl(unit.checkoutUrl)
      ? unit.checkoutUrl
      : undefined;

  const studentLink = hasValidUrl(unit.studentAreaUrl)
    ? unit.studentAreaUrl
    : undefined;

  const locationLink = hasValidUrl(unit.locationUrl)
    ? unit.locationUrl
    : hasValidUrl(unit.mapEmbedUrl)
      ? unit.mapEmbedUrl
      : undefined;

  const showSalesCta = canShowSalesCta(unit);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="pt-20 pb-16 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-12 shadow-xl shadow-red-600/10">
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center rounded-full border border-red-600/20 bg-red-600/10 px-4 py-2 text-xs font-black uppercase tracking-[0.36em] text-red-400">UNIDADE FORBODY</span>
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight sm:text-5xl">ForBody {unit.name}</h1>
              <p className="max-w-3xl text-base text-slate-300 sm:text-lg">Treino forte, estrutura completa e matrícula em poucos cliques.</p>

              <span className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${getUnitStatusBadgeClasses(unit.status)}`}>
                {getUnitStatusLabel(unit.status)}
              </span>

              {isMaintenance && (
                <div className="rounded-2xl border border-orange-600/20 bg-orange-600/10 px-5 py-4 text-sm text-orange-200">
                  Esta unidade está temporariamente em manutenção.
                </div>
              )}

              {isComingSoon && (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                  Essa unidade será inaugurada em breve. Acompanhe as novidades da ForBody.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-12 pb-16">
        <div className="mx-auto grid gap-10 max-w-6xl lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-sm shadow-black/20">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-2xl text-red-600">📍</div>
                <div>
                  <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Localização</p>
                  <h2 className="mt-3 text-2xl font-black text-white">{unit.address}</h2>
                  <p className="mt-3 text-sm text-slate-400">{unit.city}, {unit.state}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-6 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Musculação</p>
                <h3 className="mt-4 text-lg font-black text-white">Musculação completa</h3>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-6 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Conforto</p>
                <h3 className="mt-4 text-lg font-black text-white">Ambiente climatizado</h3>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-6 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Foco</p>
                <h3 className="mt-4 text-lg font-black text-white">Treino com foco em resultado</h3>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-sm shadow-black/20">
              <h3 className="text-xl font-black text-white">Ações rápidas</h3>
              <div className="mt-6 flex flex-col gap-4">
                {showSalesCta && salesLink && (
                  <a
                    href={salesLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-red-700"
                  >
                    {isComingSoon ? 'Quero ser avisado' : 'Matricule-se Agora'}
                  </a>
                )}

                {showSalesCta && studentLink && !isComingSoon && (
                  <a
                    href={studentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-[#111111] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-red-600"
                  >
                    Área do Aluno
                  </a>
                )}

                {locationLink && (
                  <a
                    href={locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full bg-white/5 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10"
                  >
                    Ver Localização
                  </a>
                )}

                {!showSalesCta && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-400">
                    Matrículas indisponíveis no momento para esta unidade.
                  </div>
                )}
              </div>
            </div>

            {unit.googleReviewsScore > 0 && unit.googleReviewsCount > 0 && (
              <div className="rounded-[2rem] border border-white/10 bg-[#111111] p-7 shadow-sm shadow-black/20">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Avaliações</p>
                    <p className="mt-3 text-4xl font-black text-white">{unit.googleReviewsScore.toFixed(1)}</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-red-600/10 px-4 py-3 text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-red-300">Google</p>
                    <p className="mt-2 text-lg font-bold text-white">{unit.googleReviewsCount} reviews</p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-slate-400">Avaliações Google em sincronização</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-12 pb-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-10 shadow-xl shadow-red-600/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-red-500">
                {isMaintenance ? 'Manutenção' : isComingSoon ? 'Em breve' : 'Pronto para treinar'}
              </p>

              <h2 className="mt-4 text-3xl font-black text-white">
                {isMaintenance
                  ? 'Estamos preparando melhorias para você.'
                  : isComingSoon
                    ? 'A próxima ForBody pode estar mais perto do que você imagina.'
                    : 'Seu resultado começa hoje.'}
              </h2>
            </div>

            <div>
              {showSalesCta && salesLink ? (
                <a
                  href={salesLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-red-700"
                >
                  {isComingSoon ? 'Quero ser avisado' : 'Começar agora'}
                </a>
              ) : (
                <div className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                  Matrículas indisponíveis
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
