import { cn } from '@/shared/utils/cn';
import { type HTMLAttributes } from 'react';
import { Flame } from 'lucide-react';

export type WarmthSize = 'sm' | 'md';

export interface WarmthMeterProps extends HTMLAttributes<HTMLDivElement> {
  level: number; // 0-100
  size?: WarmthSize;
  showLabel?: boolean;
}

const sizeStyles: Record<WarmthSize, { bar: string; icon: string }> = {
  sm: {
    bar: 'w-12 h-1.5',
    icon: 'h-3.5 w-3.5',
  },
  md: {
    bar: 'w-16 h-2',
    icon: 'h-4 w-4',
  },
};

const getWarmthColor = (level: number): string => {
  if (level < 33) return '#A8C5A8'; // sage - 차분함
  if (level < 66) return '#E5B8B7'; // rose - 온기
  return '#E8A08F'; // warm orange - 열정
};

const getWarmthLabel = (level: number): string => {
  if (level < 20) return '차분한';
  if (level < 40) return '따뜻한';
  if (level < 60) return '설레는';
  if (level < 80) return '뜨거운';
  return '타오르는';
};

export function WarmthMeter({
  level,
  size = 'md',
  showLabel = false,
  className,
  ...props
}: WarmthMeterProps) {
  const clampedLevel = Math.max(0, Math.min(100, level));
  const color = getWarmthColor(clampedLevel);

  return (
    <div
      className={cn('flex items-center gap-2', className)}
      {...props}
    >
      <Flame
        className={cn(
          sizeStyles[size].icon,
          'transition-colors',
          'duration-300'
        )}
        style={{ color }}
      />
      <div
        className={cn(
          'rounded-full',
          'bg-warm-gray',
          'overflow-hidden',
          sizeStyles[size].bar
        )}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${clampedLevel}%`,
            background: `linear-gradient(90deg, #A8C5A8 0%, #E5B8B7 50%, ${color} 100%)`,
          }}
        />
      </div>
      {showLabel && (
        <span
          className="text-xs font-ui font-medium text-text-secondary"
          style={{ color }}
        >
          {getWarmthLabel(clampedLevel)}
        </span>
      )}
    </div>
  );
}
