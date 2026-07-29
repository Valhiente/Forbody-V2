import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabasePublishableKey, supabaseUrl } from './config';

export function createPublicClient() {
  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {},
    },
  });
}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components podem não permitir mutação de cookies.
        }
      },
    },
  });
}

/**
 * Usar somente em Server Actions/Server Components para operações administrativas.
 * Bypassa RLS (Row Level Security).
 */
export async function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  return createServerClient(supabaseUrl, supabaseServiceKey, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {},
    },
  });
}
