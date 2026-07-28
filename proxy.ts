import { NextRequest, NextResponse } from 'next/server';
import { updateSupabaseSession } from '@/lib/supabase/proxy';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicAdminRoutes = [
    '/admin/login',
    '/admin/accept-invite',
    '/admin/forgot-password',
    '/admin/reset-password',
    '/admin/logout',
  ];
  const { response, authenticated } = await updateSupabaseSession(request);

  if (pathname.startsWith('/admin') && !publicAdminRoutes.includes(pathname) && !authenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
