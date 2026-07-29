import 'server-only';

import { cache } from 'react';
import { redirect } from 'next/navigation';
import { createClient, createSupabaseAdminClient } from '@/lib/supabase/server';

export const ADMIN_ROLES = ['full_admin', 'marketing', 'manager', 'viewer'] as const;
export const ADMIN_STATUSES = ['pending', 'active', 'blocked'] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];
export type AdminStatus = (typeof ADMIN_STATUSES)[number];
export type AdminPermission =
  | 'dashboard.read'
  | 'marketing.read'
  | 'marketing.write'
  | 'units.read'
  | 'units.write'
  | 'reviews.read'
  | 'reviews.write'
  | 'leads.read'
  | 'leads.write'
  | 'users.manage'
  | 'security.manage';

export interface AdminProfile {
  userId: string;
  email: string;
  fullName: string | null;
  role: AdminRole;
  status: 'active';
}

const ROLE_PERMISSIONS: Record<AdminRole, readonly AdminPermission[]> = {
  full_admin: [
    'dashboard.read',
    'marketing.read',
    'marketing.write',
    'units.read',
    'units.write',
    'reviews.read',
    'reviews.write',
    'leads.read',
    'leads.write',
    'users.manage',
    'security.manage',
  ],
  marketing: [
    'dashboard.read',
    'marketing.read',
    'marketing.write',
    'units.read',
    'reviews.read',
    'leads.read',
  ],
  manager: [
    'dashboard.read',
    'marketing.read',
    'units.read',
    'units.write',
    'reviews.read',
    'reviews.write',
    'leads.read',
  ],
  viewer: [
    'dashboard.read',
    'marketing.read',
    'units.read',
    'reviews.read',
    'leads.read',
  ],
};

type AdminProfileRow = {
  user_id: string;
  email: string;
  full_name: string | null;
  role: AdminRole | null;
  status: AdminStatus;
};

export const getCurrentAdmin = cache(async (): Promise<AdminProfile | null> => {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (claimsError || typeof userId !== 'string') return null;

  const adminClient = await createSupabaseAdminClient();
  if (!adminClient) return null;

  const { data, error } = await adminClient
    .from('admin_profiles')
    .select('user_id, email, full_name, role, status')
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !data) return null;

  const profile = data as AdminProfileRow;
  if (profile.status !== 'active' || !profile.role || !ADMIN_ROLES.includes(profile.role)) {
    return null;
  }

  return {
    userId: profile.user_id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role,
    status: 'active',
  };
});

export function hasAdminPermission(
  profile: AdminProfile | null,
  permission: AdminPermission,
): boolean {
  return Boolean(profile && ROLE_PERMISSIONS[profile.role].includes(permission));
}

export async function requireAdmin(): Promise<AdminProfile> {
  const profile = await getCurrentAdmin();
  if (!profile) redirect('/admin/login');
  return profile;
}

export async function requirePermission(permission: AdminPermission): Promise<AdminProfile> {
  const profile = await requireAdmin();
  if (!hasAdminPermission(profile, permission)) {
    redirect('/admin');
  }
  return profile;
}

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  full_admin: 'ADM FULL',
  marketing: 'Marketing',
  manager: 'Gerente',
  viewer: 'Visualizador',
};
