'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { UnitGalleryItem } from '@/app/index';

type UnitGalleryCarouselProps = {
  title: string;
  subtitle: string;
  items: UnitGalleryItem[];
  fallbackImageUrl?: string;
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

export default function UnitGalleryCarousel({ title, subtitle, items, fallbackImageUrl }: UnitGalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItem, setExpandedItem] = useState<UnitGalleryItem | null>(null);

  const safeItems = useMemo(() => items.filter((item) => item.imageUrl), [items]);
  const activeItem = safeItems[activeIndex] || safeItems[0];

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

  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-sm shadow-black/20">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-red-500">{subtitle}</p>
          <h3 className="mt-2 text-2xl font-black text-white">{title}</h3>
          <p className="mt-2 text-sm text-slate-500">Rolagem automática. Clique na imagem para expandir.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="w-fit rounded-full border border-red-600/30 bg-red-600/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-300 transition hover:border-red-600 hover:bg-red-600 hover:text-black"
        >
          {isExpanded ? 'Recolher lista' : 'Ver todas'}
        </button>
      </div>

      <button
        type="button"
        onClick={() => setExpandedItem(activeItem)}
        className="group relative block h-[300px] w-full overflow-hidden text-left sm:h-[380px]"
      >
        <SafeGalleryImage
          src={activeItem.imageUrl}
          alt={activeItem.title}
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          fallbackImageUrl={fallbackImageUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-400">{activeIndex + 1} / {safeItems.length}</p>
          <h4 className="mt-2 text-2xl font-black text-white">{activeItem.title}</h4>
        </div>
      </button>

      {safeItems.length > 1 && (
        <div className="flex gap-2 overflow-x-auto p-5">
          {safeItems.map((item, index) => (
            <button
              key={`${item.imageUrl}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border transition ${activeIndex === index ? 'border-red-600 shadow-[0_0_24px_rgba(239,68,68,0.35)]' : 'border-white/10 opacity-70 hover:opacity-100'}`}
            >
              <SafeGalleryImage
                src={item.imageUrl}
                alt={item.title}
                sizes="112px"
                className="object-cover"
                fallbackImageUrl={fallbackImageUrl}
              />
            </button>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="grid gap-4 border-t border-white/10 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {safeItems.map((item, index) => (
            <button
              type="button"
              onClick={() => setExpandedItem(item)}
              key={`${item.title}-${index}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:border-red-600/50"
            >
              <div className="relative h-48 overflow-hidden">
                <SafeGalleryImage
                  src={item.imageUrl}
                  alt={item.title}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  fallbackImageUrl={fallbackImageUrl}
                />
              </div>
              <p className="p-4 text-sm font-bold text-slate-200">{item.title}</p>
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

          <div className="relative h-[78vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]">
            <SafeGalleryImage
              src={expandedItem.imageUrl}
              alt={expandedItem.title}
              sizes="100vw"
              className="object-contain"
              fallbackImageUrl={fallbackImageUrl}
            />
          </div>
        </div>
      )}
    </article>
  );
}
