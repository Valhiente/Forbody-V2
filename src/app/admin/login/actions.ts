'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

if (!ADMIN_USER || !ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) {
  throw new Error('Missing required environment variables for admin auth');
}

function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(16).toString('hex');
  const data = `${timestamp}:${random}`;

  const signature = crypto
    .createHmac('sha256', ADMIN_SESSION_SECRET as string)
    .update(data)
    .digest('hex');

  return `${data}:${signature}`;
}

function validateSessionToken(token: string): boolean {
  const parts = token.split(':');
  if (parts.length !== 3) return false;

  const [timestamp, random, signature] = parts;
  const data = `${timestamp}:${random}`;

  const expectedSignature = crypto
    .createHmac('sha256', ADMIN_SESSION_SECRET as string)
    .update(data)
    .digest('hex');

  // Verificar assinatura
  if (signature !== expectedSignature) return false;

  // Verificar validade (24 horas)
  const tokenTime = parseInt(timestamp, 10);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 horas em ms

  return now - tokenTime < maxAge;
}

export async function loginAdmin(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  // Validações básicas
  if (!username || !password) {
    return { error: 'Usuário e senha são obrigatórios.' };
  }

  // Comparar credenciais
  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    // Não revelar qual campo está errado
    return { error: 'Usuário ou senha incorretos.' };
  }

  try {
    // Criar token de sessão
    const sessionToken = createSessionToken();

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

export async function validateAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;

    if (!sessionToken) return false;

    return validateSessionToken(sessionToken);
  } catch {
    return false;
  }
}
