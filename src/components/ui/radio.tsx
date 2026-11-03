import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/src/lib/utils';
import { ButtonColor } from './button';

export interface RadioItemProps {
  id?: string;
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  disabled?: boolean;
  color?: ButtonColor;
  orientation?: 'horizontal' | 'vertical';
  items: RadioItemProps[];
  className?: string;
}

const colorMap: Record<ButtonColor, string> = {
  primary: 'border-primary-500 text-primary-500 focus-visible:ring-primary-500',
  secondary: 'border-secondary-600 text-secondary-600 focus-visible:ring-secondary-500',
  success: 'border-success-600 text-success-600 focus-visible:ring-success-500',
  danger: 'border-danger-600 text-danger-600 focus-visible:ring-danger-500',
  warning: 'border-warning-500 text-warning-500 focus-visible:ring-warning-500',
  info: 'border-info-600 text-info-600 focus-visible:ring-info-500',
};

const fillMap: Record<ButtonColor, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-600',
  success: 'bg-success-600',
  danger: 'bg-danger-600',
  warning: 'bg-warning-500',
  info: 'bg-info-600',
};

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  color = 'primary',
  orientation = 'vertical',
  items,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      className={cn(
        'flex gap-3.5',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap items-center',
        className
      )}
    >
      {items.map((item) => {
        const itemId = item.id || `radio-${item.value}`;
        const itemDisabled = disabled || item.disabled;

        return (
          <div key={item.value} className="flex items-start gap-2.5 select-none">
            <RadioGroupPrimitive.Item
              id={itemId}
              value={item.value}
              disabled={itemDisabled}
              className={cn(
                'aspect-square h-4.5 w-4.5 rounded-full border border-secondary-300 bg-card-bg mt-0.5',
                'transition-all duration-150 cursor-pointer flex items-center justify-center',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'data-[state=checked]:border-current',
                itemDisabled && 'cursor-not-allowed opacity-50 bg-page-bg',
                colorMap[color]
              )}
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <span className={cn('h-2 w-2 rounded-full', fillMap[color])} />
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>

            <div className="flex flex-col gap-0.5 text-start leading-none">
              <label
                htmlFor={itemId}
                className={cn(
                  'text-xs font-medium text-text-primary cursor-pointer',
                  itemDisabled && 'cursor-not-allowed opacity-60'
                )}
              >
                {item.label}
              </label>
              {item.description && (
                <p className="text-[11px] text-text-muted mt-0.5">{item.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </RadioGroupPrimitive.Root>
  );
}
