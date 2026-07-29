import { redirect } from 'next/navigation';
import { requirePermission } from '@/lib/admin-auth';

export default async function SettingsLayout() {
  await requirePermission('security.manage');
  redirect('/admin');
}
