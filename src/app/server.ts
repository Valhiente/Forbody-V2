import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/database.types';

/**
 * Client do Supabase projetado EXCLUSIVAMENTE para Server Components, 
 * API Routes e Server Actions. Manipula cookies de sessão com segurança.
 * Utilizado para SSR ultra-rápido nas páginas dinâmicas das unidades.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // Silenciado intencionalmente. 
            // O método `setAll` pode ser invocado em Server Components que não possuem
            // permissão de mutação direta. Isso será tratado por um Middleware futuro
            // que atualiza a sessão ativamente.
            console.warn('Falha silenciosa na mutação de cookies no Server Component.');
          }
        },
      },
    }
  );
}