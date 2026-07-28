"use client";

import { useState } from 'react';
import { triggerSyncAllGoogleReviews } from '@/app/admin/actions';

type SyncResult = {
  synced: number;
  failed: number;
};

export default function AdminSyncClient({ canWrite = true }: { canWrite?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);

  async function handleClick() {
    setLoading(true);
    setResult(null);
    try {
      const response = await triggerSyncAllGoogleReviews();
      setResult({ synced: response.synced ?? 0, failed: response.failed ?? 0 });
    } catch (error: unknown) {
      console.error('Sync action failed', error);
      setResult({ synced: 0, failed: 1 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button type="button" onClick={handleClick} className="rounded bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50" disabled={loading || !canWrite}>
        {!canWrite ? 'Somente visualização' : loading ? 'Sincronizando...' : 'Sincronizar Google Reviews'}
      </button>
      {result && <div className="font-mono text-sm text-gray-300">sincronizadas: {result.synced} • falhas: {result.failed}</div>}
    </div>
  );
}
