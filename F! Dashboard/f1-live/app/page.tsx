'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_LIVE_RACE, MOCK_DRIVER_STANDINGS, MOCK_CONSTRUCTOR_STANDINGS, MOCK_DRIVERS, MOCK_TEAMS, MOCK_CALENDAR } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { TyreBadge } from '@/components/ui/TyreBadge';
import { formatCountdown, formatShortDate } from '@/lib/utils';
import { Radio, ChevronRight, Trophy, Zap, Flag, Clock } from 'lucide-react';

// Simulate a live race happening
const IS_RACE_LIVE = true;

export default function HomePage() {
  const liveData = MOCK_LIVE_RACE;
  const leader = liveData.positions[0];
  const leaderDriver = MOCK_DRIVERS[leader.driverId];

  const nextRace = MOCK_CALENDAR.find(r => r.status === 'UPCOMING');
  const lastRace = [...MOCK_CALENDAR].filter(r => r.status === 'COMPLETED').pop();

  // Countdown state
  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    if (!nextRace) return;
    const update = () => setCountdown(formatCountdown(nextRace.startTime));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [nextRace]);

  return (
    <>
      <MockDataBanner />

      <div className="container mx-auto px-4 py-8 space-y-10">

        {/* ── Hero: LIVE NOW ───────────────────────────────── */}
        {IS_RACE_LIVE && (
          <section aria-labelledby="live-hero-heading">
            <div className="relative bg-gradient-to-br from-[#1a0a0a] via-[#141414] to-[#0a0a0a] border border-[#e10600]/30 rounded-xl overflow-hidden">
              {/* Red glow */}
              <div className="absolute inset-0 bg-[#e10600]/5 pointer-events-none" aria-hidden="true" />

              <div className="relative p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="live-badge">
                        <Radio size={10} className="live-pulse" aria-hidden="true" />
                        LIVE NOW
                      </div>
                      <span className="text-sm text-gray-400">Round {liveData.race.round}</span>
                    </div>
                    <h1 id="live-hero-heading" className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
                      {liveData.race.name}
                    </h1>
                    <p className="text-gray-400">{liveData.circuit.name}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-4xl font-black font-mono">
                      <span className="text-white">LAP {liveData.race.currentLap}</span>
                      <span className="text-gray-600 text-2xl"> / {liveData.race.totalLaps}</span>
                    </div>
                    <div className="text-sm text-green-400 font-semibold mt-1">🟢 GREEN FLAG</div>
                  </div>
                </div>

                {/* Leader */}
                <div className="mt-6 flex items-center gap-6 flex-wrap">
                  <div className="bg-black/40 border border-yellow-400/20 rounded-lg px-5 py-3 flex items-center gap-4">
                    <Trophy size={20} className="text-yellow-400 shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-[10px] text-gray-600 uppercase tracking-wider">Race Leader</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-lg">{leaderDriver?.flagEmoji}</span>
                        <span className="text-xl font-black">{leaderDriver?.abbreviation}</span>
                        <span className="text-gray-400 text-sm hidden sm:block">{leaderDriver?.name}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{leaderDriver?.team}</div>
                    </div>
                    <div className="ml-4">
                      <TyreBadge compound={leader.tyre} size="md" age={leader.tyreAge} showAge />
                    </div>
                  </div>

                  {/* P2 & P3 */}
                  <div className="flex gap-3">
                    {liveData.positions.slice(1, 3).map((pos) => {
                      const d = MOCK_DRIVERS[pos.driverId];
                      return (
                        <div key={pos.driverId} className="bg-black/30 border border-white/8 rounded-lg px-4 py-2.5">
                          <div className="text-[10px] text-gray-600">P{pos.position}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span>{d?.flagEmoji}</span>
                            <span className="font-bold text-sm">{d?.abbreviation}</span>
                          </div>
                          <div className="font-mono text-xs text-gray-400 mt-0.5">{pos.gapToLeader}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    href="/live"
                    className="inline-flex items-center gap-2 bg-[#e10600] hover:bg-[#c40500] text-white font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    <Radio size={16} />
                    View Live Race
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Next GP (when no race live) ──────────────────── */}
        {!IS_RACE_LIVE && nextRace && (
          <section aria-labelledby="next-gp-heading">
            <h2 id="next-gp-heading" className="section-header mb-4">NEXT GRAND PRIX</h2>
            <div className="bg-[#141414] border border-white/8 rounded-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <div className="text-3xl mb-2">{nextRace.flagEmoji}</div>
                  <h3 className="text-2xl font-black">{nextRace.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{formatShortDate(nextRace.startTime)}</p>
                </div>
                <CountdownDisplay targetDate={nextRace.startTime} />
              </div>
            </div>
          </section>
        )}

        {/* ── Driver standings ─────────────────────────────── */}
        <section aria-labelledby="standings-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="standings-heading" className="section-header">DRIVER CHAMPIONSHIP</h2>
            <Link href="/standings" className="text-xs text-gray-500 hover:text-white flex items-center gap-1">
              Full standings <ChevronRight size={12} />
            </Link>
          </div>
          <div className="f1-card overflow-hidden">
            <div className="divide-y divide-white/5">
              {MOCK_DRIVER_STANDINGS.slice(0, 5).map((standing) => {
                const driver = MOCK_DRIVERS[standing.driverId];
                const team = MOCK_TEAMS[standing.teamId];
                if (!driver) return null;
                return (
                  <div key={standing.driverId} className="flex items-center gap-4 px-4 py-3 hover:bg-white/3 transition-colors">
                    <span className="w-6 text-center font-mono font-bold text-sm text-gray-500">{standing.position}</span>
                    <div
                      className="w-0.5 h-8 rounded-full shrink-0"
                      style={{ backgroundColor: team?.color ?? '#444' }}
                      aria-hidden="true"
                    />
                    <span className="text-base">{driver.flagEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm">{driver.name}</div>
                      <div className="text-xs text-gray-500">{team?.shortName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-lg font-mono">{standing.points}</div>
                      <div className="text-[10px] text-gray-600">PTS</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Constructor standings ────────────────────────── */}
        <section aria-labelledby="constructor-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="constructor-heading" className="section-header">CONSTRUCTOR CHAMPIONSHIP</h2>
            <Link href="/standings" className="text-xs text-gray-500 hover:text-white flex items-center gap-1">
              Full standings <ChevronRight size={12} />
            </Link>
          </div>
          <div className="f1-card overflow-hidden">
            <div className="divide-y divide-white/5">
              {MOCK_CONSTRUCTOR_STANDINGS.slice(0, 5).map((standing) => {
                const team = MOCK_TEAMS[standing.teamId];
                if (!team) return null;
                return (
                  <div key={standing.teamId} className="flex items-center gap-4 px-4 py-3 hover:bg-white/3 transition-colors">
                    <span className="w-6 text-center font-mono font-bold text-sm text-gray-500">{standing.position}</span>
                    <div
                      className="w-0.5 h-8 rounded-full shrink-0"
                      style={{ backgroundColor: team.color }}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm">{team.name}</div>
                      <div className="text-xs text-gray-500">{standing.wins} wins · {standing.podiums} podiums</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-lg font-mono">{standing.points}</div>
                      <div className="text-[10px] text-gray-600">PTS</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Upcoming races ───────────────────────────────── */}
        <section aria-labelledby="calendar-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="calendar-heading" className="section-header">UPCOMING RACES</h2>
            <Link href="/calendar" className="text-xs text-gray-500 hover:text-white flex items-center gap-1">
              Full calendar <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_CALENDAR.filter(r => r.status === 'UPCOMING').slice(0, 6).map((race) => (
              <Link key={race.id} href={`/races/${race.id}`} className="f1-card p-4 hover:border-white/20 transition-colors block">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xl mb-1">{race.flagEmoji}</div>
                    <div className="font-bold text-sm">{race.shortName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{formatShortDate(race.startTime)}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                      R{race.round}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function CountdownDisplay({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-end gap-3" aria-label="Countdown to race">
      {[
        { value: time.days, label: 'DAYS' },
        { value: time.hours, label: 'HRS' },
        { value: time.minutes, label: 'MIN' },
        { value: time.seconds, label: 'SEC' },
      ].map(({ value, label }) => (
        <div key={label} className="countdown-digit">
          <div className="font-black text-3xl font-mono text-white">{pad(value)}</div>
          <div className="section-header mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}
