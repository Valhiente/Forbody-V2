'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { UnitGalleryItem } from '@/app/index';

type UnitGalleryCarouselProps = {
  title: string;
  items: UnitGalleryItem[];
  fallbackImageUrl?: string;
  variant?: 'default' | 'cover';
  coverLinkUrl?: string;
  coverLinkLabel?: string;
};

type SafeGalleryImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className: string;
  fallbackImageUrl?: string;
};

function SafeGalleryImage({ src, alt, sizes, className, fallbackImageUrl }: SafeGalleryImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const currentSrc = failedSrc === src && fallbackImageUrl ? fallbackImageUrl : src;

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      unoptimized={currentSrc.startsWith('data:') || currentSrc.endsWith('.svg') || currentSrc.startsWith('/api/')}
      sizes={sizes}
      className={className}
      onError={() => {
        if (fallbackImageUrl && currentSrc !== fallbackImageUrl) {
          setFailedSrc(src);
        }
      }}
    />
  );
}

export default function UnitGalleryCarousel({
  title,
  items,
  fallbackImageUrl,
  variant = 'default',
  coverLinkUrl,
  coverLinkLabel = 'Acessar área de vendas',
}: UnitGalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItem, setExpandedItem] = useState<UnitGalleryItem | null>(null);

  const safeItems = useMemo(() => items.filter((item) => item.imageUrl), [items]);
  const normalizedIndex = safeItems.length ? activeIndex % safeItems.length : 0;
  const activeItem = safeItems[normalizedIndex];
  const isCover = variant === 'cover' || title.trim().toLowerCase() === 'forbodyshop';
  const hasCoverLink = Boolean(coverLinkUrl && coverLinkUrl !== '#');

  useEffect(() => {
    if (safeItems.length <= 1) return undefined;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeItems.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [safeItems.length]);

  if (!activeItem) return null;

  const imageSizes = isCover
    ? '(min-width: 1024px) 1120px, 92vw'
    : '(min-width: 1024px) 360px, 92vw';
  const imageAspect = isCover ? 'aspect-[21/9]' : 'aspect-[4/5]';
  const imageFit = isCover ? 'object-contain' : 'object-cover';

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0a] shadow-sm shadow-black/20">
      {!isCover && (
        <div className="flex items-center justify-between gap-4 p-4">
          <h3 className="text-xl font-black text-white">{title}</h3>
          {safeItems.length > 1 && (
            <button type="button" onClick={() => setIsExpanded((value) => !value)} className="w-fit rounded-full border border-red-600/30 bg-red-600/10 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-red-300 transition hover:border-red-600 hover:bg-red-600 hover:text-black">
              {isExpanded ? 'Recolher' : 'Ver todas'}
            </button>
          )}
        </div>
      )}

      <div className={isCover ? '' : 'px-4 pb-4'}>
        <div className={`group relative mx-auto block ${imageAspect} w-full overflow-hidden bg-black ${isCover ? 'max-h-[320px] min-h-[180px] sm:min-h-[220px] lg:max-h-[300px]' : 'max-w-[360px] rounded-[1.5rem] border border-white/10 shadow-[0_18px_48px_rgba(0,0,0,0.35)]'}`}>
          <SafeGalleryImage src={activeItem.imageUrl} alt={activeItem.title} sizes={imageSizes} className={`${imageFit} transition duration-700 group-hover:scale-105`} fallbackImageUrl={fallbackImageUrl} />
          <button type="button" onClick={() => setExpandedItem(activeItem)} aria-label={`Expandir imagem ${activeItem.title}`} className="absolute inset-0 z-10 cursor-zoom-in" />
          {isCover && hasCoverLink && (
            <a href={coverLinkUrl} target="_blank" rel="noreferrer" aria-label={coverLinkLabel} className="absolute bottom-[5.5%] left-1/2 z-20 h-[12%] w-[28%] -translate-x-1/2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black">
              <span className="sr-only">{coverLinkLabel}</span>
            </a>
          )}
          {!isCover && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}
          {!isCover && <p className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-red-300 backdrop-blur-md">{normalizedIndex + 1} / {safeItems.length}</p>}
        </div>
      </div>

      {safeItems.length > 1 && (
        <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4">
          <div className="flex gap-2 overflow-x-auto">
            {safeItems.map((item, index) => (
              <button key={`${item.imageUrl}-${index}`} type="button" aria-label={`Selecionar imagem ${index + 1}`} onClick={() => setActiveIndex(index)} className={isCover ? `h-2 rounded-full transition ${normalizedIndex === index ? 'w-7 bg-red-500' : 'w-2 bg-white/25 hover:bg-white/50'}` : `relative aspect-[4/5] h-20 shrink-0 overflow-hidden rounded-xl border transition ${normalizedIndex === index ? 'border-red-600 shadow-[0_0_24px_rgba(239,68,68,0.35)]' : 'border-white/10 opacity-70 hover:opacity-100'}`}>
                {!isCover && <SafeGalleryImage src={item.imageUrl} alt={item.title} sizes="72px" className="object-cover" fallbackImageUrl={fallbackImageUrl} />}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setIsExpanded((value) => !value)} className="w-fit shrink-0 rounded-full border border-red-600/30 bg-red-600/10 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-red-300 transition hover:border-red-600 hover:bg-red-600 hover:text-black">
            {isExpanded ? 'Recolher' : 'Ver todas'}
          </button>
        </div>
      )}

      {isExpanded && (
        <div className="grid gap-3 border-t border-white/10 p-4 sm:grid-cols-2">
          {safeItems.map((item, index) => (
            <button type="button" aria-label={`Expandir imagem ${index + 1}`} onClick={() => setExpandedItem(item)} key={`${item.title}-${index}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:border-red-600/50">
              <div className={`relative ${imageAspect} overflow-hidden`}>
                <SafeGalleryImage src={item.imageUrl} alt={item.title} sizes="(min-width: 1024px) 540px, (min-width: 640px) 50vw, 100vw" className="object-contain transition duration-500 group-hover:scale-105" fallbackImageUrl={fallbackImageUrl} />
              </div>
            </button>
          ))}
        </div>
      )}

      {expandedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl" role="dialog" aria-modal="true">
          <button type="button" aria-label="Fechar imagem expandida" onClick={() => setExpandedItem(null)} className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-red-600 hover:bg-red-600">Fechar</button>
          <div className={`relative ${imageAspect} w-full ${isCover ? 'max-w-[920px]' : 'max-w-[620px]'} overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]`}>
            <SafeGalleryImage src={expandedItem.imageUrl} alt={expandedItem.title} sizes={isCover ? '920px' : '620px'} className="object-contain" fallbackImageUrl={fallbackImageUrl} />
          </div>
        </div>
      )}
    </article>
  );
}
