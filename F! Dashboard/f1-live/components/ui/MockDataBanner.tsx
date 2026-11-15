'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export function MockDataBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2"
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs">
          <AlertTriangle size={14} aria-hidden="true" />
          <span>
            <strong>PHASE 1 — PROTOTYPE:</strong> All data displayed is mock/demo data. No live F1 data is being shown.
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-amber-500/60 hover:text-amber-400 text-xs shrink-0"
          aria-label="Dismiss mock data notice"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function LiveDataUnavailable({ lastUpdated }: { lastUpdated?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <AlertTriangle size={32} className="text-red-500" />
      <h3 className="text-lg font-bold text-white">LIVE DATA UNAVAILABLE</h3>
      {lastUpdated && (
        <p className="text-sm text-gray-500">
          Last successful update: <span className="text-gray-300 font-mono">{lastUpdated}</span>
        </p>
      )}
      <p className="text-sm text-gray-600">Retrying...</p>
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div
        className="w-6 h-6 border-2 border-white/20 border-t-[#e10600] rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
