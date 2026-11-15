'use client';

import { useState } from 'react';
import { LivePosition, LiveRaceData } from '@/types/f1';
import { MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { TyreBadge } from '@/components/ui/TyreBadge';
import { TeamColorBar } from '@/components/ui/TeamColorBar';
import { formatPositionChange, getDriverStatusColor } from '@/lib/utils';
import { DriverDetailPanel } from '@/components/live/DriverDetailPanel';
import { Trophy, Zap } from 'lucide-react';

interface LeaderboardProps {
  data: LiveRaceData;
  onSelectDriver?: (driver: typeof MOCK_DRIVERS[string]) => void;
}

export function Leaderboard({ data, onSelectDriver }: LeaderboardProps) {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  const selectedPosition = data.positions.find(p => p.driverId === selectedDriver);
  const selectedDriverData = selectedDriver ? MOCK_DRIVERS[selectedDriver] : null;

  const handleRowClick = (driverId: string) => {
    const next = selectedDriver === driverId ? null : driverId;
    setSelectedDriver(next);
    if (next && MOCK_DRIVERS[next]) {
      onSelectDriver?.(MOCK_DRIVERS[next]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Main table */}
      <div className="flex-1 f1-card overflow-hidden">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[2rem_1fr_7rem_4rem_3.5rem_5.5rem_4rem_5rem] gap-2 px-4 py-2 border-b border-white/8">
          {['POS', 'DRIVER', 'TEAM', 'TYRE', 'LAP', 'GAP', 'PITS', 'STATUS'].map(h => (
            <span key={h} className="section-header text-right first:text-left">{h}</span>
          ))}
        </div>

        <div className="divide-y divide-white/5">
          {data.positions.map((pos) => (
            <LeaderboardRow
              key={pos.driverId}
              pos={pos}
              fastestLapDriver={data.fastestLap?.driverId}
              isSelected={selectedDriver === pos.driverId}
              onClick={() => handleRowClick(pos.driverId)}
            />
          ))}
        </div>
      </div>

      {/* Driver detail panel */}
      {selectedDriverData && selectedPosition && (
        <div className="lg:w-80 xl:w-96">
          <DriverDetailPanel
            driver={selectedDriverData}
            position={selectedPosition}
            fastestLap={data.fastestLap}
            onClose={() => setSelectedDriver(null)}
          />
        </div>
      )}
    </div>
  );
}

interface LeaderboardRowProps {
  pos: LivePosition;
  fastestLapDriver?: string;
  isSelected: boolean;
  onClick: () => void;
}

function LeaderboardRow({ pos, fastestLapDriver, isSelected, onClick }: LeaderboardRowProps) {
  const driver = MOCK_DRIVERS[pos.driverId];
  const team = MOCK_TEAMS[driver?.teamId ?? ''];
  const posChange = formatPositionChange(pos.position, pos.previousPosition);
  const statusColor = getDriverStatusColor(pos.status);
  const isLeader = pos.position === 1;
  const hasFastestLap = pos.driverId === fastestLapDriver;
  const isDNF = pos.status === 'DNF' || pos.status === 'OUT';

  if (!driver) return null;

  return (
    <button
      onClick={onClick}
      className={`
        leaderboard-row w-full text-left
        ${isLeader ? 'leader' : ''}
        ${isSelected ? 'bg-white/8 border-l-2 border-l-[#e10600]' : ''}
        ${isDNF ? 'opacity-50' : ''}
      `}
      aria-label={`${driver.name} — Position ${pos.position}`}
      aria-pressed={isSelected}
    >
      {/* Mobile layout */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3">
        <TeamColorBar teamId={driver.teamId} />
        <span className="w-7 text-center font-mono font-bold text-sm text-gray-400">{pos.position}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{driver.flagEmoji}</span>
            <span className="font-bold text-sm">{driver.abbreviation}</span>
            {hasFastestLap && <Zap size={12} className="text-purple-400" aria-label="Fastest lap" />}
            {isLeader && <Trophy size={12} className="text-yellow-400" aria-label="Race leader" />}
          </div>
          <span className="text-xs text-gray-500">{team?.shortName}</span>
        </div>
        <div className="text-right">
          <div className="font-mono text-sm text-gray-300">{pos.gapToLeader}</div>
          <div className="flex items-center justify-end gap-1">
            <TyreBadge compound={pos.tyre} size="sm" />
            <span className="text-xs text-gray-600">{pos.tyreAge}L</span>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-[2rem_1fr_7rem_4rem_3.5rem_5.5rem_4rem_5rem] gap-2 items-center px-4 py-3">
        {/* POS */}
        <div className="flex items-center gap-1">
          <TeamColorBar teamId={driver.teamId} />
          <span className={`font-mono font-bold text-sm ${isLeader ? 'text-yellow-400' : 'text-gray-300'}`}>
            {pos.position}
          </span>
        </div>

        {/* DRIVER */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm">{driver.flagEmoji}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-wide">{driver.abbreviation}</span>
              <span className="hidden xl:block text-xs text-gray-500 truncate">{driver.name}</span>
              {hasFastestLap && (
                <Zap size={11} className="text-purple-400 shrink-0" aria-label="Fastest lap holder" />
              )}
              {isLeader && (
                <Trophy size={11} className="text-yellow-400 shrink-0" aria-label="Race leader" />
              )}
            </div>
            {/* Position change */}
            <span
              className={`text-[10px] font-semibold ${posChange.color}`}
              aria-label={`Position change: ${posChange.label}`}
            >
              {posChange.symbol} {posChange.gained !== 0 ? Math.abs(posChange.gained) : ''}
            </span>
          </div>
        </div>

        {/* TEAM */}
        <span className="text-xs text-gray-500 truncate text-right">{team?.shortName}</span>

        {/* TYRE */}
        <div className="flex justify-center">
          <TyreBadge compound={pos.tyre} age={pos.tyreAge} showAge />
        </div>

        {/* LAP */}
        <span className="font-mono text-sm text-gray-300 text-right">{pos.lap}</span>

        {/* GAP */}
        <span className={`font-mono text-sm text-right ${isLeader ? 'text-yellow-400 font-bold' : 'text-gray-300'}`}>
          {pos.gapToLeader}
        </span>

        {/* PITS */}
        <span className="font-mono text-sm text-gray-400 text-right">{pos.pitStops}</span>

        {/* STATUS */}
        <span className={`text-xs font-semibold text-right ${statusColor}`}>
          {pos.status}
        </span>
      </div>
    </button>
  );
}
