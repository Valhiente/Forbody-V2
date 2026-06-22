import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Unit } from '@/app/index';
import { unitsData } from '@/app/data';
import UnitBusinessHours from '@/components/units/UnitBusinessHours';
import UnitGalleryCarousel from '@/components/units/UnitGalleryCarousel';
import { getUnitStatus, getUnitStatusBadgeClasses, getUnitStatusLabel, isPubliclyVisible } from '@/utils/unit-status';

export async function generateStaticParams() {
  return unitsData.filter(isPubliclyVisible).map((unit) => ({ slug: unit.slug }));
}

export default async function UnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = unitsData.find((item) => item.slug === slug) as Unit | undefined;

  if (!unit || !isPubliclyVisible(unit)) {
    notFound();
  }

  const status = getUnitStatus(unit.status);
  const isComingSoon = status === 'coming_soon';
  const isMaintenance = status === 'maintenance';
  const gallery = unit.galleryUrls || [];
  const galleryImages = gallery.filter((item) => item.category === 'galeria');
  const shopImages = gallery.filter((item) => item.category === 'forbodyshop');

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="px-6 pb-16 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-xl shadow-red-600/10 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 md:p-12">
            <span className="inline-flex w-fit items-center rounded-full border border-red-600/20 bg-red-600/10 px-4 py-2 text-xs font-black uppercase tracking-[0.36em] text-red-400">UNIDADE FORBODY</span>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">Forbody {unit.name}</h1>
            <p className="mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">Treino forte, estrutura completa e informações da unidade em poucos cliques.</p>
            <span className={`mt-6 inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${getUnitStatusBadgeClasses(unit.status)}`}>{getUnitStatusLabel(unit.status)}</span>
            {isMaintenance && <p className="mt-5 rounded-2xl border border-orange-600/20 bg-orange-600/10 px-5 py-4 text-sm text-orange-200">Esta unidade esta temporariamente em manutencao.</p>}
            {isComingSoon && <p className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">Essa unidade sera inaugurada em breve.</p>}
          </div>

          {unit.imageUrl && (
            <div className="relative min-h-[320px] border-t border-white/10 lg:border-l lg:border-t-0">
              <Image src={unit.imageUrl} alt={`Fachada da unidade Forbody ${unit.name}`} fill sizes="(min-width: 1024px) 500px, 100vw" className="object-cover opacity-80" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-full border border-red-600/40 bg-black/70 px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-red-300 backdrop-blur-xl">{unit.city}, {unit.state}</div>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-sm shadow-black/20">
              <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Localizacao</p>
              <h2 className="mt-3 text-2xl font-black text-white">{unit.address}</h2>
              <p className="mt-3 text-sm text-slate-400">{unit.city}, {unit.state}</p>
            </div>
            {!isComingSoon && !isMaintenance && <UnitBusinessHours hours={unit.businessHours} />}
          </div>

          {unit.googleReviewsScore > 0 && unit.googleReviewsCount > 0 && (
            <div className="rounded-[2rem] border border-white/10 bg-[#111111] p-7 shadow-sm shadow-black/20">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Avaliacoes</p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-5xl font-black text-white">{unit.googleReviewsScore.toFixed(1)}</p>
                <div className="rounded-[1.5rem] bg-red-600/10 px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-red-300">Google</p>
                  <p className="mt-2 text-lg font-bold text-white">{unit.googleReviewsCount} reviews</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="px-6 pb-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-red-500">Galeria da unidade</p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Conheca a Forbody {unit.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">Galeria da unidade e ForbodyShop. Conforme novas imagens forem adicionadas, esta area sera atualizada.</p>
            </div>

            <div className="grid gap-6">
              {galleryImages.length > 0 && <UnitGalleryCarousel title="Galeria" subtitle="Fotos da unidade" items={galleryImages} fallbackImageUrl={unit.imageUrl} />}
              {shopImages.length > 0 && <UnitGalleryCarousel title="ForbodyShop" subtitle="Produtos e artigos" items={shopImages} fallbackImageUrl={unit.imageUrl} />}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
