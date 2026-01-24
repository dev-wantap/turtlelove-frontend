import { cn } from '@/shared/utils/cn';
import { type HTMLAttributes } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: 'default' | 'rose' | 'sage';
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
};

const variantStyles: Record<
  'default' | 'rose' | 'sage',
  { border: string; borderTop: string }
> = {
  default: {
    border: 'border-warm-gray/30',
    borderTop: 'border-t-text-muted',
  },
  rose: {
    border: 'border-rose/30',
    borderTop: 'border-t-rose',
  },
  sage: {
    border: 'border-sage/30',
    borderTop: 'border-t-sage',
  },
};

export function Spinner({
  className,
  size = 'md',
  variant = 'default',
  ...props
}: SpinnerProps) {
  const variantKey = variant as 'default' | 'rose' | 'sage';
  return (
    <div
      className={cn(
        'animate-spin',
        'rounded-full',
        sizeStyles[size],
        variantStyles[variantKey].border,
        variantStyles[variantKey].borderTop,
        className
      )}
      {...props}
    />
  );
}
