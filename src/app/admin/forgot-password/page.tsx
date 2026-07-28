'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function ForgotAdminPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">Forbody Admin</p>
        <h1 className="mt-4 text-3xl font-black">Recuperar senha</h1>
        {sent ? (
          <div className="mt-8 space-y-5">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
              Se o e-mail estiver cadastrado, você receberá um link seguro para trocar a senha.
            </div>
            <Link href="/admin/login" className="block text-center text-sm text-gray-400 hover:text-white">Voltar ao login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <p className="text-sm text-gray-400">Informe o e-mail utilizado no convite administrativo.</p>
            <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@empresa.com.br" className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 outline-none focus:border-red-500" />
            <button disabled={loading} className="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-bold uppercase tracking-wider disabled:opacity-50">
              {loading ? 'Enviando...' : 'Enviar link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
