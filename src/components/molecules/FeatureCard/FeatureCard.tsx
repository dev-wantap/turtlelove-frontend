import type { HTMLAttributes, ReactNode } from 'react';
import { GradientOrb } from '@/components/atoms/GradientOrb';
import { cn } from '@/shared/utils/cn';

export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  description: string;
  orbVariant?: 'sunset' | 'ocean' | 'blossom' | 'forest' | 'dawn' | 'twilight';
}

export function FeatureCard({
  icon,
  title,
  description,
  orbVariant = 'sunset',
  className,
  ...props
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        'group',
        'rounded-lg',
        'bg-warm-white',
        'p-6',
        'shadow-soft-sm',
        'transition-all',
        'duration-[var(--duration-normal)]',
        'ease-out',
        'hover:shadow-soft-md',
        'hover:-translate-y-1',
        'active:translate-y-0',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Icon Container - Add subtle scale on hover */}
      <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
        <GradientOrb variant={orbVariant} size="lg">
          {icon}
        </GradientOrb>
      </div>

      {/* Content - Add color transition on hover */}
      <h3 className="mb-2 font-heading text-lg font-semibold text-text-primary group-hover:text-rose transition-colors duration-300">
        {title}
      </h3>
      <p className="font-body text-base leading-relaxed text-text-secondary">
        {description}
      </p>
    </article>
  );
}
