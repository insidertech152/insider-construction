import React from 'react';
import { cn } from '@/src/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangle' | 'circle' | 'text';
}

export function Skeleton({
  variant = 'rectangle',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-secondary-200/80',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-4 rounded w-full',
        variant === 'rectangle' && 'rounded-md',
        className
      )}
      {...props}
    />
  );
}
