// lib/utils.ts — Utility helpers

import { TyreCompound, RaceStatus, RaceEventType, DriverStatus } from '@/types/f1';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getTyreColor(compound: TyreCompound): string {
  switch (compound) {
    case 'SOFT': return 'text-red-500';
    case 'MEDIUM': return 'text-yellow-400';
    case 'HARD': return 'text-white';
    case 'INTERMEDIATE': return 'text-green-400';
    case 'WET': return 'text-blue-400';
  }
}

export function getTyreBg(compound: TyreCompound): string {
  switch (compound) {
    case 'SOFT': return 'bg-red-500';
    case 'MEDIUM': return 'bg-yellow-400';
    case 'HARD': return 'bg-gray-100';
    case 'INTERMEDIATE': return 'bg-green-500';
    case 'WET': return 'bg-blue-500';
  }
}

export function getTyreTextColor(compound: TyreCompound): string {
  switch (compound) {
    case 'HARD': return 'text-black';
    case 'MEDIUM': return 'text-black';
    default: return 'text-white';
  }
}

export function getRaceStatusColor(status: RaceStatus): string {
  switch (status) {
    case 'GREEN_FLAG': return 'bg-green-500 text-white';
    case 'SAFETY_CAR': return 'bg-yellow-400 text-black';
    case 'VIRTUAL_SAFETY_CAR': return 'bg-yellow-300 text-black';
    case 'RED_FLAG': return 'bg-red-600 text-white';
    case 'FORMATION_LAP': return 'bg-blue-500 text-white';
    case 'FINISHED': return 'bg-gray-500 text-white';
    case 'CANCELLED': return 'bg-gray-700 text-white';
    default: return 'bg-gray-600 text-white';
  }
}

export function getRaceStatusLabel(status: RaceStatus): string {
  switch (status) {
    case 'NOT_STARTED': return 'NOT STARTED';
    case 'FORMATION_LAP': return 'FORMATION LAP';
    case 'GREEN_FLAG': return 'GREEN FLAG';
    case 'SAFETY_CAR': return 'SAFETY CAR';
    case 'VIRTUAL_SAFETY_CAR': return 'VIRTUAL SAFETY CAR';
    case 'RED_FLAG': return 'RED FLAG';
    case 'FINISHED': return 'FINISHED';
    case 'CANCELLED': return 'CANCELLED';
  }
}

export function getEventTypeColor(type: RaceEventType): string {
  switch (type) {
    case 'OVERTAKE': return 'text-emerald-400';
    case 'PIT_STOP': return 'text-blue-400';
    case 'FASTEST_LAP': return 'text-purple-400';
    case 'YELLOW_FLAG': return 'text-yellow-400';
    case 'SAFETY_CAR': return 'text-yellow-300';
    case 'VIRTUAL_SAFETY_CAR': return 'text-yellow-200';
    case 'RED_FLAG': return 'text-red-500';
    case 'PENALTY': return 'text-orange-400';
    case 'RACE_START': return 'text-green-400';
    case 'RACE_FINISH': return 'text-f1-red';
    case 'GREEN_FLAG': return 'text-green-400';
    case 'LAP': return 'text-gray-400';
    default: return 'text-gray-300';
  }
}

export function getEventTypeBadge(type: RaceEventType): string {
  switch (type) {
    case 'OVERTAKE': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    case 'PIT_STOP': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
    case 'FASTEST_LAP': return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
    case 'YELLOW_FLAG': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    case 'SAFETY_CAR': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
    case 'RED_FLAG': return 'bg-red-500/20 text-red-400 border border-red-500/30';
    case 'PENALTY': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
    case 'RACE_START': return 'bg-green-500/20 text-green-400 border border-green-500/30';
    case 'GREEN_FLAG': return 'bg-green-500/20 text-green-400 border border-green-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
  }
}

export function getEventTypeLabel(type: RaceEventType): string {
  return type.replace(/_/g, ' ');
}

export function getDriverStatusColor(status: DriverStatus): string {
  switch (status) {
    case 'RUNNING': return 'text-green-400';
    case 'PIT': return 'text-blue-400';
    case 'OUT': return 'text-gray-500';
    case 'DNF': return 'text-red-500';
    case 'DSQ': return 'text-orange-500';
    case 'DNS': return 'text-gray-600';
  }
}

export function formatPositionChange(current: number, previous: number): {
  symbol: string;
  label: string;
  color: string;
  gained: number;
} {
  const diff = previous - current;
  if (diff > 0) {
    return { symbol: '↑', label: `+${diff}`, color: 'text-green-400', gained: diff };
  } else if (diff < 0) {
    return { symbol: '↓', label: `${diff}`, color: 'text-red-400', gained: diff };
  }
  return { symbol: '—', label: '—', color: 'text-gray-500', gained: 0 };
}

export function formatLapTime(time: string): string {
  return time;
}

export function formatCountdown(targetDate: string): string {
  const target = new Date(targetDate);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return 'RACE STARTED';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

export function formatShortDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
