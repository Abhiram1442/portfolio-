import { MOCK_DRIVERS, MOCK_TEAMS, MOCK_DRIVER_STANDINGS, MOCK_CAREER_STATS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import Link from 'next/link';

export const metadata = {
  title: 'Drivers — F1 LIVE',
};

export default function DriversPage() {
  const standings = MOCK_DRIVER_STANDINGS;

  return (
    <>
      <MockDataBanner />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-black mb-6">2025 Drivers</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {standings.map((s) => {
            const driver = MOCK_DRIVERS[s.driverId];
            const team = MOCK_TEAMS[s.teamId];
            const career = MOCK_CAREER_STATS[s.driverId];
            if (!driver) return null;

            return (
              <Link
                key={driver.id}
                href={`/drivers/${driver.id}`}
                className="f1-card p-4 hover:border-white/20 transition-all hover:scale-[1.01] block"
              >
                {/* Team color stripe + number */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="h-1 w-12 rounded-full"
                    style={{ backgroundColor: team?.color ?? '#444' }}
                    aria-hidden="true"
                  />
                  <span className="font-black text-3xl text-white/10 font-mono leading-none">
                    {driver.number}
                  </span>
                </div>

                {/* Name */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span>{driver.flagEmoji}</span>
                    <span className="text-xs text-gray-500">{driver.nationality}</span>
                  </div>
                  <h3 className="font-black text-lg leading-tight">{driver.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: team?.color }}>{team?.name}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
                  <div className="text-center">
                    <div className="font-black text-base">{s.points}</div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-wider">PTS</div>
                  </div>
                  <div className="text-center">
                    <div className="font-black text-base">{s.wins}</div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-wider">WINS</div>
                  </div>
                  <div className="text-center">
                    <div className="font-black text-base">P{s.position}</div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-wider">RANK</div>
                  </div>
                </div>

                {/* Career note */}
                {career && (
                  <div className="mt-2 text-[10px] text-gray-600">
                    {career.wins} career wins · {career.championships} WDC{career.championships !== 1 ? 's' : ''}
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
