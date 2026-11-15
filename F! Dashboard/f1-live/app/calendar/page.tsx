'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_CALENDAR } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { formatShortDate } from '@/lib/utils';
import { RaceCalendarStatus } from '@/types/f1';
import { Radio, Check, Clock } from 'lucide-react';

const STATUS_STYLES: Record<RaceCalendarStatus, string> = {
  COMPLETED: 'text-gray-500 bg-white/5',
  LIVE: 'text-red-400 bg-red-500/10 border border-red-500/30',
  UPCOMING: 'text-blue-400 bg-blue-500/10',
};

const STATUS_ICON: Record<RaceCalendarStatus, React.ReactNode> = {
  COMPLETED: <Check size={10} />,
  LIVE: <Radio size={10} className="live-pulse" />,
  UPCOMING: <Clock size={10} />,
};

export default function CalendarPage() {
  const [filter, setFilter] = useState<RaceCalendarStatus | 'ALL'>('ALL');

  const filtered = filter === 'ALL' ? MOCK_CALENDAR : MOCK_CALENDAR.filter(r => r.status === filter);

  const counts = {
    COMPLETED: MOCK_CALENDAR.filter(r => r.status === 'COMPLETED').length,
    LIVE: MOCK_CALENDAR.filter(r => r.status === 'LIVE').length,
    UPCOMING: MOCK_CALENDAR.filter(r => r.status === 'UPCOMING').length,
  };

  return (
    <>
      <MockDataBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h1 className="text-2xl font-black">2025 Season Calendar</h1>
          <div className="text-sm text-gray-500">
            {MOCK_CALENDAR.length} Grands Prix
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['ALL', 'LIVE', 'UPCOMING', 'COMPLETED'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                filter === f
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              aria-pressed={filter === f}
            >
              {f} {f !== 'ALL' && <span className="ml-1 opacity-60">{counts[f]}</span>}
            </button>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((race) => (
            <Link
              key={race.id}
              href={`/races/${race.id}`}
              className={`f1-card p-4 block hover:border-white/20 transition-all hover:scale-[1.01] ${race.status === 'LIVE' ? 'border-red-500/30' : ''}`}
            >
              {/* Round + Status */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">
                  R{race.round}
                </span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${STATUS_STYLES[race.status]}`}>
                  {STATUS_ICON[race.status]}
                  {race.status}
                </span>
              </div>

              {/* Flag + name */}
              <div className="text-2xl mb-1">{race.flagEmoji}</div>
              <h3 className="font-bold text-sm leading-tight mb-1">{race.name}</h3>
              <p className="text-xs text-gray-500">{race.country}</p>

              {/* Date */}
              <div className="mt-3 pt-3 border-t border-white/5 text-xs text-gray-600">
                {formatShortDate(race.startTime)}
              </div>

              {/* Winner if completed */}
              {race.winner && (
                <div className="mt-1 text-xs text-yellow-500">
                  🏆 {race.winner}
                </div>
              )}

              {/* Live state */}
              {race.status === 'LIVE' && (
                <div className="mt-2 flex items-center gap-1.5 text-red-400 text-xs font-semibold">
                  <Radio size={10} className="live-pulse" />
                  LAP {race.currentLap} / {race.totalLaps}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
