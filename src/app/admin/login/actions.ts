'use server';

import { redirect } from 'next/navigation';
import { createClient, createSupabaseAdminClient } from '@/lib/supabase/server';

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    return { error: 'E-mail e senha são obrigatórios.' };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { error: 'Configuração administrativa indisponível.' };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error || !data.user) {
    return { error: 'E-mail ou senha incorretos.' };
  }

  const adminClient = await createSupabaseAdminClient();
  const { data: profile } = adminClient
    ? await adminClient
        .from('admin_profiles')
        .select('status, role')
        .eq('user_id', data.user.id)
        .maybeSingle()
    : { data: null };

  if (!profile || profile.status !== 'active' || !profile.role) {
    await supabase.auth.signOut();
    return {
      error:
        profile?.status === 'blocked'
          ? 'Seu acesso está bloqueado. Fale com um administrador.'
          : 'Sua conta ainda aguarda liberação de perfil.',
    };
  }

  await adminClient
    ?.from('admin_profiles')
    .update({ last_sign_in_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('user_id', data.user.id);

  redirect('/admin');
}
