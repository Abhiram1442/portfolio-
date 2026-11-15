// ============================================================
// F1 LIVE — Mock Data
// Phase 1: Clearly labelled as MOCK / DEMO data
// ============================================================

import {
  Driver,
  Team,
  Circuit,
  LiveRaceData,
  Race,
  LivePosition,
  PitStop,
  FastestLap,
  RaceEvent,
  QualifyingResult,
  RaceResult,
  DriverStanding,
  ConstructorStanding,
  DriverCareerStats,
  DriverSeasonStats,
} from '@/types/f1';

// ------------------------------------------------------------------
// DRIVERS
// ------------------------------------------------------------------
export const MOCK_DRIVERS: Record<string, Driver> = {
  VER: {
    id: 'VER', name: 'Max Verstappen', abbreviation: 'VER', number: 1,
    team: 'Red Bull Racing', teamId: 'RBR', nationality: 'Dutch', flagEmoji: '🇳🇱',
    dateOfBirth: '1997-09-30',
  },
  NOR: {
    id: 'NOR', name: 'Lando Norris', abbreviation: 'NOR', number: 4,
    team: 'McLaren', teamId: 'MCL', nationality: 'British', flagEmoji: '🇬🇧',
    dateOfBirth: '1999-11-13',
  },
  LEC: {
    id: 'LEC', name: 'Charles Leclerc', abbreviation: 'LEC', number: 16,
    team: 'Ferrari', teamId: 'FER', nationality: 'Monégasque', flagEmoji: '🇲🇨',
    dateOfBirth: '1997-10-16',
  },
  HAM: {
    id: 'HAM', name: 'Lewis Hamilton', abbreviation: 'HAM', number: 44,
    team: 'Ferrari', teamId: 'FER', nationality: 'British', flagEmoji: '🇬🇧',
    dateOfBirth: '1985-01-07',
  },
  RUS: {
    id: 'RUS', name: 'George Russell', abbreviation: 'RUS', number: 63,
    team: 'Mercedes', teamId: 'MER', nationality: 'British', flagEmoji: '🇬🇧',
    dateOfBirth: '1998-02-15',
  },
  SAI: {
    id: 'SAI', name: 'Carlos Sainz', abbreviation: 'SAI', number: 55,
    team: 'Williams', teamId: 'WIL', nationality: 'Spanish', flagEmoji: '🇪🇸',
    dateOfBirth: '1994-09-01',
  },
  PIA: {
    id: 'PIA', name: 'Oscar Piastri', abbreviation: 'PIA', number: 81,
    team: 'McLaren', teamId: 'MCL', nationality: 'Australian', flagEmoji: '🇦🇺',
    dateOfBirth: '2001-04-06',
  },
  ALO: {
    id: 'ALO', name: 'Fernando Alonso', abbreviation: 'ALO', number: 14,
    team: 'Aston Martin', teamId: 'AMR', nationality: 'Spanish', flagEmoji: '🇪🇸',
    dateOfBirth: '1981-07-29',
  },
  STR: {
    id: 'STR', name: 'Lance Stroll', abbreviation: 'STR', number: 18,
    team: 'Aston Martin', teamId: 'AMR', nationality: 'Canadian', flagEmoji: '🇨🇦',
    dateOfBirth: '1998-10-29',
  },
  PER: {
    id: 'PER', name: 'Sergio Perez', abbreviation: 'PER', number: 11,
    team: 'Red Bull Racing', teamId: 'RBR', nationality: 'Mexican', flagEmoji: '🇲🇽',
    dateOfBirth: '1990-01-26',
  },
  BOT: {
    id: 'BOT', name: 'Valtteri Bottas', abbreviation: 'BOT', number: 77,
    team: 'Sauber', teamId: 'SAU', nationality: 'Finnish', flagEmoji: '🇫🇮',
    dateOfBirth: '1989-08-28',
  },
  HUL: {
    id: 'HUL', name: 'Nico Hülkenberg', abbreviation: 'HUL', number: 27,
    team: 'Haas', teamId: 'HAS', nationality: 'German', flagEmoji: '🇩🇪',
    dateOfBirth: '1987-08-19',
  },
  GAS: {
    id: 'GAS', name: 'Pierre Gasly', abbreviation: 'GAS', number: 10,
    team: 'Alpine', teamId: 'ALP', nationality: 'French', flagEmoji: '🇫🇷',
    dateOfBirth: '1996-02-07',
  },
  OCO: {
    id: 'OCO', name: 'Esteban Ocon', abbreviation: 'OCO', number: 31,
    team: 'Haas', teamId: 'HAS', nationality: 'French', flagEmoji: '🇫🇷',
    dateOfBirth: '1996-09-17',
  },
  TSU: {
    id: 'TSU', name: 'Yuki Tsunoda', abbreviation: 'TSU', number: 22,
    team: 'Red Bull Racing', teamId: 'RBR', nationality: 'Japanese', flagEmoji: '🇯🇵',
    dateOfBirth: '2000-05-11',
  },
  LAW: {
    id: 'LAW', name: 'Liam Lawson', abbreviation: 'LAW', number: 30,
    team: 'Racing Bulls', teamId: 'RBU', nationality: 'New Zealander', flagEmoji: '🇳🇿',
    dateOfBirth: '2002-02-11',
  },
  BEA: {
    id: 'BEA', name: 'Oliver Bearman', abbreviation: 'BEA', number: 87,
    team: 'Haas', teamId: 'HAS', nationality: 'British', flagEmoji: '🇬🇧',
    dateOfBirth: '2005-05-08',
  },
  ANT: {
    id: 'ANT', name: 'Kimi Antonelli', abbreviation: 'ANT', number: 12,
    team: 'Mercedes', teamId: 'MER', nationality: 'Italian', flagEmoji: '🇮🇹',
    dateOfBirth: '2006-08-25',
  },
  DOO: {
    id: 'DOO', name: 'Jack Doohan', abbreviation: 'DOO', number: 7,
    team: 'Alpine', teamId: 'ALP', nationality: 'Australian', flagEmoji: '🇦🇺',
    dateOfBirth: '2003-01-20',
  },
  COL: {
    id: 'COL', name: 'Franco Colapinto', abbreviation: 'COL', number: 43,
    team: 'Williams', teamId: 'WIL', nationality: 'Argentine', flagEmoji: '🇦🇷',
    dateOfBirth: '2003-05-27',
  },
};

// ------------------------------------------------------------------
// TEAMS
// ------------------------------------------------------------------
export const MOCK_TEAMS: Record<string, Team> = {
  RBR: { id: 'RBR', name: 'Red Bull Racing', shortName: 'Red Bull', color: '#3671C6', textColor: '#ffffff', drivers: ['VER', 'TSU'], nationality: 'Austrian', base: 'Milton Keynes, UK', chassis: 'RB21', powerUnit: 'Honda RBPT' },
  MCL: { id: 'MCL', name: 'McLaren', shortName: 'McLaren', color: '#FF8000', textColor: '#ffffff', drivers: ['NOR', 'PIA'], nationality: 'British', base: 'Woking, UK', chassis: 'MCL39', powerUnit: 'Mercedes' },
  FER: { id: 'FER', name: 'Ferrari', shortName: 'Ferrari', color: '#E8002D', textColor: '#ffffff', drivers: ['LEC', 'HAM'], nationality: 'Italian', base: 'Maranello, Italy', chassis: 'SF-25', powerUnit: 'Ferrari' },
  MER: { id: 'MER', name: 'Mercedes', shortName: 'Mercedes', color: '#27F4D2', textColor: '#000000', drivers: ['RUS', 'ANT'], nationality: 'German', base: 'Brackley, UK', chassis: 'W16', powerUnit: 'Mercedes' },
  AMR: { id: 'AMR', name: 'Aston Martin', shortName: 'Aston Martin', color: '#229971', textColor: '#ffffff', drivers: ['ALO', 'STR'], nationality: 'British', base: 'Silverstone, UK', chassis: 'AMR25', powerUnit: 'Mercedes' },
  WIL: { id: 'WIL', name: 'Williams', shortName: 'Williams', color: '#64C4FF', textColor: '#000000', drivers: ['SAI', 'COL'], nationality: 'British', base: 'Grove, UK', chassis: 'FW47', powerUnit: 'Mercedes' },
  ALP: { id: 'ALP', name: 'Alpine', shortName: 'Alpine', color: '#0093CC', textColor: '#ffffff', drivers: ['GAS', 'DOO'], nationality: 'French', base: 'Enstone, UK', chassis: 'A525', powerUnit: 'Renault' },
  HAS: { id: 'HAS', name: 'Haas', shortName: 'Haas', color: '#B6BABD', textColor: '#000000', drivers: ['HUL', 'BEA'], nationality: 'American', base: 'Kannapolis, USA', chassis: 'VF-25', powerUnit: 'Ferrari' },
  RBU: { id: 'RBU', name: 'Racing Bulls', shortName: 'Racing Bulls', color: '#6692FF', textColor: '#ffffff', drivers: ['LAW', 'COL'], nationality: 'Italian', base: 'Faenza, Italy', chassis: 'VCARB 02', powerUnit: 'Honda RBPT' },
  SAU: { id: 'SAU', name: 'Sauber', shortName: 'Sauber', color: '#52E252', textColor: '#000000', drivers: ['BOT', 'ANT'], nationality: 'Swiss', base: 'Hinwil, Switzerland', chassis: 'C45', powerUnit: 'Ferrari' },
};

// ------------------------------------------------------------------
// CIRCUITS
// ------------------------------------------------------------------
export const MOCK_CIRCUITS: Record<string, Circuit> = {
  monza: {
    id: 'monza', name: 'Autodromo Nazionale Monza', country: 'Italy', city: 'Monza',
    trackLength: 5.793, laps: 53, raceDistance: 306.720,
    lapRecord: '1:21.046', lapRecordHolder: 'Rubens Barrichello', lapRecordYear: 2004,
    timezone: 'Europe/Rome', flagEmoji: '🇮🇹',
  },
  silverstone: {
    id: 'silverstone', name: 'Silverstone Circuit', country: 'Great Britain', city: 'Silverstone',
    trackLength: 5.891, laps: 52, raceDistance: 306.198,
    lapRecord: '1:27.097', lapRecordHolder: 'Max Verstappen', lapRecordYear: 2020,
    timezone: 'Europe/London', flagEmoji: '🇬🇧',
  },
  spa: {
    id: 'spa', name: 'Circuit de Spa-Francorchamps', country: 'Belgium', city: 'Stavelot',
    trackLength: 7.004, laps: 44, raceDistance: 308.052,
    lapRecord: '1:46.286', lapRecordHolder: 'Valtteri Bottas', lapRecordYear: 2018,
    timezone: 'Europe/Brussels', flagEmoji: '🇧🇪',
  },
  suzuka: {
    id: 'suzuka', name: 'Suzuka International Racing Course', country: 'Japan', city: 'Suzuka',
    trackLength: 5.807, laps: 53, raceDistance: 307.471,
    lapRecord: '1:30.983', lapRecordHolder: 'Lewis Hamilton', lapRecordYear: 2019,
    timezone: 'Asia/Tokyo', flagEmoji: '🇯🇵',
  },
  singapore: {
    id: 'singapore', name: 'Marina Bay Street Circuit', country: 'Singapore', city: 'Singapore',
    trackLength: 4.940, laps: 62, raceDistance: 306.143,
    lapRecord: '1:35.867', lapRecordHolder: 'Lewis Hamilton', lapRecordYear: 2023,
    timezone: 'Asia/Singapore', flagEmoji: '🇸🇬',
  },
};

// ------------------------------------------------------------------
// RACE CALENDAR 2025
// ------------------------------------------------------------------
export const MOCK_CALENDAR: Race[] = [
  { id: 'aus-2025', season: 2025, round: 1, name: 'Australian Grand Prix', shortName: 'Australian GP', circuitId: 'albert_park', country: 'Australia', flagEmoji: '🇦🇺', startTime: '2025-03-16T05:00:00Z', status: 'COMPLETED', winner: 'NOR' },
  { id: 'chn-2025', season: 2025, round: 2, name: 'Chinese Grand Prix', shortName: 'Chinese GP', circuitId: 'shanghai', country: 'China', flagEmoji: '🇨🇳', startTime: '2025-03-23T07:00:00Z', status: 'COMPLETED', winner: 'NOR' },
  { id: 'jpn-2025', season: 2025, round: 3, name: 'Japanese Grand Prix', shortName: 'Japanese GP', circuitId: 'suzuka', country: 'Japan', flagEmoji: '🇯🇵', startTime: '2025-04-06T05:00:00Z', status: 'COMPLETED', winner: 'VER' },
  { id: 'bhr-2025', season: 2025, round: 4, name: 'Bahrain Grand Prix', shortName: 'Bahrain GP', circuitId: 'bahrain', country: 'Bahrain', flagEmoji: '🇧🇭', startTime: '2025-04-13T15:00:00Z', status: 'COMPLETED', winner: 'NOR' },
  { id: 'sau-2025', season: 2025, round: 5, name: 'Saudi Arabian Grand Prix', shortName: 'Saudi GP', circuitId: 'jeddah', country: 'Saudi Arabia', flagEmoji: '🇸🇦', startTime: '2025-04-20T17:00:00Z', status: 'COMPLETED', winner: 'RUS' },
  { id: 'mia-2025', season: 2025, round: 6, name: 'Miami Grand Prix', shortName: 'Miami GP', circuitId: 'miami', country: 'USA', flagEmoji: '🇺🇸', startTime: '2025-05-04T20:00:00Z', status: 'COMPLETED', winner: 'VER' },
  { id: 'emi-2025', season: 2025, round: 7, name: 'Emilia Romagna Grand Prix', shortName: 'Emilia Romagna GP', circuitId: 'imola', country: 'Italy', flagEmoji: '🇮🇹', startTime: '2025-05-18T13:00:00Z', status: 'COMPLETED', winner: 'NOR' },
  { id: 'mon-2025', season: 2025, round: 8, name: 'Monaco Grand Prix', shortName: 'Monaco GP', circuitId: 'monaco', country: 'Monaco', flagEmoji: '🇲🇨', startTime: '2025-05-25T13:00:00Z', status: 'COMPLETED', winner: 'LEC' },
  { id: 'esp-2025', season: 2025, round: 9, name: 'Spanish Grand Prix', shortName: 'Spanish GP', circuitId: 'barcelona', country: 'Spain', flagEmoji: '🇪🇸', startTime: '2025-06-01T13:00:00Z', status: 'COMPLETED', winner: 'RUS' },
  { id: 'can-2025', season: 2025, round: 10, name: 'Canadian Grand Prix', shortName: 'Canadian GP', circuitId: 'montreal', country: 'Canada', flagEmoji: '🇨🇦', startTime: '2025-06-15T18:00:00Z', status: 'COMPLETED', winner: 'VER' },
  { id: 'aut-2025', season: 2025, round: 11, name: 'Austrian Grand Prix', shortName: 'Austrian GP', circuitId: 'spielberg', country: 'Austria', flagEmoji: '🇦🇹', startTime: '2025-06-29T13:00:00Z', status: 'COMPLETED', winner: 'NOR' },
  { id: 'gbr-2025', season: 2025, round: 12, name: 'British Grand Prix', shortName: 'British GP', circuitId: 'silverstone', country: 'Great Britain', flagEmoji: '🇬🇧', startTime: '2025-07-06T14:00:00Z', status: 'COMPLETED', winner: 'HAM' },
  { id: 'bel-2025', season: 2025, round: 13, name: 'Belgian Grand Prix', shortName: 'Belgian GP', circuitId: 'spa', country: 'Belgium', flagEmoji: '🇧🇪', startTime: '2025-07-27T13:00:00Z', status: 'COMPLETED', winner: 'VER' },
  { id: 'hun-2025', season: 2025, round: 14, name: 'Hungarian Grand Prix', shortName: 'Hungarian GP', circuitId: 'hungaroring', country: 'Hungary', flagEmoji: '🇭🇺', startTime: '2025-08-03T13:00:00Z', status: 'COMPLETED', winner: 'NOR' },
  { id: 'ned-2025', season: 2025, round: 15, name: 'Dutch Grand Prix', shortName: 'Dutch GP', circuitId: 'zandvoort', country: 'Netherlands', flagEmoji: '🇳🇱', startTime: '2025-08-31T13:00:00Z', status: 'COMPLETED', winner: 'VER' },
  { id: 'ita-2025', season: 2025, round: 16, name: 'Italian Grand Prix', shortName: 'Italian GP', circuitId: 'monza', country: 'Italy', flagEmoji: '🇮🇹', startTime: '2025-09-07T13:00:00Z', status: 'LIVE', currentLap: 42, totalLaps: 53, raceStatus: 'GREEN_FLAG' },
  { id: 'aze-2025', season: 2025, round: 17, name: 'Azerbaijan Grand Prix', shortName: 'Azerbaijan GP', circuitId: 'baku', country: 'Azerbaijan', flagEmoji: '🇦🇿', startTime: '2025-09-21T11:00:00Z', status: 'UPCOMING' },
  { id: 'sgp-2025', season: 2025, round: 18, name: 'Singapore Grand Prix', shortName: 'Singapore GP', circuitId: 'singapore', country: 'Singapore', flagEmoji: '🇸🇬', startTime: '2025-10-05T09:00:00Z', status: 'UPCOMING' },
  { id: 'usa-2025', season: 2025, round: 19, name: 'United States Grand Prix', shortName: 'US GP', circuitId: 'austin', country: 'USA', flagEmoji: '🇺🇸', startTime: '2025-10-19T19:00:00Z', status: 'UPCOMING' },
  { id: 'mex-2025', season: 2025, round: 20, name: 'Mexico City Grand Prix', shortName: 'Mexico GP', circuitId: 'mexico', country: 'Mexico', flagEmoji: '🇲🇽', startTime: '2025-10-26T20:00:00Z', status: 'UPCOMING' },
  { id: 'bra-2025', season: 2025, round: 21, name: 'São Paulo Grand Prix', shortName: 'São Paulo GP', circuitId: 'interlagos', country: 'Brazil', flagEmoji: '🇧🇷', startTime: '2025-11-09T17:00:00Z', status: 'UPCOMING' },
  { id: 'lv-2025', season: 2025, round: 22, name: 'Las Vegas Grand Prix', shortName: 'Las Vegas GP', circuitId: 'lasvegas', country: 'USA', flagEmoji: '🇺🇸', startTime: '2025-11-22T06:00:00Z', status: 'UPCOMING' },
  { id: 'qat-2025', season: 2025, round: 23, name: 'Qatar Grand Prix', shortName: 'Qatar GP', circuitId: 'losail', country: 'Qatar', flagEmoji: '🇶🇦', startTime: '2025-11-30T15:00:00Z', status: 'UPCOMING' },
  { id: 'abu-2025', season: 2025, round: 24, name: 'Abu Dhabi Grand Prix', shortName: 'Abu Dhabi GP', circuitId: 'yas_marina', country: 'UAE', flagEmoji: '🇦🇪', startTime: '2025-12-07T13:00:00Z', status: 'UPCOMING' },
];

// ------------------------------------------------------------------
// LIVE RACE POSITIONS — Italian Grand Prix Lap 42
// ------------------------------------------------------------------
export const MOCK_POSITIONS: LivePosition[] = [
  { driverId: 'VER', position: 1, previousPosition: 1, lap: 42, gapToLeader: 'LEADER', gapToCarAhead: 'LEADER', tyre: 'MEDIUM', tyreAge: 19, pitStops: 1, status: 'RUNNING', fastestLap: false, bestLapTime: '1:21.865', currentLapTime: '1:22.101' },
  { driverId: 'NOR', position: 2, previousPosition: 3, lap: 42, gapToLeader: '+2.431', gapToCarAhead: '+2.431', tyre: 'MEDIUM', tyreAge: 19, pitStops: 1, status: 'RUNNING', fastestLap: true, bestLapTime: '1:21.442', currentLapTime: '1:21.442' },
  { driverId: 'LEC', position: 3, previousPosition: 2, lap: 42, gapToLeader: '+8.210', gapToCarAhead: '+5.779', tyre: 'HARD', tyreAge: 28, pitStops: 1, status: 'RUNNING', fastestLap: false, bestLapTime: '1:22.341', currentLapTime: '1:22.450' },
  { driverId: 'HAM', position: 4, previousPosition: 4, lap: 42, gapToLeader: '+12.842', gapToCarAhead: '+4.632', tyre: 'HARD', tyreAge: 28, pitStops: 2, status: 'RUNNING', fastestLap: false, bestLapTime: '1:22.891', currentLapTime: '1:22.991' },
  { driverId: 'RUS', position: 5, previousPosition: 6, lap: 42, gapToLeader: '+18.331', gapToCarAhead: '+5.489', tyre: 'MEDIUM', tyreAge: 12, pitStops: 2, status: 'RUNNING', fastestLap: false, bestLapTime: '1:23.102', currentLapTime: '1:23.210' },
  { driverId: 'PIA', position: 6, previousPosition: 5, lap: 42, gapToLeader: '+21.442', gapToCarAhead: '+3.111', tyre: 'HARD', tyreAge: 22, pitStops: 1, status: 'RUNNING', fastestLap: false, bestLapTime: '1:23.341', currentLapTime: '1:23.400' },
  { driverId: 'SAI', position: 7, previousPosition: 7, lap: 42, gapToLeader: '+28.991', gapToCarAhead: '+7.549', tyre: 'MEDIUM', tyreAge: 15, pitStops: 2, status: 'RUNNING', fastestLap: false, bestLapTime: '1:23.891', currentLapTime: '1:24.110' },
  { driverId: 'ALO', position: 8, previousPosition: 9, lap: 42, gapToLeader: '+35.220', gapToCarAhead: '+6.229', tyre: 'HARD', tyreAge: 31, pitStops: 1, status: 'RUNNING', fastestLap: false, bestLapTime: '1:24.210', currentLapTime: '1:24.450' },
  { driverId: 'HUL', position: 9, previousPosition: 8, lap: 42, gapToLeader: '+41.110', gapToCarAhead: '+5.890', tyre: 'MEDIUM', tyreAge: 18, pitStops: 1, status: 'RUNNING', fastestLap: false, bestLapTime: '1:24.551', currentLapTime: '1:24.710' },
  { driverId: 'GAS', position: 10, previousPosition: 10, lap: 42, gapToLeader: '+46.332', gapToCarAhead: '+5.222', tyre: 'HARD', tyreAge: 24, pitStops: 1, status: 'RUNNING', fastestLap: false, bestLapTime: '1:24.892', currentLapTime: '1:25.001' },
  { driverId: 'STR', position: 11, previousPosition: 12, lap: 42, gapToLeader: '+51.001', gapToCarAhead: '+4.669', tyre: 'MEDIUM', tyreAge: 12, pitStops: 2, status: 'RUNNING', fastestLap: false, bestLapTime: '1:25.110', currentLapTime: '1:25.341' },
  { driverId: 'ANT', position: 12, previousPosition: 11, lap: 42, gapToLeader: '+54.220', gapToCarAhead: '+3.219', tyre: 'HARD', tyreAge: 28, pitStops: 1, status: 'RUNNING', fastestLap: false, bestLapTime: '1:25.441', currentLapTime: '1:25.510' },
  { driverId: 'TSU', position: 13, previousPosition: 14, lap: 42, gapToLeader: '+58.441', gapToCarAhead: '+4.221', tyre: 'MEDIUM', tyreAge: 9, pitStops: 2, status: 'RUNNING', fastestLap: false, bestLapTime: '1:25.661', currentLapTime: '1:25.710' },
  { driverId: 'OCO', position: 14, previousPosition: 13, lap: 41, gapToLeader: '+1 LAP', gapToCarAhead: '+1 LAP', tyre: 'HARD', tyreAge: 35, pitStops: 1, status: 'RUNNING', fastestLap: false, bestLapTime: '1:26.001' },
  { driverId: 'DOO', position: 15, previousPosition: 15, lap: 41, gapToLeader: '+1 LAP', gapToCarAhead: '+12.331', tyre: 'MEDIUM', tyreAge: 17, pitStops: 2, status: 'RUNNING', fastestLap: false, bestLapTime: '1:26.220' },
  { driverId: 'BOT', position: 16, previousPosition: 17, lap: 41, gapToLeader: '+1 LAP', gapToCarAhead: '+18.221', tyre: 'HARD', tyreAge: 28, pitStops: 1, status: 'RUNNING', fastestLap: false, bestLapTime: '1:26.551' },
  { driverId: 'LAW', position: 17, previousPosition: 16, lap: 41, gapToLeader: '+1 LAP', gapToCarAhead: '+6.001', tyre: 'MEDIUM', tyreAge: 14, pitStops: 2, status: 'RUNNING', fastestLap: false, bestLapTime: '1:26.781' },
  { driverId: 'COL', position: 18, previousPosition: 18, lap: 41, gapToLeader: '+1 LAP', gapToCarAhead: '+5.441', tyre: 'HARD', tyreAge: 22, pitStops: 1, status: 'RUNNING', fastestLap: false, bestLapTime: '1:27.001' },
  { driverId: 'BEA', position: 19, previousPosition: 20, lap: 41, gapToLeader: '+1 LAP', gapToCarAhead: '+9.221', tyre: 'MEDIUM', tyreAge: 11, pitStops: 2, status: 'RUNNING', fastestLap: false, bestLapTime: '1:27.341' },
  { driverId: 'PER', position: 20, previousPosition: 19, lap: 38, gapToLeader: 'DNF', gapToCarAhead: 'DNF', tyre: 'SOFT', tyreAge: 5, pitStops: 2, status: 'DNF', fastestLap: false, bestLapTime: '1:23.441' },
];

// ------------------------------------------------------------------
// PIT STOPS
// ------------------------------------------------------------------
export const MOCK_PIT_STOPS: PitStop[] = [
  { id: 'ps1', driverId: 'VER', lap: 23, stopNumber: 1, oldTyre: 'SOFT', newTyre: 'MEDIUM', pitLaneTime: '22.4s' },
  { id: 'ps2', driverId: 'NOR', lap: 23, stopNumber: 1, oldTyre: 'SOFT', newTyre: 'MEDIUM', pitLaneTime: '23.1s' },
  { id: 'ps3', driverId: 'LEC', lap: 14, stopNumber: 1, oldTyre: 'SOFT', newTyre: 'HARD', pitLaneTime: '24.6s' },
  { id: 'ps4', driverId: 'HAM', lap: 12, stopNumber: 1, oldTyre: 'SOFT', newTyre: 'MEDIUM', pitLaneTime: '25.2s' },
  { id: 'ps5', driverId: 'HAM', lap: 28, stopNumber: 2, oldTyre: 'MEDIUM', newTyre: 'HARD', pitLaneTime: '21.8s' },
  { id: 'ps6', driverId: 'RUS', lap: 15, stopNumber: 1, oldTyre: 'SOFT', newTyre: 'MEDIUM', pitLaneTime: '23.8s' },
  { id: 'ps7', driverId: 'RUS', lap: 30, stopNumber: 2, oldTyre: 'MEDIUM', newTyre: 'MEDIUM', pitLaneTime: '22.9s' },
  { id: 'ps8', driverId: 'PIA', lap: 20, stopNumber: 1, oldTyre: 'SOFT', newTyre: 'HARD', pitLaneTime: '23.5s' },
  { id: 'ps9', driverId: 'SAI', lap: 14, stopNumber: 1, oldTyre: 'SOFT', newTyre: 'MEDIUM', pitLaneTime: '24.1s' },
  { id: 'ps10', driverId: 'SAI', lap: 27, stopNumber: 2, oldTyre: 'MEDIUM', newTyre: 'MEDIUM', pitLaneTime: '22.6s' },
];

// ------------------------------------------------------------------
// FASTEST LAP
// ------------------------------------------------------------------
export const MOCK_FASTEST_LAP: FastestLap = {
  driverId: 'NOR',
  time: '1:21.442',
  lap: 42,
  speed: 261.9,
};

// ------------------------------------------------------------------
// RACE EVENTS FEED
// ------------------------------------------------------------------
export const MOCK_RACE_EVENTS: RaceEvent[] = [
  { id: 're1', timestamp: '00:00', lap: 1, type: 'RACE_START', description: 'Lights out! Race begins at Monza!' },
  { id: 're2', timestamp: '00:12', lap: 1, type: 'OVERTAKE', description: 'Norris overtakes Leclerc for P2 into Turn 1', driverId: 'NOR', secondaryDriverId: 'LEC' },
  { id: 're3', timestamp: '08:44', lap: 5, type: 'YELLOW_FLAG', description: 'Yellow flag in Sector 2 — debris on track' },
  { id: 're4', timestamp: '09:10', lap: 5, type: 'GREEN_FLAG', description: 'Track is clear, green flag' },
  { id: 're5', timestamp: '21:15', lap: 12, type: 'PIT_STOP', description: 'Hamilton pits for Medium tyres', driverId: 'HAM' },
  { id: 're6', timestamp: '24:30', lap: 14, type: 'PIT_STOP', description: 'Leclerc pits — goes onto Hard compound', driverId: 'LEC' },
  { id: 're7', timestamp: '25:01', lap: 14, type: 'PIT_STOP', description: 'Sainz pits for Medium tyres', driverId: 'SAI' },
  { id: 're8', timestamp: '26:22', lap: 15, type: 'PIT_STOP', description: 'Russell pits — undercut attempt', driverId: 'RUS' },
  { id: 're9', timestamp: '33:10', lap: 20, type: 'PIT_STOP', description: 'Piastri pits for Hard tyres', driverId: 'PIA' },
  { id: 're10', timestamp: '38:20', lap: 23, type: 'PIT_STOP', description: 'Verstappen pits — moves onto Medium', driverId: 'VER' },
  { id: 're11', timestamp: '38:45', lap: 23, type: 'PIT_STOP', description: 'Norris pits — matches Verstappen strategy', driverId: 'NOR' },
  { id: 're12', timestamp: '44:01', lap: 27, type: 'PIT_STOP', description: 'Sainz pits again — second stop complete', driverId: 'SAI' },
  { id: 're13', timestamp: '46:22', lap: 28, type: 'PIT_STOP', description: 'Hamilton second stop — Hard tyres fitted', driverId: 'HAM' },
  { id: 're14', timestamp: '49:50', lap: 30, type: 'PIT_STOP', description: 'Russell second stop — fresh Medium compound', driverId: 'RUS' },
  { id: 're15', timestamp: '52:30', lap: 32, type: 'PENALTY', description: 'Perez — 5 second penalty for unsafe release', driverId: 'PER' },
  { id: 're16', timestamp: '55:10', lap: 34, type: 'OVERTAKE', description: 'Norris overtakes Leclerc for P2 — brilliant move at Lesmo', driverId: 'NOR', secondaryDriverId: 'LEC' },
  { id: 're17', timestamp: '59:44', lap: 37, type: 'YELLOW_FLAG', description: 'Perez retires — yellow flag Parabolica' },
  { id: 're18', timestamp: '60:10', lap: 38, type: 'GREEN_FLAG', description: 'Green flag resumes' },
  { id: 're19', timestamp: '67:30', lap: 42, type: 'FASTEST_LAP', description: 'Norris sets fastest lap of the race — 1:21.442', driverId: 'NOR' },
];

// ------------------------------------------------------------------
// FULL LIVE RACE STATE
// ------------------------------------------------------------------
export const MOCK_LIVE_RACE: LiveRaceData = {
  race: MOCK_CALENDAR.find(r => r.status === 'LIVE')!,
  circuit: MOCK_CIRCUITS.monza,
  positions: MOCK_POSITIONS,
  pitStops: MOCK_PIT_STOPS,
  fastestLap: MOCK_FASTEST_LAP,
  events: MOCK_RACE_EVENTS,
  weather: {
    airTemp: 28,
    trackTemp: 48,
    humidity: 42,
    windSpeed: 14,
    windDirection: 'NW',
    rainfall: false,
    rainProbability: 5,
    condition: 'Sunny',
    available: true,
  },
  lastUpdated: new Date().toISOString(),
  dataSource: 'MOCK',
};

// ------------------------------------------------------------------
// DRIVER STANDINGS
// ------------------------------------------------------------------
export const MOCK_DRIVER_STANDINGS: DriverStanding[] = [
  { position: 1, driverId: 'NOR', teamId: 'MCL', points: 331, wins: 8, podiums: 13, poles: 6, fastestLaps: 5 },
  { position: 2, driverId: 'VER', teamId: 'RBR', points: 281, wins: 7, podiums: 11, poles: 8, fastestLaps: 4 },
  { position: 3, driverId: 'RUS', teamId: 'MER', points: 229, wins: 3, podiums: 9, poles: 2, fastestLaps: 3 },
  { position: 4, driverId: 'LEC', teamId: 'FER', points: 219, wins: 2, podiums: 8, poles: 4, fastestLaps: 2 },
  { position: 5, driverId: 'HAM', teamId: 'FER', points: 198, wins: 1, podiums: 7, poles: 1, fastestLaps: 1 },
  { position: 6, driverId: 'PIA', teamId: 'MCL', points: 188, wins: 0, podiums: 6, poles: 0, fastestLaps: 0 },
  { position: 7, driverId: 'ANT', teamId: 'MER', points: 152, wins: 0, podiums: 3, poles: 0, fastestLaps: 1 },
  { position: 8, driverId: 'SAI', teamId: 'WIL', points: 141, wins: 0, podiums: 2, poles: 0, fastestLaps: 2 },
  { position: 9, driverId: 'ALO', teamId: 'AMR', points: 98, wins: 0, podiums: 1, poles: 0, fastestLaps: 0 },
  { position: 10, driverId: 'TSU', teamId: 'RBR', points: 74, wins: 0, podiums: 0, poles: 0, fastestLaps: 0 },
];

// ------------------------------------------------------------------
// CONSTRUCTOR STANDINGS
// ------------------------------------------------------------------
export const MOCK_CONSTRUCTOR_STANDINGS: ConstructorStanding[] = [
  { position: 1, teamId: 'MCL', points: 519, wins: 8, podiums: 19, poles: 6 },
  { position: 2, teamId: 'MER', points: 381, wins: 3, podiums: 12, poles: 2 },
  { position: 3, teamId: 'FER', points: 417, wins: 3, podiums: 15, poles: 5 },
  { position: 4, teamId: 'RBR', points: 355, wins: 7, podiums: 11, poles: 8 },
  { position: 5, teamId: 'WIL', points: 141, wins: 0, podiums: 2, poles: 0 },
  { position: 6, teamId: 'AMR', points: 98, wins: 0, podiums: 1, poles: 0 },
  { position: 7, teamId: 'RBU', points: 74, wins: 0, podiums: 0, poles: 0 },
  { position: 8, teamId: 'ALP', points: 58, wins: 0, podiums: 0, poles: 0 },
  { position: 9, teamId: 'HAS', points: 41, wins: 0, podiums: 0, poles: 0 },
  { position: 10, teamId: 'SAU', points: 5, wins: 0, podiums: 0, poles: 0 },
];

// ------------------------------------------------------------------
// QUALIFYING RESULTS — Italian GP 2025
// ------------------------------------------------------------------
export const MOCK_QUALIFYING: QualifyingResult[] = [
  { driverId: 'VER', position: 1, q1Time: '1:20.881', q2Time: '1:20.541', q3Time: '1:20.294', bestTime: '1:20.294', gap: 'POLE' },
  { driverId: 'NOR', position: 2, q1Time: '1:21.001', q2Time: '1:20.671', q3Time: '1:20.441', bestTime: '1:20.441', gap: '+0.147' },
  { driverId: 'LEC', position: 3, q1Time: '1:21.111', q2Time: '1:20.891', q3Time: '1:20.721', bestTime: '1:20.721', gap: '+0.427' },
  { driverId: 'HAM', position: 4, q1Time: '1:21.221', q2Time: '1:20.991', q3Time: '1:20.841', bestTime: '1:20.841', gap: '+0.547' },
  { driverId: 'RUS', position: 5, q1Time: '1:21.331', q2Time: '1:21.101', q3Time: '1:21.001', bestTime: '1:21.001', gap: '+0.707' },
  { driverId: 'PIA', position: 6, q1Time: '1:21.441', q2Time: '1:21.211', q3Time: '1:21.141', bestTime: '1:21.141', gap: '+0.847' },
  { driverId: 'SAI', position: 7, q1Time: '1:21.551', q2Time: '1:21.321', q3Time: '1:21.281', bestTime: '1:21.281', gap: '+0.987' },
  { driverId: 'ALO', position: 8, q1Time: '1:21.661', q2Time: '1:21.431', q3Time: '1:21.421', bestTime: '1:21.421', gap: '+1.127' },
  { driverId: 'HUL', position: 9, q1Time: '1:21.771', q2Time: '1:21.541', q3Time: '1:21.561', bestTime: '1:21.561', gap: '+1.267' },
  { driverId: 'GAS', position: 10, q1Time: '1:21.881', q2Time: '1:21.651', q3Time: '1:21.701', bestTime: '1:21.701', gap: '+1.407' },
];

// ------------------------------------------------------------------
// CAREER STATS
// ------------------------------------------------------------------
export const MOCK_CAREER_STATS: Record<string, DriverCareerStats> = {
  VER: { driverId: 'VER', starts: 185, wins: 63, podiums: 112, poles: 41, fastestLaps: 30, championships: 4, debutYear: 2015 },
  HAM: { driverId: 'HAM', starts: 348, wins: 103, podiums: 197, poles: 104, fastestLaps: 67, championships: 7, debutYear: 2007 },
  LEC: { driverId: 'LEC', starts: 141, wins: 9, podiums: 41, poles: 26, fastestLaps: 8, championships: 0, debutYear: 2018 },
  NOR: { driverId: 'NOR', starts: 126, wins: 14, podiums: 29, poles: 10, fastestLaps: 8, championships: 0, debutYear: 2019 },
  RUS: { driverId: 'RUS', starts: 116, wins: 5, podiums: 21, poles: 3, fastestLaps: 7, championships: 0, debutYear: 2019 },
  SAI: { driverId: 'SAI', starts: 186, wins: 4, podiums: 24, poles: 5, fastestLaps: 5, championships: 0, debutYear: 2015 },
  ALO: { driverId: 'ALO', starts: 384, wins: 32, podiums: 106, poles: 22, fastestLaps: 23, championships: 2, debutYear: 2001 },
  PIA: { driverId: 'PIA', starts: 58, wins: 2, podiums: 12, poles: 1, fastestLaps: 3, championships: 0, debutYear: 2023 },
};

// ------------------------------------------------------------------
// SEASON STATS
// ------------------------------------------------------------------
export const MOCK_SEASON_STATS: Record<string, DriverSeasonStats> = {
  VER: { driverId: 'VER', season: 2025, races: 16, wins: 7, podiums: 11, poles: 8, fastestLaps: 4, points: 281, dnfs: 1, highestFinish: 1 },
  NOR: { driverId: 'NOR', season: 2025, races: 16, wins: 8, podiums: 13, poles: 6, fastestLaps: 5, points: 331, dnfs: 0, highestFinish: 1 },
  LEC: { driverId: 'LEC', season: 2025, races: 16, wins: 2, podiums: 8, poles: 4, fastestLaps: 2, points: 219, dnfs: 1, highestFinish: 1 },
};
