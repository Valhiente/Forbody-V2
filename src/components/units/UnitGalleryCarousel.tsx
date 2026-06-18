'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { UnitGalleryItem } from '@/app/index';

type UnitGalleryCarouselProps = {
  title: string;
  subtitle: string;
  items: UnitGalleryItem[];
};

export default function UnitGalleryCarousel({ title, subtitle, items }: UnitGalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const safeItems = useMemo(() => items.filter((item) => item.imageUrl), [items]);
  const activeItem = safeItems[activeIndex] || safeItems[0];

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
      <button
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left transition hover:bg-white/[0.03]"
      >
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-red-500">{subtitle}</p>
          <h3 className="mt-2 text-2xl font-black text-white">{title}</h3>
        </div>
        <span className="rounded-full border border-red-600/30 bg-red-600/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-300">
          {isExpanded ? 'Recolher' : 'Expandir'}
        </span>
      </button>

      <div className="relative h-[280px] overflow-hidden sm:h-[360px]">
        <Image
          src={activeItem.imageUrl}
          alt={activeItem.title}
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-400">{activeIndex + 1} / {safeItems.length}</p>
          <h4 className="mt-2 text-xl font-black text-white">{activeItem.title}</h4>
        </div>
      </div>

      {safeItems.length > 1 && (
        <div className="flex gap-2 overflow-x-auto p-5">
          {safeItems.map((item, index) => (
            <button
              key={`${item.imageUrl}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border transition ${activeIndex === index ? 'border-red-600 shadow-[0_0_24px_rgba(239,68,68,0.35)]' : 'border-white/10 opacity-70 hover:opacity-100'}`}
            >
              <Image src={item.imageUrl} alt={item.title} fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="grid gap-4 border-t border-white/10 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {safeItems.map((item, index) => (
            <div key={`${item.title}-${index}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="relative h-48 overflow-hidden">
                <Image src={item.imageUrl} alt={item.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <p className="p-4 text-sm font-bold text-slate-200">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
