import { MOCK_LIVE_RACE } from '@/lib/mock-data';
import { RaceHeader } from '@/components/live/RaceHeader';
import { Leaderboard } from '@/components/live/Leaderboard';
import { RaceEventFeed } from '@/components/live/RaceEventFeed';
import { FastestLapCard } from '@/components/live/FastestLapCard';
import { PitStopTracker } from '@/components/live/PitStopTracker';
import { CircuitInfoCard } from '@/components/live/CircuitInfoCard';
import { GapVisualization } from '@/components/live/GapVisualization';
import { TyreStrategy } from '@/components/live/TyreStrategy';
import { MockDataBanner } from '@/components/ui/MockDataBanner';

export const metadata = {
  title: 'Live Race — F1 LIVE',
  description: 'Live Formula 1 race leaderboard, lap times and events',
};

export default function LivePage() {
  const data = MOCK_LIVE_RACE;
  const race = data.race;
  const circuit = data.circuit;

  return (
    <>
      <MockDataBanner />

      {/* Race header */}
      <RaceHeader
        raceName={race.name}
        circuitName={circuit.name}
        country={race.country}
        currentLap={race.currentLap ?? 0}
        totalLaps={race.totalLaps ?? 53}
        raceStatus={race.raceStatus ?? 'GREEN_FLAG'}
        lastUpdated={data.lastUpdated}
        dataSource={data.dataSource}
      />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Main leaderboard */}
        <section aria-labelledby="leaderboard-heading">
          <h2 id="leaderboard-heading" className="section-header mb-3">RACE LEADERBOARD</h2>
          <Leaderboard data={data} />
        </section>

        {/* Middle row: events + gap viz */}
        <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6">
          {/* Race events */}
          <section aria-labelledby="events-heading">
            <h2 id="events-heading" className="section-header mb-3">LIVE EVENTS</h2>
            <RaceEventFeed events={data.events} />
          </section>

          {/* Gap visualization */}
          <section aria-labelledby="gap-heading">
            <h2 id="gap-heading" className="section-header mb-3">GAP CHART</h2>
            <GapVisualization positions={data.positions} maxDrivers={12} />
          </section>
        </div>

        {/* Bottom row: fastest lap + pits + tyre + circuit */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <section aria-labelledby="fl-heading">
            <h2 id="fl-heading" className="sr-only">Fastest Lap</h2>
            {data.fastestLap && <FastestLapCard fastestLap={data.fastestLap} />}
          </section>

          <section aria-labelledby="pits-heading">
            <h2 id="pits-heading" className="sr-only">Pit Stops</h2>
            <PitStopTracker pitStops={data.pitStops} />
          </section>

          <section aria-labelledby="tyre-heading">
            <h2 id="tyre-heading" className="sr-only">Tyre Strategy</h2>
            <TyreStrategy positions={data.positions} />
          </section>

          <section aria-labelledby="circuit-heading">
            <h2 id="circuit-heading" className="sr-only">Circuit Information</h2>
            <CircuitInfoCard circuit={circuit} weather={data.weather} />
          </section>
        </div>
      </div>
    </>
  );
}
