import React from 'react';
import { cn } from '@/src/lib/utils';
import { ButtonColor } from './button';

export type BadgeVariant = 'solid' | 'soft' | 'pill' | 'dot';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: ButtonColor;
  size?: 'sm' | 'md';
  dot?: boolean;
}

const solidColors: Record<ButtonColor, string> = {
  // Action shades for fills carrying text to guarantee WCAG AA >= 4.5:1
  primary: 'bg-primary-action text-text-inverse',
  secondary: 'bg-secondary-700 text-text-inverse',
  success: 'bg-success-action text-text-inverse',
  danger: 'bg-danger-500 text-text-inverse',
  // Dark text on warning yellow fill guarantees ~9.5:1 contrast
  warning: 'bg-warning-500 text-dark-900 font-semibold',
  info: 'bg-info-action text-text-inverse',
};

const softColors: Record<ButtonColor, string> = {
  // Soft fills keep the subtle 50/soft backgrounds with high-contrast text
  primary: 'bg-primary-soft text-primary-700 border border-primary-200/50',
  secondary: 'bg-secondary-soft text-secondary-800 border border-secondary-200/50',
  success: 'bg-success-soft text-success-800 border border-success-200/50',
  danger: 'bg-danger-soft text-danger-800 border border-danger-200/50',
  warning: 'bg-warning-soft text-warning-900 border border-warning-200/50',
  info: 'bg-info-soft text-info-800 border border-info-200/50',
};

// Accents and dots keep the vivid 500 reference hues
const dotColors: Record<ButtonColor, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
};

export function Badge({
  variant = 'solid',
  color = 'primary',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const isPill = variant === 'pill';
  const isDot = variant === 'dot' || dot;
  const isSoft = variant === 'soft' || variant === 'pill';

  const baseColor = isSoft ? softColors[color] : solidColors[color];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium select-none tabular-nums tracking-normal normal-case whitespace-nowrap',
        size === 'sm' ? 'text-[11px] px-2 py-0.5 gap-1.5' : 'text-xs px-2.5 py-1 gap-1.5',
        isPill ? 'rounded-full' : 'rounded-sm',
        baseColor,
        className
      )}
      {...props}
    >
      {isDot && (
        <span
          className={cn(
            'inline-block rounded-full shrink-0',
            size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
            dotColors[color]
          )}
          aria-hidden="true"
        />
      )}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
}
