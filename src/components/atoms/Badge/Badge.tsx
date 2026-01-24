import { type HTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

export type BadgeVariant =
  | 'default'
  | 'crush'
  | 'breakup'
  | 'dating'
  | 'advice'
  | 'success'
  | 'warning';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string[]> = {
  default: ['bg-soft-gray', 'text-text-secondary'],
  crush: ['bg-rose-light', 'text-rose-dark'],
  breakup: ['bg-lavender/30', 'text-lavender'],
  dating: ['bg-peach/40', 'text-orange-700'],
  advice: ['bg-sage-light', 'text-sage-dark'],
  success: ['bg-sage', 'text-white'],
  warning: ['bg-honey/40', 'text-amber-800'],
};

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex',
        'items-center',
        'px-3',
        'py-1',
        'rounded-full',
        'text-sm',
        'font-ui',
        'font-medium',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
