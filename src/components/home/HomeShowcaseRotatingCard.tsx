"use client";

import { useEffect, useMemo, useState } from "react";

type HomeShowcaseRotatingCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  images: string[];
};

export default function HomeShowcaseRotatingCard({
  eyebrow,
  title,
  description,
  images,
}: HomeShowcaseRotatingCardProps) {
  const validImages = useMemo(
    () => images.filter((imageUrl) => imageUrl && imageUrl.trim().length > 0),
    [images]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (validImages.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % validImages.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [validImages.length]);

  const fallbackImage =
    "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=90";
  const displayImages = validImages.length > 0 ? validImages : [fallbackImage];

  return (
    <article className="group relative min-h-[420px] overflow-hidden border border-white/10 bg-[#080808]">
      {displayImages.map((imageUrl, index) => (
        <div
          key={`${imageUrl}-${index}`}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out group-hover:scale-105 ${
            index === activeIndex ? "opacity-55" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/72 to-transparent" />
      <div className="relative flex h-full min-h-[420px] flex-col justify-end p-7">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">{eyebrow}</p>
        <h3 className="mt-4 text-2xl font-black uppercase leading-tight text-white">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
    </article>
  );
}
