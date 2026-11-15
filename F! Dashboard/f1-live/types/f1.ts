// ============================================================
// F1 LIVE — Core Type Definitions
// Phase 1: UI Prototype (Mock Data)
// ============================================================

export type TyreCompound = 'SOFT' | 'MEDIUM' | 'HARD' | 'INTERMEDIATE' | 'WET';

export type RaceStatus =
  | 'NOT_STARTED'
  | 'FORMATION_LAP'
  | 'GREEN_FLAG'
  | 'SAFETY_CAR'
  | 'VIRTUAL_SAFETY_CAR'
  | 'RED_FLAG'
  | 'FINISHED'
  | 'CANCELLED';

export type RaceEventType =
  | 'OVERTAKE'
  | 'PIT_STOP'
  | 'FASTEST_LAP'
  | 'YELLOW_FLAG'
  | 'SAFETY_CAR'
  | 'VIRTUAL_SAFETY_CAR'
  | 'RED_FLAG'
  | 'PENALTY'
  | 'POSITION_CHANGE'
  | 'RACE_START'
  | 'RACE_FINISH'
  | 'GREEN_FLAG'
  | 'LAP';

export type DriverStatus = 'RUNNING' | 'PIT' | 'OUT' | 'DNF' | 'DSQ' | 'DNS';

export type RaceCalendarStatus = 'COMPLETED' | 'LIVE' | 'UPCOMING';

export interface Driver {
  id: string;
  name: string;
  abbreviation: string;
  number: number;
  team: string;
  teamId: string;
  nationality: string;
  dateOfBirth?: string;
  flagEmoji: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;        // Hex team color
  textColor: string;    // Contrast text color
  drivers: string[];    // Driver IDs
  nationality: string;
  base: string;
  chassis: string;
  powerUnit: string;
}

export interface Circuit {
  id: string;
  name: string;
  country: string;
  city: string;
  trackLength: number;   // km
  laps: number;
  raceDistance: number;  // km
  lapRecord: string;     // e.g. "1:21.046"
  lapRecordHolder: string;
  lapRecordYear: number;
  timezone: string;
  flagEmoji: string;
}

export interface LivePosition {
  driverId: string;
  position: number;
  previousPosition: number;
  lap: number;
  gapToLeader: string;   // e.g. "+2.431" or "LEADER" or "+1 LAP"
  gapToCarAhead: string; // e.g. "+0.342"
  tyre: TyreCompound;
  tyreAge: number;       // laps on current tyre
  pitStops: number;
  status: DriverStatus;
  fastestLap: boolean;
  currentLapTime?: string;
  bestLapTime?: string;
  sector1?: string;
  sector2?: string;
  sector3?: string;
  speed?: number;        // km/h
}

export interface PitStop {
  id: string;
  driverId: string;
  lap: number;
  stopNumber: number;
  oldTyre: TyreCompound;
  newTyre: TyreCompound;
  pitLaneTime: string;   // e.g. "22.4s"
  timestamp?: string;
}

export interface FastestLap {
  driverId: string;
  time: string;          // e.g. "1:21.442"
  lap: number;
  speed?: number;        // km/h
}

export interface RaceEvent {
  id: string;
  timestamp: string;     // Race time e.g. "42:15"
  lap: number;
  type: RaceEventType;
  description: string;
  driverId?: string;
  secondaryDriverId?: string;
}

export interface Race {
  id: string;
  season: number;
  round: number;
  name: string;          // e.g. "Italian Grand Prix"
  shortName: string;     // e.g. "Italian GP"
  circuitId: string;
  country: string;
  flagEmoji: string;
  startTime: string;     // ISO datetime
  status: RaceCalendarStatus;
  currentLap?: number;
  totalLaps?: number;
  raceStatus?: RaceStatus;
  winner?: string;       // driverId
}

export interface LiveRaceData {
  race: Race;
  circuit: Circuit;
  positions: LivePosition[];
  pitStops: PitStop[];
  fastestLap: FastestLap | null;
  events: RaceEvent[];
  weather?: WeatherData;
  lastUpdated: string;
  dataSource: 'LIVE' | 'MOCK' | 'CACHED';
}

export interface WeatherData {
  airTemp: number;       // °C
  trackTemp: number;     // °C
  humidity: number;      // %
  windSpeed: number;     // km/h
  windDirection: string; // e.g. "NW"
  rainfall: boolean;
  rainProbability: number; // %
  condition: string;     // e.g. "Partly Cloudy"
  available: boolean;
}

export interface QualifyingResult {
  driverId: string;
  position: number;
  q1Time?: string;
  q2Time?: string;
  q3Time?: string;
  bestTime: string;
  gap: string;
}

export interface RaceResult {
  driverId: string;
  position: number | null;
  laps: number;
  time: string;          // gap or total time
  points: number;
  fastestLap: boolean;
  status: DriverStatus;
  startingPosition: number;
}

export interface DriverStanding {
  position: number;
  driverId: string;
  teamId: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
}

export interface ConstructorStanding {
  position: number;
  teamId: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
}

export interface DriverSeasonStats {
  driverId: string;
  season: number;
  races: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  points: number;
  dnfs: number;
  highestFinish: number;
}

export interface DriverCareerStats {
  driverId: string;
  starts: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  championships: number;
  debutYear: number;
}
