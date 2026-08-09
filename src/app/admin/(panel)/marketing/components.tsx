import Link from 'next/link';
import type { ReactNode } from 'react';

export type MarketingSearchParams = Promise<{ saved?: string; error?: string }>;

export function MarketingHeader({
  eyebrow,
  title,
  description,
  backHref = '/admin/marketing',
}: {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
}) {
  return (
    <header className="rounded-3xl border border-red-600/20 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.14),transparent_48%),#090909] p-6 sm:p-8">
      {backHref ? (
        <Link href={backHref} className="text-xs font-bold text-zinc-400 transition hover:text-white">
          ← Voltar para Marketing
        </Link>
      ) : null}
      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.32em] text-red-400">{eyebrow}</p>
      <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">{description}</p>
    </header>
  );
}

export function MarketingFeedback({ saved, error }: { saved?: boolean; error?: string }) {
  return (
    <>
      {saved ? (
        <div role="status" className="rounded-2xl border border-green-500/40 bg-green-500/10 p-4 text-sm font-semibold text-green-200">
          Alterações salvas com sucesso. A página pública será atualizada automaticamente.
        </div>
      ) : null}
      {error ? (
        <div role="alert" className="rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-sm font-semibold text-red-200">
          Não foi possível salvar: {error}
        </div>
      ) : null}
    </>
  );
}

export function ReadOnlyNotice({ canWrite }: { canWrite: boolean }) {
  return canWrite ? null : (
    <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-200">
      Modo visualização: seu perfil pode consultar este conteúdo, mas não pode salvar alterações.
    </div>
  );
}

export function MarketingSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-7">
      <h2 className="text-xl font-black text-white sm:text-2xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">{description}</p>
      <div className="mt-6 grid gap-5">{children}</div>
    </section>
  );
}

export function TextField({
  label,
  name,
  defaultValue,
  helper,
  placeholder,
  textarea = false,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  helper?: string;
  placeholder?: string;
  textarea?: boolean;
  type?: 'text' | 'url';
  required?: boolean;
}) {
  const className = 'w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 text-sm text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500';

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-semibold text-white">{label}</label>
      {textarea ? (
        <textarea id={name} name={name} defaultValue={defaultValue} placeholder={placeholder} required={required} className={`${className} min-h-[120px] py-3`} />
      ) : (
        <input id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required} className={`${className} h-12`} />
      )}
      {helper ? <p className="text-xs leading-relaxed text-zinc-500">{helper}</p> : null}
    </div>
  );
}

export function SaveBar({ label = 'Salvar alterações' }: { label?: string }) {
  return (
    <div className="sticky bottom-3 z-30 rounded-2xl border border-zinc-700 bg-black/95 p-4 shadow-2xl shadow-black backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Salvamento independente</p>
          <p className="text-xs text-zinc-500">Somente este módulo será atualizado.</p>
        </div>
        <button type="submit" className="h-12 rounded-2xl bg-red-600 px-8 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50">
          {label}
        </button>
      </div>
    </div>
  );
}
