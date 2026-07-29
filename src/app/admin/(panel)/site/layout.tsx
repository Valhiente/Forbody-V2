import { redirect } from 'next/navigation';
import { requirePermission } from '@/lib/admin-auth';

export default async function SiteAdminLayout() {
  await requirePermission('security.manage');
  redirect('/admin');
}
