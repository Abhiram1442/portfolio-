'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_CALENDAR } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { formatShortDate } from '@/lib/utils';
import { RaceCalendarStatus } from '@/types/f1';
import { Radio, Check, Clock, Bell, Calendar as CalendarIcon, Grid, List } from 'lucide-react';
import { NotificationManager } from '@/components/ui/NotificationManager';

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

type CalendarViewMode = 'SEASON' | 'MONTH' | 'NEXT_RACE';

export default function CalendarPage() {
  const [filter, setFilter] = useState<RaceCalendarStatus | 'ALL'>('ALL');
  const [viewMode, setViewMode] = useState<CalendarViewMode>('SEASON');
  const [selectedReminder, setSelectedReminder] = useState<{ title: string; time: string } | null>(null);

  const filtered = filter === 'ALL' ? MOCK_CALENDAR : MOCK_CALENDAR.filter(r => r.status === filter);

  const nextRace = MOCK_CALENDAR.find(r => r.status === 'UPCOMING') || MOCK_CALENDAR[0];

  const counts = {
    COMPLETED: MOCK_CALENDAR.filter(r => r.status === 'COMPLETED').length,
    LIVE: MOCK_CALENDAR.filter(r => r.status === 'LIVE').length,
    UPCOMING: MOCK_CALENDAR.filter(r => r.status === 'UPCOMING').length,
  };

  return (
    <>
      <MockDataBanner />
      <div className="container mx-auto px-4 py-8">
        {/* Header and Smart View Switcher */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl font-black">2025 Formula 1 World Championship Calendar</h1>
            <p className="text-xs text-gray-400 mt-1">
              Dynamic race weekend schedules, timezone detection, and smart session alerts
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#141414] border border-white/10 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('SEASON')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'SEASON' ? 'bg-[#e10600] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid size={13} />
              <span>Season View</span>
            </button>

            <button
              onClick={() => setViewMode('NEXT_RACE')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'NEXT_RACE' ? 'bg-[#e10600] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <CalendarIcon size={13} />
              <span>Next Race Spotlight</span>
            </button>
          </div>
        </div>

        {/* View Mode: Next Race Spotlight */}
        {viewMode === 'NEXT_RACE' && nextRace && (
          <div className="mb-8 p-6 bg-gradient-to-r from-[#181818] via-[#141414] to-[#1a1212] border border-[#e10600]/30 rounded-2xl shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#e10600]/20 text-[#e10600] border border-[#e10600]/30 text-xs font-black uppercase tracking-wider mb-3">
                  Next Grand Prix Weekend
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{nextRace.flagEmoji}</span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">{nextRace.name}</h2>
                    <p className="text-sm text-gray-400 mt-0.5">{nextRace.country}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => setSelectedReminder({
                    title: nextRace.name,
                    time: formatShortDate(nextRace.startTime),
                  })}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#e10600] hover:bg-[#c00500] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#e10600]/30"
                >
                  <Bell size={16} />
                  <span>Set Session Reminder</span>
                </button>
              </div>
            </div>

            {/* Weekend Session Schedule breakdown */}
            <div className="mt-6 pt-6 border-t border-white/10 grid sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              {[
                { name: 'Practice 1 (FP1)', time: 'Fri &bull; 12:30 Local' },
                { name: 'Practice 2 (FP2)', time: 'Fri &bull; 16:00 Local' },
                { name: 'Practice 3 (FP3)', time: 'Sat &bull; 12:30 Local' },
                { name: 'Qualifying', time: 'Sat &bull; 16:00 Local' },
                { name: 'Grand Prix Race', time: 'Sun &bull; 15:00 Local' },
              ].map((session, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl">
                  <div className="text-gray-400 font-medium mb-1">{session.name}</div>
                  <div className="text-white font-bold" dangerouslySetInnerHTML={{ __html: session.time }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Filters */}
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
            <div
              key={race.id}
              className={`f1-card p-4 flex flex-col justify-between hover:border-white/20 transition-all hover:scale-[1.01] ${race.status === 'LIVE' ? 'border-red-500/30' : ''}`}
            >
              <div>
                {/* Round + Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">
                    R{race.round}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${STATUS_STYLES[race.status]}`}>
                    {STATUS_ICON[race.status]}
                    {race.status}
                  </span>
                </div>

                {/* Flag + name */}
                <div className="text-2xl mb-1">{race.flagEmoji}</div>
                <h3 className="font-bold text-sm leading-tight mb-1 text-white">{race.name}</h3>
                <p className="text-xs text-gray-400">{race.country}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-gray-400">{formatShortDate(race.startTime)}</span>

                {/* Quick Remind Me button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedReminder({
                      title: race.name,
                      time: formatShortDate(race.startTime),
                    });
                  }}
                  className="p-1.5 bg-white/5 hover:bg-[#e10600]/20 text-gray-400 hover:text-white rounded-md border border-white/5 transition"
                  title="Remind me for this Grand Prix"
                >
                  <Bell size={13} />
                </button>
              </div>

              {/* Winner if completed */}
              {race.winner && (
                <div className="mt-2 text-xs text-yellow-500 font-medium">
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
            </div>
          ))}
        </div>
      </div>

      {/* Smart Notification Modal */}
      {selectedReminder && (
        <NotificationManager
          sessionTitle={selectedReminder.title}
          sessionTime={selectedReminder.time}
          isOpen={Boolean(selectedReminder)}
          onClose={() => setSelectedReminder(null)}
        />
      )}
    </>
  );
}
