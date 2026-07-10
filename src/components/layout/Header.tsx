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
        <Link
          href="/"
          className="group inline-flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-3"
          aria-label="Voltar para a página inicial da Forbody"
        >
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-red-600/60 bg-[#111] text-[11px] font-black text-red-500 shadow-[0_0_32px_rgba(220,38,38,0.22)] transition duration-300 group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-white sm:h-11 sm:w-11 sm:text-sm">
            <span className="absolute inset-y-0 left-0 w-1 bg-red-600" />
            FB
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="max-w-[150px] truncate text-lg font-black italic tracking-[-0.08em] text-white sm:max-w-none sm:text-3xl">
              FOR<span className="text-red-600">BODY</span>
            </span>
            <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.28em] text-zinc-500 sm:text-[9px] sm:tracking-[0.42em]">
              Academia
            </span>
          </span>
        </Link>

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
