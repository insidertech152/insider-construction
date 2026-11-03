import React, { forwardRef } from 'react';
import { CircleNotch } from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'link';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const colorStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    // Action shades strictly satisfy WCAG AA >= 4.5:1 text contrast with white foreground
    primary: 'bg-primary-action text-text-inverse hover:bg-primary-700 active:bg-primary-800 shadow-xs',
    secondary: 'bg-secondary-700 text-text-inverse hover:bg-secondary-800 active:bg-secondary-900 shadow-xs',
    success: 'bg-success-action text-text-inverse hover:bg-success-700 active:bg-success-800 shadow-xs',
    danger: 'bg-danger-500 text-text-inverse hover:bg-danger-600 active:bg-danger-700 shadow-xs',
    // Warning amber fill with dark text guarantees ~9.5:1 contrast while preserving the true yellow/amber hue
    warning: 'bg-warning-500 text-dark-900 font-semibold hover:bg-warning-600 active:bg-warning-700 shadow-xs',
    info: 'bg-info-action text-text-inverse hover:bg-info-700 active:bg-info-800 shadow-xs',
  },
  soft: {
    primary: 'bg-primary-soft text-primary-700 hover:bg-primary-100 active:bg-primary-200',
    secondary: 'bg-secondary-soft text-secondary-800 hover:bg-secondary-100 active:bg-secondary-200',
    success: 'bg-success-soft text-success-800 hover:bg-success-100 active:bg-success-200',
    danger: 'bg-danger-soft text-danger-800 hover:bg-danger-100 active:bg-danger-200',
    warning: 'bg-warning-soft text-warning-900 hover:bg-warning-100 active:bg-warning-200',
    info: 'bg-info-soft text-info-800 hover:bg-info-100 active:bg-info-200',
  },
  outline: {
    primary: 'border border-primary-action text-primary-700 hover:bg-primary-50 active:bg-primary-100',
    secondary: 'border border-secondary-300 text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100',
    success: 'border border-success-action text-success-800 hover:bg-success-50 active:bg-success-100',
    danger: 'border border-danger-500 text-danger-700 hover:bg-danger-50 active:bg-danger-100',
    warning: 'border border-warning-500 text-warning-800 hover:bg-warning-50 active:bg-warning-100',
    info: 'border border-info-action text-info-800 hover:bg-info-50 active:bg-info-100',
  },
  link: {
    primary: 'text-primary-700 hover:text-primary-800 hover:underline p-0 h-auto font-normal',
    secondary: 'text-secondary-600 hover:text-secondary-800 hover:underline p-0 h-auto font-normal',
    success: 'text-success-700 hover:text-success-800 hover:underline p-0 h-auto font-normal',
    danger: 'text-danger-600 hover:text-danger-700 hover:underline p-0 h-auto font-normal',
    warning: 'text-warning-800 hover:text-warning-900 hover:underline p-0 h-auto font-normal',
    info: 'text-info-700 hover:text-info-800 hover:underline p-0 h-auto font-normal',
  },
};

// Radius 4px across button sizes to strictly match reference specifications
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs h-8 px-2.5 py-1.5 gap-1.5 rounded-sm',
  md: 'text-sm h-10 px-3.5 py-2 gap-2 rounded-sm',
  lg: 'text-base h-12 px-5 py-2.5 gap-2.5 rounded-sm font-medium',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      disabled,
      className,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isLink = variant === 'link';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium normal-case tracking-normal whitespace-nowrap transition-colors duration-200 select-none cursor-pointer',
          'focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-action focus-visible:ring-offset-2',
          !isLink && sizeStyles[size],
          colorStyles[variant][color],
          (disabled || isLoading) && 'opacity-60 cursor-not-allowed pointer-events-none shadow-none',
          className
        )}
        {...props}
      >
        {isLoading && (
          <CircleNotch className="w-4 h-4 animate-spin text-current shrink-0" weight="bold" />
        )}
        {!isLoading && startIcon && (
          <span className="shrink-0 flex items-center justify-center">{startIcon}</span>
        )}
        <span className="normal-case whitespace-nowrap">{children}</span>
        {!isLoading && endIcon && (
          <span className="shrink-0 flex items-center justify-center">{endIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
