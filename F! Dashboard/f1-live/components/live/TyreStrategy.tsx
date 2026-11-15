import { LivePosition } from '@/types/f1';
import { MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { TyreBadge } from '@/components/ui/TyreBadge';

interface TyreStrategyProps {
  positions: LivePosition[];
}

export function TyreStrategy({ positions }: TyreStrategyProps) {
  return (
    <div className="f1-card overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8">
        <h2 className="section-header">TYRE STRATEGY</h2>
      </div>
      <div className="p-4 space-y-2">
        {positions.filter(p => p.status !== 'DNF').map((pos) => {
          const driver = MOCK_DRIVERS[pos.driverId];
          const team = MOCK_TEAMS[driver?.teamId ?? ''];
          if (!driver) return null;

          return (
            <div key={pos.driverId} className="flex items-center gap-3">
              <span className="w-5 text-right font-mono text-xs text-gray-600 shrink-0">{pos.position}</span>
              <div
                className="w-0.5 h-5 rounded-full shrink-0"
                style={{ backgroundColor: team?.color ?? '#444' }}
                aria-hidden="true"
              />
              <span className="w-8 font-bold text-xs shrink-0">{driver.abbreviation}</span>
              <TyreBadge compound={pos.tyre} size="sm" />
              {/* Simple tyre age bar */}
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-white/20"
                  style={{ width: `${Math.min((pos.tyreAge / 50) * 100, 100)}%` }}
                  aria-label={`${pos.tyreAge} laps on tyre`}
                />
              </div>
              <span className="text-xs font-mono text-gray-600 w-8 text-right shrink-0">{pos.tyreAge}L</span>
              <span className="text-xs text-gray-600 w-3 text-right shrink-0">{pos.pitStops}×</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
