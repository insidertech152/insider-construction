import React from 'react';
import { cn } from '@/src/lib/utils';
import { ButtonColor } from './button';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  color?: ButtonColor;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  striped?: boolean;
}

const colorMap: Record<ButtonColor, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-600',
  success: 'bg-success-600',
  danger: 'bg-danger-600',
  warning: 'bg-warning-500',
  info: 'bg-info-600',
};

const sizeMap = {
  xs: 'h-1.5',
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function Progress({
  value = 0,
  max = 100,
  color = 'primary',
  size = 'sm',
  showLabel = false,
  label,
  striped = false,
  className,
  ...props
}: ProgressProps) {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = Math.round((clampedValue / max) * 100);

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs font-medium text-text-secondary">
          <span>{label}</span>
          <span className="font-numeric">{percentage}%</span>
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          'w-full bg-secondary-100 rounded-full overflow-hidden p-0',
          sizeMap[size]
        )}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            colorMap[color],
            striped && 'bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
