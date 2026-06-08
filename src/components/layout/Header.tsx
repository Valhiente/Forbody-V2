import Link from 'next/link';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/unidades', label: 'Unidades' },
  { href: '/franquias', label: 'Franquias' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 text-white shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group inline-flex items-center gap-3"
          aria-label="Voltar para a página inicial da Forbody"
        >
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-sm border border-red-600/60 bg-[#111] text-sm font-black text-red-500 shadow-[0_0_32px_rgba(220,38,38,0.22)] transition duration-300 group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-white">
            <span className="absolute inset-y-0 left-0 w-1 bg-red-600" />
            FB
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-2xl font-black italic tracking-[-0.08em] text-white sm:text-3xl">
              FOR<span className="text-red-600">BODY</span>
            </span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.42em] text-zinc-500">
              Academia
            </span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-0 lg:flex">
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

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/unidades"
            className="rounded-sm border border-white/15 bg-white/[0.03] px-5 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-200 transition duration-300 hover:border-red-600 hover:bg-red-600/10 hover:text-white"
          >
            Escolher unidade
          </Link>
          <Link
            href="/franquias#formulario"
            className="rounded-sm bg-red-600 px-5 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-[0_0_30px_rgba(220,38,38,0.25)] transition duration-300 hover:bg-red-700 hover:shadow-[0_0_44px_rgba(220,38,38,0.38)]"
          >
            Seja franqueado
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm border border-white/10 bg-white/[0.04] px-3 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-zinc-300 transition hover:border-red-600 hover:bg-red-600/10 hover:text-white sm:text-[10px]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-red-600/0 via-red-600/70 to-red-600/0" />
    </header>
  );
}
