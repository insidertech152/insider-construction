import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/src/lib/utils';
import { ButtonColor } from './button';

export interface SwitchProps {
  id?: string;
  label?: React.ReactNode;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  color?: ButtonColor;
  size?: 'sm' | 'md';
  className?: string;
}

const colorMap: Record<ButtonColor, string> = {
  primary: 'data-[state=checked]:bg-primary-action focus-visible:ring-primary-action',
  secondary: 'data-[state=checked]:bg-secondary-600 focus-visible:ring-secondary-500',
  success: 'data-[state=checked]:bg-success-action focus-visible:ring-success-action',
  danger: 'data-[state=checked]:bg-danger-600 focus-visible:ring-danger-500',
  warning: 'data-[state=checked]:bg-warning-500 focus-visible:ring-warning-500',
  info: 'data-[state=checked]:bg-info-action focus-visible:ring-info-action',
};

export function Switch({
  id,
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  color = 'primary',
  size = 'md',
  className,
}: SwitchProps) {
  const generatedId = id || React.useId();
  const isSm = size === 'sm';

  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <SwitchPrimitive.Root
        id={generatedId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'data-[state=unchecked]:bg-secondary-200',
          isSm ? 'h-4.5 w-8' : 'h-6 w-11',
          disabled && 'cursor-not-allowed opacity-50',
          colorMap[color]
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'pointer-events-none block rounded-full bg-card-bg shadow-sm ring-0 transition-transform duration-200',
            isSm ? 'h-3.5 w-3.5' : 'h-5 w-5',
            // Direction aware translation
            isSm
              ? 'ltr:data-[state=checked]:translate-x-3.5 rtl:data-[state=checked]:-translate-x-3.5 data-[state=unchecked]:translate-x-0'
              : 'ltr:data-[state=checked]:translate-x-5 rtl:data-[state=checked]:-translate-x-5 data-[state=unchecked]:translate-x-0'
          )}
        />
      </SwitchPrimitive.Root>

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
        </div>
      )}
    </div>
  );
}
