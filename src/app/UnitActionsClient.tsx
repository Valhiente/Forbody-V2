'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { handleGoogleSync } from '@/actions/unit.actions';
import { UnitListItem } from '@/types/unit.types';

export default function UnitActionsClient({ unit }: { unit: UnitListItem }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  const onSyncClick = async () => {
    if (!unit.googlePlaceId) return;

    setIsSyncing(true);
    
    try {
      const result = await handleGoogleSync(unit.id, unit.googlePlaceId, unit.slug);
      
      if (!result.success) {
        toast.error(result.message || 'Erro crítico na operação.');
        if (result.error) console.error(result.error);
      } else {
        toast.success(result.message);
        router.refresh();
      }
    } catch (error) {
      toast.error('Ocorreu uma falha inesperada no servidor.');
      console.error(error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      {unit.googlePlaceId ? (
        <button onClick={onSyncClick} disabled={isSyncing} title="Atualizar Notas de Reviews" className="text-xs font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors disabled:opacity-50 disabled:animate-pulse">
          {isSyncing ? 'Sincronizando...' : 'Sync Google'}
        </button>
      ) : (
        <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Sem Place ID</span>
      )}
      <span className="text-white/10">|</span>
      <Link href={`/unidades/${unit.slug}`} target="_blank" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Preview</Link>
      <span className="text-white/10">|</span>
      <Link href={`/admin/unidades/${unit.id}`} className="text-xs font-bold text-red-600 hover:text-red-400 uppercase tracking-widest transition-colors">Editar</Link>
    </>
  );
}