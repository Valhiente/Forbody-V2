import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

function validateSessionToken(token: string): boolean {
  if (!ADMIN_SESSION_SECRET) return false;

  const parts = token.split(':');
  if (parts.length !== 3) return false;

  const [timestamp, random, signature] = parts;
  const data = `${timestamp}:${random}`;

  const expectedSignature = crypto
    .createHmac('sha256', ADMIN_SESSION_SECRET)
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas de admin
  if (pathname === '/admin/login' || pathname === '/admin/logout') {
    return NextResponse.next();
  }

  // Proteger rotas /admin/*
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken || !validateSessionToken(sessionToken)) {
      // Redirecionar para login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
