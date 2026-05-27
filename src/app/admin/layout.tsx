import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Site', href: '/admin/site' },
  { label: 'Unidades', href: '/admin/unidades' },
  { label: 'Marketing', href: '/admin/marketing' },
  { label: 'Reviews', href: '/admin/reviews' },
  { label: 'Configurações', href: '/admin/settings' },
  { label: 'Usuários', href: '/admin/users' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen">
        <aside className="hidden md:flex md:w-[280px] flex-col bg-[#0d0d0d] border-r border-white/5 p-6">
          <div className="mb-10">
            <Link href="/admin" className="inline-flex items-center gap-3 text-white no-underline">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-600 text-sm font-black uppercase tracking-[0.24em] text-black">
                FB
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.36em] text-gray-400">ForBody Admin</p>
                <h1 className="text-xl font-black tracking-wider">Painel</h1>
              </div>
            </Link>
          </div>

          <nav className="space-y-2 text-sm text-gray-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl border border-white/5 bg-white/5 px-4 py-3 transition hover:border-red-600/20 hover:bg-red-600/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <Link
              href="/admin/logout"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-bold uppercase tracking-[0.24em] text-black transition hover:bg-red-700"
            >
              Sair
            </Link>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
