'use client';

import { useState } from 'react';
import { MOCK_LIVE_RACE, MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { RaceHeader } from '@/components/live/RaceHeader';
import { Leaderboard } from '@/components/live/Leaderboard';
import { RaceEventFeed } from '@/components/live/RaceEventFeed';
import { FastestLapCard } from '@/components/live/FastestLapCard';
import { PitStopTracker } from '@/components/live/PitStopTracker';
import { CircuitInfoCard } from '@/components/live/CircuitInfoCard';
import { GapVisualization } from '@/components/live/GapVisualization';
import { TyreStrategy } from '@/components/live/TyreStrategy';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { VirtualTrackView } from '@/components/live/VirtualTrackView';
import { Driver } from '@/types/f1';

export default function LivePage() {
  const data = MOCK_LIVE_RACE;
  const race = data.race;
  const circuit = data.circuit;

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const team = selectedDriver ? MOCK_TEAMS[selectedDriver.teamId] : null;
  const teamColor = team ? team.color : '#e10600';

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
        {/* Interactive Virtual Track View (Feature 1) */}
        <section aria-labelledby="virtual-track-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="virtual-track-heading" className="section-header">WILTZ VIRTUAL TRACK VIEW & LIVE CAR TRACKING</h2>
            <span className="text-[11px] text-gray-400">Click any car marker or leaderboard row to focus</span>
          </div>
          <VirtualTrackView
            circuitKey="albert-park"
            selectedDriverId={selectedDriver?.id}
            onSelectDriver={(driver: Driver) => setSelectedDriver(driver)}
          />
        </section>

        {/* Selected Driver Inspection Drawer/Modal */}
        {selectedDriver && (
          <div className="bg-[#181818] border border-[#e10600]/40 rounded-xl p-4 flex items-center justify-between shadow-2xl animate-fade-in">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl font-mono text-white shadow-lg"
                style={{ backgroundColor: teamColor }}
              >
                {selectedDriver.number}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg text-white">{selectedDriver.name}</h3>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-gray-300">
                    {selectedDriver.abbreviation}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{selectedDriver.team} &bull; {selectedDriver.nationality}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedDriver(null)}
              className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              Clear Focus
            </button>
          </div>
        )}

        {/* Main leaderboard */}
        <section aria-labelledby="leaderboard-heading">
          <h2 id="leaderboard-heading" className="section-header mb-3">RACE LEADERBOARD</h2>
          <Leaderboard
            data={data}
            onSelectDriver={(driver: Driver) => setSelectedDriver(driver)}
          />
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
