'use server';

import { createClient, createSupabaseAdminClient } from '@/lib/supabase/server';

export async function completeAdminInvite() {
  const supabase = await createClient();
  if (!supabase) return { error: 'Configuração de autenticação indisponível.' };

  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (error || typeof userId !== 'string') {
    return { error: 'Convite inválido ou expirado.' };
  }

  const adminClient = await createSupabaseAdminClient();
  if (!adminClient) return { error: 'Configuração administrativa indisponível.' };

  const now = new Date().toISOString();
  const { data: profile, error: updateError } = await adminClient
    .from('admin_profiles')
    .update({ invite_accepted_at: now, updated_at: now })
    .eq('user_id', userId)
    .select('user_id')
    .maybeSingle();

  if (updateError || !profile) return { error: 'Não foi possível concluir o convite.' };
  return { success: true };
}
