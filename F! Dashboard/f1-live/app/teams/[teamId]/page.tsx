import { notFound } from 'next/navigation';
import { MOCK_TEAMS, MOCK_DRIVERS, MOCK_CONSTRUCTOR_STANDINGS, MOCK_DRIVER_STANDINGS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface TeamPageProps {
  params: Promise<{ teamId: string }>;
}

export async function generateStaticParams() {
  return Object.keys(MOCK_TEAMS).map(id => ({ teamId: id }));
}

export async function generateMetadata({ params }: TeamPageProps) {
  const { teamId } = await params;
  const team = MOCK_TEAMS[teamId.toUpperCase()];
  return { title: team ? `${team.name} — F1 LIVE` : 'Team — F1 LIVE' };
}

export default async function TeamProfilePage({ params }: TeamPageProps) {
  const { teamId } = await params;
  const team = MOCK_TEAMS[teamId.toUpperCase()];
  if (!team) notFound();

  const standing = MOCK_CONSTRUCTOR_STANDINGS.find(s => s.teamId === team.id);
  const teamDrivers = team.drivers.map(id => MOCK_DRIVERS[id]).filter(Boolean);

  return (
    <>
      <MockDataBanner />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/teams" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={14} />
          All Teams
        </Link>

        {/* Hero */}
        <div className="f1-card overflow-hidden mb-6" style={{ borderTopColor: team.color, borderTopWidth: 3 }}>
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl font-black">{team.name}</h1>
                <p className="text-sm text-gray-500 mt-1">{team.base}</p>
              </div>
              {standing && (
                <div className="text-right">
                  <div className="text-4xl font-black">P{standing.position}</div>
                  <div className="text-gray-600 text-xs mt-0.5">Constructor Championship</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <InfoCell label="Chassis" value={team.chassis} />
              <InfoCell label="Power Unit" value={team.powerUnit} />
              <InfoCell label="Base" value={team.base} />
              <InfoCell label="Nationality" value={team.nationality} />
            </div>
          </div>
        </div>

        {/* Drivers */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {teamDrivers.map(driver => {
            if (!driver) return null;
            const dStanding = MOCK_DRIVER_STANDINGS.find(s => s.driverId === driver.id);
            return (
              <Link key={driver.id} href={`/drivers/${driver.id}`} className="f1-card p-4 hover:border-white/20 transition-colors block">
                <div className="flex items-center gap-3">
                  <div className="font-black text-3xl text-white/10 font-mono">{driver.number}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span>{driver.flagEmoji}</span>
                      <span className="font-bold">{driver.name}</span>
                    </div>
                    <div className="text-xs text-gray-500">{driver.nationality}</div>
                  </div>
                  {dStanding && (
                    <div className="text-right">
                      <div className="font-black text-xl">{dStanding.points}</div>
                      <div className="text-[10px] text-gray-600">PTS · P{dStanding.position}</div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Constructor stats */}
        {standing && (
          <div className="f1-card p-5">
            <h2 className="section-header mb-4">2025 CONSTRUCTOR RESULTS</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'POINTS', value: standing.points.toString() },
                { label: 'WINS', value: standing.wins.toString() },
                { label: 'PODIUMS', value: standing.podiums.toString() },
                { label: 'POLES', value: standing.poles.toString() },
              ].map(({ label, value }) => (
                <div key={label} className="text-center bg-[#1a1a1a] rounded p-4">
                  <div className="text-2xl font-black">{value}</div>
                  <div className="text-[9px] text-gray-600 uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1a1a1a] rounded p-3">
      <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
