'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { ADMIN_ROLES, type AdminRole, requirePermission } from '@/lib/admin-auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

function resultRedirect(type: 'success' | 'error', message: string): never {
  redirect(`/admin/users?${type}=${encodeURIComponent(message)}`);
}

export async function inviteAdminUser(formData: FormData) {
  const actor = await requirePermission('users.manage');
  const emailValue = formData.get('email');
  const email = typeof emailValue === 'string' ? emailValue.trim().toLowerCase() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    resultRedirect('error', 'Informe um e-mail válido.');
  }

  const adminClient = await createSupabaseAdminClient();
  if (!adminClient) resultRedirect('error', 'Configuração administrativa indisponível.');

  const requestHeaders = await headers();
  const origin = requestHeaders.get('origin') || 'https://forbodyacademia.com.br';
  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${origin}/admin/accept-invite`,
    data: { invited_to: 'Forbody Admin' },
  });

  if (error || !data.user) {
    resultRedirect(
      'error',
      error?.message.toLowerCase().includes('registered')
        ? 'Este e-mail já possui uma conta.'
        : 'Não foi possível enviar o convite.',
    );
  }

  const now = new Date().toISOString();
  const { error: profileError } = await adminClient.from('admin_profiles').upsert({
    user_id: data.user.id,
    email,
    role: null,
    status: 'pending',
    invited_by: actor.userId,
    invited_at: now,
    updated_at: now,
  });

  if (profileError) resultRedirect('error', 'Convite enviado, mas o perfil não pôde ser registrado.');

  await adminClient.from('admin_audit_logs').insert({
    actor_user_id: actor.userId,
    target_user_id: data.user.id,
    action: 'admin.invited',
    details: { email },
  });

  revalidatePath('/admin/users');
  resultRedirect('success', 'Convite enviado. A conta ficará pendente até você liberar um perfil.');
}

export async function updateAdminAccess(userId: string, formData: FormData) {
  const actor = await requirePermission('users.manage');
  const roleValue = formData.get('role');
  const statusValue = formData.get('status');
  const role = typeof roleValue === 'string' && ADMIN_ROLES.includes(roleValue as AdminRole)
    ? (roleValue as AdminRole)
    : null;
  const status = statusValue === 'active' || statusValue === 'blocked' || statusValue === 'pending'
    ? statusValue
    : null;

  if (!role || !status) resultRedirect('error', 'Perfil ou status inválido.');
  if (actor.userId === userId && status !== 'active') {
    resultRedirect('error', 'Você não pode bloquear sua própria conta.');
  }

  const adminClient = await createSupabaseAdminClient();
  if (!adminClient) resultRedirect('error', 'Configuração administrativa indisponível.');

  const { data: target } = await adminClient
    .from('admin_profiles')
    .select('role, status')
    .eq('user_id', userId)
    .maybeSingle();

  if (target?.role === 'full_admin' && target.status === 'active' && (role !== 'full_admin' || status !== 'active')) {
    const { count } = await adminClient
      .from('admin_profiles')
      .select('user_id', { count: 'exact', head: true })
      .eq('role', 'full_admin')
      .eq('status', 'active');
    if ((count ?? 0) <= 1) resultRedirect('error', 'O último ADM FULL ativo não pode perder o acesso.');
  }

  const now = new Date().toISOString();
  const { error } = await adminClient
    .from('admin_profiles')
    .update({
      role,
      status,
      activated_at: status === 'active' ? now : null,
      updated_at: now,
    })
    .eq('user_id', userId);

  if (error) resultRedirect('error', 'Não foi possível atualizar o acesso.');

  await adminClient.from('admin_audit_logs').insert({
    actor_user_id: actor.userId,
    target_user_id: userId,
    action: 'admin.access_updated',
    details: { role, status },
  });

  revalidatePath('/admin/users');
  resultRedirect('success', 'Perfil e acesso atualizados.');
}
