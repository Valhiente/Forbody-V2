import type { ReactNode } from 'react';
import { requirePermission } from '@/lib/admin-auth';

export default async function SiteAdminLayout({ children }: { children: ReactNode }) {
  await requirePermission('security.manage');
  return children;
}
