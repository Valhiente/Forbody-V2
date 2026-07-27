import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

export function createAdminSessionToken(): string {
  const secret = getSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET não configurado.');

  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(16).toString('hex');
  const data = `${timestamp}:${random}`;
  const signature = crypto.createHmac('sha256', secret).update(data).digest('hex');

  return `${data}:${signature}`;
}

export function validateAdminSessionToken(token: string | undefined): boolean {
  const secret = getSecret();
  if (!secret || !token) return false;

  const parts = token.split(':');
  if (parts.length !== 3) return false;

  const [timestamp, random, signature] = parts;
  const tokenTime = Number(timestamp);
  if (!Number.isFinite(tokenTime) || tokenTime > Date.now()) return false;
  if (Date.now() - tokenTime >= SESSION_MAX_AGE_MS) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}:${random}`)
    .digest('hex');

  const signatureBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  return (
    signatureBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  );
}

export async function validateAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return validateAdminSessionToken(cookieStore.get('admin_session')?.value);
}

export async function requireAdminSession(): Promise<void> {
  if (!(await validateAdminSession())) {
    throw new Error('Não autorizado. Entre novamente no painel.');
  }
}
