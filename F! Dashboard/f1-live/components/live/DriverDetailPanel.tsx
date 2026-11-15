'use client';

import { Driver, LivePosition, FastestLap } from '@/types/f1';
import { MOCK_TEAMS, MOCK_DRIVER_STANDINGS, MOCK_SEASON_STATS, MOCK_CAREER_STATS } from '@/lib/mock-data';
import { TyreBadge } from '@/components/ui/TyreBadge';
import { formatPositionChange, getDriverStatusColor } from '@/lib/utils';
import { X, Zap, Trophy, Flag } from 'lucide-react';

interface DriverDetailPanelProps {
  driver: Driver;
  position: LivePosition;
  fastestLap: FastestLap | null;
  onClose: () => void;
}

export function DriverDetailPanel({ driver, position, fastestLap, onClose }: DriverDetailPanelProps) {
  const team = MOCK_TEAMS[driver.teamId];
  const posChange = formatPositionChange(position.position, position.previousPosition);
  const statusColor = getDriverStatusColor(position.status);
  const standing = MOCK_DRIVER_STANDINGS.find(s => s.driverId === driver.id);
  const seasonStats = MOCK_SEASON_STATS[driver.id];
  const careerStats = MOCK_CAREER_STATS[driver.id];

  return (
    <div className="f1-card overflow-hidden h-fit sticky top-20">
      {/* Header */}
      <div
        className="relative p-4 pb-3"
        style={{ borderLeft: `3px solid ${team?.color ?? '#e10600'}` }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-white transition-colors p-1"
          aria-label="Close driver panel"
        >
          <X size={16} />
        </button>
        <div className="flex items-start gap-3">
          <div>
            <div className="text-3xl font-black text-white/10 leading-none font-mono">
              {driver.number}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">{driver.flagEmoji} {driver.nationality}</div>
            <h2 className="text-lg font-bold leading-tight">{driver.name}</h2>
            <p className="text-sm" style={{ color: team?.color }}>{team?.name}</p>
          </div>
        </div>
      </div>

      {/* Current race state */}
      <div className="px-4 pb-4 space-y-4">
        {/* Position + status */}
        <div className="grid grid-cols-3 gap-3 pt-3">
          <StatBox label="POSITION" value={`P${position.position}`} accent />
          <StatBox label="START" value={`P${position.previousPosition}`} />
          <div className="bg-[#1a1a1a] rounded p-2 text-center">
            <div className={`text-xl font-bold ${posChange.color}`} aria-label={`Position change ${posChange.label}`}>
              {posChange.symbol}{posChange.gained !== 0 ? ` ${Math.abs(posChange.gained)}` : ''}
            </div>
            <div className="section-header mt-1">CHANGE</div>
          </div>
        </div>

        {/* Gap */}
        <div className="bg-[#1a1a1a] rounded p-3">
          <div className="flex justify-between items-center">
            <span className="section-header">GAP TO LEADER</span>
            <span className="font-mono text-sm font-semibold">{position.gapToLeader}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="section-header">GAP AHEAD</span>
            <span className="font-mono text-sm text-gray-400">{position.gapToCarAhead}</span>
          </div>
        </div>

        {/* Tyre + status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1a1a1a] rounded p-3">
            <div className="section-header mb-2">CURRENT TYRE</div>
            <div className="flex items-center gap-2">
              <TyreBadge compound={position.tyre} size="lg" />
              <div>
                <div className="text-sm font-semibold">{position.tyre}</div>
                <div className="text-xs text-gray-500">{position.tyreAge} laps old</div>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded p-3">
            <div className="section-header mb-1">STATUS</div>
            <div className={`text-sm font-bold ${statusColor}`}>{position.status}</div>
            <div className="section-header mt-2 mb-1">PIT STOPS</div>
            <div className="text-sm font-bold">{position.pitStops}</div>
          </div>
        </div>

        {/* Lap times */}
        <div className="bg-[#1a1a1a] rounded p-3 space-y-2">
          <div className="section-header mb-1">LAP TIMES</div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Current</span>
            <span className="font-mono text-xs text-gray-300">{position.currentLapTime ?? '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Best</span>
            <span className="font-mono text-xs text-gray-300">{position.bestLapTime ?? '—'}</span>
          </div>
          {position.driverId === fastestLap?.driverId && (
            <div className="flex items-center gap-1.5 pt-1">
              <Zap size={12} className="text-purple-400" />
              <span className="text-xs text-purple-400 font-semibold">Fastest lap holder</span>
              <span className="font-mono text-xs text-purple-400 ml-auto">{fastestLap.time}</span>
            </div>
          )}
        </div>

        {/* Season stats */}
        {standing && (
          <div>
            <div className="section-header mb-2">2025 SEASON</div>
            <div className="grid grid-cols-3 gap-2">
              <MiniStat label="POS" value={`P${standing.position}`} />
              <MiniStat label="PTS" value={standing.points.toString()} />
              <MiniStat label="WINS" value={standing.wins.toString()} />
              <MiniStat label="PODS" value={standing.podiums.toString()} />
              <MiniStat label="POLES" value={standing.poles.toString()} />
              <MiniStat label="FL" value={standing.fastestLaps.toString()} />
            </div>
          </div>
        )}

        {/* Career stats */}
        {careerStats && (
          <div>
            <div className="section-header mb-2">CAREER</div>
            <div className="grid grid-cols-3 gap-2">
              <MiniStat label="STARTS" value={careerStats.starts.toString()} />
              <MiniStat label="WINS" value={careerStats.wins.toString()} />
              <MiniStat label="PODS" value={careerStats.podiums.toString()} />
              <MiniStat label="POLES" value={careerStats.poles.toString()} />
              <MiniStat label="FL" value={careerStats.fastestLaps.toString()} />
              <MiniStat label="WDCs" value={careerStats.championships.toString()} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-[#1a1a1a] rounded p-2 text-center">
      <div className={`text-xl font-bold ${accent ? 'text-[#e10600]' : 'text-white'}`}>{value}</div>
      <div className="section-header mt-1">{label}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1a1a1a] rounded px-2 py-1.5 text-center">
      <div className="text-sm font-bold">{value}</div>
      <div className="text-[9px] text-gray-600 uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  );
}
