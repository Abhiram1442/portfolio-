// components/ui/TeamColorBar.tsx
import { MOCK_TEAMS } from '@/lib/mock-data';

interface TeamColorBarProps {
  teamId: string;
  className?: string;
}

export function TeamColorBar({ teamId, className = '' }: TeamColorBarProps) {
  const team = MOCK_TEAMS[teamId];
  const color = team?.color ?? '#444';

  return (
    <div
      className={`w-0.5 self-stretch rounded-full shrink-0 ${className}`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

interface TeamBadgeProps {
  teamId: string;
  showName?: boolean;
  size?: 'sm' | 'md';
}

export function TeamBadge({ teamId, showName = true, size = 'sm' }: TeamBadgeProps) {
  const team = MOCK_TEAMS[teamId];
  if (!team) return null;

  return (
    <span className="flex items-center gap-1.5">
      <span
        className="inline-block w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: team.color }}
        aria-hidden="true"
      />
      {showName && (
        <span className={`text-gray-400 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {team.shortName}
        </span>
      )}
    </span>
  );
}
