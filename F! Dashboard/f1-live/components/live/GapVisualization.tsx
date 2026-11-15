import { LivePosition } from '@/types/f1';
import { MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { TyreBadge } from '@/components/ui/TyreBadge';

interface GapVisualizationProps {
  positions: LivePosition[];
  maxDrivers?: number;
}

export function GapVisualization({ positions, maxDrivers = 10 }: GapVisualizationProps) {
  const running = positions
    .filter(p => p.status === 'RUNNING' || p.status === 'PIT')
    .slice(0, maxDrivers);

  return (
    <div className="f1-card overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8">
        <h2 className="section-header">GAP VISUALIZATION</h2>
        <p className="text-[10px] text-gray-600 mt-0.5">Time gap to race leader</p>
      </div>

      <div className="p-4 space-y-0">
        {running.map((pos, idx) => {
          const driver = MOCK_DRIVERS[pos.driverId];
          const team = MOCK_TEAMS[driver?.teamId ?? ''];
          const isLeader = pos.position === 1;
          const isLapped = pos.gapToLeader.includes('LAP');

          if (!driver) return null;

          return (
            <div key={pos.driverId}>
              {/* Gap line above (except leader) */}
              {!isLeader && (
                <div className="flex items-center gap-2 py-1 pl-8">
                  <div className="h-4 w-0.5 bg-white/10 ml-3" aria-hidden="true" />
                  <span className={`text-xs font-mono ${isLapped ? 'text-orange-400' : 'text-gray-500'}`}>
                    {pos.gapToLeader}
                    <span className="text-gray-700 ml-1 text-[10px]">
                      {isLapped ? 'LAP GAP' : 'TIME GAP'}
                    </span>
                  </span>
                </div>
              )}

              {/* Driver row */}
              <div
                className={`flex items-center gap-3 py-2 px-3 rounded ${isLeader ? 'bg-white/5' : ''}`}
              >
                {/* Position */}
                <span
                  className={`w-5 text-center font-mono text-sm font-bold shrink-0 ${isLeader ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                  {pos.position}
                </span>

                {/* Team color strip */}
                <div
                  className="w-0.5 h-8 rounded-full shrink-0"
                  style={{ backgroundColor: team?.color ?? '#444' }}
                  aria-hidden="true"
                />

                {/* Driver */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{driver.flagEmoji}</span>
                    <span className="font-bold text-sm tracking-wide">{driver.abbreviation}</span>
                    <span className="text-xs text-gray-600 hidden sm:block">{driver.name}</span>
                  </div>
                </div>

                {/* Tyre */}
                <TyreBadge compound={pos.tyre} age={pos.tyreAge} size="sm" showAge />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
