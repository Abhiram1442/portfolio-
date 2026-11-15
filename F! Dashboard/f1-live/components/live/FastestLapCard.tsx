import { FastestLap } from '@/types/f1';
import { MOCK_DRIVERS } from '@/lib/mock-data';
import { Zap } from 'lucide-react';

interface FastestLapCardProps {
  fastestLap: FastestLap;
}

export function FastestLapCard({ fastestLap }: FastestLapCardProps) {
  const driver = MOCK_DRIVERS[fastestLap.driverId];
  if (!driver) return null;

  return (
    <div className="f1-card overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8 flex items-center gap-2">
        <Zap size={14} className="text-purple-400" aria-hidden="true" />
        <h2 className="section-header">FASTEST LAP</h2>
      </div>
      <div className="p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
          <Zap size={18} className="text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm">{driver.flagEmoji}</span>
            <span className="font-bold">{driver.name}</span>
          </div>
          <div className="text-xs text-gray-500">
            {MOCK_DRIVERS[fastestLap.driverId]?.team} · Lap {fastestLap.lap}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-xl font-bold text-purple-400">{fastestLap.time}</div>
          {fastestLap.speed && (
            <div className="text-xs text-gray-500">{fastestLap.speed} km/h</div>
          )}
        </div>
      </div>
    </div>
  );
}
