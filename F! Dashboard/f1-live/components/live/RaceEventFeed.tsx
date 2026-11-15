'use client';

import { RaceEvent } from '@/types/f1';
import { MOCK_DRIVERS } from '@/lib/mock-data';
import { getEventTypeBadge, getEventTypeLabel } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface RaceEventFeedProps {
  events: RaceEvent[];
  maxEvents?: number;
}

export function RaceEventFeed({ events, maxEvents }: RaceEventFeedProps) {
  const sorted = [...events].reverse(); // newest first
  const displayed = maxEvents ? sorted.slice(0, maxEvents) : sorted;

  return (
    <div className="f1-card overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
        <h2 className="section-header">RACE CONTROL</h2>
        <span className="text-[10px] text-gray-600">{events.length} events</span>
      </div>
      <div className="divide-y divide-white/5 max-h-[480px] overflow-y-auto">
        {displayed.map((event) => (
          <RaceEventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function RaceEventItem({ event }: { event: RaceEvent }) {
  const driver = event.driverId ? MOCK_DRIVERS[event.driverId] : null;
  const secondaryDriver = event.secondaryDriverId ? MOCK_DRIVERS[event.secondaryDriverId] : null;
  const badgeClass = getEventTypeBadge(event.type);

  return (
    <div className="flex gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
      {/* Time */}
      <div className="shrink-0 flex flex-col items-center gap-1 pt-0.5">
        <span className="font-mono text-xs text-gray-600">{event.timestamp}</span>
        <span className="text-[10px] text-gray-700 font-medium">L{event.lap}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${badgeClass}`}>
            {getEventTypeLabel(event.type)}
          </span>
          {driver && (
            <span className="text-xs font-semibold text-gray-300">
              {driver.flagEmoji} {driver.abbreviation}
            </span>
          )}
          {secondaryDriver && (
            <>
              <span className="text-gray-600">vs</span>
              <span className="text-xs font-semibold text-gray-300">
                {secondaryDriver.flagEmoji} {secondaryDriver.abbreviation}
              </span>
            </>
          )}
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}
