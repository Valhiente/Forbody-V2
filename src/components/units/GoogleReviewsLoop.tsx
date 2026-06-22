'use client';

import { useEffect, useMemo, useState } from 'react';
import type { UnitGoogleReview } from '@/app/index';

type GoogleReviewsLoopProps = {
  reviews: UnitGoogleReview[];
  googleUrl?: string;
};

function Stars({ rating }: { rating: number }) {
  const roundedRating = Math.max(1, Math.min(5, Math.round(rating)));

  return (
    <div className="flex gap-1 text-yellow-400" aria-label={`${roundedRating} estrelas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < roundedRating ? 'opacity-100' : 'opacity-20'}>★</span>
      ))}
    </div>
  );
}

export default function GoogleReviewsLoop({ reviews, googleUrl }: GoogleReviewsLoopProps) {
  const safeReviews = useMemo(
    () => reviews.filter((review) => review.rating >= 4 && review.text.trim()).slice(0, 10),
    [reviews]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [reviews]);

  useEffect(() => {
    if (safeReviews.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeReviews.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [safeReviews.length]);

  if (!safeReviews.length) {
    return (
      <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-slate-400">
        Comentários positivos do Google serão exibidos aqui quando a integração retornar avaliações com texto.
      </div>
    );
  }

  const activeReview = safeReviews[activeIndex];

  return (
    <div className="mt-7 overflow-hidden rounded-[1.75rem] border border-red-600/20 bg-black/30 p-5 shadow-[0_0_36px_rgba(220,38,38,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Stars rating={activeReview.rating} />
          <p className="mt-4 text-base font-semibold leading-relaxed text-white">“{activeReview.text}”</p>
          <div className="mt-5">
            <p className="text-sm font-black text-white">{activeReview.authorName}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
              Google {activeReview.relativeTimeDescription ? `- ${activeReview.relativeTimeDescription}` : ''}
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-full border border-red-600/30 bg-red-600/10 px-3 py-2 text-xs font-black text-red-300">
          {activeIndex + 1}/{safeReviews.length}
        </div>
      </div>

      {safeReviews.length > 1 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {safeReviews.map((review, index) => (
            <button
              key={`${review.authorName}-${review.time || index}`}
              type="button"
              aria-label={`Ver avaliação ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${activeIndex === index ? 'w-8 bg-red-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      )}

      {googleUrl && (
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-200 transition hover:border-red-600 hover:text-red-300"
        >
          Ver avaliações no Google
        </a>
      )}
    </div>
  );
}
