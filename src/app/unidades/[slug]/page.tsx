import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Unit } from '@/app/index';
import { unitsData } from '@/app/data';
import { fetchGooglePlaceReviews } from '@/app/google';
import UnitBusinessHours from '@/components/units/UnitBusinessHours';
import UnitGalleryCarousel from '@/components/units/UnitGalleryCarousel';
import GoogleReviewsLoop from '@/components/units/GoogleReviewsLoop';
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
  const googleData = await fetchGooglePlaceReviews(unit.googlePlaceId);
  const googleScore = googleData.rating || unit.googleReviewsScore;
  const googleReviewsCount = googleData.reviewsCount || unit.googleReviewsCount;
  const displayReviews = googleData.reviews.length > 0 ? googleData.reviews : unit.googleReviews || [];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="px-6 pb-16 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-xl shadow-red-600/10 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 md:p-12">
            <span className="inline-flex w-fit items-center rounded-full border border-red-600/20 bg-red-600/10 px-4 py-2 text-xs font-black uppercase tracking-[0.36em] text-red-400">UNIDADE FORBODY</span>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">Forbody {unit.name}</h1>
            <p className="mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">Treino forte, estrutura completa e informações da unidade em poucos cliques.</p>
            <span className={`mt-6 inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${getUnitStatusBadgeClasses(unit.status)}`}>{getUnitStatusLabel(unit.status)}</span>
            {isMaintenance && <p className="mt-5 rounded-2xl border border-orange-600/20 bg-orange-600/10 px-5 py-4 text-sm text-orange-200">Esta unidade está temporariamente em manutenção.</p>}
            {isComingSoon && <p className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">Essa unidade será inaugurada em breve.</p>}
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

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-sm shadow-black/20">
              <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Localização</p>
              <h2 className="mt-3 text-2xl font-black text-white">{unit.address}</h2>
              <p className="mt-3 text-sm text-slate-400">{unit.city}, {unit.state}</p>
            </div>
            {!isComingSoon && !isMaintenance && <UnitBusinessHours hours={unit.businessHours} />}
          </div>

          <aside className="space-y-6 lg:self-start">
            {googleScore > 0 && googleReviewsCount > 0 && (
              <div className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-5 shadow-sm shadow-black/20">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-red-400">Google</p>
                    <p className="mt-2 text-4xl font-black text-white">{googleScore.toFixed(1)}</p>
                  </div>
                  <p className="rounded-full border border-red-600/20 bg-red-600/10 px-3 py-2 text-xs font-bold text-red-200">{googleReviewsCount} avaliações</p>
                </div>
                <GoogleReviewsLoop reviews={displayReviews} googleUrl={unit.locationUrl} />
              </div>
            )}

            {galleryImages.length > 0 && <UnitGalleryCarousel title="Galeria" items={galleryImages} fallbackImageUrl={unit.imageUrl} />}
            {shopImages.length > 0 && <UnitGalleryCarousel title="ForbodyShop" items={shopImages} fallbackImageUrl={unit.imageUrl} />}
          </aside>
        </div>
      </section>
    </main>
  );
}
