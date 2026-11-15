import { PitStop } from '@/types/f1';
import { MOCK_DRIVERS } from '@/lib/mock-data';
import { TyreBadge } from '@/components/ui/TyreBadge';
import { ArrowRight } from 'lucide-react';

interface PitStopTrackerProps {
  pitStops: PitStop[];
}

export function PitStopTracker({ pitStops }: PitStopTrackerProps) {
  const sorted = [...pitStops].sort((a, b) => b.lap - a.lap);

  return (
    <div className="f1-card overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8">
        <h2 className="section-header">PIT STOPS</h2>
      </div>

      {/* Table header */}
      <div className="hidden sm:grid grid-cols-[1fr_3rem_3rem_auto_5rem] gap-3 px-4 py-2 border-b border-white/5">
        {['DRIVER', 'LAP', 'STOP', 'TYRES', 'TIME'].map(h => (
          <span key={h} className="section-header">{h}</span>
        ))}
      </div>

      <div className="divide-y divide-white/5 max-h-60 overflow-y-auto">
        {sorted.map((stop) => {
          const driver = MOCK_DRIVERS[stop.driverId];
          if (!driver) return null;

          return (
            <div key={stop.id} className="px-4 py-2.5">
              {/* Mobile */}
              <div className="sm:hidden flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{driver.flagEmoji} {driver.abbreviation}</span>
                  <span className="text-xs text-gray-600">L{stop.lap} · Stop {stop.stopNumber}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TyreBadge compound={stop.oldTyre} size="sm" />
                  <ArrowRight size={10} className="text-gray-600" />
                  <TyreBadge compound={stop.newTyre} size="sm" />
                  <span className="text-xs font-mono text-gray-400 ml-2">{stop.pitLaneTime}</span>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden sm:grid grid-cols-[1fr_3rem_3rem_auto_5rem] gap-3 items-center">
                <div className="flex items-center gap-2">
                  <span>{driver.flagEmoji}</span>
                  <span className="font-bold text-sm">{driver.abbreviation}</span>
                </div>
                <span className="font-mono text-sm text-gray-400">{stop.lap}</span>
                <span className="font-mono text-sm text-gray-400">{stop.stopNumber}</span>
                <div className="flex items-center gap-1.5">
                  <TyreBadge compound={stop.oldTyre} size="sm" />
                  <ArrowRight size={10} className="text-gray-600" aria-hidden="true" />
                  <TyreBadge compound={stop.newTyre} size="sm" />
                  <span className="text-xs text-gray-500 ml-1">{stop.oldTyre[0]}→{stop.newTyre[0]}</span>
                </div>
                <span className="font-mono text-sm text-gray-300">{stop.pitLaneTime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
