import { type HTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

export type OrbVariant =
  | 'sunset'
  | 'ocean'
  | 'blossom'
  | 'forest'
  | 'dawn'
  | 'twilight';

export type OrbSize = 'sm' | 'md' | 'lg' | 'xl';

export interface GradientOrbProps extends HTMLAttributes<HTMLDivElement> {
  variant?: OrbVariant;
  size?: OrbSize;
  fallback?: string; // 텍스트 또는 이모지
}

const sizeStyles: Record<OrbSize, string> = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-12 w-12 text-base',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-20 w-20 text-xl',
};

const variantStyles: Record<OrbVariant, string> = {
  sunset: 'orb-sunset',
  ocean: 'orb-ocean',
  blossom: 'orb-blossom',
  forest: 'orb-forest',
  dawn: 'orb-dawn',
  twilight: 'orb-twilight',
};

export function GradientOrb({
  className,
  variant = 'sunset',
  size = 'md',
  fallback,
  ...props
}: GradientOrbProps) {
  return (
    <div
      className={cn(
        'relative',
        'rounded-full',
        'shadow-soft-sm',
        'overflow-hidden',
        'orb',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {fallback && (
        <span className="absolute inset-0 flex items-center justify-center font-ui font-semibold text-white/90">
          {fallback}
        </span>
      )}
    </div>
  );
}

// Avatar 별칭 export
export const Avatar = GradientOrb;
export type { AvatarProps } from './Avatar';
