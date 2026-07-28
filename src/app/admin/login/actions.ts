'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import crypto from 'node:crypto';
import { createAdminSessionToken } from '@/lib/admin-session';

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
function safeEqual(value: string, expected: string) {
  const valueHash = crypto.createHash('sha256').update(value).digest();
  const expectedHash = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(valueHash, expectedHash);
}

export async function loginAdmin(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  // Validações básicas
  if (!username || !password) {
    return { error: 'Usuário e senha são obrigatórios.' };
  }

  // Comparar credenciais
  if (
    !ADMIN_USER ||
    !ADMIN_PASSWORD ||
    !process.env.ADMIN_SESSION_SECRET ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    return { error: 'Configuração administrativa indisponível.' };
  }

  if (!safeEqual(username, ADMIN_USER) || !safeEqual(password, ADMIN_PASSWORD)) {
    // Não revelar qual campo está errado
    return { error: 'Usuário ou senha incorretos.' };
  }

  try {
    // Criar token de sessão
    const sessionToken = createAdminSessionToken();

    // Definir cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 horas em segundos
    });
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Erro ao fazer login. Tente novamente.' };
  }

  // Redirecionar após sucesso
  redirect('/admin');
}
