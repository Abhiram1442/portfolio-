import { MOCK_CALENDAR, MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import Link from 'next/link';
import { formatShortDate } from '@/lib/utils';

export const metadata = {
  title: 'Results — F1 LIVE',
};

export default function ResultsPage() {
  const completed = MOCK_CALENDAR.filter(r => r.status === 'COMPLETED').reverse();

  return (
    <>
      <MockDataBanner />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-black mb-6">2025 Race Results</h1>

        <div className="space-y-3">
          {completed.map((race) => {
            const winner = race.winner ? MOCK_DRIVERS[race.winner] : null;
            const winnerTeam = winner ? MOCK_TEAMS[winner.teamId] : null;

            return (
              <Link
                key={race.id}
                href={`/races/${race.id}`}
                className="f1-card p-4 flex items-center gap-4 hover:border-white/20 transition-colors block"
              >
                {/* Round */}
                <span className="text-xs font-bold text-gray-600 bg-white/5 px-2 py-1 rounded w-10 text-center shrink-0">
                  R{race.round}
                </span>

                {/* Flag + name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-2xl shrink-0">{race.flagEmoji}</span>
                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate">{race.name}</div>
                    <div className="text-xs text-gray-500">{formatShortDate(race.startTime)}</div>
                  </div>
                </div>

                {/* Winner */}
                {winner && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-yellow-400">🏆</span>
                    <div className="text-right">
                      <div className="font-bold text-sm">{winner.abbreviation}</div>
                      <div className="text-xs text-right" style={{ color: winnerTeam?.color }}>
                        {winnerTeam?.shortName}
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
