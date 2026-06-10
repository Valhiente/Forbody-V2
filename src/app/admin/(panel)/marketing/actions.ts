'use server'

import { revalidatePath } from 'next/cache';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

type ActionResult = {
  success: boolean;
  error?: string;
};

type SupabaseError = {
  message: string;
};

type SupabaseWriteResult = {
  error: SupabaseError | null;
};

type SupabaseTableWriter = {
  upsert: (payload: Record<string, unknown>, options?: Record<string, string>) => Promise<SupabaseWriteResult>;
};

type SupabaseWriter = {
  from: (table: string) => SupabaseTableWriter;
};

function text(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function textWithFallback(formData: FormData, name