'use client'

import { useState } from 'react';
import type { Unit } from '@/app/index';
import { updateUnitAction } from './actions';
import Button from '@/components/ui/Button';

export default function UnitEditForm({ unit }: { unit: Unit }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.append('id', unit.id);
    formData.append('slug', unit.slug);

    const result = await updateUnitAction(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Unidade atualizada com sucesso!' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Erro ao atualizar unidade.' });
    }

    setLoading(false);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40">
      <h2 className="text-xl font-black text-white mb-2">Editar Unidade</h2>
      <p className="text-sm text-yellow-500 mb-6">Aviso: Alterações são salvas no Supabase. O fallback local continua preservado.</p>
      
      {message && (
        <div className={`p-4 mb-6 rounded-md text-sm font-bold ${message.type === 'success' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-white mb-1">Nome</label>
            <input type="text" name="name" defaultValue={unit.name ?? ''} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block font-semibold text-white mb-1">Status</label>
            <select name="status" defaultValue={unit.status ?? 'active'} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white">
              <option value="active">ATIVA</option>
              <option value="coming_soon">EM BREVE</option>
              <option value="maintenance">MANUTENÇÃO</option>
              <option value="hidden">OCULTA</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-white mb-1">Cidade</label>
            <input type="text" name="city" defaultValue={unit.city ?? ''} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block font-semibold text-white mb-1">Estado</label>
            <input type="text" name="state" defaultValue={unit.state ?? ''} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold text-white mb-1">Endereço</label>
            <input type="text" name="address" defaultValue={unit.address ?? ''} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block font-semibold text-white mb-1">WhatsApp</label>
            <input type="text" name="whatsapp" defaultValue={unit.whatsapp ?? ''} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block font-semibold text-white mb-1">Instagram</label>
            <input type="text" name="instagram" defaultValue={unit.instagram ?? ''} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block font-semibold text-white mb-1">Link EVO (Vendas)</label>
            <input type="url" name="salesUrl" defaultValue={unit.salesUrl ?? ''} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block font-semibold text-white mb-1">Área do Aluno</label>
            <input type="url" name="studentAreaUrl" defaultValue={unit.studentAreaUrl ?? ''} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block font-semibold text-white mb-1">Link Google Maps (locationUrl)</label>
            <input type="url" name="locationUrl" defaultValue={unit.locationUrl ?? ''} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block font-semibold text-white mb-1">Google Place ID</label>
            <input type="text" name="googlePlaceId" defaultValue={unit.googlePlaceId ?? ''} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white" />
          </div>
        </div>

        <Button type="submit" variant="b2b-primary" disabled={loading} className="w-full mt-6">
          {loading ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </form>
    </div>
  );
}
