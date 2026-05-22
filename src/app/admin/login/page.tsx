'use client';

import React, { FormEvent, useState } from 'react';
import { loginAdmin } from './actions';

export default function AdminLoginPage() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    }
    // Se sucesso, será redirecionado automaticamente
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Titulo */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black italic uppercase tracking-widest text-white mb-2">
            For<span className="text-red-600">Body</span>
          </h1>
          <p className="text-gray-500 text-sm">Portal Administrativo</p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0a0a0a] border border-white/10 p-8 rounded"
        >
          <h2 className="text-2xl font-bold text-white mb-8">Acesso Admin</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 text-red-400 text-sm rounded">
              {error}
            </div>
          )}

          {/* Username Field */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              disabled={loading}
              className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors disabled:opacity-50"
              placeholder="Digite seu usuário"
            />
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              disabled={loading}
              className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors disabled:opacity-50"
              placeholder="Digite sua senha"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-bold uppercase tracking-widest py-3 transition-colors disabled:cursor-not-allowed"
          >
            {loading ? 'Verificando...' : 'Entrar no Admin'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-8">
          Acesso restrito. Sistema de proteção simples.
        </p>
      </div>
    </div>
  );
}
