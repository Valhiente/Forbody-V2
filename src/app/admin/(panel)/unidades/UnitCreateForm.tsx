'use client'

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import Button from '@/components/ui/Button';
import { createUnitAction } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="b2b-primary" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Criando...' : 'Criar unidade'}
    </Button>
  );
}

export default function UnitCreateForm() {
  const [error, setError] = useState<string | null>(null);

  async function action(formData: FormData) {
    setError(null);
    try {
      const result = await createUnitAction(formData);
      if (result && !result.success) {
        setError(result.error || 'Ocorreu um erro ao criar a unidade.');
      }
    } catch (err: any) {
      if (err.message === 'NEXT_REDIRECT') {
        throw err;
      }
      setError('Ocorreu um erro inesperado.');
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40">
      <div className="mb-6">
        <h2 className="text-xl font-black text-white">Nova Unidade</h2>
        <p className="mt-2 text-sm text-gray-400">
          A nova unidade será salva no Supabase.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-900/50 bg-red-900/20 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <form action={action} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Nome e Slug */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-300">
              Nome da unidade *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Ex: ForBody Centro"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-semibold text-gray-300">
              Slug (opcional - gerado do nome se vazio)
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Ex: centro"
            />
          </div>

          {/* Cidade e Estado */}
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-semibold text-gray-300">
              Cidade
            </label>
            <input
              type="text"
              id="city"
              name="city"
              defaultValue="Ribeirão Preto"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="state" className="text-sm font-semibold text-gray-300">
              Estado
            </label>
            <input
              type="text"
              id="state"
              name="state"
              defaultValue="SP"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Endereço e Status */}
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-semibold text-gray-300">
              Endereço
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Rua, Número, Bairro"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-semibold text-gray-300">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue="coming_soon"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="active">Ativa</option>
              <option value="coming_soon">Em breve</option>
              <option value="maintenance">Manutenção</option>
              <option value="hidden">Oculta</option>
            </select>
          </div>

          {/* Redes Sociais */}
          <div className="space-y-2">
            <label htmlFor="whatsapp" className="text-sm font-semibold text-gray-300">
              WhatsApp
            </label>
            <input
              type="text"
              id="whatsapp"
              name="whatsapp"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Ex: 16999999999"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="instagram" className="text-sm font-semibold text-gray-300">
              Instagram (username)
            </label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Ex: forbody.rp"
            />
          </div>

          {/* Links EVO */}
          <div className="space-y-2">
            <label htmlFor="salesUrl" className="text-sm font-semibold text-gray-300">
              Link EVO Vendas
            </label>
            <input
              type="url"
              id="salesUrl"
              name="salesUrl"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="studentAreaUrl" className="text-sm font-semibold text-gray-300">
              Área do Aluno (URL)
            </label>
            <input
              type="url"
              id="studentAreaUrl"
              name="studentAreaUrl"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="https://..."
            />
          </div>

          {/* Google */}
          <div className="space-y-2">
            <label htmlFor="locationUrl" className="text-sm font-semibold text-gray-300">
              Link Google Maps
            </label>
            <input
              type="url"
              id="locationUrl"
              name="locationUrl"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="googlePlaceId" className="text-sm font-semibold text-gray-300">
              Google Place ID
            </label>
            <input
              type="text"
              id="googlePlaceId"
              name="googlePlaceId"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="ChIJ..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-white/10 pt-6">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}