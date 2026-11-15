import { Circuit, WeatherData } from '@/types/f1';
import { MapPin, Wind, Droplets, Thermometer, Cloud } from 'lucide-react';

interface CircuitInfoCardProps {
  circuit: Circuit;
  weather?: WeatherData;
}

export function CircuitInfoCard({ circuit, weather }: CircuitInfoCardProps) {
  return (
    <div className="f1-card overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8 flex items-center gap-2">
        <MapPin size={14} className="text-gray-500" aria-hidden="true" />
        <h2 className="section-header">CIRCUIT</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Circuit name */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{circuit.flagEmoji}</span>
            <div>
              <h3 className="font-bold text-sm">{circuit.name}</h3>
              <p className="text-xs text-gray-500">{circuit.city}, {circuit.country}</p>
            </div>
          </div>
        </div>

        {/* Circuit stats */}
        <div className="grid grid-cols-2 gap-3">
          <CircuitStat label="Track Length" value={`${circuit.trackLength} km`} />
          <CircuitStat label="Race Distance" value={`${circuit.raceDistance} km`} />
          <CircuitStat label="Total Laps" value={circuit.laps.toString()} />
          <CircuitStat label="Lap Record" value={circuit.lapRecord} sub={`${circuit.lapRecordHolder} (${circuit.lapRecordYear})`} />
        </div>

        {/* Weather */}
        {weather?.available ? (
          <div>
            <div className="section-header mb-2">WEATHER</div>
            <div className="grid grid-cols-2 gap-2">
              <WeatherStat icon={<Thermometer size={12} />} label="Air Temp" value={`${weather.airTemp}°C`} />
              <WeatherStat icon={<Thermometer size={12} className="text-orange-400" />} label="Track Temp" value={`${weather.trackTemp}°C`} />
              <WeatherStat icon={<Wind size={12} />} label="Wind" value={`${weather.windSpeed} km/h ${weather.windDirection}`} />
              <WeatherStat icon={<Droplets size={12} />} label="Humidity" value={`${weather.humidity}%`} />
              <WeatherStat icon={<Cloud size={12} />} label="Condition" value={weather.condition} />
              <WeatherStat icon={<Droplets size={12} className="text-blue-400" />} label="Rain chance" value={`${weather.rainProbability}%`} />
            </div>
          </div>
        ) : (
          <div className="text-xs text-gray-600 text-center py-2 border border-white/5 rounded">
            Weather data unavailable
          </div>
        )}
      </div>
    </div>
  );
}

function CircuitStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-[#1a1a1a] rounded p-2.5">
      <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-sm font-bold font-mono">{value}</div>
      {sub && <div className="text-[10px] text-gray-600 mt-0.5 truncate">{sub}</div>}
    </div>
  );
}

function WeatherStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600 shrink-0">{icon}</span>
      <div>
        <div className="text-[10px] text-gray-600">{label}</div>
        <div className="text-xs font-semibold">{value}</div>
      </div>
    </div>
  );
}
