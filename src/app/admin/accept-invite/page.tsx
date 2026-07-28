'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { completeAdminInvite } from './actions';

export default function AcceptAdminInvitePage() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (password.length < 12 || !/[A-Za-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      setError('Use pelo menos 12 caracteres, incluindo letra, número e símbolo.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: passwordError } = await supabase.auth.updateUser({ password });
    if (passwordError) {
      setError('Não foi possível criar a senha. Solicite um novo convite.');
      setLoading(false);
      return;
    }

    const result = await completeAdminInvite();
    if (result.error) {
      setError(result.error);
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
        <h1 className="mt-4 text-3xl font-black">Criar acesso</h1>

        {success ? (
          <div className="mt-8 space-y-5">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
              Senha criada com segurança. Sua conta aguarda a liberação de um ADM FULL.
            </div>
            <Link href="/admin/login" className="block rounded-xl bg-red-600 px-5 py-3 text-center text-sm font-bold uppercase tracking-wider">
              Ir para o login
            </Link>
          </div>
        ) : ready ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <p className="text-sm leading-relaxed text-gray-400">
              Crie uma senha exclusiva. O acesso só será liberado depois que um ADM FULL escolher seu perfil.
            </p>
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Nova senha</label>
              <input id="password" type="password" autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 outline-none focus:border-red-500" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Confirmar senha</label>
              <input id="confirmPassword" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 outline-none focus:border-red-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-bold uppercase tracking-wider disabled:opacity-50">
              {loading ? 'Salvando...' : 'Criar senha'}
            </button>
          </form>
        ) : (
          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-200">
            O convite é inválido, expirou ou já foi utilizado. Solicite um novo convite ao administrador.
          </div>
        )}
      </div>
    </div>
  );
}
