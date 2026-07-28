import type { ReactNode } from 'react';
import { requirePermission } from '@/lib/admin-auth';

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  await requirePermission('security.manage');
  return children;
}
