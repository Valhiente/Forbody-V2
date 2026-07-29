import Link from 'next/link';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import {
  ADMIN_ROLE_LABELS,
  getCurrentAdmin,
  hasAdminPermission,
  type AdminPermission,
} from '@/lib/admin-auth';
import AdminNav from '@/app/admin/components/AdminNav';

export const dynamic = 'force-dynamic';

const navItems: Array<{ label: string; href: string; permission: AdminPermission }> = [
  { label: 'Dashboard', href: '/admin', permission: 'dashboard.read' },
  { label: 'Unidades', href: '/admin/unidades', permission: 'units.read' },
  { label: 'Marketing', href: '/admin/marketing', permission: 'marketing.read' },
  { label: 'Reviews', href: '/admin/reviews', permission: 'reviews.read' },
  { label: 'Usuários', href: '/admin/users', permission: 'users.manage' },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/admin/login');
  const allowedNavItems = navItems.filter((item) => hasAdminPermission(admin, item.permission));
  const navigation = allowedNavItems.map(({ label, href }) => ({ label, href }));

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

          <AdminNav items={navigation} />

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="mb-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
              <p className="truncate text-xs text-gray-400">{admin.email}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-red-400">
                {ADMIN_ROLE_LABELS[admin.role]}
              </p>
            </div>
            <form action="/admin/logout" method="post">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:bg-red-700"
              >
                Sair
              </button>
            </form>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d0d0d]/95 px-4 py-3 backdrop-blur md:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link href="/admin" className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-red-600 text-[10px] text-black">FB</span>
                Painel
              </Link>
              <form action="/admin/logout" method="post">
                <button type="submit" className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-gray-300">
                  Sair
                </button>
              </form>
            </div>
            <AdminNav items={navigation} mobile />
          </header>
          <div className="p-4 sm:p-6 md:p-10">
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
