'use server'

import { revalidatePath } from 'next/cache';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

type ActionResult = {
  success: boolean;
  error?: string;
};

type SupabaseAdminClient = NonNullable<Awaited<ReturnType<typeof createSupabaseAdminClient>>>;

function text(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() :