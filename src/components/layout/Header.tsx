import Image from 'next/image';
import Link from 'next/link';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/unidades', label: 'Unidades' },
  { href: '/franquias', label: 'Franquias' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 overflow-hidden bg-[#050505]/95 text-white shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:px-5 sm:py-3 lg:px-8 xl:px-12">
        <div className="inline-flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-3">
          <Link
            href="/"
            className="group shrink-0 transition duration-300 hover:scale-105"
            aria-label="Voltar para a página inicial da Forbody"
          >
            <Image
              src="/images/brand/forbody-emblem.webp"
              alt=""
              width={1240}
              height={858}
              priority
              sizes="(max-width: 639px) 52px, 64px"
              className="h-9 w-auto drop-shadow-[0_0_18px_rgba(220,38,38,0.2)] sm:h-11"
            />
          </Link>
          <Image
            src="/images/brand/forbody-wordmark.webp"
            alt="Forbody Academia"
            width={1341}
            height={253}
            priority
            sizes="(max-width: 639px) 132px, (max-width: 1023px) 180px, 205px"
            className="h-auto w-[132px] shrink-0 sm:w-[180px] lg:w-[205px]"
          />
        </div>

        <nav aria-label="Navegação principal" className="hidden items-center gap-0 xl:flex">
          {navigationLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center px-4 text-[11px] font-black uppercase tracking-[0.26em] text-zinc-400 transition hover:text-white"
            >
              <span className="transition group-hover:text-red-500">{link.label}</span>
              {index < navigationLinks.length - 1 ? (
                <span className="ml-8 h-4 w-px rotate-12 bg-red-600/80" aria-hidden="true" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/unidades"
            className="rounded-sm border border-white/15 bg-white/[0.03] px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-200 transition duration-300 hover:border-red-600 hover:bg-red-600/10 hover:text-white xl:px-5 xl:tracking-[0.22em]"
          >
            Escolher unidade
          </Link>
          <Link
            href="/franquias#formulario"
            className="rounded-sm bg-red-600 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(220,38,38,0.25)] transition duration-300 hover:bg-red-700 hover:shadow-[0_0_44px_rgba(220,38,38,0.38)] xl:px-5 xl:tracking-[0.22em]"
          >
            Seja franqueado
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link
            href="/unidades"
            className="rounded-sm bg-red-600 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-white shadow-[0_0_24px_rgba(220,38,38,0.24)] transition hover:bg-red-700 sm:px-4 sm:text-[10px]"
          >
            Unidades
          </Link>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-red-600/0 via-red-600/70 to-red-600/0" />
    </header>
  );
}
