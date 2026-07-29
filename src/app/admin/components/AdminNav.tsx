'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AdminNavItem = {
  label: string;
  href: string;
};

export default function AdminNav({
  items,
  mobile = false,
}: {
  items: AdminNavItem[];
  mobile?: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav className={mobile ? 'mt-3 flex gap-2 overflow-x-auto pb-1' : 'space-y-2 text-sm text-gray-300'}>
      {items.map((item) => {
        const active = item.href === '/admin'
          ? pathname === '/admin'
          : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            aria-current={active ? 'page' : undefined}
            className={
              mobile
                ? `shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold ${
                    active
                      ? 'border-red-500/50 bg-red-600/15 text-white'
                      : 'border-white/10 bg-white/5 text-gray-200'
                  }`
                : `block rounded-2xl border px-4 py-3 transition ${
                    active
                      ? 'border-red-500/40 bg-red-600/15 font-semibold text-white'
                      : 'border-white/5 bg-white/5 hover:border-red-600/20 hover:bg-red-600/10 hover:text-white'
                  }`
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
