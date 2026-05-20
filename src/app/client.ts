import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/database.types';

/**
 * Client do Supabase projetado EXCLUSIVAMENTE para Client Components.
 * Deve ser utilizado para formulários B2B interativos, Uploads no Storage 
 * (fotos da academia com progresso dinâmico) e Auth Providers.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}