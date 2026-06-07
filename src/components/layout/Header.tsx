import Link from 'next/link';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/unidades', label: 'Unidades' },
  { href: '/franquias', label: 'Franquias' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 px-6 py-4 text-white backdrop-blur-xl sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link href="/" className="group inline-flex items-center gap-3" aria-label="Voltar para a página inicial da ForBody">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-red-600/40 bg-red-600/10 text-sm font-black text-red-500 shadow-lg shadow-red-600/10 transition group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-black">
            FB
          </span>
          <span className="text-2xl font-black italic tracking-tighter text-white">
            FOR<span className="text-red-600">BODY</span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400 transition hover:text-red-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/unidades"
            className="rounded-full border border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-200 transition hover:border-red-600 hover:text-red-500"
          >
            Escolher unidade
          </Link>
          <Link
            href="/franquias#formulario"
            className="rounded-full bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-red-700"
          >
            Franquear
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-300 transition hover:border-red-600 hover:text-red-500"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
