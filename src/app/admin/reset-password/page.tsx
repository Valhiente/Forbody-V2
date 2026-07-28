'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function ResetAdminPasswordPage() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    if (password.length < 12 || !/[A-Za-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      setMessage('Use pelo menos 12 caracteres, incluindo letra, número e símbolo.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage('O link expirou ou não foi possível alterar a senha.');
      setLoading(false);
      return;
    }
    await supabase.auth.signOut();
    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">Forbody Admin</p>
        <h1 className="mt-4 text-3xl font-black">Definir nova senha</h1>
        {success ? (
          <div className="mt-8 space-y-5">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">Senha alterada com sucesso.</div>
            <Link href="/admin/login" className="block rounded-xl bg-red-600 px-5 py-3 text-center text-sm font-bold uppercase tracking-wider">Entrar</Link>
          </div>
        ) : ready ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {message && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{message}</div>}
            <input type="password" required autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nova senha" className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 outline-none focus:border-red-500" />
            <input type="password" required autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirmar nova senha" className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 outline-none focus:border-red-500" />
            <button disabled={loading} className="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-bold uppercase tracking-wider disabled:opacity-50">{loading ? 'Salvando...' : 'Alterar senha'}</button>
          </form>
        ) : (
          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-200">Link inválido ou expirado.</div>
        )}
      </div>
    </div>
  );
}
