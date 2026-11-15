import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MOCK_CALENDAR, MOCK_DRIVERS, MOCK_QUALIFYING, MOCK_LIVE_RACE } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { formatShortDate } from '@/lib/utils';
import { ArrowLeft, Radio } from 'lucide-react';
import { TyreBadge } from '@/components/ui/TyreBadge';

interface RacePageProps {
  params: Promise<{ raceId: string }>;
}

export async function generateStaticParams() {
  return MOCK_CALENDAR.map(r => ({ raceId: r.id }));
}

export async function generateMetadata({ params }: RacePageProps) {
  const { raceId } = await params;
  const race = MOCK_CALENDAR.find(r => r.id === raceId);
  return { title: race ? `${race.name} — F1 LIVE` : 'Race — F1 LIVE' };
}

export default async function RacePage({ params }: RacePageProps) {
  const { raceId } = await params;
  const race = MOCK_CALENDAR.find(r => r.id === raceId);
  if (!race) notFound();

  const isLive = race.status === 'LIVE';
  const isCompleted = race.status === 'COMPLETED';

  return (
    <>
      <MockDataBanner />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/calendar" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={14} />
          Calendar
        </Link>

        {/* Race hero */}
        <div className="f1-card overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{race.flagEmoji}</span>
                  <span className="text-sm text-gray-500">Round {race.round} · 2025</span>
                  {isLive && (
                    <span className="live-badge">
                      <Radio size={10} className="live-pulse" />
                      LIVE
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-black">{race.name}</h1>
                <p className="text-sm text-gray-500 mt-1">{race.country}</p>
                <p className="text-sm text-gray-600 mt-0.5">{formatShortDate(race.startTime)}</p>
              </div>

              {isLive && race.currentLap && (
                <div className="text-right">
                  <div className="text-3xl font-black font-mono">
                    L{race.currentLap}<span className="text-gray-600 text-xl">/{race.totalLaps}</span>
                  </div>
                  <div className="text-green-400 text-sm font-semibold mt-1">🟢 GREEN FLAG</div>
                </div>
              )}

              {isCompleted && race.winner && (
                <div className="text-right">
                  <div className="text-xs text-gray-600 mb-1">WINNER</div>
                  <div className="text-2xl">🏆</div>
                  <div className="font-black text-lg">{MOCK_DRIVERS[race.winner]?.name ?? race.winner}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View live link */}
        {isLive && (
          <div className="mb-6">
            <Link href="/live" className="inline-flex items-center gap-2 bg-[#e10600] hover:bg-[#c40500] text-white font-bold px-6 py-3 rounded-lg transition-colors">
              <Radio size={16} />
              Watch Live Leaderboard
            </Link>
          </div>
        )}

        {/* Qualifying (Italian GP has mock qualifying) */}
        {race.id === 'ita-2025' && (
          <section className="mb-6" aria-labelledby="quali-heading">
            <h2 id="quali-heading" className="text-xl font-black mb-4">Qualifying</h2>
            <div className="f1-card overflow-hidden">
              <div className="hidden sm:grid grid-cols-[2.5rem_1fr_7rem_6rem_6rem_6rem_6rem] gap-2 px-4 py-2 border-b border-white/8">
                {['POS', 'DRIVER', 'TEAM', 'Q1', 'Q2', 'Q3', 'GAP'].map(h => (
                  <span key={h} className="section-header text-right first:text-left">{h}</span>
                ))}
              </div>
              <div className="divide-y divide-white/5">
                {MOCK_QUALIFYING.map((q) => {
                  const driver = MOCK_DRIVERS[q.driverId];
                  const isPole = q.position === 1;
                  return (
                    <div key={q.driverId} className={`grid grid-cols-[2.5rem_1fr_7rem_6rem_6rem_6rem_6rem] gap-2 items-center px-4 py-3 ${isPole ? 'bg-yellow-400/5' : 'hover:bg-white/3'} transition-colors`}>
                      <span className={`font-mono font-bold text-sm ${isPole ? 'text-yellow-400' : 'text-gray-500'}`}>{q.position}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span>{driver?.flagEmoji}</span>
                          <span className="font-bold text-sm">{driver?.name}</span>
                          {isPole && <span className="text-[10px] bg-yellow-400/20 text-yellow-400 px-1 rounded">POLE</span>}
                        </div>
                        <span className="text-xs text-gray-500">{driver?.team}</span>
                      </div>
                      <span className="hidden sm:block text-xs text-gray-600 text-right">{driver?.abbreviation}</span>
                      <span className="hidden sm:block font-mono text-xs text-gray-500 text-right">{q.q1Time ?? '—'}</span>
                      <span className="hidden sm:block font-mono text-xs text-gray-500 text-right">{q.q2Time ?? '—'}</span>
                      <span className="hidden sm:block font-mono text-xs text-green-400 text-right">{q.q3Time ?? '—'}</span>
                      <span className="hidden sm:block font-mono text-xs text-gray-400 text-right">{q.gap}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Race leaderboard (for live race) */}
        {isLive && (
          <section aria-labelledby="race-positions-heading">
            <h2 id="race-positions-heading" className="text-xl font-black mb-4">
              Current Race Order — Lap {race.currentLap}
            </h2>
            <div className="f1-card overflow-hidden">
              <div className="divide-y divide-white/5">
                {MOCK_LIVE_RACE.positions.slice(0, 10).map((pos) => {
                  const driver = MOCK_DRIVERS[pos.driverId];
                  return (
                    <div key={pos.driverId} className="flex items-center gap-4 px-4 py-3 hover:bg-white/3 transition-colors">
                      <span className="w-6 font-mono font-bold text-gray-500 text-sm text-right shrink-0">{pos.position}</span>
                      <span>{driver?.flagEmoji}</span>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{driver?.name}</div>
                        <div className="text-xs text-gray-500">{driver?.team}</div>
                      </div>
                      <TyreBadge compound={pos.tyre} size="sm" />
                      <span className="font-mono text-sm text-gray-400 w-20 text-right">{pos.gapToLeader}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Upcoming placeholder */}
        {race.status === 'UPCOMING' && (
          <div className="f1-card p-12 text-center">
            <div className="text-4xl mb-4">{race.flagEmoji}</div>
            <h2 className="text-xl font-bold mb-2">Race not yet started</h2>
            <p className="text-gray-600 text-sm">
              Check back on {formatShortDate(race.startTime)} for live timing.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
