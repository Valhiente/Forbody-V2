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
    <div className="flex gap-1 text-sm text-yellow-400" aria-label={`${roundedRating} estrelas`}>
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
    return null;
  }

  const activeReview = safeReviews[activeIndex];

  return (
    <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-red-600/15 bg-black/25 p-4 shadow-[0_0_24px_rgba(220,38,38,0.08)]">
      <Stars rating={activeReview.rating} />
      <p className="mt-3 text-sm font-semibold leading-relaxed text-white/95">“{activeReview.text}”</p>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400">{activeReview.authorName}</p>

      {safeReviews.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Navegação das avaliações">
          {safeReviews.map((review, index) => (
            <button
              key={`${review.authorName}-${review.time || index}`}
              type="button"
              aria-label={`Ver avaliação ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${activeIndex === index ? 'w-7 bg-red-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      )}

      {googleUrl && (
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-slate-200 transition hover:border-red-600 hover:text-red-300"
        >
          Ver avaliações no Google
        </a>
      )}
    </div>
  );
}
