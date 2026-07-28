import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

type BootstrapBody = {
  email?: string;
  token?: string;
};

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 4_000) {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 413 });
  }

  let body: BootstrapBody;
  try {
    body = (await request.json()) as BootstrapBody;
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 });
  }

  const email = String(body.email ?? '').trim().toLowerCase();
  const token = String(body.token ?? '');
  if (!email || token.length < 32) {
    return NextResponse.json({ error: 'Bootstrap inválido.' }, { status: 400 });
  }

  const adminClient = await createSupabaseAdminClient();
  if (!adminClient) {
    return NextResponse.json({ error: 'Configuração indisponível.' }, { status: 503 });
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const { data: bootstrap } = await adminClient
    .from('admin_bootstrap_tokens')
    .select('email, expires_at, used_at')
    .eq('token_hash', tokenHash)
    .eq('email', email)
    .maybeSingle();

  if (
    !bootstrap ||
    bootstrap.used_at ||
    new Date(bootstrap.expires_at).getTime() <= Date.now()
  ) {
    return NextResponse.json({ error: 'Bootstrap inválido ou expirado.' }, { status: 403 });
  }

  const { count } = await adminClient
    .from('admin_profiles')
    .select('user_id', { count: 'exact', head: true });
  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: 'O administrador inicial já foi configurado.' }, { status: 409 });
  }

  const origin = new URL(request.url).origin;
  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${origin}/admin/accept-invite`,
    data: { invited_to: 'Forbody Admin' },
  });
  if (error || !data.user) {
    return NextResponse.json({ error: 'Não foi possível enviar o convite inicial.' }, { status: 502 });
  }

  const now = new Date().toISOString();
  const { error: profileError } = await adminClient.from('admin_profiles').insert({
    user_id: data.user.id,
    email,
    role: 'full_admin',
    status: 'active',
    invited_at: now,
    activated_at: now,
    updated_at: now,
  });

  if (profileError) {
    return NextResponse.json({ error: 'Não foi possível criar o perfil inicial.' }, { status: 500 });
  }

  await Promise.all([
    adminClient
      .from('admin_bootstrap_tokens')
      .update({ used_at: now })
      .eq('token_hash', tokenHash),
    adminClient.from('admin_audit_logs').insert({
      target_user_id: data.user.id,
      action: 'admin.bootstrap_completed',
      details: { email },
    }),
  ]);

  return NextResponse.json({ success: true });
}
