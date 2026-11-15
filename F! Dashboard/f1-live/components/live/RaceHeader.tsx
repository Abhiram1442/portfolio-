'use client';

import { useState, useEffect } from 'react';
import { RaceStatus } from '@/types/f1';
import { getRaceStatusColor, getRaceStatusLabel } from '@/lib/utils';
import { Radio } from 'lucide-react';

interface RaceHeaderProps {
  raceName: string;
  circuitName: string;
  country: string;
  currentLap: number;
  totalLaps: number;
  raceStatus: RaceStatus;
  lastUpdated: string;
  dataSource: 'LIVE' | 'MOCK' | 'CACHED';
}

export function RaceHeader({
  raceName,
  circuitName,
  country,
  currentLap,
  totalLaps,
  raceStatus,
  lastUpdated,
  dataSource,
}: RaceHeaderProps) {
  const [secondsAgo, setSecondsAgo] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const diff = Math.max(0, Math.floor((Date.now() - new Date(lastUpdated).getTime()) / 1000));
      setSecondsAgo(diff);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const statusColorClass = getRaceStatusColor(raceStatus);
  const statusLabel = getRaceStatusLabel(raceStatus);

  return (
    <div className="bg-[#111] border-b border-white/8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: race info */}
          <div className="flex items-start gap-4">
            {/* LIVE badge */}
            {dataSource === 'LIVE' ? (
              <div className="live-badge shrink-0 mt-0.5">
                <Radio size={10} className="live-pulse" aria-hidden="true" />
                LIVE
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-amber-600/80 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">
                MOCK
              </div>
            )}

            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">{raceName}</h1>
              <p className="text-sm text-gray-400 mt-0.5">{circuitName} · {country}</p>
            </div>
          </div>

          {/* Right: lap + status */}
          <div className="flex items-center gap-4">
            {/* Race status pill */}
            <div className={`px-3 py-1 rounded font-bold text-sm ${statusColorClass}`} role="status">
              {statusLabel}
            </div>

            {/* Lap counter */}
            <div className="text-right">
              <div className="font-black text-2xl font-mono leading-none" aria-label={`Lap ${currentLap} of ${totalLaps}`}>
                <span className="text-white">{currentLap}</span>
                <span className="text-gray-600 text-base"> / {totalLaps}</span>
              </div>
              <div className="section-header mt-0.5">LAP</div>
            </div>
          </div>
        </div>

        {/* Lap progress bar */}
        <div className="mt-3">
          <div
            className="h-1 bg-white/10 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={currentLap}
            aria-valuemin={1}
            aria-valuemax={totalLaps}
            aria-label={`Race progress: lap ${currentLap} of ${totalLaps}`}
          >
            <div
              className="h-full bg-[#e10600] rounded-full transition-all duration-1000"
              style={{ width: `${(currentLap / totalLaps) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-700">START</span>
            <span className="text-[10px] text-gray-400">
              {secondsAgo !== null ? `Updated ${secondsAgo}s ago` : 'Updated recently'}
            </span>
            <span className="text-[10px] text-gray-700">FINISH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
