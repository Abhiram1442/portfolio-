import { notFound } from 'next/navigation';
import { MOCK_DRIVERS, MOCK_TEAMS, MOCK_DRIVER_STANDINGS, MOCK_CAREER_STATS, MOCK_SEASON_STATS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import Link from 'next/link';
import { ArrowLeft, Trophy, Zap } from 'lucide-react';

interface DriverPageProps {
  params: Promise<{ driverId: string }>;
}

export async function generateStaticParams() {
  return Object.keys(MOCK_DRIVERS).map(id => ({ driverId: id }));
}

export async function generateMetadata({ params }: DriverPageProps) {
  const { driverId } = await params;
  const driver = MOCK_DRIVERS[driverId.toUpperCase()];
  return { title: driver ? `${driver.name} — F1 LIVE` : 'Driver — F1 LIVE' };
}

export default async function DriverProfilePage({ params }: DriverPageProps) {
  const { driverId } = await params;
  const driver = MOCK_DRIVERS[driverId.toUpperCase()];
  if (!driver) notFound();

  const team = MOCK_TEAMS[driver.teamId];
  const standing = MOCK_DRIVER_STANDINGS.find(s => s.driverId === driver.id);
  const career = MOCK_CAREER_STATS[driver.id];
  const season = MOCK_SEASON_STATS[driver.id];

  return (
    <>
      <MockDataBanner />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back */}
        <Link href="/drivers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={14} />
          All Drivers
        </Link>

        {/* Hero */}
        <div
          className="relative f1-card overflow-hidden mb-6"
          style={{ borderLeftColor: team?.color, borderLeftWidth: 3 }}
        >
          <div className="p-6 flex items-start gap-6 flex-wrap">
            {/* Big number */}
            <div className="font-black text-[5rem] sm:text-[8rem] text-white/5 font-mono leading-none shrink-0">
              {driver.number}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-3xl">{driver.flagEmoji}</span>
                <span className="text-xs text-gray-500">{driver.nationality}</span>
                {driver.dateOfBirth && (
                  <span className="text-xs text-gray-600">b. {driver.dateOfBirth}</span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black">{driver.name}</h1>
              <p className="text-lg mt-1" style={{ color: team?.color }}>{team?.name}</p>
              <p className="text-sm text-gray-500 mt-1">{team?.chassis} · {team?.powerUnit}</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* 2025 Season */}
          {standing && (
            <div className="f1-card p-5">
              <h2 className="section-header mb-4">2025 SEASON</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'POSITION', value: `P${standing.position}`, accent: true },
                  { label: 'POINTS', value: standing.points.toString() },
                  { label: 'WINS', value: standing.wins.toString() },
                  { label: 'PODIUMS', value: standing.podiums.toString() },
                  { label: 'POLES', value: standing.poles.toString() },
                  { label: 'FASTEST LAPS', value: standing.fastestLaps.toString() },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="text-center bg-[#1a1a1a] rounded p-3">
                    <div className={`text-xl font-black ${accent ? 'text-[#e10600]' : ''}`}>{value}</div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-wider mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career */}
          {career && (
            <div className="f1-card p-5">
              <h2 className="section-header mb-4">CAREER STATISTICS</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'STARTS', value: career.starts.toString() },
                  { label: 'WINS', value: career.wins.toString() },
                  { label: 'PODIUMS', value: career.podiums.toString() },
                  { label: 'POLES', value: career.poles.toString() },
                  { label: 'FASTEST LAPS', value: career.fastestLaps.toString() },
                  { label: 'CHAMPIONSHIPS', value: career.championships.toString(), accent: career.championships > 0 },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="text-center bg-[#1a1a1a] rounded p-3">
                    <div className={`text-xl font-black ${accent ? 'text-yellow-400' : ''}`}>{value}</div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-wider mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-600 text-center">Debut: {career.debutYear}</div>
            </div>
          )}
        </div>

        {/* No stats note */}
        {!career && !standing && (
          <div className="f1-card p-8 text-center text-gray-600">
            <p>Full statistics for this driver are not available in the Phase 1 prototype.</p>
          </div>
        )}
      </div>
    </>
  );
}
