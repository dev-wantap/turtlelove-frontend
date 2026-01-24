import { cn } from '@/shared/utils/cn';
import { type HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export function Skeleton({
  className,
  width,
  height,
  circle = false,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse',
        'bg-soft-gray',
        'rounded-sm',
        circle && 'rounded-full',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      {...props}
    />
  );
}

// 프리셋 컴포넌트들
export function PostCardSkeleton() {
  return (
    <div className="rounded-lg bg-warm-white p-4 shadow-soft-md">
      <div className="flex items-center gap-3">
        <Skeleton width={48} height={48} circle />
        <div className="flex-1">
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={14} className="mt-2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton width="100%" height={16} />
        <Skeleton width="90%" height={16} />
        <Skeleton width="70%" height={16} />
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton width={60} height={24} />
        <Skeleton width={60} height={24} />
      </div>
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div className="flex gap-3 p-4">
      <Skeleton width={40} height={40} circle />
      <div className="flex-1 space-y-2">
        <Skeleton width="30%" height={14} />
        <Skeleton width="100%" height={14} />
        <Skeleton width="80%" height={14} />
      </div>
    </div>
  );
}
