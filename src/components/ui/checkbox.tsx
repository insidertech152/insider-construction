import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { ButtonColor } from './button';

export interface CheckboxProps {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
  color?: ButtonColor;
  error?: string;
  className?: string;
}

const colorMap: Record<ButtonColor, string> = {
  primary: 'data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=indeterminate]:bg-primary-500 data-[state=indeterminate]:border-primary-500 focus-visible:ring-primary-500',
  secondary: 'data-[state=checked]:bg-secondary-600 data-[state=checked]:border-secondary-600 data-[state=indeterminate]:bg-secondary-600 data-[state=indeterminate]:border-secondary-600 focus-visible:ring-secondary-500',
  success: 'data-[state=checked]:bg-success-600 data-[state=checked]:border-success-600 data-[state=indeterminate]:bg-success-600 data-[state=indeterminate]:border-success-600 focus-visible:ring-success-500',
  danger: 'data-[state=checked]:bg-danger-600 data-[state=checked]:border-danger-600 data-[state=indeterminate]:bg-danger-600 data-[state=indeterminate]:border-danger-600 focus-visible:ring-danger-500',
  warning: 'data-[state=checked]:bg-warning-500 data-[state=checked]:border-warning-500 data-[state=indeterminate]:bg-warning-500 data-[state=indeterminate]:border-warning-500 focus-visible:ring-warning-500',
  info: 'data-[state=checked]:bg-info-600 data-[state=checked]:border-info-600 data-[state=indeterminate]:bg-info-600 data-[state=indeterminate]:border-info-600 focus-visible:ring-info-500',
};

export function Checkbox({
  id,
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  color = 'primary',
  error,
  className,
}: CheckboxProps) {
  const generatedId = id || React.useId();

  return (
    <div className={cn('flex items-start gap-2.5 select-none', className)}>
      <CheckboxPrimitive.Root
        id={generatedId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          'peer h-4.5 w-4.5 shrink-0 rounded-xs border border-secondary-300 bg-card-bg mt-0.5',
          'transition-all duration-150 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          disabled && 'cursor-not-allowed opacity-50 bg-page-bg',
          error && 'border-danger-500',
          colorMap[color]
        )}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-text-inverse">
          {checked === 'indeterminate' ? (
            <Minus className="h-3 w-3" weight="bold" />
          ) : (
            <Check className="h-3 w-3" weight="bold" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {(label || description) && (
        <div className="flex flex-col gap-0.5 text-start leading-none">
          {label && (
            <label
              htmlFor={generatedId}
              className={cn(
                'text-xs font-medium text-text-primary cursor-pointer',
                disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-[11px] text-text-muted mt-0.5">{description}</p>
          )}
          {error && <p className="text-[11px] text-danger-600 font-medium">{error}</p>}
        </div>
      )}
    </div>
  );
}
