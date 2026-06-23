'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { UnitGalleryItem } from '@/app/index';

type UnitGalleryCarouselProps = {
  title: string;
  items: UnitGalleryItem[];
  fallbackImageUrl?: string;
  variant?: 'default' | 'cover';
};

type SafeGalleryImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className: string;
  fallbackImageUrl?: string;
};

function SafeGalleryImage({ src, alt, sizes, className, fallbackImageUrl }: SafeGalleryImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => {
        if (fallbackImageUrl && currentSrc !== fallbackImageUrl) {
          setCurrentSrc(fallbackImageUrl);
        }
      }}
    />
  );
}

export default function UnitGalleryCarousel({ title, items, fallbackImageUrl, variant = 'default' }: UnitGalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItem, setExpandedItem] = useState<UnitGalleryItem | null>(null);

  const safeItems = useMemo(() => items.filter((item) => item.imageUrl), [items]);
  const activeItem = safeItems[activeIndex] || safeItems[0];
  const isCover = variant === 'cover';

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  useEffect(() => {
    if (safeItems.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeItems.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [safeItems.length]);

  if (!activeItem) return null;

  if (isCover) {
    return (
      <article className="overflow-hidden rounded-[1.75rem] border border-red-600/20 bg-[#0a0a0a] shadow-[0_22px_70px_rgba(127,29,29,0.22)]">
        <button
          type="button"
          onClick={() => setExpandedItem(activeItem)}
          aria-label={`Expandir capa ${title}`}
          className="group relative block aspect-[16/10] w-full overflow-hidden bg-black text-left"
        >
          <SafeGalleryImage
            src={activeItem.imageUrl}
            alt={activeItem.title}
            sizes="(min-width: 1024px) 360px, 92vw"
            className="object-cover transition duration-700 group-hover:scale-105"
            fallbackImageUrl={fallbackImageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="w-fit rounded-full border border-red-600/30 bg-red-600/15 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-red-200 backdrop-blur-md">ForbodyShop</p>
            <h3 className="mt-3 text-2xl font-black text-white">{title}</h3>
          </div>
        </button>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4">
          <div className="flex gap-1.5">
            {safeItems.map((item, index) => (
              <button
                key={`${item.imageUrl}-${index}`}
                type="button"
                aria-label={`Selecionar capa ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition ${activeIndex === index ? 'w-8 bg-red-500' : 'w-2.5 bg-white/25 hover:bg-white/50'}`}
              />
            ))}
          </div>

          {safeItems.length > 1 && (
            <button
              type="button"
              onClick={() => setIsExpanded((value) => !value)}
              className="w-fit rounded-full border border-red-600/30 bg-red-600/10 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-red-300 transition hover:border-red-600 hover:bg-red-600 hover:text-black"
            >
              {isExpanded ? 'Recolher' : 'Ver todas'}
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="grid gap-3 border-t border-white/10 p-4 sm:grid-cols-2">
            {safeItems.map((item, index) => (
              <button
                type="button"
                aria-label={`Expandir imagem ${index + 1}`}
                onClick={() => setExpandedItem(item)}
                key={`${item.title}-${index}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:border-red-600/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SafeGalleryImage
                    src={item.imageUrl}
                    alt={item.title}
                    sizes="(min-width: 1024px) 180px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    fallbackImageUrl={fallbackImageUrl}
                  />
                </div>
              </button>
            ))}
          </div>
        )}

        {expandedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl" role="dialog" aria-modal="true">
            <button
              type="button"
              aria-label="Fechar imagem expandida"
              onClick={() => setExpandedItem(null)}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-red-600 hover:bg-red-600"
            >
              Fechar
            </button>

            <div className="relative aspect-[16/10] w-full max-w-[760px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]">
              <SafeGalleryImage
                src={expandedItem.imageUrl}
                alt={expandedItem.title}
                sizes="760px"
                className="object-contain"
                fallbackImageUrl={fallbackImageUrl}
              />
            </div>
          </div>
        )}
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0a] shadow-sm shadow-black/20">
      <div className="flex items-center justify-between gap-4 p-4">
        <h3 className="text-xl font-black text-white">{title}</h3>
        {safeItems.length > 1 && (
          <button
            type="button"
            onClick={() => setIsExpanded((value) => !value)}
            className="w-fit rounded-full border border-red-600/30 bg-red-600/10 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-red-300 transition hover:border-red-600 hover:bg-red-600 hover:text-black"
          >
            {isExpanded ? 'Recolher' : 'Ver todas'}
          </button>
        )}
      </div>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={() => setExpandedItem(activeItem)}
          aria-label={`Expandir imagem ${activeItem.title}`}
          className="group relative mx-auto block aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black text-left shadow-[0_18px_48px_rgba(0,0,0,0.35)]"
        >
          <SafeGalleryImage
            src={activeItem.imageUrl}
            alt={activeItem.title}
            sizes="(min-width: 1024px) 360px, 92vw"
            className="object-cover transition duration-700 group-hover:scale-105"
            fallbackImageUrl={fallbackImageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <p className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-red-300 backdrop-blur-md">{activeIndex + 1} / {safeItems.length}</p>
        </button>
      </div>

      {safeItems.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-white/10 p-4">
          {safeItems.map((item, index) => (
            <button
              key={`${item.imageUrl}-${index}`}
              type="button"
              aria-label={`Selecionar imagem ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[4/5] h-20 shrink-0 overflow-hidden rounded-xl border transition ${activeIndex === index ? 'border-red-600 shadow-[0_0_24px_rgba(239,68,68,0.35)]' : 'border-white/10 opacity-70 hover:opacity-100'}`}
            >
              <SafeGalleryImage
                src={item.imageUrl}
                alt={item.title}
                sizes="72px"
                className="object-cover"
                fallbackImageUrl={fallbackImageUrl}
              />
            </button>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="grid gap-3 border-t border-white/10 p-4 sm:grid-cols-2">
          {safeItems.map((item, index) => (
            <button
              type="button"
              aria-label={`Expandir imagem ${index + 1}`}
              onClick={() => setExpandedItem(item)}
              key={`${item.title}-${index}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:border-red-600/50"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <SafeGalleryImage
                  src={item.imageUrl}
                  alt={item.title}
                  sizes="(min-width: 1024px) 180px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  fallbackImageUrl={fallbackImageUrl}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {expandedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Fechar imagem expandida"
            onClick={() => setExpandedItem(null)}
            className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-red-600 hover:bg-red-600"
          >
            Fechar
          </button>

          <div className="relative aspect-[4/5] w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]">
            <SafeGalleryImage
              src={expandedItem.imageUrl}
              alt={expandedItem.title}
              sizes="620px"
              className="object-contain"
              fallbackImageUrl={fallbackImageUrl}
            />
          </div>
        </div>
      )}
    </article>
  );
}
