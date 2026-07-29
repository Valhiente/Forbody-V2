"use client";

import { useState } from 'react';
import { triggerSyncAllGoogleReviews } from '@/app/admin/actions';

type SyncResult = {
  success: boolean;
  synced: number;
  failed: number;
  message: string;
};

export default function AdminSyncClient({ canWrite = true }: { canWrite?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);

  async function handleClick() {
    setLoading(true);
    setResult(null);
    try {
      const response = await triggerSyncAllGoogleReviews();
      const synced = response.synced ?? 0;
      const failed = response.failed ?? 0;
      setResult({
        success: response.success,
        synced,
        failed,
        message: response.total === 0
          ? 'Nenhuma unidade ativa possui Google Place ID.'
          : response.success
            ? `${synced} unidade(s) atualizada(s).`
            : `${synced} atualizada(s) e ${failed} com falha.`,
      });
    } catch (error: unknown) {
      console.error('Sync action failed', error);
      setResult({
        success: false,
        synced: 0,
        failed: 1,
        message: 'Não foi possível sincronizar. Verifique a chave Google e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button type="button" onClick={handleClick} className="rounded bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50" disabled={loading || !canWrite}>
        {!canWrite ? 'Somente visualização' : loading ? 'Sincronizando...' : 'Sincronizar Google Reviews'}
      </button>
      {result && (
        <div className={`text-sm ${result.success ? 'text-green-300' : 'text-yellow-300'}`}>
          {result.message}
        </div>
      )}
    </div>
  );
}
