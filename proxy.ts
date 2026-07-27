import { NextRequest, NextResponse } from 'next/server';
import { validateAdminSessionToken } from '@/lib/admin-session';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas de admin
  if (pathname === '/admin/login' || pathname === '/admin/logout') {
    return NextResponse.next();
  }

  // Proteger rotas /admin/*
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!validateAdminSessionToken(sessionToken)) {
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
