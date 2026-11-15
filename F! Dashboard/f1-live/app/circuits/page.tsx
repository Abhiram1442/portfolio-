import { MOCK_CIRCUITS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { MapPin } from 'lucide-react';

export const metadata = {
  title: 'Circuits — F1 LIVE',
};

export default function CircuitsPage() {
  const circuits = Object.values(MOCK_CIRCUITS);

  return (
    <>
      <MockDataBanner />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-black mb-6">Circuits</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {circuits.map((circuit) => (
            <div key={circuit.id} className="f1-card p-5">
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={16} className="text-gray-600 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span>{circuit.flagEmoji}</span>
                    <span className="text-xs text-gray-500">{circuit.country}</span>
                  </div>
                  <h3 className="font-bold text-sm leading-tight">{circuit.name}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{circuit.city}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Track Length', value: `${circuit.trackLength} km` },
                  { label: 'Laps', value: circuit.laps.toString() },
                  { label: 'Race Distance', value: `${circuit.raceDistance} km` },
                  { label: 'Lap Record', value: circuit.lapRecord },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#1a1a1a] rounded p-2">
                    <div className="text-[9px] text-gray-600 uppercase tracking-wider">{label}</div>
                    <div className="text-sm font-bold font-mono mt-0.5">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-xs text-gray-600">
                Record: {circuit.lapRecordHolder} ({circuit.lapRecordYear})
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
