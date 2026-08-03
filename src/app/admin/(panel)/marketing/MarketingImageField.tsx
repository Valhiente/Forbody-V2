'use client';

import { useEffect, useState } from 'react';

export function MarketingImageField({
  label,
  name,
  urlName,
  removeName,
  currentUrl = '',
  helper,
}: {
  label: string;
  name: string;
  urlName: string;
  removeName: string;
  currentUrl?: string;
  helper?: string;
}) {
  const [previewUrl, setPreviewUrl] = useState(currentUrl);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }, [objectUrl]);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
      <div
        aria-label={previewUrl ? `Prévia: ${label}` : `Sem imagem: ${label}`}
        className="flex aspect-[4/3] items-center justify-center bg-zinc-950 bg-cover bg-center text-xs font-semibold uppercase tracking-wider text-zinc-600"
        style={previewUrl ? { backgroundImage: `linear-gradient(rgba(0,0,0,.12),rgba(0,0,0,.12)),url(${previewUrl})` } : undefined}
      >
        {previewUrl ? <span className="sr-only">Imagem atual carregada</span> : 'Sem imagem'}
      </div>
      <div className="space-y-3 p-4">
        <label htmlFor={name} className="block text-sm font-semibold text-white">{label}</label>
        <input
          id={name}
          name={name}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            const nextUrl = URL.createObjectURL(file);
            setObjectUrl(nextUrl);
            setPreviewUrl(nextUrl);
          }}
          className="block w-full cursor-pointer rounded-xl border border-dashed border-red-600/40 bg-black px-3 py-3 text-xs text-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-red-600 file:px-3 file:py-2 file:text-[10px] file:font-black file:uppercase file:text-white"
        />
        <input type="hidden" name={urlName} value={currentUrl} readOnly />
        <label className="flex items-center gap-2 text-xs text-zinc-400">
          <input type="checkbox" name={removeName} className="h-4 w-4 accent-red-600" />
          Remover esta imagem ao salvar
        </label>
        <p className="text-xs leading-relaxed text-zinc-500">
          {helper ?? 'Aceita JPG, JPEG, PNG, WebP e AVIF. Máximo de 10MB. Recomendado: WebP ou JPG entre 300KB e 2MB.'}
        </p>
      </div>
    </div>
  );
}
