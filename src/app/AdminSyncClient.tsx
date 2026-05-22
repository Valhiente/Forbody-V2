"use client";

import React, { useState } from 'react';
import { triggerSyncAllGoogleReviews } from '@/app/unit.actions';

export default function AdminSyncClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ synced: number; failed: number } | null>(null);

  async function handleClick() {
    setLoading(true);
    setResult(null);
    try {
      // call server action
      const res: any = await triggerSyncAllGoogleReviews();
      setResult({ synced: res.synced ?? 0, failed: res.failed ?? 0 });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Sync action failed', err);
      setResult({ synced: 0, failed: 1 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase text-xs tracking-widest rounded"
        disabled={loading}
      >
        {loading ? 'Sincronizando...' : 'Sincronizar Google Reviews'}
      </button>

      {result && (
        <div className="text-sm text-gray-300 font-mono">
          sincronizadas: {result.synced} • falhas: {result.failed}
        </div>
      )}
    </div>
  );
}
