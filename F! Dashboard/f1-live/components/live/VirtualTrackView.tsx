'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Hash, Layers, Play, Pause } from 'lucide-react';
import { Driver } from '@/types/f1';
import { MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';

// Standardized SVG Path Geometry for F1 circuits
export const CIRCUIT_TRACK_PATHS: Record<string, { name: string; path: string; viewBox: string; startFinish: [number, number]; drsZones: string[]; sectorPoints: [number, number][] }> = {
  'albert-park': {
    name: 'Albert Park Grand Prix Circuit',
    viewBox: '0 0 600 400',
    path: 'M 140 330 C 120 330, 80 300, 90 260 C 100 220, 150 180, 160 140 C 170 100, 200 70, 250 65 C 300 60, 360 80, 420 70 C 470 60, 520 90, 530 140 C 540 190, 490 230, 460 250 C 430 270, 450 310, 410 330 C 370 350, 310 330, 270 340 C 230 350, 180 330, 140 330 Z',
    startFinish: [140, 330],
    drsZones: ['Turn 1-2 Straight', 'Lakeside Drive DRS', 'Turn 11-12 Fast Chicane'],
    sectorPoints: [[160, 140], [460, 250]],
  },
  'bahrain': {
    name: 'Bahrain International Circuit',
    viewBox: '0 0 600 400',
    path: 'M 180 340 L 480 340 C 520 340, 530 310, 500 290 L 380 250 C 350 240, 360 200, 400 190 L 490 180 C 520 180, 520 130, 470 120 L 320 110 C 280 110, 240 80, 200 85 C 160 90, 140 130, 160 170 L 190 220 C 200 240, 170 270, 150 290 C 130 310, 150 340, 180 340 Z',
    startFinish: [220, 340],
    drsZones: ['Main Straight', 'Turns 3-4 Straight', 'Turns 10-11 Back Straight'],
    sectorPoints: [[400, 190], [200, 85]],
  },
  'monza': {
    name: 'Autodromo Nazionale Monza',
    viewBox: '0 0 600 400',
    path: 'M 100 320 L 480 320 C 530 320, 550 280, 520 240 L 440 150 C 410 120, 380 90, 330 90 L 220 90 C 180 90, 150 120, 160 160 L 170 200 C 180 240, 130 270, 100 290 Z',
    startFinish: [180, 320],
    drsZones: ['Rettifilo Main Straight', 'Serraglio Straight to Ascari'],
    sectorPoints: [[440, 150], [220, 90]],
  },
  'silverstone': {
    name: 'Silverstone Circuit',
    viewBox: '0 0 600 400',
    path: 'M 160 300 C 120 270, 130 200, 180 170 C 230 140, 240 80, 300 70 C 360 60, 420 90, 450 120 C 480 150, 520 160, 530 210 C 540 260, 490 300, 440 310 C 390 320, 350 270, 300 280 C 250 290, 200 330, 160 300 Z',
    startFinish: [160, 300],
    drsZones: ['Wellington Straight', 'Hangar Straight'],
    sectorPoints: [[300, 70], [440, 310]],
  }
};

const DRIVER_LIST: Driver[] = Object.values(MOCK_DRIVERS);

interface VirtualTrackViewProps {
  circuitKey?: string;
  onSelectDriver?: (driver: Driver) => void;
  selectedDriverId?: string | null;
}

export function VirtualTrackView({
  circuitKey = 'albert-park',
  onSelectDriver,
  selectedDriverId,
}: VirtualTrackViewProps) {
  const circuit = CIRCUIT_TRACK_PATHS[circuitKey] || CIRCUIT_TRACK_PATHS['albert-park'];
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const [showDriverNumbers, setShowDriverNumbers] = useState(true);
  const [showSectors, setShowSectors] = useState(true);
  const [showDRS, setShowDRS] = useState(true);
  const [showAllDrivers, setShowAllDrivers] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);

  // Animate driver progress around the loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTrackProgress((prev) => (prev + 0.003) % 1);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Compute (x, y) coordinates for each driver along the SVG path
  const getDriverCoordinates = (index: number) => {
    if (!pathRef.current) return { x: 300, y: 200 };
    const pathLength = pathRef.current.getTotalLength();
    const offset = (trackProgress + 1 - (index * 0.038)) % 1;
    const point = pathRef.current.getPointAtLength(offset * pathLength);
    return { x: point.x, y: point.y };
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.75));
  const handleReset = () => setZoom(1);

  return (
    <div className="bg-[#141414] border border-white/10 rounded-xl overflow-hidden flex flex-col">
      {/* Top Controls Bar */}
      <div className="p-3 bg-[#111] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-white uppercase tracking-wider">Wiltz Virtual Track Control</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300 font-medium">{circuit.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Play/Pause Live Simulation */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-gray-200 rounded border border-white/10 transition"
            title={isPlaying ? 'Pause tracking' : 'Resume live tracking'}
          >
            {isPlaying ? <Pause size={14} className="text-amber-400" /> : <Play size={14} className="text-emerald-400" />}
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>

          {/* Toggle Driver Numbers */}
          <button
            onClick={() => setShowDriverNumbers(!showDriverNumbers)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded border transition ${
              showDriverNumbers ? 'bg-[#e10600]/20 border-[#e10600] text-white' : 'bg-white/5 border-white/10 text-gray-400'
            }`}
            title="Toggle driver race numbers"
          >
            <Hash size={13} />
            <span className="hidden sm:inline">Numbers</span>
          </button>

          {/* Toggle DRS Zones */}
          <button
            onClick={() => setShowDRS(!showDRS)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded border transition ${
              showDRS ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-white/5 border-white/10 text-gray-400'
            }`}
            title="Toggle DRS Zones"
          >
            <Layers size={13} />
            <span className="hidden sm:inline">DRS</span>
          </button>

          {/* Toggle All Drivers Visibility */}
          <button
            onClick={() => setShowAllDrivers(!showAllDrivers)}
            className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded border border-white/10 transition"
            title={showAllDrivers ? 'Hide all markers' : 'Show all markers'}
          >
            {showAllDrivers ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-white/5 rounded border border-white/10">
            <button onClick={handleZoomOut} className="p-1.5 hover:bg-white/10 text-gray-300 transition" title="Zoom Out">
              <ZoomOut size={14} />
            </button>
            <span className="px-2 font-mono text-[11px] text-gray-400">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="p-1.5 hover:bg-white/10 text-gray-300 transition" title="Zoom In">
              <ZoomIn size={14} />
            </button>
            <button onClick={handleReset} className="p-1.5 hover:bg-white/10 text-gray-300 border-l border-white/10 transition" title="Reset View">
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Circuit Canvas */}
      <div className="relative w-full h-[420px] bg-[#0c0c0c] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
        {/* Track Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <svg
          ref={svgRef}
          viewBox={circuit.viewBox}
          className="w-full h-full max-h-[420px] transition-transform duration-300 ease-out select-none"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Circuit Outer Glow */}
          <path
            d={circuit.path}
            fill="none"
            stroke="rgba(225, 6, 0, 0.15)"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Circuit Asphalt Foundation */}
          <path
            d={circuit.path}
            fill="none"
            stroke="#1c1c1c"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Circuit Curbs / Outer Edge */}
          <path
            d={circuit.path}
            fill="none"
            stroke="#2e2e2e"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Racing Line (Primary Track SVG reference) */}
          <path
            ref={pathRef}
            d={circuit.path}
            fill="none"
            stroke="#e10600"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            className="opacity-70"
          />

          {/* Start/Finish Line */}
          <g transform={`translate(${circuit.startFinish[0]}, ${circuit.startFinish[1]})`}>
            <rect x="-3" y="-12" width="6" height="24" fill="#ffffff" />
            <text x="8" y="4" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
              FINISH / S1
            </text>
          </g>

          {/* Sector Markers */}
          {showSectors &&
            circuit.sectorPoints.map((pt, i) => (
              <g key={i} transform={`translate(${pt[0]}, ${pt[1]})`}>
                <circle r="4" fill="#f59e0b" />
                <text x="7" y="3" fill="#f59e0b" fontSize="8" fontWeight="bold">
                  S{i + 2}
                </text>
              </g>
            ))}

          {/* Live Driver Position Markers */}
          {showAllDrivers &&
            DRIVER_LIST.map((driver, idx) => {
              const coords = getDriverCoordinates(idx);
              const isSelected = selectedDriverId === driver.id;
              const isLeader = idx === 0;
              const team = MOCK_TEAMS[driver.teamId];
              const teamColor = team ? team.color : '#e10600';

              return (
                <g
                  key={driver.id}
                  transform={`translate(${coords.x}, ${coords.y})`}
                  onClick={() => onSelectDriver?.(driver)}
                  className="cursor-pointer transition-transform duration-100 hover:scale-125"
                >
                  {/* Outer pulse for leader or selected */}
                  {(isSelected || isLeader) && (
                    <circle
                      r="14"
                      fill={isLeader ? 'rgba(250, 204, 21, 0.25)' : 'rgba(225, 6, 0, 0.3)'}
                      className="animate-ping"
                    />
                  )}

                  {/* Driver Pin Circle */}
                  <circle
                    r={isSelected ? 10 : 8}
                    fill={teamColor}
                    stroke={isSelected ? '#ffffff' : isLeader ? '#facc15' : '#111111'}
                    strokeWidth={isSelected ? 2.5 : isLeader ? 2 : 1.5}
                  />

                  {/* Driver Number or Abbreviation */}
                  <text
                    textAnchor="middle"
                    dy="3"
                    fill="#ffffff"
                    fontSize={isSelected ? '9' : '8'}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {showDriverNumbers ? driver.number : driver.abbreviation}
                  </text>
                </g>
              );
            })}
        </svg>

        {/* Legend Box */}
        <div className="absolute bottom-3 left-3 bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-lg p-2.5 text-[11px] flex flex-col gap-1.5 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-white" />
            <span className="text-gray-300 font-semibold">P1 Race Leader</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-gray-400">Start / Finish Line</span>
          </div>
          {showDRS && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-emerald-500" />
              <span className="text-emerald-400 font-medium">{circuit.drsZones.length} DRS Zones</span>
            </div>
          )}
        </div>

        {/* Track stats pill */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg text-right">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Active Circuit</div>
          <div className="text-xs font-bold text-white">{circuit.name}</div>
        </div>
      </div>
    </div>
  );
}
