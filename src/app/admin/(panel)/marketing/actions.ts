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
  upsert: (payload: Record<string,