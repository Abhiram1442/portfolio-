// components/ui/TyreBadge.tsx
import { TyreCompound } from '@/types/f1';
import { getTyreBg, getTyreTextColor } from '@/lib/utils';

interface TyreBadgeProps {
  compound: TyreCompound;
  age?: number;
  size?: 'sm' | 'md' | 'lg';
  showAge?: boolean;
}

export function TyreBadge({ compound, age, size = 'md', showAge = false }: TyreBadgeProps) {
  const initial = compound[0]; // S, M, H, I, W
  const bg = getTyreBg(compound);
  const textColor = getTyreTextColor(compound);

  const sizeClasses = {
    sm: 'w-5 h-5 text-[10px]',
    md: 'w-6 h-6 text-xs',
    lg: 'w-8 h-8 text-sm',
  };

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`inline-flex items-center justify-center rounded-full font-bold shrink-0 ${bg} ${textColor} ${sizeClasses[size]}`}
        title={compound}
        aria-label={`${compound} tyre`}
      >
        {initial}
      </span>
      {showAge && age !== undefined && (
        <span className="text-xs text-gray-500 font-mono">{age}L</span>
      )}
    </div>
  );
}
