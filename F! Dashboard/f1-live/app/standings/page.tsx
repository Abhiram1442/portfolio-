import { MOCK_DRIVER_STANDINGS, MOCK_CONSTRUCTOR_STANDINGS, MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import Link from 'next/link';

export const metadata = {
  title: 'Standings — F1 LIVE',
};

export default function StandingsPage() {
  return (
    <>
      <MockDataBanner />
      <div className="container mx-auto px-4 py-8 space-y-10">

        {/* Driver Championship */}
        <section aria-labelledby="driver-champ-heading">
          <h1 id="driver-champ-heading" className="text-2xl font-black mb-6">
            2025 Driver Championship
          </h1>
          <div className="f1-card overflow-hidden">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-[2.5rem_1fr_7rem_5rem_4rem_4rem_4rem_4rem] gap-2 px-4 py-2 border-b border-white/8">
              {['POS', 'DRIVER', 'TEAM', 'POINTS', 'WINS', 'PODS', 'POLES', 'FL'].map(h => (
                <span key={h} className="section-header text-right first:text-left">{h}</span>
              ))}
            </div>
            <div className="divide-y divide-white/5">
              {MOCK_DRIVER_STANDINGS.map((s) => {
                const driver = MOCK_DRIVERS[s.driverId];
                const team = MOCK_TEAMS[s.teamId];
                if (!driver) return null;
                const isChampion = s.position === 1;
                return (
                  <div
                    key={s.driverId}
                    className={`flex sm:grid grid-cols-[2.5rem_1fr_7rem_5rem_4rem_4rem_4rem_4rem] gap-2 items-center px-4 py-3 hover:bg-white/3 transition-colors ${isChampion ? 'bg-yellow-400/5' : ''}`}
                  >
                    {/* POS */}
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-0.5 h-8 rounded-full shrink-0"
                        style={{ backgroundColor: team?.color ?? '#444' }}
                        aria-hidden="true"
                      />
                      <span className={`font-mono font-bold text-sm ${isChampion ? 'text-yellow-400' : 'text-gray-500'}`}>
                        {s.position}
                      </span>
                    </div>

                    {/* DRIVER */}
                    <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-none">
                      <span>{driver.flagEmoji}</span>
                      <div>
                        <Link href={`/drivers/${driver.id}`} className="font-bold text-sm hover:text-[#e10600] transition-colors">
                          {driver.name}
                        </Link>
                        <div className="text-xs text-gray-500 sm:hidden">{team?.shortName}</div>
                      </div>
                    </div>

                    {/* TEAM — desktop only */}
                    <span className="hidden sm:block text-xs text-gray-500 text-right">{team?.shortName}</span>

                    {/* Stats */}
                    <span className="font-black text-base font-mono text-right">{s.points}</span>
                    <span className="hidden sm:block font-mono text-sm text-gray-400 text-right">{s.wins}</span>
                    <span className="hidden sm:block font-mono text-sm text-gray-400 text-right">{s.podiums}</span>
                    <span className="hidden sm:block font-mono text-sm text-gray-400 text-right">{s.poles}</span>
                    <span className="hidden sm:block font-mono text-sm text-gray-400 text-right">{s.fastestLaps}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Constructor Championship */}
        <section aria-labelledby="constructor-champ-heading">
          <h2 id="constructor-champ-heading" className="text-2xl font-black mb-6">
            2025 Constructor Championship
          </h2>
          <div className="f1-card overflow-hidden">
            <div className="hidden sm:grid grid-cols-[2.5rem_1fr_5rem_4rem_4rem_4rem] gap-2 px-4 py-2 border-b border-white/8">
              {['POS', 'TEAM', 'POINTS', 'WINS', 'PODS', 'POLES'].map(h => (
                <span key={h} className="section-header text-right first:text-left">{h}</span>
              ))}
            </div>
            <div className="divide-y divide-white/5">
              {MOCK_CONSTRUCTOR_STANDINGS.map((s) => {
                const team = MOCK_TEAMS[s.teamId];
                if (!team) return null;
                const isChampion = s.position === 1;
                return (
                  <div
                    key={s.teamId}
                    className={`flex sm:grid grid-cols-[2.5rem_1fr_5rem_4rem_4rem_4rem] gap-2 items-center px-4 py-4 hover:bg-white/3 transition-colors ${isChampion ? 'bg-yellow-400/5' : ''}`}
                  >
                    {/* POS */}
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-0.5 h-8 rounded-full shrink-0"
                        style={{ backgroundColor: team.color }}
                        aria-hidden="true"
                      />
                      <span className={`font-mono font-bold text-sm ${isChampion ? 'text-yellow-400' : 'text-gray-500'}`}>
                        {s.position}
                      </span>
                    </div>

                    {/* TEAM */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/teams/${team.id}`} className="font-bold hover:text-[#e10600] transition-colors">
                        {team.name}
                      </Link>
                      <div className="text-xs text-gray-500">
                        {team.drivers.map(d => MOCK_DRIVERS[d]?.abbreviation).filter(Boolean).join(' · ')}
                      </div>
                    </div>

                    <span className="font-black text-base font-mono text-right">{s.points}</span>
                    <span className="hidden sm:block font-mono text-sm text-gray-400 text-right">{s.wins}</span>
                    <span className="hidden sm:block font-mono text-sm text-gray-400 text-right">{s.podiums}</span>
                    <span className="hidden sm:block font-mono text-sm text-gray-400 text-right">{s.poles}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
