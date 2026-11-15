import { MOCK_TEAMS, MOCK_DRIVERS, MOCK_CONSTRUCTOR_STANDINGS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import Link from 'next/link';

export const metadata = {
  title: 'Teams — F1 LIVE',
};

export default function TeamsPage() {
  const standings = MOCK_CONSTRUCTOR_STANDINGS;

  return (
    <>
      <MockDataBanner />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-black mb-6">2025 Teams</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {standings.map((s) => {
            const team = MOCK_TEAMS[s.teamId];
            if (!team) return null;
            const teamDrivers = team.drivers.map(id => MOCK_DRIVERS[id]).filter(Boolean);

            return (
              <Link
                key={team.id}
                href={`/teams/${team.id}`}
                className="f1-card p-5 hover:border-white/20 transition-all hover:scale-[1.01] block"
              >
                {/* Color bar + rank */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="h-1.5 w-16 rounded-full"
                    style={{ backgroundColor: team.color }}
                    aria-hidden="true"
                  />
                  <span className="text-2xl font-black text-white/10 font-mono">P{s.position}</span>
                </div>

                {/* Team name */}
                <h3 className="font-black text-xl mb-1">{team.name}</h3>
                <p className="text-xs text-gray-500 mb-4">
                  {team.base} · {team.chassis}
                </p>

                {/* Drivers */}
                <div className="flex gap-2 mb-4">
                  {teamDrivers.map(driver => (
                    driver && (
                      <div key={driver.id} className="bg-[#1a1a1a] rounded px-2 py-1.5 text-center flex-1">
                        <div>{driver.flagEmoji}</div>
                        <div className="font-bold text-xs mt-0.5">{driver.abbreviation}</div>
                        <div className="text-[9px] text-gray-600">#{driver.number}</div>
                      </div>
                    )
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
                  <div className="text-center">
                    <div className="font-black text-lg">{s.points}</div>
                    <div className="text-[9px] text-gray-600 uppercase">PTS</div>
                  </div>
                  <div className="text-center">
                    <div className="font-black text-lg">{s.wins}</div>
                    <div className="text-[9px] text-gray-600 uppercase">WINS</div>
                  </div>
                  <div className="text-center">
                    <div className="font-black text-lg">{s.podiums}</div>
                    <div className="text-[9px] text-gray-600 uppercase">PODS</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
