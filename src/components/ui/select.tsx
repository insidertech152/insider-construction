import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CaretDown, Check } from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  options?: SelectOption[];
  error?: string;
  helperText?: string;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Select({
  label,
  placeholder = 'اختر من القائمة...',
  value,
  defaultValue,
  onValueChange,
  options,
  error,
  helperText,
  disabled,
  isRequired,
  className,
  children,
}: SelectProps) {
  return (
    <div className="w-full flex flex-col gap-1.5 text-start">
      {label && (
        <label className="text-xs font-semibold text-text-primary flex items-center gap-1 select-none">
          <span>{label}</span>
          {isRequired && <span className="text-danger-500 font-bold">*</span>}
        </label>
      )}

      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          className={cn(
            'flex items-center justify-between w-full h-10 px-3 py-2 text-sm bg-card-bg text-text-primary',
            'border border-border rounded-[4px] shadow-xs transition-colors duration-150 cursor-pointer',
            'focus:outline-none focus:border-primary-action focus:ring-2 focus:ring-primary-action/25',
            disabled && 'bg-page-bg text-text-muted cursor-not-allowed opacity-75',
            error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500 bg-danger-50/20 text-danger-900',
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <CaretDown className="w-4 h-4 text-text-muted shrink-0 transition-transform duration-200" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="z-50 min-w-[8rem] overflow-hidden bg-card-bg text-text-primary rounded-md border border-border shadow-dropdown animate-in fade-in-80 duration-150"
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-1">
              {options
                ? options.map((opt) => (
                    <SelectPrimitive.Item
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                      className={cn(
                        'relative flex items-center justify-between w-full px-3 py-2 text-xs rounded select-none cursor-pointer outline-none transition-colors',
                        'hover:bg-primary-soft hover:text-primary-soft-text focus:bg-primary-soft focus:text-primary-soft-text',
                        opt.disabled && 'pointer-events-none opacity-50'
                      )}
                    >
                      <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                      <SelectPrimitive.ItemIndicator className="inline-flex items-center justify-center ms-2 text-primary-600">
                        <Check className="w-4 h-4" weight="bold" />
                      </SelectPrimitive.ItemIndicator>
                    </SelectPrimitive.Item>
                  ))
                : children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error ? (
        <p className="text-xs text-danger-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-text-muted">{helperText}</p>
      ) : null}
    </div>
  );
}
